import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

export const DeadzoneContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${Theme.background} 0%, ${Theme.backgroundLight} 100%);
  padding: 2rem;
  
  .no-controller {
    text-align: center;
    padding: 4rem 2rem;
    background: ${Theme.surface};
    border-radius: 16px;
    border: 2px dashed ${Theme.border};
    
    h3 {
      color: ${Theme.textPrimary};
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    
    p {
      color: ${Theme.textSecondary};
      font-size: 1.1rem;
    }
  }
  
  .drift-alert {
    background: linear-gradient(135deg, #ff4757, #ff3838);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 2rem 0;
    
    h3 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
    
    .drift-issue {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      
      &:last-child {
        border-bottom: none;
      }
      
      .severity {
        font-weight: bold;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        
        &.high {
          background: rgba(255,255,255,0.3);
        }
        
        &.medium {
          background: rgba(255,255,255,0.2);
        }
        
        &.low {
          background: rgba(255,255,255,0.1);
        }
      }
    }
  }
  
  .education-section {
    background: ${Theme.surface};
    border-radius: 16px;
    padding: 2rem;
    margin-top: 2rem;
    border: 1px solid ${Theme.border};
    
    h3 {
      color: ${Theme.textPrimary};
      margin-bottom: 1.5rem;
      text-align: center;
      font-size: 1.3rem;
    }
    
    .education-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .education-item {
      h4 {
        color: ${Theme.primary};
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }
      
      p, ul {
        color: ${Theme.textSecondary};
        line-height: 1.6;
      }
      
      ul {
        list-style: none;
        padding: 0;
        
        li {
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
          
          &::before {
            content: '•';
            color: ${Theme.primary};
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
`;

export const DeadzoneHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: ${Theme.textPrimary};
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, ${Theme.primary} 0%, ${Theme.accent} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    color: ${Theme.textSecondary};
    font-size: 1.2rem;
  }
`;

export const VisualizationArea = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${Theme.border};
  
  .sticks-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .triggers-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .stick-visualization, .trigger-visualization {
    h3 {
      color: ${Theme.textPrimary};
      margin-bottom: 1rem;
      text-align: center;
      font-size: 1.2rem;
    }
  }
  
  .stick-display {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto 1rem;
    background: ${Theme.backgroundLight};
    border-radius: 50%;
    border: 2px solid ${Theme.border};
    
    .deadzone-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 71, 87, 0.1);
      border: 2px dashed #ff4757;
      border-radius: 50%;
      pointer-events: none;
    }
    
    .stick-position {
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      
      &.original {
        background: #ff4757;
        z-index: 1;
      }
      
      &.processed {
        background: #2ed573;
        z-index: 2;
        border: 2px solid white;
      }
    }
  }
  
  .stick-values {
    text-align: center;
    font-family: monospace;
    font-size: 0.8rem;
    
    div {
      color: ${Theme.textSecondary};
      margin-bottom: 0.25rem;
      
      &:first-child {
        color: #ff4757;
      }
      
      &:last-child {
        color: #2ed573;
      }
    }
  }
  
  .trigger-bar {
    position: relative;
    height: 30px;
    background: ${Theme.backgroundLight};
    border-radius: 15px;
    border: 1px solid ${Theme.border};
    margin-bottom: 1rem;
    overflow: hidden;
    
    .deadzone-indicator {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: rgba(255, 71, 87, 0.2);
      border-right: 2px dashed #ff4757;
    }
    
    .trigger-value {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transition: width 0.1s ease;
      
      &.original {
        background: #ff4757;
        z-index: 1;
      }
      
      &.processed {
        background: #2ed573;
        z-index: 2;
        opacity: 0.8;
      }
    }
  }
  
  .trigger-values {
    text-align: center;
    font-family: monospace;
    font-size: 0.8rem;
    
    div {
      color: ${Theme.textSecondary};
      margin-bottom: 0.25rem;
      
      &:first-child {
        color: #ff4757;
      }
      
      &:last-child {
        color: #2ed573;
      }
    }
  }
`;

export const DeadzoneControls = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${Theme.border};
  
  .controls-section {
    margin-bottom: 2rem;
    
    &:last-of-type {
      margin-bottom: 1.5rem;
    }
    
    h3 {
      color: ${Theme.textPrimary};
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .control-group {
      display: grid;
      gap: 1rem;
      
      label {
        color: ${Theme.textSecondary};
        font-size: 0.9rem;
        font-weight: 500;
        
        input[type="range"] {
          width: 100%;
          margin-top: 0.5rem;
          accent-color: ${Theme.primary};
        }
      }
    }
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &.reset-btn {
        background: linear-gradient(135deg, #ffa502, #ff8c00);
        color: white;
      }
      
      &.save-btn {
        background: linear-gradient(135deg, #2ed573, #20bf6b);
        color: white;
      }
      
      &.settings-btn {
        background: linear-gradient(135deg, #3742fa, #2f3542);
        color: white;
      }
      
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
`;

export const PresetPanel = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${Theme.border};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
  
  .presets-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    
    .preset-card {
      background: ${Theme.backgroundLight};
      border: 1px solid ${Theme.border};
      border-radius: 12px;
      padding: 1rem;
      text-align: center;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        border-color: ${Theme.primary};
      }
      
      h4 {
        color: ${Theme.textPrimary};
        margin-bottom: 0.75rem;
        font-size: 1rem;
      }
      
      .preset-values {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin-bottom: 1rem;
        
        span {
          color: ${Theme.textSecondary};
          font-size: 0.8rem;
          font-family: monospace;
        }
      }
      
      button {
        background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
`;

export const SettingsPanel = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${Theme.border};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
  
  .advanced-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    label {
      color: ${Theme.textSecondary};
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      input[type="checkbox"] {
        accent-color: ${Theme.primary};
      }
      
      input[type="range"] {
        flex: 1;
        margin-left: 1rem;
        accent-color: ${Theme.primary};
      }
    }
  }
`;