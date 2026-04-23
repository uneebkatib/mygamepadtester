'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from "next/link";
import Image from 'next/image';
import CalibrationTool from '../Tools/CalibrationTool';
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
  margin: 4rem 0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SectionHeading = styled.h2`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
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

const StatusList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 3rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatusBox = styled.div`
  padding: 2rem;
  border-radius: 20px;
  background: ${props => props.$type === 'success' ? '#f0faf0' : '#fff5f5'};
  border: 2px solid ${props => props.$type === 'success' ? '#c3e6cb' : '#feb2b2'};

  h4 {
    color: ${props => props.$type === 'success' ? '#2e7d32' : '#c53030'};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      position: relative;
      color: ${props => props.$type === 'success' ? '#1b5e20' : '#9b2c2c'};
      font-size: 0.95rem;
      line-height: 1.4;

      &::before {
        content: '${props => props.$type === 'success' ? '✓' : '✗'}';
        position: absolute;
        left: 0;
        font-weight: bold;
      }
    }
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
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  color: #666;
  line-height: 1.7;
`;

const RespImage = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border: 1px solid #f0f0f0;
  background: #f9f9f9;
`;

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

const CleanList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 1rem;
    color: #444;
    font-size: 1.05rem;
    line-height: 1.6;
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function JoystickCalibration() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledMainPageWrapper>
      {/* 🚀 INTERACTIVE CALIBRATION TOOL (PRIMARY ACTION) */}
      <CalibrationTool />

      <SectionContainer>
        {/* 📋 INTRO SECTION */}
        <ContentGrid>
          <div className="content">
            <SectionHeading>Joystick Calibration – Fix Controller Stick Offset & Drift Online</SectionHeading>
            <ArticleText>
              Over time, the sensors inside a thumbstick shift due to wear, dust, and heavy use. When that happens, the controller stops reporting a true neutral position, and you get unwanted movement even when your hands are still. Joystick calibration resets your stick's center point, range, and accuracy so the controller reports correct X-axis and Y-axis values.
            </ArticleText>
            <ArticleText>
              This tool samples where your sticks sit naturally at rest, overwrites the factory offset values, and restores accurate input across the full range of motion. Whether you search for joystick calibration or stick calibrator, the process is the same: measure, correct, verify.
            </ArticleText>
            <CTABox>
              <p>Calibration is the first free fix to try before assuming you have permanent hardware drift. Scroll up to the <a href="#test" onClick={scrollToTop}>Calibration Tool</a> and get a clear reading right now.</p>
            </CTABox>
          </div>
          <RespImage>
            <Image
              src="/images/joystick-calibration/ui-mockup.webp"
              alt="Joystick calibration browser tool showing live X Y axis readouts for left and right analog sticks"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </RespImage>
        </ContentGrid>

        <ToolCTA>
          <h3>Skip the guesswork and get a clear reading immediately.</h3>
          <p>Use the free Joystick Calibration tool and see your stick values in real time, no download needed.</p>
          <button onClick={scrollToTop} style={{ background: '#DA7756', color: 'white', padding: '1rem 2.5rem', borderRadius: '50px', border: 'none', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>
            Start Calibration Now
          </button>
        </ToolCTA>

        {/* 📏 METRICS SECTION (Moved earlier for better contextual transition) */}
        <ContentGrid>
          <RespImage>
            <Image
              src="/images/joystick-calibration/deadzone-diagram.webp"
              alt="Analog stick deadzone diagram showing inner deadzone ring outer deadzone ring and center calibration point"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
            />
          </RespImage>
          <div className="content">
            <SectionHeading>Center Point, Range, and Deadzone Explained</SectionHeading>
            <ArticleText>
              The center point is what the controller reports when you are not touching the stick. Calibration corrects this value directly. The range describes how far the stick travels from center to edge, and a properly calibrated stick should reach full output before hitting the physical end stop.
            </ArticleText>
            <ArticleText>
              The <strong>inner deadzone</strong> is the area around the center where small movements are ignored entirely. Getting the calibration right at the source means you don't have to keep increasing your in-game deadzone settings to stop your camera from spinning.
            </ArticleText>
            <CTABox>
              <p>Learn more about <ExternalLink href="https://www.scufgaming.com/us/en/gaming/products/scuf-products/controller-calibration-dead-zones-and-stick-drift-explained/" target="_blank" rel="noopener noreferrer">how calibration and dead zones work together</ExternalLink> in this detailed guide from SCUF Gaming.</p>
            </CTABox>
          </div>
        </ContentGrid>

        {/* ⚙️ HOW IT WORKS */}
        <div style={{ margin: '6rem 0' }}>
          <SectionHeading style={{ textAlign: 'center' }}>How Joystick Calibration Works</SectionHeading>
          <ArticleText style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            The calibration process works in three stages: measure, overwrite, and verify. First, the tool reads the resting position of your stick and records the current X and Y values.
          </ArticleText>

          <FeatureGrid>
            <FeatureCard>
              <span className="icon">📐</span>
              <h4>Record Center Point</h4>
              <p>The tool recalculates what the center should be and writes corrected default values to bypass minor sensor drift.</p>
            </FeatureCard>
            <FeatureCard>
              <span className="icon">🔄</span>
              <h4>Map Full Range</h4>
              <p>You move the stick in circles to map the complete direction and range of travel in each cardinal and diagonal direction.</p>
            </FeatureCard>
            <FeatureCard>
              <span className="icon">💾</span>
              <h4>Firmware Update</h4>
              <p>For wired connections, these values are often stored at the firmware level, meaning the fix persists across devices.</p>
            </FeatureCard>
          </FeatureGrid>
        </div>

        {/* 📝 STEP BY STEP */}
        <div style={{ margin: '6rem 0' }}>
          <SectionHeading>How to Use the Joystick Calibration Tool: Step-by-Step</SectionHeading>
          <ContentGrid>
            <RoadmapSteps>
              <StepItem>
                <div className="number">1</div>
                <div className="content">
                  <h4>Connect via USB</h4>
                  <p>A wired connection is required to write corrected values. Bluetooth can read sticks but often blocks writing.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">2</div>
                <div className="content">
                  <h4>Open in Chrome or Edge</h4>
                  <p>Chromium-based browsers provide the most reliable Gamepad API support for calibration.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">3</div>
                <div className="content">
                  <h4>Activate the Tool</h4>
                  <p>Press any button on the controller to wake the Gamepad API and detect your stick values.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">4</div>
                <div className="content">
                  <h4>Map Motion</h4>
                  <p>Move each stick in slow, full circles. This maps the full range of motion in every direction.</p>
                </div>
              </StepItem>
            </RoadmapSteps>
            <RespImage>
              <Image
                src="/images/joystick-calibration/steps-infographic.webp"
                alt="Step by step infographic for joystick calibration showing six steps from connecting controller to confirming calibration result"
                width={800}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              />
            </RespImage>
          </ContentGrid>
          <ArticleText style={{ textAlign: 'center' }}>
            Rather than doing this blind, you can <Link href="/joystick-calibration" style={{ color: '#DA7756', fontWeight: 700 }}>run a joystick calibration</Link> directly in your browser and see the before and after values on screen.
          </ArticleText>
        </div>

        {/* 🛑 CAN / CANNOT FIX */}
        <div style={{ margin: '6rem 0' }}>
          <SectionHeading style={{ textAlign: 'center' }}>What Joystick Calibration Can and Cannot Fix</SectionHeading>
          <StatusList>
            <StatusBox $type="success">
              <h4><span>✓</span> Calibration Can Fix</h4>
              <ul>
                <li>Minor center-offset from sensor shift</li>
                <li>Firmware-level miscalibration</li>
                <li>Static stick drift (consistent idle value)</li>
                <li>Dust accumulation affecting neutral point</li>
              </ul>
            </StatusBox>
            <StatusBox $type="error">
              <h4><span>✗</span> Needs Hardware Repair</h4>
              <ul>
                <li>Physically worn or broken stick modules</li>
                <li>Severe, jittery vertical/horizontal drift</li>
                <li>Worn-out carbon tracks (potentiometers)</li>
                <li>Mechanical "snapping" or loose sticks</li>
              </ul>
            </StatusBox>
          </StatusList>
          <ArticleText style={{ textAlign: 'center' }}>
            Before deciding if it's broken, you should <Link href="/stick-drift-test" style={{ color: '#DA7756', fontWeight: 700 }}>test your stick drift directly</Link> to see the raw idle output after calibration.
          </ArticleText>
        </div>

        {/* 💻 WINDOWS / STEAM UI GUIDES */}
        <ContentGrid>
          <RespImage>
            <Image
              src="/images/joystick-calibration/windows-guide.webp"
              alt="Windows joy.cpl game controller settings window showing how to find the joystick calibration option"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
            />
          </RespImage>
          <div className="content">
            <SectionHeading>Why Joystick Calibration Goes Wrong</SectionHeading>
            <SubHeading>The Windows Calibration Tab Is Hidden</SubHeading>
            <ArticleText>
              On Windows 10 and 11, the legacy calibration tool is still the most effective manual method. To find it:
            </ArticleText>
            <CleanList style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <li><strong>1.</strong> Press <strong>Win + R</strong> on your keyboard.</li>
                <li><strong>2.</strong> Type <code>joy.cpl</code> and press Enter.</li>
                <li><strong>3.</strong> Select your controller and click <strong>Properties &gt; Settings &gt; Calibrate</strong>.</li>
            </CleanList>
            <ArticleText>
              If the tab is missing, you likely need the specific XInput or manufacturer driver for your gamepad.
            </ArticleText>
            <SubHeading>Steam Input Overrides</SubHeading>
            <ArticleText>
              Steam has its own calibration system under Settings &gt; Controller &gt; General Controller Settings. To avoid conflicts, ensure your game's individual controller layout is set to "Default" deadzone behavior rather than custom values.
            </ArticleText>
          </div>
        </ContentGrid>
      </SectionContainer>

      {/* ❓ FAQ SECTION */}
      <FAQSection>
        <SectionContainer>
          <SectionHeading style={{ textAlign: 'center', marginBottom: '4rem' }}>Frequently Asked Questions</SectionHeading>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {[
              {
                q: "Does the Joystick Calibration tool work without downloading anything?",
                a: "Yes. The tool runs entirely in your browser using the HTML5 Gamepad API. Open it in Chrome or Edge, connect your controller via USB, and the tool detects it automatically. No installer, driver package, or account is required."
              },
              {
                q: "Will calibrating my joystick fix stick drift?",
                a: "It depends on the cause. If drift comes from a minor center offset caused by sensor shift or dust, calibration can correct it fully. If the joystick module is physically worn, calibration may be a temporary workaround. You can test your stick drift directly to see if the issue is correctable."
              },
              {
                q: "Can I calibrate a PS5 DualSense or PS4 DualShock in the browser?",
                a: "Checking real-time values works via Bluetooth or USB. However, firmware-level center calibration for these controllers typically requires a USB connection. Make sure to update your controller firmware via official apps first."
              },
              {
                q: "How often should I calibrate my joystick?",
                a: "Only when you notice inconsistency. Frequent calibration doesn't improve a healthy controller, but it's essential after repairs or when buying a used gamepad."
              },
              {
                q: "My calibration looks correct in the tool but drift still happens in games. Why?",
                a: "This is usually a Steam Input or game-level override. Check the game's internal settings for a built-in deadzone and ensure Steam is set to 'Default' deadzone behavior for that specific title."
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
        <div style={{ textAlign: 'center', margin: '4rem 0' }}>
          <SectionHeading>Ready to Get Precision Back?</SectionHeading>
          <ArticleText>
            Join thousands of gamers who use MyGamepadTester to keep their gear in peak condition.
            After calibrating, don't forget to <Link href="/button-test" style={{ color: '#DA7756', fontWeight: 700 }}>test every button on your controller</Link> to ensure everything is game-ready.
          </ArticleText>
          <button onClick={scrollToTop} style={{ background: '#DA7756', color: 'white', padding: '1rem 3rem', borderRadius: '50px', border: 'none', fontWeight: 800, fontSize: '1.2rem', cursor: 'pointer', marginTop: '2rem', boxShadow: '0 10px 20px rgba(218, 119, 86, 0.3)' }}>
            Start Free Calibration
          </button>
        </div>
      </SectionContainer>
      
      {/* 🧭 GLOBAL SITE NAVIGATION (NO ORPHAN PAGES) */}
      <RelatedTools currentPath="/joystick-calibration" />
    </StyledMainPageWrapper>
  );
}
