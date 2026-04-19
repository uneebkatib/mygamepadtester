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

export default function MouseContent() {
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
        {/* 🖱️ COMPREHENSIVE INTRODUCTION */}
        <ContentGrid>
          <div className="content">
            <SectionHeading>Mouse Test Online – Check Clicks, Scroll & Side Buttons</SectionHeading>
            <SubHeading style={{ marginTop: 0 }}>Your Left Click Double-Fires. Or a Side Button Stopped Registering.</SubHeading>
            <ArticleText>
                These are the two most common mouse failures, and both are invisible until you test for them. This mouse test shows you exactly which button is at fault and whether it's fixable in software or needs a hardware repair.
            </ArticleText>
            <ArticleText>
                The diagnostic terminal captures raw event data to identify malfunctioning switches or the infamous Omron double-click failure immediately. Instead of relying on "feel," you get an objective measurement for every click and scroll rotation.
            </ArticleText>
            <ArticleText>
                <strong>Key benchmark:</strong> A normal click registers in 40–90ms. Anything under 10ms on a single press means a double-click hardware fault — the switch is bouncing internally.
            </ArticleText>
            <CTABox>
              <p>Use the <a href="#test" onClick={scrollToTop}>Mouse Test</a> above to get a professional diagnostic for every button and scroll step.</p>
            </CTABox>
          </div>
          <RespImage>
            <Image 
              src="/gaming_mouse_diagnostic_hero_1774592567455.png" 
              alt="High-end gaming mouse with holographic diagnostic UI" 
              width={600} 
              height={450} 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </RespImage>
        </ContentGrid>

        {/* 📝 STEP BY STEP */}
        <div style={{ margin: '10rem 0' }}>
          <SectionHeading style={{ textAlign: 'center' }}>How to Use the Mouse Test: Step-by-Step</SectionHeading>
          <ArticleText style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 5rem auto' }}>
             Testing your mouse at <strong>mygamepadtester.com</strong> takes under a minute. Follow these steps for a full switch diagnostic.
          </ArticleText>
          <ContentGrid>
            <RoadmapSteps>
              <StepItem>
                <div className="number">1</div>
                <div className="content">
                  <h4>Click Main Buttons</h4>
                  <p>Click your left, right, and middle buttons. The corresponding area on the on-screen mouse will light up green.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">2</div>
                <div className="content">
                  <h4>Test Side Buttons</h4>
                  <p>Press Button 4 and Button 5. Our tool prevents the browser from navigating back, so you can test side buttons safely.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">3</div>
                <div className="content">
                  <h4>Scroll Wheel Scan</h4>
                  <p>Rotate the wheel up and down. Watch the arrows in the center of the UI to confirm the scroll encoder is tracking properly.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">4</div>
                <div className="content">
                  <h4>Double-Click Check</h4>
                  <p>Rapidly click your left button. If a single physical press adds two counts to the log, your switch is failing.</p>
                </div>
              </StepItem>
            </RoadmapSteps>
            <RespImage>
               <Image 
                 src="/gaming_mouse_diagnostic_guide_steps_1774592683919.png" 
                 alt="Step-by-step mouse testing infographic" 
                 width={600} 
                 height={400} 
                 style={{ width: '100%', height: 'auto', display: 'block' }}
               />
            </RespImage>
          </ContentGrid>
        </div>

        {/* 🚨 DOUBLE CLICK SECTION */}
        <div style={{ margin: '8rem 0' }}>
            <SectionHeading style={{ textAlign: 'center' }}>Why Double-Clicking Is a Hardware Problem</SectionHeading>
            <ContentGrid>
                <div className="content">
                    <SubHeading style={{ marginTop: 0 }}>Microswitch Wear</SubHeading>
                    <ArticleText>
                      Most gaming mice use Omron or Huano microswitches. Over time, the internal spring mechanism degrades, causing "bounce" errors where a single click generates two electrical signals.
                    </ArticleText>
                    <ArticleText>
                      If you see intervals under 10ms in the event log during normal clicks, this is a confirmed "bounce" issue. This is a physical problem that software settings cannot permanently fix.
                    </ArticleText>
                    <ArticleText>
                      Suspect your latency is also high? You can <Link href="/input-lag-test" style={{ color: Theme.accent, fontWeight: 700 }}>test your input lag</Link> to measure actual total response time.
                    </ArticleText>
                </div>
                <FeatureCard style={{ background: '#0b0e14', color: 'white' }}>
                    <h4 style={{ color: 'white' }}>Omron vs. Optical</h4>
                    <p style={{ color: '#9ca3af' }}>Newer mice use Optical Switches which use a beam of light to register clicks. These have NO moving contacts and are physically immune to the double-click problem.</p>
                    <div style={{ marginTop: '2rem', fontSize: '3rem' }}>🌩️</div>
                </FeatureCard>
            </ContentGrid>
        </div>

        {/* 📊 FEATURE HIGHLIGHTS */}
        <SectionHeading style={{ textAlign: 'center' }}>Key Features of the Mouse Test</SectionHeading>
        <FeatureGrid>
          <FeatureCard>
            <span className="icon">⏱️</span>
            <h4>CPS Counter</h4>
            <p>Measure your <strong>Clicks Per Second</strong> over 1s, 5s, or 10s intervals to benchmark your burst and sustain speed.</p>
            <Image 
              src="/mouse_cps_benchmark_chart_1774592662224.png" 
              alt="CPS Speed Benchmark Zones" 
              width={300} 
              height={200} 
              style={{ width: '100%', height: 'auto', marginTop: '1.5rem', borderRadius: '12px' }}
            />
          </FeatureCard>
          <FeatureCard>
            <span className="icon">🛡️</span>
            <h4>Bounce Detection</h4>
            <div style={{ marginBottom: '1.5rem' }}>
              <p>Detailed interval logging to catch accidental double-clicks caused by switch degradation or debris.</p>
            </div>
            <Image 
              src="/mouse_switch_chatter_infographic_1774592641360.png" 
              alt="Mouse Switch Chatter Waveform" 
              width={300} 
              height={200} 
              style={{ width: '100%', height: 'auto', borderRadius: '12px' }} 
            />
          </FeatureCard>
          <FeatureCard>
            <span className="icon">🔄</span>
            <h4>Scroll Encoder Test</h4>
            <p>Verify that your scroll wheel isn't jumping, stuttering, or failing to register specific scroll steps.</p>
            <Image 
              src="/mouse_scroll_encoder_diagram_1774592619409.png" 
              alt="Mouse Scroll Encoder Internals" 
              width={300} 
              height={200} 
              style={{ width: '100%', height: 'auto', marginTop: '1.5rem', borderRadius: '12px' }}
            />
          </FeatureCard>
        </FeatureGrid>

        {/* 🛠️ FIXING SECTION */}
        <div style={{ margin: '8rem 0' }}>
            <SectionHeading style={{ textAlign: 'center' }}>How to Fix a Mouse That Fails the Test</SectionHeading>
            <ContentGrid>
                <div className="content">
                    <SubHeading style={{ marginTop: 0 }}>Isolate Hardware</SubHeading>
                    <ArticleText>
                      First, try a different USB port to rule out connection jitter. For wireless mice, reseat the receiver and ensure the battery is charged.
                    </ArticleText>
                    <ArticleText>
                      For double-clicking, you can try raising the <strong>Debounce Time</strong> in your mouse companion software (like <a href="https://www.logitechg.com/en-us/innovation/g-hub.html" target="_blank" rel="noopener noreferrer" style={{ color: Theme.primary, textDecoration: 'underline' }}>Logitech G Hub</a> or <a href="https://www.razer.com/synapse-3" target="_blank" rel="noopener noreferrer" style={{ color: Theme.primary, textDecoration: 'underline' }}>Razer Synapse</a>) to 12ms to "mask" the extra signal.
                    </ArticleText>
                    <CTABox>
                      <p>Full-setup check? Don't forget to <Link href="/keyboard-test" style={{ color: Theme.primary, textDecoration: 'underline' }}>run the Keyboard Test</Link> to ensure your keys are just as reliable as your clicks.</p>
                    </CTABox>
                </div>
                <RespImage>
                    <Image 
                      src="/mouse_switch_registration_diagram_1774592594421.png" 
                      alt="Mouse microswitch registration and actuation cycle diagram" 
                      width={600} 
                      height={400} 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </RespImage>
            </ContentGrid>
        </div>

        {/* 👥 WHO SHOULD USE TOOLS */}
        <div style={{ margin: '6rem 0', textAlign: 'center' }}>
          <SectionHeading>Who Should Run This Test?</SectionHeading>
          <ArticleText style={{ maxWidth: '900px', margin: '0 auto' }}>
             Competitive FPS and MOBA players use this tool as part of their routine pre-match hardware check. It is the gold standard for checking used mice before purchase and verifying after-repair results.
          </ArticleText>
        </div>
      </SectionContainer>

      {/* ❓ FAQ SECTION */}
      <FAQSection>
        <SectionContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '5rem' }}>
              <span style={{ fontSize: '4rem' }}>❓</span>
              <SectionHeading style={{ margin: 0 }}>Mouse Test FAQ</SectionHeading>
          </div>
          
          <div style={{ maxWidth: '950px', margin: '0 auto' }}>
            {[
              {
                q: "Does the mouse test work with wireless mice?",
                a: "Yes. Both Bluetooth and 2.4GHz wireless mice are fully supported. If your mouse seems laggy, try connecting the receiver to a different USB port to rule out interference."
              },
              {
                q: "What does it mean if my left click registers twice?",
                a: "If the counter increments twice for one press, or the log shows a <10ms interval, you have a mechanical bounce error. This is a sign of switch wear and usually requires a hardware replacement or a software 'Debounce' adjustment."
              },
              {
                q: "Why are my side buttons not lighting up?",
                a: "Ensure you are using an updated version of Chrome or Firefox. Some older browsers don't support captured events for side buttons 4 and 5. If it still fails in a modern browser, the button itself is likely dead."
              },
              {
                q: "Can I test my mouse's DPI with this tool?",
                a: "Our tool focuses on button registration and latency. Testing exact DPI (Dots Per Inch) requires specialized software or a manual measurement tool, as browsers do not receive raw DPI data."
              },
              {
                q: "How fast should my CPS be?",
                a: "The average gamer clicks between 4-7 times per second (CPS). Pro players often hit 10+ CPS. If your CPS is under 2, your mouse may have a very high 'ignore' filter or a hardware delay."
              },
              {
                q: "Is my data stored or tracked?",
                a: "No. All analytic processing happens on your local device within the browser. We do not upload your click patterns or timing data to any server. Your privacy is total."
              },
              {
                q: "My mouse passes the test but feels laggy in my game. Why?",
                a: "This means your hardware is perfectly healthy! The 'lag' you feel is likely caused by in-game settings (V-Sync), low frame rates, or network latency rather than the mouse itself."
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
          <h3>Don't Guess Your Performance.</h3>
          <p>If your mouse feels off, the numbers don't lie. Run the diagnostic above and know exactly which switch needs attention.</p>
          <button onClick={scrollToTop}>Start Mouse Test</button>
        </ToolCTA>
      </SectionContainer>
      
      {/* 🧭 GLOBAL SITE NAVIGATION (NO ORPHAN PAGES) */}
      <RelatedTools currentPath="/mouse-test" />
    </StyledMainPageWrapper>
  );
}
