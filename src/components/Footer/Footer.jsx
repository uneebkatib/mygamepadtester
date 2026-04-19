'use client'


import { useI18n } from "../../contexts/I18nContext";
import { useCallback, memo } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Theme } from "@/styles/Theme";
import { FaGamepad, FaHome, FaTools, FaNewspaper, FaInfoCircle, FaFlask, FaEnvelope, FaTwitter, FaGithub, FaHeart, FaCode } from "react-icons/fa";

// Optimized styled components with fixed dimensions to prevent layout shifts
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${Theme.backgroundLight} 0%, ${Theme.surface} 100%);
  border-top: 2px solid ${Theme.primary};
  margin-top: auto;
  padding: 3rem 0 1.5rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  contain: layout style;
  min-height: 400px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${Theme.primary}, transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${Theme.accent}, ${Theme.primary}, ${Theme.accent});
    border-radius: 1px;
    filter: none;
  }
`;

const FooterContent = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  contain: layout style;
  min-height: 250px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 0 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
    padding: 0 0.5rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: ${Theme.textPrimary};
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, ${Theme.primary} 0%, ${Theme.accent} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2rem;
    
    svg {
      color: ${Theme.primary};
      font-size: 1rem;
    }
  }
  
  @media (max-width: 768px) {
    h3 {
      justify-content: center;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 120px;
  
  a {
    color: ${Theme.textSecondary};
    text-decoration: none;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    padding: 0.3rem 0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 1.8rem;
    
    svg {
      font-size: 0.8rem;
      color: ${Theme.primary};
      transition: all 0.3s ease;
    }
    
    &:hover {
      color: ${Theme.textPrimary};
      transform: translateX(3px);
      
      svg {
        color: ${Theme.accent};
        transform: scale(1.1);
      }
    }
  }
  
  @media (max-width: 768px) {
    align-items: center;
    
    a {
      justify-content: center;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  min-height: 3rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
  
  a {
    color: ${Theme.textSecondary};
    font-size: 1.2rem;
    padding: 0.5rem;
    border-radius: 8px;
    background: transparent;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    min-width: 2.5rem;
    min-height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      color: ${Theme.textPrimary};
      background: linear-gradient(135deg, ${Theme.surface}, ${Theme.backgroundLight});
      border-color: ${Theme.primary};
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 2rem 1rem;
  border-top: 1px solid ${Theme.border};
  margin-top: 2rem;
  contain: layout style;
  min-height: 150px;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem 1rem;
  }
  
  .footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    min-height: 8rem;
    
    @media (max-width: 1024px) {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
    }
  }
  
  .copyright-section {
    flex: 1;
    
    p {
      color: ${Theme.textMuted};
      font-size: 0.85rem;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.5rem;
      min-height: 1.5rem;
      
      @media (max-width: 1024px) {
        justify-content: center;
      }
      
      @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.3rem;
      }
      
      .heart {
        color: ${Theme.accent};
        animation: heartbeat 2s ease-in-out infinite;
      }
      
      .brand {
        color: ${Theme.primary};
        font-weight: 600;
      }
    }
    
    .tagline {
      margin-top: 0.5rem !important;
      font-size: 0.75rem !important;
      color: ${Theme.textSecondary} !important;
      font-style: italic;
      min-height: 1.2rem;
    }
  }
  
  .features-summary {
    display: flex;
    gap: 2rem;
    min-height: 5rem;
    
    @media (max-width: 768px) {
      gap: 1rem;
    }
    
    .feature-highlight {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      background: linear-gradient(135deg, ${Theme.surface}, ${Theme.backgroundLight});
      border-radius: 12px;
      border: 1px solid ${Theme.border};
      min-width: 100px;
      transition: all 0.3s ease;
      min-height: 4.5rem;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${Theme.shadowLight};
        border-color: ${Theme.primary};
      }
      
      .feature-count {
        font-size: 1.5rem;
        font-weight: 700;
        color: ${Theme.primary};
        line-height: 1;
        min-height: 1.8rem;
      }
      
      .feature-label {
        font-size: 0.7rem;
        color: ${Theme.textSecondary};
        text-align: center;
        margin-top: 0.25rem;
        line-height: 1.2;
        min-height: 1.2rem;
      }
    }
  }
  
  @keyframes heartbeat {
    0%, 50%, 100% { transform: scale(1); }
    25%, 75% { transform: scale(1.1); }
  }
`;

