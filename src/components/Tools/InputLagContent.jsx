'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Theme } from '../../styles/Theme';
import { useI18n } from "../../contexts/I18nContext";
import RelatedTools from '../RelatedTools/RelatedTools';

// ============================================================================
// STYLED COMPONENTS (PREMIUM ORANGE/BLUE THEME - MATCHING STICK DRIFT TEST)
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
  margin: 3rem 0;

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
  font-size: 1.6rem;
  font-weight: 700;
  color: ${Theme.primary};
  margin: 3rem 0 1.2rem 0;
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
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 1.2rem;
    color: #1a1a1a;
  }

  p {
    color: #555;
    line-height: 1.7;
    font-size: 1rem;
  }
`;

const RoadmapSteps = styled.div`
  margin: 5rem 0;
`;

const StepItem = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-bottom: 3.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.2rem;
  }

  .number {
    flex-shrink: 0;
    width: 65px;
    height: 65px;
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    color: white;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 900;
    box-shadow: 0 10px 20px rgba(218, 119, 86, 0.25);
  }

  .content {
    h4 {
      font-size: 1.35rem;
      font-weight: 800;
      margin-bottom: 0.8rem;
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
  transition: all 0.3s ease;

  .icon {
    font-size: 1.6rem;
    color: ${Theme.primary};
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const AccordionContent = styled.div`
  padding: ${props => props.$isOpen ? '0 2.2rem 2rem 2.2rem' : '0'};
  max-height: ${props => props.$isOpen ? '1000px' : '0'};
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
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.01);
  }
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

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${Theme.primary}10 0%, transparent 70%);
  }

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
      box-shadow: 0 15px 35px ${Theme.primary}60;
    }
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function InputLagContent() {
  const { t } = useI18n();
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
            <SectionHeading>Controller Input Lag Test – Monitor Polling Rate & Latency</SectionHeading>
            <ArticleText>
              Controller input lag is the hidden delay between the moment you physically press a button and when that action happens in your game. Even a few milliseconds (ms) of latency can be the difference between a headshot and a missed opportunity. This professional diagnostic terminal analyzes your hardware's polling rate to show exactly how fast you're performing.
            </ArticleText>
            <ArticleText>
              Latency is cumulative—it travels from your controller hardware, through the USB/Bluetooth stack, into the CPU, and finally renders on your screen. By measuring the <strong>polling rate</strong> (Hz) and the <strong>average delay</strong>, you can identify if your current connection is tournament-ready or if you need an overclock.
            </ArticleText>
            <CTABox>
              <p>Competitive players aim for sub-5ms latency. If your delay is fluctuating or high, it's time to troubleshoot your connection.</p>
              <p style={{ marginTop: '1.2rem' }}>Ready to benchmark? Use our <a href="#test" onClick={scrollToTop}>Input Lag Tester</a> to get your milliseconds reading immediately.</p>
            </CTABox>
          </div>
          <RespImage>
            <Image
              src="/images/input-lag-test/hero.webp"
              alt="Professional controller input lag test dashboard showing milliseconds reading and polling rate graphs"
              width={800}
              height={500}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </RespImage>
        </ContentGrid>

        {/* 🔬 HOW IT WORKS DIAGRAM */}
        <div style={{ margin: '8rem 0' }}>
            <SectionHeading style={{ textAlign: 'center' }}>How This Latency Test Works</SectionHeading>
            <ArticleText style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 4rem auto' }}>
              Unlike simple reaction tests, our professional diagnostic terminal at <strong>mygamepadtester.com</strong> hooks directly into the browser's Gamepad API to measure the delta between every single hardware update sent by your controller.
            </ArticleText>
            
            <ContentGrid>
                <RespImage>
                    <Image
                        src="/images/input-lag-test/polling-rate-diagram.webp"
                        alt="Technical diagram explaining polling rate and input lag concepts on mygamepadtester.com"
                        width={800}
                        height={500}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </RespImage>
                <div className="content">
                    <SubHeading>The Polling Rate Pipeline</SubHeading>
            <ArticleText>
              The <strong>Polling Rate</strong> (measured in Hertz, or Hz) is the frequency at which your computer checks for new inputs. A 125Hz controller polls every 8ms, while an overclocked 1000Hz controller polls every 1ms. 
            </ArticleText>
            <ArticleText>
              Our tool captures these raw signals and plots them in real-time. By rotating your analog sticks, you saturate the polling loop, allowing us to calculate your <strong>True Latency</strong> based on the fastest possible updates your controller can deliver. If you suspect hardware issues beyond lag, consider running our <Link href="/stick-drift-test" style={{ color: Theme.primary, fontWeight: 700 }}>Stick Drift Test</Link> to check for potentiometer wear.
            </ArticleText>
                </div>
            </ContentGrid>
        </div>

        {/* 📝 STEP BY STEP */}
        <div style={{ margin: '8rem 0' }}>
          <SectionHeading>Step-by-Step Lag Testing</SectionHeading>
          <ContentGrid>
            <RoadmapSteps>
              <StepItem>
                <div className="number">1</div>
                <div className="content">
                  <h4>Connect & Authorize</h4>
                  <p>Plug in your controller. Press any button to wake the browser API and select your device in the dropdown.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">2</div>
                <div className="content">
                  <h4>Saturate the Polling Loop</h4>
                  <p>Select 'Polling Hz' and rotate both analog sticks vigorously. This forces the controller to send data at its maximum speed.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">3</div>
                <div className="content">
                  <h4>Check MS Benchmarks</h4>
                  <p>Observe the 'AVG DELAY' readout. This is your baseline hardware latency. Compare it against our charts below.</p>
                </div>
              </StepItem>
              <StepItem>
                <div className="number">4</div>
                <div className="content">
                  <h4>Run the Reaction Test</h4>
                  <p>Switch to 'Reaction Test' to measure the combined delay of your muscles, your hardware, and your screen.</p>
                </div>
              </StepItem>
            </RoadmapSteps>
            <RespImage>
              <Image
                src="/images/input-lag-test/steps-infographic.webp"
                alt="Infographic for running an input lag test on mygamepadtester.com including connection and results checking"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </RespImage>
          </ContentGrid>
        </div>

        {/* 📊 SEVERITY CHART FOR MS */}
        <div style={{ margin: '8rem 0' }}>
          <SectionHeading style={{ textAlign: 'center' }}>Latency Performance Benchmarks</SectionHeading>
          <ThresholdTable>
              <thead>
                  <tr>
                      <th>Latency Range</th>
                      <th>Performance Tier</th>
                      <th>Impact on Gameplay</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td><strong>Under 1ms</strong></td>
                      <td>Elite Competitive</td>
                      <td>Possible with 1000Hz+ USB overclocking. Zero detectable delay.</td>
                  </tr>
                  <tr>
                      <td><strong>1ms to 4ms</strong></td>
                      <td>Pro Grade</td>
                      <td>Standard for wired DualSense/Xbox. Perfectly responsive.</td>
                  </tr>
                  <tr>
                      <td><strong>8ms to 12ms</strong></td>
                      <td>Standard / Casual</td>
                      <td>Normal for 125Hz Bluetooth. Noticeable in high-speed titles.</td>
                  </tr>
                  <tr>
                      <td><strong>Over 16ms</strong></td>
                      <td>Critical Lag</td>
                      <td>Interference or legacy hardware. Significant disadvantage in shooters.</td>
                  </tr>
              </tbody>
          </ThresholdTable>
        </div>

        {/* ⚡ CAUSES OF LAG FEATURES */}
        <div style={{ margin: '8rem 0' }}>
            <SectionHeading style={{ textAlign: "center" }}>Common Causes of Controller Input Lag</SectionHeading>
            <FeatureGrid>
                <FeatureCard>
                    <span className="icon">📡</span>
                    <h4>Wireless Interference</h4>
                    <p>Bluetooth signals are easily disrupted by 2.4GHz Wi-Fi or other wireless devices, adding jitter and packet loss to your inputs.</p>
                </FeatureCard>
                <FeatureCard>
                    <span className="icon">🔌</span>
                    <h4>Legacy Polling Rates</h4>
                    <p>Many older controllers default to 125Hz (8ms). Modern titles benefit significantly from increasing this to 500Hz or beyond.</p>
                </FeatureCard>
                <FeatureCard>
                    <span className="icon">💻</span>
                    <h4>Background CPU Load</h4>
                    <p>If your CPU is at 100%, input processing takes a backseat, leading to spikes in latency during heavy combat or intense scenes.</p>
                </FeatureCard>
                <FeatureCard>
                    <span className="icon">🖥️</span>
                    <h4>Display Processing</h4>
                    <p>Even if your controller is fast, a TV in 'Standard Mode' can add 50ms+ of display lag. Always use 'Game Mode'.</p>
                </FeatureCard>
            </FeatureGrid>
        </div>

        {/* ⚔️ WIRED VS WIRELESS */}
        <ContentGrid>
            <RespImage>
                <Image
                    src="/images/input-lag-test/wired-vs-wireless-latency-comparison.webp"
                    alt="Bar chart comparing wired vs wireless controller latency on mygamepadtester.com"
                    width={800}
                    height={500}
                    style={{ width: '100%', height: 'auto' }}
                />
            </RespImage>
            <div className="content">
                <SubHeading>Wired vs. Wireless: The Truth</SubHeading>
                <ArticleText>
                  While modern Bluetooth 5.0 has improved significantly, a stable wired connection is still the gold standard for zero-jitter performance. Wireless connections can suffer from "polling drift," where the ms delay fluctuates wildly between inputs.
                </ArticleText>
                <ArticleText>
                  On PlayStation controllers, Bluetooth can actually achieve faster raw polling than default USB, but with higher potential for jitter. For Xbox, Microsoft's proprietary 2.4GHz adapter is recommended over standard Bluetooth if you want to stay wireless while minimizing lag.
                </ArticleText>
                <CTABox>
                  <p>Check both modes on <strong>mygamepadtester.com</strong> by switching between cable and Bluetooth to see the real difference yourself.</p>
                </CTABox>
            </div>
        </ContentGrid>

        {/* 🛠️ WAYS TO REDUCE LAG */}
        <div style={{ margin: '6rem 0' }}>
          <SectionHeading>How to Reduce Input Lag on PC</SectionHeading>
          <FeatureGrid>
            <FeatureCard>
              <h4>1. Adjust Polling Rate</h4>
              <p>Use tools like HIDUSBF to overclock your USB port to 1000Hz (1ms). Follow guides on <a href="https://blurbusters.com/faq/1000hz-polling/" target="_blank" rel="noopener noreferrer" style={{ color: Theme.primary, textDecoration: 'underline' }}>Blur Busters</a> for optimal high-frequency input latency settings.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>2. Focus Your App</h4>
              <p>Exclusive Fullscreen mode in games reduces OS processing time. Check <a href="https://www.rtings.com/mouse/tests/control/latency" target="_blank" rel="noopener noreferrer" style={{ color: Theme.primary, textDecoration: 'underline' }}>RTINGS benchmarks</a> to see how different hardware stacks up in professional tests.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>3. Check Hardware Wear</h4>
              <p>Worn buttons or sticks can register "late" due to physical fatigue. If your buttons feel mushy, run a <Link href="/button-test" style={{ color: Theme.primary, textDecoration: 'underline' }}>Button Test</Link> to check response curves.</p>
            </FeatureCard>
          </FeatureGrid>
          <ArticleText style={{ textAlign: 'center' }}>
            For a full guide on optimizing your gaming setup, visit our <Link href="/guides" style={{ color: Theme.primary, fontWeight: 700 }}>gaming hardware guides</Link>.
          </ArticleText>
        </div>
      </SectionContainer>

      {/* ❓ FAQ SECTION - PREMIUM ACCORDION STYLE */}
      <FAQSection>
        <SectionContainer>
          <SectionHeading style={{ textAlign: 'center', marginBottom: '4rem' }}>Input Lag & Latency FAQ</SectionHeading>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              {
                q: "What is a 'good' input lag score?",
                a: "Anything under 5ms is considered top-tier for competitive gaming. For casual games, 10-15ms is perfectly acceptable. Most professional esports players spend significant time optimizing their setups to stay in the 1ms to 2ms range."
              },
              {
                q: "Can I test my PS5 DualSense latency here?",
                a: "Absolutely. DualSense controllers are capable of very high polling rates. Connect yours via USB, rotate the sticks, and you should see an average delay between 1ms and 4ms in Chrome or Edge."
              },
              {
                q: "Why does my Bluetooth controller show 20ms+ lag?",
                a: "Bluetooth is prone to interference. Try moving closer to your receiver, removing other wireless devices, or ensure your Bluetooth dongle is plugged into a USB 2.0 port (USB 3.0 ports are known to cause 2.4GHz interference)."
              },
              {
                q: "How accurate is this browser-based test?",
                a: "Our tool at mygamepadtester.com uses high-precision performance.now() timestamps from the Gamepad API. While it can't account for display-specific lag (use a hardware device for that), it is extremely accurate for measuring electrical hardware latency from the controller to the OS."
              },
              {
                q: "Does overclocking my controller actually work?",
                a: "Yes. By changing the USB descriptor's polling interval, you force the OS to check the controller more frequently. You can verify the jump from 125Hz to 1000Hz directly inside our monitor."
              },
              {
                q: "Will a better USB cable reduce lag?",
                a: "A high-quality data cable ensures a stable signal and prevents packet loss, but it won't inherently change the polling rate. However, generic 'charging' cables can cause intermittent disconnects or spikes in latency."
              },
              {
                q: "What is the difference between latency and jitter?",
                a: "Latency is the average delay per packet. Jitter is the variance between those delays. A controller with 2ms latency but 10ms jitter will feel worse than a steady 4ms controller because the timing is inconsistent."
              },
              {
                q: "Is input lag the same as monitor lag?",
                a: "No. Input lag is from the controller to the PC. Monitor lag (Display Lag) is the time it takes for the pixels to light up. Total Lag (End-to-End) is the sum of both."
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
          <h3>Optimize Your Response Time Today.</h3>
          <p>The first step to professional gaming is an optimized setup. Join thousands of users on <strong>mygamepadtester.com</strong> who benchmark their gear before every ranked session.</p>
          <button onClick={scrollToTop}>Run Input Lag Diagnostic</button>
        </ToolCTA>
      </SectionContainer>
      
      {/* 🧭 GLOBAL SITE NAVIGATION (NO ORPHAN PAGES) */}
      <RelatedTools currentPath="/input-lag-test" />
    </StyledMainPageWrapper>
  );
}
