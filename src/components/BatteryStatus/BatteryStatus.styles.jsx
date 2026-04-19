import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

export const BatteryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${Theme.background} 0%, ${Theme.backgroundLight} 100%);
  padding: 2rem;
  
  .no-controllers {
    text-align: center;
    padding: 4rem 2rem;
    background: ${Theme.surface};
    border-radius: 16px;
    border: 2px dashed ${Theme.border};
    margin: 2rem 0;
    
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
  
  .controllers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }
  
  .battery-education {
    background: ${Theme.surface};
    border-radius: 16px;
    padding: 2rem;
    margin-top: 3rem;
    border: 1px solid ${Theme.border};
    
    h3 {
      color: ${Theme.textPrimary};
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
      text-align: center;
    }
    
    .education-grid {
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
      
      ul {
        list-style: none;
        padding: 0;
        
        li {
          color: ${Theme.textSecondary};
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

export const BatteryHeader = styled.div`
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
    margin-bottom: 2rem;
  }
  
  .refresh-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    
    label {
      color: ${Theme.textPrimary};
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    select {
      background: ${Theme.surface};
      color: ${Theme.textPrimary};
      border: 1px solid ${Theme.border};
      border-radius: 8px;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      
      &:focus {
        outline: none;
        border-color: ${Theme.primary};
      }
    }
  }
`;

export const BatteryCard = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${Theme.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    border-color: ${Theme.primary};
  }
  
  .additional-info {
    margin: 1.5rem 0;
    padding: 1rem;
    background: ${Theme.backgroundLight};
    border-radius: 8px;
    
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .label {
        color: ${Theme.textSecondary};
        font-size: 0.9rem;
      }
      
      .value {
        color: ${Theme.textPrimary};
        font-weight: 500;
        font-size: 0.9rem;
      }
    }
  }
  
  .battery-tips {
    margin-top: 1.5rem;
    padding: 1rem;
    background: ${Theme.backgroundLight};
    border-radius: 8px;
    border-left: 4px solid ${Theme.primary};
    
    h4 {
      color: ${Theme.textPrimary};
      margin-bottom: 0.75rem;
      font-size: 1rem;
    }
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      
      li {
        color: ${Theme.textSecondary};
        font-size: 0.85rem;
        margin-bottom: 0.4rem;
        padding-left: 0.5rem;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export const ControllerInfo = styled.div`
  margin-bottom: 1.5rem;
  
  h3 {
    color: ${Theme.textPrimary};
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  
  .controller-name {
    color: ${Theme.primary};
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
  
  .controller-id {
    color: ${Theme.textMuted};
    font-size: 0.8rem;
    font-family: monospace;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const BatteryIndicator = styled.div`
  margin-bottom: 1.5rem;
  
  .battery-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .battery-icon {
    position: relative;
    font-size: 2rem;
    
    .charging-icon {
      position: absolute;
      top: -5px;
      right: -10px;
      font-size: 1rem;
      color: ${Theme.accent};
      animation: pulse 1.5s ease-in-out infinite;
    }
  }
  
  .charging-status {
    color: ${Theme.accent};
    font-weight: 600;
    font-size: 0.9rem;
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
`;

export const BatteryLevel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .battery-bar {
    flex: 1;
    height: 20px;
    background: ${Theme.backgroundLight};
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid ${Theme.border};
    position: relative;
    
    .battery-fill {
      height: 100%;
      transition: all 0.5s ease;
      border-radius: 9px;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: ${props => props.isCharging ? 'charging-animation 2s ease-in-out infinite' : 'none'};
      }
    }
  }
  
  .battery-percentage {
    color: ${Theme.textPrimary};
    font-weight: 600;
    font-size: 1.1rem;
    min-width: 45px;
    text-align: right;
  }
  
  @keyframes charging-animation {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(300%); }
  }
`;

export const ConnectionType = styled.div`
  margin-bottom: 1.5rem;
  
  .connection-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: ${Theme.backgroundLight};
    border-radius: 8px;
    border: 1px solid ${props => props.type === 'bluetooth' ? '#3742fa' : '#2ed573'};
  }
  
  .connection-icon {
    font-size: 1.5rem;
    color: ${props => props.type === 'bluetooth' ? '#3742fa' : '#2ed573'};
  }
  
  .connection-details {
    flex: 1;
    
    .connection-type {
      display: block;
      color: ${Theme.textPrimary};
      font-weight: 600;
      font-size: 1rem;
    }
    
    .connection-status {
      display: block;
      color: ${Theme.textSecondary};
      font-size: 0.85rem;
    }
  }
`;
