'use client'

﻿import React from 'react';
import styled from 'styled-components';
// Helmet removed - use Next.js metadata API
import Link from "next/link";


// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const PageWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #fff;
`;

const ResearchBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #DA7756, #e89e87);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #555;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  font-style: italic;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
  border-top: 2px solid #e5e5e5;
  border-bottom: 2px solid #e5e5e5;
  margin-bottom: 3rem;
  font-size: 0.95rem;
  color: #666;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const MetaItem = styled.div`
  strong {
    color: #DA7756;
    font-weight: 600;
  }
`;

const Content = styled.article`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  
  p {
    margin: 0 0 1.5rem 0;
  }
  
  strong {
    color: #1a1a1a;
    font-weight: 600;
  }
  
  em {
    font-style: italic;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2.5rem 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 3rem 0 1.5rem 0;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: linear-gradient(180deg, #DA7756, #e89e87);
    border-radius: 3px;
  }
`;

const Blockquote = styled.blockquote`
  background: linear-gradient(135deg, rgba(218, 119, 86, 0.05), rgba(232, 158, 135, 0.05));
  border-left: 4px solid #DA7756;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  font-style: italic;
  color: #444;
  border-radius: 0 8px 8px 0;
  
  p {
    margin: 0;
  }
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  
  li {
    padding: 0.8rem 0 0.8rem 2.5rem;
    position: relative;
    line-height: 1.6;
    
    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #DA7756;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;

const PlatformCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  border-left: 5px solid ${props => props.$color || '#DA7756'};
`;

const PlatformTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
`;

const CTABox = styled.div`
  background: linear-gradient(135deg, rgba(218, 119, 86, 0.1), rgba(232, 158, 135, 0.1));
  border: 2px solid #DA7756;
  border-radius: 12px;
  padding: 2rem;
  margin: 2.5rem 0;
  text-align: center;
`;

const CTAText = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 1.5rem 0;
`;

const CTAButton = styled(NextLink)`
  display: inline-block;
  background: linear-gradient(135deg, #DA7756, #e89e87);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 6px 20px rgba(218, 119, 86, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(218, 119, 86, 0.5);
  }
`;

const ExternalLink = styled.a`
  color: #DA7756;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-bottom-color: #DA7756;
  }
`;

const Methodology = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
  border-top: 3px solid #DA7756;
`;

const ContactInfo = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 3rem 0;
  text-align: center;
  
  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 1rem 0;
  }
  
  p {
    color: #666;
    margin: 0.5rem 0;
    font-size: 0.95rem;
  }
  
  a {
    color: #DA7756;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ControllerFailureStudy = () => {
    return (
        <PageWrapper>
            {/* Schema moved to Next.js metadata */}

            <ResearchBadge>📊 Data-Driven Research</ResearchBadge>

            <Title>Why Gamers Are Buying $70 Controllers Every 3 Months</Title>

            <Subtitle>
                Spoiler: It's not by choice. Reddit data reveals a hidden cycle of failure.and why your next pad might be doomed from day one.
            </Subtitle>

            <MetaInfo>
                <MetaItem><strong>Published:</strong> December 2025</MetaItem>
                <MetaItem><strong>Data Source:</strong> Reddit Gaming Communities</MetaItem>
                <MetaItem><strong>Study Period:</strong> 2020-2025</MetaItem>
                <MetaItem><strong>Sample Size:</strong> 748+ Failure Reports</MetaItem>
            </MetaInfo>

            <Content>
                <p>
                    When you unbox a new PS5 DualSense, Xbox Series X controller, or Nintendo Switch Joy-Con, you expect it to last. You're paying $70-80 for precision hardware. But here's the thing: there's a good chance your controller won't make it to its first birthday.
                </p>

                <p>
                    This isn't guesswork. We analyzed over 748 failure reports from Reddit gaming communities between 2020-2025, and the pattern is clear: modern controllers are failing faster than ever.
                </p>

                <SectionTitle>Stick Drift: The Silent Killer</SectionTitle>

                <p>
                    If you've ever watched your character drift off a cliff while your hands are off the controller, you know the frustration. Stick drift is when your analog sticks register movement even when you're not touching them.
                </p>

                <img src="/research/stick-drift-breakdown.jpg" alt="Stick Drift: The #1 Killer - 70-80% of all controller complaints are stick drift related" />

                <p>
                    It's not just annoying.it's the #1 reason controllers fail. Out of all the complaints we analyzed, 70-80% were about stick drift.
                </p>

                <Blockquote>
                    <p>"I barely touched the stick, and my character was sprinting in circles. It's not wear.it's broken out of the box."</p>
                </Blockquote>

                <CTABox>
                    <CTAText>
                        Most people don't notice drift until it ruins a match. Test your controller now.it takes less than a minute and might save you from buying another one.
                    </CTAText>
                    <CTAButton href="/">Test Your Controller Now →</CTAButton>
                </CTABox>

                <SectionTitle>When Do Controllers Actually Fail?</SectionTitle>

                <p>The numbers tell a brutal story. Most controllers don't last long.</p>

                <img src="/research/failure-timeline-zones.jpg" alt="When Controllers Fail - 65-70% fail in first 6 months with detailed breakdown by zone" />

                <BulletList>
                    <li>
                        <strong>0-3 months (15-20%):</strong> These are manufacturing defects. One person got a replacement that "started drifting before I even finished the setup tutorial."
                    </li>
                    <li>
                        <strong>3-6 months (30-35%):</strong> This is the danger zone. Most failures happen here. "After four months, I had to max out the dead zone just to aim," one gamer shared.
                    </li>
                    <li>
                        <strong>6-12 months (35-40%):</strong> By now, you're probably on your second or third controller. "I've replaced mine twice in nine months. At $70 each, this feels like a subscription I never signed up for."
                    </li>
                </BulletList>

                <SectionTitle>Which Controllers Fail the Fastest?</SectionTitle>

                <img src="/research/platform-showdown.jpg" alt="Platform Reliability Comparison - PS5, Xbox, and Nintendo Switch failure rates" />

                <img src="/research/platform-failure-reports.jpg" alt="Controller Failure Reports by Platform - Switch: 312, PS5: 247, Xbox: 189" />

                <PlatformCard $color="#E60012">
                    <PlatformTitle>🎮 Nintendo Switch: The Worst Offender</PlatformTitle>
                    <p>
                        312+ failure reports. Joy-Cons are notorious for drift, with some failing on day one. People report drift "with zero aggressive use" or "straight out of the box."
                    </p>

                    <img src="/research/joycon-drift-epidemic.jpg" alt="Joy-Con Drift: The Epidemic - 312+ reports, worst failure rate" />

                    <Blockquote>
                        <p>"I treated my Joy-Cons like museum artifacts and they still failed in under three months."</p>
                    </Blockquote>

                    <p>
                        The problem got so bad that Nintendo faced class action lawsuits and eventually started offering free repairs.
                    </p>
                </PlatformCard>

                <PlatformCard $color="#0070CC">
                    <PlatformTitle>🎮 PS5 DualSense: Premium Price, Short Lifespan</PlatformTitle>
                    <p>
                        247+ documented failures. The DualSense feels great when it works, but it doesn't work for long. Some units fail in as little as 10 days.
                    </p>

                    <img src="/research/ps5-dualsense-timeline.jpg" alt="PS5 DualSense Failure Timeline - 247+ reports, some replace every 3 months" />

                    <Blockquote>
                        <p>"I bought three controllers in one year. Two overheated while charging. The third drifted within a week."</p>
                    </Blockquote>
                </PlatformCard>

                <PlatformCard $color="#107C10">
                    <PlatformTitle>🎮 Xbox Series X/S: Better, But Not Great</PlatformTitle>
                    <p>
                        189+ failure reports. Xbox controllers last a bit longer than the competition, but they still break way too fast.
                    </p>

                    <img src="/research/xbox-quality-decline.jpg" alt="Xbox Controller Quality Decline - 2013 controller still works, 2023 fails in 6 months" />

                    <Blockquote>
                        <p>"My 10-year-old controller still works. New one died in 6 months."</p>
                    </Blockquote>

                    <p>
                        One person is on their fifth controller since the Series X launched in 2020. Each one lasted about 6 months before the sticks went bad.
                    </p>
                </PlatformCard>

                <SectionTitle>The $280/Year Controller Tax</SectionTitle>

                <p>
                    At $70-80 per controller, this isn't just frustrating.it's expensive. If you're replacing controllers every 3 months, you're spending $280 a year just to keep playing.
                </p>

                <BulletList>
                    <li>
                        <strong>Every 3 months:</strong> $70 �. 4 = $280/year
                    </li>
                    <li>
                        <strong>Every 6 months:</strong> $70 �. 2 = $140/year
                    </li>
                    <li>
                        One person spent £225 ($280) on three DualSense controllers in a single year.
                    </li>
                </BulletList>

                <SectionTitle>It's Not Just Drift</SectionTitle>

                <p>
                    While stick drift gets most of the attention, controllers fail in other ways too:
                </p>

                <BulletList>
                    <li>
                        <strong>Stick Drift:</strong> 70-80% of complaints
                    </li>
                    <li>
                        <strong>Button Failures:</strong> 10-15% (sticky or unresponsive buttons)
                    </li>
                    <li>
                        <strong>Trigger Issues:</strong> 5-10% (broken springs, dead zones)
                    </li>
                    <li>
                        <strong>Connection Problems:</strong> 3-5% (Bluetooth drops, lag)
                    </li>
                    <li>
                        <strong>Complete Failure:</strong> 2-5% (controller just dies)
                    </li>
                </BulletList>

                <SectionTitle>The Worst Cases</SectionTitle>

                <p>
                    Some failures are so fast they're hard to believe:
                </p>

                <PlatformCard $color="#E63946">
                    <PlatformTitle>⚠️ PS5: 10 Days</PlatformTitle>
                    <p>
                        Multiple people reported drift in 10 days. Not months. Days.
                    </p>
                    <Blockquote>
                        <p>"Drift started before I finished my first game. Got a replacement.same thing in two weeks."</p>
                    </Blockquote>
                </PlatformCard>

                <PlatformCard $color="#F4A261">
                    <PlatformTitle>⚠️ Joy-Con: Day One</PlatformTitle>
                    <p>
                        Some Joy-Cons drift right out of the box.
                    </p>
                    <Blockquote>
                        <p>"Opened the package, paired them, left stick was already drifting. Zero gameplay."</p>
                    </Blockquote>
                </PlatformCard>

                <PlatformCard $color="#457B9D">
                    <PlatformTitle>⚠️ Xbox: 5th Controller Since 2020</PlatformTitle>
                    <p>
                        One person has bought five controllers since the Series X launched. Each one lasted 6-9 months.
                    </p>
                    <Blockquote>
                        <p>"I'm on my fifth controller. Every single one develops drift after a few months. This is unacceptable."</p>
                    </Blockquote>
                </PlatformCard>

                <SectionTitle>What's Causing This?</SectionTitle>

                <p>
                    It's not about "mashing buttons too hard." People who baby their controllers still have problems. The issues seem to be:
                </p>

                <BulletList>
                    <li>Cheap potentiometers that wear out fast</li>
                    <li>Dust getting inside and messing with sensors</li>
                    <li>Inconsistent quality control</li>
                </BulletList>

                <p>
                    If your controller is acting weird.characters drifting, buttons not responding, triggers feeling off.you can test it for free at <ExternalLink as={Link} href="/">mygamepadtester.com</ExternalLink>. It shows you exactly what's working and what's not.
                </p>

                <SectionTitle>Bottom Line</SectionTitle>

                <p>
                    Controllers are supposed to be precision tools. When they fail this fast, it's not just annoying.it breaks trust. These aren't cheap accessories. They're $70-80 pieces of hardware that should last more than a few months.
                </p>

                <p>
                    The data is clear. The complaints are real. The pattern is undeniable.
                </p>

                <p>
                    <strong>Will the industry fix this, or keep selling controllers that break?</strong>
                </p>

                <Methodology>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginTop: 0 }}>📋 Methodology</h3>
                    <p style={{ marginBottom: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
                        This research analyzed 748+ user-reported controller failures from Reddit gaming communities between 2020-2025.
                        Data includes failure timelines, platform distribution, and symptom descriptions.
                        While not a controlled scientific study, the volume and consistency of reports reveal clear patterns.
                    </p>
                </Methodology>

                <ContactInfo>
                    <h3>📧 Contact & Inquiries</h3>
                    <p>For questions, additional data, or media inquiries:</p>
                    <p><a href="mailto:uneebkatib@mygamepadtester.com">uneebkatib@mygamepadtester.com</a></p>
                    <p><a href="mailto:uneebkatib@gmail.com">uneebkatib@gmail.com</a></p>
                </ContactInfo>

                <CTABox>
                    <CTAText style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                        Don't let drift ruin your gaming
                    </CTAText>
                    <CTAText>
                        Test your controller in under 60 seconds.free, no installation.
                    </CTAText>
                    <CTAButton href="/">Test Your Controller Free →</CTAButton>
                </CTABox>
            </Content>
        </PageWrapper>
    );
};

export default ControllerFailureStudy;

