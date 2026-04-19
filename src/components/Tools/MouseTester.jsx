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

    .icon { font-size: 2.2rem; }
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

const VisualContainer = styled.div`
  background: #0f172a;
  padding: 2.5rem;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 40px 100px -20px rgba(0,0,0,0.3), inset 0 0 40px rgba(0,0,0,0.5);
  border: 4px solid #1e293b;
  position: relative;
  overflow: hidden;
  min-height: 500px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const glowPulse = keyframes`
  0% { filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.4)); }
  50% { filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.8)); }
  100% { filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.4)); }
`;

const SvgMouse = styled.svg`
  width: 280px;
  height: auto;
  filter: drop-shadow(0 30px 60px rgba(0,0,0,0.6));
  
  .part {
    transition: fill 0.05s ease, filter 0.1s ease;
  }

  .active-green { 
    fill: #22c55e !important; 
    filter: drop-shadow(0 0 12px rgba(34, 197, 94, 0.8));
    stroke: #bbf7d0 !important;
    stroke-width: 2px !important;
  }
  
  .history-orange { 
    fill: ${Theme.primary} !important; 
    filter: drop-shadow(0 0 5px ${Theme.primary}40);
    opacity: 1;
    stroke: #fde68a !important;
    stroke-width: 1px !important;
  }

  .scroll-arrow {
    fill: #22c55e;
    opacity: 0;
    transition: opacity 0.1s;
    &.active { opacity: 1; }
  }

  .rgb-line {
    fill: none;
    stroke: ${Theme.primary};
    stroke-width: 2;
    stroke-linecap: round;
    opacity: 0.3;
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
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #1e293b;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
`;

const FeedItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0.75rem;
  background: ${props => props.$isDouble ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.03)'};
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  border-left: 3px solid ${props => props.$isDouble ? '#ef4444' : 'transparent'};

  .btn { color: ${props => props.$isDouble ? '#ef4444' : Theme.accent}; font-weight: 700; }
  .interval { color: #64748b; }
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

export default function MouseTester() {
    const [activeButtons, setActiveButtons] = useState(new Set());
    const [historyButtons, setHistoryButtons] = useState(new Set());
    const [scrollState, setScrollState] = useState(null); // 'up' or 'down'
    const [eventFeed, setEventFeed] = useState([]);
    const [stats, setStats] = useState({
        cps: 0,
        totalClicks: 0,
        doubles: 0,
        fastestGap: Infinity,
        deviceName: ''
    });

    const clickTimes = useRef(new Map());
    const pressCount = useRef(0);
    const startTime = useRef(null);
    const scrollTimeout = useRef(null);

    const getButtonName = (btn) => {
        switch(btn) {
            case 0: return 'LEFT';
            case 1: return 'MIDDLE';
            case 2: return 'RIGHT';
            case 3: return 'BT 4';
            case 4: return 'BT 5';
            default: return `BTN ${btn}`;
        }
    };

    const handleMouseDown = useCallback((e) => {
        // Prevent default only if hitting side buttons to stop back/forward navigation
        if (e.button >= 3) e.preventDefault();
        
        const btn = e.button;
        const now = performance.now();
        if (!startTime.current) startTime.current = now;
        
        pressCount.current += 1;

        // Visual State
        setActiveButtons(prev => {
            const next = new Set(prev);
            next.add(btn);
            return next;
        });
        setHistoryButtons(prev => new Set(prev).add(btn));

        // Bounce/Double Click Detection
        const lastTime = clickTimes.current.get(btn);
        let interval = 0;
        let isDouble = false;
        
        if (lastTime) {
            interval = Math.round(now - lastTime);
            if (interval < 30) {
                isDouble = true;
                setStats(s => ({ ...s, doubles: s.doubles + 1 }));
            }
            if (interval < stats.fastestGap) {
                setStats(s => ({ ...s, fastestGap: interval }));
            }
        }
        clickTimes.current.set(btn, now);

        // Feed
        const btnName = getButtonName(btn);
        setEventFeed(prev => [{
            name: btnName,
            interval: interval === 0 ? 'START' : `${interval}ms`,
            isDouble,
            id: now
        }, ...prev].slice(0, 15));

        setStats(s => ({ ...s, totalClicks: s.totalClicks + 1 }));
    }, [stats.fastestGap]);

    const handleMouseUp = useCallback((e) => {
        setActiveButtons(prev => {
            const next = new Set(prev);
            next.delete(e.button);
            return next;
        });
    }, []);

    const handleWheel = useCallback((e) => {
        setScrollState(e.deltaY < 0 ? 'up' : 'down');
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => setScrollState(null), 150);
    }, []);

    const handleContextMenu = (e) => e.preventDefault();

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('contextmenu', handleContextMenu);
        
        const cpsInterval = setInterval(() => {
            if (!startTime.current) return;
            const elapsedSecs = (performance.now() - startTime.current) / 1000;
            setStats(s => ({
                ...s,
                cps: (pressCount.current / Math.max(1, elapsedSecs)).toFixed(1)
            }));
        }, 500);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('contextmenu', handleContextMenu);
            clearInterval(cpsInterval);
        };
    }, [handleMouseDown, handleMouseUp, handleWheel]);

    const hasSubmitted = useRef(false);
    const autoSubmitTimer = useRef(null);

    const recordTelemetry = useCallback(async () => {
        if (stats.totalClicks < 10 || hasSubmitted.current) return;
        try {
                await fetch('/api.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tool_type: 'mouse',
                        device_name: stats.deviceName || 'Standard HID Mouse',
                        health_score: Math.max(0, 100 - (stats.doubles * 10)),
                        chatter_events: stats.doubles,
                        fastest_gap: stats.fastestGap === Infinity ? 0 : stats.fastestGap,
                        total_clicks: stats.totalClicks,
                        scroll_steps: 0
                    })
                });
                hasSubmitted.current = true;
        } catch (e) { console.error(e); }
    }, [stats]);

    // Auto submit telemetry on inactivity
    useEffect(() => {
        if (stats.totalClicks >= 10) {
            clearTimeout(autoSubmitTimer.current);
            autoSubmitTimer.current = setTimeout(() => {
                recordTelemetry();
            }, 5000);
        }
    }, [stats.cps, recordTelemetry]);

    const resetTest = () => {
        recordTelemetry();
        setActiveButtons(new Set());
        setHistoryButtons(new Set());
        setScrollState(null);
        setEventFeed([]);
        setStats({ cps: 0, totalClicks: 0, doubles: 0, fastestGap: Infinity });
        pressCount.current = 0;
        startTime.current = null;
        clickTimes.current.clear();
        hasSubmitted.current = false;
    };

    return (
        <DashboardWrapper>
            <ToolHeader>
                <h1>
                   <span className="icon">🖱️</span>
                   <span className="text">Gaming Mouse Diagnostic</span>
                </h1>
                <p>Check button registration, scroll behavior, and Omron switch bounce errors in real-time.</p>
            </ToolHeader>

            <MainGrid>
                <VisualContainer>
                    <SvgMouse viewBox="0 0 200 300">
                        <defs>
                            <linearGradient id="mouseBody" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#2D3A4F" />
                                <stop offset="100%" stopColor="#0B121E" />
                            </linearGradient>
                            <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#111" />
                                <stop offset="50%" stopColor="#333" />
                                <stop offset="100%" stopColor="#111" />
                            </linearGradient>
                            <filter id="innerShadow">
                                <feFlood floodColor="black" />
                                <feComposite operator="out" in2="SourceGraphic" />
                                <feGaussianBlur stdDeviation="3" />
                                <feComposite operator="atop" in2="SourceGraphic" />
                            </filter>
                        </defs>

                        {/* Ergonomic Shell Shadow/Glow */}
                        <ellipse cx="100" cy="275" rx="70" ry="15" fill="rgba(0,0,0,0.4)" filter="blur(10px)" />

                        {/* Main Body Shell (Realistic Contours) */}
                        <path d="M 40 120 C 30 50, 70 15, 100 15 C 130 15, 170 50, 160 120 L 178 220 C 185 285, 140 295, 100 295 C 60 295, 15 285, 22 220 Z" 
                              fill="url(#mouseBody)" stroke="#1e293b" strokeWidth="2" />
                        
                        {/* Side Textures (Grips) */}
                        <path d="M 22 220 Q 15 240 22 260 M 178 220 Q 185 240 178 260" fill="none" stroke="#2D3A4F" strokeWidth="4" strokeLinecap="round" opacity="0.5" />

                        {/* Left Main Button (Aggressive Cut) */}
                        <path d="M 40 120 C 30 50, 70 18, 98 22 L 98 120 L 45 130 Z" 
                              className={`part ${activeButtons.has(0) ? 'active-green' : historyButtons.has(0) ? 'history-orange' : ''}`}
                              fill="#334155" stroke="#0B121E" strokeWidth="1" />

                        {/* Right Main Button (Aggressive Cut) */}
                        <path d="M 160 120 C 170 50, 130 18, 102 22 L 102 120 L 155 130 Z" 
                              className={`part ${activeButtons.has(2) ? 'active-green' : historyButtons.has(2) ? 'history-orange' : ''}`}
                              fill="#334155" stroke="#0B121E" strokeWidth="1" />

                        {/* Middle/Wheel Bridge */}
                        <rect x="98" y="20" width="4" height="110" fill="#0B121E" />
                        
                        {/* Scroll Wheel (3D Look) */}
                        <rect x="91" y="45" width="18" height="45" rx="9" 
                              className={`part ${activeButtons.has(1) ? 'active-green' : historyButtons.has(1) ? 'history-orange' : ''}`}
                              fill="url(#wheelGradient)" stroke="#0B121E" />
                        <rect x="94" y="55" width="12" height="2" fill="#555" rx="1" />
                        <rect x="94" y="65" width="12" height="2" fill="#555" rx="1" />
                        <rect x="94" y="75" width="12" height="2" fill="#555" rx="1" />

                        {/* Scroll Indicators */}
                        <path d="M 100 35 L 95 40 L 105 40 Z" className={`scroll-arrow ${scrollState === 'up' ? 'active' : ''}`} />
                        <path d="M 100 100 L 105 95 L 95 95 Z" className={`scroll-arrow ${scrollState === 'down' ? 'active' : ''}`} />

                        {/* Thumb Side Buttons (High Detail) */}
                        <rect x="18" y="165" width="8" height="25" rx="4"
                              className={`part ${activeButtons.has(3) ? 'active-green' : historyButtons.has(3) ? 'history-orange' : ''}`}
                              fill="#1e293b" stroke="#0B121E" />
                        <rect x="18" y="195" width="8" height="25" rx="4"
                              className={`part ${activeButtons.has(4) ? 'active-green' : historyButtons.has(4) ? 'history-orange' : ''}`}
                              fill="#1e293b" stroke="#0B121E" />

                        {/* RGB Logo Area */}
                        <path d="M 100 190 L 120 215 L 100 240 L 80 215 Z" fill={activeButtons.size > 0 ? '#22c55e' : '#1e293b'} 
                              filter="blur(1px)" style={{ transition: 'fill 0.2s', opacity: 0.8 }} />
                        <path d="M 100 195 L 115 215 L 100 235 L 85 215 Z" fill={activeButtons.size > 0 ? '#86efac' : '#0B121E'} />
                        
                        {/* Body Panel Lines */}
                        <path d="M 45 130 L 70 200 M 155 130 L 130 200" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    </SvgMouse>
                </VisualContainer>

                <Sidebar>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <StatCard>
                            <div className="label">Clicks / Sec</div>
                            <div className="value">{stats.cps}</div>
                            <div className="sub">AVG SPEED</div>
                        </StatCard>
                        <StatCard>
                            <div className="label">Gap (ms)</div>
                            <div className="value" style={{ background: Theme.gradientOrange, WebkitBackgroundClip: 'text' }}>
                                {stats.fastestGap === Infinity ? 0 : stats.fastestGap}
                            </div>
                            <div className="sub">FASTEST PK</div>
                        </StatCard>
                    </div>

                    <StatCard $color={stats.doubles > 0 ? '#ef4444' : null}>
                        <div className="label">Double Clicks</div>
                        <div className="value">{stats.doubles}</div>
                        <div className="sub">BOUNCE ERRORS</div>
                    </StatCard>

                    <StatCard>
                        <div className="label">Mouse Model</div>
                        <input 
                            type="text" 
                            placeholder="e.g. Logitech G Pro"
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
                                Awaiting click events...
                            </div>
                        ) : (
                            eventFeed.map(item => (
                                <FeedItem key={item.id} $isDouble={item.isDouble}>
                                    <span className="btn">{item.name}</span>
                                    <span className="interval">{item.interval}</span>
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
