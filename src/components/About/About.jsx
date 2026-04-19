import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';
import PageSEO from '../SEO/PageSEO.jsx';
import Ad from "../Ad/Ad.jsx";

const StyledAboutContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;

  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #DA7756;
    text-align: center;
    border-bottom: 2px solid #DA7756;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 1.8em;
    margin-top: 30px;
    margin-bottom: 15px;
    color: #DA7756;
    border-bottom: 2px solid #DA7756;
    padding-bottom: 5px;
  }

  h3 {
    font-size: 1.4em;
    margin-top: 25px;
    margin-bottom: 10px;
    color: #555;
  }

  p {
    margin-bottom: 15px;
    font-size: 1.1em;
  }

  ul {
    margin-bottom: 20px;
    padding-left: 30px;
  }

  li {
    margin-bottom: 8px;
    font-size: 1.05em;
  }

  strong {
    color: #DA7756;
  }

  .mission-section {
    background: #f9f9f9;
    padding: 25px;
    border-radius: 8px;
    margin: 20px 0;
    border-left: 4px solid #DA7756;
  }

  .feature-highlight {
    background: linear-gradient(135deg, #DA7756, #e89e87);
    color: white;
    padding: 15px;
    border-radius: 6px;
    margin: 15px 0;
    font-weight: bold;
  }

  .contact-section {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin-top: 30px;
    text-align: center;
  }

  a {
    color: #DA7756;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Section = styled.section`
  margin: 20px 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.8em;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #DA7756;
  border-bottom: 2px solid #DA7756;
  padding-bottom: 5px;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  font-size: 1.1em;
`;

import { useI18n } from '../../contexts/I18nContext';

function About() {
  const { t } = useI18n();

  return (
    <StyledAboutContainer>
      <PageSEO page="about" />
      <h1>{t('about.title')}</h1>

      <Section>
        <SectionTitle>👨‍💻 {t('about.developerTitle')}</SectionTitle>
        <Paragraph>
          <strong>{t('about.createdBy')}:</strong>{' '}
          <a href="https://x.com/uneebkatib" target="_blank" rel="noopener noreferrer" style={{ color: '#DA7756', textDecoration: 'none', fontWeight: '600' }}>
            Uneeb Katib
          </a>
        </Paragraph>
        <Paragraph>
          {t('about.developerDescription')}
        </Paragraph>
      </Section>

      {/* Top Ad */}
      <div style={{ width: '100%', margin: '1rem 0' }}>
        <Ad type="top" />
      </div>

      <div className="mission-section">
        <p><strong>{t('about.mainIntro')}</strong></p>
        <p>{t('about.subIntro')}</p>
      </div>

      <h2>{t('about.missionTitle')}</h2>
      <p>{t('about.missionDescription')}</p>

      {/* Mid-page Ad */}
      <div style={{ width: '100%', margin: '1rem 0' }}>
        <Ad type="article" />
      </div>

      <h2>{t('about.offerTitle')}</h2>
      <ul>
        <li>{t('about.offerItem1')}</li>
        <li>{t('about.offerItem2')}</li>
        <li>{t('about.offerItem3')}</li>
        <li>{t('about.offerItem4')}</li>
        <li>{t('about.offerItem5')}</li>
        <li>{t('about.offerItem6')}</li>
      </ul>

      <div className="feature-highlight">
        🎯 {t('about.trustedByTitle')}: {t('about.trustedByDescription')}
      </div>

      <h2>{t('about.techTitle')}</h2>
      <p>{t('about.techDescription')}</p>
      <ul>
        <li>{t('about.techItem1')}</li>
        <li>{t('about.techItem2')}</li>
        <li>{t('about.techItem3')}</li>
        <li>{t('about.techItem4')}</li>
        <li>{t('about.techItem5')}</li>
      </ul>

      <h2>{t('about.privacyTitle')}</h2>
      <p>{t('about.privacyDescription')}</p>

      <div className="feature-highlight">
        🔒 {t('about.zeroDataTitle')}: {t('about.zeroDataDescription')}
      </div>

      <h2>{t('about.innovationTitle')}</h2>
      <p>{t('about.innovationDescription')}</p>

      <h3>{t('about.recentUpdatesTitle')}</h3>
      <ul>
        <li>{t('about.updateItem1')}</li>
        <li>{t('about.updateItem2')}</li>
        <li>{t('about.updateItem3')}</li>
        <li>{t('about.updateItem4')}</li>
        <li>{t('about.updateItem5')}</li>
      </ul>

      {/* Bottom Ad */}
      <div style={{ width: '100%', margin: '1rem 0' }}>
        <Ad type="article" />
      </div>

      <h2>{t('about.communityTitle')}</h2>
      <p>{t('about.communityDescription')}</p>

      <div className="contact-section">
        <h3>{t('about.supportTitle')}</h3>
        <p>{t('about.supportDescription1')}</p>
        <p>{t('about.supportDescription2')}</p>

        <div className="feature-highlight">
          📧 {t('about.enterpriseSupport')}
        </div>

        <p><strong>{t('about.footerCTA')}</strong></p>
      </div>
    </StyledAboutContainer>
  );
}

export default About;

