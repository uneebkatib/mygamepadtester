'use client'

import React, { useState, useEffect, memo, useCallback } from "react";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";
import { MainGamepad } from "../MainGamepad/MainGamepad";
import { useI18n } from "../../contexts/I18nContext";

const MainWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  contain: layout style;
  min-height: 200px;
`;

// Use div instead of ul to avoid list/ARIA conflicts
const StyledTabList = styled.div`
  display: flex;
  border-radius: 0 0 1rem 1rem;
  font-size: 1.1rem;
  background-color: ${Theme.interface};
  width: fit-content;
  margin: 0 auto;
  flex-wrap: nowrap;
  contain: layout style;
  min-height: 60px;
  padding: 0;
  gap: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0 0 0.75rem 0.75rem;
    font-size: 0.9rem;
  }
`;

// Simple wrapper for tab buttons
const TabWrapper = styled.div`
  display: contents;
`;

const TabButton = styled.button`
  width: 11rem;
  padding: 1rem;
  box-sizing: border-box;
  color: ${props => props.$active ? Theme.primaryText || '#B85D3D' : Theme.textPrimary};
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
  
  &:last-child {
    border-right: none;
  }
  
  &:hover {
    background: ${Theme.backgroundLight};
  }

  @media (max-width: 600px) {
    width: auto;
    min-width: 5.5rem;
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
    border-bottom: ${props => props.$active ? `3px solid ${Theme.primary}` : 'none'};
  }
`;

const StyledConnected = styled.p`
  color: ${Theme.connected};
  font-size: 0.9rem;
  margin-top: 0.3rem;
  min-height: 1.2rem;
  contain: layout style;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    margin-top: 0.2rem;
  }
`;

const StyledNotFound = styled.p`
  color: ${Theme.textMuted};
  font-size: 0.9rem;
  margin-top: 0.3rem;
  min-height: 1.2rem;
  contain: layout style;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    margin-top: 0.2rem;
  }
`;

const MainComponent = () => {
  const { t, isRTL } = useI18n();
  const [selectedGamepad, setSelectedGamepad] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState([false, false, false, false]);
  const [gamepadNames, setGamepadNames] = useState(['', '', '', '']);

  const checkGamepadStatus = useCallback(() => {
    try {
      if (typeof navigator === 'undefined' || !navigator.getGamepads) return;

      const gamepads = navigator.getGamepads();
      const newStatus = [false, false, false, false];
      const newNames = ['', '', '', ''];

      for (let i = 0; i < 4; i++) {
        if (gamepads[i]) {
          newStatus[i] = gamepads[i].connected;
          if (gamepads[i].connected) {
            const fullName = gamepads[i].id || '';
            const shortName = fullName.split('(')[0].trim().substring(0, 18);
            newNames[i] = shortName || t('tester.gamepad');
          }
        }
      }

      setConnectionStatus(newStatus);
      setGamepadNames(newNames);
    } catch (error) {
      console.error("Error checking gamepad status:", error);
      setConnectionStatus([false, false, false, false]);
    }
  }, [t]);

  useEffect(() => {
    checkGamepadStatus();
    const interval = setInterval(checkGamepadStatus, 1500);
    return () => clearInterval(interval);
  }, [checkGamepadStatus]);

  return (
    <MainWrapper>
      <StyledTabList role="tablist" aria-label="Gamepad selection">
        {[0, 1, 2, 3].map((index) => (
          <TabButton
            key={index}
            role="tab"
            aria-selected={selectedGamepad === index}
            aria-controls={`gamepad-panel-${index}`}
            id={`gamepad-tab-${index}`}
            $active={selectedGamepad === index}
            onClick={() => setSelectedGamepad(index)}
          >
            {connectionStatus[index] ? `${index + 1}: ${gamepadNames[index]}` : `${t('tester.gamepad')} #${index + 1}`}
            <StyledConnected aria-live="polite">
              {connectionStatus[index] ? t('tester.connected') : ""}
            </StyledConnected>
            <StyledNotFound>
              {!connectionStatus[index] ? t('tester.notFound') : ""}
            </StyledNotFound>
          </TabButton>
        ))}
      </StyledTabList>
      <MainGamepad playerNumber={selectedGamepad} />
    </MainWrapper>
  );
};

const Main = memo(MainComponent, () => true);

export default Main;
