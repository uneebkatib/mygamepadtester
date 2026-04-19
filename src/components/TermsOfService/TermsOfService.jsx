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

const TermsOfService = () => {
    const { t, locale } = useI18n();

    return (
        <>
            <PageSEO page="termsOfService" />

            <Container>
                <h1 style={{
                    color: '#DA7756',
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem',
                    fontWeight: '700'
                }}>
                    {t('terms.title')}
                </h1>
                <LastUpdated>{t('terms.lastUpdated')}</LastUpdated>

                <Section>
                    <Paragraph>
                        {t('terms.intro')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section1Title')}</SectionTitle>

                    <Paragraph>
                        <strong>{t('terms.section1Sub1')}</strong> {t('terms.section1Sub1Desc')}
                    </Paragraph>

                    <Paragraph>
                        <strong>{t('terms.section1Sub2')}</strong> {t('terms.section1Sub2Desc')}
                    </Paragraph>
                    <List>
                        <li>{t('terms.prohibitItem1')}</li>
                        <li>{t('terms.prohibitItem2')}</li>
                        <li>{t('terms.prohibitItem3')}</li>
                        <li>{t('terms.prohibitItem4')}</li>
                        <li>{t('terms.prohibitItem5')}</li>
                    </List>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section2Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section2Desc')}
                    </Paragraph>
                    <List>
                        <li>{t('terms.warrantyItem1')}</li>
                        <li>{t('terms.warrantyItem2')}</li>
                        <li>{t('terms.warrantyItem3')}</li>
                    </List>
                    <Paragraph>
                        <strong>{t('terms.warrantyNote').split(':')[0]}:</strong>{t('terms.warrantyNote').split(':')[1]}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section3Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section3Desc')}
                    </Paragraph>
                    <List>
                        <li>{t('terms.liabilityItem1')}</li>
                        <li>{t('terms.liabilityItem2')}</li>
                        <li>{t('terms.liabilityItem3')}</li>
                        <li>{t('terms.liabilityItem4')}</li>
                    </List>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section4Title')}</SectionTitle>
                    <Paragraph>
                        <strong>{t('terms.section4Sub1')}</strong> {t('terms.section4Sub1Desc')}
                    </Paragraph>
                    <Paragraph>
                        <strong>{t('terms.section4Sub2')}</strong> {t('terms.section4Sub2Desc')}{' '}
                        <a href="https://x.com/uneebkatib" target="_blank" rel="noopener noreferrer" style={{ color: '#DA7756' }}>
                            Uneeb Katib
                        </a>.
                    </Paragraph>
                    <Paragraph>
                        <strong>{t('terms.section4Sub3')}</strong> {t('terms.section4Sub3Desc')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section5Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section5Desc')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section6Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section6Desc')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section7Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section7Desc').replace('Privacy Policy', '')}
                        <Link href="/privacy-policy" style={{ color: '#DA7756' }}>
                            {t('privacy.title').split('-')[0].trim()}
                        </Link>.
                        {t('terms.section7Desc').includes('Please review') ? t('terms.section7Desc').split('Privacy Policy.')[1] : ''}
                    </Paragraph>
                    <Paragraph>
                        <strong>{t('terms.controllerPrivacy').split(':')[0]}:</strong>{t('terms.controllerPrivacy').split(':')[1]}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section8Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section8Desc')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section9Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section9Desc')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section10Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section10Desc')}
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section11Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section11Desc')}
                    </Paragraph>
                    <Paragraph>
                        <strong>{t('terms.websiteLabel')}</strong> <Link href="/contact" style={{ color: '#DA7756' }}>{t('privacy.contactPage')}</Link>
                    </Paragraph>
                    <Paragraph>
                        <strong>{t('terms.developerLabel')}</strong> <a href="https://x.com/uneebkatib" target="_blank" rel="noopener noreferrer" style={{ color: '#DA7756' }}>@uneebkatib {t('terms.onX')}</a>
                    </Paragraph>
                </Section>

                <Section>
                    <SectionTitle>{t('terms.section12Title')}</SectionTitle>
                    <Paragraph>
                        {t('terms.section12Desc')}
                    </Paragraph>
                </Section>
            </Container>
        </>
    );
};

export default TermsOfService;
