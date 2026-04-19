'use client'
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(26, 26, 26, 0.95);
  border-radius: 16px;
  color: #FAF9F5;
  line-height: 1.8;
  @media (max-width: 768px) { padding: 1.5rem; }
`;

const Title = styled.h1`
  color: #DA7756;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #DA7756;
  padding-bottom: 1rem;
  @media (max-width: 768px) { font-size: 2rem; }
`;

const Subtitle = styled.h2`
  color: #DA7756;
  font-size: 1.8rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid #DA7756;
  padding-left: 1rem;
`;

const Subsection = styled.h3`
  color: #FAF9F5;
  font-size: 1.4rem;
  margin-top: 2rem;
  margin-bottom: 0.8rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #E0E0E0;
`;

const HighlightBox = styled.div`
  background: rgba(218, 119, 86, 0.1);
  border-left: 4px solid #DA7756;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
`;

const List = styled.ul`
  margin: 1.5rem 0;
  padding-left: 2rem;
  li {
    margin-bottom: 1rem;
    font-size: 1.05rem;
    color: #E0E0E0;
    strong { color: #DA7756; }
  }
`;

const StyledLink = styled(Link)`
  color: #DA7756;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  &:hover {
    color: #FF9A76;
    text-decoration: underline;
  }
`;

const LatencyComparisonRestored = () => {
    return (
        <PageContainer>
            <Title>Wireless vs Wired Controller Latency Analysis</Title>

            <Paragraph>
                Input latency is the invisible enemy of competitive gaming. The delay between pressing a button and seeing the action on screen can mean the difference between victory and defeat. This comprehensive guide analyzes wireless vs wired controller latency, helping you make informed decisions for optimal gaming performance on <StyledLink href="/ps5-controller-tester">PS5</StyledLink>, <StyledLink href="/xbox-controller-tester">Xbox</StyledLink>, and PC platforms.
            </Paragraph>

            <Subtitle>Understanding Controller Input Latency</Subtitle>
            <Paragraph>
                Input latency (also called input lag) is the total time delay from when you press a button to when the corresponding action appears on your screen. This delay consists of several components:
            </Paragraph>

            <List>
                <li><strong>Controller Processing:</strong> Time for the controller to register and process your input (1-3ms)</li>
                <li><strong>Transmission Delay:</strong> Time to send the signal to the console/PC (varies by connection type)</li>
                <li><strong>System Processing:</strong> Console or PC processes the input and updates the game state (2-8ms)</li>
                <li><strong>Rendering Delay:</strong> GPU renders the new frame (depends on frame rate)</li>
                <li><strong>Display Lag:</strong> Monitor or TV displays the frame (1-30ms depending on display)</li>
            </List>

            <HighlightBox>
                <Subsection>Total Input Latency Formula</Subsection>
                <Paragraph>
                    <strong>Total Latency = Controller Processing + Transmission + System Processing + Rendering + Display Lag</strong>
                </Paragraph>
                <Paragraph>
                    For competitive gaming, aim for total latency under 50ms. Professional esports players can detect differences as small as 10-15ms.
                </Paragraph>
            </HighlightBox>

            <Subtitle>Wired Controller Latency</Subtitle>

            <Subsection>USB Connection Types</Subsection>
            <List>
                <li><strong>USB 2.0:</strong> 1000Hz polling rate, ~1ms transmission delay</li>
                <li><strong>USB 3.0/3.1:</strong> Up to 8000Hz polling rate, ~0.125ms transmission delay</li>
                <li><strong>Professional Gaming Controllers:</strong> Often use 1000Hz polling for consistency</li>
            </List>

            <Paragraph>
                Wired connections provide the most consistent and lowest latency. USB communication is direct and deterministic, with minimal variation between measurements.
            </Paragraph>

            <HighlightBox>
                <strong>Typical Wired Controller Latency:</strong>
                <List>
                    <li>Standard Controllers (USB 2.0): 4-8ms total</li>
                    <li>Professional Gaming Controllers: 2-4ms total</li>
                    <li>High-End Tournament Controllers: 1-3ms total</li>
                </List>
            </HighlightBox>

            <Subsection>Advantages of Wired Connection</Subsection>
            <List>
                <li><strong>Lowest Latency:</strong> Direct USB connection minimizes transmission delay</li>
                <li><strong>Consistency:</strong> No wireless interference or signal degradation</li>
                <li><strong>No Battery Concerns:</strong> Unlimited playtime without charging</li>
                <li><strong>Reliability:</strong> No connection drops or pairing issues</li>
                <li><strong>Tournament Standard:</strong> Required in most esports competitions</li>
            </List>

            <Subsection>Disadvantages of Wired Connection</Subsection>
            <List>
                <li><strong>Cable Management:</strong> Wires can be restrictive and tangled</li>
                <li><strong>Limited Range:</strong> Restricted by cable length (typically 6-10 feet)</li>
                <li><strong>Wear and Tear:</strong> USB ports and cables can degrade over time</li>
                <li><strong>Less Comfortable:</strong> Cable tension can affect ergonomics</li>
            </List>

            <Subtitle>Wireless Controller Latency</Subtitle>

            <Subsection>2.4GHz Wireless (Proprietary)</Subsection>
            <Paragraph>
                Modern gaming controllers use proprietary 2.4GHz wireless protocols optimized for low latency:
            </Paragraph>
            <List>
                <li><strong>Xbox Wireless:</strong> 8-12ms latency (Microsoft's proprietary protocol)</li>
                <li><strong>PS5 DualSense Wireless:</strong> 8-15ms latency (Sony's protocol)</li>
                <li><strong>Nintendo Switch Pro:</strong> 10-18ms latency</li>
                <li><strong>Professional Wireless Controllers:</strong> 6-10ms latency</li>
            </List>

            <Subsection>Bluetooth Connection</Subsection>
            <Paragraph>
                Bluetooth is a universal standard but wasn't designed for gaming:
            </Paragraph>
            <List>
                <li><strong>Bluetooth 4.x:</strong> 15-30ms latency</li>
                <li><strong>Bluetooth 5.0+:</strong> 10-20ms latency (improved but still higher than proprietary wireless)</li>
                <li><strong>Bluetooth LE:</strong> 8-15ms latency (Low Energy mode, used in some modern controllers)</li>
            </List>

            <HighlightBox>
                <Subsection>Why Bluetooth Has Higher Latency</Subsection>
                <List>
                    <li>Designed for power efficiency, not speed</li>
                    <li>More complex pairing and encryption protocols</li>
                    <li>Shares 2.4GHz spectrum with WiFi and other devices</li>
                    <li>Variable polling rates (not optimized for gaming)</li>
                </List>
            </HighlightBox>

            <Subsection>Advantages of Wireless Connection</Subsection>
            <List>
                <li><strong>Freedom of Movement:</strong> No cable restrictions, play from anywhere in room</li>
                <li><strong>Convenience:</strong> No cable management or tangling</li>
                <li><strong>Comfort:</strong> More natural hand positioning without cable tension</li>
                <li><strong>Couch Gaming:</strong> Ideal for living room setups</li>
                <li><strong>Modern Features:</strong> Many wireless controllers have advanced haptics and adaptive triggers</li>
            </List>

            <Subsection>Disadvantages of Wireless Connection</Subsection>
            <List>
                <li><strong>Higher Latency:</strong> 5-15ms additional delay vs wired</li>
                <li><strong>Interference:</strong> WiFi, microwaves, other 2.4GHz devices can cause lag spikes</li>
                <li><strong>Battery Life:</strong> Need to recharge or replace batteries</li>
                <li><strong>Connection Issues:</strong> Occasional pairing problems or dropouts</li>
                <li><strong>Range Limitations:</strong> Signal degrades with distance and obstacles</li>
            </List>

            <Subtitle>Latency Testing Methodology</Subtitle>

            <Subsection>Professional Testing Setup</Subsection>
            <List>
                <li><strong>High-Speed Camera:</strong> 240fps or higher to capture frame-accurate timing</li>
                <li><strong>LED Indicator:</strong> Lights up when button is pressed</li>
                <li><strong>Screen Recording:</strong> Capture on-screen response</li>
                <li><strong>Frame Counting:</strong> Count frames between button press and screen response</li>
                <li><strong>Multiple Trials:</strong> Test 50-100 times for statistical accuracy</li>
            </List>

            <Subsection>DIY Testing Method</Subsection>
            <Paragraph>
                You can test latency at home using our <StyledLink href="/controller-input-tester">Controller Input Tester</StyledLink>:
            </Paragraph>
            <List>
                <li>Connect controller (wired or wireless)</li>
                <li>Use smartphone camera at 240fps or higher</li>
                <li>Record button press and on-screen response</li>
                <li>Count frames: (Frames ÷ FPS) × 1000 = Latency in ms</li>
                <li>Repeat 10+ times and calculate average</li>
            </List>

            <Subtitle>Real-World Latency Comparison</Subtitle>

            <HighlightBox>
                <Subsection>PlayStation 5 DualSense</Subsection>
                <List>
                    <li><strong>USB-C Wired:</strong> 4-6ms average latency</li>
                    <li><strong>Wireless (Proprietary):</strong> 10-14ms average latency</li>
                    <li><strong>Bluetooth:</strong> 18-25ms average latency</li>
                    <li><strong>Recommendation:</strong> Use wired for competitive FPS, wireless acceptable for single-player</li>
                </List>
            </HighlightBox>

            <HighlightBox>
                <Subsection>Xbox Series X/S Controller</Subsection>
                <List>
                    <li><strong>USB-C Wired:</strong> 5-7ms average latency</li>
                    <li><strong>Xbox Wireless:</strong> 8-12ms average latency</li>
                    <li><strong>Bluetooth:</strong> 15-22ms average latency</li>
                    <li><strong>Recommendation:</strong> Xbox Wireless is excellent, very close to wired performance</li>
                </List>
            </HighlightBox>

            <HighlightBox>
                <Subsection>Nintendo Switch Pro Controller</Subsection>
                <List>
                    <li><strong>USB-C Wired:</strong> 6-9ms average latency</li>
                    <li><strong>Switch Wireless:</strong> 12-18ms average latency</li>
                    <li><strong>Bluetooth (PC):</strong> 20-28ms average latency</li>
                    <li><strong>Recommendation:</strong> Wired for competitive Smash Bros, wireless fine for casual play</li>
                </List>
            </HighlightBox>

            <Subtitle>Game-Specific Latency Requirements</Subtitle>

            <Subsection>Fighting Games (Street Fighter, Mortal Kombat)</Subsection>
            <Paragraph>
                <strong>Requirement:</strong> Ultra-low latency (&lt;10ms total)<br />
                <strong>Recommendation:</strong> Always use wired connection<br />
                <strong>Why:</strong> Frame-perfect inputs require absolute minimum latency
            </Paragraph>

            <Subsection>First-Person Shooters (Call of Duty, Apex Legends)</Subsection>
            <Paragraph>
                <strong>Requirement:</strong> Very low latency (&lt;15ms total)<br />
                <strong>Recommendation:</strong> Wired preferred, high-quality wireless acceptable<br />
                <strong>Why:</strong> Quick reactions and precise aim benefit from low latency
            </Paragraph>

            <Subsection>Battle Royale (Fortnite, PUBG)</Subsection>
            <Paragraph>
                <strong>Requirement:</strong> Low latency (&lt;20ms total)<br />
                <strong>Recommendation:</strong> Wireless acceptable, wired for tournaments<br />
                <strong>Why:</strong> Longer engagement times make small latency differences less critical
            </Paragraph>

            <Subsection>Racing Games (Forza, Gran Turismo)</Subsection>
            <Paragraph>
                <strong>Requirement:</strong> Low latency (&lt;20ms total)<br />
                <strong>Recommendation:</strong> Wired for time trials, wireless acceptable for casual racing<br />
                <strong>Why:</strong> Precise steering inputs benefit from low latency
            </Paragraph>

            <Subsection>RPGs & Adventure Games</Subsection>
            <Paragraph>
                <strong>Requirement:</strong> Moderate latency (&lt;30ms acceptable)<br />
                <strong>Recommendation:</strong> Wireless perfectly fine<br />
                <strong>Why:</strong> Turn-based or slower-paced gameplay isn't latency-sensitive
            </Paragraph>

            <Subtitle>Optimizing Wireless Latency</Subtitle>

            <Subsection>Reduce Wireless Interference</Subsection>
            <List>
                <li><strong>Clear Line of Sight:</strong> Remove obstacles between controller and receiver</li>
                <li><strong>Minimize 2.4GHz Devices:</strong> Turn off unnecessary WiFi devices, Bluetooth speakers</li>
                <li><strong>Use 5GHz WiFi:</strong> Switch router to 5GHz band to free up 2.4GHz spectrum</li>
                <li><strong>Optimal Distance:</strong> Stay within 6-8 feet of receiver for best performance</li>
                <li><strong>USB Extension:</strong> Move wireless receiver closer to controller using USB extension cable</li>
            </List>

            <Subsection>Controller Firmware Updates</Subsection>
            <Paragraph>
                Manufacturers regularly release firmware updates that improve wireless performance:
            </Paragraph>
            <List>
                <li><strong>PS5:</strong> Update via Settings → Accessories → Controllers</li>
                <li><strong>Xbox:</strong> Use Xbox Accessories app on console or PC</li>
                <li><strong>PC:</strong> Check manufacturer websites for firmware update tools</li>
            </List>

            <Subtitle>When to Choose Wired vs Wireless</Subtitle>

            <HighlightBox>
                <Subsection>Choose Wired If:</Subsection>
                <List>
                    <li>You play competitive multiplayer games</li>
                    <li>You participate in esports or tournaments</li>
                    <li>You play fighting games or rhythm games</li>
                    <li>You want absolute minimum latency</li>
                    <li>You experience wireless interference issues</li>
                    <li>You don't mind cable management</li>
                </List>
            </HighlightBox>

            <HighlightBox>
                <Subsection>Choose Wireless If:</Subsection>
                <List>
                    <li>You play primarily single-player games</li>
                    <li>You game from a couch or far from screen</li>
                    <li>You value comfort and freedom of movement</li>
                    <li>You play casual or slower-paced games</li>
                    <li>You have a clean 2.4GHz environment</li>
                    <li>You use modern controllers with low-latency wireless</li>
                </List>
            </HighlightBox>

            <Subtitle>Hybrid Approach: Best of Both Worlds</Subtitle>
            <Paragraph>
                Many competitive gamers use a hybrid approach:
            </Paragraph>
            <List>
                <li><strong>Competitive Sessions:</strong> Wired connection for ranked matches and tournaments</li>
                <li><strong>Casual Play:</strong> Wireless for single-player games and relaxed gaming</li>
                <li><strong>Multiple Controllers:</strong> Keep one wired controller for competitive play</li>
                <li><strong>Quick Switch:</strong> Modern controllers support hot-swapping between wired and wireless</li>
            </List>

            <Subtitle>Conclusion</Subtitle>
            <Paragraph>
                The wireless vs wired latency debate doesn't have a one-size-fits-all answer. Wired connections offer the lowest latency (4-8ms) and are essential for competitive gaming, while modern wireless technology (8-15ms) has improved dramatically and is perfectly acceptable for most gaming scenarios.
            </Paragraph>

            <Paragraph>
                Test your controller's latency using our <StyledLink href="/">free gamepad tester</StyledLink> and make an informed decision based on your gaming needs. For competitive play, wired is still king. For casual gaming and comfort, wireless has never been better.
            </Paragraph>

            <Paragraph>
                Remember: The best connection is the one that matches your gaming style and priorities. Don't let latency anxiety ruin your enjoyment if you're not competing at the highest levels.
            </Paragraph>
        </PageContainer>
    );
};

export default LatencyComparisonRestored;
