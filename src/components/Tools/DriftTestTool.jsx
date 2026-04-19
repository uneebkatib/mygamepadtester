'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const DriftTestWrapper = styled.div`
  width: 100%;
  max-width: 1150px;
  margin: 1rem auto;
  padding: 1.5rem;
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border-radius: 20px;
  border: 3px solid ${Theme.primary};
  box-shadow: 0 8px 32px ${Theme.shadowMedium};

  @media (max-width: 600px) {
    padding: 1rem;
    margin: 0.5rem auto;
    border-radius: 12px;
    border-width: 2px;
  }
`;

const Title = styled.h2`
  color: ${Theme.primary};
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.75rem;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  border-radius: 0 0 1rem 1rem;
  font-size: 1.1rem;
  background-color: ${Theme.interface};
  width: fit-content;
  margin: 0 auto 1.5rem;
  flex-wrap: nowrap;
  min-height: 60px;
  list-style: none;
  padding: 0;
  gap: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 600px) {
    width: 100%;
    border-radius: 0 0 0.75rem 0.75rem;
    font-size: 0.9rem;
  }
`;

const TabButton = styled.button`
  width: 11rem;
  padding: 1rem;
  box-sizing: border-box;
  color: ${props => props.$active ? Theme.primary : Theme.logo};
  min-height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  border-right: 1px solid ${Theme.border};
  background: ${props => props.$active ? Theme.backgroundLight : 'transparent'};
  border-bottom: ${props => props.$active ? `5px solid ${Theme.primary}` : 'none'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: inherit;
  font-family: inherit;
  font-weight: 600;
  flex-shrink: 0;
  
  &:last-child {
    border-right: none;
  }
  
  &:hover {
    background: ${Theme.backgroundLight};
  }

  @media (max-width: 600px) {
    width: auto;
    min-width: 5.5rem;
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
    border-bottom: ${props => props.$active ? `3px solid ${Theme.primary}` : 'none'};
  }
`;

const StyledConnected = styled.p`
  color: ${Theme.connected};
  font-size: 0.9rem;
  margin-top: 0.3rem;
  min-height: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 10rem;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    max-width: 5rem;
  }
`;

const StyledNotFound = styled.p`
  color: ${Theme.disconnected};
  font-size: 0.9rem;
  margin-top: 0.3rem;
  min-height: 1.2rem;

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const ModeToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ModeButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  border: 2px solid ${props => props.$active ? Theme.primary : Theme.border};
  background: ${props => props.$active ? Theme.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : Theme.textPrimary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${Theme.primary};
    background: ${props => props.$active ? Theme.primary : Theme.backgroundLight};
  }
`;

const VisualizationArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1rem 0;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StickSection = styled.div`
  text-align: center;
`;

const StickLabel = styled.h3`
  text-align: center;
  color: ${Theme.primary};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const StickContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 180px;
  margin: 0 auto;
  background: ${Theme.background};
  border-radius: 50%;
  border: 2px solid ${props => props.$severity === 'severe' ? '#dc3545' :
    props.$severity === 'moderate' ? '#fd7e14' :
      props.$severity === 'minor' ? '#ffc107' : `${Theme.primary}40`};
  
  &::before {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px dashed ${Theme.primary}40;
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${Theme.primary};
    border-radius: 50%;
  }
`;

const StickIndicator = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.$isDrifting ?
    'linear-gradient(135deg, #ff4444, #ff6666)' :
    `linear-gradient(135deg, ${Theme.primary}, ${Theme.accent})`};
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transform: translate(-50%, -50%);
  transition: background 0.2s ease;
`;

const TrailDot = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${Theme.primary}40;
  transform: translate(-50%, -50%);
`;

const StickValues = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  font-family: monospace;
  font-size: 0.85rem;
  color: ${Theme.textPrimary};
  
  span {
    display: inline-block;
    margin: 0 0.3rem;
    padding: 0.2rem 0.5rem;
    background: ${Theme.surface};
    border-radius: 4px;
    border: 1px solid ${Theme.border};
  }
`;

const ResultsPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

const ResultCard = styled.div`
  padding: 1rem;
  background: ${Theme.surface};
  border-radius: 12px;
  border-left: 4px solid ${props => props.$color || Theme.primary};
  text-align: center;
  
  h4 {
    color: ${Theme.textSecondary};
    font-size: 0.75rem;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  p {
    color: ${props => props.$color || Theme.primary};
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0;
  }
  
  small {
    color: ${Theme.textSecondary};
    font-size: 0.7rem;
  }
`;

const SeverityBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  margin: 1rem 0;
  background: ${props => {
    if (props.$severity === 'perfect') return 'linear-gradient(135deg, #28a745, #20c997)';
    if (props.$severity === 'minor') return 'linear-gradient(135deg, #ffc107, #ffdb4d)';
    if (props.$severity === 'moderate') return 'linear-gradient(135deg, #fd7e14, #ff922b)';
    return 'linear-gradient(135deg, #dc3545, #ff6b6b)';
  }};
  color: ${props => props.$severity === 'minor' ? '#333' : 'white'};
`;

const CalibrationGuide = styled.div`
  background: linear-gradient(135deg, ${Theme.primary}10, ${Theme.accent}10);
  border: 2px dashed ${Theme.primary};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  margin: 1.5rem 0;
  
  h3 {
    color: ${Theme.primary};
    margin-bottom: 1rem;
  }
  
  .arrows {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 1.5rem 0;
    font-size: 2rem;
  }
  
  .arrow {
    opacity: ${props => props.$completed ? 0.3 : 1};
    color: ${props => props.$active ? Theme.primary : Theme.textSecondary};
    transition: all 0.3s ease;
  }
  
  .arrow.done {
    color: #28a745;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${Theme.border};
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
  
  .fill {
    height: 100%;
    background: linear-gradient(90deg, ${Theme.primary}, ${Theme.accent});
    border-radius: 4px;
    transition: width 0.1s linear;
  }
`;

const ActionButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  border: none;
  background: ${props => props.$secondary ? 'transparent' : `linear-gradient(135deg, ${Theme.primary}, ${Theme.accent})`};
  color: ${props => props.$secondary ? Theme.primary : 'white'};
  border: 2px solid ${Theme.primary};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${Theme.primary}40;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ControllerInfo = styled.div`
  text-align: center;
  padding: 0.75rem;
  background: ${Theme.surface};
  border-radius: 12px;
  border: 2px solid ${Theme.border};
  margin-bottom: 1rem;
  
  p {
    margin: 0;
    color: ${Theme.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    
    span {
      font-weight: 700;
      color: ${Theme.primary};
    }
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2.5rem 1rem;
  color: ${Theme.textSecondary};
  
  h3 {
    color: ${Theme.primary};
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
  }
  
  p {
    margin: 0.4rem 0;
    font-size: 1rem;
  }
`;

const Instructions = styled.div`
  background: ${Theme.surface};
  border-radius: 12px;
  padding: 1.25rem;
  margin-top: 1.5rem;
  
  h4 {
    color: ${Theme.primary};
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }
  
  p {
    color: ${Theme.textSecondary};
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

// ============================================================================
// CONSTANTS
// ============================================================================

const SAMPLE_DURATION = 2000; // 2 seconds of sampling
const SAMPLE_RATE = 60; // 60Hz
const TOTAL_SAMPLES = (SAMPLE_DURATION / 1000) * SAMPLE_RATE;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const DriftTestTool = () => {
  // Connection state
  const [selectedGamepad, setSelectedGamepad] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState([false, false, false, false]);
  const [gamepadNames, setGamepadNames] = useState(['', '', '', '']);

  // Real-time stick values
  const [leftStick, setLeftStick] = useState({ x: 0, y: 0 });
  const [rightStick, setRightStick] = useState({ x: 0, y: 0 });

  // Mode: 'realtime' | 'calibration' | 'analyzing' | 'results'
  const [mode, setMode] = useState('realtime');

  // Trail for visualization
  const [leftTrail, setLeftTrail] = useState([]);
  const [rightTrail, setRightTrail] = useState([]);

  // Calibration state
  const [calibrationStep, setCalibrationStep] = useState(0); // 0: idle, 1: up, 2: right, 3: down, 4: left, 5: center
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [rangeReached, setRangeReached] = useState({ up: false, right: false, down: false, left: false });

  // Analysis results
  const [leftResults, setLeftResults] = useState(null);
  const [rightResults, setRightResults] = useState(null);

  // Refs for data collection
  const animationRef = useRef(null);
  const samplesRef = useRef({ left: [], right: [] });
  const maxRangeRef = useRef({ left: { minX: 0, maxX: 0, minY: 0, maxY: 0 }, right: { minX: 0, maxX: 0, minY: 0, maxY: 0 } });
  const analysisStartRef = useRef(null);

  // Check controller connections
  const checkConnections = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.getGamepads) return;

    const gamepads = navigator.getGamepads();
    const newStatus = [false, false, false, false];
    const newNames = ['', '', '', ''];

    for (let i = 0; i < 4; i++) {
      if (gamepads[i]) {
        newStatus[i] = gamepads[i].connected;
        if (gamepads[i].connected) {
          const fullName = gamepads[i].id || '';
          const shortName = fullName.split('(')[0].trim().substring(0, 20);
          newNames[i] = shortName || 'Controller';
        }
      }
    }

    setConnectionStatus(newStatus);
    setGamepadNames(newNames);
  }, []);

  // Calculate drift statistics from samples
  const calculateStats = useCallback((samples) => {
    if (samples.length === 0) return null;

    // Calculate average offset (drift)
    const avgX = samples.reduce((sum, s) => sum + s.x, 0) / samples.length;
    const avgY = samples.reduce((sum, s) => sum + s.y, 0) / samples.length;
    const offset = Math.sqrt(avgX * avgX + avgY * avgY);

    // Calculate jitter (variance/noise)
    const varianceX = samples.reduce((sum, s) => sum + Math.pow(s.x - avgX, 2), 0) / samples.length;
    const varianceY = samples.reduce((sum, s) => sum + Math.pow(s.y - avgY, 2), 0) / samples.length;
    const jitter = Math.sqrt(varianceX + varianceY);

    // Determine severity
    let severity = 'perfect';
    if (offset >= 0.10) severity = 'severe';
    else if (offset >= 0.05) severity = 'moderate';
    else if (offset >= 0.02) severity = 'minor';

    // Calculate recommended deadzone
    const recommendedDeadzone = Math.max(offset + jitter * 2, 0.02);

    return {
      offset,
      offsetPercent: (offset * 100).toFixed(1),
      avgX,
      avgY,
      jitter,
      jitterPercent: (jitter * 100).toFixed(2),
      severity,
      recommendedDeadzone: (recommendedDeadzone * 100).toFixed(1)
    };
  }, []);

  // Calculate range stats
  const calculateRange = useCallback((maxRange) => {
    const rangeX = Math.max(Math.abs(maxRange.minX), Math.abs(maxRange.maxX));
    const rangeY = Math.max(Math.abs(maxRange.minY), Math.abs(maxRange.maxY));
    const fullRange = Math.max(rangeX, rangeY);
    return (fullRange * 100).toFixed(0);
  }, []);

  // Start analysis
  const startAnalysis = useCallback(() => {
    setMode('analyzing');
    samplesRef.current = { left: [], right: [] };
    maxRangeRef.current = {
      left: { minX: 0, maxX: 0, minY: 0, maxY: 0 },
      right: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    };
    analysisStartRef.current = Date.now();
    setCalibrationProgress(0);
    setLeftResults(null);
    setRightResults(null);
  }, []);

  // Start calibration
  const startCalibration = useCallback(() => {
    setMode('calibration');
    setCalibrationStep(1);
    setRangeReached({ up: false, right: false, down: false, left: false });
    maxRangeRef.current = {
      left: { minX: 0, maxX: 0, minY: 0, maxY: 0 },
      right: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    };
  }, []);

  // Reset to realtime mode
  const resetToRealtime = useCallback(() => {
    setMode('realtime');
    setCalibrationStep(0);
    setCalibrationProgress(0);
    setLeftResults(null);
    setRightResults(null);
    setRangeReached({ up: false, right: false, down: false, left: false });
    samplesRef.current = { left: [], right: [] };
  }, []);

  // Main polling loop
  useEffect(() => {
    let lastSampleTime = 0;
    const sampleInterval = 1000 / SAMPLE_RATE;

    const pollGamepad = (timestamp) => {
      if (typeof navigator === 'undefined' || !navigator.getGamepads) {
        animationRef.current = requestAnimationFrame(pollGamepad);
        return;
      }

      const gamepads = navigator.getGamepads();
      const gp = gamepads[selectedGamepad];

      if (gp && gp.connected) {
        const leftX = gp.axes[0] || 0;
        const leftY = gp.axes[1] || 0;
        const rightX = gp.axes[2] || 0;
        const rightY = gp.axes[3] || 0;

        setLeftStick({ x: leftX, y: leftY });
        setRightStick({ x: rightX, y: rightY });

        // Update trail for visualization (max 20 points)
        setLeftTrail(prev => [...prev.slice(-19), { x: leftX, y: leftY }]);
        setRightTrail(prev => [...prev.slice(-19), { x: rightX, y: rightY }]);

        // Track max range during all modes
        maxRangeRef.current.left.minX = Math.min(maxRangeRef.current.left.minX, leftX);
        maxRangeRef.current.left.maxX = Math.max(maxRangeRef.current.left.maxX, leftX);
        maxRangeRef.current.left.minY = Math.min(maxRangeRef.current.left.minY, leftY);
        maxRangeRef.current.left.maxY = Math.max(maxRangeRef.current.left.maxY, leftY);
        maxRangeRef.current.right.minX = Math.min(maxRangeRef.current.right.minX, rightX);
        maxRangeRef.current.right.maxX = Math.max(maxRangeRef.current.right.maxX, rightX);
        maxRangeRef.current.right.minY = Math.min(maxRangeRef.current.right.minY, rightY);
        maxRangeRef.current.right.maxY = Math.max(maxRangeRef.current.right.maxY, rightY);

        // Calibration mode: track directions
        if (mode === 'calibration') {
          const threshold = 0.8;
          const newReached = { ...rangeReached };

          if (leftY < -threshold) newReached.up = true;
          if (leftX > threshold) newReached.right = true;
          if (leftY > threshold) newReached.down = true;
          if (leftX < -threshold) newReached.left = true;

          setRangeReached(newReached);

          // Check if all directions reached
          if (newReached.up && newReached.right && newReached.down && newReached.left) {
            // Move to center test
            if (calibrationStep < 5) {
              setCalibrationStep(5);
            }

            // If stick is near center, start drift analysis
            const leftOffset = Math.sqrt(leftX * leftX + leftY * leftY);
            if (leftOffset < 0.1) {
              startAnalysis();
            }
          }
        }

        // Analyzing mode: collect samples at 60Hz
        if (mode === 'analyzing') {
          if (timestamp - lastSampleTime >= sampleInterval) {
            samplesRef.current.left.push({ x: leftX, y: leftY });
            samplesRef.current.right.push({ x: rightX, y: rightY });
            lastSampleTime = timestamp;

            // Update progress
            const elapsed = Date.now() - analysisStartRef.current;
            const progress = Math.min((elapsed / SAMPLE_DURATION) * 100, 100);
            setCalibrationProgress(progress);

            // Check if analysis complete
            if (elapsed >= SAMPLE_DURATION) {
              const leftStats = calculateStats(samplesRef.current.left);
              const rightStats = calculateStats(samplesRef.current.right);

              // Add range data
              if (leftStats) leftStats.range = calculateRange(maxRangeRef.current.left);
              if (rightStats) rightStats.range = calculateRange(maxRangeRef.current.right);

              setLeftResults(leftStats);
              setRightResults(rightStats);
              setMode('results');
            }
          }
        }
      }

      checkConnections();
      animationRef.current = requestAnimationFrame(pollGamepad);
    };

    animationRef.current = requestAnimationFrame(pollGamepad);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedGamepad, mode, calibrationStep, rangeReached, checkConnections, calculateStats, calculateRange, startAnalysis]);

  // Helper functions
  const getSeverityColor = (severity) => {
    if (severity === 'perfect') return '#28a745';
    if (severity === 'minor') return '#ffc107';
    if (severity === 'moderate') return '#fd7e14';
    return '#dc3545';
  };

  const getSeverityText = (severity) => {
    if (severity === 'perfect') return '✓ Perfect';
    if (severity === 'minor') return '⚠ Minor Drift';
    if (severity === 'moderate') return '⚠ Moderate Drift';
    return '🚨 Severe Drift';
  };

  const getRealtimeSeverity = (offset) => {
    if (offset < 0.02) return 'perfect';
    if (offset < 0.05) return 'minor';
    if (offset < 0.10) return 'moderate';
    return 'severe';
  };

  const isConnected = connectionStatus[selectedGamepad];
  const leftOffset = Math.sqrt(leftStick.x * leftStick.x + leftStick.y * leftStick.y);
  const rightOffset = Math.sqrt(rightStick.x * rightStick.x + rightStick.y * rightStick.y);

  return (
    <DriftTestWrapper>
      <Title>🎯 Precision Stick Drift Test</Title>

      <StyledUl>
        {[0, 1, 2, 3].map((index) => (
          <TabButton
            key={index}
            $active={selectedGamepad === index}
            onClick={() => setSelectedGamepad(index)}
          >
            {connectionStatus[index] ? `${index + 1}: ${gamepadNames[index]}` : `Gamepad #${index + 1}`}
            <StyledConnected>
              {connectionStatus[index] ? "Connected" : ""}
            </StyledConnected>
            <StyledNotFound>
              {!connectionStatus[index] ? "Not found" : ""}
            </StyledNotFound>
          </TabButton>
        ))}
      </StyledUl>

      {isConnected ? (
        <>
          <ControllerInfo>
            <p><span>Controller:</span> {gamepadNames[selectedGamepad]}</p>
          </ControllerInfo>

          {/* Mode Toggle */}
          <ModeToggle>
            <ModeButton
              $active={mode === 'realtime'}
              onClick={resetToRealtime}
            >
              Real-Time Monitor
            </ModeButton>
            <ModeButton
              $active={mode === 'calibration' || mode === 'analyzing' || mode === 'results'}
              onClick={startCalibration}
            >
              Full Calibration Test
            </ModeButton>
          </ModeToggle>

          {/* Stick Visualization */}
          <VisualizationArea>
            <StickSection>
              <StickLabel>Left Stick</StickLabel>
              <StickContainer $severity={getRealtimeSeverity(leftOffset)}>
                {/* Trail dots */}
                {leftTrail.slice(0, -1).map((pos, i) => (
                  <TrailDot
                    key={i}
                    style={{
                      left: `${50 + pos.x * 45}%`,
                      top: `${50 + pos.y * 45}%`,
                      opacity: (i + 1) / leftTrail.length * 0.5
                    }}
                  />
                ))}
                <StickIndicator
                  $isDrifting={leftOffset > 0.05}
                  style={{
                    left: `${50 + leftStick.x * 45}%`,
                    top: `${50 + leftStick.y * 45}%`
                  }}
                />
              </StickContainer>
              <StickValues>
                <span>X: {leftStick.x.toFixed(3)}</span>
                <span>Y: {leftStick.y.toFixed(3)}</span>
              </StickValues>
            </StickSection>

            <StickSection>
              <StickLabel>Right Stick</StickLabel>
              <StickContainer $severity={getRealtimeSeverity(rightOffset)}>
                {/* Trail dots */}
                {rightTrail.slice(0, -1).map((pos, i) => (
                  <TrailDot
                    key={i}
                    style={{
                      left: `${50 + pos.x * 45}%`,
                      top: `${50 + pos.y * 45}%`,
                      opacity: (i + 1) / rightTrail.length * 0.5
                    }}
                  />
                ))}
                <StickIndicator
                  $isDrifting={rightOffset > 0.05}
                  style={{
                    left: `${50 + rightStick.x * 45}%`,
                    top: `${50 + rightStick.y * 45}%`
                  }}
                />
              </StickContainer>
              <StickValues>
                <span>X: {rightStick.x.toFixed(3)}</span>
                <span>Y: {rightStick.y.toFixed(3)}</span>
              </StickValues>
            </StickSection>
          </VisualizationArea>

          {/* Real-time mode */}
          {mode === 'realtime' && (
            <>
              <ResultsPanel>
                <ResultCard $color={getSeverityColor(getRealtimeSeverity(leftOffset))}>
                  <h4>Left Drift</h4>
                  <p>{(leftOffset * 100).toFixed(1)}%</p>
                  <small>{getSeverityText(getRealtimeSeverity(leftOffset))}</small>
                </ResultCard>
                <ResultCard $color={getSeverityColor(getRealtimeSeverity(rightOffset))}>
                  <h4>Right Drift</h4>
                  <p>{(rightOffset * 100).toFixed(1)}%</p>
                  <small>{getSeverityText(getRealtimeSeverity(rightOffset))}</small>
                </ResultCard>
              </ResultsPanel>

              <Instructions>
                <h4>📋 How to Test</h4>
                <p>Place your controller on a flat surface without touching the sticks.
                  Watch for any movement from center (0.00). Values above 5% indicate drift.
                  For detailed analysis, use "Full Calibration Test".</p>
              </Instructions>
            </>
          )}

          {/* Calibration mode */}
          {mode === 'calibration' && (
            <CalibrationGuide>
              <h3>🔄 Calibration: Move Left Stick to All Edges</h3>
              <p>Push the left stick fully in each direction shown below</p>
              <div className="arrows">
                <span className={`arrow ${rangeReached.up ? 'done' : ''}`}>⬆️</span>
                <span className={`arrow ${rangeReached.right ? 'done' : ''}`}>➡️</span>
                <span className={`arrow ${rangeReached.down ? 'done' : ''}`}>⬇️</span>
                <span className={`arrow ${rangeReached.left ? 'done' : ''}`}>⬅️</span>
              </div>
              <p>{rangeReached.up && rangeReached.right && rangeReached.down && rangeReached.left
                ? '✓ All directions reached! Now return stick to center...'
                : 'Move stick to each edge until all arrows turn green'}</p>
              <ActionButton $secondary onClick={resetToRealtime}>
                Cancel
              </ActionButton>
            </CalibrationGuide>
          )}

          {/* Analyzing mode */}
          {mode === 'analyzing' && (
            <>
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <h3 style={{ color: Theme.primary, marginBottom: '0.5rem' }}>
                  📊 Analyzing Drift... Don't Touch the Sticks!
                </h3>
                <p style={{ color: Theme.textSecondary, marginBottom: '1rem' }}>
                  Collecting {TOTAL_SAMPLES} samples at {SAMPLE_RATE}Hz over 2 seconds
                </p>
                <ProgressBar>
                  <div className="fill" style={{ width: `${calibrationProgress}%` }} />
                </ProgressBar>
                <p style={{ color: Theme.textSecondary, fontSize: '0.9rem' }}>
                  {Math.round(calibrationProgress)}% complete
                </p>
              </div>
            </>
          )}

          {/* Results mode */}
          {mode === 'results' && leftResults && rightResults && (
            <>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: Theme.primary, marginBottom: '0.5rem' }}>
                  📋 Drift Analysis Complete
                </h3>
                <SeverityBadge $severity={leftResults.severity}>
                  Left: {getSeverityText(leftResults.severity)}
                </SeverityBadge>
                {' '}
                <SeverityBadge $severity={rightResults.severity}>
                  Right: {getSeverityText(rightResults.severity)}
                </SeverityBadge>
              </div>

              <h4 style={{ color: Theme.primary, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Left Stick Results
              </h4>
              <ResultsPanel>
                <ResultCard $color={getSeverityColor(leftResults.severity)}>
                  <h4>Center Offset</h4>
                  <p>{leftResults.offsetPercent}%</p>
                  <small>Drift amount</small>
                </ResultCard>
                <ResultCard>
                  <h4>Jitter/Noise</h4>
                  <p>{leftResults.jitterPercent}%</p>
                  <small>Signal stability</small>
                </ResultCard>
                <ResultCard>
                  <h4>Recommended Deadzone</h4>
                  <p>{leftResults.recommendedDeadzone}%</p>
                  <small>For games</small>
                </ResultCard>
                <ResultCard>
                  <h4>Range Achieved</h4>
                  <p>{leftResults.range}%</p>
                  <small>Max travel</small>
                </ResultCard>
              </ResultsPanel>

              <h4 style={{ color: Theme.primary, marginTop: '1rem', marginBottom: '0.5rem' }}>
                Right Stick Results
              </h4>
              <ResultsPanel>
                <ResultCard $color={getSeverityColor(rightResults.severity)}>
                  <h4>Center Offset</h4>
                  <p>{rightResults.offsetPercent}%</p>
                  <small>Drift amount</small>
                </ResultCard>
                <ResultCard>
                  <h4>Jitter/Noise</h4>
                  <p>{rightResults.jitterPercent}%</p>
                  <small>Signal stability</small>
                </ResultCard>
                <ResultCard>
                  <h4>Recommended Deadzone</h4>
                  <p>{rightResults.recommendedDeadzone}%</p>
                  <small>For games</small>
                </ResultCard>
                <ResultCard>
                  <h4>Range Achieved</h4>
                  <p>{rightResults.range}%</p>
                  <small>Max travel</small>
                </ResultCard>
              </ResultsPanel>

              <Instructions>
                <h4>📊 Understanding Your Results</h4>
                <p>
                  <strong>Center Offset:</strong> How far from 0 when untouched. &lt;2% is perfect, &gt;10% needs repair.<br />
                  <strong>Jitter:</strong> Signal noise/instability. Higher values mean inconsistent readings.<br />
                  <strong>Recommended Deadzone:</strong> Suggested game setting to prevent drift affecting gameplay.<br />
                  <strong>Range:</strong> Maximum stick travel. Should be 95-100% on healthy sticks.
                </p>
              </Instructions>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <ActionButton onClick={startCalibration}>
                  🔄 Test Again
                </ActionButton>
                <ActionButton $secondary onClick={resetToRealtime}>
                  ← Back to Real-Time
                </ActionButton>
              </div>
            </>
          )}
        </>
      ) : (
        <LoadingState>
          <h3>🎮 Connect Your Controller</h3>
          <p>Connect via USB or Bluetooth</p>
          <p>Press any button to activate</p>
        </LoadingState>
      )}
    </DriftTestWrapper>
  );
};

export default DriftTestTool;
