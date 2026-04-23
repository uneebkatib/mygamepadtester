'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from "next/link";
import VibrationTesterTool from '@/components/Tools/VibrationTesterTool';
import Script from 'next/script';
import Image from 'next/image';
import RelatedTools from '@/components/RelatedTools/RelatedTools';



// ============================================================================
// STYLED COMPONENTS (ORANGE THEME - MATCHING HOMEPAGE)
// ============================================================================

const StyledMainPageWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
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
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background: #fff;
  border: 1px solid #ffeadd;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;

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
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const SupportColumn = styled.div`
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 1.5rem;
`;

const ListTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #fff5f2;
  color: #374151;
`;

const CleanList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: 0.4rem 0;
    border-bottom: 1px solid #f9fafb;
    color: #4b5563;
    font-size: 0.95rem;

    &:last-child {
      border-bottom: none;
    }
    
    a {
      color: #DA7756;
      text-decoration: none;
      font-weight: 600;
      
      &:hover {
        text-decoration: underline;
      }
    }
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
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: #555;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
`;

const TerminologyBox = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #DA7756;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  
  h3 {
    color: #DA7756;
    margin: 0 0 1rem 0;
  }
  
  .term-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .term-item {
    background: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    
    strong {
      color: #DA7756;
    }
  }
`;

const UseCaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const UseCaseCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  
  .icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  .content {
    h4 {
      color: #1a1a1a;
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
    }
    
    p {
      color: #6b7280;
      margin: 0;
      font-size: 0.9rem;
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
  font-size: 1.1rem;
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
  }
`;

