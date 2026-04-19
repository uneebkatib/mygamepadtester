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

export default function KeyboardContent() {
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
        {/* ⌨️ COMPREHENSIVE INTRODUCTION */}
        <ContentGrid>
          <div className="content">
            <SectionHeading>Keyboard Test Online – Check Every Key, Ghosting & Rollover Free</SectionHeading>
            <SubHeading style={{ marginTop: 0 }}>Verify Every Keystroke</SubHeading>
            <ArticleText>
                One of the biggest frustrations in gaming is a key that doesn't register—or worse, a key that gets stuck during a match. This keyboard test utility identifies **dead keys** (switches that no longer fire) and **stuck keys** (one that fires without being pressed) immediately.
            </ArticleText>
            <ArticleText>
                Our professional diagnostic suite highlights every input in real time. Instead of guessing if your 'W' key is failing, you get a clear visual confirmation for every single switch on your board, including function keys, numpads, and media keys.
            </ArticleText>
            <ArticleText>
                Connecting through standard browser events means zero-delay diagnostics. Everything runs locally on your PC, ensuring total privacy and near-instant response times.
            </ArticleText>
            <CTABox>
              <p>Knowing exactly which keys work takes moments. Use the <a href="#test" onClick={scrollToTop}>Keyboard Test</a> and get instant confirmation for every switch on your board right now.</p>
            </CTABox>
          </div>
          <RespImage>
            <Image 
              src="/mechanical_keyboard_diagnostic_hero_top_view_1774592907851.png" 
              alt="High-end mechanical keyboard with glowing RGB and diagnostic UI" 
              width={600} 
              height={450} 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </RespImage>
        </ContentGrid>

        {/* 📝 STEP BY STEP */}
        <div style={{ margin: '10rem 0' }}>
          <SectionHeading style={{ textAlign: 'center' }}>How to Use the Keyboard Test: Step-by-Step</SectionHeading>
          <ArticleText style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 5rem auto' }}>
             Testing your keyboard at <strong>mygamepadtester.com</strong> is simple. Follow these six steps to diagnose dead keys, stuck switches, and ghosting issues.
          </ArticleText>
          <ContentGrid>
            <RoadmapSteps>
              <StepItem>
                <div className="number">1</div>
                <div className="content">
                  <h4>Open & Focus</h4>
                  <p>Open the tool and click anywhere on the page to focus. The browser only captures inputs when the tab is active.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">2</div>
                <div className="content">
                  <h4>Press Any Key</h4>
                  <p>Observe the virtual layout. A healthy key will turn <strong>Dark Green</strong> immediately upon being pressed.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">3</div>
                <div className="content">
                  <h4>Check F-Keys</h4>
                  <p>Function keys (F1-F12) often require the <strong>Fn</strong> modifier. Test them both ways to ensure the signal is sending.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">4</div>
                <div className="content">
                  <h4>Watch for Yellow</h4>
                  <p>A yellow highlight indicates a **stuck key** that is sending repeating signals without being physically pressed.</p>
                </div>
              </StepItem>
            </RoadmapSteps>
            <RespImage>
               <Image 
                 src="/mechanical_keyboard_diagnostic_guide_steps_1774592846793.png" 
                 alt="Step-by-step mechanical keyboard testing infographic" 
                 width={600} 
                 height={400} 
                 style={{ width: '100%', height: 'auto', display: 'block' }}
               />
            </RespImage>
          </ContentGrid>
        </div>

        {/* 👻 GHOSTING SECTION */}
        <div style={{ margin: '8rem 0' }}>
            <SectionHeading style={{ textAlign: 'center' }}>Why Ghosting Is a Real Problem for Gamers</SectionHeading>
            <ContentGrid>
                <div className="content">
                    <SubHeading style={{ marginTop: 0 }}>Matrix Limits</SubHeading>
                    <ArticleText>
                      Most keyboards use a grid matrix. When you hold three or more keys that form a rectangle pattern, the controller can drop a key. This is called **Ghosting**.
                    </ArticleText>
                    <ArticleText>
                      Hold **W + A + Shift + Space** in our tool. If one key doesn't light up, your keyboard is ghosting. This can get you killed in FPS games when movement stops mid-jump.
                    </ArticleText>
                    <ArticleText>
                      If your ghosting looks fine but inputs still feel slow, you should <Link href="/input-lag-test" style={{ color: Theme.accent, fontWeight: 700 }}>test your input lag</Link> to measure actual hardware latency.
                    </ArticleText>
                </div>
                <RespImage>
                    <Image 
                      src="/keyboard_ghosting_vs_nkro_comparison_1774592793751.png" 
                      alt="Side-by-side comparison of Keyboard Ghosting vs NKRO" 
                      width={600} 
                      height={400} 
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </RespImage>
            </ContentGrid>
        </div>

        {/* 📊 FEATURE HIGHLIGHTS */}
        <SectionHeading style={{ textAlign: 'center' }}>Key Features of the Keyboard Tester</SectionHeading>

        {/* 📋 6KRO vs NKRO TABLE */}
        <div style={{ maxWidth: '800px', margin: '0 auto 4rem auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.05rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `3px solid ${Theme.primary}` }}>
                <th style={{ padding: '1rem', fontWeight: 800, color: '#111827' }}>Feature</th>
                <th style={{ padding: '1rem', fontWeight: 800, color: '#111827' }}>6KRO</th>
                <th style={{ padding: '1rem', fontWeight: 800, color: '#111827' }}>NKRO</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Simultaneous Keys</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>6 max</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Unlimited</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Typical Keyboards</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Most budget / office boards</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Most mechanical gaming boards</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Gaming Impact</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Can ghost on 4+ key combos</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Every key registers independently</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Connection</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>USB HID limit</td>
                <td style={{ padding: '1rem', color: '#4b5563' }}>USB or PS/2 passthrough</td>
              </tr>
            </tbody>
          </table>
        </div>
        <FeatureGrid>
          <FeatureCard>
            <span className="icon">🛑</span>
            <h4>Stuck Key Detection</h4>
            <p>Immediate visual color-coding for switches that are repeating or hardware-locked in the firing position.</p>
            <Image 
              src="/keyboard_switch_chatter_log_chart_1774592822605.png" 
              alt="Keyboard Switch Chatter Signal Log" 
              width={300} 
              height={200} 
              style={{ width: '100%', height: 'auto', marginTop: '1.5rem', borderRadius: '12px' }}
            />
          </FeatureCard>
          <FeatureCard>
            <span className="icon">🎮</span>
            <h4>Polling Rate Benchmark</h4>
            <div style={{ marginBottom: '1.5rem' }}>
              <p>Monitor your <strong>Input Latency</strong> and <strong>Polling Rates</strong> to ensure zero-lag gaming performance.</p>
            </div>
            <Image 
              src="/keyboard_polling_latency_chart_1774592771042.png" 
              alt="Keyboard Polling Rate Latency Comparison" 
              width={300} 
              height={200} 
              style={{ width: '100%', height: 'auto', borderRadius: '12px' }} 
            />
          </FeatureCard>
          <FeatureCard>
            <span className="icon">🛡️</span>
            <h4>Matrix Visualizer</h4>
            <p>Hold multiple keys simultaneously to verify N-Key Rollover (NKRO) and ghosting limits.</p>
            <Image 
              src="/keyboard_nkro_matrix_diagram_1774592731200.png" 
              alt="Keyboard Scan Matrix Schematic" 
              width={300} 
              height={200} 
              style={{ width: '100%', height: 'auto', marginTop: '1.5rem', borderRadius: '12px' }}
            />
          </FeatureCard>
        </FeatureGrid>

        {/* 🛠️ FIXING SECTION */}
        <div style={{ margin: '8rem 0' }}>
            <SectionHeading style={{ textAlign: 'center' }}>How to Fix a Keyboard That Fails the Test</SectionHeading>
            <ContentGrid>
                <div className="content">
                    <SubHeading style={{ marginTop: 0 }}>Isolate the Cause</SubHeading>
                    <ArticleText>
                      If it's a mechanical board, check for debris with compressed air or follow a guide from <a href="https://www.cherrymx.de/en/service/cleaning-maintenance.html" target="_blank" rel="noopener noreferrer" style={{ color: Theme.primary, textDecoration: 'underline' }}>Cherry MX</a> for proper cleaning and maintenance of mechanical switches. 
                    </ArticleText>
                    <ArticleText>
                      For software issues, expand <strong>Keyboards</strong> in Device Manager, uninstall the driver, and restart. Windows will reinstall the standard HID driver automatically.
                    </ArticleText>
                    <CTABox>
                      <p>Console gamer too? Make sure to <Link href="/deadzone-test" style={{ color: Theme.primary, textDecoration: 'underline' }}>check your controller's deadzone</Link> to optimize your full peripheral setup.</p>
                    </CTABox>
                </div>
                <RespImage>
                    <Image 
                      src="/mechanical_keyboard_switch_cross_section_1774592752930.png" 
                      alt="Cross-section diagram of a mechanical keyboard switch" 
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
             Competitive gamers, typists, programmers, and hardware managers use this tool to verify hardware health. It's the standard for checking new keyboard baselines or testing used equipment before purchase.
          </ArticleText>
        </div>
      </SectionContainer>

      {/* ❓ FAQ SECTION */}
      <FAQSection>
        <SectionContainer>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '5rem' }}>
              <span style={{ fontSize: '4rem' }}>❓</span>
              <SectionHeading style={{ margin: 0 }}>Keyboard Test FAQ</SectionHeading>
          </div>
          
          <div style={{ maxWidth: '950px', margin: '0 auto' }}>
            {[
              {
                q: "Does the keyboard test work with mechanical and membrane keyboards?",
                a: "Yes. The tool reads standard browser keyboard events, which are sent by every keyboard regardless of internal switch technology. Mechanical boards will generally perform better on simultaneous 'Ghosting' tests."
              },
              {
                q: "Why aren't my F1-F12 keys lighting up?",
                a: "Some keys are intercepted at the OS-level (like Print Screen or Windows Key). For F-keys, try holding the 'Fn' button. If they don't light up but perform their function, they are working correctly."
              },
              {
                q: "What does it mean if a key stays yellow?",
                a: "A yellow key is a 'Stuck Key'—it is sending repeating signals without being physically pressed. This usually points to debris in the switch or a mechanical failure requiring cleaning or replacement."
              },
              {
                q: "How do I test for keyboard ghosting?",
                a: "Hold multiple keys at once (e.g., W+A+Shift+Space). Check the 'Pressed now' counter. If you are holding 4 keys but only 3 are showing, your keyboard has hit its ghosting limit."
              },
              {
                q: "What is the difference between 6KRO and NKRO?",
                a: "6KRO means you can press 6 keys at once. NKRO (N-Key Rollover) means every key on the board can register independently with no limit. Most gaming boards are NKRO."
              },
              {
                q: "Is my typing data saved or sent anywhere?",
                a: "No. All processing happens client-side in your browser. No data is ever uploaded to a server or saved in history. Privacy is 100% guaranteed."
              },
              {
                q: "My key registers in the test but not in my game. Why?",
                a: "This means your hardware is perfectly healthy! The problem is likely an in-game keybind conflict or a 'Steam Input' remapping issue. Check your game settings and disable keybind-modifying extensions."
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
          <h3>Verify Every Keystroke.</h3>
          <p>Don't let a dead switch get you killed in-game. Run the test above and verify every key on your board right now.</p>
          <button onClick={scrollToTop}>Start Keyboard Test</button>
        </ToolCTA>
      </SectionContainer>
      
      {/* 🧭 GLOBAL SITE NAVIGATION (NO ORPHAN PAGES) */}
      <RelatedTools currentPath="/keyboard-test" />
    </StyledMainPageWrapper>
  );
}
