'use client'

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { Theme } from '../../styles/Theme';
import { useI18n } from "../../contexts/I18nContext";
import dynamic from 'next/dynamic';
import { FaDownload, FaHistory, FaBolt, FaCheckCircle, FaTimesCircle, FaChartBar, FaExchangeAlt } from 'react-icons/fa';

// Lazy load heavy components
const VisualGamepad = dynamic(() => import('../Common/VisualGamepad'), { ssr: false });

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToolHeader = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
  
  h1 {
    font-size: 1.8rem;
    font-weight: 900;
    color: ${Theme.textPrimary};
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
  
  p {
    color: ${Theme.textSecondary};
    font-size: 0.9rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
`;

const StyledTabList = styled.div`
  display: flex;
  border-radius: 1rem;
  background-color: ${Theme.interface};
  width: fit-content;
  margin: 0 auto;
  padding: 0.5rem;
  gap: 0.5rem;
  box-shadow: 0 4px 12px ${Theme.shadowMedium};
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  color: ${props => props.$active ? 'white' : Theme.textPrimary};
  background: ${props => props.$active ? Theme.primary : 'transparent'};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${props => props.$active ? Theme.primary : Theme.backgroundLight};
  }
`;

const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${Theme.white};
  border: 1px solid ${Theme.border};
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 10px 30px ${Theme.shadowMedium};
  height: min-content;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatTile = styled.div`
  background: ${Theme.backgroundDark};
  padding: 0.75rem;
  border-radius: 12px;
  text-align: center;
  border-bottom: 3px solid ${props => props.$color || Theme.primary};

  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 800;
    color: ${Theme.textMuted};
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 2rem;
    font-weight: 900;
    color: ${Theme.textPrimary};
  }

  .unit {
    font-size: 0.9rem;
    color: ${Theme.textMuted};
    margin-left: 0.2rem;
  }
`;

const MonitorContainer = styled.div`
  background: ${Theme.backgroundDark};
  border-radius: 20px;
  padding: 1rem;
  height: 220px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ChartArea = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  padding-top: 2rem;
  overflow: hidden;
`;

const Bar = styled.div`
  width: 5px;
  background: ${Theme.primary};
  border-radius: 1px 1px 0 0;
  transition: height 0.1s ease;
  opacity: 0.8;
  flex-shrink: 0;
  
  &:hover {
    opacity: 1;
    filter: brightness(1.2);
  }
`;

const ReactionCue = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => {
    if (props.$status === 'waiting') return Theme.surfaceHover;
    if (props.$status === 'ready') return '#3b82f6';
    if (props.$status === 'pressed') return Theme.connected;
    if (props.$status === 'too_early') return Theme.disconnected;
    return Theme.surface;
  }};
  color: ${props => (props.$status === 'ready' || props.$status === 'pressed' || props.$status === 'too_early') ? 'white' : Theme.textPrimary};
  text-align: center;
  font-weight: 800;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  border: 4px solid transparent;

  &:hover {
    transform: scale(1.02);
  }

  .subtext {
    font-size: 0.9rem;
    opacity: 0.8;
    font-weight: 400;
    margin-top: 0.5rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const PrimaryBtn = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${Theme.primary}40;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryBtn = styled.button`
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid ${Theme.border};
  background: white;
  color: ${Theme.textPrimary};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${Theme.backgroundLight};
  }
