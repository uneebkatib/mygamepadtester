'use client'
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Theme } from '@/styles/Theme';

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1.5rem;
`;

const NavHeading = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
`;

const ToolCard = styled(Link)`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  text-decoration: none;
  border: 1px solid #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);

  &:hover {
    transform: translateY(-5px);
    border-color: ${Theme.primary}40;
    box-shadow: 0 12px 30px rgba(218, 119, 86, 0.1);
  }

  .icon {
    font-size: 2.2rem;
    margin-bottom: 0.75rem;
  }

  .name {
    font-weight: 800;
    color: #1a1a1a;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .desc {
    font-size: 0.8rem;
    color: #64748b;
    line-height: 1.4;
  }
`;

const tools = [
  { name: 'Stick Drift', path: '/stick-drift-test', icon: '🕹️', desc: 'Detect analog sensor wear' },
  { name: 'Deadzone Test', path: '/deadzone-test', icon: '🎯', desc: 'Find your noise floor' },
  { name: 'Input Lag', path: '/input-lag-test', icon: '⏱️', desc: 'Benchmark latency' },
  { name: 'Vibration', path: '/vibration-test', icon: '📳', desc: 'Test motor strength' },
  { name: 'Trigger Test', path: '/trigger-test', icon: '🔫', desc: 'Range & linearity' },
  { name: 'Calibration', path: '/joystick-calibration', icon: '⚙️', desc: 'Fix off-center sticks' },
  { name: 'Keyboard Test', path: '/keyboard-test', icon: '⌨️', desc: 'Check key switches' },
  { name: 'Mouse Test', path: '/mouse-test', icon: '🖱️', desc: 'Double-click detector' },
  { name: 'Button Test', path: '/button-test', icon: '🔘', desc: 'Registration check' },
  { name: 'Joy-Con Test', path: '/joycon-tester', icon: '🎮', desc: 'Handheld diagnostics' }
];

export default function RelatedTools({ currentPath }) {
  const filteredTools = tools.filter(t => t.path !== currentPath);

  return (
    <NavContainer>
      <NavHeading>Explore Professional Hardware Tools</NavHeading>
      <ToolsGrid>
        {filteredTools.map(tool => (
          <ToolCard key={tool.path} href={tool.path}>
            <span className="icon">{tool.icon}</span>
            <span className="name">{tool.name}</span>
            <span className="desc">{tool.desc}</span>
          </ToolCard>
        ))}
      </ToolsGrid>
    </NavContainer>
  );
}