const AccordionContent = styled.div`
  max-height: ${props => props.$isOpen ? '2000px' : '0'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fff;
  padding: ${props => props.$isOpen ? '1.5rem' : '0 1.5rem'};

  p {
    margin: 0 0 1rem 0;
    color: #475569;
    line-height: 1.6;
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

const CTABox = styled.div`
  background: linear-gradient(135deg, #fff5f2 0%, #ffeadd 100%);
  border: 2px solid #DA7756;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  
  p {
    color: #333;
    margin: 0.5rem 0;
    font-size: 1.1rem;
    
    a {
      color: #DA7756;
      font-weight: 700;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ResponsiveImage = styled.div`
  width: 100%;
  max-width: ${props => props.$maxWidth || '800px'};
  margin: 2rem auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid #ffeadd;
  background: white;

  position: relative;

  img {
    width: 100% !important;
    height: auto !important;
    position: relative !important;
    display: block;
  }
  
  .caption {
    padding: 0.75rem;
    font-size: 0.85rem;
    color: #666;
    text-align: center;
    background: #fdfdfd;
    border-top: 1px solid #eee;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin: 4rem 0;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    
    &.reverse {
      direction: rtl;
      .content { direction: ltr; }
    }
  }
`;

const ProTip = styled.div`
  background: #f0fdf4;
  border-left: 4px solid #22c55e;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 8px;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #166534;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const TroubleshootingFlow = styled.div`
  background: #fffafa;
  border: 2px dashed #fecaca;
  padding: 2rem;
  border-radius: 16px;
  margin: 3rem 0;
`;

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does the Controller Vibration Tester work with wireless controllers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Connect your wireless controller via Bluetooth or its USB receiver before opening the tool, then press any button to wake the API. Both wired and wireless connections work."
      }
    },
    {
      "@type": "Question",
      "name": "Why does vibration work in games but not in the browser tool?",
      "name": "Why does vibration work in games but not in the tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This is usually a browser compatibility issue, not a hardware problem. The Gamepad API requires Chrome or Edge for reliable vibration support."
      }
    },
    {
      "@type": "Question",
      "name": "Can I test just one motor at a time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The tool has separate presets for weak motor only and strong motor only, as well as combined patterns. Testing them individually is the best way to confirm whether both motors are functioning or just one."
      }
    },
    {
      "@type": "Question",
      "name": "Does this test support PS5 DualSense haptics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. This tool can trigger the standard rumble motors on a PS5 controller. For high-definition haptic feedback and adaptive trigger resistance, ensure you are using a wired connection on a Chromium-based browser like Chrome or Edge."
      }
    }
  ]
};

// SoftwareApp Schema
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Free Controller Vibration Test",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Windows, macOS, Linux, ChromeOS",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function VibrationTestClient() {
  const [openSection, setOpenSection] = useState('');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledMainPageWrapper>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* VIBRATION TESTER TOOL */}
      <VibrationTesterTool />

      <SectionContainer>
        {/* INTRO SECTION */}
        <ContentGrid>
          <div className="content">
            <SectionHeading style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>What Is a Controller Vibration Test?</SectionHeading>
            <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.1rem' }}>
              A controller vibration test is a diagnostic tool that checks whether your gamepad's rumble motors are working correctly. You connect your controller, run the test, and instantly see whether the hardware is responding to vibration commands.
            </p>
            <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.1rem' }}>
              Vibration feedback makes games feel more immersive. When your car crashes, your character takes a hit, or you score a goal, the rumble translates that moment into something you physically feel. If that feedback has gone quiet, our diagnostics tell you exactly where the problem is.
            </p>
            <CTABox>
              <p>If your rumble has stopped or feels weaker than usual, this tool reveals whether the issue is your hardware or something else entirely. Use the free <strong>Controller Vibration Test</strong> and see your results right now.</p>
            </CTABox>
          </div>
          <ResponsiveImage>
            <Image
              src="/images/vibration-tester/ui-mockup.webp"
              alt="Official MyGamepadTester.com Vibration Tester dashboard showing connected controller status and dual-motor intensity controls"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
            <div className="caption">Real-time vibration motor status and intensity controls</div>
          </ResponsiveImage>
        </ContentGrid>

        {/* HOW IT WORKS */}
        <SectionHeading>How Controller Vibration Works</SectionHeading>
        <p style={{ textAlign: 'center', color: '#555', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
          Understanding the mechanics behind haptic feedback helps you diagnose exactly why your controller might be failing.
        </p>

        <ContentGrid className="reverse">
          <div className="content">
            <h3>The Two Motors Inside Your Gamepad</h3>
            <p style={{ color: '#555' }}>
              Most gamepads use small DC motors with an eccentric weight attached to the shaft. When the motor spins, the imbalance creates oscillation that travels through the casing and into your hands.
            </p>
            <p style={{ color: '#555' }}>
              <strong>The Strong Motor:</strong> Usually on the left, this uses a larger mass spinning slowly to produce heavy rumble for explosions or impacts.
            </p>
            <p style={{ color: '#555' }}>
              <strong>The Weak Motor:</strong> On the right, this uses a small mass spinning fast to deliver sharp, buzzy sensations for subtle details like footsteps.
            </p>
            <h3>How the Browser Sends Commands</h3>
            <p style={{ color: '#555' }}>
              The HTML5 Gamepad API exposes a <code>vibrationActuator</code>. When you press "Vibrate," the browser sends a standardized dual-rumble command with specific intensity parameters. All processing is local to your device—no data is sent to external servers.
            </p>
          </div>
          <div className="content">
            <TerminologyBox>
              <h3>📖 Platform Terminology</h3>
              <div className="term-grid">
                <div className="term-item"><strong>PlayStation:</strong> Haptics & Adaptive Triggers</div>
                <div className="term-item"><strong>Xbox:</strong> Impulse Triggers</div>
                <div className="term-item"><strong>Nintendo:</strong> HD Rumble</div>
                <div className="term-item"><strong>PC:</strong> Rumble Motors</div>
              </div>
            </TerminologyBox>
            <p style={{ fontSize: '0.9rem', color: '#777' }}>Source: <a href="https://www.w3.org/TR/gamepad/" style={{ color: '#DA7756' }}>W3C Gamepad API Specification</a></p>
          </div>
        </ContentGrid>

        {/* STEP BY STEP */}
        <SectionHeading>How to Use the Vibration Tester: Step-by-Step</SectionHeading>
        <ContentGrid>
          <div className="content">
            <CleanList style={{ fontSize: '1.1rem' }}>
              <li style={{ marginBottom: '1.5rem' }}><strong>1. Connect:</strong> Plug in via USB or connect via Bluetooth. USB provides the most reliable power delivery.</li>
              <li style={{ marginBottom: '1.5rem' }}><strong>2. Open:</strong> Use a Chromium-based browser like Chrome or Edge for the best API support.</li>
              <li style={{ marginBottom: '1.5rem' }}><strong>3. Wake:</strong> Press any button on your controller to wake the Gamepad API.</li>
              <li style={{ marginBottom: '1.5rem' }}><strong>4. Adjust:</strong> Use the sliders to test specific motors or choose a diagnostic preset.</li>
              <li style={{ marginBottom: '1.5rem' }}><strong>5. Run:</strong> Press the "Vibrate" button and feel for the response in your hands.</li>
            </CleanList>
          </div>
          <ResponsiveImage>
            <Image
              src="/images/vibration-tester/infographic.webp"
              alt="Step-by-step infographic showing how to use a controller vibration tester"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
            />
          </ResponsiveImage>
        </ContentGrid>

        {/* RESULTS INTERPRETATION */}
        <SectionHeading>What Your Results Mean</SectionHeading>
        <ContentGrid className="reverse">
          <div className="content">
            <h3>Analyzing Your Feedback</h3>
            <p style={{ color: '#555' }}>
              When you run the test, focus on the consistency of the sensation. A healthy motor should produce a steady, smooth vibration without any grinding or sudden drops in intensity.
            </p>
            <CleanList>
              <li><strong>Normal Behavior:</strong> Both motors respond instantly and feel distinct. The left side feels "heavy" and mechanical, while the right feels "buzzed" and fast.</li>
              <li><strong>Signs of a Problem:</strong> If the vibration feels scratchy, inconsistent, or creates a rattling sound inside the controller, the motor bearing may be failing.</li>
              <li><strong>Total Failure:</strong> If one side doesn't vibrate at all even at 100% intensity, it usually indicates a severed internal wire or a dead motor coil.</li>
            </CleanList>
          </div>
          <ResponsiveImage>
            <Image
              src="/images/vibration-tester/motor-comparison.webp"
              alt="Graph comparing normal smooth vibration output vs failing jagged motor output"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="caption">Visualizing healthy vs. failing rumble motor output</div>
          </ResponsiveImage>
        </ContentGrid>

        {/* TROUBLESHOOTING */}
        <SectionHeading>Why Your Controller Might Not Be Vibrating</SectionHeading>
        <TroubleshootingFlow>
          <ContentGrid>
            <div className="content">
              <h3>Common Culprits</h3>
              <p style={{ color: '#555' }}>If the tester isn't triggering a response, follow this checklist before assuming the hardware is broken:</p>
              <CleanList>
                <li><strong>OS-Level Settings:</strong> On Windows 10/11, check "Bluetooth and devices" then "Mouse" (or Gamepad settings) to ensure vibration is not disabled globally.</li>
                <li><strong>Browser Support:</strong> Safari and legacy browsers do not support the Gamepad Haptics API. Always use Chrome or Edge for testing.</li>
                <li><strong>Power Saving Mode:</strong> Many controllers (especially Xbox) instinctively disable vibration when the battery level drops below 10-15% to save power.</li>
                <li><strong>Firmware Issues:</strong> PS5 DualSense controllers often require a firmware update via the "Firmware updater for DualSense" PC app to unlock full haptic support in browsers.</li>
              </CleanList>
            </div>
            <ResponsiveImage $maxWidth="500px">
              <Image
                src="/images/vibration-tester/flowchart.webp"
                alt="Decision tree flowchart for troubleshooting controller vibration issues"
                width={500}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </ResponsiveImage>
          </ContentGrid>
        </TroubleshootingFlow>

        {/* COMPARISON TABLE */}
        <SectionHeading>Tester Tool vs. Manual Checking</SectionHeading>
        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Vibration Tester Tool</th>
              <th>Checking in a Game</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Isolation</strong></td>
              <td>Test left or right motor individually</td>
              <td>Often vibrates both motors at once</td>
            </tr>
            <tr>
              <td><strong>Precision</strong></td>
              <td>0% to 100% intensity sliders</td>
              <td>Variable intensity based on gameplay</td>
            </tr>
            <tr>
              <td><strong>Diagnostic</strong></td>
              <td>Real-time API response data</td>
              <td>Visual/Sensation feedback only</td>
            </tr>
            <tr>
              <td><strong>Convenience</strong></td>
              <td>Instant browser access</td>
              <td>Must launch game and reach rumble event</td>
            </tr>
          </tbody>
        </ComparisonTable>

        {/* COMPATIBILITY */}
        <SectionHeading>Browser & Device Compatibility</SectionHeading>
        <ContentGrid>
          <ResponsiveImage>
            <Image
              src="/images/vibration-tester/compatibility-grid.webp"
              alt="Grid showing browser and OS compatibility for gamepad vibration API"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="caption">Browser and OS compatibility matrix</div>
          </ResponsiveImage>
          <div className="content">
            <h3>Where Does it Work?</h3>
            <p style={{ color: '#555' }}>
              Native vibration support varies significantly between browsers and operating systems.
            </p>
            <CleanList>
              <li><strong>Windows (Chrome/Edge):</strong> Gold standard. Full support for all motor types.</li>
              <li><strong>macOS (Chrome):</strong> Good support for basic rumble.</li>
              <li><strong>ChromeOS:</strong> Full support across all devices.</li>
              <li><strong>Android (Chrome):</strong> Supported, but depends on the mobile device's internal haptic engine.</li>
              <li><strong>iOS/Safari:</strong> Currently does not support the Gamepad Haptics API due to Apple's security restrictions.</li>
            </CleanList>
          </div>
        </ContentGrid>

        {/* PRO TIPS */}
        <SectionHeading>Tips for the Best Results</SectionHeading>
        <ProTip>
          <h4><span>💡</span> Use a Wired Connection</h4>
          <p>While Bluetooth is convenient, some Windows drivers throttle vibration data over wireless to save bandwidth. For the most accurate intensity test, always use a high-quality USB cable.</p>
        </ProTip>
        <ProTip>
          <h4><span>💡</span> Check Your Batteries</h4>
          <p>Xbox and 8BitDo controllers are notorious for cutting vibration power when the battery hits "Low." If your rumble feels weak, swap in fresh batteries and try again.</p>
        </ProTip>
        <ProTip>
          <h4><span>💡</span> Close Steam</h4>
          <p>Steam's "Desktop Configuration" can sometimes hijack the Gamepad API. If the tester isn't responding, try closing Steam completely and refreshing the page.</p>
        </ProTip>

        {/* FAQ SECTION */}
        <SectionHeading>Frequently Asked Questions</SectionHeading>
        <Accordion>
          <AccordionHeader $isOpen={openSection === 'q1'} onClick={() => toggleSection('q1')}>
            Is it safe to test vibration continuously?
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'q1'}>
            <p>Yes. The tool sends standard API commands that the controller is designed to handle. However, we recommend avoiding 100% intensity for more than 30 seconds to prevent the motors from overheating.</p>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'q2'} onClick={() => toggleSection('q2')}>
            Why do my triggers vibrate but not the main grips?
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'q2'}>
            <p>This is common on Xbox controllers. The "Impulse Triggers" are separate motors. If the grips aren't moving, the main rumble motors might be disconnected or disabled in your Windows settings.</p>
          </AccordionContent>
        </Accordion>

        <Accordion>
          <AccordionHeader $isOpen={openSection === 'q3'} onClick={() => toggleSection('q3')}>
            Does this work with PS5 DualSense Edge?
            <span className="icon">▼</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openSection === 'q3'}>
            <p>Yes. The DualSense Edge is fully compatible. Note that while you can test basic rumble, the "HD Haptics" patterns are currently limited by browser API standards.</p>
          </AccordionContent>
        </Accordion>
        <div style={{ textAlign: 'center', margin: '5rem 0 3rem 0', padding: '3rem', background: '#fff8f6', borderRadius: '24px', border: '1px solid #ffeadd' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Test Your Rumble?</h2>
          <p style={{ color: '#555', fontSize: '1.2rem', marginBottom: '2rem' }}>Join thousands of gamers who use our tool to verify their hardware every day.</p>
          <CTAButton onClick={scrollToTop} style={{ padding: '1.2rem 3rem', fontSize: '1.2rem' }}>
            Scroll Up & Start Test
          </CTAButton>
        </div>
      </SectionContainer>
      
      {/* 🧭 GLOBAL SITE NAVIGATION (NO ORPHAN PAGES) */}
      <RelatedTools currentPath="/vibration-test" />
    </StyledMainPageWrapper>
  );
}

