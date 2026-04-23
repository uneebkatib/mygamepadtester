'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from "next/link";
import Image from 'next/image';
import StickDriftTester from '../Tools/StickDriftTester';
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
  gap: 4rem;
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
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
  margin: 4rem 0;
`;

const StepItem = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  .number {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    background: #DA7756;
    color: white;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 800;
    box-shadow: 0 8px 16px rgba(218, 119, 86, 0.2);
  }

  .content {
    h4 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #1a1a1a;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin: 0;
    }
  }
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

const AccordionHeader = styled.button`
  width: 100%;
  padding: 1.5rem 2rem;
  text-align: left;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #fafafa;
    color: #DA7756;
  }

  .icon {
    font-size: 1.5rem;
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

const RespImage = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
  background: #fdfdfd;
  max-width: 500px;
  max-height: 400px;
  margin: 0 auto;
  width: 100%;
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

export default function StickDriftTest() {
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
            <StickDriftTester />

            <SectionContainer>
                {/* 🏆 INTRO SECTION */}
                <ContentGrid>
                    <div className="content">
                        <SectionHeading>Stick Drift Test – Detect PS5, Xbox & Switch Controller Drift Free</SectionHeading>
                        <ArticleText>
                            Stick drift is one of the most frustrating controller problems a gamer can deal with. Your character walks forward on its own, the camera rotates without input, or your menus keep scrolling while you're trying to play. A stick drift test shows you exactly what your analog stick is doing when you're not touching it.
                        </ArticleText>
                        <ArticleText>
                            This diagnostic tool reads the live X/Y axis values from your analog joystick while it sits at rest. A healthy stick rests at or near (0, 0) when you are not touching it. When a stick drifts, the tool registers a non-zero offset, meaning the system thinks the stick is being pushed even though it is not. Those small offset values are what cause ghost input and unwanted in-game movement.
                        </ArticleText>
                        <ArticleText>
                            The tool connects to your controller through the built-in Gamepad API, pulling live data the moment a gamepad is recognized. Everything runs locally on your device, ensuring your results are private and instant.
                        </ArticleText>
                        <CTABox>
                            <p>If your character is walking on its own or your camera keeps drifting in one direction, this test reveals exactly how bad the drift is and what threshold you need to set to fix it.</p>
                            <p style={{ marginTop: '1rem' }}>Want to check your controller? Use the <a href="#test" onClick={scrollToTop}>Stick Drift Test</a> and see your X/Y readings right now.</p>
                        </CTABox>
                    </div>
                    <RespImage>
                        <Image
                            src="/images/stick-drift-test/ui-mockup.webp"
                            alt="Stick drift test tool showing an analog stick offset in a browser window with live X Y axis data"
                            width={800}
                            height={500}
                            style={{ width: '100%', height: 'auto' }}
                            priority
                        />
                    </RespImage>
                </ContentGrid>

                {/* ⚙️ HOW IT HAPPENS */}
                <div style={{ margin: '6rem 0' }}>
                    <SectionHeading style={{ textAlign: 'center' }}>How Stick Drift Happens</SectionHeading>
                    <ArticleText style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                        Stick drift does not appear randomly. It comes from specific physical or electrical problems inside the controller. Understanding the cause helps you decide whether cleaning, recalibration, or a full hardware repair is the right next step.
                    </ArticleText>

                    <FeatureGrid>
                        <FeatureCard>
                            <span className="icon">⚙️</span>
                            <h4>Mechanical Wear</h4>
                            <p>Physical components inside the stick module wear down over time, creating uneven resistance and inconsistent readings.</p>
                        </FeatureCard>
                        <FeatureCard>
                            <span className="icon">🧹</span>
                            <h4>Contamination</h4>
                            <p>Dust, debris, and oxidation settle on the internal sensor tracks, causing the controller to misread the stick position.</p>
                        </FeatureCard>
                        <FeatureCard>
                            <span className="icon">⚡</span>
                            <h4>Sensor Failure</h4>
                            <p>When the potentiometer tracks are damaged, the electrical signal fluctuates, leading to twitchy or constant ghost movement.</p>
                        </FeatureCard>
                    </FeatureGrid>
                </div>

                {/* 🔬 INTERNALS SECTION */}
                <ContentGrid>
                    <RespImage>
                        <Image
                            src="/images/stick-drift-test/internals-diagram.webp"
                            alt="Technical diagram of analog stick internals showing potentiometer track wear which is a common cause of stick drift"
                            width={800}
                            height={500}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </RespImage>
                    <div className="content">
                        <SubHeading>Worn Potentiometers and Hall Effect Sensors</SubHeading>
                        <ArticleText>
                            Most controllers use a potentiometer inside the analog stick to track position. The potentiometer track is a physical surface that a wiper slides across. Over time, that surface wears down, creating inconsistent readings. When the worn track skips or dips, the controller misreads the position and sends a false offset.
                        </ArticleText>
                        <ArticleText>
                            <strong>Hall effect sensors</strong> use magnets instead of physical contact, so there is no surface to wear down. Controllers built with hall effect magnets are far less prone to drift over time. If your controller has a potentiometer and drift is recurring, a repair-shop replacement or a hall-effect upgrade is a permanent fix.
                        </ArticleText>
                        <SubHeading>Dust, Debris, and Oxidation</SubHeading>
                        <ArticleText>
                            Dust inside the housing settles around the stick base and shifts sensor readings. For minor drift, blowing compressed air or using 90% isopropyl alcohol with a qtip can dissolve residue. Move the stick through its full range to work the cleaner in, then let it dry fully before powering back on.
                        </ArticleText>
                    </div>
                </ContentGrid>

                {/* 📊 SEVERITY CHART */}
                <div style={{ margin: '6rem 0' }}>
                    <SectionHeading style={{ textAlign: 'center' }}>Reading Your Results: What the Numbers Mean</SectionHeading>
                    <ArticleText style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                        The tool measures drift as a percentage offset from perfect center. A reading of 0% is a theoretical ideal, not something you should expect from every controller in daily use.
                    </ArticleText>
                    <RespImage style={{ maxWidth: '550px', margin: '0 auto' }}>
                        <Image
                            src="/images/stick-drift-test/severity-chart.webp"
                            alt="Stick drift severity chart showing healthy status under 1 percent normal under 5 percent and critical ranges over 10 percent"
                            width={1000}
                            height={400}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </RespImage>
                    <ThresholdTable>
                        <thead>
                            <tr>
                                <th>Drift Percentage</th>
                                <th>Condition</th>
                                <th>Impact on Gameplay</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Under 1%</strong></td>
                                <td>Excellent</td>
                                <td>Perfect center. No action needed. Typical of new or Hall Effect controllers.</td>
                            </tr>
                            <tr>
                                <td><strong>1% to 5%</strong></td>
                                <td>Normal</td>
                                <td>Standard wear. Most in-game deadzones mask this automatically.</td>
                            </tr>
                            <tr>
                                <td><strong>5% to 10%</strong></td>
                                <td>Watch Zone</td>
                                <td>Noticeable in competitive games. Requires small deadzone adjustment.</td>
                            </tr>
                            <tr>
                                <td><strong>Over 10%</strong></td>
                                <td>Critical</td>
                                <td>Drift will interfere with character/camera movement at standard settings.</td>
                            </tr>
                        </tbody>
                    </ThresholdTable>
                </div>

                {/* 📝 STEP BY STEP */}
                <div style={{ margin: '6rem 0' }}>
                    <SectionHeading>How to Use the Stick Drift Test online: Step-by-Step</SectionHeading>
                    <ContentGrid>
                        <RoadmapSteps>
                            <StepItem>
                                <div className="number">1</div>
                                <div className="content">
                                    <h4>Connect & Press Any Button</h4>
                                    <p>Plug in via USB or pair via Bluetooth. Press any button to wake the controller inside your browser.</p>
                                </div>
                            </StepItem>
                            <StepItem>
                                <div className="number">2</div>
                                <div className="content">
                                    <h4>Navigate to MyGamepadTester</h4>
                                    <p>Maintain focus on the browser tab to ensure the Gamepad API provides continuous live data.</p>
                                </div>
                            </StepItem>
                            <StepItem>
                                <div className="number">3</div>
                                <div className="content">
                                    <h4>Verify Live Input</h4>
                                    <p>Move both sticks once to confirm the crosshair responds instantly. If it doesn't move, restart your browser.</p>
                                </div>
                            </StepItem>
                            <StepItem>
                                <div className="number">4</div>
                                <div className="content">
                                    <h4>Rest Hands-Off</h4>
                                    <p>Release both sticks and let them sit naturally. Observe the X/Y readings for at least 20-30 seconds.</p>
                                </div>
                            </StepItem>
                        </RoadmapSteps>
                        <RespImage>
                            <Image
                                src="/images/stick-drift-test/steps-infographic.webp"
                                alt="Step by step infographic for running a stick drift test online visiting mygamepadtester.com and verifying controller results"
                                width={800}
                                height={600}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </RespImage>
                    </ContentGrid>
                    <p style={{ textAlign: 'center', fontSize: '1.1rem' }}>
                        Ready to check your controller? You can <Link href="/stick-drift-test" style={{ color: '#DA7756', fontWeight: 700 }}>run the stick drift test online</Link> right now without installing anything.
                    </p>
                </div>

                {/* 🧩 TROUBLESHOOTING SECTION */}
                <SectionHeading>Why Your Controller Drifts in Games but Passes the Test</SectionHeading>
                <ArticleText>
                    Temperature plays a role. Stick drift often becomes more pronounced as components heat up during sessions. If you test a cold controller, the readings might look fine. Test again after 30 minutes of gameplay. Signal noise from Bluetooth interference can also mimic drift.
                </ArticleText>
                <ArticleText>
                    Some drift only shows up in-game because the game amplifies raw axis values. A small 3% offset that passes under generic thresholds might still move your camera in high-sensitivity games. If you want to check all of your controller's inputs at the same time, you can <Link href="/" style={{ color: '#DA7756', fontWeight: 700 }}>run a full controller diagnostic</Link> with our primary tool.
                </ArticleText>

                {/* 👥 USE CASES */}
                <div style={{ margin: '6rem 0' }}>
                    <ContentGrid>
                        <div className="content">
                            <SectionHeading>Who Should Run This Test</SectionHeading>
                            <ArticleText>
                                Repair shops use this test to document controller condition before and after service. Technicians can use the logs to price jobs accurately and provide proof of repair to customers.
                            </ArticleText>
                            <ArticleText>
                                Gamers in competitive play (Fortnite, COD, Rocket League) benefit from testing before ranked sessions. Even minor drift can cost you accuracy. Anyone buying a used controller should run this test before paying. If you want to go further, you can also <Link href="/button-test" style={{ color: '#DA7756', fontWeight: 700 }}>test every button for registration issues</Link> to verify the entire controller.
                            </ArticleText>
                        </div>
                        <RespImage>
                            <Image
                                src="/images/stick-drift-test/usecases.webp"
                                alt="Three use cases for stick drift test including gamers repair technicians and checking used controllers before purchase"
                                width={800}
                                height={500}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </RespImage>
                    </ContentGrid>
                </div>

                {/* 🛠️ QUICK FIXES */}
                <SectionHeading>Quick Fixes to Try After Your Test</SectionHeading>
                <FeatureGrid>
                    <FeatureCard>
                        <h4>1. Clean with Alcohol</h4>
                        <p>Use 90%+ isopropyl alcohol on a q-tip to clean the stick base and evaporate gunk.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <h4>2. Recalibrate OS Settings</h4>
                        <p>Use Windows calibration or in-game deadzones to reset the reported center position.</p>
                    </FeatureCard>
                    <FeatureCard>
                        <h4>3. Check Warranty</h4>
                        <p>Before buying a new one, check <ExternalLink href="https://support.xbox.com/en-US/help/hardware-network/controller/controller-repair-and-warranty" target="_blank" rel="noopener noreferrer">Xbox</ExternalLink> or <ExternalLink href="https://en-americas-support.nintendo.com/app/answers/detail/a_id/22882/~/how-to-troubleshoot-joy-con-control-sticks" target="_blank" rel="noopener noreferrer">Nintendo's official support</ExternalLink> for free repairs.</p>
                    </FeatureCard>
                </FeatureGrid>
                <ArticleText style={{ textAlign: 'center' }}>
                    For hardware-level fixes, check <ExternalLink href="https://www.ifixit.com/Device/Game_Console_Controller" target="_blank" rel="noopener noreferrer">iFixit's controller teardown guides</ExternalLink> to learn how to replace modules yourself.
                </ArticleText>

            </SectionContainer>

            {/* ❓ FAQ SECTION */}
            <FAQSection>
                <SectionContainer>
                    <SectionHeading style={{ textAlign: 'center', marginBottom: '4rem' }}>Frequently Asked Questions</SectionHeading>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {[
                            {
                                q: "Does this test work with wireless controllers?",
                                a: "Yes, the Stick Drift Test works with both wired and wireless controllers. For the most accurate results, use a wired connection to eliminate Bluetooth signal noise."
                            },
                            {
                                q: "What does a healthy X/Y reading look like?",
                                a: "A healthy stick stays close to (0,0) at rest. Readings under 1% are excellent; 1-5% is normal for used controllers."
                            },
                            {
                                q: "Can the stick drift test fix my controller?",
                                a: "No, it is a diagnostic tool. Fixing require cleaning, software recalibration, or replacing physical hardware parts."
                            },
                            {
                                q: "Does it work on mobile?",
                                a: "Yes, it works in mobile browsers like Chrome or Edge if your phone supports OTG or Bluetooth gamepads."
                            },
                            {
                                q: "Why does my controller show drift only in games, not in the test?",
                                a: "Games often amplify inputs more than raw diagnostic tools, or the controller components heat up and drift more during actual gameplay."
                            },
                            {
                                q: "Is my data sent to any server?",
                                a: "No. All processing is client-side in your browser. Your input data stays entirely on your machine."
                            },
                            {
                                q: "What browsers work best with the stick drift test?",
                                a: "Google Chrome and Microsoft Edge provide the best Gamepad API support and are recommended."
                            },
                            {
                                q: "Can I use this to check a used controller before buying?",
                                a: "Absolutely. It's one of the best ways to verify you aren't buying a degraded gamepad."
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
          <h3>Don't Let Drift Ruin Your Rank.</h3>
          <p>The first step to fixing drift is knowing exactly how bad it is. Use the free diagnostic above to measure your exact offset.</p>
          <button onClick={scrollToTop} style={{ background: '#DA7756', color: 'white', padding: '1rem 3rem', borderRadius: '50px', border: 'none', fontWeight: 800, fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(218, 119, 86, 0.3)' }}>
            Start Stick Drift Test
          </button>
        </ToolCTA>
      </SectionContainer>
      
      {/* 🧭 GLOBAL SITE NAVIGATION (NO ORPHAN PAGES) */}
      <RelatedTools currentPath="/stick-drift-test" />
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
