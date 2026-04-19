import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

export const RecorderContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${Theme.background} 0%, ${Theme.backgroundLight} 100%);
  padding: 2rem;
`;

export const RecorderHeader = styled.div`
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

export const RecordingControls = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${Theme.border};
  
  .recording-input input {
    width: 100%;
    max-width: 400px;
    padding: 1rem;
    border: 1px solid ${Theme.border};
    border-radius: 8px;
    background: ${Theme.backgroundLight};
    color: ${Theme.textPrimary};
    margin-bottom: 1.5rem;
  }
  
  .control-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    button {
      padding: 1rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &.record-btn {
        background: linear-gradient(135deg, #ff4757, #ff3838);
        color: white;
      }
      
      &.pause-btn {
        background: linear-gradient(135deg, #ffa502, #ff8c00);
        color: white;
      }
      
      &.stop-btn {
        background: linear-gradient(135deg, #2ed573, #20bf6b);
        color: white;
      }
    }
  }
`;

export const VisualizationPanel = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${Theme.border};
  
  .gamepad-visual {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .buttons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    gap: 0.5rem;
    
    .button-indicator {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: ${Theme.backgroundLight};
      border: 2px solid ${Theme.border};
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.pressed {
        background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
        color: white;
      }
    }
  }
`;

export const PlaybackControls = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${Theme.border};
`;

export const RecordingsList = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${Theme.border};
  
  .recordings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;
    
    .recording-card {
      background: ${Theme.backgroundLight};
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid ${Theme.border};
      
      .recording-actions {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          
          &.play-btn {
            background: linear-gradient(135deg, #2ed573, #20bf6b);
            color: white;
          }
          
          &.export-btn {
            background: linear-gradient(135deg, #3742fa, #2f3542);
            color: white;
          }
          
          &.delete-btn {
            background: linear-gradient(135deg, #ff4757, #ff3838);
            color: white;
          }
        }
      }
    }
  }
`;

export const StatsPanel = styled.div`
  background: ${Theme.surface};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${Theme.border};
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    
    .stat-item {
      background: ${Theme.backgroundLight};
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      
      .stat-label {
        display: block;
        color: ${Theme.textSecondary};
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }
      
      .stat-value {
        display: block;
        color: ${Theme.textPrimary};
        font-size: 1.8rem;
        font-weight: 700;
      }
    }
  }
`;