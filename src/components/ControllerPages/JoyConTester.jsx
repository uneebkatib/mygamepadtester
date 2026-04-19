'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import PageSEO from '../SEO/PageSEO';
import Main from '../Main/Main';
import Link from "next/link";
import Image from 'next/image';
import RelatedTools from '../RelatedTools/RelatedTools';



// ============================================================================
// STYLED COMPONENTS (ORANGE THEME - MATCHING HOMEPAGE)
// ============================================================================

const StyledMainPageWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  contain: layout style;
  background: #fff;
`;

const SaaSHero = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(180deg, #fff8f6 0%, #fff 100%);
  border-bottom: 1px solid #ffeadd;
  margin-bottom: 3rem;
`;

const ClarityHeadline = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  
  span {
    background: linear-gradient(90deg, #DA7756 0%, #ff9f7c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ClaritySubtext = styled.p`
  font-size: clamp(1.1rem, 3vw, 1.25rem);
  color: #555;
  max-width: 800px;
  margin: 0 auto 2rem auto;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #DA7756;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(218, 119, 86, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(218, 119, 86, 0.4);
    background: #c56a4a;
  }
`;

const TrustSignalRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    color: #DA7756;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const MicroHook = styled.p`
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: #DA7756;
  font-weight: 600;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionHeading = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin: 4rem 0 2rem 0;
  letter-spacing: -0.01em;
`;

const SaaSFeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const SaaSFeatureCard = styled.div`
  background: #fff;
  border: 1px solid #ffeadd;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(218, 119, 86, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(218, 119, 86, 0.15);
    border-color: #DA7756;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: rgba(218, 119, 86, 0.1);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #DA7756;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #111;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  margin: 0;
`;

const WhyMatterBox = styled.div`
  background: #fff5f2;
  border: 1px solid #ffeadd;
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: "🎮";
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 8rem;
    opacity: 0.1;
    transform: rotate(15deg);
  }
`;

const QuickAnswerBox = styled.div`
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border: 2px solid #4caf50;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  
  h3 {
    color: #2e7d32;
    margin-top: 0;
    font-size: 1.3rem;
  }
  
  p {
    color: #1b5e20;
    font-size: 1.1rem;
    margin: 0;
    
    strong {
      color: #2e7d32;
    }
  }
`;

const StepProcess = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  counter-reset: step-counter;
`;

const StepItem = styled.div`
  position: relative;
  padding-left: 1rem;
  
  &::before {
    counter-increment: step-counter;
    content: counter(step-counter);
    position: absolute;
    left: -1rem;
    top: -1rem;
    font-size: 4rem;
    font-weight: 900;
    color: #fff5f2;
    z-index: -1;
    text-shadow: 1px 1px 0 #DA7756;
  }
`;

const ScreenshotContainer = styled.div`
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid #eaeaea;
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const SupportColumn = styled.div`
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 2rem;
`;

const ListTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #fff5f2;
  color: #374151;
`;

const CleanList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f9fafb;
    color: #4b5563;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const Accordion = styled.div`
  border: 1px solid #ffeadd;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #fff;
`;

const AccordionHeader = styled.button`
  width: 100%;
  text-align: left;
  background: ${props => props.$isOpen ? '#fff' : '#f8fafc'};
  padding: 1.5rem;
  border: none;
  border-bottom: 1px solid #e2e8f0;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.$isOpen ? '#DA7756' : '#1e293b'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background: #fff;
    color: #DA7756;
  }

  .icon {
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    color: ${props => props.$isOpen ? '#DA7756' : '#94a3b8'};
  }
