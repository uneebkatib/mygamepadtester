'use client'

import styled from "styled-components";
import { Theme } from "../../styles/Theme";

// Optimized animations using only composited properties (transform and opacity)
const shimmer = `
  @keyframes shimmer {
    0% {
      transform: translateX(-200px);
    }
    100% {
      transform: translateX(calc(200px + 100%));
    }
  }
`;

const fadeInUp = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const glow = `
  @keyframes glow {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
  }
`;



export const StyledLoader = styled.div`
  margin: 3rem auto 1rem auto;
  color: ${Theme.primary};
  box-sizing: border-box;
  display: flex;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    position: absolute;
    border: 4px solid currentColor;
    opacity: 1;
    border-radius: 50%;
    animation: claudeRipple 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    filter: none;
    will-change: transform, opacity;
  }

  div:nth-child(2) {
    animation-delay: -0.75s;
    border-color: ${Theme.primaryLight};
  }

  @keyframes claudeRipple {
    0% {
      width: 8px;
      height: 8px;
      opacity: 0;
      transform: scale(0);
    }
    5% {
      opacity: 1;
      transform: scale(0.1);
    }
    100% {
      width: 80px;
      height: 80px;
      opacity: 0;
      transform: scale(1);
    }
  }

  @media (max-width: 765px) {
    margin: 2rem auto;
    width: 60px;
    height: 60px;
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

export const StyledLoaderTextWrapper = styled.span`
  ${shimmer}
  ${fadeInUp}
  ${glow}
  
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 3px solid ${Theme.primary};
  border-radius: 24px;
  margin: 2rem auto;
  max-width: 1150px;
  width: 100%;
  display: block;
  justify-items: center;
  padding: 2.5rem;
  border: 3px solid ${Theme.primary};
  backdrop-filter: none;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.8s ease-out, glow 4s ease-in-out infinite;
  will-change: transform, opacity;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${Theme.accent}, ${Theme.primary}, ${Theme.primaryLight}, ${Theme.accent});
    background-size: 200px 100%;
    animation: shimmer 2s infinite linear;
    will-change: transform;
  }
  
  .connection-instructions {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
      color: ${Theme.textPrimary};
      margin: 1rem 0 1.5rem 0;
      font-weight: 700;
      font-size: 2.2rem;
      text-shadow: 0 2px 8px ${Theme.shadow};
      background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .main-instruction {
      font-size: 1.3rem;
      color: ${Theme.textSecondary};
      margin-bottom: 2.5rem;
      line-height: 1.6;
      font-weight: 500;
    }
    
    .connection-methods {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin: 2.5rem 0;
      
      .method-card {
        background: linear-gradient(135deg, ${Theme.surface}, ${Theme.backgroundLight});
        border: 2px solid ${Theme.border};
        border-radius: 16px;
        padding: 2rem 1.5rem;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 24px ${Theme.shadow};
        position: relative;
        overflow: hidden;
        
        }
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(218, 119, 86, 0.1), transparent);
          transition: transform 0.6s ease;
          will-change: transform;
        }
        
        &:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: ${Theme.primary};
          
          &::before {
            transform: translateX(100%);
          }
          
          .method-icon {
            transform: scale(1.2);
          }
        }
        
        .method-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
          will-change: transform;
        }
        
        h3 {
          color: ${Theme.primary};
          font-size: 1.4rem;
          margin: 1rem 0 0.8rem 0;
          font-weight: 600;
        }
        
        p {
          color: ${Theme.textSecondary};
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
        }
      }
    }
    
    .action-prompt {
      background: linear-gradient(135deg, ${Theme.primary}20, ${Theme.accent}10);
      border: 2px solid ${Theme.primary};
      border-radius: 12px;
      padding: 1.5rem 2rem;
      font-size: 1.2rem;
      color: ${Theme.textPrimary};
      margin-top: 2rem;
      box-shadow: 0 8px 24px ${Theme.shadow};
      animation: glow 3s ease-in-out infinite;
      
      strong {
        color: ${Theme.primary};
        font-weight: 700;
      }
    }
  }

  &.scale08 {
    transform: scale(0.8);
    margin-top: -2.7rem;
  }

  &.scale09 {
    transform: scale(0.9);
    margin-top: -0.4rem;
  }

  &.scale1 {
    transform: scale(1);
  }

  &.scale11 {
    transform: scale(1.1);
    margin-top: 4.1rem;
  }

  &.scale12 {
    transform: scale(1.2);
    margin-top: 6.5rem;
  }

  @media (max-width: 1200px) {
    margin: 2rem;
    width: calc(100% - 4rem);
  }

  @media (max-width: 765px) {
    width: calc(100% - 2rem);
    margin: 1rem;
    padding: 1.5rem;
    
    .connection-instructions {
      .connection-methods {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        
        .method-card {
          padding: 1.5rem 1rem;
          
          .method-icon {
            font-size: 2.5rem;
          }
          
          h3 {
            font-size: 1.2rem;
          }
          
          p {
            font-size: 0.9rem;
          }
        }
      }
      
      h2 {
        font-size: 1.8rem;
      }
      
      .main-instruction {
        font-size: 1.1rem;
      }
      
      .action-prompt {
        font-size: 1rem;
        padding: 1.2rem 1.5rem;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    
    .connection-instructions {
      h2 {
        font-size: 1.5rem;
      }
      
      .main-instruction {
        font-size: 1rem;
      }
      
      .connection-methods {
        .method-card {
          padding: 1rem;
          
          .method-icon {
            font-size: 2rem;
          }
          
          h3 {
            font-size: 1.1rem;
          }
          
          p {
            font-size: 0.85rem;
          }
        }
      }
      
      .action-prompt {
        font-size: 0.9rem;
        padding: 1rem;
      }
    }
  }
`;

export const StyledSVG = styled.div`
  margin: 20px 0 300px 0;
  scale: 1.2;
  display: flex;
  justify-content: center;
  gap: 2rem;
  will-change: transform;

  img {
    padding: 1rem;
    background: ${Theme.surface};
    border-radius: 12px;
    border: 2px solid ${Theme.border};
    transition: all 0.3s ease;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    will-change: transform;
    
    &:hover {
      transform: scale(1.1);
      border-color: ${Theme.primary};
    }
  }

  @media (max-width: 765px) {
    scale: 1;
    margin-bottom: 150px;
    flex-direction: column;
    align-items: center;
  }
  
  @media (max-width: 480px) {
    scale: 0.9;
    margin-bottom: 100px;
  }
`;

export const StyledContener = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 1rem auto;
  justify-items: start;
  align-items: start;
  max-width: 1150px;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 3px solid ${Theme.primary};
  border-radius: 24px;
  box-shadow: 
    0 16px 64px ${Theme.shadowMedium},
    0 0 40px ${Theme.glow},
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  backdrop-filter: none;
  position: relative;
  overflow: hidden;
  will-change: transform;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(218, 119, 86, 0.08), transparent);
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }
  
  &:hover::before {
    transform: translateX(100%);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${Theme.accent}, ${Theme.primary}, ${Theme.primaryLight}, ${Theme.accent});
  }

  &.scale08 {
    transform: scale(0.8);
    margin-top: -2.7rem;
  }

  &.scale09 {
    transform: scale(0.9);
    margin-top: -0.4rem;
  }

  &.scale1 {
    transform: scale(1);
  }

  &.scale11 {
    transform: scale(1.1);
    margin-top: 4.1rem;
  }

  &.scale12 {
    transform: scale(1.2);
    margin-top: 6.5rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: ${Theme.textPrimary};
    background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
    padding: 1.25rem;
    border-radius: 16px;
    border: 2px solid ${Theme.border};
    box-shadow: 
      0 8px 32px ${Theme.shadow},
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    position: relative;
    width: 100%;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, ${Theme.primary}, transparent);
    }
  }

  span {
    font-weight: 700;
    color: ${Theme.primary};
  }

  @media (max-width: 1200px) {
    margin: 1rem;
    width: calc(100% - 2rem);
  }

  @media (max-width: 765px) {
    grid-template-columns: 1fr;
    width: calc(100% - 2rem);
    padding: 1.5rem;
    margin: 1rem;
    gap: 1.5rem;

    p {
      font-size: 1rem;
    }
    
    &.scale08, &.scale09, &.scale1, &.scale11, &.scale12 {
      transform: scale(1);
      margin-top: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    gap: 1rem;
    
    p {
      font-size: 0.9rem;
      padding: 1rem;
    }
  }
`;

export const StyledGamepadSVGAxesAVGWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border-radius: 16px;
  padding: 3rem;
  border: 2px solid ${Theme.border};
  box-shadow: 
    0 4px 16px ${Theme.shadowMedium},
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  will-change: transform;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${Theme.primary}05, ${Theme.accent}05);
    border-radius: 14px;
    z-index: -1;
  }

  @media (max-width: 765px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

export const AxesAndButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  will-change: transform;

  /* Add styles for Interface Scale */
  label {
    font-weight: 600;
    color: ${Theme.textPrimary};
    margin-bottom: 0.2rem;
    display: block;
  }

  select {
    width: 100%;
    padding: 0.8rem;
    border-radius: 8px;
    border: 2px solid ${Theme.border};
    background: ${Theme.backgroundLight};
    color: ${Theme.textPrimary};
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 1rem;

    &:focus {
      border-color: ${Theme.primary};
      outline: none;
      box-shadow: 0 0 0 3px ${Theme.primary}20;
    }
  }
  
  @media (max-width: 765px) {
    max-width: 100%;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

export const AxesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid ${Theme.border};
  box-shadow: 
    0 4px 16px ${Theme.shadowMedium},
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  will-change: transform;
  
  div {
    color: ${Theme.textPrimary};
    font-weight: 600;
    padding: 0.75rem;
    background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
    border-radius: 8px;
    border: 2px solid ${Theme.border};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: center;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
    
    &:hover {
      border-color: ${Theme.primary};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${Theme.glow};
    }
    
    span {
      color: ${Theme.accent};
      font-weight: 700;
    }
  }

  @media (max-width: 765px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    gap: 0.4rem;
    
    div {
      padding: 0.5rem;
      font-size: 0.9rem;
      min-height: 2.5rem;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border-radius: 12px;
  padding: 2rem 1.5rem;
  border: 2px solid ${Theme.border};
  box-shadow: 
    0 4px 16px ${Theme.shadowMedium},
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  justify-items: center;
  will-change: transform;

  @media (max-width: 765px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    padding: 1.5rem 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.6rem;
    padding: 1rem 0.8rem;
  }
`;

export const StyledButtons = styled.div`
  background: ${(props) =>
    props.value > 0
      ? `linear-gradient(135deg, ${Theme.primary}, ${Theme.primaryLight})`
      : `linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface})`};
  color: ${(props) => (props.value > 0 ? Theme.white : Theme.textPrimary)};
  padding: 0.5rem;
  border-radius: 10px;
  width: 55px;
  height: 55px;
  border: 2px solid ${(props) => (props.value > 0 ? Theme.primary : Theme.border)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: ${(props) =>
    props.value > 0
      ? `0 6px 20px ${Theme.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
      : `0 2px 8px ${Theme.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`};
  position: relative;
  line-height: 1.2;
  will-change: transform;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${(props) =>
    props.value > 0
      ? `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)`
      : `linear-gradient(90deg, transparent, ${Theme.border}, transparent)`};
  }
  
  span {
    font-size: 0.7rem;
    font-weight: 600;
    color: ${(props) => (props.value > 0 ? Theme.white : Theme.primary)};
    margin-top: 2px;
    line-height: 1;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 8px 24px ${Theme.shadow},
      0 0 16px ${Theme.glow};
    border-color: ${Theme.primary};
    
    span {
      color: ${(props) => (props.value > 0 ? Theme.white : Theme.primary)};
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.01);
  }

  @media (max-width: 765px) {
    width: 45px;
    height: 45px;
    font-size: 0.7rem;
    padding: 0.25rem;
    
    span {
      font-size: 0.6rem;
    }
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 0.65rem;
    padding: 0.2rem;
    
    span {
      font-size: 0.55rem;
    }
  }
`;

export const HistoryList = styled.ul`
  display: flex;
  overflow-x: auto;
  list-style-type: none;
  min-height: 4rem;
  max-width: 550px;
  margin: 1rem auto;
  background: ${Theme.backgroundLight};
  border-radius: 12px;
  border: 2px solid ${Theme.border};
  padding: 0.75rem 0.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  will-change: transform;
  align-items: center;
  gap: 0.5rem;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${Theme.surface};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${Theme.primary};
    border-radius: 4px;
    
    &:hover {
      background: ${Theme.primaryHover};
    }
  }

  @media (max-width: 765px) {
    max-width: 400px;
    min-height: 3.5rem;
    padding: 0.5rem;
  }
  
  @media (max-width: 480px) {
    max-width: 300px;
    min-height: 3rem;
    padding: 0.4rem;
  }
`;

export const HistoryWrapper = styled.div`
  margin-top: 1.5rem;
  will-change: transform;
  
  h3 {
    color: ${Theme.textPrimary};
    background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 2px solid ${Theme.border};
    box-shadow: 
      0 4px 16px ${Theme.shadowMedium},
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    font-weight: 600;
    text-align: center;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, ${Theme.primary}, ${Theme.accent}, ${Theme.primary});
      border-radius: 12px 12px 0 0;
    }
  }

  button {
    background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
    border-radius: 12px;
    padding: 0.75rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
    border: 2px solid ${Theme.border};
    font-size: 1.2rem;
    color: ${Theme.textPrimary};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 16px ${Theme.shadow},
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    cursor: pointer;
    will-change: transform;
    
    &:hover {
      background: linear-gradient(135deg, ${Theme.primary}, ${Theme.primaryLight});
      transform: translateY(-2px);
      box-shadow: 
        0 8px 24px ${Theme.shadow},
        0 0 16px ${Theme.glow};
      color: ${Theme.white};
    }

    &:active {
      transform: translateY(0);
    }

    &:first-child {
      background: linear-gradient(135deg, ${Theme.disconnected}, #EF5350);
      color: ${Theme.white};
      margin-right: 1rem;

      &:hover {
        background: linear-gradient(135deg, #FF5252, #FF6B6B);
        box-shadow: 
          0 8px 24px rgba(239, 68, 68, 0.3),
          0 0 16px rgba(239, 68, 68, 0.2);
      }
    }
  }

  @media (max-width: 765px) {
    display: none;
  }
`;

export const HistoryItem = styled.li`
  min-width: 2.5rem;
  font-size: 0.85rem;
  flex-shrink: 0;
  background: linear-gradient(135deg, ${Theme.primary}, ${Theme.primaryHover});
  color: ${Theme.white};
  padding: 0.5rem 0.6rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  border: 1px solid ${Theme.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  will-change: transform;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.5rem;
    min-width: 2rem;
  }
`;

export const StyledHistoryAndVibrationButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  will-change: transform;

  @media (max-width: 765px) {
    display: none;
  }
`;

export const StyledVibrationLoopButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${Theme.backgroundLight};
  border-radius: 12px;
  padding: 1rem;
  border: 2px solid ${Theme.border};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  will-change: transform;
  
  label {
    color: ${Theme.textPrimary};
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    input[type="checkbox"] {
      accent-color: ${Theme.primary};
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    
    label {
      font-size: 0.9rem;
      
      input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;

export const StyledSmallInfo = styled.div`
  font-size: 0.7rem;
  margin-top: 0.5rem;
  color: ${Theme.textMuted};
  font-style: italic;
  text-align: center;
  will-change: transform;
  
  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;
