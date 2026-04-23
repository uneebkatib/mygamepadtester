'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Theme } from '../../styles/Theme';
import RelatedTools from '../RelatedTools/RelatedTools';

// ============================================================================
// STYLED COMPONENTS (CONSISTENT WITH PREMIUM THEME)
// ============================================================================

const StyledMainPageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background: #fff;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4.5rem;
  align-items: center;
  margin: 4.5rem 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const SectionHeading = styled.h2`
  font-size: clamp(2rem, 4vw, 2.6rem);
  font-weight: 900;
  color: #111827;
  margin-bottom: 2rem;
  letter-spacing: -0.03em;
  line-height: 1.15;
`;

const SubHeading = styled.h3`
  font-size: 1.55rem;
  font-weight: 800;
  color: ${Theme.primary};
  margin: 4.5rem 0 1.5rem 0;
`;

const ArticleText = styled.p`
  font-size: 1.15rem;
  color: #4b5563;
  line-height: 1.85;
  margin-bottom: 2rem;
`;

const CTABox = styled.div`
  background: linear-gradient(135deg, ${Theme.accent}0a 0%, #fff 100%);
  border-left: 6px solid ${Theme.accent};
  padding: 2.5rem;
  margin: 3.5rem 0;
  border-radius: 0 24px 24px 0;
  box-shadow: 0 8px 30px rgba(0,0,0,0.04);
  
  p {
    margin: 0;
    color: #1f2937;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.6;
    
    a {
      color: ${Theme.accent};
      font-weight: 800;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
`;

const RoadmapSteps = styled.div`
  margin: 5rem 0;
`;

