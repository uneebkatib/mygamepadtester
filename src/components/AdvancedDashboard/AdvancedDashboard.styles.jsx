'use client'

import styled from 'styled-components';
import Link from "next/link";

import { Theme } from '../../styles/Theme';

export const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  .dashboard-footer {
    margin-top: 3rem;
    text-align: center;
    
    h3 {
      color: ${Theme.textPrimary};
      margin-bottom: 2rem;
      font-size: 1.5rem;
    }
    
    .getting-started {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      
      .step {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        text-align: left;
        
        .step-number {
          background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
          color: ${Theme.white};
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .step-content {
          h4 {
            color: ${Theme.textPrimary};
            margin: 0 0 0.5rem 0;
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
  }
  
  .seo-content {
    max-width: 1200px;
    margin: 3rem auto 0;
    padding: 2rem;
    background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
    border-radius: 16px;
    border: 2px solid ${Theme.border};
    
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

export const DashboardHeader = styled.div`
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

export const QuickStatsPanel = styled.div`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  
  h3 {
    color: ${Theme.textPrimary};
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    text-align: center;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    
    .stat-item {
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
    
    .controller-summary {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: ${Theme.backgroundDark};
      border-radius: 12px;
      
      .controller-details {
        flex: 1;
        
        .controller-name {
          display: block;
          color: ${Theme.textPrimary};
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        
        .controller-features {
          display: block;
          color: ${Theme.textSecondary};
          font-size: 0.85rem;
        }
      }
    }
  }
`;

export const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.connected ? '#2ed573' : '#ff4757'};

  animation: ${props => props.connected ? 'pulse' : 'none'} 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FeatureCard = styled(NextLink)`
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  ${props => props.disabled && `
    opacity: 0.6;
    pointer-events: none;
    filter: grayscale(0.3);
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || Theme.primary};
  }
  
  &:hover:not([disabled]) {
    transform: translateY(-8px);
    border-color: ${props => props.color || Theme.primary};
  }
  
  .feature-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    
    .feature-icon {
      font-size: 2.5rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
      color: ${props => props.color || Theme.primary};
      text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
      border-radius: 12px;
      padding: 0.5rem;
      border: 2px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
    }
    
    .feature-category {
      background: ${props => props.color || Theme.primary};
      color: ${Theme.white};
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  .feature-content {
    margin-bottom: 2rem;
    
    h3 {
      color: ${Theme.textPrimary};
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      line-height: 1.3;
    }
    
    p {
      color: ${Theme.textSecondary};
      line-height: 1.6;
      margin: 0;
    }
  }
  
  .feature-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .launch-text {
      color: ${props => props.color || Theme.primary};
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .launch-icon {
      color: ${props => props.color || Theme.primary};
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }
  }
  
  &:hover .launch-icon {
    transform: translateX(5px);
  }
  
  .disabled-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    
    svg {
      font-size: 3rem;
      color: ${Theme.textMuted};
    }
    
    span {
      color: ${Theme.textMuted};
      font-weight: 600;
      font-size: 1.1rem;
    }
  }
`;

export const AlertMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 3rem;
  
  &[type="warning"] {
    background: linear-gradient(135deg, rgba(255, 165, 2, 0.1), rgba(255, 193, 7, 0.1));
    border: 2px solid #ffa502;
    color: ${Theme.textPrimary};
  }
  
  svg {
    font-size: 2rem;
    color: #ffa502;
    flex-shrink: 0;
  }
  
  div {
    h3 {
      margin: 0 0 0.5rem 0;
      color: ${Theme.textPrimary};
      font-size: 1.3rem;
    }
    
    p {
      margin: 0;
      color: ${Theme.textSecondary};
      font-size: 1.1rem;
      line-height: 1.5;
    }
  }
`;
