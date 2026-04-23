"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useI18n } from '@/contexts/I18nContext';
import { games } from './games';
import { Theme } from '@/styles/Theme';
import RelatedTools from '@/components/RelatedTools/RelatedTools';

const HeadingWrapper = styled.div`
  text-align: ${props => props.$centered ? 'center' : 'left'};
  margin-bottom: 2rem;

  .badge {
    display: inline-block;
    padding: 6px 16px;
    background: ${Theme.primary}20;
    color: ${Theme.primary};
    border-radius: 99px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 1rem;
    letter-spacing: -1px;
  }

  p {
    color: #64748b;
    font-size: 1.1rem;
    max-width: 600px;
    margin: ${props => props.$centered ? '0 auto' : '0'};
    line-height: 1.6;
  }
`;

const SectionHeading = ({ badge, title, desc, centered }) => (
  <HeadingWrapper $centered={centered}>
    {badge && <div className="badge">{badge}</div>}
    <h1>{title}</h1>
    {desc && <p>{desc}</p>}
  </HeadingWrapper>
);

const ToolContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
`;

const ConverterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 24px;
  align-items: center;
  margin-top: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 24px;
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    border-color: #E8622A30;
    background: #ffffff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  }
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 800;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const Select = styled.select`
  padding: 16px;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  color: #1e293b;
  width: 100%;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;

  &:focus {
    border-color: #E8622A;
    box-shadow: 0 0 0 4px rgba(232, 98, 42, 0.1);
  }

  option {
    background: #ffffff;
    color: #1e293b;
    padding: 12px;
  }
`;

const Input = styled.input`
  padding: 16px;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  color: #1e293b;
  width: 100%;
  outline: none;
  font-size: 1.1rem;
  font-weight: 700;
  transition: all 0.2s;

  &:focus {
    border-color: #E8622A;
    box-shadow: 0 0 0 4px rgba(232, 98, 42, 0.1);
  }

  &::-webkit-inner-spin-button {
    opacity: 0;
  }
`;

const SwapButton = styled.button`
  background: #E8622A;
  border: none;
  color: white;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 20px rgba(232, 98, 42, 0.3);
  z-index: 2;

  &:hover {
    transform: rotate(180deg) scale(1.1);
    box-shadow: 0 10px 25px rgba(232, 98, 42, 0.5);
    background: #d45625;
  }

  @media (max-width: 900px) {
    margin: -16px auto;
    transform: rotate(90deg);
    &:hover { transform: rotate(270deg) scale(1.1); }
  }
`;

const ResultCard = styled.div`
  grid-column: 1 / -1;
  padding: 60px 40px;
  background: #1e293b;
  border-radius: 32px;
  text-align: center;
  margin-top: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #E8622A;
  }
`;

const ResultValue = styled.div`
  font-size: 5.5rem;
  font-weight: 900;
  color: #E8622A;
  margin: 10px 0;
  line-height: 1;
  letter-spacing: -2px;
  font-family: 'Inter', sans-serif;

  @media (max-width: 600px) {
    font-size: 3.5rem;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const MetricBox = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-4px);
  }
`;

const MetricLabel = styled.div`
  font-size: 0.7rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 800;
`;

const MetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffffff;
`;

const InfoSection = styled.section`
    padding: 120px 20px;
    width: 100%;
    transition: background 0.3s;
`;

const InfoGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 32px;
    align-items: flex-start;
`;

const InfoCard = styled.div`
    background: #ffffff;
    padding: 48px;
    border-radius: 32px;
    border: 1px solid #f1f5f9;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
`;

const InfoTitle = styled.h3`
    color: #1e293b;
    margin-bottom: 24px;
    font-size: 1.5rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 12px;

    &::before {
        content: '';
        width: 8px;
        height: 24px;
        background: #E8622A;
        border-radius: 4px;
    }
`;

const FAQSection = styled.div`
    max-width: 900px;
    margin: 100px auto;
    padding: 0 20px;
`;

const FAQCard = styled.div`
    background: #ffffff;
    border: 1px solid #f1f5f9;
    border-radius: 24px;
    padding: 32px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const FAQQuestion = styled.h4`
    color: #1e293b;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 16px;

    &::before {
        content: 'Q';
        color: #E8622A;
        font-weight: 900;
        font-size: 1.4rem;
    }
`;

