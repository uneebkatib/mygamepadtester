import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

export const AnalyticsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  .analytics-footer {
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
`;

export const AnalyticsHeader = styled.div`
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

export const ControlsPanel = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
  
  .controls-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    
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
  
  .start-btn, .stop-btn {
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    color: ${Theme.white};
    border: none;
    border-radius: 12px;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(218, 119, 86, 0.3);
    }
  }
  
  .stop-btn {
    background: linear-gradient(135deg, #ff4757, #ff3838);
  }
  
  .recording-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${Theme.textPrimary};
    font-weight: 600;
    
    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      
      &.recording {
        background: #ff4757;
        animation: pulse 1s infinite;
      }
      
      &.stopped {
        background: #747d8c;
      }
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const MetricCard = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px ${Theme.shadowMedium};
    border-color: ${Theme.primary};
  }
  
  .metric-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    .metric-icon {
      font-size: 1.5rem;
      color: ${Theme.primary};
      text-shadow: 0 0 8px rgba(218, 119, 86, 0.3);
      background: rgba(218, 119, 86, 0.1);
      border-radius: 8px;
      padding: 0.3rem;
      border: 1px solid rgba(218, 119, 86, 0.2);
    }
    
    h3 {
      color: ${Theme.textPrimary};
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0;
    }
  }
  
  .metric-value {
    color: ${Theme.primary};
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    line-height: 1;
  }
  
  .metric-trend {
    color: ${Theme.textSecondary};
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

export const SessionSummary = styled.div`
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
  
  .session-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    .stat {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: ${Theme.backgroundDark};
      border-radius: 12px;
      
      .stat-label {
        color: ${Theme.textSecondary};
        font-weight: 600;
      }
      
      .stat-value {
        color: ${Theme.primary};
        font-weight: 700;
        font-size: 1.2rem;
      }
    }
  }
  
  .button-stats {
    h4 {
      color: ${Theme.textPrimary};
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .button-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 0.5rem;
      
      .button-stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: ${Theme.backgroundDark};
        border-radius: 8px;
        font-size: 0.9rem;
        
        .button-name {
          color: ${Theme.textSecondary};
          font-weight: 600;
        }
        
        .button-count {
          color: ${Theme.accent};
          font-weight: 700;
        }
      }
    }
  }
`;

export const ExportPanel = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  
  h3 {
    color: ${Theme.textPrimary};
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
  
  .export-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    
    button {
      background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
      color: ${Theme.white};
      border: none;
      border-radius: 12px;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(218, 119, 86, 0.3);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    .export-info {
      color: ${Theme.textSecondary};
      font-size: 0.9rem;
      text-align: center;
      max-width: 400px;
    }
  }
`;

export const ChartContainer = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  height: 400px;
  
  h3 {
    color: ${Theme.textPrimary};
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .chart-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    color: ${Theme.textMuted};
    font-size: 1.2rem;
    border: 2px dashed ${Theme.border};
    border-radius: 12px;
  }
`;