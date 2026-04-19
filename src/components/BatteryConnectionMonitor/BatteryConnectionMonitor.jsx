'use client'

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const Row = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

const Stat = styled.div`
  background: ${Theme.surface};
  border: 1px solid ${Theme.border};
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BatteryIcon = styled.div`
  width: 28px;
  height: 14px;
  border: 2px solid ${props => props.$color || Theme.connected};
  border-radius: 3px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 6px;
    background: ${props => props.$color || Theme.connected};
    border-radius: 0 2px 2px 0;
  }
`;

const SignalBars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
`;

const Label = styled.span`
  font-size: 11px;
  color: ${Theme.textMuted};
`;

const Value = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$color || Theme.textPrimary};
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.$color || Theme.connected};
`;

const getBatteryColor = (pct) => {
  if (pct > 60) return Theme.connected;
  if (pct > 30) return Theme.warning;
  return Theme.disconnected;
};

import { useI18n } from '../../contexts/I18nContext';

export function BatteryConnectionMonitor() {
  const { t } = useI18n();
  const [connected, setConnected] = useState(false);
  const [connType, setConnType] = useState('');
  const [avgLat, setAvgLat] = useState(0);
  const latencyRef = useRef([]);
  const lastTsRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const check = () => {
      const gps = navigator.getGamepads();
      let gp = null;
      for (let i = 0; i < gps.length; i++) {
        if (gps[i]?.connected) { gp = gps[i]; break; }
      }

      if (gp) {
        setConnected(true);
        const id = gp.id.toLowerCase();
        if (id.includes('bluetooth') || id.includes('wireless')) setConnType(t('tester.bluetooth'));
        else if (id.includes('xbox')) setConnType(t('tester.xbox'));
        else if (id.includes('dualsense') || id.includes('dualshock')) setConnType(t('tester.playstation'));
        else setConnType(t('tester.usb'));

        if (gp.timestamp && lastTsRef.current > 0) {
          const diff = gp.timestamp - lastTsRef.current;
          if (diff > 0 && diff < 50) {
            latencyRef.current = [...latencyRef.current.slice(-29), diff];
            if (latencyRef.current.length > 0) {
              setAvgLat(latencyRef.current.reduce((a, b) => a + b, 0) / latencyRef.current.length);
            }
          }
        }
        lastTsRef.current = gp.timestamp || 0;
      } else {
        setConnected(false);
      }
    };

    intervalRef.current = setInterval(check, 100); // Throttle to 10fps
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [t]);

  const signal = avgLat < 4 ? 4 : avgLat < 8 ? 3 : avgLat < 16 ? 2 : 1;
  const sigColor = signal >= 3 ? Theme.connected : signal >= 2 ? Theme.warning : Theme.disconnected;

  // Note: Browser Gamepad API does not expose battery level
  // We display N/A to be honest with users rather than fake data

  return (
    <Row>
      <Stat>
        <SignalBars>
          {[25, 50, 75, 100].map((h, i) => (
            <div key={i} style={{
              width: '4px',
              height: `${h}%`,
              background: i < signal ? sigColor : Theme.border,
              borderRadius: '1px'
            }} />
          ))}
        </SignalBars>
        <Value $color={sigColor}>{avgLat > 0 ? `${avgLat.toFixed(1)}ms` : '-'}</Value>
        <Label style={{ marginLeft: '4px' }}>{t('tester.latency')}</Label>
      </Stat>

      <Stat>
        <Dot $color={connected ? Theme.connected : Theme.disconnected} />
        <Label>{connType || (connected ? t('tester.connected') : t('tester.disconnected'))}</Label>
      </Stat>
    </Row>
  );
}

export default BatteryConnectionMonitor;

