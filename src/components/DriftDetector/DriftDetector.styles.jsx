import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

export const DriftContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  .analyzers-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 2rem 0;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
`;

export const DriftHeader = styled.div`
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
  
  .seo-content {
    max-width: 1000px;
    margin: 2rem auto;
    text-align: left;
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

export const DriftStatusPanel = styled.div`
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
  gap: 1rem;
  
  .controller-info {
    h3 {
      color: ${Theme.textPrimary};
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: ${Theme.textSecondary};
      margin: 0;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const DriftStatus = styled.div`
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1.1rem;
    
    &.drift-detected {
      background: linear-gradient(135deg, #ff4757, #ff3838);
      color: ${Theme.white};
      box-shadow: 0 4px 16px rgba(255, 71, 87, 0.3);
    }
    
    &.no-drift {
      background: linear-gradient(135deg, #2ed573, #1dd1a1);
      color: ${Theme.white};
      box-shadow: 0 4px 16px rgba(46, 213, 115, 0.3);
    }
    
    svg {
      font-size: 1.2rem;
    }
  }
`;

export const StickAnalyzer = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px ${Theme.shadowMedium};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.2rem;
  }
`;

export const StickVisualizer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, ${Theme.backgroundDark}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 50%;
  margin: 0 auto 1rem;
  overflow: hidden;
  
  .deadzone-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px dashed ${Theme.primary};
    border-radius: 50%;
    opacity: 0.5;
  }
  
  // Center crosshairs
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: ${Theme.border};
  }
  
  &::before {
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    transform: translateY(-50%);
  }
  
  &::after {
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    transform: translateX(-50%);
  }
`;

export const StickIndicator = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(
    calc(-50% + ${props => props.x * 94}px),
    calc(-50% + ${props => props.y * 94}px)
  );
  transition: all 0.1s ease;
  
  background: ${props => {
    if (props.severity === 'severe') return '#ff4757';
    if (props.severity === 'moderate') return '#ffa502';
    if (props.severity === 'minor') return '#fffa65';
    return '#2ed573';
  }};
  
  border: 2px solid ${Theme.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  ${props => props.isDrifting && `
    animation: pulse 1s infinite;
    box-shadow: 0 0 15px ${props.severity === 'severe' ? '#ff4757' : 
                          props.severity === 'moderate' ? '#ffa502' : 
                          props.severity === 'minor' ? '#fffa65' : '#2ed573'};
  `}
  
  @keyframes pulse {
    0%, 100% { transform: translate(
      calc(-50% + ${props => props.x * 94}px),
      calc(-50% + ${props => props.y * 94}px)
    ) scale(1); }
    50% { transform: translate(
      calc(-50% + ${props => props.x * 94}px),
      calc(-50% + ${props => props.y * 94}px)
    ) scale(1.2); }
  }
`;

export const AxisData = styled.div`
  .axis-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    background: ${Theme.backgroundDark};
    border-radius: 8px;
    
    span:first-child {
      color: ${Theme.textSecondary};
      font-weight: 500;
    }
    
    .normal-value {
      color: ${Theme.textPrimary};
      font-family: 'Consolas', 'Monaco', monospace;
    }
    
    .drift-value {
      color: #ff4757;
      font-family: 'Consolas', 'Monaco', monospace;
      font-weight: 600;
    }
  }
`;

export const ControlPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const DeadzoneControl = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px ${Theme.shadowMedium};
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${Theme.textPrimary};
    font-weight: 600;
    margin-bottom: 1rem;
    
    svg {
      color: ${Theme.primary};
    }
  }
  
  input[type="range"] {
    width: 100%;
    margin-bottom: 1rem;
    accent-color: ${Theme.primary};
  }
  
  .deadzone-presets {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    
    button {
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
`;

export const CalibrationPanel = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px ${Theme.shadowMedium};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: ${Theme.primary};
    }
  }
  
  .control-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.start-btn {
        background: linear-gradient(135deg, #2ed573, #1dd1a1);
        color: ${Theme.white};
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(46, 213, 115, 0.3);
        }
      }
      
      &.stop-btn {
        background: linear-gradient(135deg, #ff4757, #ff3838);
        color: ${Theme.white};
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(255, 71, 87, 0.3);
        }
      }
      
      &.reset-btn {
        background: linear-gradient(135deg, #5352ed, #3742fa);
        color: ${Theme.white};
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(83, 82, 237, 0.3);
        }
      }
      
      &.calibrate-btn {
        background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
        color: ${Theme.white};
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px ${Theme.glow};
        }
        
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
`;

export const ResultsPanel = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.3rem;
  }
  
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    
    .result-item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: ${Theme.backgroundDark};
      border-radius: 8px;
      border: 1px solid ${Theme.border};
      
      span:first-child {
        color: ${Theme.textSecondary};
        font-weight: 500;
      }
      
      .normal-value {
        color: ${Theme.textPrimary};
        font-family: 'Consolas', 'Monaco', monospace;
        font-weight: 600;
      }
      
      .drift-value {
        color: #ff4757;
        font-family: 'Consolas', 'Monaco', monospace;
        font-weight: 600;
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
  
  svg {
    font-size: 1.5rem;
    color: #ffa502;
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