'use client';

import React from 'react';
import styled from 'styled-components';
import { useI18n } from '../../contexts/I18nContext';

const PartnersContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 1rem auto;
  padding: 0 1rem;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const PartnersTitle = styled.h3`
  color: #DA7756;
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PartnersSubtitle = styled.p`
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 1rem;
`;

const PartnersGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PartnerCard = styled.a`
  flex: 1;
  min-width: 180px;
  max-width: 250px;
  background: #fdfdfd;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #DA7756, #e89e87);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(218, 119, 86, 0.15);
    border-color: rgba(218, 119, 86, 0.3);

    &::before {
      opacity: 1;
    }

    h3 {
      color: #DA7756;
    }
  }
`;

const PartnerIcon = styled.div`
  font-size: 1.3rem;
  display: flex;
  align-items: center;
`;

const PartnerName = styled.h4`
  color: #444;
  font-size: 0.95rem;
  margin: 0;
  font-weight: 600;
  transition: color 0.2s ease;
`;

const PartnerLink = styled.span`
  display: none;
`;

const Partners = () => {
  const { t } = useI18n();

  return (
    <PartnersContainer>
      <PartnersTitle>{t('home.partnersTitle')}</PartnersTitle>
      <PartnersSubtitle>{t('home.partnersDesc')}</PartnersSubtitle>

      <PartnersGrid>
        <PartnerCard href="https://konsolowo.pl/" target="_blank" rel="sponsored noopener noreferrer">
          <PartnerIcon>🎮</PartnerIcon>
          <PartnerName>Konsolowo.pl</PartnerName>
          <PartnerLink>Visit Store →</PartnerLink>
        </PartnerCard>

        <PartnerCard href="https://www.serwiskonsol.pl/" target="_blank" rel="sponsored noopener noreferrer">
          <PartnerIcon>🔧</PartnerIcon>
          <PartnerName>SerwisKonsol.pl</PartnerName>
          <PartnerLink>Repair Services →</PartnerLink>
        </PartnerCard>
      </PartnersGrid>
    </PartnersContainer>
  );
};

export default Partners;
