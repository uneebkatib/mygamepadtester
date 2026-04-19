import React from 'react';
import PageSEO from '../SEO/PageSEO';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  color: #DA7756;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ContactCard = styled.div`
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  padding: 2rem;
  border-radius: 12px;
  border-left: 5px solid #DA7756;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: #DA7756;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const CardContent = styled.p`
  color: #555;
  line-height: 1.6;
  
  a {
    color: #DA7756;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoSection = styled.div`
  background: linear-gradient(135deg, #DA7756, #e89e87);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
`;

const InfoTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const FAQSection = styled.div`
  margin-top: 3rem;
`;

const FAQTitle = styled.h2`
  color: #DA7756;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FAQItem = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #DA7756;
`;

const Question = styled.h4`
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Answer = styled.p`
  color: #666;
  line-height: 1.6;
`;

import { useI18n } from '../../contexts/I18nContext';
import Link from "next/link";

const Contact = () => {
  const { t, locale } = useI18n();

  return (
    <>
      <PageSEO page="contact" />

      <Container>
        <h1 style={{
          color: '#DA7756',
          fontSize: '2.5rem',
          marginBottom: '1rem',
          textAlign: 'center',
          fontWeight: '700'
        }}>
          {t('contact.title')}
        </h1>
        <Subtitle>{t('contact.subtitle')}</Subtitle>

        <InfoSection>
          <InfoTitle>📧 {t('contact.infoTitle')}</InfoTitle>
          <InfoText>
            {t('contact.infoDesc')}
          </InfoText>
        </InfoSection>

        <ContactGrid>
          <ContactCard>
            <CardIcon>🐦</CardIcon>
            <CardTitle>{t('contact.twitterTitle')}</CardTitle>
            <CardContent>
              {t('contact.twitterDesc')}<br />
              <a href="https://x.com/uneebkatib" target="_blank" rel="noopener noreferrer">
                @uneebkatib
              </a>
            </CardContent>
          </ContactCard>

          <ContactCard>
            <CardIcon>👨‍💻</CardIcon>
            <CardTitle>{t('contact.developerTitle')}</CardTitle>
            <CardContent>
              {t('contact.developerDesc')}<br />
              <a href="https://x.com/uneebkatib" target="_blank" rel="noopener noreferrer">
                {t('contact.connectX')}
              </a>
            </CardContent>
          </ContactCard>

          <ContactCard>
            <CardIcon>🌐</CardIcon>
            <CardTitle>{t('contact.websiteTitle')}</CardTitle>
            <CardContent>
              MyGamepadTester.com<br />
              {t('contact.websiteDesc')}
            </CardContent>
          </ContactCard>
        </ContactGrid>

        <FAQSection>
          <FAQTitle>{t('contact.faqTitle')}</FAQTitle>

          <FAQItem>
            <Question>❓ {t('contact.q1')}</Question>
            <Answer>
              {t('contact.a1')}
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>❓ {t('contact.q2')}</Question>
            <Answer>
              {t('contact.a2')}
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>❓ {t('contact.q3')}</Question>
            <Answer>
              {t('contact.a3').replace('Privacy Policy', '')}
              <Link href="/privacy-policy" style={{ color: '#DA7756' }}>
                {t('privacy.title').split('-')[0].trim()}
              </Link>.
              {t('contact.a3').includes('details') ? t('contact.a3').split('Privacy Policy')[1] : ''}
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>❓ {t('contact.q4')}</Question>
            <Answer>
              {t('contact.a4')}
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>❓ {t('contact.q5')}</Question>
            <Answer>
              {t('contact.a5').replace('Terms of Service', '')}
              <Link href="/terms-of-service" style={{ color: '#DA7756' }}>
                {t('terms.title').split('-')[0].trim()}
              </Link>.
              {t('contact.a5').includes('details') ? t('contact.a5').split('Terms of Service')[1] : ''}
            </Answer>
          </FAQItem>
        </FAQSection>
      </Container>
    </>
  );
};

export default Contact;

