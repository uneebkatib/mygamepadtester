import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

export const DeviceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const DeviceHeader = styled.div`
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
  
  .copy-btn {
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

export const DeviceOverview = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  
  .device-visual {
    text-align: center;
    
    svg {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    h2 {
      color: ${Theme.textPrimary};
      margin: 0 0 0.5rem 0;
      font-size: 1.8rem;
    }
    
    .device-model {
      color: ${Theme.textSecondary};
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.4;
      word-break: break-word;
    }
  }
  
  .quick-stats {
    display: grid;
    gap: 1rem;
    
    .stat-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      background: ${Theme.backgroundDark};
      border-radius: 8px;
      
      .stat-label {
        color: ${Theme.textSecondary};
        font-weight: 500;
      }
      
      .stat-value {
        color: ${Theme.textPrimary};
        font-weight: 600;
        
        &.connected {
          color: #2ed573;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const SpecCard = styled.div`
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
    font-size: 1.2rem;
    
    svg {
      color: ${Theme.primary};
    }
  }
  
  .spec-details {
    .spec-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid ${Theme.border};
      
      &:last-child {
        border-bottom: none;
      }
      
      span:first-child {
        color: ${Theme.textSecondary};
        font-weight: 500;
      }
      
      .spec-value {
        color: ${Theme.textPrimary};
        font-weight: 600;
        text-align: right;
        
        &.supported {
          color: #2ed573;
        }
        
        &.not-supported {
          color: #ff4757;
        }
        
        &.timestamp {
          font-family: 'Consolas', 'Monaco', monospace;
          font-size: 0.85rem;
        }
      }
    }
  }
`;

export const CapabilitiesPanel = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 16px ${Theme.shadowMedium};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .capabilities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    
    .capability-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      background: ${Theme.backgroundDark};
      border-radius: 8px;
      
      span:first-child {
        color: ${Theme.textSecondary};
        font-weight: 500;
      }
      
      span:last-child {
        color: ${Theme.textPrimary};
        font-weight: 600;
        
        &.supported {
          color: #2ed573;
        }
        
        &.not-supported {
          color: #ff4757;
        }
      }
    }
  }
`;

export const TechnicalDetails = styled.div`
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
  }
  
  .analysis-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .analysis-section {
      h4 {
        color: ${Theme.textPrimary};
        margin-bottom: 1rem;
        font-size: 1.1rem;
      }
      
      .button-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 0.5rem;
        
        .button-info {
          background: ${Theme.backgroundDark};
          border: 1px solid ${Theme.border};
          border-radius: 8px;
          padding: 0.5rem;
          text-align: center;
          transition: all 0.3s ease;
          
          &.pressed {
            background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
            color: ${Theme.white};
            transform: scale(1.05);
          }
          
          .button-index {
            display: block;
            font-weight: 600;
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
          }
          
          .button-value {
            display: block;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.75rem;
            color: ${Theme.textMuted};
          }
          
          .button-state {
            display: block;
            font-size: 0.7rem;
            font-weight: 500;
            margin-top: 0.25rem;
          }
        }
      }
      
      .axes-grid {
        display: grid;
        gap: 1rem;
        
        .axis-info {
          background: ${Theme.backgroundDark};
          border-radius: 8px;
          padding: 0.75rem;
          
          .axis-label {
            color: ${Theme.textSecondary};
            font-weight: 500;
            margin-right: 0.5rem;
          }
          
          .axis-value {
            color: ${Theme.textPrimary};
            font-family: 'Consolas', 'Monaco', monospace;
            font-weight: 600;
          }
          
          .axis-bar {
            position: relative;
            height: 4px;
            background: ${Theme.border};
            border-radius: 2px;
            margin-top: 0.5rem;
            
            .axis-indicator {
              position: absolute;
              top: 0;
              width: 6px;
              height: 4px;
              border-radius: 2px;
              transform: translateX(-50%);
              transition: all 0.1s ease;
            }
          }
        }
      }
    }
  }
`;

export const RawDataSection = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.3rem;
  }
  
  .browser-info {
    margin-bottom: 2rem;
    
    h4 {
      color: ${Theme.textPrimary};
      margin-bottom: 1rem;
    }
    
    .info-grid {
      display: grid;
      gap: 0.75rem;
      
      .info-item {
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
        
        .supported {
          color: #2ed573;
          font-weight: 600;
        }
        
        .not-supported {
          color: #ff4757;
          font-weight: 600;
        }
        
        .user-agent {
          color: ${Theme.textMuted};
          font-size: 0.8rem;
          font-family: 'Consolas', 'Monaco', monospace;
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  
  .raw-data-display {
    h4 {
      color: ${Theme.textPrimary};
      margin-bottom: 1rem;
    }
    
    .json-data {
      background: ${Theme.backgroundDark};
      border: 1px solid ${Theme.border};
      border-radius: 8px;
      padding: 1rem;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.8rem;
      color: ${Theme.textPrimary};
      overflow-x: auto;
      max-height: 400px;
      overflow-y: auto;
      line-height: 1.4;
      
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      
      &::-webkit-scrollbar-track {
        background: ${Theme.backgroundDark};
        border-radius: 3px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: ${Theme.primary};
        border-radius: 3px;
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