// Memoized Footer component for better performance
const FooterComponent = () => {
  const { t } = useI18n();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>
            <FaGamepad />
            {t('nav.home')}
          </h3>
          <FooterLinks>
            <Link href="/">
              <FaHome />
              {t('nav.home')}
            </Link>
            <Link href="/joycon-tester">
              🎮 {t('controllers.joycon')}
            </Link>
            <Link href="/vibration-test">
              📳 {t('features.vibrationTest')}
            </Link>
            <Link href="/joystick-calibration">
              ⚙️ Calibration
            </Link>
            <Link href="/guides">
              📖 {t('nav.guides')}
            </Link>
            <Link href="/blog">
              📰 Blog
            </Link>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>
            <FaInfoCircle />
            {t('footer.about')}
          </h3>
          <FooterLinks>
            <Link href="/about">
              <FaInfoCircle />
              {t('nav.about')}
            </Link>
            <Link href="/contact">
              <FaEnvelope />
              {t('nav.contact')}
            </Link>
            <Link href="/embed">
              <FaCode />
              {t('nav.embed')}
            </Link>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>
            <FaTools />
            {t('footer.hardwareTools')}
          </h3>
          <FooterLinks>
            <Link href="/stick-drift-test">🕹️ {t('nav.stickDrift')}</Link>
            <Link href="/input-lag-test">⏱️ {t('nav.inputLag')}</Link>
            <Link href="/button-test">🔘 {t('nav.button')}</Link>
            <Link href="/trigger-test">🔫 {t('nav.trigger')}</Link>
            <Link href="/deadzone-test">🎯 {t('nav.deadzone')}</Link>
            <Link href="/keyboard-test">⌨️ {t('nav.keyboard')}</Link>
            <Link href="/mouse-test">🖱️ {t('nav.mouse')}</Link>
          </FooterLinks>
        </FooterSection>
        <FooterSection>
          <h3>
            <FaEnvelope />
            {t('nav.contact')}
          </h3>
          <FooterLinks>
            <Link href="/contact">
              <FaEnvelope />
              {t('nav.contact')}
            </Link>
            <Link href="/privacy-policy">
              ⚖️ {t('footer.privacyPolicy')}
            </Link>
            <Link href="/terms-of-service">
              ⚖️ {t('footer.termsOfService')}
            </Link>
          </FooterLinks>
          <SocialLinks>
            <a href="https://x.com/uneebkatib" target="_blank" rel="noopener noreferrer" title="X (Twitter) - Developer" aria-label="Follow developer on X Twitter">
              <FaTwitter />
            </a>
            <a href="https://github.com/mygamepadtester" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="Visit our GitHub repository">
              <FaGithub />
            </a>
            <a href="mailto:support@mygamepadtester.com" title="Email" aria-label="Send us an email">
              <FaEnvelope />
            </a>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <div className="footer-bottom-content">
          <div className="copyright-section">
            <p>
              © {new Date().getFullYear()} <span className="brand">MyGamepadTester</span> • {t('footer.madeWith')} <FaHeart className="heart" /> by <a href="https://x.com/uneebkatib" target="_blank" rel="noopener noreferrer" style={{ color: '#DA7756', textDecoration: 'none' }}>Uneeb Katib</a>
            </p>
            <p className="tagline">
              {t('tagline')}
            </p>
          </div>


        </div>
      </FooterBottom>
    </FooterContainer >
  );
};

// Export memoized component for better performance
export const Footer = memo(FooterComponent);