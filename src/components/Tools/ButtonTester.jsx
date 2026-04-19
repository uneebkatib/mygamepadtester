"use client";
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Theme } from '../../styles/Theme';
import VisualGamepad from '../Common/VisualGamepad';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-10px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const ToolContainer = styled.div`
  max-width: 1150px;
  margin: 1rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border-radius: 24px;
  border: 3px solid ${Theme.primary};
  box-shadow: 
    0 16px 64px ${Theme.shadowMedium},
    0 0 40px ${Theme.glow},
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(218, 119, 86, 0.05), transparent);
    pointer-events: none;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 800;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, ${Theme.primary} 0%, ${Theme.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
`;

const ConnectionStatus = styled.div`
  text-align: center;
  padding: 0.75rem 1.5rem;
  background: ${props => props.$connected ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)'};
  color: ${props => props.$connected ? Theme.connected : Theme.disconnected};
  border: 2px solid ${props => props.$connected ? `${Theme.connected}40` : `${Theme.disconnected}40`};
  border-radius: 50px;
  margin: 0 auto 2rem auto;
  width: fit-content;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: ${props => !props.$connected ? pulse : 'none'} 2s infinite ease-in-out;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 12px currentColor;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const DataArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
`;

const ButtonCard = styled.div`
  background: ${props => props.$pressed ? Theme.primary : Theme.surface};
  color: ${props => props.$pressed ? Theme.white : Theme.textPrimary};
  border: 2px solid ${props => props.$pressed ? Theme.primary : Theme.border};
  border-radius: 14px;
  padding: 1rem;
  text-align: center;
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$pressed ? 'scale(0.95)' : 'scale(1)'};
  box-shadow: ${props => props.$pressed ? `0 8px 16px ${Theme.glow}` : `0 4px 8px ${Theme.shadow}`};

  .id {
    display: block;
    font-size: 0.65rem;
    color: ${props => props.$pressed ? 'rgba(255,255,255,0.7)' : Theme.textMuted};
    margin-bottom: 0.2rem;
    text-transform: uppercase;
  }

  .val {
    display: block;
    margin-top: 0.4rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: ${props => props.$pressed ? '#fff' : Theme.primary};
  }
`;

const ActivityPanel = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid ${Theme.border};
  box-shadow: inset 0 2px 4px ${Theme.shadow};

  h3 {
    font-size: 0.9rem;
    font-weight: 700;
    color: ${Theme.textMuted};
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const LogEntry = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: ${Theme.textSecondary};
  padding: 0.5rem 0;
  border-bottom: 1px solid ${Theme.border};
  display: flex;
  justify-content: space-between;
  animation: ${slideIn} 0.3s ease-out;

  .btn { color: ${Theme.primary}; font-weight: 700; }
  .time { color: ${Theme.textMuted}; }
`;

export default function ButtonTester() {
  const [connected, setConnected] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [axes, setAxes] = useState([]);
  const [history, setHistory] = useState([]);
  const [controllerName, setControllerName] = useState("");
  const prevButtonsRef = useRef([]);

  useEffect(() => {
    let animationFrameId;

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
        if (activeGpad.id && activeGpad.id !== controllerName) {
          setControllerName(activeGpad.id.split('(')[0].trim());
        }

        const currentStates = activeGpad.buttons.map((b, i) => ({
          index: i,
          pressed: b.pressed,
          value: b.value
        }));
        const currentAxes = [...activeGpad.axes];

        currentStates.forEach((btn, i) => {
          if (btn.pressed && (!prevButtonsRef.current[i] || !prevButtonsRef.current[i].pressed)) {
            const label = getButtonLabel(i);
            setHistory(prev => [{
              label,
              id: i,
              time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
            }, ...prev].slice(0, 5));
          }
        });

        prevButtonsRef.current = currentStates;
        setButtons(currentStates);
        setAxes(currentAxes);
      } else {
        if (connected) {
          setConnected(false);
          setButtons([]);
          setAxes([]);
        }
      }

      animationFrameId = requestAnimationFrame(updateGamepad);
    };

    animationFrameId = requestAnimationFrame(updateGamepad);
    return () => cancelAnimationFrame(animationFrameId);
  }, [connected, controllerName]);

  const getButtonLabel = (index) => {
    switch (index) {
      case 0: return "A / Cross";
      case 1: return "B / Circle";
      case 2: return "X / Square";
      case 3: return "Y / Triangle";
      case 4: return "LB / L1";
      case 5: return "RB / R1";
      case 6: return "LT / L2";
      case 7: return "RT / R2";
      case 8: return "View / Share";
      case 9: return "Menu / Options";
      case 10: return "L-Stick Push";
      case 11: return "R-Stick Push";
      case 12: return "UP";
      case 13: return "DOWN";
      case 14: return "LEFT";
      case 15: return "RIGHT";
      case 16: return "Home";
      default: return `BTN ${index}`;
    }
  };

  return (
    <ToolContainer id="test">
      <Title>Advanced Button Response Test</Title>

      <ConnectionStatus $connected={connected}>
        {connected ? `Active: ${controllerName}` : "Waiting for Controller Input..."}
      </ConnectionStatus>

      <MainGrid>
        <VisualGamepad gamepadName={controllerName} states={{ buttons, axes }} />

        <DataArea>
          <ButtonGrid>
            {(buttons.length > 0 ? buttons : Array.from({ length: 16 }).map((_, i) => ({ index: i, pressed: false, value: 0 }))).map((btn) => (
              <ButtonCard key={btn.index} $pressed={btn.pressed}>
                <span className="id">ID: {btn.index}</span>
                {getButtonLabel(btn.index)}
                <span className="val">{btn.value.toFixed(2)}</span>
              </ButtonCard>
            ))}
          </ButtonGrid>

          <ActivityPanel>
            <h3>Input Sequence Log</h3>
            {history.length > 0 ? (
              history.map((entry, idx) => (
                <LogEntry key={`${entry.time}-${idx}`}>
                  <span>Signal Source: <span className="btn">{entry.label}</span></span>
                  <span className="time">{entry.time}</span>
                </LogEntry>
              ))
            ) : (
              <p style={{ color: Theme.textMuted, fontSize: '0.8rem', margin: 0, textAlign: 'center' }}>No active inputs detected.</p>
            )}
          </ActivityPanel>
        </DataArea>
      </MainGrid>
    </ToolContainer>
  );
}
