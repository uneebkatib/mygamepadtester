'use client'

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const ButtonRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin: 8px 0;
`;

const ExportBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid ${props => props.$primary ? Theme.primary : Theme.border};
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${props => props.$primary ? Theme.primary : Theme.surface};
  color: ${props => props.$primary ? '#fff' : Theme.textSecondary};
  
  &:hover {
    background: ${props => props.$primary ? Theme.primaryHover : Theme.surfaceHover};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

const Status = styled.span`
  font-size: 10px;
  color: ${props => props.$error ? Theme.disconnected : Theme.connected};
  margin-left: 6px;
`;

import { useI18n } from '../../contexts/I18nContext';

export function ExportButtons() {
    const { t } = useI18n();
    const [status, setStatus] = useState('');
    const [busy, setBusy] = useState(false);

    const exportPNG = useCallback(async () => {
        setBusy(true);
        setStatus(t('tester.capturing'));

        try {
            // Use dom-to-image-more which handles styled-components better
            const domtoimage = await import('dom-to-image-more');

            const targetElement = document.getElementById('gamepad-tester-container');

            if (!targetElement) {
                setStatus('❌ ' + t('tester.noElement'));
                setBusy(false);
                return;
            }

            // Use toPng with specific options
            const dataUrl = await domtoimage.toPng(targetElement, {
                quality: 0.95,
                bgcolor: '#FAF9F5',
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left',
                },
                filter: (node) => {
                    // Filter out any problematic nodes
                    if (node.tagName === 'SCRIPT') return false;
                    if (node.tagName === 'STYLE') return false;
                    return true;
                }
            });

            // Download
            const link = document.createElement('a');
            link.download = `gamepad-test-${new Date().toISOString().slice(0, 10)}.png`;
            link.href = dataUrl;
            link.click();

            setStatus('✓ ' + t('tester.saved'));
            setTimeout(() => setStatus(''), 3000);
        } catch (err) {
            console.error('Screenshot error:', err);

            // Fallback: try window print
            try {
                window.print();
                setStatus('Print dialog opened');
            } catch {
                setStatus('❌ ' + t('tester.error'));
            }
        } finally {
            setBusy(false);
        }
    }, [t]);

    const copyReport = useCallback(async () => {
        try {
            const gps = navigator.getGamepads();
            const gp = gps[0] || gps[1] || gps[2] || gps[3];

            const report = `🎮 ${t('tester.reportTitle')}
━━━━━━━━━━━━━━━━━━━━━━
${t('tester.controller')}: ${gp?.id || 'Unknown'}
${t('tester.buttons')}: ${gp?.buttons?.length || 'N/A'}
${t('tester.axes')}: ${gp?.axes?.length || 'N/A'}
${t('tester.date')}: ${new Date().toLocaleDateString()}
━━━━━━━━━━━━━━━━━━━━━━
${t('tester.testYours')}: mygamepadtester.com`;

            await navigator.clipboard.writeText(report);
            setStatus('✓ ' + t('tester.copied'));
            setTimeout(() => setStatus(''), 2000);
        } catch {
            setStatus('❌ ' + t('tester.failed'));
        }
    }, [t]);

    const shareResults = useCallback(async () => {
        if (navigator.share) {
            try {
                const gp = navigator.getGamepads()[0];
                await navigator.share({
                    title: t('tester.reportTitle'),
                    text: `${t('tester.screenshot')} ${gp?.id || t('tester.gamepad')}!`,
                    url: 'https://mygamepadtester.com'
                });
            } catch { }
        }
    }, [t]);

    return (
        <ButtonRow>
            <ExportBtn $primary onClick={exportPNG} disabled={busy}>
                📸 {busy ? t('tester.wait') : t('tester.screenshot')}
            </ExportBtn>
            <ExportBtn onClick={copyReport} disabled={busy}>
                📋 {t('tester.copy')}
            </ExportBtn>
            {typeof navigator !== 'undefined' && navigator.share && (
                <ExportBtn onClick={shareResults} disabled={busy}>
                    🔗 {t('tester.share')}
                </ExportBtn>
            )}
            {status && <Status $error={status.includes('❌')}>{status}</Status>}
        </ButtonRow>
    );
}

export default ExportButtons;
