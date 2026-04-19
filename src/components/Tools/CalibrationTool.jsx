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

const DiagnosticOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  text-align: center;
  padding: 2rem;

  .countdown {
    font-size: 5rem;
    font-weight: 900;
    color: ${Theme.primary};
    line-height: 1;
  }

  h3 { color: ${Theme.textPrimary}; margin-bottom: 1rem; }
  p { color: ${Theme.textSecondary}; }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 12px;
  background: ${Theme.backgroundDark};
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1.5rem;

  .fill {
    height: 100%;
    background: linear-gradient(90deg, ${Theme.primary}, ${Theme.accent});
    transition: width 0.1s linear;
  }
`;

const MetricTile = styled.div`
  background: ${Theme.backgroundDark};
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  border-left: 4px solid ${props => props.$color || Theme.primary};

  label {
    display: block;
    font-size: 0.7rem;
    font-weight: 800;
    color: ${Theme.textMuted};
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: 900;
    color: ${props => props.$color || Theme.primary};
  }

  .status {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const PrimaryBtn = styled.button`
  padding: 0.8rem 2.5rem;
  border-radius: 50px;
  border: none;
  background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 15px ${Theme.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${Theme.primary}60;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const HeartbeatIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${Theme.primary};
  font-weight: 800;
  font-size: 0.9rem;
  margin-top: 1rem;
  
  svg {
    animation: ${pulse} 1s infinite;
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CalibrationTool() {
  const { t } = useI18n();
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState([false, false, false, false]);
  const [gamepadNames, setGamepadNames] = useState(['', '', '', '']);

  const [gamepadState, setGamepadState] = useState({
    lx: 0, ly: 0, rx: 0, ry: 0,
    buttons: [],
    axes: []
  });

  const [mode, setMode] = useState('realtime'); // realtime | neutral_test | results
  const [countdown, setCountdown] = useState(0);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState(null);

  const neutralSamplesRef = useRef({ left: [], right: [] });
  const testStartRef = useRef(null);

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

  const calculateStats = (samples) => {
    if (samples.length < 10) return { offset: 0, status: 'Unknown' };
    const avgX = samples.reduce((s, p) => s + p.x, 0) / samples.length;
    const avgY = samples.reduce((s, p) => s + p.y, 0) / samples.length;
    const offset = Math.sqrt(avgX * avgX + avgY * avgY);
    let status = 'Perfect';
    if (offset > 0.1) status = 'Critical';
    else if (offset > 0.05) status = 'Worn';
    else if (offset > 0.02) status = 'Normal';
    return { offset: (offset * 100).toFixed(2), status, raw: offset };
  };

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

        setGamepadState({
          lx, ly, rx, ry,
          buttons: gpad.buttons.map(b => ({ pressed: b.pressed, value: b.value })),
          axes: [...gpad.axes]
        });

        if (mode === 'neutral_test' && testStartRef.current) {
          const elapsed = Date.now() - testStartRef.current;
          setProgress(Math.min((elapsed / 3000) * 100, 100));

          neutralSamplesRef.current.left.push({ x: lx, y: ly });
          neutralSamplesRef.current.right.push({ x: rx, y: ry });

          if (elapsed >= 3000) {
            const leftResult = calculateStats(neutralSamplesRef.current.left);
            const rightResult = calculateStats(neutralSamplesRef.current.right);

            const score = Math.max(0, Math.min(100, Math.round(100 - (Math.max(leftResult.raw, rightResult.raw) * 500))));

            setReport({
              left: leftResult,
              right: rightResult,
              score: score
            });
            setMode('results');
          }
        }
      }
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [selectedSlot, mode]);

  const runDiagnostic = () => {
    setMode('neutral_test');
    setCountdown(3);
    setProgress(0);
    neutralSamplesRef.current = { left: [], right: [] };

    let c = 3;
    const timer = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) {
        clearInterval(timer);
        testStartRef.current = Date.now();
      }
    }, 1000);
  };

  const isConnected = connectionStatus[selectedSlot];

  return (
    <DashboardWrapper id="calibration">
      <ToolHeader>
        <h1><span>💎</span> <GradientText>{t('tester.joystickCalibration') || 'Joystick Heartbeat & Calibration'}</GradientText></h1>
      </ToolHeader>

      <StyledTabList>
        {[0, 1, 2, 3].map(i => (
          <TabButton key={i} $active={selectedSlot === i} onClick={() => setSelectedSlot(i)}>
            {connectionStatus[i] ? `${i + 1}: ${gamepadNames[i]}` : `Slot ${i + 1}`}
            <ConnectionStatus $connected={connectionStatus[i]}>
              {connectionStatus[i] ? t('tester.connected') : t('tester.notFound')}
            </ConnectionStatus>
          </TabButton>
        ))}
      </StyledTabList>

      {!isConnected ? (
        <Card style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔌</div>
          <h2 style={{ color: Theme.primary }}>Connect Controller for Heartbeat</h2>
          <p style={{ color: Theme.textSecondary }}>The diagnostic terminal requires an active hardware signal to begin baseline analysis.</p>
        </Card>
      ) : (
        <MainContentGrid>
          <LeftPanel>
            <Card style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: Theme.primary, margin: 0 }}>Terminal Device</h3>
                  <p style={{ color: Theme.textSecondary, fontSize: '0.9rem' }}>{gamepadNames[selectedSlot]}</p>
                </div>
                <div style={{ background: Theme.primary + '20', color: Theme.primary, padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800 }}>
                  ACTIVE
                </div>
              </div>

              <Suspense fallback={<div>Loading Controller Visuals...</div>}>
                <VisualGamepad
                  gamepadName={gamepadNames[selectedSlot]}
                  states={{ buttons: gamepadState.buttons, axes: gamepadState.axes }}
                  minimal={true}
                />
              </Suspense>

              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <PrimaryBtn onClick={runDiagnostic}>Run Full Diagnostic</PrimaryBtn>
                {mode === 'results' && (
                  <button
                    onClick={() => { setMode('realtime'); setReport(null); }}
                    style={{ background: 'none', border: 'none', color: Theme.textMuted, cursor: 'pointer', display: 'block', margin: '1rem auto', textDecoration: 'underline' }}
                  >
                    Reset & Start Over
                  </button>
                )}
              </div>
            </Card>

            {mode === 'results' && report && (
              <Card style={{ background: Theme.backgroundLight, border: `2px solid ${Theme.primary}` }}>
                <h3 style={{ color: Theme.primary, marginBottom: '1rem' }}>Recalibration Settings</h3>
                <p style={{ fontSize: '0.9rem', color: Theme.textSecondary }}>Recommended deadzone values for your specific hardware wear levels:</p>
                <div style={{ background: Theme.white, padding: '1rem', borderRadius: '12px', border: `1px solid ${Theme.border}`, marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700 }}>Steam Input:</span>
                    <span style={{ color: Theme.primary, fontWeight: 800 }}>{(Math.max(report.left.raw, report.right.raw) * 100).toFixed(0)}% Inner</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700 }}>In-Game Deadzone:</span>
                    <span style={{ color: Theme.primary, fontWeight: 800 }}>{(Math.max(report.left.raw, report.right.raw) + 0.02).toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            )}
          </LeftPanel>

          <RightPanel style={{ position: 'relative' }}>
            {mode === 'neutral_test' && (
              <DiagnosticOverlay>
                {countdown > 0 ? (
                  <>
                    <h3 style={{ fontSize: '1.5rem' }}>System Baseline Check</h3>
                    <div className="countdown">{countdown}</div>
                    <p>Centering sticks... Release all inputs now.</p>
                  </>
                ) : (
                  <>
                    <h3 style={{ fontSize: '1.5rem' }}>Recording Heartbeat Signal</h3>
                    <p>Capturing raw telemetry from analog potentiometers...</p>
                    <ProgressBarContainer>
                      <div className="fill" style={{ width: `${progress}%` }} />
                    </ProgressBarContainer>
                  </>
                )}
              </DiagnosticOverlay>
            )}

            <Card>
              <h3 style={{ color: Theme.primary, textAlign: 'center', marginBottom: '1.5rem' }}>Real-Time Accuracy Monitor</h3>
              <div style={{ background: Theme.backgroundDark, borderRadius: '20px', padding: '1rem' }}>
                <Suspense fallback={<div>Loading Analytics...</div>}>
                  <AxesSVG
                    leftX={gamepadState.lx}
                    leftY={gamepadState.ly}
                    rightX={gamepadState.rx}
                    rightY={gamepadState.ry}
                    minimal={false}
                  />
                </Suspense>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                <MetricTile $color={Theme.primary}>
                  <label>Left X / Y</label>
                  <div className="value">{gamepadState.lx.toFixed(3)} / {gamepadState.ly.toFixed(3)}</div>
                </MetricTile>
                <MetricTile $color={Theme.accent}>
                  <label>Right X / Y</label>
                  <div className="value">{gamepadState.rx.toFixed(3)} / {gamepadState.ry.toFixed(3)}</div>
                </MetricTile>
              </div>

              <HeartbeatIndicator>
                <span style={{ fontSize: '1.2rem' }}>❤️</span>
                Live Telemetry Pipeline Active
              </HeartbeatIndicator>
            </Card>

            {mode === 'results' && report && (
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ color: Theme.primary, margin: 0 }}>Full Diagnostic Audit</h3>
                  <div style={{ background: Theme.primary, color: 'white', padding: '0.5rem 1.5rem', borderRadius: '50px', fontWeight: 900, fontSize: '1.1rem' }}>
                    Score: {report.score} / 100
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <MetricTile $color={report.left.raw > 0.1 ? '#EF4444' : '#22C55E'}>
                    <label>Left Stick Center</label>
                    <div className="value">{report.left.offset}%</div>
                    <div className="status">{report.left.status}</div>
                  </MetricTile>
                  <MetricTile $color={report.right.raw > 0.1 ? '#EF4444' : '#22C55E'}>
                    <label>Right Stick Center</label>
                    <div className="value">{report.right.offset}%</div>
                    <div className="status">{report.right.status}</div>
                  </MetricTile>
                </div>

                <div style={{ marginTop: '2rem', borderTop: `1px solid ${Theme.border}`, paddingTop: '1.5rem' }}>
                  <ShareExport
                    testData={{
                      controllerName: gamepadNames[selectedSlot],
                      driftLeft: report.left.offset,
                      driftRight: report.right.offset
                    }}
                    healthScore={report.score}
                  />
                </div>
              </Card>
            )}
          </RightPanel>
        </MainContentGrid>
      )}
    </DashboardWrapper>
  );
}
