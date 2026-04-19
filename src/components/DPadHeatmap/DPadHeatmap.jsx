'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const Container = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
  flex-wrap: wrap;
`;

const DPadGrid = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
`;

const Dir = styled.div`
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: ${props => props.$active ? Theme.primary : Theme.surface};
  border: 1px solid ${props => props.$active ? Theme.primary : Theme.border};
  color: ${props => props.$active ? '#fff' : Theme.textMuted};
  transition: all 0.1s;
  
  ${props => props.$pos === 'up' && 'top: 0; left: 50%; transform: translateX(-50%);'}
  ${props => props.$pos === 'down' && 'bottom: 0; left: 50%; transform: translateX(-50%);'}
  ${props => props.$pos === 'left' && 'left: 0; top: 50%; transform: translateY(-50%);'}
  ${props => props.$pos === 'right' && 'right: 0; top: 50%; transform: translateY(-50%);'}
  ${props => props.$pos === 'ul' && 'top: 8px; left: 8px;'}
  ${props => props.$pos === 'ur' && 'top: 8px; right: 8px;'}
  ${props => props.$pos === 'dl' && 'bottom: 8px; left: 8px;'}
  ${props => props.$pos === 'dr' && 'bottom: 8px; right: 8px;'}
  ${props => props.$pos === 'c' && 'top: 50%; left: 50%; transform: translate(-50%, -50%);'}
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatRow = styled.div`
  background: ${Theme.surface};
  border: 1px solid ${Theme.border};
  border-radius: 6px;
  padding: 6px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100px;
  font-size: 11px;
  
  .label { color: ${Theme.textMuted}; }
  .value { font-weight: 600; }
`;

const DIRS = {
    up: { e: '↑', pos: 'up' },
    down: { e: '↓', pos: 'down' },
    left: { e: '←', pos: 'left' },
    right: { e: '→', pos: 'right' },
    'ul': { e: '↖', pos: 'ul' },
    'ur': { e: '↗', pos: 'ur' },
    'dl': { e: '↙', pos: 'dl' },
    'dr': { e: '↘', pos: 'dr' },
};

import { useI18n } from '../../contexts/I18nContext';

export function DPadHeatmap() {
    const { t } = useI18n();
    const [counts, setCounts] = useState({ up: 0, down: 0, left: 0, right: 0, ul: 0, ur: 0, dl: 0, dr: 0 });
    const [active, setActive] = useState({});
    const [total, setTotal] = useState(0);
    const prevRef = useRef({});
    const intervalRef = useRef(null);

    useEffect(() => {
        const check = () => {
            const gps = navigator.getGamepads();
            const gp = gps[0] || gps[1] || gps[2] || gps[3];
            if (!gp) return;

            const btns = gp.buttons;
            const u = btns[12]?.pressed, d = btns[13]?.pressed, l = btns[14]?.pressed, r = btns[15]?.pressed;

            const newActive = {};
            let dir = '';

            if (u && l) { newActive.ul = true; dir = 'ul'; }
            else if (u && r) { newActive.ur = true; dir = 'ur'; }
            else if (d && l) { newActive.dl = true; dir = 'dl'; }
            else if (d && r) { newActive.dr = true; dir = 'dr'; }
            else if (u) { newActive.up = true; dir = 'up'; }
            else if (d) { newActive.down = true; dir = 'down'; }
            else if (l) { newActive.left = true; dir = 'left'; }
            else if (r) { newActive.right = true; dir = 'right'; }

            // Only update if changed
            const activeStr = JSON.stringify(newActive);
            const prevStr = JSON.stringify(prevRef.current);

            if (activeStr !== prevStr) {
                setActive(newActive);

                if (dir && !prevRef.current[dir]) {
                    setCounts(p => ({ ...p, [dir]: p[dir] + 1 }));
                    setTotal(t => t + 1);
                }
                prevRef.current = newActive;
            }
        };

        intervalRef.current = setInterval(check, 50); // Throttle to 20fps
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const diag = counts.ul + counts.ur + counts.dl + counts.dr;
    const diagPct = total > 0 ? Math.round((diag / total) * 100) : 0;

    return (
        <Container>
            <DPadGrid>
                {Object.entries(DIRS).map(([k, { e, pos }]) => (
                    <Dir key={k} $pos={pos} $active={active[k]}>{e}</Dir>
                ))}
                <Dir $pos="c">🎯</Dir>
            </DPadGrid>

            <Stats>
                <StatRow>
                    <span className="label">{t('tester.total')}</span>
                    <span className="value">{total}</span>
                </StatRow>
                <StatRow>
                    <span className="label">{t('tester.diagonals')}</span>
                    <span className="value" style={{ color: diagPct >= 40 ? Theme.connected : Theme.warning }}>{diagPct}%</span>
                </StatRow>
            </Stats>
        </Container>
    );
}

export default DPadHeatmap;
