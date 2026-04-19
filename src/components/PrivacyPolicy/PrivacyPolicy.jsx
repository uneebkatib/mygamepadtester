import React from 'react';
import PageSEO from '../SEO/PageSEO';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  color: #DA7756;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const LastUpdated = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #DA7756;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SubTitle = styled.h3`
  color: #555;
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const List = styled.ul`
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

import { useI18n } from '../../contexts/I18nContext';
import Link from "next/link";

const PrivacyPolicy = () => {
    const { t, locale } = useI18n();

    return (
        <>
            <PageSEO page="privacyPolicy" />

            <Container>
                <h1 style={{
                    color: '#DA7756',
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem',
                    fontWeight: '700'
                }}>
                    {t('privacy.title')}
                </h1>
                <LastUpdated>{t('privacy.lastUpdated')}</LastUpdated>

                <Section>
                    <Paragraph>
                        {t('privacy.intro')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section1Title')}</SectionTitle>

                    <SubTitle>{t('privacy.section1Sub1')}</SubTitle>
                    <Paragraph>
                        {t('privacy.section1Sub1Desc')}
                    </Paragraph>

                    <SubTitle>{t('privacy.section1Sub2')}</SubTitle>
                    <Paragraph>{t('privacy.section1Sub2Desc')}</Paragraph>
                    <List>
                        <li><strong>{t('privacy.usageData').split(':')[0]}:</strong>{t('privacy.usageData').split(':')[1]}</li>
                        <li><strong>{t('privacy.analyticsData').split(':')[0]}:</strong>{t('privacy.analyticsData').split(':')[1]}</li>
                        <li><strong>{t('privacy.gamepadData').split(':')[0]}:</strong>{t('privacy.gamepadData').split(':')[1]}</li>
                    </List>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section2Title')}</SectionTitle>
                    <Paragraph>{t('privacy.section2Desc')}</Paragraph>
                    <List>
                        <li>{t('privacy.useItem1')}</li>
                        <li>{t('privacy.useItem2')}</li>
                        <li>{t('privacy.useItem3')}</li>
                        <li>{t('privacy.useItem4')}</li>
                    </List>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section3Title')}</SectionTitle>
                    <Paragraph>
                        {t('privacy.section3Desc')}
                    </Paragraph>

                    <SubTitle>{t('privacy.cookieTypes')}</SubTitle>
                    <List>
                        <li><strong>{t('privacy.essentialCookies').split(':')[0]}:</strong>{t('privacy.essentialCookies').split(':')[1]}</li>
                        <li><strong>{t('privacy.analyticsCookies').split(':')[0]}:</strong>{t('privacy.analyticsCookies').split(':')[1]}</li>
                    </List>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section4Title')}</SectionTitle>
                    <Paragraph>{t('privacy.section4Desc')}</Paragraph>
                    <List>
                        <li><strong>{t('privacy.googleAnalytics').split(':')[0]}:</strong>{t('privacy.googleAnalytics').split(':')[1]}</li>
                        <li><strong>{t('privacy.googleAdSense').split(':')[0]}:</strong>{t('privacy.googleAdSense').split(':')[1]}</li>
                    </List>
                    <Paragraph>
                        {t('privacy.thirdPartyNote')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section5Title')}</SectionTitle>
                    <Paragraph>
                        {t('privacy.section5Desc')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section6Title')}</SectionTitle>
                    <Paragraph>
                        <strong>{t('privacy.section6Desc').split(':')[0]}:</strong>{t('privacy.section6Desc').split(':')[1]}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section7Title')}</SectionTitle>
                    <Paragraph>
                        {t('privacy.section7Desc')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section8Title')}</SectionTitle>
                    <Paragraph>{t('privacy.section8Desc')}</Paragraph>
                    <List>
                        <li>{t('privacy.rightItem1')}</li>
                        <li>{t('privacy.rightItem2')}</li>
                        <li>{t('privacy.rightItem3')}</li>
                        <li>{t('privacy.rightItem4')}</li>
                        <li>{t('privacy.rightItem5')}</li>
                    </List>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section9Title')}</SectionTitle>
                    <Paragraph>
                        {t('privacy.section9Desc')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('privacy.section10Title')}</SectionTitle>
                    <Paragraph>
                        {t('privacy.contactIntro')}
                    </Paragraph>
                    <Paragraph>
                        <strong>{t('privacy.emailLabel')}</strong>{' '}
                        {locale === 'en' ? 'Contact via our ' : (locale === 'es' ? 'Contactar a través de nuestra ' : 'اتصل عبر ')}
                        <Link href="/contact" style={{ color: '#DA7756' }}>
                            {t('privacy.contactPage')}
                        </Link>
                    </Paragraph>
                    <Paragraph>
                        <strong>{t('privacy.developerLabel')}</strong> <a href="https://x.com/uneebkatib" target="_blank" rel="noopener noreferrer" style={{ color: '#DA7756' }}>@uneebkatib</a>
                    </Paragraph>
                </Section>
            </Container>
        </>
    );
};

export default PrivacyPolicy;
