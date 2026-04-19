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

const DeadzoneTuningRestored = () => {
    return (
        <PageContainer>
            <Title>Controller Deadzone Optimization Guide</Title>

            <Paragraph>
                Deadzone tuning is one of the most impactful yet overlooked optimizations for competitive gaming. Properly configured deadzones eliminate unwanted <StyledLink href="/stick-drift-test">stick drift</StyledLink>, improve aim precision, and provide better control in fast-paced games. This comprehensive guide teaches you professional techniques to optimize deadzones on <StyledLink href="/ps5-controller-tester">PS5</StyledLink>, <StyledLink href="/xbox-controller-tester">Xbox</StyledLink>, and PC controllers.
            </Paragraph>

            <Subtitle>What is Controller Deadzone?</Subtitle>
            <Paragraph>
                A deadzone is the range of joystick movement near the center position where no input is registered. Think of it as a "dead" or unresponsive zone. Deadzones exist for two important reasons:
            </Paragraph>

            <List>
                <li><strong>Prevent Stick Drift:</strong> Compensate for minor mechanical imperfections that cause unwanted movement</li>
                <li><strong>Provide Neutral Zone:</strong> Give players a resting position without accidental inputs</li>
                <li><strong>Account for Wear:</strong> Accommodate joystick degradation over time</li>
            </List>

            <HighlightBox>
                <Subsection>The Deadzone Dilemma</Subsection>
                <Paragraph>
                    <strong>Too Large:</strong> Requires more stick movement to register input, reducing responsiveness and precision<br />
                    <strong>Too Small:</strong> May not fully eliminate drift, causing unwanted character/camera movement<br />
                    <strong>Just Right:</strong> Eliminates drift while maintaining maximum responsiveness
                </Paragraph>
            </HighlightBox>

            <Subtitle>Types of Deadzones</Subtitle>

            <Subsection>1. Axial Deadzone (Most Common)</Subsection>
            <Paragraph>
                Applies deadzone independently to X and Y axes. Creates a square or cross-shaped dead area. This is the default in most games.
            </Paragraph>
            <List>
                <li><strong>Pros:</strong> Simple to implement, works well for most scenarios</li>
                <li><strong>Cons:</strong> Diagonal movements may feel different than cardinal directions</li>
            </List>

            <Subsection>2. Radial Deadzone (Circular)</Subsection>
            <Paragraph>
                Creates a circular dead zone from the center point. Provides more consistent feel in all directions.
            </Paragraph>
            <List>
                <li><strong>Pros:</strong> Uniform response in all directions, better for precise aiming</li>
                <li><strong>Cons:</strong> May not fully eliminate drift if it's stronger on one axis</li>
            </List>

            <Subsection>3. Hybrid Deadzone</Subsection>
            <Paragraph>
                Combines axial and radial approaches. Used in professional gaming controllers and advanced game settings.
            </Paragraph>

            <Subtitle>How to Measure Your Current Deadzone</Subtitle>
            <Paragraph>
                Before optimizing, you need to know your starting point. Use our <StyledLink href="/joystick-calibration">Joystick Calibration Tool</StyledLink> to:
            </Paragraph>

            <List>
                <li><strong>Step 1:</strong> Connect your controller and navigate to the calibration tool</li>
                <li><strong>Step 2:</strong> Release both joysticks and observe the center position values</li>
                <li><strong>Step 3:</strong> Gently move each stick in small circles near center</li>
                <li><strong>Step 4:</strong> Note the minimum movement required before values change</li>
                <li><strong>Step 5:</strong> Check for drift by monitoring values with hands-off</li>
            </List>

            <HighlightBox>
                <strong>Typical Deadzone Values:</strong>
                <List>
                    <li>New Controllers: 5-10% deadzone</li>
                    <li>Worn Controllers: 15-25% deadzone</li>
                    <li>Competitive Gaming: 3-8% deadzone (if no drift)</li>
                    <li>Controllers with Drift: 20-30% deadzone</li>
                </List>
            </HighlightBox>

            <Subtitle>Deadzone Optimization for Different Game Types</Subtitle>

            <Subsection>First-Person Shooters (FPS)</Subsection>
            <Paragraph>
                FPS games demand precise aiming and quick camera movements. Optimal deadzone settings:
            </Paragraph>
            <List>
                <li><strong>Right Stick (Aim):</strong> 3-6% for maximum precision</li>
                <li><strong>Left Stick (Movement):</strong> 8-12% (less critical than aim)</li>
                <li><strong>Priority:</strong> Minimize right stick deadzone as much as possible without drift</li>
                <li><strong>Games:</strong> Call of Duty, Apex Legends, Valorant, Overwatch</li>
            </List>

            <Subsection>Battle Royale Games</Subsection>
            <List>
                <li><strong>Balanced Approach:</strong> 5-10% on both sticks</li>
                <li><strong>Consideration:</strong> Long play sessions mean comfort matters</li>
                <li><strong>Games:</strong> Fortnite, PUBG, Warzone</li>
            </List>

            <Subsection>Racing Games</Subsection>
            <List>
                <li><strong>Steering Precision:</strong> 2-5% deadzone for fine control</li>
                <li><strong>Throttle/Brake:</strong> Depends on trigger deadzone settings</li>
                <li><strong>Games:</strong> Forza, Gran Turismo, F1</li>
            </List>

            <Subsection>Sports & Fighting Games</Subsection>
            <List>
                <li><strong>Larger Deadzones:</strong> 10-15% to prevent accidental inputs</li>
                <li><strong>Precision Less Critical:</strong> Discrete movements more important than analog precision</li>
                <li><strong>Games:</strong> FIFA, NBA 2K, Street Fighter, Mortal Kombat</li>
            </List>

            <Subtitle>Step-by-Step Deadzone Tuning Process</Subtitle>

            <Subsection>Phase 1: Baseline Testing</Subsection>
            <List>
                <li>Test controller with our <StyledLink href="/stick-drift-test">Stick Drift Detector</StyledLink></li>
                <li>Document any existing drift (direction and magnitude)</li>
                <li>Note current in-game deadzone settings</li>
                <li>Record your current aim performance (accuracy stats if available)</li>
            </List>

            <Subsection>Phase 2: Incremental Adjustment</Subsection>
            <List>
                <li><strong>Start Conservative:</strong> Begin with manufacturer recommended settings</li>
                <li><strong>Reduce Gradually:</strong> Lower deadzone by 1-2% at a time</li>
                <li><strong>Test Between Changes:</strong> Play for 10-15 minutes after each adjustment</li>
                <li><strong>Monitor for Drift:</strong> Watch for unwanted movement in menus or idle moments</li>
            </List>

            <Subsection>Phase 3: Fine-Tuning</Subsection>
            <List>
                <li><strong>Find the Threshold:</strong> Reduce until you notice slight drift, then increase by 1-2%</li>
                <li><strong>Test Under Stress:</strong> Rapid movements can reveal issues not apparent in slow testing</li>
                <li><strong>Consider Fatigue:</strong> Settings that work fresh may cause issues after hours of play</li>
                <li><strong>Document Final Settings:</strong> Save your optimal configuration</li>
            </List>

            <Subtitle>Platform-Specific Deadzone Settings</Subtitle>

            <Subsection>PlayStation 5 (DualSense)</Subsection>
            <Paragraph>
                PS5 controllers generally have excellent build quality with minimal drift when new. Recommended settings:
            </Paragraph>
            <List>
                <li><strong>System Level:</strong> No native deadzone adjustment in PS5 settings</li>
                <li><strong>In-Game:</strong> Most PS5 games offer deadzone sliders (check Options → Controls)</li>
                <li><strong>Optimal Range:</strong> 4-8% for new controllers</li>
                <li><strong>Drift Issues:</strong> If experiencing drift, test with our <StyledLink href="/ps5-controller-tester">PS5 Controller Tester</StyledLink></li>
            </List>

            <Subsection>Xbox Series X/S & Xbox One</Subsection>
            <List>
                <li><strong>Xbox Accessories App:</strong> Allows deadzone customization for Elite controllers</li>
                <li><strong>Standard Controllers:</strong> Rely on in-game settings</li>
                <li><strong>Optimal Range:</strong> 5-10% for standard controllers</li>
                <li><strong>Elite Controllers:</strong> Can go as low as 0-3% with proper calibration</li>
            </List>

            <Subsection>PC Gaming</Subsection>
            <Paragraph>
                PC offers the most flexibility for deadzone customization:
            </Paragraph>
            <List>
                <li><strong>Steam Input:</strong> Built-in deadzone settings for all controllers</li>
                <li><strong>DS4Windows:</strong> Advanced deadzone options for PlayStation controllers</li>
                <li><strong>reWASD:</strong> Professional-grade remapping with custom deadzone curves</li>
                <li><strong>Game-Specific:</strong> Many PC games have extensive deadzone options</li>
            </List>

            <Subtitle>Advanced Deadzone Techniques</Subtitle>

            <Subsection>Response Curves</Subsection>
            <Paragraph>
                Beyond simple deadzone adjustment, response curves change how stick deflection translates to in-game movement:
            </Paragraph>
            <List>
                <li><strong>Linear:</strong> Direct 1:1 relationship (default)</li>
                <li><strong>Exponential:</strong> Slow near center, fast at edges (better for precise aiming)</li>
                <li><strong>Aggressive:</strong> Fast near center, slower at edges (quick turns, fine aim)</li>
                <li><strong>Custom Curves:</strong> Available in professional controller software</li>
            </List>

            <Subsection>Per-Axis Tuning</Subsection>
            <Paragraph>
                Some advanced tools allow different deadzones for X and Y axes:
            </Paragraph>
            <List>
                <li><strong>Use Case:</strong> If drift is stronger on one axis</li>
                <li><strong>Horizontal Aim:</strong> Often benefits from smaller deadzone</li>
                <li><strong>Vertical Aim:</strong> May need larger deadzone to prevent vertical drift</li>
            </List>

            <Subtitle>Troubleshooting Common Deadzone Issues</Subtitle>

            <HighlightBox>
                <Subsection>Problem: Aim Feels Sluggish</Subsection>
                <Paragraph>
                    <strong>Cause:</strong> Deadzone too large<br />
                    <strong>Solution:</strong> Reduce deadzone by 2-3%, test in-game<br />
                    <strong>Alternative:</strong> Increase look sensitivity to compensate
                </Paragraph>
            </HighlightBox>

            <HighlightBox>
                <Subsection>Problem: Character Drifts in Menus</Subsection>
                <Paragraph>
                    <strong>Cause:</strong> Deadzone too small or controller has drift<br />
                    <strong>Solution:</strong> Increase deadzone by 2-3%<br />
                    <strong>Long-term:</strong> Consider <StyledLink href="/stick-drift-test">testing for hardware issues</StyledLink>
                </Paragraph>
            </HighlightBox>

            <HighlightBox>
                <Subsection>Problem: Inconsistent Aim Performance</Subsection>
                <Paragraph>
                    <strong>Cause:</strong> Deadzone at threshold of drift<br />
                    <strong>Solution:</strong> Increase by 1-2% for stability<br />
                    <strong>Note:</strong> Slight performance loss is better than unpredictability
                </Paragraph>
            </HighlightBox>

            <Subtitle>Maintaining Optimal Deadzones Over Time</Subtitle>
            <Paragraph>
                Controllers degrade with use. Joystick mechanisms wear, springs weaken, and drift becomes more common. Here's how to maintain optimal performance:
            </Paragraph>

            <List>
                <li><strong>Monthly Testing:</strong> Use our <StyledLink href="/joystick-calibration">calibration tool</StyledLink> to check for changes</li>
                <li><strong>Gradual Increases:</strong> As controller ages, you may need to increase deadzones by 1-2% every few months</li>
                <li><strong>Cleaning:</strong> Compressed air can remove dust that causes drift</li>
                <li><strong>Replacement Timeline:</strong> Competitive players often replace controllers every 6-12 months</li>
                <li><strong>Backup Controllers:</strong> Keep a spare with known-good settings for important matches</li>
            </List>

            <Subtitle>Professional Player Deadzone Settings</Subtitle>
            <Paragraph>
                Here are deadzone settings used by professional esports players (note: these require controllers in excellent condition):
            </Paragraph>

            <List>
                <li><strong>FPS Pros:</strong> 3-5% right stick, 8-10% left stick</li>
                <li><strong>Battle Royale Pros:</strong> 5-8% both sticks</li>
                <li><strong>Racing Pros:</strong> 2-4% steering stick</li>
                <li><strong>Important:</strong> These settings assume minimal to no stick drift</li>
            </List>

            <Subtitle>Conclusion</Subtitle>
            <Paragraph>
                Deadzone optimization is a critical yet often neglected aspect of competitive gaming setup. By understanding deadzone mechanics, testing your controller regularly, and fine-tuning settings for your specific games and playstyle, you can achieve better aim, faster response times, and more consistent performance.
            </Paragraph>

            <Paragraph>
                Start by testing your controller's current state with our <StyledLink href="/">free gamepad tester</StyledLink>, then use the techniques in this guide to find your optimal deadzone settings. Remember: the best settings are the ones that work for YOUR controller and YOUR playstyle.
            </Paragraph>
        </PageContainer>
    );
};

export default DeadzoneTuningRestored;
