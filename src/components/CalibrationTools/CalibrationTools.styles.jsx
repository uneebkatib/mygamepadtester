import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

export const CalibrationContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  .calibration-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
    
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
  
  .calibration-tips {
    margin-top: 3rem;
    
    h3 {
      color: ${Theme.textPrimary};
      margin-bottom: 2rem;
      text-align: center;
      font-size: 1.5rem;
    }
    
    .tips-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      
      .tip {
        background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
        border: 2px solid ${Theme.border};
        border-radius: 16px;
        padding: 1.5rem;
        text-align: center;
        
        h4 {
          color: ${Theme.textPrimary};
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        
        p {
          color: ${Theme.textSecondary};
          margin: 0;
          line-height: 1.5;
        }
      }
    }
  }
  
  .seo-content {
    max-width: 1200px;
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

export const CalibrationHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    color: ${Theme.textPrimary};
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    color: ${Theme.textSecondary};
    font-size: 1.3rem;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

export const CalibrationPanel = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  
  .controller-selector {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    
    label {
      color: ${Theme.textPrimary};
      font-weight: 600;
      font-size: 1rem;
    }
    
    select {
      background: ${Theme.backgroundLight};
      border: 2px solid ${Theme.border};
      border-radius: 8px;
      color: ${Theme.textPrimary};
      padding: 0.5rem 1rem;
      font-size: 1rem;
      min-width: 150px;
      
      &:focus {
        border-color: ${Theme.primary};
        outline: none;
      }
    }
  }
  
  .instructions {
    margin-bottom: 2rem;
    text-align: center;
    
    h3 {
      color: ${Theme.textPrimary};
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
    
    p {
      color: ${Theme.textSecondary};
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
  }
`;

export const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  
  .progress-bar {
    flex: 1;
    height: 12px;
    background: ${Theme.backgroundDark};
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, ${Theme.primary}, ${Theme.accent});
      border-radius: 6px;
      transition: width 0.3s ease;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: shimmer 2s infinite;
      }
    }
  }
  
  .progress-text {
    color: ${Theme.primary};
    font-weight: 700;
    font-size: 0.9rem;
    min-width: 40px;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

export const CalibrationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .control-group {
    display: flex;
    gap: 1rem;
    
    button {
      background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
      border: 2px solid ${Theme.border};
      border-radius: 8px;
      color: ${Theme.textPrimary};
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover:not(:disabled) {
        border-color: ${Theme.primary};
        background: linear-gradient(135deg, ${Theme.surface}, ${Theme.backgroundLight});
        transform: translateY(-2px);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      &.primary-btn {
        background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
        color: ${Theme.white};
        border-color: ${Theme.primary};
        
        &:hover:not(:disabled) {
          box-shadow: 0 8px 24px rgba(218, 119, 86, 0.3);
        }
      }
      
      &.secondary-btn {
        background: linear-gradient(135deg, ${Theme.textMuted}, ${Theme.backgroundDark});
        color: ${Theme.white};
        border-color: ${Theme.textMuted};
      }
    }
  }
`;

export const StickCalibrator = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  
  h3 {
    color: ${Theme.textPrimary};
    font-size: 1.3rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .stick-display {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    
    .stick-area {
      width: 200px;
      height: 200px;
      border: 2px solid ${Theme.border};
      border-radius: 50%;
      position: relative;
      background: ${Theme.backgroundDark};
      
      .stick-indicator {
        width: 20px;
        height: 20px;
        background: ${Theme.primary};
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;

      }
      
      .deadzone-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px dashed ${Theme.accent};
        border-radius: 50%;
        opacity: 0.5;
      }
    }
  }
  
  .stick-values {
    margin-bottom: 2rem;
    
    .value-row {
      display: grid;
      grid-template-columns: auto 1fr 1fr;
      gap: 1rem;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: ${Theme.backgroundDark};
      border-radius: 8px;
      font-size: 0.9rem;
      
      span:first-child {
        color: ${Theme.textSecondary};
        font-weight: 600;
      }
      
      span:not(:first-child) {
        color: ${Theme.primary};
        font-family: 'JetBrains Mono', monospace;
      }
    }
  }
  
  .deadzone-control {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
    align-items: center;
    
    label {
      color: ${Theme.textPrimary};
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    input[type="range"] {
      -webkit-appearance: none;
      height: 8px;
      border-radius: 4px;
      background: ${Theme.backgroundDark};
      outline: none;
      
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${Theme.primary};
        cursor: pointer;
      }
      
      &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: ${Theme.primary};
        cursor: pointer;
        border: none;
        box-shadow: 0 0 8px ${Theme.primary};
      }
    }
    
    span {
      color: ${Theme.primary};
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      min-width: 40px;
      text-align: right;
    }
  }
`;

export const TriggerCalibrator = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  grid-column: 1 / -1;
  
  @media (min-width: 1024px) {
    grid-column: auto;
  }
  
  h3 {
    color: ${Theme.textPrimary};
    font-size: 1.3rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .trigger-section {
    margin-bottom: 2rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    h4 {
      color: ${Theme.textPrimary};
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    
    .trigger-bar {
      width: 100%;
      height: 20px;
      background: ${Theme.backgroundDark};
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 1rem;
      position: relative;
      
      .trigger-fill {
        height: 100%;
        background: linear-gradient(90deg, ${Theme.primary}, ${Theme.accent});
        border-radius: 10px;
        transition: width 0.1s ease;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 1px;
        }
      }
    }
    
    .trigger-values {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      
      span {
        color: ${Theme.textSecondary};
        font-size: 0.9rem;
        font-family: 'JetBrains Mono', monospace;
      }
    }
    
    .deadzone-control {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
      
      label {
        color: ${Theme.textPrimary};
        font-weight: 600;
        font-size: 0.9rem;
      }
      
      input[type="range"] {
        -webkit-appearance: none;
        height: 8px;
        border-radius: 4px;
        background: ${Theme.backgroundDark};
        outline: none;
        
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${Theme.primary};
          cursor: pointer;
          }
        
        &::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${Theme.primary};
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px ${Theme.primary};
        }
      }
      
      span {
        color: ${Theme.primary};
        font-weight: 700;
        font-family: 'JetBrains Mono', monospace;
        min-width: 40px;
        text-align: right;
      }
    }
  }
`;

export const ResultsPanel = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  
  h3 {
    color: ${Theme.textPrimary};
    font-size: 1.4rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    
    .result-section {
      background: ${Theme.backgroundDark};
      border-radius: 12px;
      padding: 1.5rem;
      
      h4 {
        color: ${Theme.primary};
        font-size: 1.1rem;
        margin-bottom: 1rem;
        text-align: center;
      }
      
      p {
        color: ${Theme.textSecondary};
        margin: 0.5rem 0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        text-align: center;
      }
    }
  }
`;