const FAQAnswer = styled.p`
    color: #64748b;
    line-height: 1.8;
    font-size: 1.05rem;
`;

const CTAContainer = styled.div`
    background: linear-gradient(135deg, #1e293b, #0f172a);
    padding: 40px;
    border-radius: 24px;
    margin: 40px 0;
    text-align: center;
    color: white;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    border-bottom: 4px solid #E8622A;
`;

const CTAButton = styled.a`
    display: inline-block;
    padding: 16px 32px;
    background: #E8622A;
    color: white;
    border-radius: 99px;
    font-weight: 700;
    margin-top: 20px;
    transition: all 0.3s;
    &:hover {
        background: #d45625;
        transform: translateY(-2px);
    }
`;

const ImageBlock = styled.div`
    margin: 30px 0;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    img {
        width: 100%;
        height: auto;
        display: block;
    }
`;

const InlineLink = styled.a`
    color: #E8622A;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 4px;
    cursor: pointer;
    &:hover {
        color: #d45625;
    }
`;

const ProTipSection = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 20px;
    border-left: 5px solid #E8622A;
    margin-top: 20px;
    font-style: italic;
`;

export default function AimSensitivityClient() {
    const { t } = useI18n();
    const [fromGame, setFromGame] = useState(games[0]);
    const [toGame, setToGame] = useState(games[1]);
    const [fromSens, setFromSens] = useState(1.0);
    const [currentDpi, setCurrentDpi] = useState(800);
    const [targetDpi, setTargetDpi] = useState(800);
    const [toSens, setToSens] = useState(0);
    const [cm360, setCm360] = useState(0);

    const calculateSens = () => {
        const gameRatio = toGame.factor / fromGame.factor;
        const dpiRatio = currentDpi / targetDpi;
        const finalSens = fromSens * gameRatio * dpiRatio;
        setToSens(finalSens.toFixed(4));

        const VAL_CONSTANT = 13062.164;
        const normalizeToVal = finalSens / toGame.factor;
        const cm = VAL_CONSTANT / (normalizeToVal * targetDpi);
        
        if (isFinite(cm)) {
            setCm360(cm.toFixed(2));
        } else {
            setCm360(0);
        }
    };

    const swapGames = () => {
        const tempGame = fromGame;
        const tempSens = fromSens;
        setFromGame(toGame);
        setFromSens(parseFloat(toSens));
        setToGame(tempGame);
        setTargetDpi(currentDpi);
        setCurrentDpi(targetDpi);
    };

    useEffect(() => {
        calculateSens();
    }, [fromGame, toGame, fromSens, currentDpi, targetDpi]);

    useEffect(() => {
        const recordTelemetry = async () => {
             try {
                await fetch('/api.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tool_type: 'sens_converter',
                        from_game: fromGame.name,
                        to_game: toGame.name,
                        from_sens: parseFloat(fromSens),
                        to_sens: parseFloat(toSens)
                    })
                });
            } catch (e) {
                console.warn('Telemetry sync failed');
            }
        };

        const timer = setTimeout(recordTelemetry, 2000);
        return () => clearTimeout(timer);
    }, [fromGame.name, toGame.name, toSens]);

    return (
        <div style={{ width: '100%', background: '#FAF9F5', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 20px' }}>
                <SectionHeading 
                    badge="FPS PRO UTILITY"
                    title="Free Mouse Aim Sensitivity Converter for Any Game"
                    desc="Join thousands of competitive gamers using MyGamepadTester to sync their aim across every title."
                    centered
                />

                <ToolContainer>
                    <ConverterGrid>
                        <InputGroup>
                            <Label>Source Game</Label>
                            <Select 
                                value={fromGame.name} 
                                onChange={(e) => setFromGame(games.find(g => g.name === e.target.value))}
                            >
                                {games.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
                            </Select>
                            <Label>In-Game Sens</Label>
                            <Input 
                                type="number" 
                                step="any" 
                                value={fromSens} 
                                onChange={(e) => setFromSens(parseFloat(e.target.value) || 0)} 
                            />
                            <Label>Mouse DPI</Label>
                            <Input 
                                type="number" 
                                value={currentDpi} 
                                onChange={(e) => setCurrentDpi(parseInt(e.target.value) || 0)} 
                            />
                        </InputGroup>

                        <SwapButton onClick={swapGames} title="Swap Games">⇄</SwapButton>

                        <InputGroup>
                            <Label>Target Game</Label>
                            <Select 
                                value={toGame.name} 
                                onChange={(e) => setToGame(games.find(g => g.name === e.target.value))}
                            >
                                {games.map(g => <option key={g.name} value={g.name}>{g.name}</option>)}
                            </Select>
                            <Label>Target DPI</Label>
                            <Input 
                                type="number" 
                                value={targetDpi} 
                                onChange={(e) => setTargetDpi(parseInt(e.target.value) || 0)} 
                            />
                            <div style={{marginTop: 'auto', paddingTop: '10px'}}>
                                <p style={{fontSize: '0.85rem', color: '#64748b', fontWeight: 500, lineHeight: 1.5}}>Maintain identical muscle memory across different engines.</p>
                            </div>
                        </InputGroup>

                        <ResultCard>
                            <Label style={{justifyContent: 'center', fontSize: '0.9rem', color: '#94a3b8', letterSpacing: '4px'}}>Recommended Sensitivity</Label>
                            <ResultValue>{toSens}</ResultValue>
                            
                            <MetricsGrid>
                                <MetricBox>
                                    <MetricLabel>CM / 360</MetricLabel>
                                    <MetricValue>{cm360}</MetricValue>
                                </MetricBox>
                                <MetricBox>
                                    <MetricLabel>IN / 360</MetricLabel>
                                    <MetricValue>{(cm360 / 2.54).toFixed(2)}</MetricValue>
                                </MetricBox>
                                <MetricBox>
                                    <MetricLabel>eDPI</MetricLabel>
                                    <MetricValue>{(toSens * targetDpi).toFixed(0)}</MetricValue>
                                </MetricBox>
                            </MetricsGrid>
                        </ResultCard>
                    </ConverterGrid>
                </ToolContainer>
            </div>

            {/* WHAT IS SECTION */}
            <InfoSection style={{background: '#fff'}}>
                <InfoGrid>
                    <div>
                        <InfoTitle>What Is an Aim Sensitivity Converter?</InfoTitle>
                        <FAQAnswer>
                            An aim sensitivity converter is a free browser tool that takes your sensitivity setting from one game and calculates the exact equivalent value for a different game. You enter your current game, your target game, your sensitivity, and your DPI — and the tool gives you the exact number to use in your new game. No math required, no guessing.
                        </FAQAnswer>
                        <FAQAnswer style={{marginTop: '20px'}}>
                            The whole point of this tool is to protect your muscle memory. Your brain and hands learn to aim based on a specific physical distance your mouse travels. When that distance changes because you switched games, your aim falls apart even though nothing about your actual skill changed. The Aim Sensitivity Converter on **MyGamepadTester** fixes that problem directly and instantly.
                        </FAQAnswer>
                        <ProTipSection>
                            You enter your current game, your target game, your sensitivity, and your DPI — and the tool gives you the exact number to use in your new game.
                        </ProTipSection>
                        <CTAButton href="#tool">Start Matching Your Aim Now</CTAButton>
                    </div>
                    <ImageBlock>
                        <Image 
                            src="/images/tools/aim-converter/mockup.webp" 
                            alt="Aim sensitivity converter tool interface showing game selection dropdowns and sensitivity output panel" 
                            width={500}
                            height={340}
                            style={{ width: '100%', height: 'auto' }}
                            loading="lazy"
                        />
                    </ImageBlock>
                </InfoGrid>
            </InfoSection>

            {/* WHY SECTION */}
            <InfoSection>
                <InfoGrid>
                    <div style={{gridColumn: '1 / -1', textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
                        <InfoTitle style={{justifyContent: 'center'}}>Why Your Sensitivity Feels Different in Every Game</InfoTitle>
                        <FAQAnswer>
                            Every game uses its own internal sensitivity language. A sensitivity of 2.0 in CS2 and a sensitivity of 2.0 in Fortnite produce completely different turn speeds because each game uses a different yaw multiplier. CS2 uses a yaw value of 0.022, while other titles like Apex Legends and Valorant use different values entirely. The same number in two games means almost nothing without accounting for this.
                        </FAQAnswer>
                        <FAQAnswer style={{marginTop: '20px'}}>
                            The issue goes deeper than just yaw. Games like Fortnite use Unreal Engine's proprietary slider method, which also depends on your field of view (FOV) setting. Others calculate horizontal and vertical mouse movement separately, meaning even a precise conversion might feel slightly off on vertical tracking. When you add ADS multipliers, zoom sensitivity settings, and differences in raw input handling, it becomes clear why manually guessing a converted sensitivity almost never feels right.
                        </FAQAnswer>
                        <FAQAnswer style={{marginTop: '20px'}}>
                            This is not a problem with your aim. It is a maths problem built into how game developers implement their sensitivity systems. Switching from Valorant to Warzone without converting is like trying to speak two languages with the same words and expecting to be understood. The **MyGamepadTester** aim sensitivity converter does the translation for you so your crosshair movement stays physically consistent across every title in your rotation.
                        </FAQAnswer>
                         <FAQAnswer style={{marginTop: '20px', fontStyle: 'italic'}}>
                            Scientific studies on <InlineLink href="https://www.sciencedaily.com/releases/2014/11/141106173255.htm" target="_blank">how action video games enhance sensorimotor learning</InlineLink> show that physical consistency is a key factor in skill retention.
                        </FAQAnswer>
                    </div>
                </InfoGrid>
            </InfoSection>

            {/* HOW IT WORKS */}
            <InfoSection style={{background: '#fff'}}>
                <InfoGrid>
                     <div style={{gridColumn: '1 / -1', textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
                        <InfoTitle style={{justifyContent: 'center'}}>How the Aim Sensitivity Converter Works</InfoTitle>
                        <FAQAnswer>
                            The process follows a straightforward input-to-output path. You give the tool three pieces of information: your source game, your DPI, and your current in-game sensitivity. The tool then uses each game's known yaw value to calculate how many centimeters your mouse physically travels to complete a full 360-degree rotation. It then finds the sensitivity value in your target game that produces that exact same physical distance.
                        </FAQAnswer>
                        <FAQAnswer style={{marginTop: '20px'}}>
                            That physical travel measurement is called **cm/360**. It is the universal standard that professional players use to compare sensitivity across all games and hardware. The tool also displays your eDPI (which is simply your DPI multiplied by your in-game sensitivity) and your in/360 for quick reference. All results update in real time as you type. You can use the <InlineLink href="/aim-sensitivity-converter">aim sensitivity converter</InlineLink> directly in your browser with no account or download needed. The formulas used are based on <InlineLink href="https://www.pcgamingwiki.com/wiki/Mouse_sensitivity" target="_blank">verified sensitivity and yaw values for major PC games</InlineLink> tested across multiple titles, not rough estimates.
                        </FAQAnswer>
                    </div>
                </InfoGrid>
            </InfoSection>

            {/* STEP BY STEP */}
            <InfoSection>
                <InfoGrid>
                    <ImageBlock>
                        <Image 
                            src="/images/tools/aim-converter/steps.webp" 
                            alt="Step-by-step infographic showing how to use an aim sensitivity converter in 6 steps" 
                            width={500}
                            height={340}
                            style={{ width: '100%', height: 'auto' }}
                            loading="lazy"
                        />
                    </ImageBlock>
                    <div>
                        <InfoTitle>How to Use the Aim Sensitivity Converter: Step-by-Step</InfoTitle>
                        <div style={{color: '#64748b', lineHeight: 1.8}}>
                            <ol style={{paddingLeft: '20px'}}>
                                <li><strong>Select your source game</strong> from the dropdown. This is the game where your current sensitivity already feels right.</li>
                                <li><strong>Enter your current sensitivity value.</strong> Copy it directly from your in-game settings to avoid typos.</li>
                                <li><strong>Enter your DPI.</strong> Check your mouse software if you are unsure. If you do not know your DPI, you can leave this field empty and still get a conversion.</li>
                                <li><strong>Select your target game</strong> from the second dropdown. This is the game you want to convert into.</li>
                                <li><strong>Read your result.</strong> Your converted sensitivity appears automatically along with your cm/360 and eDPI values.</li>
                                <li><strong>Apply the setting in your game</strong>, then head to a practice mode or training range to confirm it feels right before jumping into ranked.</li>
                            </ol>
                        </div>
                        <FAQAnswer style={{marginTop: '20px'}}>
                            After completing these steps, you should feel an immediate difference compared to guessing. Your flick shots and tracking will feel familiar because your physical mouse movement now produces the same rotation it always has.
                        </FAQAnswer>
                    </div>
                </InfoGrid>
            </InfoSection>

            {/* FEATURES */}
            <InfoSection style={{background: '#fff'}}>
                <InfoGrid>
                     <div style={{gridColumn: '1 / -1'}}>
                        <InfoTitle style={{justifyContent: 'center', marginBottom: '40px'}}>Key Features of the Aim Sensitivity Converter</InfoTitle>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
                            <InfoCard>
                                <InfoTitle style={{fontSize: '1.2rem'}}>Instant Real-Time Conversion</InfoTitle>
                                <FAQAnswer>
                                    The converter calculates your result the moment you finish typing. There is no submit button to click. This matters when you are switching games mid-session and just need the number fast. Input your values and your converted sensitivity is displayed before you can switch windows.
                                </FAQAnswer>
                            </InfoCard>
                            <InfoCard>
                                <InfoTitle style={{fontSize: '1.2rem'}}>cm/360 and eDPI Display</InfoTitle>
                                <FAQAnswer>
                                    Beyond the converted sensitivity number, the tool shows you your cm/360 and eDPI alongside the result. This is useful because cm/360 is the most reliable way to compare aim feel across games and hardware. Knowing your cm/360 also helps you communicate your sensitivity settings to teammates or coaches.
                                </FAQAnswer>
                            </InfoCard>
                            <InfoCard>
                                <InfoTitle style={{fontSize: '1.2rem'}}>DPI Change Support</InfoTitle>
                                <FAQAnswer>
                                    If you are also switching to a new mouse with a different DPI, the tool handles that too. Enter your current DPI and your target DPI side by side and the converter scales your sensitivity so your cm/360 stays identical. This makes the tool useful not just for game switching but also for mouse upgrades.
                                </FAQAnswer>
                            </InfoCard>
                        </div>
                    </div>
                </InfoGrid>
            </InfoSection>

            {/* MISTAKES SECTION */}
            <InfoSection>
                <InfoGrid>
                    <div>
                        <InfoTitle>Common Mistakes That Break Your Conversion</InfoTitle>
                        <FAQAnswer>
                            The most common error is forgetting to update your DPI in the converter. If you use 800 DPI in one game and 1600 in another and enter neither value, your result will be wrong. Sensitivity conversion depends heavily on DPI, so double-check this every time you switch. A related mistake is using a random online calculator that does not use accurate, verified yaw values.
                        </FAQAnswer>
                        <FAQAnswer style={{marginTop: '20px'}}>
                            A separate problem catches many Windows users off guard: **Enhanced Pointer Precision** is enabled by default and it acts as hidden mouse acceleration. When this setting is active, your mouse cursor travels different distances based on how fast you move. You should learn <InlineLink href="https://www.lifewire.com/turn-off-mouse-acceleration-windows-10-5116742" target="_blank">how to turn off Enhanced Pointer Precision in Windows</InlineLink> before you rely on any conversion.
                        </FAQAnswer>
                        <FAQAnswer style={{marginTop: '20px'}}>
                            For controller players, stick deadzone settings can create a similar inconsistency. If your analog stick has physical drift, your converted sensitivity will not behave as expected. You can <InlineLink href="/deadzone-test">test your controller's deadzone</InlineLink> to rule out any stick calibration issues first.
                        </FAQAnswer>
                    </div>
                    <div style={{background: 'rgba(232, 98, 42, 0.05)', padding: '40px', borderRadius: '32px', border: '2px dashed #E8622A'}}>
                        <h4 style={{color: '#E8622A', marginBottom: '20px', fontWeight: 900}}>MISTAKE CHECKLIST</h4>
                        <ul style={{listStyle: 'none', color: '#1e293b'}}>
                            <li style={{marginBottom: '15px'}}>❌ Leaving DPI Blank (Inaccurate result)</li>
                            <li style={{marginBottom: '15px'}}>❌ Acceleration ON (Inconsistent turn distance)</li>
                            <li style={{marginBottom: '15px'}}>❌ Wrong Calculator (Unverified math)</li>
                            <li style={{marginBottom: '15px'}}>❌ Ignoring FOV (Perceived speed shift)</li>
                        </ul>
                    </div>
                </InfoGrid>
            </InfoSection>

            {/* OFF FEEL SECTION */}
            <InfoSection style={{background: '#fff'}}>
                <InfoGrid>
                    <div style={{gridColumn: '1 / -1', textAlign: 'center', maxWidth: '800px', margin: '0 auto'}}>
                        <InfoTitle style={{justifyContent: 'center'}}>Why Converted Sensitivity Still Feels Slightly Off</InfoTitle>
                        <FAQAnswer>
                            If you use the converter correctly and your aim still does not feel quite right, that is normal and it has specific causes. The most documented one is FOV differences between games. Field of view differences (even by as little as 3 degrees) means a mathematically perfect cm/360 conversion can still feel subtly different because your visual frame is slightly wider or narrower.
                        </FAQAnswer>
                        <FAQAnswer style={{marginTop: '20px'}}>
                             Other factors include game engine differences in how input polling works, whether aim assist or ADS multipliers are active, and whether the game uses separate sensitivity values for horizontal and vertical movement. Beyond the numbers, your brain is also used to the feedback from your old game. Allow yourself 1 to 2 hours of play with the new sensitivity before deciding it needs adjustment. If something still feels off, you should <InlineLink href="/input-lag-test">check your input lag</InlineLink> to see if your hardware response time is created inconsistency.
                        </FAQAnswer>
                    </div>
                </InfoGrid>
            </InfoSection>

            {/* TIPS SECTION */}
            <InfoSection>
                 <InfoGrid>
                    <div style={{gridColumn: '1 / -1'}}>
                         <InfoTitle style={{justifyContent: 'center'}}>Tips to Get the Best Results</InfoTitle>
                         <InfoGrid style={{marginTop: '40px'}}>
                            <InfoCard>
                                <FAQAnswer>
                                    The single most effective habit is using the same DPI across all your games. When your DPI stays constant, the converter only has one variable to deal with: sensitivity. This keeps your cm/360 stable and your muscle memory development clean. In Windows settings, make sure mouse acceleration is disabled entirely. Set your polling rate to 1000Hz if your mouse supports it.
                                </FAQAnswer>
                            </InfoCard>
                            <InfoCard>
                                <FAQAnswer>
                                    Practice your new sensitivity in Aimlabs or Kovaak's before competitive play, using the same converted value you would use in-game. Avoid changing both DPI and sensitivity at the same time. Stick with your converted settings for at least a few weeks before making changes. You can <InlineLink href="#tool">convert your aim sensitivity</InlineLink> right now and apply it immediately.
                                </FAQAnswer>
                            </InfoCard>
                         </InfoGrid>
                         <CTAContainer>
                             <h3>Ready to lock in your settings?</h3>
                             <p>Once your settings are locked in, you only need a few seconds to get your converted number every time you switch games.</p>
                             <CTAButton href="#tool">Go to Converter Tool</CTAButton>
                         </CTAContainer>
                    </div>
                 </InfoGrid>
            </InfoSection>

            {/* WHO SHOULD USE SECTION */}
            <InfoSection style={{background: '#fff'}}>
                <InfoGrid>
                    <div>
                        <InfoTitle>Who Should Use This Tool</InfoTitle>
                        <FAQAnswer>
                            Competitive and ranked players are the most common users. If you grind ranked in Valorant but also play CS2, Apex Legends, or Warzone on the side, keeping your sensitivity consistent across all of them is what keeps your aim sharp. Every time you play with a different physical mouse distance, you are partially overwriting the muscle memory you built in your main game.
                        </FAQAnswer>
                        <FAQAnswer style={{marginTop: '20px'}}>
                            Streamers and content creators who play multiple titles mid-broadcast benefit just as much. Players upgrading to a new mouse with a different DPI also need this tool to transfer their existing feel cleanly. Controller players switching between PC and console setups can use it to match their rotational sensitivity too. If you use a gamepad, you can <InlineLink href="/joystick-calibration">calibrate your joystick</InlineLink> to make sure your analog stick is reporting accurate position data.
                        </FAQAnswer>
                    </div>
                    <div style={{background: '#f8fafc', padding: '40px', borderRadius: '32px'}}>
                         <p style={{color: '#64748b', lineHeight: 1.8}}>
                            <strong>IDEAL FOR:</strong> This utility is designed for competitive ranked grinders who need precise mechanics across multiple games, multi-title streamers who switch games mid-broadcast, hardware upgraders moving to a new mouse, and hybrid players moving between controller and mouse-and-keyboard setups.
                         </p>
                    </div>
                </InfoGrid>
            </InfoSection>

            {/* FAQ SECTION */}
            <InfoSection>
                <FAQSection>
                     <SectionHeading badge="Support" title="Aiming FAQ" centered />
                     <FAQCard>
                         <FAQQuestion>Does the converter work without knowing my DPI?</FAQQuestion>
                         <FAQAnswer>
                             Yes. You can leave the DPI fields empty and the converter will still calculate a conversion based on your in-game sensitivity values alone. The conversion is less precise without DPI because it cannot calculate your exact cm/360, but it gives you a working starting point.
                         </FAQAnswer>
                     </FAQCard>
                     <FAQCard>
                         <FAQQuestion>Why does my converted sensitivity still not feel right?</FAQQuestion>
                         <FAQAnswer>
                             This is a known issue. FOV differences between games are the most common one — two games with a perfect cm/360 match can still feel slightly different if their default FOV settings vary. Game engine differences in how input polling is handled, and whether aim assist is active, can also contribute.
                         </FAQAnswer>
                     </FAQCard>
                     <FAQCard>
                         <FAQQuestion>What is cm/360 and why does it matter?</FAQQuestion>
                         <FAQAnswer>
                             cm/360 is the physical distance your mouse travels to complete a full 360-degree turn in-game. It is the most reliable metric for comparing sensitivity across different games and hardware because it measures something real and physical.
                         </FAQAnswer>
                     </FAQCard>
                     <FAQCard>
                         <FAQQuestion>Can I convert sensitivity when switching to a new mouse with different DPI?</FAQQuestion>
                         <FAQAnswer>
                             Yes. Enter your current DPI in the source field and your new mouse's DPI in the target field. The tool recalculates your in-game sensitivity value so your physical cm/360 stays the same on the new hardware.
                         </FAQAnswer>
                     </FAQCard>
                     <FAQCard>
                         <FAQQuestion>Does FOV affect my sensitivity conversion?</FAQQuestion>
                         <FAQAnswer>
                             FOV affects how sensitive your game feels visually. A wider FOV makes movement appear slower while a narrower one makes it feel faster. After converting, confirm your in-game FOV settings are similar in both titles.
                         </FAQAnswer>
                     </FAQCard>
                     <FAQCard>
                         <FAQQuestion>Should I disable mouse acceleration before using the converter?</FAQQuestion>
                         <FAQAnswer>
                             Yes, always. Mouse acceleration makes your cursor travel different distances depending on speed, which undermines the predictable linear relationship used in conversion. Disable Enhanced Pointer Precision in Windows Mouse Settings.
                         </FAQAnswer>
                     </FAQCard>
                     <FAQCard>
                         <FAQQuestion>Is the aim sensitivity converter free to use?</FAQQuestion>
                         <FAQAnswer>
                             Yes, the **MyGamepadTester** tool is completely free. There is no account required, no download, and no paywall. Use it in any modern browser for instant results.
                         </FAQAnswer>
                     </FAQCard>
                     <FAQCard>
                         <FAQQuestion>My game isn't listed. What should I do?</FAQQuestion>
                         <FAQAnswer>
                             If your game is missing, try using a title that runs on the same game engine (e.g., Source Engine titles often share yaw values). You can also contact us to request the game be added.
                         </FAQAnswer>
                     </FAQCard>
                </FAQSection>
            </InfoSection>

            <RelatedTools currentPath="/aim-sensitivity-converter" />
        </div>
    );
}
