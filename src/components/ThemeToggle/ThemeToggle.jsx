'use client'

import React from 'react';
import styled from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import { Theme } from '../../styles/Theme';

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$size === 'small' ? '36px' : '42px'};
  height: ${props => props.$size === 'small' ? '36px' : '42px'};
  border-radius: 50%;
  border: 1px solid ${props => props.$isDark ? '#333' : Theme.border};
  background: ${props => props.$isDark ? '#1E1E1E' : Theme.backgroundLight};
  color: ${props => props.$isDark ? '#FFD700' : Theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  
  svg {
    font-size: ${props => props.$size === 'small' ? '1rem' : '1.15rem'};
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.05);
    border-color: ${Theme.primary};
    
    svg {
      transform: rotate(15deg);
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ToggleWithLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .label {
    font-size: 0.85rem;
    color: ${props => props.$isDark ? '#B0B0B0' : Theme.textSecondary};
  }
`;

/**
 * ThemeToggle Component
 * Button to toggle between dark and light modes
 */
const ThemeToggle = ({ size = 'normal', showLabel = false }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    if (showLabel) {
        return (
            <ToggleWithLabel $isDark={isDarkMode}>
                <ToggleButton
                    onClick={toggleTheme}
                    $isDark={isDarkMode}
                    $size={size}
                    title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </ToggleButton>
                <span className="label">{isDarkMode ? 'Light' : 'Dark'}</span>
            </ToggleWithLabel>
        );
    }

    return (
        <ToggleButton
            onClick={toggleTheme}
            $isDark={isDarkMode}
            $size={size}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? <FaSun /> : <FaMoon />}
        </ToggleButton>
    );
};

export default ThemeToggle;
