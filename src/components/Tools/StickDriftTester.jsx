'use client'

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { Theme } from '../../styles/Theme';
import { useI18n } from "../../contexts/I18nContext";
import dynamic from 'next/dynamic';

// Lazy load heavy components
const VisualGamepad = dynamic(() => import('../Common/VisualGamepad'), { ssr: false });
const AxesSVG = dynamic(() => import('../AxesSVG/AxesSVG').then(m => m.AxesSVG), { ssr: false });
const ShareExport = dynamic(() => import('../ShareExport/ShareExport'), { ssr: false });

// ============================================================================
// STYLED COMPONENTS (OFFICIAL DASHBOARD STYLE)
// ============================================================================

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem;
`;

const StyledTabList = styled.div`
  display: flex;
  border-radius: 0 0 1rem 1rem;
  font-size: 1.1rem;
  background-color: ${Theme.interface};
  width: fit-content;
  margin: 0 auto;
  flex-wrap: nowrap;
  min-height: 60px;
  padding: 0;
  gap: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 4px 12px ${Theme.shadowMedium};

  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0 0 0.75rem 0.75rem;
    font-size: 0.9rem;
  }
`;

const TabButton = styled.button`
  width: 11rem;
  padding: 1rem;
  box-sizing: border-box;
  color: ${props => props.$active ? Theme.primary : Theme.textPrimary};
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  border-right: 1px solid ${Theme.border};
  background: ${props => props.$active ? Theme.backgroundLight : 'transparent'};
  border-bottom: ${props => props.$active ? `5px solid ${Theme.primary}` : 'none'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: inherit;
  font-family: inherit;
  font-weight: 600;
  flex-shrink: 0;
  
  &:last-child { border-right: none; }
  &:hover { background: ${Theme.backgroundLight}; }

  @media (max-width: 600px) {
    width: auto;
    min-width: 5.5rem;
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
`;

const ConnectionStatus = styled.div`
  color: ${props => props.$connected ? Theme.connected : Theme.disconnected};
  font-size: 0.8rem;
  margin-top: 0.2rem;
  font-weight: 700;
`;

const ToolHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 900;
    color: ${Theme.textPrimary};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
  
  p {
    color: ${Theme.textSecondary};
    font-size: 1.1rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
`;

const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled.div`
  background: ${Theme.white};
  border: 1px solid ${Theme.border};
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px ${Theme.shadowMedium};
  position: relative;
`;

const HealthScoreCard = styled(Card)`
  text-align: center;
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.white});
  border: 2px solid ${props => {
    if (props.$score >= 90) return '#22C55E';
    if (props.$score >= 70) return '#EAB308';
    return '#EF4444';
  }}40;

  .score-label {
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 800;
    color: ${Theme.textMuted};
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }

  .score-value {
    font-size: 4rem;
    font-weight: 900;
    color: ${props => {
    if (props.$score >= 90) return '#22C55E';
    if (props.$score >= 70) return '#EAB308';
    return '#EF4444';
  }};
    line-height: 1;
  }

  .score-desc {
    margin-top: 0.5rem;
    font-weight: 600;
    color: ${Theme.textSecondary};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  background: ${Theme.backgroundDark};
  padding: 1rem;
  border-radius: 12px;
  text-align: center;

  label {
    display: block;
    font-size: 0.7rem;
    font-weight: 800;
    color: ${Theme.textMuted};
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .value {
    font-size: 1.25rem;
    font-weight: 900;
    color: ${Theme.primary};
    font-family: 'JetBrains Mono', monospace;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const PrimaryBtn = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 50px;
  border: none;
  background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px ${Theme.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${Theme.primary}60;
  }
`;

const SecondaryBtn = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 50px;
  border: 2px solid ${Theme.primary};
  background: transparent;
  color: ${Theme.primary};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${Theme.primary}10;
  }
`;

const AlertBanner = styled.div`
  background: ${props => props.$severe ? '#FEF2F2' : '#FFFBEB'};
  border: 2px solid ${props => props.$severe ? '#FCA5A5' : '#FCD34D'};
  border-radius: 16px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.$severe ? '#991B1B' : '#92400E'};

  h4 { margin: 0; font-weight: 800; }
  p { margin: 0; font-size: 0.9rem; }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function StickDriftTester() {
  const { t } = useI18n();
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState([false, false, false, false]);
  const [gamepadNames, setGamepadNames] = useState(['', '', '', '']);

  const [gamepadState, setGamepadState] = useState({
    lx: 0, ly: 0, rx: 0, ry: 0,
    lDist: 0, rDist: 0,
    lMax: 0, rMax: 0,
    buttons: [],
    axes: []
  });

  const [testActive, setTestActive] = useState(false);
  const [healthScore, setHealthScore] = useState(100);

  // Poll for gamepad connections
  const checkConnections = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.getGamepads) return;
    const gamepads = navigator.getGamepads();
    const newStatus = [false, false, false, false];
    const newNames = ['', '', '', ''];
    for (let i = 0; i < 4; i++) {
      if (gamepads[i] && gamepads[i].connected) {
        newStatus[i] = true;
        newNames[i] = gamepads[i].id.split('(')[0].trim().substring(0, 15);
      }
    }
    setConnectionStatus(newStatus);
    setGamepadNames(newNames);
  }, []);

  useEffect(() => {
    const interval = setInterval(checkConnections, 1000);
    return () => clearInterval(interval);
  }, [checkConnections]);

  // Main polling loop
  useEffect(() => {
    let frameId;
    const update = () => {
      const gpad = navigator.getGamepads()[selectedSlot];
      if (gpad && gpad.connected) {
        const lx = gpad.axes[0] || 0;
        const ly = gpad.axes[1] || 0;
        const rx = gpad.axes[2] || 0;
        const ry = gpad.axes[3] || 0;

        const lDist = Math.sqrt(lx * lx + ly * ly);
        const rDist = Math.sqrt(rx * rx + ry * ry);

        setGamepadState(prev => {
          const newLMax = Math.max(prev.lMax, lDist);
          const newRMax = Math.max(prev.rMax, rDist);

          // Calculate health score (weighted avg of drift)
          // 0.2 offset = 0 health, 0 offset = 100 health
          const maxDrift = Math.max(lDist, rDist);
          const score = Math.max(0, Math.min(100, Math.round(100 - (maxDrift * 500))));
          setHealthScore(score);

          return {
            lx, ly, rx, ry,
            lDist, rDist,
            lMax: newLMax,
            rMax: newRMax,
            buttons: gpad.buttons.map(b => ({ pressed: b.pressed, value: b.value })),
            axes: [...gpad.axes]
          };
        });
      }
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [selectedSlot]);

  const resetTest = () => {
    setGamepadState(prev => ({ ...prev, lMax: 0, rMax: 0 }));
  };

  const isConnected = connectionStatus[selectedSlot];

  return (
    <DashboardWrapper id="test">
      <ToolHeader>
        <h1><span>🎮</span> <GradientText>{t('tester.precisionDriftTest') || 'Precision Stick Drift Audit'}</GradientText></h1>
        <p>{t('tester.driftDetectionSub') || 'Professional-grade real-time axis deviation analysis'}</p>
      </ToolHeader>

      <StyledTabList>
        {[0, 1, 2, 3].map(i => (
          <TabButton key={i} $active={selectedSlot === i} onClick={() => setSelectedSlot(i)}>
            {connectionStatus[i] ? `${i + 1}: ${gamepadNames[i]}` : `Gamepad #${i + 1}`}
            <ConnectionStatus $connected={connectionStatus[i]}>
              {connectionStatus[i] ? t('tester.connected') : t('tester.notFound')}
            </ConnectionStatus>
          </TabButton>
        ))}
      </StyledTabList>

      {!isConnected ? (
        <Card style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔌</div>
          <h2 style={{ color: Theme.primary }}>Connect Controller to Begin</h2>
          <p style={{ color: Theme.textSecondary, maxWidth: '500px', margin: '1rem auto' }}>
            Plug in your gamepad via USB or Bluetooth and press any button to start the precision diagnostic test.
          </p>
        </Card>
      ) : (
        <MainContentGrid>
          <LeftPanel>
            <Card style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: Theme.primary, margin: 0 }}>Terminal Device</h3>
                <p style={{ color: Theme.textSecondary, fontSize: '0.9rem' }}>{gamepadNames[selectedSlot]}</p>
              </div>
              <Suspense fallback={<div>Loading Controller Visuals...</div>}>
                <VisualGamepad
                  gamepadName={gamepadNames[selectedSlot]}
                  states={{ buttons: gamepadState.buttons, axes: gamepadState.axes }}
                  minimal={true}
                />
              </Suspense>

              <ActionButtons>
                <PrimaryBtn onClick={resetTest}>Reset Peak Data</PrimaryBtn>
              </ActionButtons>
            </Card>

            <HealthScoreCard $score={healthScore}>
              <div className="score-label">Joystick Health Score</div>
              <div className="score-value">{healthScore}</div>
              <div className="score-desc">
                {healthScore >= 95 ? "Perfect Calibration" :
                  healthScore >= 85 ? "Normal Wear" :
                    healthScore >= 70 ? "Minor Drift Detected" : "Severe Drift - Repair Needed"}
              </div>
            </HealthScoreCard>
          </LeftPanel>

          <RightPanel>
            <Card>
              <h3 style={{ textAlign: 'center', color: Theme.primary, marginBottom: '1.5rem' }}>Analog Analytical Monitor</h3>

              {(gamepadState.lDist > 0.05 || gamepadState.rDist > 0.05) && (
                <AlertBanner $severe={gamepadState.lDist > 0.1 || gamepadState.rDist > 0.1}>
                  <div>
                    <h4>⚠️ Deviation Warning</h4>
                    <p>Significant axis offset detected while sticks are at rest. Calibrate deadzones in-game.</p>
                  </div>
                </AlertBanner>
              )}

              <Suspense fallback={<div>Loading Analytical Visuals...</div>}>
                <div style={{ background: Theme.backgroundDark, borderRadius: '20px', padding: '1rem' }}>
                  <AxesSVG
                    leftX={gamepadState.lx}
                    leftY={gamepadState.ly}
                    rightX={gamepadState.rx}
                    rightY={gamepadState.ry}
                    minimal={false}
                  />
                </div>
              </Suspense>

              <StatsGrid>
                <Card style={{ padding: '1rem', background: '#f8fafc' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b' }}>LEFT STICK OFFSET</label>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: Theme.primary }}>{(gamepadState.lDist * 100).toFixed(2)}%</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Peak: {(gamepadState.lMax * 100).toFixed(1)}%</span>
                  </div>
                </Card>
                <Card style={{ padding: '1rem', background: '#f8fafc' }}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b' }}>RIGHT STICK OFFSET</label>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: Theme.primary }}>{(gamepadState.rDist * 100).toFixed(2)}%</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Peak: {(gamepadState.rMax * 100).toFixed(1)}%</span>
                  </div>
                </Card>
              </StatsGrid>
            </Card>

            <Card>
              <h3 style={{ color: Theme.primary, marginBottom: '1rem' }}>Diagnostic Data Report</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                <StatItem><label>LX</label><div className="value">{gamepadState.lx.toFixed(4)}</div></StatItem>
                <StatItem><label>LY</label><div className="value">{gamepadState.ly.toFixed(4)}</div></StatItem>
                <StatItem><label>RX</label><div className="value">{gamepadState.rx.toFixed(4)}</div></StatItem>
                <StatItem><label>RY</label><div className="value">{gamepadState.ry.toFixed(4)}</div></StatItem>
              </div>

              <div style={{ marginTop: '1.5rem', borderTop: `1px solid ${Theme.border}`, paddingTop: '1.5rem' }}>
                <ShareExport
                  testData={{
                    controllerName: gamepadNames[selectedSlot],
                    driftLeft: (gamepadState.lDist * 100).toFixed(1),
                    driftRight: (gamepadState.rDist * 100).toFixed(1)
                  }}
                  healthScore={healthScore}
                />
              </div>
            </Card>
          </RightPanel>
        </MainContentGrid>
      )}
    </DashboardWrapper>
  );
}
