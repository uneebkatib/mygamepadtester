'use client'

import React, { useState } from 'react';
import styled from 'styled-components';

const TocWrapper = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 40px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const TocHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const HeaderTitle = styled.h4`
  margin: 0;
  color: #2d3748;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ToggleIcon = styled.span`
  font-size: 0.7rem;
  color: #64748b;
  transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const TocListWrapper = styled.div`
  max-height: ${props => props.$isOpen ? '800px' : '0'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  padding: ${props => props.$isOpen ? '0 25px 20px' : '0 25px'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
`;

const TocList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px 20px;
`;

const TocItem = styled.li`
  font-size: 0.95rem;
  
  a {
    color: #38a169;
    text-decoration: none;
    display: inline-block;
    padding: 2px 0;
    transition: color 0.2s;

    &:hover {
      color: #2f855a;
      text-decoration: underline;
    }
  }
`;

const GuideTableOfContents = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TocWrapper>
      <TocHeader onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <HeaderTitle>Table of Contents</HeaderTitle>
        <ToggleIcon $isOpen={isOpen}>▼</ToggleIcon>
      </TocHeader>
      
      <TocListWrapper $isOpen={isOpen}>
        <TocList>
          {items.map((item, index) => (
            <TocItem key={index}>
              <a href={item.href} onClick={() => setIsOpen(false)}>
                {item.text}
              </a>
            </TocItem>
          ))}
        </TocList>
      </TocListWrapper>
    </TocWrapper>
  );
};

export default GuideTableOfContents;
