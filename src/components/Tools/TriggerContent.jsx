'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Theme } from '../../styles/Theme';
import RelatedTools from '../RelatedTools/RelatedTools';

// ============================================================================
// STYLED COMPONENTS (PREMIUM ORANGE/BLUE THEME)
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
  gap: 4rem;
  align-items: center;
  margin: 3.5rem 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SectionHeading = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${Theme.primary};
  margin: 3.5rem 0 1.2rem 0;
`;

const ArticleText = styled.p`
  font-size: 1.15rem;
  color: #444;
  line-height: 1.8;
  margin-bottom: 1.8rem;
`;

const CTABox = styled.div`
  background: linear-gradient(135deg, #f0f7ff 0%, #fff 100%);
  border-left: 5px solid ${Theme.accent};
  padding: 2rem;
  margin: 2.5rem 0;
  border-radius: 0 16px 16px 0;
  box-shadow: 0 4px 15px rgba(28, 107, 187, 0.05);
  
  p {
    margin: 0;
    color: #1a1a1a;
    font-weight: 600;
    font-size: 1.1rem;
    
    a {
      color: ${Theme.accent};
      font-weight: 700;
      text-decoration: underline;
    }
  }
`;

const ThresholdTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #DA7756;
    color: white;
    font-weight: 700;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 5rem 0;
`;

const FeatureCard = styled.div`
  background: #fff;
  padding: 2.2rem;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    border-color: ${Theme.primary};
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.06);
  }

  .icon {
    font-size: 2.8rem;
    margin-bottom: 1.8rem;
    display: block;
  }

  h4 {
    font-size: 1.35rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  p {
    color: #555;
    line-height: 1.7;
    font-size: 1.05rem;
  }
`;

const RoadmapSteps = styled.div`
  margin: 5rem 0;
`;

const StepItem = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  .number {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 900;
    box-shadow: 0 10px 20px rgba(218, 119, 86, 0.2);
  }

  .content {
    h4 {
      font-size: 1.3rem;
      font-weight: 800;
      margin-bottom: 0.75rem;
      color: #1a1a1a;
    }
    p {
      color: #555;
      line-height: 1.7;
      margin: 0;
      font-size: 1.05rem;
    }
  }
`;

const FAQSection = styled.div`
  margin: 7rem 0 0 0;
  background: #f8fafc;
  padding: 6rem 0;
`;

const AccordionItem = styled.div`
  margin-bottom: 1.2rem;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #fff;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${Theme.primary}40;
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 1.8rem 2.2rem;
  text-align: left;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 800;
  color: #1a1a1a;
  cursor: pointer;

  .icon {
    font-size: 1.6rem;
    color: ${Theme.primary};
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const AccordionContent = styled.div`
  padding: ${props => props.$isOpen ? '0 2.2rem 2rem 2.2rem' : '0'};
  max-height: ${props => props.$isOpen ? '800px' : '0'};
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const RespImage = styled.div`
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0,0,0,0.12);
  border: 1px solid #f1f1f1;
  background: #fff;
  width: 100%;
`;

const ToolCTA = styled.div`
  background: #0f172a;
  color: white;
  padding: 4rem 3rem;
  border-radius: 32px;
  text-align: center;
  margin: 6rem 0;
  position: relative;
  overflow: hidden;

  h3 {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
    color: #fff;
    font-weight: 900;
  }

  p {
    font-size: 1.2rem;
    color: #94a3b8;
    margin-bottom: 2.5rem;
    max-width: 650px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  button {
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    color: white;
    padding: 1.2rem 3.5rem;
    border-radius: 60px;
    border: none;
    font-weight: 800;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 12px 25px ${Theme.primary}40;

    &:hover {
      transform: translateY(-4px);
    }
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TriggerContent() {
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
            <SectionHeading>Controller Trigger Test – Check Full Pressure Range on PS5, Xbox & Switch</SectionHeading>
            <ArticleText>
              If you've ever felt like your car isn't reaching top speed in Forza or your sniper rifle isn't firing in Call of Duty, your triggers might be failing to reach their full range. A controller trigger test checks whether your L2, R2, LT, and RT inputs are reading the complete 0 to 100 percent pressure scale as expected.
            </ArticleText>
            <ArticleText>
              Most trigger problems are invisible because the hardware feels fine physically. But a trigger that only reaches 88 percent will stop you from hitting full throttle. This diagnostic reads the raw analog value your controller is sending, exposing hidden deadzones and limited travel issues. For PS5 users, this also shows whether your adaptive trigger resistance is registering across the full pressure range in Chrome and Edge.
            </ArticleText>
            <CTABox>
              <p>Most trigger issues are invisible until you see the actual pressure numbers. Scroll up to the <a href="#test" onClick={scrollToTop}>Trigger Test</a> to check your L2/R2/LT/RT readings right now.</p>
            </CTABox>
          </div>
          <RespImage>
            <Image
              src="/images/trigger-test/ui-mockup.png"
              alt="Controller trigger test interface on mygamepadtester.com showing L2 and RT pressure range comparison"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </RespImage>
        </ContentGrid>

        {/* 🔬 HOW IT WORKS */}
        <div style={{ margin: '8rem 0' }}>
            <SectionHeading style={{ textAlign: 'center' }}>How the Trigger Test Works</SectionHeading>
            <ArticleText style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem auto' }}>
              The tool reads your controller's data through the HTML5 Gamepad API, exposing each trigger as a separate axis reporting a value from 0.0 to 1.0. This is converted to a 0 to 100 percentage.
            </ArticleText>
            
            <ContentGrid>
                <div className="content">
                    <SubHeading>Analog Precision and Real-Time Polling</SubHeading>
                    <ArticleText>
                        Live polling at roughly 60Hz gives you a per-frame sample of your trigger state. As you squeeze, the bar rises in real time. The tool shows the resting state (idle value) and the deadzone threshold (when it first registers above zero).
                    </ArticleText>
                    <ArticleText>
                        Consistent 0 to 100 readings mean your controller's internal potentiometer is healthy. If you see erratic spikes or a limited range, it's often a sign of worn silicon pads or conductive film displacement.
                    </ArticleText>
                </div>
                <RespImage>
                    <Image
                        src="/images/trigger-test/session-mockup.png"
                        alt="PS5 and Xbox controllers running a trigger test session in a browser on mygamepadtester.com"
                        width={800}
                        height={500}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </RespImage>
            </ContentGrid>
        </div>

        {/* 📝 STEP BY STEP */}
        <div style={{ margin: '8rem 0' }}>
          <SectionHeading>How to Use the Trigger Test: Step-by-Step</SectionHeading>
          <ContentGrid>
            <RoadmapSteps>
              <StepItem>
                <div className="number">1</div>
                <div className="content">
                  <h4>Connect & Wake Controller</h4>
                  <p>Plug in via USB or pair via Bluetooth. Press any button to register your controller with <strong>mygamepadtester.com</strong>.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">2</div>
                <div className="content">
                  <h4>Squeeze Triggers Slowly</h4>
                  <p>Note where the reading starts (deadzone point) and what value it reaches at full travel. Repeat for both sides.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">3</div>
                <div className="content">
                  <h4>Check Return to Zero</h4>
                  <p>Release fully. A value that does not return to zero at rest indicates a ghost input or stuck trigger problem.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">4</div>
                <div className="content">
                  <h4>Compare Left and Right</h4>
                  <p>A healthy pair of triggers shows similar ramp curves. If one stops at 90%, the sensor may be degrading.</p>
                </div>
              </StepItem>
            </RoadmapSteps>
            <RespImage>
              <Image
                src="/images/trigger-test/steps-infographic.png"
                alt="Step-by-step infographic showing how to use the online trigger tester on mygamepadtester.com"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </RespImage>
          </ContentGrid>
        </div>

        {/* 📊 FEATURE HIGHLIGHTS */}
        <div style={{ margin: '8rem 0' }}>
          <SectionHeading style={{ textAlign: 'center' }}>Key Features of the Trigger Test</SectionHeading>
          <FeatureGrid>
            <FeatureCard>
              <span className="icon">📶</span>
              <h4>0 to 100% Range</h4>
              <p>See exactly how much pressure is being registered. Crucial for racing games where 100% throttle is mandatory.</p>
            </FeatureCard>
            <FeatureCard>
              <span className="icon">⚖️</span>
              <h4>Simultaneous Testing</h4>
              <p>Both triggers are tested on separate channels at once to spot asymmetric wear between LT and RT.</p>
            </FeatureCard>
            <FeatureCard>
              <span className="icon">🎯</span>
              <h4>Deadzone Visibility</h4>
              <p>Detect precisely when your trigger activates. A small deadzone is normal; a large one indicates wear.</p>
            </FeatureCard>
          </FeatureGrid>
        </div>

        {/* 📊 PROBLEM PATTERNS */}
        <div style={{ margin: '8rem 0' }}>
          <SectionHeading style={{ textAlign: 'center' }}>Trigger Health Diagnosis</SectionHeading>
          <ThresholdTable>
              <thead>
                  <tr>
                      <th>Failure Pattern</th>
                      <th>Effect on Gameplay</th>
                      <th>Probable Cause</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td><strong>Stuck Below 100%</strong></td>
                      <td>Vehicles won't reach top speed; weapons won't fire.</td>
                      <td>Worn internal silicon pad or debris.</td>
                  </tr>
                  <tr>
                      <td><strong>Instant 0 to 100</strong></td>
                      <td>No pressure sensitivity; trigger works like a button.</td>
                      <td>Software override or broken analog sensor.</td>
                  </tr>
                  <tr>
                      <td><strong>Ghost Activation</strong></td>
                      <td>Character fires or aims without you touching the trigger.</td>
                      <td>Conductive film displacement or liquid damage.</td>
                  </tr>
              </tbody>
          </ThresholdTable>
        </div>

        {/* 🔧 INTERNALS EXPLORATION */}
        <ContentGrid>
            <RespImage>
                <Image
                    src="/images/trigger-test/internals-diagram.png"
                    alt="Technical diagram showing disassembled trigger internals with silicon pad and conductive film locations"
                    width={800}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                />
            </RespImage>
            <div className="content">
                <SubHeading>Why Triggers Fail Electrically</SubHeading>
                <ArticleText>
                  The mechanical travel of your trigger can feel fine while the electrical range has narrowed. This is often due to the silicon pad inside the controller wearing down. As it loses height, the trigger press no longer reaches the full extent of the conductive film.
                </ArticleText>
                <ArticleText>
                  On older DS4 and Xbox controllers, this is a common wear item. If the trigger test at <strong>mygamepadtester.com</strong> confirms a limited range, a simple node replacement kit is usually the permanent fix.
                </ArticleText>
                <CTABox>
                  <p>Check your <Link href="/deadzone-test" style={{ color: Theme.accent, textDecoration: 'underline' }}>trigger dead zones in detail</Link> if you suspect the starting point is drifting.</p>
                </CTABox>
            </div>
        </ContentGrid>

        {/* 👥 WHO SHOULD USE TOOLS */}
        <div style={{ margin: '6rem 0' }}>
          <SectionHeading>Who Should Run This Test?</SectionHeading>
          <ArticleText>
            <strong>Racing game players</strong> and FPS fans get the most value from this test. A trigger that tops out at 85 percent will prevent you from reaching top speeds or firing certain precision weapons. Repair shops also use this tool to document controller health before and after service.
          </ArticleText>
          <ArticleText style={{ textAlign: 'center' }}>
            Competitive players should also <Link href="/input-lag-test" style={{ color: Theme.primary, fontWeight: 700 }}>measure their controller's full response time</Link> along with trigger health for a complete competitive diagnostic.
          </ArticleText>
        </div>
      </SectionContainer>

      {/* ❓ FAQ SECTION */}
      <FAQSection>
        <SectionContainer>
          <SectionHeading style={{ textAlign: 'center', marginBottom: '4rem' }}>Trigger Test FAQ</SectionHeading>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              {
                q: "Does the trigger test work with PS5, PS4, and Xbox controllers?",
                a: "Yes. The tool supports any controller that uses XInput (Xbox) or HID protocols (PlayStation, Nintendo Pro). Press any button to wake the controller inside your browser."
              },
              {
                q: "What does it mean if my trigger only reaches 90 percent?",
                a: "It means the internal silicon pad has worn down. Electrically, the trigger's range has narrowed. This will cause failures in games requiring full trigger input (e.g., full throttle)."
              },
              {
                q: "Can the trigger test detect L2 and R2 ghost inputs?",
                a: "Yes. If your trigger shows a resting value above zero when untouched, you have a ghost input. This is often caused by debris or displaced conductive film."
              },
              {
                q: "Is it free and do I need to download software?",
                a: "It is 100% free and runs entirely in your browser at mygamepadtester.com. No downloads or registration required."
              },
              {
                q: "Why is the reading different than in my game?",
                a: "Games apply their own deadzones and response curves. Our test shows the raw signal from the hardware before any software modifications occur."
              },
              {
                q: "Can it test PS5 adaptive trigger features?",
                a: "No. Adaptive haptic resistance zones are restricted to official APIs. We test the analog pressure sensors which report the 0 to 100 travel."
              },
              {
                q: "How can I fix a trigger that doesn't reach 100 percent?",
                a: "For a hardware fix, replace the internal silicon pad. Temporary software fixes include adjusting the 'Trigger Range End' in Steam Input settings."
              },
              {
                q: "Should I test wired or wireless?",
                a: "Wired USB is recommended for the most consistent readings, as Bluetooth can introduce slight jitter in axis values."
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
          <h3>Restore Your Precision Today.</h3>
          <p>Don't let worn triggers ruin your racing line or your firing rate. Run the diagnostic above and see your exact pressure curve right now.</p>
          <button onClick={scrollToTop}>Run Trigger Diagnostic</button>
        </ToolCTA>
      </SectionContainer>
      
      {/* 🧭 GLOBAL SITE NAVIGATION (NO ORPHAN PAGES) */}
      <RelatedTools currentPath="/trigger-test" />
    </StyledMainPageWrapper>
  );
}
