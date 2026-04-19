'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const Row = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 8px 0;
`;

const Card = styled.div`
  background: ${Theme.surface};
  border: 1px solid ${Theme.border};
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 10px;
  color: ${Theme.textMuted};
  text-transform: uppercase;
`;

const Value = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.$color || Theme.textPrimary};
`;

const Badge = styled.span`
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  background: ${props => props.$bg || `${Theme.primary}20`};
  color: ${props => props.$color || Theme.primary};
`;

const LinearBars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 20px;
`;

import { useI18n } from '../../contexts/I18nContext';

const getControllerType = (id, t) => {
    const l = id.toLowerCase();
    if (l.includes('dualsense')) return { type: t('tester.dualsense'), color: '#0070D1' };
    if (l.includes('dualshock')) return { type: t('tester.dualshock'), color: '#0070D1' };
    if (l.includes('xbox')) return { type: t('tester.xbox'), color: '#107C10' };
    if (l.includes('switch') || l.includes('pro')) return { type: t('tester.switchPro'), color: '#E60012' };
    if (l.includes('8bitdo')) return { type: t('tester.eightBitDo'), color: '#333' };
    return { type: t('tester.gamepad'), color: Theme.primary };
};

const detectSensor = (samples, t) => {
    if (samples.length < 20) return { type: '...', color: Theme.textMuted };
    const diffs = samples.slice(1).map((v, i) => Math.abs(v - samples[i]));
    const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    const variance = diffs.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / diffs.length;
    const std = Math.sqrt(variance);

    if (std < 0.02) return { type: t('tester.hallEffect'), color: Theme.connected };
    if (std < 0.06) return { type: t('tester.likelyHall'), color: '#84CC16' };
    return { type: t('tester.potentiometer'), color: Theme.warning };
};

export function ControllerInfo() {
    const { t } = useI18n();
    const [info, setInfo] = useState(null);
    const [samples, setSamples] = useState([]);
    const [bars, setBars] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        const check = () => {
            const gps = navigator.getGamepads();
            let gp = null;
            for (let i = 0; i < gps.length; i++) {
                if (gps[i]?.connected) { gp = gps[i]; break; }
            }

            if (gp) {
                const typeInfo = getControllerType(gp.id, t);

                // Only update info if it changed
                setInfo(prev => {
                    if (prev?.id === gp.id) return prev;
                    return { id: gp.id, mapping: gp.mapping, btns: gp.buttons.length, axes: gp.axes.length, ...typeInfo };
                });

                const x = Math.abs(gp.axes[0] || 0);
                setSamples(p => {
                    if (p.length >= 50) return [...p.slice(-49), x];
                    return [...p, x];
                });
                setBars(p => {
                    if (p.length >= 10) return [...p.slice(-9), x * 100];
                    return [...p, x * 100];
                });
            }
        };

        intervalRef.current = setInterval(check, 100); // Throttle to 10fps
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [t]);

    const sensor = useMemo(() => detectSensor(samples, t), [samples.length, t]);

    if (!info) return null;

    return (
        <Row>
            <Card>
                <Badge $color={info.color} $bg={`${info.color}20`}>{info.type}</Badge>
                <Value>{info.btns}B / {info.axes}A</Value>
            </Card>

            <Card>
                <Label>{t('tester.sensor')}</Label>
                <Value $color={sensor.color}>{sensor.type}</Value>
                <LinearBars>
                    {bars.map((h, i) => (
                        <div key={i} style={{
                            width: '4px',
                            height: `${h}%`,
                            background: h > 50 ? Theme.connected : Theme.border,
                            borderRadius: '1px'
                        }} />
                    ))}
                </LinearBars>
            </Card>

            {info.mapping === 'standard' && (
                <Card>
                    <Badge $color={Theme.connected} $bg={`${Theme.connected}20`}>✓ {t('tester.standard')}</Badge>
                </Card>
            )}
        </Row>
    );
}

export default ControllerInfo;

