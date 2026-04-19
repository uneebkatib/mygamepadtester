import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

export const ManagerContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ManagerHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  
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
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
  
  .refresh-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    color: ${Theme.white};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 auto;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px ${Theme.glow};
    }
  }
`;

export const ControllersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ControllerCard = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 3px solid ${props => 
    props.isActive ? Theme.primary : 
    props.healthStatus === 'healthy' ? Theme.border :
    props.healthStatus === 'warning' ? '#ffa502' : '#ff4757'
  };
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${Theme.shadowMedium};
  
  ${props => props.isActive && `
    box-shadow: 0 8px 32px ${Theme.glow};
    transform: translateY(-4px);
  `}
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px ${Theme.shadowMedium};
    border-color: ${Theme.primary};
  }
`;

export const ControllerStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  .controller-index {
    background: ${Theme.primary};
    color: ${Theme.white};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
  }
  
  .health-indicator {
    font-size: 1.2rem;
    cursor: help;
  }
`;

export const ControllerInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  .controller-icon {
    font-size: 3rem;
    flex-shrink: 0;
  }
  
  .controller-details {
    flex: 1;
    
    h3 {
      color: ${Theme.textPrimary};
      margin: 0 0 0.5rem 0;
      font-size: 1.3rem;
    }
    
    .controller-name {
      color: ${Theme.textSecondary};
      margin: 0 0 0.75rem 0;
      font-size: 0.9rem;
      line-height: 1.4;
    }
    
    .connection-info {
      margin-bottom: 0.75rem;
      
      .connection-type {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        font-size: 0.9rem;
      }
    }
    
    .specs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
      
      span {
        background: ${Theme.backgroundDark};
        color: ${Theme.textSecondary};
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
    
    .mapping-info {
      span {
        color: ${Theme.textMuted};
        font-size: 0.75rem;
        font-style: italic;
      }
    }
  }
`;

export const ControllerActions = styled.div`
  display: flex;
  gap: 0.75rem;
  
  button {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &.test-btn {
      background: linear-gradient(135deg, #5352ed, #3742fa);
      color: ${Theme.white};
      
      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(83, 82, 237, 0.3);
      }
    }
    
    &.select-btn {
      background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
      color: ${Theme.white};
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px ${Theme.glow};
      }
    }
  }
`;

export const QuickTestPanel = styled.div`
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
  
  .quick-actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
    
    .action-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      
      span:first-child {
        color: ${Theme.textSecondary};
        font-weight: 600;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      button {
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 8px;
        background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
        color: ${Theme.white};
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        justify-content: center;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px ${Theme.glow};
        }
      }
    }
  }
  
  .real-time-data {
    border-top: 2px solid ${Theme.border};
    padding-top: 1.5rem;
    
    h4 {
      color: ${Theme.textPrimary};
      margin-bottom: 1rem;
      text-align: center;
    }
    
    .data-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      
      .data-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: ${Theme.backgroundDark};
        border-radius: 8px;
        
        span:first-child {
          color: ${Theme.textSecondary};
          font-weight: 500;
        }
        
        span:last-child {
          font-family: 'Consolas', 'Monaco', monospace;
          font-weight: 600;
          
          &.active {
            color: #2ed573;
          }
          
          &.inactive {
            color: ${Theme.textMuted};
          }
          
          &.stick-data,
          &.trigger-data,
          &.timestamp {
            color: ${Theme.textPrimary};
            font-size: 0.85rem;
          }
        }
      }
    }
  }
`;

export const NoControllersMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  text-align: left;
  
  svg {
    font-size: 3rem;
    color: #ffa502;
    flex-shrink: 0;
    margin-top: 0.5rem;
  }
  
  div {
    flex: 1;
    
    h3 {
      color: ${Theme.textPrimary};
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }
    
    p {
      color: ${Theme.textSecondary};
      margin: 0 0 1.5rem 0;
      line-height: 1.6;
    }
    
    ul {
      color: ${Theme.textSecondary};
      margin: 0;
      padding-left: 1.5rem;
      
      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    
    svg {
      margin-top: 0;
    }
  }
`;