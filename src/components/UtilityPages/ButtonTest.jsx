'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from "next/link";
import Image from 'next/image';
import ButtonTester from '../Tools/ButtonTester';
import RelatedTools from '../RelatedTools/RelatedTools';

// ============================================================================
// STYLED COMPONENTS (PREMIUM ORANGE THEME)
// ============================================================================

const StyledMainPageWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
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
  gap: 3rem;
  align-items: center;
  margin: 2.5rem 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SectionHeading = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.1rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
  line-height: 1.2;
`;

const SubHeading = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #DA7756;
  margin: 2.5rem 0 1rem 0;
`;

const ArticleText = styled.p`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const CTABox = styled.div`
  background: linear-gradient(135deg, #fff5f2 0%, #fff 100%);
  border-left: 4px solid #DA7756;
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 12px 12px 0;
  
  p {
    margin: 0;
    color: #1a1a1a;
    font-weight: 500;
    font-size: 1.05rem;
    
    a {
      color: #DA7756;
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
  margin: 3rem 0;
`;

const FeatureCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #DA7756;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    display: block;
  }

  h4 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  p {
    color: #666;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

const RoadmapSteps = styled.div`
  margin: 3rem 0;
`;

const StepItem = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  .number {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    background: #DA7756;
    color: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: 800;
    box-shadow: 0 6px 12px rgba(218, 119, 86, 0.2);
  }

  .content {
    h4 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #1a1a1a;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin: 0;
    }
  }
`;

const RespImage = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
  background: #fdfdfd;
  max-width: 550px;
  max-height: 450px;
  margin: 0 auto;
  width: 100%;
`;

const FAQSection = styled.div`
  margin: 6rem 0;
  background: #fdfdfd;
  padding: 4rem 0;
`;

const AccordionItem = styled.div`
  margin-bottom: 1rem;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #eee;
  background: #fff;
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 1.5rem 2rem;
  text-align: left;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fafafa;
    color: #DA7756;
  }

  .icon {
    font-size: 1.4rem;
    color: #DA7756;
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const AccordionContent = styled.div`
  padding: ${props => props.$isOpen ? '0 2rem 1.5rem 2rem' : '0'};
  max-height: ${props => props.$isOpen ? '800px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  color: #666;
  line-height: 1.7;
`;

const ToolCTA = styled.div`
  background: #1a1a1a;
  color: white;
  padding: 2.5rem;
  border-radius: 24px;
  text-align: center;
  margin: 4rem 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  p {
    font-size: 1.1rem;
    color: #ccc;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  a {
    display: inline-block;
    background: #DA7756;
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(218, 119, 86, 0.4);
    }
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ButtonTest() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <StyledMainPageWrapper>
            {/* 🚀 INTERACTIVE TOOL (TOP OF PAGE) */}
            <ButtonTester />

            <SectionContainer>
                {/* 🏆 INTRO SECTION */}
                <ContentGrid>
                    <div className="content">
                        <SectionHeading>Controller Button Test – Detect Stuck, Dead & Unresponsive Buttons</SectionHeading>
                        <ArticleText>
                            You press jump and nothing happens. Or your character fires without you touching the trigger. Or a bumper feels fine physically but the game ignores it completely. A controller button test tells you which input is the problem and whether it's fixable in software or needs a hardware repair.
                        </ArticleText>
                        <ArticleText>
                            Every time you press an input, this diagnostic reads the raw signal from your hardware. It identifies whether the switch is dead, sticky (slow release), or suffering from "bounce" (double-registering). You get a clear visual pass/fail report for every single button, including bumpers, D-pad directions, and the often-ignored L3/R3 stick clicks.
                        </ArticleText>
                        <CTABox>
                            <p>Scroll up to the <a href="#test" onClick={scrollToTop}>Button Tester</a> and verify your controller health right now — every input is checked and color-coded in real time.</p>
                        </CTABox>
                    </div>
                    <RespImage>
                        <Image
                            src="/images/button-test/ui-mockup.png"
                            alt="Controller button tester interface showing real-time button registration on a PS5 DualSense controller"
                            width={800}
                            height={500}
                            style={{ width: '100%', height: 'auto' }}
                            priority
                        />
                    </RespImage>
                </ContentGrid>

                {/* ⚙️ HOW IT WORKS */}
                <div style={{ margin: '4rem 0' }}>
                    <SectionHeading style={{ textAlign: 'center' }}>How the Controller Button Tester Works</SectionHeading>
                    <ArticleText style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
                        The tool runs entirely inside your browser using the <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API" target="_blank" rel="noopener noreferrer">HTML5 Gamepad API</ExternalLink>, which reads raw input states directly from your hardware for zero-delay diagnostics.
                    </ArticleText>

                    <FeatureGrid>
                        <FeatureCard>
                            <span className="icon">📡</span>
                            <h4>Client-Side Processing</h4>
                            <p>All processing happens locally on your device. Nothing is uploaded to any server, ensuring total privacy and near-instant response times.</p>
                        </FeatureCard>
                        <FeatureCard>
                            <span className="icon">🎮</span>
                            <h4>Cross-Protocol Support</h4>
                            <p>Supported across USB and Bluetooth for XInput (Xbox) and HID/DirectInput (PlayStation/Generic) hardware protocols.</p>
                        </FeatureCard>
                        <FeatureCard>
                            <span className="icon">⏱️</span>
                            <h4>High Polling Rate</h4>
                            <p>The tool matches your display's refresh rate (typically 60Hz or higher) to catch input problems that standard software might miss.</p>
                        </FeatureCard>
                    </FeatureGrid>
                </div>

                {/* 📝 STEP BY STEP */}
                <div style={{ margin: '6rem 0' }}>
                    <SectionHeading>How to Use the Controller Button Tester: Step-by-Step</SectionHeading>
                    <ContentGrid>
                        <RoadmapSteps>
                            <StepItem>
                                <div className="number">1</div>
                                <div className="content">
                                    <h4>Connect Your Controller</h4>
                                    <p>Plug in via USB or pair via Bluetooth. A wired connection is recommended for initial baseline testing.</p>
                                </div>
                            </StepItem>
                            <StepItem>
                                <div className="number">2</div>
                                <div className="content">
                                    <h4>Open and Allow Access</h4>
                                    <p>Open the tool page and click 'Allow' if prompted. Press any button to wake the controller for the browser.</p>
                                </div>
                            </StepItem>
                            <StepItem>
                                <div className="number">3</div>
                                <div className="content">
                                    <h4>Perform Full Input Pass</h4>
                                    <p>Press every button, trigger, and D-pad direction one by one. Move sticks in full circles to verify absolute range.</p>
                                </div>
                            </StepItem>
                            <StepItem>
                                <div className="number">4</div>
                                <div className="content">
                                    <h4>Review Registration Results</h4>
                                    <p>Watch for the visual highlight. You can <Link href="/button-test" style={{ color: '#DA7756', fontWeight: 700 }}>run your button test</Link> as many times as needed to confirm findings.</p>
                                </div>
                            </StepItem>
                        </RoadmapSteps>
                        <RespImage>
                            <Image
                                src="/images/button-test/steps-infographic.png"
                                alt="Step by step infographic showing how to use a controller button tester in five steps"
                                width={800}
                                height={600}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </RespImage>
                    </ContentGrid>
                    <CTABox style={{ textAlign: 'center', borderLeft: 'none', borderTop: '4px solid #DA7756' }}>
                        <p>Once your controller is connected and detected, the entire test takes under two minutes. Use the free <Link href="/button-test">Controller Button Tester</Link> now.</p>
                    </CTABox>
                </div>

                {/* ✨ KEY FEATURES */}
                <div style={{ margin: '4rem 0' }}>
                    <SectionHeading style={{ textAlign: 'center' }}>Key Features for Precision Testing</SectionHeading>
                    <FeatureGrid>
                        <FeatureCard>
                            <h4>Real-Time Visual Feedback</h4>
                            <p>Every button highlights as you press it, showing response time in milliseconds. If it turns orange or red, the tool flags exactly why.</p>
                        </FeatureCard>
                        <FeatureCard>
                            <h4>Multiple Test Modes</h4>
                            <p>Diagnostic Mode for routine checks, Rapid Fire for bounce, and Endurance Mode for intermittent faults during long sessions.</p>
                        </FeatureCard>
                        <FeatureCard>
                            <h4>Export Detailed Logs</h4>
                            <p>Save results as CSV or JSON with timestamped rows. Perfect for tracking degradation or submitting warranty claims.</p>
                        </FeatureCard>
                    </FeatureGrid>
                </div>

                {/* 📊 RESULTS EXPLAINED */}
                <ContentGrid>
                    <RespImage>
                        <Image
                            src="/images/button-test/results-diagram.png"
                            alt="Controller button tester results showing green orange and red button states for passed sticky and failed inputs"
                            width={800}
                            height={500}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </RespImage>
                    <div className="content">
                        <SectionHeading>Diagnostic Results Explained</SectionHeading>
                        <ThresholdTable>
                            <thead>
                                <tr>
                                    <th>Signal State</th>
                                    <th>Physical Meaning</th>
                                    <th>Required Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Green: Pass</strong></td>
                                    <td>Clean registration with no bounce or timing delay.</td>
                                    <td>Excellent condition. No action needed.</td>
                                </tr>
                                <tr>
                                    <td><strong>Orange: Sticky</strong></td>
                                    <td>The button is slow to release or registers twice (bounce).</td>
                                    <td>Cleaning with compressed air or 90% ISO usually fix this.</td>
                                </tr>
                                <tr>
                                    <td><strong>Red: Failed</strong></td>
                                    <td>The button does not register at all or flickers erratically.</td>
                                    <td>Hardware failure. Membrane or circuit trace needs repair.</td>
                                </tr>
                            </tbody>
                        </ThresholdTable>
                    </div>
                </ContentGrid>

                {/* 👥 WHO IS IT FOR */}
                <div style={{ margin: '6rem 0' }}>
                    <SectionHeading>Who Should Use This Tool</SectionHeading>
                    <ArticleText>
                        Casual gamers can verify if a 'sticky' feeling is real before buying a replacement. Competitive players use it to ensure tournament-ready performance. Repair shops use export logs to document service success.
                    </ArticleText>
                    <ArticleText>
                        If you are buying a used controller, <Link href="/" style={{ color: '#DA7756', fontWeight: 700 }}>run a full gamepad diagnostic</Link> to catch hidden defects before paying. For tech enthusiasts, the millisecond data provides perfect benchmarking for different brand response times.
                    </ArticleText>
                </div>

                {/* 🎮 RAW FEEDBACK vs IN-GAME */}
                <ContentGrid>
                    <div className="content">
                        <SectionHeading>Why Button Testing Beats Guessing In-Game</SectionHeading>
                        <ArticleText>
                            Games use input smoothing and anti-bounce filters that mask mechanical problems. Hardware can be failing while the game compensates, leading to unpredictable missed inputs in critical matches.
                        </ArticleText>
                        <ArticleText>
                            By bypassing these filters, you can <Link href="/button-test" style={{ color: '#DA7756', fontWeight: 700 }}>check your button inputs directly</Link> to isolate whether an issue is hardware-side, driver-related, or hidden in game settings.
                        </ArticleText>
                    </div>
                    <RespImage>
                        <Image
                            src="/images/button-test/internals.png"
                            alt="Disassembled game controller showing internal silicone dome pads and carbon contact pads that commonly cause button failures"
                            width={800}
                            height={500}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </RespImage>
                </ContentGrid>

                {/* 🛠️ COMMON REASONS & TIPS */}
                <SectionHeading>Common Reasons Buttons Stop Working</SectionHeading>
                <ArticleText>
                    Dust and sweat buildup account for over 50% of button failures. According to forum insights from <strong>gpadtester.net</strong> and <strong>gamespadtester.com</strong>, basic contamination is the primary driver of unresponsive inputs. Over time, <ExternalLink href="https://www.ifixit.com/Guide/Xbox+One+Controller+Repair/" target="_blank" rel="noopener noreferrer">how controller components wear over time</ExternalLink> leads to carbon pad degradation or silicone dome fatigue. Simple cleaning with compressed air fixes roughly 40% of cases instantly.
                </ArticleText>
                <ArticleText>
                    Always start with a wired connection. Close apps like Steam Big Picture that might claim exclusive input access. If button issues persist, <Link href="/stick-drift-test" style={{ color: '#DA7756', fontWeight: 700 }}>test your sticks for drift separately</Link> to get a complete health report for your gamepad.
                </ArticleText>

            </SectionContainer>

            {/* ❓ FAQ SECTION */}
            <FAQSection>
                <SectionContainer>
                    <SectionHeading style={{ textAlign: 'center', marginBottom: '4rem' }}>Frequently Asked Questions</SectionHeading>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {[
                            {
                                q: "Does the Controller Button Tester work with wireless controllers?",
                                a: "Yes. Pair your controller via Bluetooth in OS settings before opening the tool. A wired USB connection is recommended for the most accurate timing data."
                            },
                            {
                                q: "Which controller brands are supported?",
                                a: "Any HID-compliant device. This includes Xbox Series/One, PS5 DualSense, PS4 DualShock 4, Nintendo Switch Pro, 8BitDo, and generic 3rd-party gamepads."
                            },
                            {
                                q: "Do I need to download anything to use this tool?",
                                a: "No. The Entire test runs in your browser. No software to install, no registration, and no account required."
                            },
                            {
                                q: "Why does the tester show a failed button but my games work fine?",
                                a: "Games have built-in smoothing that masks hardware-level noise. The tester reveals raw signals, giving you a warning before the issue becomes a total failure."
                            },
                            {
                                q: "How do I test triggers with the button tester?",
                                a: "Triggers report analog values from 0.0 to 1.0. As you squeeze, watch the value ramp up smoothly. If it jumps or flickers, the potentiometer is worn."
                            },
                            {
                                q: "Can I test multiple controllers at the same time?",
                                a: "Yes. The tool can detect up to four simultaneous controllers, making it perfect for repair shops or local multiplayer groups."
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
                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <RespImage style={{ maxWidth: '600px' }}>
                            <Image
                                src="/images/button-test/faq-image.png"
                                alt="Wired and wireless controllers connected simultaneously to a laptop running an online controller button tester"
                                width={800}
                                height={500}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </RespImage>
                    </div>
                </SectionContainer>
            </FAQSection>
            <SectionContainer>
                <ToolCTA>
                    <h3>Ready for a Precision Check?</h3>
                    <p>Don't guess whether your buttons are working. Get raw data and visual proof in under two minutes with our free online tool.</p>
                    <button onClick={scrollToTop} style={{ background: '#DA7756', color: 'white', padding: '1rem 3rem', borderRadius: '50px', border: 'none', fontWeight: 800, fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(218, 119, 86, 0.3)' }}>
                        Start Button Test
                    </button>
                </ToolCTA>
            </SectionContainer>
            
            {/* 🧭 GLOBAL SITE NAVIGATION (NO ORPHAN PAGES) */}
            <RelatedTools currentPath="/button-test" />
        </StyledMainPageWrapper>
    );
}

const ExternalLink = styled.a`
  color: #DA7756;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;

  &:hover {
    border-bottom-color: #DA7756;
  }
`;
