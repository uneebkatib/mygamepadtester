import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

export const VibrationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  .seo-content {
    max-width: 1000px;
    margin: 3rem auto 0;
    padding: 2rem;
    background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
    border-radius: 16px;
    border: 2px solid ${Theme.border};
    box-shadow: 0 8px 32px ${Theme.shadowMedium};
    
    h2 {
      color: ${Theme.primary};
      font-size: 1.8rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid ${Theme.primary};
      padding-bottom: 0.5rem;
    }
    
    h3 {
      color: ${Theme.textPrimary};
      font-size: 1.4rem;
      margin: 1.5rem 0 1rem 0;
    }
    
    p {
      color: ${Theme.textPrimary};
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .feature-highlights {
      display: grid;
      gap: 1rem;
      margin: 1.5rem 0;
      
      .highlight-item {
        background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
        color: white;
        padding: 1rem;
        border-radius: 8px;
        font-weight: 500;
      }
    }
    
    .internal-links {
      background: rgba(218, 119, 86, 0.1);
      padding: 1.5rem;
      border-radius: 12px;
      margin-top: 2rem;
      border-left: 4px solid ${Theme.primary};
      
      ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
        
        li {
          margin-bottom: 0.5rem;
          color: ${Theme.textPrimary};
        }
      }
    }
    
    a {
      text-decoration: none;
      font-weight: 600;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const VibrationHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: ${Theme.textPrimary};
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    color: ${Theme.textSecondary};
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

export const ControllerStatus = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  
  .controller-info {
    h3 {
      color: ${Theme.textPrimary};
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
      
      /* Enhanced emoji visibility for gamepad icon */
      & > span:first-child,
      & > *:first-child {
        color: ${Theme.primary};
        text-shadow: 0 0 8px rgba(218, 119, 86, 0.3);
        background: rgba(218, 119, 86, 0.1);
        border-radius: 8px;
        padding: 0.2rem 0.4rem;
        margin-right: 0.5rem;
        border: 1px solid rgba(218, 119, 86, 0.2);
      }
    }
    
    p {
      color: ${Theme.textSecondary};
      margin: 0;
      font-size: 1.1rem;
      
      /* Enhanced emoji visibility for checkmarks/crosses */
      & > span,
      & > *:last-child {
        color: ${Theme.primary};
        text-shadow: 0 0 6px rgba(218, 119, 86, 0.2);
        background: rgba(218, 119, 86, 0.05);
        border-radius: 6px;
        padding: 0.1rem 0.3rem;
        margin-left: 0.3rem;
        border: 1px solid rgba(218, 119, 86, 0.1);
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const VirtualController = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  .controller-body {
    width: 120px;
    height: 80px;
    background: ${props => props.isVibrating 
      ? 'linear-gradient(135deg, #ff4757, #ff3838)' 
      : `linear-gradient(135deg, ${Theme.backgroundDark}, ${Theme.surface})`
    };
    border: 3px solid ${props => props.isVibrating ? '#ff4757' : Theme.border};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    color: ${props => props.isVibrating ? Theme.white : Theme.textPrimary};
    
    ${props => props.isVibrating && `
      animation: vibrate 0.1s infinite;
      box-shadow: 0 0 20px rgba(255, 71, 87, 0.5);
    `}
    
    .vibration-icon {
      font-size: 1.5rem;
      ${props => props.isVibrating && `
        animation: spin 0.5s linear infinite;
      `}
    }
    
    span {
      font-size: 0.8rem;
      font-weight: 600;
    }
  }
  
  @keyframes vibrate {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const VibrationPanel = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.3rem;
    
    /* Enhanced emoji visibility */
    & > span,
    & > *:first-child {
      color: ${Theme.primary};
      text-shadow: 0 0 8px rgba(218, 119, 86, 0.3);
      background: rgba(218, 119, 86, 0.1);
      border-radius: 8px;
      padding: 0.2rem 0.4rem;
      margin-right: 0.5rem;
      border: 1px solid rgba(218, 119, 86, 0.2);
    }
  }
`;

export const PatternSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const PatternCard = styled.div`
  background: ${props => props.isSelected 
    ? `linear-gradient(135deg, ${Theme.primary}, ${Theme.accent})` 
    : Theme.backgroundDark
  };
  border: 2px solid ${props => props.isSelected ? Theme.primary : Theme.border};
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  
  &:hover:not([disabled]) {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px ${Theme.shadowMedium};
    border-color: ${Theme.primary};
  }
  
  .pattern-icon {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
    color: ${props => props.isSelected ? Theme.white : Theme.primary};
    text-shadow: ${props => props.isSelected ? '0 0 8px rgba(0, 0, 0, 0.5)' : '0 0 8px rgba(218, 119, 86, 0.3)'};
    background: ${props => props.isSelected ? 'rgba(255, 255, 255, 0.1)' : 'rgba(218, 119, 86, 0.1)'};
    border-radius: 12px;
    padding: 0.5rem;
    border: 2px solid ${props => props.isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(218, 119, 86, 0.2)'};
  }
  
  .pattern-name {
    color: ${props => props.isSelected ? Theme.white : Theme.textPrimary};
    font-weight: 600;
    font-size: 1.1rem;
    text-align: center;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .pattern-description {
    color: ${props => props.isSelected ? 'rgba(255,255,255,0.9)' : Theme.textSecondary};
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 1rem;
    line-height: 1.4;
  }
  
  .test-btn {
    width: 100%;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    background: ${props => props.isSelected 
      ? 'rgba(255,255,255,0.2)' 
      : `linear-gradient(135deg, ${Theme.primary}, ${Theme.accent})`
    };
    color: ${Theme.white};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      background: ${props => props.isSelected 
        ? 'rgba(255,255,255,0.3)' 
        : `linear-gradient(135deg, ${Theme.accent}, ${Theme.primary})`
      };
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export const IntensityControls = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: ${Theme.primary};
    }
  }
  
  .controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    
    .control-group {
      label {
        display: block;
        color: ${Theme.textPrimary};
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      input[type="range"] {
        width: 100%;
        accent-color: ${Theme.primary};
        margin-bottom: 0.5rem;
      }
    }
  }
`;

export const TestControls = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  
  .control-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    
    button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-width: 180px;
      justify-content: center;
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      &.single-test-btn {
        background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
        color: ${Theme.white};
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px ${Theme.glow};
        }
      }
      
      &.loop-test-btn {
        background: linear-gradient(135deg, #5352ed, #3742fa);
        color: ${Theme.white};
        
        &.active {
          background: linear-gradient(135deg, #ff4757, #ff3838);
        }
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(83, 82, 237, 0.3);
        }
        
        &.active:hover {
          box-shadow: 0 8px 16px rgba(255, 71, 87, 0.3);
        }
      }
      
      &.all-test-btn {
        background: linear-gradient(135deg, #2ed573, #1dd1a1);
        color: ${Theme.white};
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(46, 213, 115, 0.3);
        }
      }
    }
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      
      button {
        width: 100%;
        max-width: 300px;
      }
    }
  }
`;

export const ResultsSection = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    h3 {
      color: ${Theme.textPrimary};
      margin: 0;
      font-size: 1.3rem;
    }
    
    .clear-btn {
      padding: 0.5rem 1rem;
      border: 1px solid ${Theme.border};
      border-radius: 8px;
      background: ${Theme.backgroundDark};
      color: ${Theme.textPrimary};
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: ${Theme.primary};
        color: ${Theme.white};
        border-color: ${Theme.primary};
      }
    }
  }
  
  .results-list {
    max-height: 300px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: ${Theme.backgroundDark};
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${Theme.primary};
      border-radius: 3px;
    }
    
    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      margin-bottom: 0.5rem;
      background: ${Theme.backgroundDark};
      border-radius: 8px;
      border-left: 4px solid transparent;
      
      &.success {
        border-left-color: #2ed573;
      }
      
      &.error {
        border-left-color: #ff4757;
      }
      
      .result-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        
        .pattern-name {
          color: ${Theme.textPrimary};
          font-weight: 600;
        }
        
        .timestamp {
          color: ${Theme.textSecondary};
          font-size: 0.85rem;
        }
      }
      
      .result-details {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.25rem;
        
        .success-indicator {
          color: #2ed573;
          font-weight: 600;
        }
        
        .error-indicator {
          color: #ff4757;
          font-weight: 600;
        }
        
        .config {
          color: ${Theme.textSecondary};
          font-size: 0.85rem;
          font-family: 'Consolas', 'Monaco', monospace;
        }
      }
    }
  }
`;

export const AlertMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  
  &[type="warning"] {
    background: linear-gradient(135deg, rgba(255, 165, 2, 0.1), rgba(255, 193, 7, 0.1));
    border: 2px solid #ffa502;
    color: ${Theme.textPrimary};
  }
  
  &[type="error"] {
    background: linear-gradient(135deg, rgba(255, 71, 87, 0.1), rgba(255, 56, 56, 0.1));
    border: 2px solid #ff4757;
    color: ${Theme.textPrimary};
  }
  
  svg {
    font-size: 1.5rem;
    color: ${props => props.type === 'error' ? '#ff4757' : '#ffa502'};
    flex-shrink: 0;
  }
  
  div {
    h3 {
      margin: 0 0 0.5rem 0;
      color: ${Theme.textPrimary};
    }
    
    p {
      margin: 0;
      color: ${Theme.textSecondary};
    }
  }
`;