const StepItem = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.2rem;
  }

  .number {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    color: white;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 950;
    box-shadow: 0 12px 24px ${Theme.primary}40;
  }

  .content {
    h4 {
      font-size: 1.4rem;
      font-weight: 800;
      margin-bottom: 0.8rem;
      color: #111827;
    }
    p {
      color: #4b5563;
      line-height: 1.8;
      margin: 0;
      font-size: 1.1rem;
    }
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin: 6rem 0;
`;

const FeatureCard = styled.div`
  background: #fff;
  padding: 2.8rem;
  border-radius: 32px;
  border: 1px solid #f3f4f6;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    border-color: ${Theme.primary}80;
    transform: translateY(-12px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  }

  .icon {
    font-size: 3.2rem;
    margin-bottom: 2.2rem;
    display: block;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 900;
    margin-bottom: 1.2rem;
    color: #111827;
  }

  p {
    color: #6b7280;
    line-height: 1.8;
    font-size: 1.1rem;
  }
`;

const RespImage = styled.div`
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 35px 80px -15px rgba(0,0,0,0.15);
  border: 1px solid #f3f4f6;
  background: #fff;
  width: 100%;
`;

const FAQSection = styled.div`
  margin-top: 8rem;
  background: #f9fafb;
  padding: 8rem 0;
`;

const AccordionItem = styled.div`
  margin-bottom: 1.5rem;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #fff;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${Theme.primary}40;
    box-shadow: 0 10px 25px rgba(0,0,0,0.03);
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 2rem 2.5rem;
  text-align: left;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.35rem;
  font-weight: 800;
  color: #111827;
  cursor: pointer;

  .icon {
    font-size: 1.8rem;
    color: ${Theme.primary};
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const AccordionContent = styled.div`
  padding: ${props => props.$isOpen ? '0 2.5rem 2.5rem 2.5rem' : '0'};
  max-height: ${props => props.$isOpen ? '800px' : '0'};
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  color: #4b5563;
  line-height: 1.9;
  font-size: 1.15rem;
`;

const ToolCTA = styled.div`
  background: #0b0e14;
  color: white;
  padding: 6rem 4rem;
  border-radius: 48px;
  text-align: center;
  margin: 8rem 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 40px 100px -20px rgba(0,0,0,0.4);

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, ${Theme.primary}20 0%, transparent 70%);
    pointer-events: none;
  }

  h3 {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    color: #fff;
    font-weight: 950;
    letter-spacing: -0.04em;
  }

  p {
    font-size: 1.3rem;
    color: #9ca3af;
    margin-bottom: 3.5rem;
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.7;
  }

  button {
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    color: white;
    padding: 1.4rem 4.5rem;
    border-radius: 80px;
    border: none;
    font-weight: 900;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 20px 40px ${Theme.primary}40;

    &:hover {
      transform: translateY(-8px) scale(1.05);
      box-shadow: 0 30px 60px ${Theme.primary}60;
    }
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DeadzoneContent() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledMainPageWrapper>
      <SectionContainer>
        {/* 🏆 COMPREHENSIVE INTRODUCTION */}
        <ContentGrid>
          <div className="content">
            <SectionHeading>Controller Deadzone Test – Find Your Exact Joystick Threshold</SectionHeading>
            <SubHeading style={{ marginTop: 0 }}>What Is a Controller Dead Zone?</SubHeading>
            <ArticleText>
              Every analog stick has a small area around its neutral position where movement is treated as zero. This area is called the <strong>dead zone</strong>. It exists because joystick sensors output tiny non-zero values at rest due to manufacturing tolerances, normal wear, or general electronic noise.
            </ArticleText>
            <ArticleText>
              Without a dead zone, those idle values would register as constant unintended movement, making your character drift or your camera creep on its own. A radial deadzone treats the stick position as a circular vector, ignoring all movement inside a set magnitude.
            </ArticleText>
            <CTABox>
              <p>Skip the guessing entirely. The <a href="#test" onClick={scrollToTop}>free Deadzone Test</a> at <strong>mygamepadtester.com</strong> gives you exact axis readings and a suggested deadzone value in under two minutes.</p>
            </CTABox>
          </div>
          <RespImage>
            <Image
              src="/images/deadzone-test/intro-diagram.webp"
              alt="Diagram showing how controller dead zone threshold affects joystick input registration"
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </RespImage>
        </ContentGrid>

        {/* 🏆 WHY IT MATTERS */}
        <div style={{ margin: '8rem 0' }}>
            <SectionHeading style={{ textAlign: 'center' }}>Why Dead Zone Testing Matters for Gamers</SectionHeading>
            <ContentGrid>
                <RespImage>
                    <Image
                        src="/images/deadzone-test/ui-mockup.webp"
                        alt="Screenshot mockup of a dead zone test tool showing joystick position dot and deadzone ring overlay"
                        width={800}
                        height={550}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </RespImage>
                <div className="content">
                    <SubHeading style={{ marginTop: 0 }}>Precision and Performance</SubHeading>
                    <ArticleText>
                        In first-person shooters and racing games, precision is everything. A dead zone that is even slightly off can make aiming feel sluggish or cause unintended drift. A two-minute test tells you exactly where your controller stands.
                    </ArticleText>
                    <ArticleText>
                        For competitive players, dead zones directly affect reaction time. A smaller dead zone means the stick registers movement sooner, which can make a real difference in tournament play.
                    </ArticleText>
                    <ArticleText>
                        Use this data to <Link href="/input-lag-test" style={{ color: Theme.accent, fontWeight: 700 }}>measure your controller's input lag</Link> alongside your deadzone for a complete performance baseline.
                    </ArticleText>
                </div>
            </ContentGrid>
        </div>

        {/* 📝 STEP BY STEP */}
        <div style={{ margin: '10rem 0' }}>
          <SectionHeading style={{ textAlign: 'center' }}>How to Use the Deadzone Test: Step-by-Step</SectionHeading>
          <ArticleText style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 5rem auto' }}>
            Follow these six steps at <strong>mygamepadtester.com</strong> to find your controller's exact noise floor and set a deadzone that stops drift without killing fine control.
          </ArticleText>
          <ContentGrid>
            <RoadmapSteps>
              <StepItem>
                <div className="number">1</div>
                <div className="content">
                  <h4>Connect & Wake</h4>
                  <p>Plug in via USB or Bluetooth. Press any button to wake the Gamepad API and identify your device.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">2</div>
                <div className="content">
                  <h4>Detect & Start</h4>
                  <p>Click "Detect Controller" then "Start Test" to begin reading raw axis values in real-time.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">3</div>
                <div className="content">
                  <h4>Choose Your Mode</h4>
                  <p>Select **Radial mode** for general use or **Per-Axis mode** for separate X/Y threshold analysis.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">4</div>
                <div className="content">
                  <h4>Sample Idle Jitter</h4>
                  <p>Let the stick sit untouched for 60 seconds. Note any movement on the canvas without input.</p>
                </div>
              </StepItem>
            </RoadmapSteps>
            <RespImage>
              <Image
                src="/images/deadzone-test/steps-infographic.webp"
                alt="Step-by-step infographic showing how to use an online dead zone test tool for game controllers at mygamepadtester.com"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </RespImage>
          </ContentGrid>
        </div>

        {/* 📊 FEATURE HIGHLIGHTS */}
        <SectionHeading style={{ textAlign: 'center' }}>Key Features of the Deadzone Test</SectionHeading>
        <FeatureGrid>
          <FeatureCard>
            <span className="icon">🛡️</span>
            <h4>Radial vs Per-Axis</h4>
            <p>Treat stick position as a circular vector or handle X and Y independently for noisier sensors.</p>
          </FeatureCard>
          <FeatureCard>
            <span className="icon">🧠</span>
            <h4>Auto-Suggest Logic</h4>
            <p>Our tool samples idle data while untouched and suggests a conservative threshold with a safety margin.</p>
          </FeatureCard>
          <FeatureCard>
            <span className="icon">📈</span>
            <h4>CSV Exporting</h4>
            <p>Save time-stamped records of every sample for deep log analysis in Excel or Google Sheets.</p>
          </FeatureCard>
        </FeatureGrid>

        {/* 📊 RESULTS CHART */}
        <div style={{ margin: '10rem 0' }}>
          <SectionHeading style={{ textAlign: 'center' }}>What Your Results Mean</SectionHeading>
          <ContentGrid>
            <RespImage>
                <Image
                    src="/images/deadzone-test/results-chart.webp"
                    alt="Color-coded deadzone value chart showing range from 0.00 minimal to above 0.20 significant controller wear"
                    width={800}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                />
            </RespImage>
            <div className="content">
                <SubHeading style={{ marginTop: 0 }}>Interpreting the Data</SubHeading>
                <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.05rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '3px solid #DA7756' }}>
                        <th style={{ padding: '1rem', fontWeight: 800, color: '#111827' }}>Range</th>
                        <th style={{ padding: '1rem', fontWeight: 800, color: '#111827' }}>Meaning</th>
                        <th style={{ padding: '1rem', fontWeight: 800, color: '#111827' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '1rem', color: '#4b5563' }}><strong>0.00 – 0.04</strong></td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>Minimal</td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>Near-perfect condition. No deadzone needed.</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '1rem', color: '#4b5563' }}><strong>0.05 – 0.12</strong></td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>Typical</td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>Normal electrical noise. Small deadzone keeps it clean.</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '1rem', color: '#4b5563' }}><strong>0.13 – 0.20</strong></td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>Worn</td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>Sensor wear beginning. Calibrate or increase deadzone.</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '1rem', color: '#4b5563' }}><strong>Above 0.20</strong></td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>Significant wear</td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>Deadzone is masking drift, not precision-tuning. Consider repair.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <CTABox>
                  <p>Running high? You should <Link href="/joystick-calibration" style={{ color: Theme.accent, textDecoration: 'underline' }}>calibrate your joystick</Link> to verify full range accuracy.</p>
                </CTABox>
            </div>
          </ContentGrid>
        </div>

        {/* 🛠️ COMMON MISTAKES */}
        <div style={{ margin: '8rem 0' }}>
            <SectionHeading style={{ textAlign: 'center' }}>Common Mistakes and How to Fix Them</SectionHeading>
            <ContentGrid>
                <div className="content">
                    <SubHeading style={{ marginTop: 0 }}>Stacking Deadzone Layers</SubHeading>
                    <ArticleText>
                      The most common mistake is having a deadzone active in your OS settings and another in-game. This compounds, making movement feel slow and sluggish.
                    </ArticleText>
                    <ArticleText>
                      Always check whether your game has its own deadzone slider and account for it separately. If drift persists in-game but looks clean in our test, the mismatch is likely in your software configuration.
                    </ArticleText>
                    <ArticleText>
                      Don't forget to <Link href="/trigger-test" style={{ color: Theme.primary, fontWeight: 700 }}>test your triggers</Link> for response issues to ensure your entire input layer is optimized.
                    </ArticleText>
                </div>
                <RespImage>
                    <Image
                        src="/images/deadzone-test/settings-conflict.webp"
                        alt="Illustration showing correct single-layer deadzone setup versus conflicting deadzone settings in game and Steam"
                        width={800}
                        height={550}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </RespImage>
            </ContentGrid>
        </div>

        {/* 👥 WHO SHOULD USE TOOLS */}
        <div style={{ margin: '6rem 0', textAlign: 'center' }}>
          <SectionHeading>Who Should Run This Test?</SectionHeading>
          <ArticleText style={{ maxWidth: '900px', margin: '0 auto' }}>
            Competitive gamers, FPS players, speedrunners, and repair technicians get the most value from precise deadzone reading. It confirms whether stick drift is a hardware failure or a calibration shift.
          </ArticleText>
        </div>
      </SectionContainer>

      {/* ❓ FAQ SECTION */}
      <FAQSection>
        <SectionContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '5rem' }}>
              <div style={{ maxWidth: '100px' }}>
                <Image src="/images/deadzone-test/faqs-icon.webp" alt="FAQ Icon" width={100} height={100} style={{ width: '100%', height: 'auto' }} />
              </div>
              <SectionHeading style={{ margin: 0 }}>Deadzone Test FAQ</SectionHeading>
          </div>
          
          <div style={{ maxWidth: '950px', margin: '0 auto' }}>
            {[
              {
                q: "What does a dead zone test actually measure?",
                a: "The test reads raw axis values using the Gamepad API and identifies the maximum deviation from zero while the stick is untouched. It shows the minimum threshold needed to suppress idle jitter."
              },
              {
                q: "What deadzone percentage is best for competitive gaming?",
                a: "Aim for 0.00-0.04 if your controller is clean. If you see light jitter, 0.05-0.12 is typical and still responsive. Going above 0.12 may hurt your micro-adjustment precision."
              },
              {
                q: "Does the deadzone test work with wireless controllers?",
                a: "Yes, but Bluetooth can introduce signal jitter. Always run a second test with a USB cable to see if the noise is coming from your connection or the hardware itself."
              },
              {
                q: "Is it drift or a deadzone issue?",
                a: "If the resting dot moves continuously without input, it's drift (sensor wear). If movement feels blocked at the outer edges, it's a deadzone limit. Our live readout makes this distinction clear."
              },
              {
                q: "Will changing my in-game deadzone override what the test shows?",
                a: "The test shows raw hardware output. However, in-game settings will stack on top of system-level deadzones (like Steam's). Always set your main deadzone in one place to avoid 'muddy' movement."
              },
              {
                q: "Can I use this tool on Console (PS5/Xbox)?",
                a: "The tool runs in any modern browser (Chrome/Edge/Safari). While consoles don't support browser Gamepad API, you can test your console controller on a PC or Mobile device with our site."
              },
              {
                q: "How do I know if my deadzone is too high?",
                a: "If movement feels slow or 'spongy' even when you push the stick firmly, your deadzone is likely too large. Lower it in 0.01 steps until movement feels snappy again."
              }
            ].map((item, index) => (
              <AccordionItem key={index}>
                <AccordionHeader
                  $isOpen={openFaq === index}
                  onClick={() => toggleFaq(index)}
                >
                  {item.q}
                  <span className="icon">↓</span>
                </AccordionHeader>
                <AccordionContent $isOpen={openFaq === index}>
                  <p>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </SectionContainer>
      </FAQSection>

      <SectionContainer>
        <ToolCTA>
          <h3>Dial in Your Aim Today.</h3>
          <p>Stop guessing your sensitivity. Join thousands of performance-focused gamers at <strong>mygamepadtester.com</strong> and optimize your control logic with pinpoint accuracy.</p>
          <button onClick={scrollToTop}>Run Deadzone Diagnostic</button>
        </ToolCTA>
      </SectionContainer>
      
      {/* 🧭 GLOBAL SITE NAVIGATION (NO ORPHAN PAGES) */}
      <RelatedTools currentPath="/deadzone-test" />
    </StyledMainPageWrapper>
  );
}
