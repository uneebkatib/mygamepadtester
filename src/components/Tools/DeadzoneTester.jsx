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
  grid-template-columns: 350px 1fr;
  gap: 1.25rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: ${Theme.shadow};
  border: 1px solid rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: min-content;
`;

const MonitorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const DeadzoneCanvasWrapper = styled.div`
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

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CanvasWrapper = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  background: #f8fafc;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;

  &::before, &::after {
    content: ''; position: absolute; background: #e2e8f0; z-index: 1;
  }
  &::before { width: 1px; height: 100%; left: 50%; transform: translateX(-50%); }
  &::after { width: 100%; height: 1px; top: 50%; transform: translateY(-50%); }
`;

const DeadzoneOverlay = styled.div`
  position: absolute;
  width: ${props => props.$size}%;
  height: ${props => props.$size}%;
  background: ${props => props.$active ? 'rgba(34, 197, 94, 0.15)' : 'rgba(218, 119, 86, 0.15)'};
  border: 2px dashed ${props => props.$active ? '#22c55e' : Theme.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
  transition: all 0.2s ease;
`;

const StickPointer = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  background: ${props => props.$active ? '#22c55e' : '#64748b'};
  border-radius: 50%;
  box-shadow: 0 0 15px ${props => props.$active ? 'rgba(34, 197, 94, 0.6)' : 'transparent'};
  left: calc(50% + ${props => props.$x * 50}% - 7px);
  top: calc(50% + ${props => props.$y * 50}% - 7px);
  z-index: 10;
  transition: background 0.1s;
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

const ControlInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-size: 0.75rem;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  input {
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
    border-radius: 10px;
    font-weight: 700;
    color: #0f172a;
    font-family: inherit;
    width: 100%;
    text-align: center;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: ${Theme.primary};
      background: white;
      box-shadow: 0 0 0 4px ${Theme.primary}15;
    }
  }
`;

const AutoDetectBtn = styled.button`
  background: ${Theme.gradient};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 8px 15px ${Theme.primary}40;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px ${Theme.primary}60;
  }
  
  &:disabled {
    opacity: 0.5;
    transform: none;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const CoordinateBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #94a3b8;
  background: #f8fafc;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
`;

export default function DeadzoneTester() {
    const [connected, setConnected] = useState(false);
    const [axes, setAxes] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 });
    const [innerDz, setInnerDz] = useState(10);
    const [controllerName, setControllerName] = useState("");
    const [isSampling, setIsSampling] = useState(false);
    const [sampleProgress, setSampleProgress] = useState(0);
    const [maxFoundMagnitude, setMaxFoundMagnitude] = useState(0);
    
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
                setControllerName(activeGpad.id);

                const currentAxes = {
                    lx: activeGpad.axes[0] || 0,
                    ly: activeGpad.axes[1] || 0,
                    rx: activeGpad.axes[2] || 0,
                    ry: activeGpad.axes[3] || 0
                };
                setAxes(currentAxes);

                if (isSampling) {
                    const lMag = Math.sqrt(currentAxes.lx**2 + currentAxes.ly**2);
                    const rMag = Math.sqrt(currentAxes.rx**2 + currentAxes.ry**2);
                    const currentMax = Math.max(lMag, rMag);
                    setMaxFoundMagnitude(prev => Math.max(prev, currentMax));
                }
            } else {
                if (connected) setConnected(false);
            }
            requestRef.current = requestAnimationFrame(updateGamepad);
        };

        requestRef.current = requestAnimationFrame(updateGamepad);
        return () => cancelAnimationFrame(requestRef.current);
    }, [connected, isSampling]);

    const startSampling = () => {
        setIsSampling(true);
        setMaxFoundMagnitude(0);
        setSampleProgress(0);
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setSampleProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsSampling(false);
                // Set suggested deadzone based on max jitter found + small buffer
                const suggested = Math.ceil(maxFoundMagnitude * 100) + 1;
                setInnerDz(Math.min(suggested, 25)); // Cap auto-suggest at 25% for safety
            }
        }, 100);
    };

    const checkActive = (x, y) => {
        const magnitude = Math.sqrt(x * x + y * y);
        return magnitude > (innerDz / 100);
    };

    return (
        <DashboardWrapper>
            <ToolHeader>
                <h1>
                    <span className="icon">🛡️</span>
                    <span className="text">Deadzone Configuration Tuner</span>
                </h1>
                <p>Detect stick drift & calibrate your analog stick thresholds for maximum precision.</p>
            </ToolHeader>

            <StatusBanner $connected={connected}>
                <div className="dot" />
                {connected ? (controllerName.split('(')[0] || "Controller Ready") : "Plug in a controller & press any button..."}
            </StatusBanner>

            <MainContentGrid>
                <Card>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.5rem' }}>🔧 Tuner Settings</h3>
                    
                    <ControlInput>
                        <label>Inner Deadzone (%)</label>
                        <input 
                            type="number" 
                            step="0.1"
                            value={innerDz} 
                            onChange={e => setInnerDz(parseFloat(e.target.value) || 0)} 
                            min={0} 
                            max={100} 
                        />
                    </ControlInput>

                    <div style={{ marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem' }}>Automatic Calibration</h4>
                        <AutoDetectBtn 
                            onClick={startSampling} 
                            disabled={!connected || isSampling}
                        >
                            {isSampling ? `SAMPLING NOISE (${sampleProgress}%)` : 'AUTO-SUGGEST DEADZONE'}
                        </AutoDetectBtn>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem', lineHeight: '1.6' }}>
                            Leave sticks untouched. The tool will sample idle jitter and calculate your minimum threshold.
                        </p>
                    </div>

                    {maxFoundMagnitude > 0 && !isSampling && (
                        <div style={{ background: Theme.surface, padding: '1rem', borderRadius: '12px', border: `1px solid ${Theme.border}` }}>
                             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: Theme.primary }}>PEAK IDLE RADIUS</div>
                             <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'monospace' }}>{(maxFoundMagnitude * 100).toFixed(2)}%</div>
                        </div>
                    )}
                </Card>

                <MonitorGrid>
                    <DeadzoneCanvasWrapper>
                        <h3>🕹️ Left Stick</h3>
                        <CoordinateBadge>
                            X:{axes.lx.toFixed(3)} Y:{axes.ly.toFixed(3)}
                        </CoordinateBadge>
                        <CanvasWrapper>
                            <DeadzoneOverlay $size={innerDz * 2} $active={checkActive(axes.lx, axes.ly)} />
                            <StickPointer $x={axes.lx} $y={axes.ly} $active={checkActive(axes.lx, axes.ly)} />
                        </CanvasWrapper>
                    </DeadzoneCanvasWrapper>

                    <DeadzoneCanvasWrapper>
                        <h3>🕹️ Right Stick</h3>
                        <CoordinateBadge>
                            X:{axes.rx.toFixed(3)} Y:{axes.ry.toFixed(3)}
                        </CoordinateBadge>
                        <CanvasWrapper>
                            <DeadzoneOverlay $size={innerDz * 2} $active={checkActive(axes.rx, axes.ry)} />
                            <StickPointer $x={axes.rx} $y={axes.ry} $active={checkActive(axes.rx, axes.ry)} />
                        </CanvasWrapper>
                    </DeadzoneCanvasWrapper>
                </MonitorGrid>
            </MainContentGrid>
        </DashboardWrapper>
    );
}