`;

// ============================================================================
// LOGIC HELPERS
// ============================================================================

const calculateHz = (delta) => {
  if (delta <= 0) return 0;
  return Math.round(1000 / delta);
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function InputLagTester() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('polling'); // polling | reaction | compare
  const [connected, setConnected] = useState(false);
  const [controllerName, setControllerName] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(0);

  const [pollingStats, setPollingStats] = useState({
    avg: 0, min: Infinity, max: 0, hz: 0, jitter: 0, samples: []
  });

  const [visualState, setVisualState] = useState({
    buttons: [],
    axes: []
  });
  
  // Reaction State
  const [reactionStatus, setReactionStatus] = useState('idle'); // idle | waiting | ready | pressed | too_early
  const [reactionTime, setReactionTime] = useState(null);
  const [reactionHistory, setReactionHistory] = useState([]);
  
  // Compare State
  const [comparisons, setComparisons] = useState({
    baseline: null, // { avg, hz, name }
    current: null
  });

  const lastTimestampRef = useRef(0);
  const pollingSamplesRef = useRef([]);
  const reactionTimerRef = useRef(null);
  const cueTimeRef = useRef(0);

  // Polling Rate Logic
  useEffect(() => {
    let frameId;
    const update = () => {
      const gpads = navigator.getGamepads();
      const gpad = gpads[selectedSlot];

      if (gpad && gpad.connected) {
        setConnected(true);
        setControllerName(gpad.id.split('(')[0].trim());

        // Visual State Synchronization
        setVisualState({
          buttons: gpad.buttons.map(b => ({ pressed: b.pressed, value: b.value })),
          axes: [...gpad.axes]
        });

        // Polling detection
        if (gpad.timestamp !== lastTimestampRef.current && lastTimestampRef.current !== 0) {
          const delta = gpad.timestamp - lastTimestampRef.current;
          
          if (delta > 0 && delta < 100) {
            pollingSamplesRef.current.push(delta);
            if (pollingSamplesRef.current.length > 80) pollingSamplesRef.current.shift();

            // Reaction Test Trigger
            if (reactionStatus === 'ready') {
              // Check if ANY button is pressed
              const anyPressed = gpad.buttons.some(b => b.pressed);
              if (anyPressed) {
                const now = performance.now();
                const diff = now - cueTimeRef.current;
                handleReactionPress(diff);
              }
            } else if (reactionStatus === 'waiting') {
              const anyPressed = gpad.buttons.some(b => b.pressed);
              if (anyPressed) {
                setReactionStatus('too_early');
                clearTimeout(reactionTimerRef.current);
              }
            }

            // Update UI stats roughly every 10 frames
            if (pollingSamplesRef.current.length % 5 === 0) {
              const sum = pollingSamplesRef.current.reduce((a, b) => a + b, 0);
              const avg = sum / pollingSamplesRef.current.length;
              const min = Math.min(...pollingSamplesRef.current);
              const max = Math.max(...pollingSamplesRef.current);
              
              setPollingStats({
                avg: avg.toFixed(2),
                min: min.toFixed(2),
                max: max.toFixed(2),
                hz: calculateHz(avg),
                jitter: (max - min).toFixed(2),
                samples: [...pollingSamplesRef.current]
              });
            }
          }
        }
        lastTimestampRef.current = gpad.timestamp;
      } else {
        setConnected(false);
      }
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [selectedSlot, reactionStatus]);

  const startReactionTest = () => {
    setReactionStatus('waiting');
    setReactionTime(null);
    const delay = 1000 + Math.random() * 3000;
    reactionTimerRef.current = setTimeout(() => {
      setReactionStatus('ready');
      cueTimeRef.current = performance.now();
    }, delay);
  };

  const handleReactionPress = (time) => {
    setReactionStatus('pressed');
    setReactionTime(time.toFixed(1));
    setReactionHistory(prev => [time, ...prev].slice(0, 10));
  };

  const exportCSV = () => {
    const headers = "Sample #,Interval (ms),Estimated Hz\n";
    const rows = pollingSamplesRef.current.map((s, i) => `${i+1},${s.toFixed(4)},${calculateHz(s)}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lag-test-${new Date().getTime()}.csv`;
    link.click();
  };

  const setBaseline = () => {
    setComparisons(prev => ({
      ...prev,
      baseline: { 
        avg: pollingStats.avg, 
        hz: pollingStats.hz, 
        name: controllerName,
        jitter: pollingStats.jitter
      }
    }));
  };

  return (
    <DashboardWrapper id="test">
      <ToolHeader>
        <h1><span>🎮</span> <GradientText>{t('tools.inputLag.title')}</GradientText></h1>
        <p>{t('tools.inputLag.headerDescription')}</p>
      </ToolHeader>

      <StyledTabList>
        <TabButton $active={activeTab === 'polling'} onClick={() => setActiveTab('polling')}>
          <FaBolt /> Polling Hz
        </TabButton>
        <TabButton $active={activeTab === 'reaction'} onClick={() => setActiveTab('reaction')}>
          <FaHistory /> Reaction Test
        </TabButton>
        <TabButton $active={activeTab === 'compare'} onClick={() => setActiveTab('compare')}>
          <FaExchangeAlt /> Compare Mode
        </TabButton>
      </StyledTabList>

      {!connected ? (
        <Card style={{ textAlign: 'center', padding: '4rem 2rem', marginTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔌</div>
          <h2 style={{ color: Theme.primary }}>Controller Disconnected</h2>
          <p style={{ color: Theme.textSecondary }}>Connect your device via USB or Bluetooth. Rotate sticks or press buttons to wake.</p>
        </Card>
      ) : (
        <MainContentGrid style={{ marginTop: '1rem' }}>
          <Card>
            <h3 style={{ color: Theme.primary, marginBottom: '1rem' }}>Device Hardware</h3>
            <p style={{ fontSize: '0.8rem', color: Theme.textMuted, textTransform: 'uppercase', fontWeight: 800 }}>Active Terminal</p>
            <p style={{ fontWeight: 700, marginBottom: '1.5rem' }}>{controllerName || "Gamepad detected"}</p>
            
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center', marginBottom: '-20px' }}>
              <Suspense fallback={<div>Loading...</div>}>
                <VisualGamepad 
                  gamepadName={controllerName} 
                  states={visualState} 
                  minimal={true} 
                />
              </Suspense>
            </div>

            <StatsGrid>
              <StatTile $color={Theme.primary}>
                <label>Avg Delay</label>
                <div className="value">{pollingStats.avg}<span className="unit">ms</span></div>
              </StatTile>
              <StatTile $color={Theme.accent}>
                <label>Polling</label>
                <div className="value">{pollingStats.hz}<span className="unit">Hz</span></div>
              </StatTile>
              <StatTile $color={Theme.connected}>
                <label>Min</label>
                <div className="value">{pollingStats.min}<span className="unit">ms</span></div>
              </StatTile>
              <StatTile $color={Theme.disconnected}>
                <label>Jitter</label>
                <div className="value">{pollingStats.jitter}<span className="unit">ms</span></div>
              </StatTile>
            </StatsGrid>

            <ActionButtons style={{ marginTop: '0.75rem' }}>
              <PrimaryBtn style={{ padding: '0.6rem' }} onClick={exportCSV} title="Download high-precision capture of the last 80 samples">
                <FaDownload /> Export CSV
              </PrimaryBtn>
            </ActionButtons>
          </Card>

          <Card>
            {activeTab === 'polling' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ color: Theme.primary, margin: 0 }}>High-Frequency Signal Monitor</h3>
                  <div style={{ fontSize: '0.8rem', color: Theme.textMuted }}>REAL-TIME PACKET ANALYSIS</div>
                </div>

                <MonitorContainer>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: Theme.primary, fontSize: '1.2rem' }}>{pollingStats.hz} Hz</div>
                    <div style={{ fontSize: '0.7rem', color: Theme.textMuted }}>CURRENT BANDWIDTH</div>
                  </div>
                  
                  <ChartArea>
                    {pollingStats.samples.map((s, i) => (
                      <Bar 
                        key={i} 
                        style={{ height: `${Math.min(s * 5, 100)}%` }} 
                        title={`${s.toFixed(2)}ms`}
                      />
                    ))}
                  </ChartArea>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.7rem', color: Theme.textMuted, fontWeight: 700 }}>
                    <span>PAST SAMPLES (T-80)</span>
                    <span>LIVE STREAM</span>
                  </div>
                </MonitorContainer>

                <div style={{ marginTop: '1rem', padding: '0.75rem', background: Theme.backgroundDark, borderRadius: '12px', borderLeft: `4px solid ${Theme.primary}` }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                    <FaBolt color={Theme.primary} /> Latency Tip
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: Theme.textSecondary, margin: 0 }}>
                    Rotate your sticks to saturate the loop. Lower values = better response.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'reaction' && (
              <>
                <h3 style={{ color: Theme.primary, marginBottom: '1.5rem' }}>End-to-End Latency (Reaction Test)</h3>
                
                <ReactionCue 
                  $status={reactionStatus} 
                  onClick={() => reactionStatus === 'idle' || reactionStatus === 'pressed' || reactionStatus === 'too_early' ? startReactionTest() : null}
                >
                  {reactionStatus === 'idle' && "CLICK TO START TEST"}
                  {reactionStatus === 'waiting' && "WAIT FOR BLUE..."}
                  {reactionStatus === 'ready' && "PRESS ANY BUTTON NOW!"}
                  {reactionStatus === 'pressed' && (
                    <>
                      {reactionTime} ms
                      <div className="subtext">Recorded Latency (Human + Hardware)</div>
                    </>
                  )}
                  {reactionStatus === 'too_early' && (
                    <>
                      TOO EARLY!
                      <div className="subtext">Wait for the blue cue before pressing.</div>
                    </>
                  )}
                  
                  {(reactionStatus === 'idle' || reactionStatus === 'pressed' || reactionStatus === 'too_early') && (
                    <div className="subtext">Uses performance.now() high-precision timestamps</div>
                  )}
                </ReactionCue>

                {reactionHistory.length > 0 && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Recent Attempts (ms)</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {reactionHistory.map((h, i) => (
                        <div key={i} style={{ padding: '0.5rem 1rem', background: Theme.backgroundDark, borderRadius: '8px', fontWeight: 700 }}>
                          {h.toFixed(1)}
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: Theme.textMuted, marginTop: '1rem' }}>
                      Average of last {reactionHistory.length}: {(reactionHistory.reduce((a, b) => a + b, 0) / reactionHistory.length).toFixed(1)}ms
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'compare' && (
              <>
                <h3 style={{ color: Theme.primary, marginBottom: '1.5rem' }}>Wired vs Wireless Comparison</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ padding: '1.5rem', background: Theme.backgroundDark, borderRadius: '20px', textAlign: 'center' }}>
                    <h4 style={{ marginBottom: '1rem', color: Theme.primary }}>Reference (Baseline)</h4>
                    {comparisons.baseline ? (
                      <>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{comparisons.baseline.hz} Hz</div>
                        <div style={{ color: Theme.textMuted }}>{comparisons.baseline.avg} ms avg</div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>{comparisons.baseline.name}</div>
                        <SecondaryBtn style={{ marginTop: '1rem', width: '100%' }} onClick={() => setComparisons(prev => ({ ...prev, baseline: null }))}>Clear</SecondaryBtn>
                      </>
                    ) : (
                      <div style={{ padding: '2rem 0' }}>
                        <p style={{ color: Theme.textMuted }}>No baseline set.</p>
                        <PrimaryBtn onClick={setBaseline} disabled={!connected}>Capture Current</PrimaryBtn>
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '1.5rem', background: Theme.backgroundDark, borderRadius: '20px', textAlign: 'center' }}>
                    <h4 style={{ marginBottom: '1rem', color: Theme.accent }}>Current Setup</h4>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{pollingStats.hz} Hz</div>
                    <div style={{ color: Theme.textMuted }}>{pollingStats.avg} ms avg</div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>{controllerName}</div>
                  </div>
                </div>

                {comparisons.baseline && (
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: Theme.interface, borderRadius: '20px', textAlign: 'center' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Delta Results</h4>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                      {Math.abs(pollingStats.avg - comparisons.baseline.avg).toFixed(2)} ms {pollingStats.avg > comparisons.baseline.avg ? 'INCREASE' : 'REDUCTION'}
                    </div>
                    <p style={{ color: Theme.textSecondary, marginTop: '0.5rem' }}>
                      {pollingStats.avg > comparisons.baseline.avg 
                        ? 'Your current setup is slightly slower than your baseline.' 
                        : 'Optimization successful! Your current setup is faster.'}
                    </p>
                  </div>
                )}
              </>
            )}
          </Card>
        </MainContentGrid>
      )}
    </DashboardWrapper>
  );
}
