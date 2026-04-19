"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Theme } from '../../styles/Theme';

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0 1rem;
`;

const ToolHeader = styled.div`
  text-align: center;
  background: white;
  padding: 1.5rem;
  border-radius: 24px;
  box-shadow: ${Theme.shadow};
  border: 1px solid rgba(0,0,0,0.02);

  h1 {
    font-size: 1.8rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    .icon {
      font-size: 2.2rem;
    }

    .text {
      background: ${Theme.gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    color: #64748b;
    font-size: 1rem;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const KeyboardContainer = styled.div`
  background: #0f172a;
  padding: 1.25rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 40px 100px -20px rgba(0,0,0,0.3), inset 0 0 40px rgba(0,0,0,0.5);
  border: 4px solid #1e293b;
  position: relative;
  overflow: visible;
  height: fit-content;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 0%, rgba(218, 119, 86, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const KeyGroupWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  justify-content: space-between;
`;

const MainAlphas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
`;

const NavBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 120px;
  flex-shrink: 0;
`;

const NumPadBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 160px;
  flex-shrink: 0;
`;

const KeyRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 6px;
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.8); }
  100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
`;

const StyledKey = styled.div`
  background: ${props => {
    if (props.$pressed) return '#22c55e'; // Emerald Green (Active)
    if (props.$stuck) return '#ef4444';    // Red (Error/Stuck)
    if (props.$hadInput) return Theme.primary; // Orange (History/Tested)
    return '#334155';
  }};
  color: ${props => props.$pressed || props.$stuck || props.$hadInput ? '#fff' : '#94a3b8'};
  border-radius: 4px;
  min-width: ${props => props.$width || '36px'};
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 900;
  font-size: 0.65rem;
  text-transform: uppercase;
  user-select: none;
  transition: all 0.05s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$pressed ? 'inset 0 4px 10px rgba(0,0,0,0.3)' : props.$hadInput ? '0 3px 0 #000, 0 0 10px '+Theme.primary+'30' : '0 3px 0 #05070a'};
  transform: ${props => props.$pressed ? 'translateY(3px)' : 'translateY(0)'};
  border: 1px solid ${props => props.$pressed ? '#bbf7d0' : props.$hadInput ? Theme.primary + '80' : 'rgba(255,255,255,0.05)'};
  flex-grow: ${props => props.$flex || 0};
  position: relative;

  ${props => props.$pressed && css`
    animation: ${glowPulse} 1s infinite;
    box-shadow: 0 0 25px rgba(34, 197, 94, 0.9);
  `}

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: rgba(255,255,255,0.1);
    border-radius: 1px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 24px;
  box-shadow: ${Theme.shadow};
  border: 1px solid rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .label {
    font-size: 0.75rem;
    font-weight: 800;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 2.2rem;
    font-weight: 900;
    line-height: 1;
    background: ${props => props.$color || Theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .sub {
    font-size: 0.85rem;
    color: #94a3b8;
    margin-top: 0.4rem;
    font-weight: 600;
  }
`;

const LiveFeed = styled.div`
  background: #0f172a;
  border-radius: 20px;
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 350px;
  overflow-y: auto;
  border: 1px solid #1e293b;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
`;

const FeedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;

  .code { color: ${Theme.accent}; font-weight: 700; }
  .time { color: #64748b; }
`;

const ActionBtn = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f8fafc;
    color: #0f172a;
    border-color: #cbd5e1;
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function KeyboardTester() {
    const [pressedKeys, setPressedKeys] = useState(new Set());
    const [historyKeys, setHistoryKeys] = useState(new Set());
    const [stuckKeys, setStuckKeys] = useState(new Set());
    const [eventFeed, setEventFeed] = useState([]);
    const [stats, setStats] = useState({
        apm: 0,
        cps: 0,
        nkro: 0,
        chatter: 0,
        deviceName: ''
    });

    const keyTimes = useRef(new Map());
    const pressCount = useRef(0);
    const startTime = useRef(null);

    const handleKeyDown = useCallback((e) => {
        // Prevent browser defaults for testable keys (Tab, F-keys, etc)
        if (['Tab', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'AltLeft', 'AltRight', 'MetaLeft', 'ContextMenu'].includes(e.code)) {
           e.preventDefault();
        }

        const code = e.code;
        const now = performance.now();

        if (!startTime.current) startTime.current = now;
        pressCount.current += 1;

        // Visual State
        setPressedKeys(prev => {
            const next = new Set(prev);
            next.add(code);
            if (next.size > stats.nkro) {
                setStats(s => ({ ...s, nkro: next.size }));
            }
            return next;
        });
        
        setHistoryKeys(prev => {
            const next = new Set(prev);
            next.add(code);
            return next;
        });

        // Event Feed
        const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setEventFeed(prev => [{ code, timestamp, id: now }, ...prev].slice(0, 20));

        // Chatter Detection (< 20ms)
        const lastTime = keyTimes.current.get(code);
        if (lastTime && (now - lastTime) < 20) {
            setStats(s => ({ ...s, chatter: s.chatter + 1 }));
            setStuckKeys(prev => new Set(prev).add(code));
        }
        keyTimes.current.set(code, now);

    }, [stats.nkro]);

    const handleKeyUp = useCallback((e) => {
        const code = e.code;
        setPressedKeys(prev => {
            const next = new Set(prev);
            next.delete(code);
            return next;
        });
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        const statInterval = setInterval(() => {
            if (!startTime.current) return;
            const elapsedMins = (performance.now() - startTime.current) / 60000;
            const elapsedSecs = (performance.now() - startTime.current) / 1000;
            
            setStats(s => ({
                ...s,
                apm: Math.round(pressCount.current / Math.max(0.01, elapsedMins)),
                cps: (pressCount.current / Math.max(1, elapsedSecs)).toFixed(1)
            }));
        }, 500);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(statInterval);
        };
    }, [handleKeyDown, handleKeyUp]);

    const hasSubmitted = useRef(false);
    const autoSubmitTimer = useRef(null);

    const recordTelemetry = useCallback(async () => {
        if (pressCount.current < 20 || hasSubmitted.current) return;
        try {
            await fetch('/api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tool_type: 'keyboard',
                    device_name: stats.deviceName || 'Standard HID Keyboard',
                    health_score: Math.max(0, 100 - (stats.chatter * 5)),
                    max_nkro: stats.nkro,
                    avg_response_ms: 0,
                    chatter_events: stats.chatter,
                    ghosting_errors: 0
                })
            });
            hasSubmitted.current = true;
        } catch (e) { console.error(e); }
    }, [stats]);

    // Auto submit telemetry on inactivity
    useEffect(() => {
        if (pressCount.current >= 20) {
            clearTimeout(autoSubmitTimer.current);
            autoSubmitTimer.current = setTimeout(() => {
                recordTelemetry();
            }, 5000);
        }
    }, [stats.apm, recordTelemetry]);

    const resetTest = () => {
        recordTelemetry();
        setPressedKeys(new Set());
        setHistoryKeys(new Set());
        setStuckKeys(new Set());
        setEventFeed([]);
        setStats({ apm: 0, cps: 0, nkro: 0, chatter: 0 });
        pressCount.current = 0;
        startTime.current = null;
        keyTimes.current.clear();
        hasSubmitted.current = false;
    };

    const Key = ({ code, label, width, flex, style }) => (
        <StyledKey 
            $pressed={pressedKeys.has(code)} 
            $hadInput={historyKeys.has(code)}
            $stuck={stuckKeys.has(code)}
            $width={width}
            $flex={flex}
            style={style}
        >
            {label || code.replace('Key', '').replace('Digit', '')}
        </StyledKey>
    );

    return (
        <DashboardWrapper>
            <ToolHeader>
                <h1>
                   <span className="icon">⌨️</span>
                   <span className="text">Gaming Keyboard Diagnostic</span>
                </h1>
                <p>Test for dead keys, ghosting, and mechanical switch health. Click anywhere to begin polling.</p>
            </ToolHeader>

            <MainGrid>
                <KeyboardContainer>
                    {/* F-Row */}
                    <KeyRow style={{ marginBottom: '8px' }}>
                        <Key code="Escape" label="Esc" width="40px" style={{ marginRight: '12px' }} />
                        <Key code="F1" /> <Key code="F2" /> <Key code="F3" /> <Key code="F4" style={{ marginRight: '8px' }} />
                        <Key code="F5" /> <Key code="F6" /> <Key code="F7" /> <Key code="F8" style={{ marginRight: '8px' }} />
                        <Key code="F9" /> <Key code="F10" /> <Key code="F11" /> <Key code="F12" style={{ marginRight: '8px' }} />
                        <Key code="PrintScreen" label="Prt" /> <Key code="ScrollLock" label="Scr" /> <Key code="Pause" label="Pau" />
                    </KeyRow>

                    <KeyGroupWrapper>
                        <MainAlphas>
                            <KeyRow>
                                <Key code="Backquote" label="~" /> <Key code="Digit1" /> <Key code="Digit2" /> <Key code="Digit3" /> <Key code="Digit4" /> <Key code="Digit5" /> <Key code="Digit6" /> <Key code="Digit7" /> <Key code="Digit8" /> <Key code="Digit9" /> <Key code="Digit0" /> <Key code="Minus" /> <Key code="Equal" /> <Key code="Backspace" width="70px" flex={1} />
                            </KeyRow>
                            <KeyRow>
                                <Key code="Tab" width="55px" /> <Key code="KeyQ" /> <Key code="KeyW" /> <Key code="KeyE" /> <Key code="KeyR" /> <Key code="KeyT" /> <Key code="KeyY" /> <Key code="KeyU" /> <Key code="KeyI" /> <Key code="KeyO" /> <Key code="KeyP" /> <Key code="BracketLeft" label="[" /> <Key code="BracketRight" label="]" /> <Key code="Backslash" width="45px" />
                            </KeyRow>
                            <KeyRow>
                                <Key code="CapsLock" label="Caps" width="65px" /> <Key code="KeyA" /> <Key code="KeyS" /> <Key code="KeyD" /> <Key code="KeyF" /> <Key code="KeyG" /> <Key code="KeyH" /> <Key code="KeyJ" /> <Key code="KeyK" /> <Key code="KeyL" /> <Key code="Semicolon" label=";" /> <Key code="Quote" label="'" /> <Key code="Enter" width="85px" flex={1} />
                            </KeyRow>
                            <KeyRow>
                                <Key code="ShiftLeft" label="Shift" width="90px" /> <Key code="KeyZ" /> <Key code="KeyX" /> <Key code="KeyC" /> <Key code="KeyV" /> <Key code="KeyB" /> <Key code="KeyN" /> <Key code="KeyM" /> <Key code="Comma" label="," /> <Key code="Period" label="." /> <Key code="Slash" label="/" /> <Key code="ShiftRight" label="Shift" width="100px" flex={1.2} />
                            </KeyRow>
                            <KeyRow>
                                <Key code="ControlLeft" label="Ctrl" width="50px" /> <Key code="MetaLeft" label="Win" /> <Key code="AltLeft" label="Alt" /> <Key code="Space" width="200px" flex={4} /> <Key code="AltRight" label="Alt" /> <Key code="MetaRight" label="Win" /> <Key code="ContextMenu" label="Fn" /> <Key code="ControlRight" label="Ctrl" width="50px" />
                            </KeyRow>
                        </MainAlphas>

                        <NavBlock>
                            <KeyRow>
                                <Key code="Insert" label="Ins" /> <Key code="Home" /> <Key code="PageUp" label="PgU" />
                            </KeyRow>
                            <KeyRow>
                                <Key code="Delete" label="Del" /> <Key code="End" /> <Key code="PageDown" label="PgD" />
                            </KeyRow>
                            <div style={{ height: '36px' }} />
                            <KeyRow>
                                <div style={{ width: '36px' }} /> <Key code="ArrowUp" label="↑" /> <div style={{ width: '36px' }} />
                            </KeyRow>
                            <KeyRow>
                                <Key code="ArrowLeft" label="←" /> <Key code="ArrowDown" label="↓" /> <Key code="ArrowRight" label="→" />
                            </KeyRow>
                        </NavBlock>

                        <NumPadBlock>
                            <KeyRow>
                                <Key code="NumLock" label="Num" /> <Key code="NumpadDivide" label="/" /> <Key code="NumpadMultiply" label="*" /> <Key code="NumpadSubtract" label="-" />
                            </KeyRow>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                                    <KeyRow> <Key code="Numpad7" label="7" /> <Key code="Numpad8" label="8" /> <Key code="Numpad9" label="9" /> </KeyRow>
                                    <KeyRow> <Key code="Numpad4" label="4" /> <Key code="Numpad5" label="5" /> <Key code="Numpad6" label="6" /> </KeyRow>
                                    <KeyRow> <Key code="Numpad1" label="1" /> <Key code="Numpad2" label="2" /> <Key code="Numpad3" label="3" /> </KeyRow>
                                    <KeyRow> <Key code="Numpad0" label="0" flex={1} /> <Key code="NumpadDecimal" label="." /> </KeyRow>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <Key code="NumpadAdd" label="+" style={{ height: '78px' }} />
                                    <Key code="NumpadEnter" label="Ent" style={{ height: '78px' }} />
                                </div>
                            </div>
                        </NumPadBlock>
                    </KeyGroupWrapper>
                </KeyboardContainer>

                <Sidebar>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <StatCard>
                            <div className="label">Live APM</div>
                            <div className="value">{stats.apm}</div>
                            <div className="sub">ACTIONS / MIN</div>
                        </StatCard>
                        <StatCard>
                            <div className="label">Max NKRO</div>
                            <div className="value" style={{ background: Theme.gradientOrange, WebkitBackgroundClip: 'text' }}>{stats.nkro}</div>
                            <div className="sub">SIMULTANEOUS</div>
                        </StatCard>
                    </div>

                    <StatCard>
                        <div className="label">Keystroke Intensity</div>
                        <div className="value" style={{ color: Theme.accent }}>{stats.cps}</div>
                        <div className="sub">CLICKS PER SECOND</div>
                    </StatCard>

                    <StatCard>
                        <div className="label">Keyboard Model</div>
                        <input 
                            type="text" 
                            placeholder="e.g. SteelSeries Apex"
                            value={stats.deviceName}
                            onChange={(e) => setStats(s => ({ ...s, deviceName: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                textAlign: 'center',
                                fontSize: '0.9rem',
                                marginTop: '5px'
                            }}
                        />
                        <div className="sub">FOR GLOBAL STATS</div>
                    </StatCard>

                    <LiveFeed>
                        {eventFeed.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
                                Awaiting hardware events...
                            </div>
                        ) : (
                            eventFeed.map(item => (
                                <FeedItem key={item.id}>
                                    <span className="code">{item.code}</span>
                                    <span className="time">{item.timestamp}</span>
                                </FeedItem>
                            ))
                        )}
                    </LiveFeed>

                    <ActionBtn onClick={resetTest}>RESET ANALYTICS</ActionBtn>
                </Sidebar>
            </MainGrid>
        </DashboardWrapper>
    );
}