`;

const AccordionContent = styled.div`
  max-height: ${props => props.$isOpen ? '2000px' : '0'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fff;
  padding: ${props => props.$isOpen ? '1.5rem' : '0 1.5rem'};
  border-bottom: ${props => props.$isOpen ? '1px solid #e2e8f0' : 'none'};

  p {
    margin: 0 0 1rem 0;
    color: #475569;
    line-height: 1.6;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const PrivacyCard = styled.div`
  background: #1a1a1a;
  color: #fff;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  margin: 4rem 0;
  
  h2 {
    color: #fff;
    margin-top: 0;
  }
  
  ul {
    text-align: left;
    max-width: 600px;
    margin: 2rem auto;
    color: #e5e7eb;
    list-style: none;
    padding: 0;
    
    li {
      padding: 0.5rem 0;
    }
  }
`;

const RelatedLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  
  a {
    padding: 0.75rem 1.5rem;
    background: #f3f4f6;
    border-radius: 50px;
    color: #374151;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    
    &:hover {
      background: #e5e7eb;
      color: #111;
    }
  }
`;

const ExternalLink = styled.a`
  color: #DA7756;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #DA7756;
    color: white;
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const DiagnosticTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8fafc;
    color: #333;
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const DecisionBox = styled.div`
  background: linear-gradient(135deg, #fff8f6 0%, #ffeadd 100%);
  border: 2px solid #DA7756;
  border-radius: 16px;
  padding: 2rem;
  margin: 3rem 0;
`;

const DecisionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(218, 119, 86, 0.2);
  
  &:last-child {
    border-bottom: none;
  }
  
  .condition {
    font-weight: 700;
    color: #DA7756;
    min-width: 180px;
  }
  
  .arrow {
    color: #888;
  }
  
  .action {
    color: #333;
  }
`;

const GlossaryBox = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
  
  h3 {
    margin-top: 0;
    color: #1a1a1a;
    font-size: 1.3rem;
  }
`;

const GlossaryItem = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  strong {
    color: #DA7756;
  }
  
  span {
    color: #555;
  }
`;

const ContentSection = styled.div`
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  
  h3 {
    color: #DA7756;
    margin-top: 0;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: #555;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const JoyConTester = () => {
  const [openSection, setOpenSection] = useState('');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledMainPageWrapper>
      <PageSEO title="Joy-Con Tester: Drift, Motion, Rumble & Input Check" />

      {/* TESTING TOOL */}
      <Main />

      {/* HERO */}
      <SaaSHero>
        <SectionContainer>
          <ClarityHeadline>
            <span>Joy-Con Stick Drift Test</span> & Diagnostic Tool
          </ClarityHeadline>
          <ClaritySubtext>
            Stop guessing why your character is moving on its own. Whether you're searching for a <strong>joycon tester</strong> or a <strong>Joy-Con drift test</strong>, this professional-grade diagnostic detects micro-drift, dead buttons, and sensor failure instantly.
          </ClaritySubtext>

          <CTAButton onClick={scrollToTop}>
            Start Joy-Con Audit
          </CTAButton>

          {/* TRUST SIGNALS */}
          <TrustSignalRow>
            <TrustItem><span>✓</span> Works in browser</TrustItem>
            <TrustItem><span>✓</span> No installation required</TrustItem>
            <TrustItem><span>✓</span> No Nintendo account needed</TrustItem>
            <TrustItem><span>✓</span> No data stored</TrustItem>
          </TrustSignalRow>

          <MicroHook>👉 Press any button on your Joy-Con to start testing.</MicroHook>
        </SectionContainer>
      </SaaSHero>

      <SectionContainer>

        {/* QUICK ANSWER BOX - PAA SNIPPET TARGET */}
        <QuickAnswerBox>
          <h2>✅ Does This Tool Detect Joy-Con Drift?</h2>
          <p><strong>Yes.</strong> Leave the stick untouched and watch the neutral values. If they exceed <strong>0.10</strong>, you have confirmed drift. Values between 0.05-0.10 indicate early wear that should be monitored. For official warranty evidence, any sustained reading over <strong>0.14</strong> is considered a hardware failure.</p>
        </QuickAnswerBox>

        <ContentSection>
          <h3>How to Claim Nintendo Warranty for Joy-Con Drift</h3>
          <p>
            Nintendo currently offers a free repair program for Joy-Con drift in North America, the EEA, and the UK, even if your console is outside the standard 1-year warranty. To start your claim, you need documented evidence that the hardware is failing.
          </p>
          <p>
            When you run this test, if your axis values sit consistently above <strong>0.14</strong>, take a screenshot of the results. This number is the industry standard for confirmed drift. You can visit the <ExternalLink href="https://support.nintendo.com" target="_blank" rel="noopener noreferrer">Nintendo Support site</ExternalLink> to open a "Joy-Con Repair" ticket. Mention that you have diagnostic data showing a sustained neutral offset above 0.14 to speed up your approval process.
          </p>
        </ContentSection>

        {/* SUPPORTED MODELS */}
        <SectionHeading>Supported Joy-Con Models</SectionHeading>
        <SupportGrid>
          <SupportColumn>
            <ListTitle>Official Nintendo</ListTitle>
            <CleanList>
              <li>Left Joy-Con (Standard)</li>
              <li>Right Joy-Con (Standard)</li>
              <li>Joy-Con Paired via Switch</li>
              <li>Bluetooth Connection</li>
            </CleanList>
          </SupportColumn>
          <SupportColumn>
            <ListTitle>Third-Party & Modes</ListTitle>
            <CleanList>
              <li>Hori Joy-Cons</li>
              <li>PowerA Controllers</li>
              <li>8BitDo (Switch Mode)</li>
              <li>Split Joy-Con Mode</li>
              <li>Single Joy-Con Detection</li>
            </CleanList>
          </SupportColumn>
        </SupportGrid>

        {/* WHY JOY-CONS NEED TESTING */}
        <WhyMatterBox>
          <h2 style={{ marginTop: 0, color: '#DA7756' }}>🎮 Why Your Joy-Cons Feel "Off"</h2>
          <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.6' }}>
            Nothing ruins a session of <em>The Legend of Zelda: Tears of the Kingdom</em> like a camera that won't stop spinning. Nintendo Switch Joy-Cons use compact carbon-track potentiometers that are notorious for wearing down faster than traditional controllers. This physical wear creates "micro-drift"—electrical noise that registers as movement even when you aren't touching the stick.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.6', marginTop: '1rem' }}>
            Beyond stick issues, the internal flex cables for the SL/SR shoulder buttons are prone to crimping, and the internal gyroscope can lose its factory calibration over time, affecting your gyro-aim in <em>Splatoon 3</em>. Our diagnostic audit reveals these hidden hardware faults so you can choose between a simple cleaning fix or an official Nintendo warranty claim.
          </p>
        </WhyMatterBox>

        {/* HOW TO TEST */}
        <SectionHeading>How to Test Your Joy-Con Controller</SectionHeading>
        <StepProcess>
          <StepItem>
            <CardTitle>Connect Joy-Con</CardTitle>
            <CardText>USB adapter or Bluetooth.</CardText>
          </StepItem>
          <StepItem>
            <CardTitle>Press any button</CardTitle>
            <CardText>Auto-detects left or right.</CardText>
          </StepItem>
          <StepItem>
            <CardTitle>Move sticks</CardTitle>
            <CardText>Check drift and dead zones.</CardText>
          </StepItem>
          <StepItem>
            <CardTitle>Test triggers</CardTitle>
            <CardText>L/R, ZL/ZR, SL/SR buttons.</CardText>
          </StepItem>
          <StepItem>
            <CardTitle>Test motion</CardTitle>
            <CardText>Tilt and rotate for gyro.</CardText>
          </StepItem>
          <StepItem>
            <CardTitle>Test HD Rumble</CardTitle>
            <CardText>Vibration motors check.</CardText>
          </StepItem>
          <StepItem>
            <CardTitle>Review latency</CardTitle>
            <CardText>Polling rate and delay.</CardText>
          </StepItem>
        </StepProcess>

        <ScreenshotContainer>
          <Image
            src="/screenshots/gamepad-tester-interface.png"
            alt="Joy-Con controller tester interface showing button presses and stick values"
            width={1200}
            height={600}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </ScreenshotContainer>

        {/* REAL-TIME DIAGNOSTIC SECTIONS */}
        <SectionHeading>Real-Time Diagnostic Modules</SectionHeading>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'buttons'} onClick={() => toggleSection('buttons')}>
            Button Test (A/B/X/Y, L/R/ZL/ZR, SL/SR)
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'buttons'}>
            <p><strong>Checks:</strong> A, B, X, Y, L, R, ZL, ZR, (+), (−), Home, Capture, SL, SR</p>
            <p><strong>Displays:</strong> Live actuation, timing response (ms), ghost input detection</p>
            <p>Ghost inputs (presses without touching) indicate contaminated button contacts.</p>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'sticks'} onClick={() => toggleSection('sticks')}>
            Analog Stick Test (Drift + Dead Zones)
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'sticks'}>
            <p><strong>Monitors:</strong> X/Y axis values, neutral stability, return-to-center accuracy</p>
            <DiagnosticTable>
              <thead>
                <tr><th>Condition</th><th>Value</th><th>Meaning</th></tr>
              </thead>
              <tbody>
                <tr><td>Excellent</td><td>0.00 to 0.02</td><td>Like-new condition</td></tr>
                <tr><td>Normal Wear</td><td>0.02 to 0.05</td><td>Normal, keep monitoring</td></tr>
                <tr><td>Early Drift</td><td>0.05 to 0.10</td><td>Starting to wear</td></tr>
                <tr><td>Drift Confirmed</td><td>Above 0.10</td><td>Repair or replace</td></tr>
              </tbody>
            </DiagnosticTable>
            <p><strong>Left Joy-Con Note:</strong> The left stick is more prone to drift due to higher usage in most games.</p>
            <ScreenshotContainer>
              <Image
                src="/screenshots/dead-zone-visualizer.png"
                alt="Joy-Con stick drift detection visualization"
                width={1200}
                height={400}
                style={{ width: '100%', height: 'auto' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </ScreenshotContainer>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'triggers'} onClick={() => toggleSection('triggers')}>
            Trigger Test (L/R/ZL/ZR)
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'triggers'}>
            <p>Joy-Con triggers are digital (not analog). The tool checks:</p>
            <p>• Full press detection<br />• Skipped or stuck presses<br />• Accidental double-presses (bounce)</p>
            <ScreenshotContainer>
              <Image
                src="/screenshots/trigger-test.png"
                alt="Joy-Con trigger test for L, R, ZL, ZR buttons"
                width={1200}
                height={400}
                style={{ width: '100%', height: 'auto' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </ScreenshotContainer>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'motion'} onClick={() => toggleSection('motion')}>
            Motion/Gyro Sensor Test
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'motion'}>
            <p><strong>Tests:</strong> Gyroscope (rotation), accelerometer (tilt), combined motion</p>
            <p><strong>Games that use Joy-Con motion:</strong></p>
            <p>• Splatoon 3 gyro aiming<br />• Mario Kart 8 Deluxe tilt steering<br />• Zelda: Tears of the Kingdom bow aiming<br />• 1-2-Switch motion games<br />• Ring Fit Adventure</p>
            <p>Flat lines when tilting = sensor failure. Erratic jumps = needs recalibration.</p>
            <ScreenshotContainer>
              <Image
                src="/screenshots/connection-quality.png"
                alt="Joy-Con motion sensor gyroscope test"
                width={1200}
                height={400}
                style={{ width: '100%', height: 'auto' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </ScreenshotContainer>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'vibration'} onClick={() => toggleSection('vibration')}>
            HD Rumble / Vibration Test (LRA Actuators)
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'vibration'}>
            <p><strong>Testing:</strong> Linear Resonant Actuator (LRA) response and HD Rumble fidelity.</p>
            <p>Unlike standard generic rumble, Joy-Cons use precision LRA motors to create "HD Rumble." This tool allows you to trigger both motors to check for mechanical buzzing, rattling, or complete motor failure.</p>
            <p><em>Note: HD Rumble fidelity is highest via USB connection on Chrome or Edge browsers.</em></p>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'latency'} onClick={() => toggleSection('latency')}>
            Input Latency & Polling Rate
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'latency'}>
            <DiagnosticTable>
              <thead>
                <tr><th>Latency</th><th>Condition</th></tr>
              </thead>
              <tbody>
                <tr><td>Under 10ms</td><td>Competitive-ready</td></tr>
                <tr><td>10-20ms</td><td>Acceptable</td></tr>
                <tr><td>Above 20ms</td><td>Noticeable lag</td></tr>
              </tbody>
            </DiagnosticTable>
            <p>USB typically gives 4-8ms latency. Bluetooth adds 8-16ms.</p>
            <ScreenshotContainer>
              <Image
                src="/screenshots/input-lag-result.png"
                alt="Joy-Con input latency test results"
                width={1200}
                height={400}
                style={{ width: '100%', height: 'auto' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </ScreenshotContainer>
          </AccordionContent>
        </Accordion>

        {/* JOY-CON VS SWITCH PRO COMPARISON */}
        <SectionHeading>Joy-Con vs Switch Pro Controller Comparison</SectionHeading>
        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Joy-Con</th>
              <th>Switch Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Drift Risk</td><td>High</td><td>Medium</td></tr>
            <tr><td>Motion Sensors</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>HD Rumble</td><td>Yes</td><td>Yes</td></tr>
            <tr><td>Stick Durability</td><td>Lower</td><td>Higher</td></tr>
            <tr><td>Battery Life</td><td>20 hours</td><td>40 hours</td></tr>
            <tr><td>Latency (Bluetooth)</td><td>8-16ms</td><td>8-16ms</td></tr>
            <tr><td>Repair Cost (DIY)</td><td>$8</td><td>$10</td></tr>
            <tr><td>Best For</td><td>Handheld, motion games</td><td>Pro gaming, long sessions</td></tr>
          </tbody>
        </ComparisonTable>
        <p style={{ textAlign: 'center', color: '#666', marginTop: '-1rem' }}>
          Joy-Cons are essential for handheld mode. Switch Pro is better for competitive play.
        </p>

        {/* SEO CONTENT CLUSTERS */}

        {/* DRIFT TEST CLUSTER */}
        <ContentSection>
          <h3>🕹️ Joy-Con Drift Test (Online)</h3>
          <p><strong>How to test Joy-Con drift online:</strong></p>
          <p>1. Connect your Joy-Con via Bluetooth or USB adapter<br />
            2. Don't touch the analog stick<br />
            3. Watch the X/Y values in the tool<br />
            4. Values above 0.05 = early drift<br />
            5. Values above 0.10 = confirmed drift</p>
          <p><strong>Left vs Right:</strong> Left Joy-Cons drift more often because the left stick handles movement in most games, leading to faster wear.</p>
          <p><strong>Testing tip:</strong> Test both Joy-Cons separately. Pair one at a time to isolate which controller has the issue.</p>
        </ContentSection>

        {/* CALIBRATION CLUSTER */}
        <ContentSection>
          <h3>⚙️ Joy-Con Calibration vs Testing</h3>
          <DiagnosticTable>
            <thead>
              <tr><th>Aspect</th><th>Calibration</th><th>Testing</th></tr>
            </thead>
            <tbody>
              <tr><td>Purpose</td><td>Adjust dead zones & center</td><td>Diagnose problems</td></tr>
              <tr><td>Location</td><td>Switch Settings</td><td>This online tool</td></tr>
              <tr><td>Fixes Drift?</td><td>Sometimes (temporary)</td><td>No, but detects it</td></tr>
              <tr><td>When to Use</td><td>After repair</td><td>Before buying/selling</td></tr>
            </tbody>
          </DiagnosticTable>
          <p>Calibration can mask drift temporarily but doesn't fix hardware wear. If calibration doesn't help, the stick module needs replacement.</p>
          <p><strong>How to calibrate:</strong> Switch Settings → Controllers and Sensors → Calibrate Control Sticks</p>
        </ContentSection>

        {/* REPAIR OPTIONS CLUSTER */}
        <ContentSection>
          <h3>🔧 Joy-Con Repair Options</h3>
          <p><strong>Option 1: Nintendo Official Repair</strong><br />
            Cost: $40-50 USD per Joy-Con | Time: 2-3 weeks | Includes 3-month warranty</p>
          <p><strong>Option 2: DIY Stick Replacement</strong><br />
            Cost: $8-15 USD for module | Time: 20-30 minutes | YouTube tutorials available</p>
          <p><strong>Option 3: Third-Party Repair Shop</strong><br />
            Cost: $25-35 USD | Time: Same day to 1 week</p>
          <p><strong>Option 4: New Joy-Cons</strong><br />
            Cost: $79.99 USD (pair) | Best for severely damaged units</p>
          <p><strong>Pro Tip:</strong> Hall effect stick modules ($12-20) resist drift longer than standard replacements.</p>
        </ContentSection>

        {/* DRIFT SYMPTOMS CLUSTER */}
        <ContentSection>
          <h3>⚠️ Joy-Con Drift Symptoms</h3>
          <p><strong>How to know if your Joy-Con has drift:</strong></p>
          <p>• Character moves without touching the stick<br />
            • Camera slowly rotates on its own<br />
            • Menu selections scroll by themselves<br />
            • Aim wanders in shooters like Splatoon<br />
            • Inconsistent movement in platformers<br />
            • Neutral stick values above 0.05 in testing</p>
          <p><strong>Early warning signs:</strong> Occasional unwanted movement, stick feels "loose" compared to new, need to push harder for full range.</p>
        </ContentSection>

        {/* DRIFT CAUSES CLUSTER */}
        <ContentSection>
          <h3>❓ Joy-Con Drift Causes</h3>
          <p><strong>Why do Joy-Cons drift?</strong></p>
          <p>1. <strong>Potentiometer Wear</strong> - Contact points inside the stick wear down with use<br />
            2. <strong>Dust & Debris</strong> - Particles get under the stick cap and interfere with sensors<br />
            3. <strong>Design Flaw</strong> - Nintendo used drift-prone components with small tolerances<br />
            4. <strong>Usage Patterns</strong> - Left sticks drift faster (constant movement input)<br />
            5. <strong>Age</strong> - Most Joy-Cons develop drift after 12-24 months</p>
          <p><strong>Prevention tips:</strong> Clean around stick base with compressed air monthly. Store Joy-Cons in a case. Avoid eating near your Switch.</p>
        </ContentSection>

        {/* FAILURE SYMPTOMS TABLE */}
        <SectionHeading>Joy-Con Failure Symptoms & Fixes</SectionHeading>
        <ComparisonTable>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Cause</th>
              <th>Fix</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Stick drift</td><td>Potentiometer wear</td><td>Clean or replace module</td></tr>
            <tr><td>Button non-response</td><td>Debris / flex cable</td><td>Clean or reconnect</td></tr>
            <tr><td>HD Rumble dead</td><td>Motor failure</td><td>USB mode or replace</td></tr>
            <tr><td>Motion not working</td><td>Gyro misalignment</td><td>Recalibrate or repair</td></tr>
            <tr><td>Input lag &gt; 20ms</td><td>Bluetooth interference</td><td>Use USB or move closer</td></tr>
            <tr><td>Random disconnects</td><td>Low battery</td><td>Charge fully</td></tr>
          </tbody>
        </ComparisonTable>

        {/* DECISION GUIDE */}
        <SectionHeading>What Your Results Mean - Quick Fix Guide</SectionHeading>
        <DecisionBox>
          <DecisionItem>
            <span className="condition">🕹️ Drift &gt; 0.10</span>
            <span className="arrow">→</span>
            <span className="action">Replace stick module ($8-15) or use Nintendo repair</span>
          </DecisionItem>
          <DecisionItem>
            <span className="condition">📐 Gyro flatlines</span>
            <span className="arrow">→</span>
            <span className="action">Sensor failure - professional repair needed</span>
          </DecisionItem>
          <DecisionItem>
            <span className="condition">📳 No vibration</span>
            <span className="arrow">→</span>
            <span className="action">Try USB first, then consider motor replacement</span>
          </DecisionItem>
          <DecisionItem>
            <span className="condition">⚡ Latency &gt; 20ms</span>
            <span className="arrow">→</span>
            <span className="action">Switch to USB, reduce wireless interference</span>
          </DecisionItem>
          <DecisionItem>
            <span className="condition">👻 Ghost inputs</span>
            <span className="arrow">→</span>
            <span className="action">Clean button contacts with isopropyl alcohol</span>
          </DecisionItem>
        </DecisionBox>

        {/* BROWSER SUPPORT */}
        <SectionHeading>Joy-Con Browser & Platform Support</SectionHeading>
        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>USB</th>
              <th>Bluetooth</th>
              <th>Chrome</th>
              <th>Edge</th>
              <th>Firefox</th>
              <th>Safari</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Buttons</td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td>⚠️</td></tr>
            <tr><td>Sticks</td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td>⚠️</td></tr>
            <tr><td>Motion</td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td>⚠️</td><td>❌</td></tr>
            <tr><td>HD Rumble</td><td>✔</td><td>⚠️</td><td>✔</td><td>✔</td><td>❌</td><td>❌</td></tr>
            <tr><td>Triggers</td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td>⚠️</td><td>❌</td></tr>
          </tbody>
        </ComparisonTable>

        {/* GLOSSARY */}
        <GlossaryBox>
          <h3>📖 Quick Definitions</h3>
          <GlossaryItem>
            <strong>Drift:</strong> <span>When your stick registers movement without you touching it.</span>
          </GlossaryItem>
          <GlossaryItem>
            <strong>Polling Rate:</strong> <span>How often the controller sends input data (Hz).</span>
          </GlossaryItem>
          <GlossaryItem>
            <strong>HD Rumble:</strong> <span>Nintendo's precision haptic feedback technology.</span>
          </GlossaryItem>
          <GlossaryItem>
            <strong>Gyroscope:</strong> <span>Sensor that detects controller rotation for motion aiming.</span>
          </GlossaryItem>
          <GlossaryItem>
            <strong>Hall Effect:</strong> <span>Magnetic sensor technology that resists drift longer.</span>
          </GlossaryItem>
        </GlossaryBox>

        {/* PRIVACY */}
        <PrivacyCard>
          <h2>Privacy & Data Handling</h2>
          <ul>
            <li>🔒 Inputs processed locally in browser</li>
            <li>🔒 No data uploads to any server</li>
            <li>🔒 No cookies or telemetry</li>
            <li>🔒 Uses standard Web Gamepad API</li>
          </ul>
        </PrivacyCard>

        {/* USE CASES */}
        <SectionHeading>When to Use a Joy-Con Tester</SectionHeading>
        <SaaSFeatureGrid>
          <SaaSFeatureCard>
            <IconWrapper>🏆</IconWrapper>
            <CardTitle>Pre-Tournament</CardTitle>
            <CardText>Ensure no drift or lag.</CardText>
          </SaaSFeatureCard>
          <SaaSFeatureCard>
            <IconWrapper>🛒</IconWrapper>
            <CardTitle>Buying Used</CardTitle>
            <CardText>Verify before paying.</CardText>
          </SaaSFeatureCard>
          <SaaSFeatureCard>
            <IconWrapper>🔧</IconWrapper>
            <CardTitle>After Repairs</CardTitle>
            <CardText>Confirm fix worked.</CardText>
          </SaaSFeatureCard>
          <SaaSFeatureCard>
            <IconWrapper>💰</IconWrapper>
            <CardTitle>Selling</CardTitle>
            <CardText>Show proof to buyer.</CardText>
          </SaaSFeatureCard>
          <SaaSFeatureCard>
            <IconWrapper>📶</IconWrapper>
            <CardTitle>Bluetooth Issues</CardTitle>
            <CardText>Detect interference.</CardText>
          </SaaSFeatureCard>
          <SaaSFeatureCard>
            <IconWrapper>🎯</IconWrapper>
            <CardTitle>Competitive Gaming</CardTitle>
            <CardText>Verify gyro accuracy.</CardText>
          </SaaSFeatureCard>
        </SaaSFeatureGrid>

        {/* FAQS */}
        <SectionHeading>Joy-Con Tester FAQs</SectionHeading>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'faq-1'} onClick={() => toggleSection('faq-1')}>
            Can I test for drift?
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'faq-1'}>
            <p>Yes. Watch neutral stick values. Above 0.10 without touching = drift confirmed.</p>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'faq-2'} onClick={() => toggleSection('faq-2')}>
            Does it detect gyro aiming?
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'faq-2'}>
            <p>Yes. Tilt your Joy-Con and watch motion sensor readings update in real-time.</p>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'faq-3'} onClick={() => toggleSection('faq-3')}>
            Does USB or Bluetooth matter?
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'faq-3'}>
            <p>USB is faster with better vibration. Bluetooth is convenient but adds latency.</p>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'faq-4'} onClick={() => toggleSection('faq-4')}>
            Can I test third-party controllers?
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'faq-4'}>
            <p>Works with Hori, PowerA, and 8BitDo in Switch mode. Results vary by model.</p>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'faq-5'} onClick={() => toggleSection('faq-5')}>
            Why is my left Joy-Con drifting more than right?
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'faq-5'}>
            <p>Left sticks get more use (movement in most games). This accelerates wear.</p>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'faq-6'} onClick={() => toggleSection('faq-6')}>
            Can I use this on Switch console?
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'faq-6'}>
            <p>No. The Switch browser doesn't support the Gamepad API.</p>
          </AccordionContent>
        </Accordion>

        {/* HELPFUL RESOURCES */}
        <SectionHeading>Helpful Resources</SectionHeading>
        <SupportGrid>
          <SupportColumn>
            <ListTitle>Official Support</ListTitle>
            <CleanList>
              <li><ExternalLink href="https://en-americas-support.nintendo.com/app/answers/detail/a_id/22724" target="_blank" rel="noopener noreferrer">Nintendo Joy-Con Support</ExternalLink></li>
              <li><ExternalLink href="https://www.nintendo.com/us/switch/" target="_blank" rel="noopener noreferrer">Nintendo Switch Official</ExternalLink></li>
            </CleanList>
          </SupportColumn>
          <SupportColumn>
            <ListTitle>Technical References</ListTitle>
            <CleanList>
              <li><ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API" target="_blank" rel="noopener noreferrer">MDN Gamepad API</ExternalLink></li>
              <li><ExternalLink href="https://www.ifixit.com/Device/Joy-Con" target="_blank" rel="noopener noreferrer">iFixit Joy-Con Repair Guides</ExternalLink></li>
            </CleanList>
          </SupportColumn>
        </SupportGrid>

        {/* RELATED TOOLS */}
        <RelatedTools currentPath="/joycon-tester" />

        {/* FINAL CTA */}
        <div style={{ textAlign: 'center', margin: '4rem 0 2rem 0' }}>
          <h2 style={{ fontSize: '2rem', color: '#1a1a1a', marginBottom: '1rem' }}>Is Your Joy-Con Ready for Action?</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Detailed diagnostics take 30 seconds and can save you from a frustrated $80 replacement.</p>
          <CTAButton onClick={scrollToTop}>
            👉 Start Free Joy-Con Diagnostic
          </CTAButton>
        </div>

      </SectionContainer>
    </StyledMainPageWrapper>
  );
};

export default JoyConTester;

