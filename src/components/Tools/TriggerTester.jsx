"use client";
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
`;

const ToolHeader = styled.div`
  text-align: center;
  background: white;
  padding: 1.25rem;
  border-radius: 20px;
  box-shadow: ${Theme.shadow};
  border: 1px solid rgba(0,0,0,0.03);

  h1 {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    .icon {
      font-size: 1.8rem;
    }

    .text {
      background: ${Theme.gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    color: #666;
    font-size: 0.95rem;
  }
`;

const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TriggerCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: ${Theme.shadow};
  border: 1px solid rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const VisualContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: 1rem;
  height: 220px;
`;

const TriggerTrack = styled.div`
  width: 85px;
  height: 220px;
  background: #f8fafc;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.08);
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: flex-end;
`;

const TriggerFill = styled.div`
  width: 100%;
  background: ${props => props.$val >= 0.99 ? Theme.gradientOrange : Theme.gradient};
  height: ${props => Math.max(3, props.$val * 100)}%;
  transition: height 0.05s cubic-bezier(0.1, 0.7, 0.1, 1);
  position: relative;
  box-shadow: 0 -8px 30px ${props => props.$val >= 0.99 ? 'rgba(218, 119, 86, 0.6)' : 'rgba(28, 107, 187, 0.3)'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: #fff;
    opacity: 0.9;
    box-shadow: 0 0 15px #fff;
  }

  ${props => props.$val >= 0.99 && `
    animation: pulseGlow 1.5s infinite;
  `}

  @keyframes pulseGlow {
    0% { filter: brightness(1); }
    50% { filter: brightness(1.3); }
    100% { filter: brightness(1); }
  }
`;

const PeakMarker = styled.div`
    position: absolute;
    bottom: ${props => props.$val * 100}%;
    left: 0;
    width: 100%;
    height: 2px;
    background: #0f172a;
    z-index: 5;
    transition: bottom 0.2s ease;
    
    &::after {
      content: 'PEAK';
      position: absolute;
      right: 4px;
      top: -10px;
      font-size: 8px;
      font-weight: 900;
      color: #0f172a;
      background: #f1f5f9;
      padding: 0 4px;
      border-radius: 4px;
    }
`;

const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
`;

const MetricBox = styled.div`
  text-align: left;
  
  .label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.2rem;
  }
  
  .value {
    font-size: 1.5rem;
    font-weight: 900;
    color: #0f172a;
    font-family: 'JetBrains Mono', monospace;
  }

  &.digital {
    .value {
        color: ${props => props.$active ? Theme.primary : '#cbd5e1'};
    }
  }
`;

const StatusBanner = styled.div`
  background: ${props => props.$connected ? '#f0fef4' : '#fff1f2'};
  color: ${props => props.$connected ? '#166534' : '#991b1b'};
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid ${props => props.$connected ? '#bbf7d0' : '#fecaca'};

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: currentColor;
    animation: ${props => props.$connected ? 'pulse 2s infinite' : 'none'};
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

export default function TriggerTester() {
    const [connected, setConnected] = useState(false);
    const [lt, setLt] = useState(0);
    const [rt, setRt] = useState(0);
    const [maxLt, setMaxLt] = useState(0);
    const [maxRt, setMaxRt] = useState(0);
    const [controllerName, setControllerName] = useState("");
    const requestRef = useRef();

    useEffect(() => {
        const updateGamepad = () => {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            let activeGpad = null;

            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] && gamepads[i].connected) {
                    activeGpad = gamepads[i];
                    break;
                }
            }

            if (activeGpad) {
                if (!connected) setConnected(true);
                if (activeGpad.id !== controllerName) setControllerName(activeGpad.id);
                
                // Standard Mapping: LT=6, RT=7
                const currentLt = activeGpad.buttons[6]?.value || 0;
                const currentRt = activeGpad.buttons[7]?.value || 0;
                
                setLt(currentLt);
                setRt(currentRt);

                setMaxLt(prev => Math.max(prev, currentLt));
                setMaxRt(prev => Math.max(prev, currentRt));
            } else {
                if (connected) {
                    setConnected(false);
                    setLt(0);
                    setRt(0);
                }
            }
            requestRef.current = requestAnimationFrame(updateGamepad);
        };

        requestRef.current = requestAnimationFrame(updateGamepad);
        return () => cancelAnimationFrame(requestRef.current);
    }, [connected, controllerName]);

    // Telemetry Submission (Debounced)
    useEffect(() => {
        if (!connected || (maxLt === 0 && maxRt === 0)) return;

        const timeoutId = setTimeout(async () => {
            try {
                await fetch('/api.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tool_type: 'trigger',
                        controller_name: controllerName,
                        max_lt: parseFloat(maxLt.toFixed(4)),
                        max_rt: parseFloat(maxRt.toFixed(4))
                    })
                });
            } catch (err) {
                console.error("Trigger telemetry error:", err);
            }
        }, 8000);

        return () => clearTimeout(timeoutId);
    }, [maxLt, maxRt, connected, controllerName]);

    const resetPeaks = () => {
        setMaxLt(0);
        setMaxRt(0);
    };

    return (
        <DashboardWrapper>
            <ToolHeader>
                <h1>
                    <span className="icon">🏹</span>
                    <span className="text">Analog Trigger Sensitivity Tester</span>
                </h1>
                <p>Check 0-100% pressure range for L2/R2 & LT/RT inputs in real time.</p>
            </ToolHeader>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <StatusBanner $connected={connected}>
                    <div className="dot" />
                    {connected ? (controllerName.split('(')[0] || "Controller Active") : "Squeeze Triggers to Start..."}
                </StatusBanner>
                { (maxLt > 0 || maxRt > 0) && (
                    <button 
                        onClick={resetPeaks}
                        style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', color: '#64748b' }}
                    >
                        Reset Peaks
                    </button>
                )}
            </div>

            <MainContentGrid>
                {/* 🔴 LEFT TRIGGER */}
                <TriggerCard>
                    <h2><span>🎮</span> Left Trigger (LT / L2)</h2>
                    <VisualContainer>
                        <TriggerTrack>
                            <TriggerFill $val={lt} />
                            <PeakMarker $val={maxLt} />
                        </TriggerTrack>
                        <MetricsContainer>
                            <MetricBox>
                                <div className="label">Live Pressure</div>
                                <div className="value" style={{ color: lt > 0 ? Theme.primary : '#0f172a' }}>{(lt * 100).toFixed(1)}%</div>
                            </MetricBox>
                            <MetricBox>
                                <div className="label">Max Reach</div>
                                <div className="value">{(maxLt * 100).toFixed(1)}%</div>
                            </MetricBox>
                            <MetricBox>
                                <div className="label">Raw Value</div>
                                <div className="value" style={{ fontSize: '0.85rem', color: '#64748b' }}>{lt.toFixed(4)}</div>
                            </MetricBox>
                        </MetricsContainer>
                    </VisualContainer>
                </TriggerCard>

                {/* 🔵 RIGHT TRIGGER */}
                <TriggerCard>
                    <h2><span>🕹️</span> Right Trigger (RT / R2)</h2>
                    <VisualContainer>
                        <TriggerTrack>
                            <TriggerFill $val={rt} />
                            <PeakMarker $val={maxRt} />
                        </TriggerTrack>
                        <MetricsContainer>
                            <MetricBox>
                                <div className="label">Live Pressure</div>
                                <div className="value" style={{ color: rt > 0 ? Theme.primary : '#0f172a' }}>{(rt * 100).toFixed(1)}%</div>
                            </MetricBox>
                            <MetricBox>
                                <div className="label">Max Reach</div>
                                <div className="value">{(maxRt * 100).toFixed(1)}%</div>
                            </MetricBox>
                            <MetricBox>
                                <div className="label">Raw Value</div>
                                <div className="value" style={{ fontSize: '0.85rem', color: '#64748b' }}>{rt.toFixed(4)}</div>
                            </MetricBox>
                        </MetricsContainer>
                    </VisualContainer>
                </TriggerCard>
            </MainContentGrid>
        </DashboardWrapper>
    );
}
