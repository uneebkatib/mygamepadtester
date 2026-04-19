'use client'

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const Row = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 8px 0;
`;

const Stat = styled.div`
  background: ${Theme.surface};
  border: 1px solid ${Theme.border};
  border-radius: 8px;
  padding: 8px 14px;
  text-align: center;
  min-width: 80px;
`;

const Label = styled.div`
  font-size: 9px;
  color: ${Theme.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.$color || Theme.primary};
`;

const Unit = styled.span`
  font-size: 10px;
  color: ${Theme.textMuted};
`;

const Badge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: 600;
  background: ${props => props.$bg || `${Theme.connected}20`};
  color: ${props => props.$color || Theme.connected};
  margin-top: 2px;
`;

import { useI18n } from '../../contexts/I18nContext';

const getRating = (ms, t) => {
  if (ms < 4) return { text: t('tester.excellent'), color: Theme.connected, bg: `${Theme.connected}20` };
  if (ms < 8) return { text: t('tester.great'), color: '#84CC16', bg: 'rgba(132,204,22,0.2)' };
  if (ms < 16) return { text: t('tester.good'), color: Theme.warning, bg: `${Theme.warning}20` };
  return { text: t('tester.fair'), color: Theme.disconnected, bg: `${Theme.disconnected}20` };
};

export function InputLagMonitor() {
  const { t } = useI18n();
  const [hz, setHz] = useState(0);
  const [avgMs, setAvgMs] = useState(0);
  const [jitter, setJitter] = useState(0);
  const samplesRef = useRef([]);
  const lastTsRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      const gps = navigator.getGamepads();
      const gp = gps[0] || gps[1] || gps[2] || gps[3];

      if (gp?.timestamp && lastTsRef.current > 0) {
        const diff = gp.timestamp - lastTsRef.current;
        if (diff > 0 && diff < 50) {
          samplesRef.current = [...samplesRef.current.slice(-99), diff];

          // Only calculate stats every 10 samples to reduce re-renders
          if (samplesRef.current.length % 10 === 0 && samplesRef.current.length >= 10) {
            const samples = samplesRef.current;
            const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
            const variance = samples.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / samples.length;

            setAvgMs(avg);
            setHz(Math.round(1000 / avg));
            setJitter(Math.sqrt(variance));
          }
        }
      }
      lastTsRef.current = gp?.timestamp || 0;
      rafRef.current = requestAnimationFrame(measure);
    };

    rafRef.current = requestAnimationFrame(measure);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const rating = getRating(avgMs, t);

  return (
    <Row>
      <Stat style={{ borderColor: hz >= 500 ? `${Theme.connected}50` : undefined }}>
        <Label>{t('tester.polling')}</Label>
        <Value $color={hz >= 500 ? Theme.connected : Theme.primary}>{hz || '-'}<Unit>Hz</Unit></Value>
      </Stat>
      <Stat style={{ borderColor: avgMs > 0 ? `${rating.color}50` : undefined }}>
        <Label>{t('tester.latency')}</Label>
        <Value $color={rating.color}>{avgMs > 0 ? avgMs.toFixed(1) : '-'}<Unit>ms</Unit></Value>
        {avgMs > 0 && <Badge $color={rating.color} $bg={rating.bg}>{rating.text}</Badge>}
      </Stat>
      <Stat>
        <Label>{t('tester.jitter')}</Label>
        <Value $color={jitter < 1 ? Theme.connected : Theme.warning}>{jitter > 0 ? jitter.toFixed(1) : '-'}<Unit>ms</Unit></Value>
      </Stat>
    </Row>
  );
}

export default InputLagMonitor;
