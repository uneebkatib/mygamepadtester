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

const HapticFeedbackRestored = () => {
    return (
        <PageContainer>
            <Title>Haptic Feedback Testing & Optimization</Title>

            <Paragraph>
                Haptic feedback transforms gaming from visual experience to tactile immersion. From simple rumble to advanced haptic motors, vibration feedback enhances gameplay across all genres. This comprehensive guide teaches you how to test, calibrate, and optimize haptic feedback on <StyledLink href="/ps5-controller-tester">PS5 DualSense</StyledLink>, <StyledLink href="/xbox-controller-tester">Xbox</StyledLink>, and other gaming controllers.
            </Paragraph>

            <Subtitle>Understanding Haptic Technology</Subtitle>

            <Subsection>Traditional Rumble Motors</Subsection>
            <List>
                <li><strong>Technology:</strong> Eccentric rotating mass (ERM) motors</li>
                <li><strong>Used In:</strong> Xbox controllers, older PlayStation controllers, most third-party controllers</li>
                <li><strong>Characteristics:</strong> Simple on/off or variable speed, broad vibration</li>
                <li><strong>Frequency Range:</strong> 50-200 Hz typical</li>
                <li><strong>Advantages:</strong> Reliable, inexpensive, well-understood by developers</li>
                <li><strong>Limitations:</strong> Limited precision, can't create nuanced sensations</li>
            </List>

            <Subsection>Linear Resonant Actuators (LRA)</Subsection>
            <List>
                <li><strong>Technology:</strong> Voice coil actuators with precise control</li>
                <li><strong>Used In:</strong> PS5 DualSense, high-end mobile devices</li>
                <li><strong>Characteristics:</strong> Precise, fast response, wide frequency range</li>
                <li><strong>Frequency Range:</strong> 50-500+ Hz</li>
                <li><strong>Advantages:</strong> Nuanced sensations, lower latency, more efficient</li>
                <li><strong>Capabilities:</strong> Can simulate textures, impacts, environmental effects</li>
            </List>

            <Subsection>HD Rumble (Nintendo Switch)</Subsection>
            <List>
                <li><strong>Technology:</strong> Linear actuators with wide frequency range</li>
                <li><strong>Capabilities:</strong> Simulate ice cubes in glass, ball rolling, subtle textures</li>
                <li><strong>Frequency Range:</strong> 40-1000+ Hz</li>
                <li><strong>Unique Feature:</strong> Can create directional sensations</li>
            </List>

            <Subtitle>PS5 DualSense Haptic Features</Subtitle>

            <Subsection>Advanced Haptic Motors</Subsection>
            <Paragraph>
                The DualSense represents the cutting edge of controller haptics:
            </Paragraph>
            <List>
                <li><strong>Dual Voice Coil Actuators:</strong> Left and right independent control</li>
                <li><strong>Texture Simulation:</strong> Feel sand, mud, grass, ice</li>
                <li><strong>Impact Precision:</strong> Directional feedback for gunfire, explosions</li>
                <li><strong>Environmental Effects:</strong> Rain, wind, water resistance</li>
                <li><strong>Weapon Feedback:</strong> Different feel for each weapon type</li>
            </List>

            <Subsection>Adaptive Triggers</Subsection>
            <List>
                <li><strong>Variable Resistance:</strong> Triggers can resist at specific points</li>
                <li><strong>Bow Simulation:</strong> Feel string tension increasing</li>
                <li><strong>Gun Jamming:</strong> Trigger locks when weapon jams</li>
                <li><strong>Accelerator Pedal:</strong> Feel ABS braking in racing games</li>
                <li><strong>Programmable:</strong> Developers can create custom resistance profiles</li>
            </List>

            <Subtitle>Testing Haptic Feedback</Subtitle>

            <Subsection>Basic Vibration Test</Subsection>
            <List>
                <li><strong>Step 1:</strong> Navigate to controller settings on your console/PC</li>
                <li><strong>Step 2:</strong> Enable vibration at maximum intensity</li>
                <li><strong>Step 3:</strong> Test in a game with strong rumble (racing, shooting)</li>
                <li><strong>Step 4:</strong> Verify both motors vibrate (left and right sides)</li>
                <li><strong>Step 5:</strong> Check for unusual noises, rattling, or weak vibration</li>
            </List>

            <Subsection>Advanced Haptic Testing (PS5)</Subsection>
            <List>
                <li><strong>Astro's Playroom:</strong> Best demo of DualSense capabilities</li>
                <li><strong>Returnal:</strong> Excellent haptic implementation for combat</li>
                <li><strong>Ratchet & Clank:</strong> Varied haptic effects across weapons</li>
                <li><strong>Gran Turismo 7:</strong> Road surface and ABS feedback</li>
                <li><strong>Test For:</strong> Texture variety, directional accuracy, trigger resistance</li>
            </List>

            <Subsection>Adaptive Trigger Testing</Subsection>
            <List>
                <li>Test full range of motion (no resistance to full lock)</li>
                <li>Verify smooth resistance transitions</li>
                <li>Check for clicking, grinding, or sticking</li>
                <li>Test both L2 and R2 independently</li>
                <li>Ensure triggers return to neutral smoothly</li>
            </List>

            <Subtitle>Common Haptic Issues</Subtitle>

            <HighlightBox>
                <Subsection>Weak or No Vibration</Subsection>
                <Paragraph>
                    <strong>Causes:</strong> Disabled in settings, motor failure, loose connection<br />
                    <strong>Solutions:</strong> Check settings, test with different games, inspect for physical damage<br />
                    <strong>DIY Fix:</strong> Open controller, reseat motor connections, replace motor if needed
                </Paragraph>
            </HighlightBox>

            <HighlightBox>
                <Subsection>Unbalanced Vibration</Subsection>
                <Paragraph>
                    <strong>Symptom:</strong> One side vibrates stronger than the other<br />
                    <strong>Causes:</strong> Motor degradation, weight imbalance, damaged motor mount<br />
                    <strong>Solutions:</strong> Replace weaker motor, check for debris in motor housing
                </Paragraph>
            </HighlightBox>

            <HighlightBox>
                <Subsection>Rattling or Buzzing Noise</Subsection>
                <Paragraph>
                    <strong>Causes:</strong> Loose motor mount, debris, worn motor bearings<br />
                    <strong>Solutions:</strong> Tighten motor screws, clean interior, replace motor<br />
                    <strong>Prevention:</strong> Avoid dropping controller, regular maintenance
                </Paragraph>
            </HighlightBox>

            <HighlightBox>
                <Subsection>Adaptive Trigger Malfunction (PS5)</Subsection>
                <Paragraph>
                    <strong>Symptoms:</strong> Trigger stuck, no resistance, grinding feeling<br />
                    <strong>Causes:</strong> Gear damage, motor failure, spring breakage<br />
                    <strong>Solutions:</strong> Disable adaptive triggers in settings, professional repair, replacement
                </Paragraph>
            </HighlightBox>

            <Subtitle>Calibrating Haptic Intensity</Subtitle>

            <Subsection>Finding Your Optimal Settings</Subsection>
            <List>
                <li><strong>Too Strong:</strong> Distracting, tiring during long sessions, drains battery faster</li>
                <li><strong>Too Weak:</strong> Lose immersion, miss important feedback cues</li>
                <li><strong>Just Right:</strong> Noticeable but not distracting, enhances gameplay</li>
            </List>

            <Subsection>Platform-Specific Settings</Subsection>

            <Paragraph><strong>PlayStation 5:</strong></Paragraph>
            <List>
                <li>Settings → Accessories → Controllers → Vibration Intensity (Off / Weak / Medium / Strong)</li>
                <li>Trigger Effect Intensity (Off / Weak / Medium / Strong)</li>
                <li>Recommendation: Medium for most games, Strong for racing/action</li>
            </List>

            <Paragraph><strong>Xbox:</strong></Paragraph>
            <List>
                <li>Settings → Accessibility → Controller → Vibration Settings</li>
                <li>Adjust left and right motors independently (0-100%)</li>
                <li>Recommendation: 70-80% for balanced experience</li>
            </List>

            <Paragraph><strong>PC (Steam):</strong></Paragraph>
            <List>
                <li>Steam → Settings → Controller → General Controller Settings</li>
                <li>Per-game vibration intensity in controller configuration</li>
                <li>Some games have in-game vibration sliders</li>
            </List>

            <Subtitle>Game-Specific Optimization</Subtitle>

            <Subsection>Racing Games</Subsection>
            <List>
                <li><strong>Recommended:</strong> High intensity (80-100%)</li>
                <li><strong>Why:</strong> Road surface feedback crucial for performance</li>
                <li><strong>Focus:</strong> Trigger feedback for braking, rumble for traction loss</li>
            </List>

            <Subsection>First-Person Shooters</Subsection>
            <List>
                <li><strong>Recommended:</strong> Medium intensity (50-70%)</li>
                <li><strong>Why:</strong> Feedback important but shouldn't affect aim</li>
                <li><strong>Focus:</strong> Weapon recoil, damage feedback</li>
            </List>

            <Subsection>Action/Adventure Games</Subsection>
            <List>
                <li><strong>Recommended:</strong> Medium-High (60-80%)</li>
                <li><strong>Why:</strong> Enhances immersion without fatigue</li>
                <li><strong>Focus:</strong> Environmental effects, combat feedback</li>
            </List>

            <Subsection>Competitive Gaming</Subsection>
            <List>
                <li><strong>Recommended:</strong> Low or Off (0-30%)</li>
                <li><strong>Why:</strong> Eliminate distractions, conserve battery</li>
                <li><strong>Note:</strong> Many pro players disable vibration entirely</li>
            </List>

            <Subtitle>Maintaining Haptic Motors</Subtitle>

            <List>
                <li><strong>Avoid Drops:</strong> Impact can damage motors or mounts</li>
                <li><strong>Clean Regularly:</strong> Dust can interfere with motor operation</li>
                <li><strong>Don't Over-Tighten:</strong> When reassembling, finger-tight is sufficient</li>
                <li><strong>Monitor Battery:</strong> Weak batteries can cause erratic vibration</li>
                <li><strong>Update Firmware:</strong> Manufacturers optimize haptic algorithms</li>
            </List>

            <Subtitle>Accessibility Considerations</Subtitle>

            <Paragraph>
                Haptic feedback isn't for everyone. Consider disabling or reducing if you:
            </Paragraph>
            <List>
                <li>Have hand tremors or motor control issues</li>
                <li>Find vibration physically uncomfortable</li>
                <li>Experience fatigue during long sessions</li>
                <li>Need maximum battery life</li>
                <li>Prefer tactile silence for focus</li>
            </List>

            <Subtitle>Future of Haptic Technology</Subtitle>

            <Paragraph>
                Haptic technology continues to evolve:
            </Paragraph>
            <List>
                <li><strong>Ultrasonic Haptics:</strong> Mid-air tactile feedback without contact</li>
                <li><strong>Electrostatic Feedback:</strong> Surface texture simulation on touchpads</li>
                <li><strong>Thermal Feedback:</strong> Temperature changes for immersion</li>
                <li><strong>Localized Haptics:</strong> Precise feedback zones across controller</li>
            </List>

            <Subtitle>Conclusion</Subtitle>
            <Paragraph>
                Haptic feedback is a powerful tool for immersion when properly calibrated. Whether you prefer subtle texture simulation or intense rumble, understanding your controller's haptic capabilities allows you to optimize for your gaming style.
            </Paragraph>

            <Paragraph>
                Test your controller's haptic motors regularly using our <StyledLink href="/">gamepad tester</StyledLink> to ensure they're functioning correctly. Experiment with different intensity settings across various games to find your perfect balance of immersion and comfort.
            </Paragraph>

            <Paragraph>
                Remember: The best haptic settings are personal. Don't be afraid to adjust or even disable vibration if it improves your gaming experience.
            </Paragraph>
        </PageContainer>
    );
};

export default HapticFeedbackRestored;
