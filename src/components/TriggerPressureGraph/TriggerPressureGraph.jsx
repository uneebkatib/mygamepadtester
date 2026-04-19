'use client'

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const Row = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  flex-wrap: wrap;
`;

const TriggerCard = styled.div`
  background: ${Theme.surface};
  border: 1px solid ${Theme.border};
  border-radius: 8px;
  padding: 8px 12px;
  min-width: 120px;
`;

const TriggerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Label = styled.span`
  font-size: 10px;
  color: ${Theme.textMuted};
  text-transform: uppercase;
`;

const Value = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.$color || Theme.textPrimary};
`;

const ProgressContainer = styled.div`
  height: 8px;
  background: ${Theme.border};
  border-radius: 4px;
  overflow: hidden;
`;

const Stat = styled.div`
  background: ${Theme.surface};
  border: 1px solid ${Theme.border};
  border-radius: 8px;
  padding: 8px 12px;
  text-align: center;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: 600;
  background: ${props => props.$yes ? `${Theme.connected}20` : `${Theme.textMuted}20`};
  color: ${props => props.$yes ? Theme.connected : Theme.textMuted};
`;

import { useI18n } from '../../contexts/I18nContext';

export function TriggerPressureGraph({ lt = 0, rt = 0 }) {
  const { t } = useI18n();
  const [maxLt, setMaxLt] = useState(0);
  const [maxRt, setMaxRt] = useState(0);
  const prevLt = useRef(0);
  const prevRt = useRef(0);

  const ltPct = Math.round(lt * 100);
  const rtPct = Math.round(rt * 100);

  useEffect(() => {
    // Only update max if value increased
    if (ltPct > maxLt) setMaxLt(ltPct);
    if (rtPct > maxRt) setMaxRt(rtPct);
    prevLt.current = ltPct;
    prevRt.current = rtPct;
  }, [ltPct, rtPct, maxLt, maxRt]);

  const fullRange = maxLt >= 99 && maxRt >= 99;

  return (
    <Row>
      <TriggerCard style={{ borderColor: lt > 0 ? Theme.accent : Theme.border }}>
        <TriggerHeader>
          <Label>L2 / LT</Label>
          <Value $color={Theme.accent}>{ltPct}%</Value>
        </TriggerHeader>
        <ProgressContainer>
          <div style={{
            height: '100%',
            background: Theme.accent,
            width: `${ltPct}%`,
            borderRadius: '4px',
            transition: 'width 0.05s linear'
          }} />
        </ProgressContainer>
      </TriggerCard>

      <Stat>
        <div style={{ fontSize: '10px', color: Theme.textMuted }}>{t('tester.fullRange')}</div>
        <Badge $yes={fullRange}>{fullRange ? `✓ ${t('tester.yes')}` : `○ ${t('tester.no')}`}</Badge>
        <div style={{ fontSize: '9px', color: Theme.textMuted, marginTop: '2px' }}>
          {t('tester.max')}: {maxLt}% / {maxRt}%
        </div>
      </Stat>

      <TriggerCard style={{ borderColor: rt > 0 ? Theme.primary : Theme.border }}>
        <TriggerHeader>
          <Label>R2 / RT</Label>
          <Value $color={Theme.primary}>{rtPct}%</Value>
        </TriggerHeader>
        <ProgressContainer>
          <div style={{
            height: '100%',
            background: Theme.primary,
            width: `${rtPct}%`,
            borderRadius: '4px',
            transition: 'width 0.05s linear'
          }} />
        </ProgressContainer>
      </TriggerCard>
    </Row>
  );
}

export default TriggerPressureGraph;
