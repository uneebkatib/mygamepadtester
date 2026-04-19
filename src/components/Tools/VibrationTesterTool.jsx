'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';
import Link from 'next/link';
import RelatedTools from '../RelatedTools/RelatedTools';

// ============================================================================
// STYLED COMPONENTS (UTILITY STYLES)
// ============================================================================

const SectionHeading = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.1rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
  line-height: 1.2;
`;

const ArticleText = styled.p`
  font-size: 1.1rem;
  color: #444;
  line-height: 1.7;
  margin-bottom: 1.5rem;
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
`;

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const VibrationWrapper = styled.div`
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
  }
`;

const Title = styled.h2`
  color: ${Theme.primary};
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.75rem;
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
  overflow-x: auto;
`;

const TabButton = styled.button`
  width: 11rem;
  padding: 1rem;
  color: ${props => props.$active ? Theme.primary : Theme.logo};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-right: 1px solid ${Theme.border};
  background: ${props => props.$active ? Theme.backgroundLight : 'transparent'};
  border-bottom: ${props => props.$active ? `5px solid ${Theme.primary}` : 'none'};
  cursor: pointer;
  font-weight: 600;
  flex-shrink: 0;
  
  &:last-child { border-right: none; }
  &:hover { background: ${Theme.backgroundLight}; }
`;

const StyledConnected = styled.p`
  color: ${Theme.connected};
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;

const StyledNotFound = styled.p`
  color: ${Theme.disconnected};
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;

const ModeToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const ModeButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  border: 2px solid ${props => props.$active ? Theme.primary : Theme.border};
  background: ${props => props.$active ? Theme.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : Theme.textPrimary};
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover { border-color: ${Theme.primary}; }
`;

const ControllerInfo = styled.div`
  text-align: center;
  padding: 0.75rem;
  background: ${Theme.surface};
  border-radius: 12px;
  border: 2px solid ${Theme.border};
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  
  .name { font-weight: 700; color: ${Theme.textPrimary}; }
  
  .badge {
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .supported { background: #e8f5e9; color: #2e7d32; }
  .unsupported { background: #ffebee; color: #c62828; }
`;

const MotorControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const MotorCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  border: 2px solid ${props => props.$active ? Theme.primary : Theme.border};
  transition: all 0.2s ease;
  
  h4 {
    color: ${Theme.primary};
    margin: 0 0 0.75rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.$active ? '#4caf50' : '#e0e0e0'};
    animation: ${props => props.$active ? 'pulse 1s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const SliderGroup = styled.div`
  margin: 0.75rem 0;
  
  .label-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    margin-bottom: 0.4rem;
    color: ${Theme.textSecondary};
    
    .value {
      font-weight: 700;
      color: ${Theme.primary};
      font-family: monospace;
    }
  }
  
  input[type="range"] {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: ${Theme.background};
    outline: none;
    
    &::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
      cursor: pointer;
    }
  }
`;

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  margin: 0.5rem 0;
  
  input {
    display: none;
  }
  
  .switch {
    width: 48px;
    height: 26px;
    background: ${props => props.$checked ? Theme.primary : '#ccc'};
    border-radius: 13px;
    position: relative;
    transition: all 0.2s ease;
    
    &::after {
      content: '';
      position: absolute;
      width: 22px;
      height: 22px;
      background: white;
      border-radius: 50%;
      top: 2px;
      left: ${props => props.$checked ? '24px' : '2px'};
      transition: all 0.2s ease;
    }
  }
  
  span {
    font-size: 0.9rem;
    color: ${Theme.textPrimary};
    font-weight: 500;
  }
`;

const TestRoutinePanel = styled.div`
  background: ${Theme.surface};
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 2px solid ${Theme.border};
  
  h4 {
    color: ${Theme.primary};
    margin: 0 0 1rem 0;
  }
`;

const RoutineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
`;

const RoutineButton = styled.button`
  padding: 0.75rem 1rem;
  background: ${props => props.$running ? Theme.primary : 'white'};
  color: ${props => props.$running ? 'white' : Theme.textPrimary};
  border: 2px solid ${props => props.$running ? Theme.primary : Theme.border};
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    border-color: ${Theme.primary};
    color: ${props => props.$running ? 'white' : Theme.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${Theme.border};
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
  
  .fill {
    height: 100%;
    background: linear-gradient(90deg, ${Theme.primary}, ${Theme.accent});
    transition: width 0.1s ease;
    border-radius: 4px;
  }
`;

const DiagnosticsPanel = styled.div`
  background: ${Theme.surface};
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 2px solid ${Theme.border};
  
  h4 {
    color: ${Theme.primary};
    margin: 0 0 1rem 0;
  }
`;

const DiagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
`;

const DiagCard = styled.div`
  padding: 0.75rem;
  background: white;
  border-radius: 8px;
  border-left: 3px solid ${props => props.$color || Theme.primary};
  
  h5 {
    color: ${Theme.textSecondary};
    font-size: 0.7rem;
    margin: 0 0 0.25rem 0;
    text-transform: uppercase;
  }
  
  .value {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${props => props.$color || Theme.primary};
    font-family: monospace;
  }
  
  .label {
    font-size: 0.7rem;
    color: ${Theme.textSecondary};
  }
`;

const GradeCard = styled.div`
  background: ${props => {
        if (props.$grade === 'A') return '#e8f5e9';
        if (props.$grade === 'B') return '#fff8e1';
        if (props.$grade === 'C') return '#fff3e0';
        return '#ffebee';
    }};
  border: 2px solid ${props => {
        if (props.$grade === 'A') return '#4caf50';
        if (props.$grade === 'B') return '#ffc107';
        if (props.$grade === 'C') return '#ff9800';
        return '#f44336';
    }};
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  margin: 1rem 0;
  
  .grade {
    font-size: 3rem;
    font-weight: 800;
    color: ${props => {
        if (props.$grade === 'A') return '#2e7d32';
        if (props.$grade === 'B') return '#f9a825';
        if (props.$grade === 'C') return '#e65100';
        return '#c62828';
    }};
  }
  
  .label {
    font-size: 1rem;
    color: ${Theme.textSecondary};
    margin-top: 0.5rem;
  }
`;

const ResultsLog = styled.div`
  background: ${Theme.background};
  border-radius: 8px;
  padding: 0.75rem;
  max-height: 150px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.8rem;
`;

const LogEntry = styled.div`
  padding: 0.25rem 0.5rem;
  margin: 0.2rem 0;
  background: white;
  border-radius: 4px;
  border-left: 3px solid ${props => props.$success ? '#4caf50' : '#f44336'};
  color: ${Theme.textPrimary};
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const ExportBtn = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid ${Theme.border};
  background: white;
  color: ${Theme.textPrimary};
  font-size: 0.85rem;
  cursor: pointer;
  
  &:hover {
    border-color: ${Theme.primary};
    color: ${Theme.primary};
  }
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  border: none;
  background: ${props => props.$danger ? '#f44336' : `linear-gradient(135deg, ${Theme.primary}, ${Theme.accent})`};
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  margin: 0.25rem;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => props.$danger ? 'rgba(244,67,54,0.3)' : `${Theme.primary}40`};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2.5rem 1rem;
  color: ${Theme.textSecondary};
  
  h3 {
    color: ${Theme.primary};
    margin-bottom: 0.75rem;
  }
  
  .warning {
    background: #fff3e0;
    border: 1px solid #ff9800;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1.5rem;
    color: #e65100;
    font-size: 0.9rem;
  }
`;

const AlertBox = styled.div`
  background: ${props => props.$type === 'error' ? '#ffebee' : '#fff3e0'};
  border: 2px solid ${props => props.$type === 'error' ? '#f44336' : '#ff9800'};
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .icon { font-size: 1.5rem; }
  
  h4 {
    color: ${props => props.$type === 'error' ? '#c62828' : '#e65100'};
    margin: 0 0 0.25rem 0;
  }
  
  p {
    color: ${Theme.textSecondary};
    margin: 0;
    font-size: 0.9rem;
  }
`;

// ============================================================================
// TEST ROUTINES
// ============================================================================

const TEST_ROUTINES = {
    motorPair: {
        name: 'Motor Pair Test',
        description: 'Left → Right → Both → Off',
        steps: [
            { left: 0.7, right: 0, duration: 500 },
            { left: 0, right: 0.7, duration: 500 },
            { left: 0.7, right: 0.7, duration: 500 },
            { left: 0, right: 0, duration: 200 }
        ]
    },
    strengthSweep: {
        name: 'Strength Sweep',
        description: '0% → 100% ramp',
        steps: [
            { left: 0.25, right: 0.25, duration: 400 },
            { left: 0.50, right: 0.50, duration: 400 },
            { left: 0.75, right: 0.75, duration: 400 },
            { left: 1.00, right: 1.00, duration: 400 },
            { left: 0, right: 0, duration: 200 }
        ]
    },
    pulseTest: {
        name: 'Pulse Test',
        description: '10 rapid pulses',
        steps: Array(10).fill(null).flatMap(() => [
            { left: 0.8, right: 0.8, duration: 100 },
            { left: 0, right: 0, duration: 50 }
        ])
    },
    stressTest: {
        name: 'Stress Test',
        description: '5s sustained @ 70%',
        steps: [
            { left: 0.7, right: 0.7, duration: 5000 },
            { left: 0, right: 0, duration: 200 }
        ]
    },
    asymmetryTest: {
        name: 'Asymmetry Check',
        description: 'Compare L vs R',
        steps: [
            { left: 1.0, right: 0, duration: 800 },
            { left: 0, right: 0, duration: 300 },
            { left: 0, right: 1.0, duration: 800 },
            { left: 0, right: 0, duration: 200 }
        ]
    },
    rampUp: {
        name: 'Ramp Up',
        description: 'Gradual 0→100%',
        steps: Array(20).fill(null).map((_, i) => ({
            left: (i + 1) / 20,
            right: (i + 1) / 20,
            duration: 100
        })).concat([{ left: 0, right: 0, duration: 200 }])
    }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const VibrationTesterTool = () => {
    // Connection state
    const [selectedGamepad, setSelectedGamepad] = useState(0);
    const [connectionStatus, setConnectionStatus] = useState([false, false, false, false]);
    const [gamepadNames, setGamepadNames] = useState(['', '', '', '']);
    const [vibrationSupported, setVibrationSupported] = useState(false);

    // Motor control state
    const [leftIntensity, setLeftIntensity] = useState(0.5);
    const [rightIntensity, setRightIntensity] = useState(0.5);
    const [leftEnabled, setLeftEnabled] = useState(true);
    const [rightEnabled, setRightEnabled] = useState(true);
    const [duration, setDuration] = useState(500);
    const [isVibrating, setIsVibrating] = useState(false);

    // Mode state
    const [mode, setMode] = useState('manual');

    // Routine state
    const [runningRoutine, setRunningRoutine] = useState(null);
    const [routineProgress, setRoutineProgress] = useState(0);

    // Diagnostics state
    const [diagnostics, setDiagnostics] = useState({
        leftResponseTime: 0,
        rightResponseTime: 0,
        leftConsistency: 100,
        rightConsistency: 100,
        imbalancePercent: 0,
        testsRun: 0,
        failures: 0,
        grade: null
    });

    // Results log
    const [results, setResults] = useState([]);

    // Refs
    const animationRef = useRef(null);
    const routineAbortRef = useRef(false);

    // Check connections
    const checkConnections = useCallback(() => {
        if (typeof navigator === 'undefined' || !navigator.getGamepads) return;

        const gamepads = navigator.getGamepads();
        const newStatus = [false, false, false, false];
        const newNames = ['', '', '', ''];

        for (let i = 0; i < 4; i++) {
            if (gamepads[i]) {
                newStatus[i] = gamepads[i].connected;
                if (gamepads[i].connected) {
                    newNames[i] = gamepads[i].id?.split('(')[0]?.trim()?.substring(0, 25) || 'Controller';

                    if (i === selectedGamepad) {
                        setVibrationSupported(!!gamepads[i].vibrationActuator);
                    }
                }
            }
        }

        setConnectionStatus(newStatus);
        setGamepadNames(newNames);
    }, [selectedGamepad]);

    // Polling loop
    useEffect(() => {
        const poll = () => {
            checkConnections();
            animationRef.current = requestAnimationFrame(poll);
        };
        animationRef.current = requestAnimationFrame(poll);
        return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
    }, [checkConnections]);

    // Trigger vibration
    const triggerVibration = useCallback(async (left, right, dur) => {
        const gamepads = navigator.getGamepads();
        const gp = gamepads[selectedGamepad];

        if (!gp || !gp.vibrationActuator) {
            setResults(prev => [{
                time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                message: 'Vibration not supported',
                success: false
            }, ...prev.slice(0, 49)]);
            return false;
        }

        try {
            const startTime = performance.now();

            await gp.vibrationActuator.playEffect('dual-rumble', {
                startDelay: 0,
                duration: dur,
                weakMagnitude: right, // Right motor is typically "weak"
                strongMagnitude: left // Left motor is typically "strong"
            });

            const responseTime = performance.now() - startTime;

            setDiagnostics(prev => ({
                ...prev,
                leftResponseTime: left > 0 ? responseTime : prev.leftResponseTime,
                rightResponseTime: right > 0 ? responseTime : prev.rightResponseTime,
                testsRun: prev.testsRun + 1
            }));

            setResults(prev => [{
                time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                message: `L:${(left * 100).toFixed(0)}% R:${(right * 100).toFixed(0)}% ${dur}ms`,
                success: true
            }, ...prev.slice(0, 49)]);

            return true;
        } catch (error) {
            setDiagnostics(prev => ({ ...prev, failures: prev.failures + 1 }));
            setResults(prev => [{
                time: new Date().toLocaleTimeString('en-US', { hour12: false }),
                message: `Error: ${error.message}`,
                success: false
            }, ...prev.slice(0, 49)]);
            return false;
        }
    }, [selectedGamepad]);

    // Manual vibration
    const startManualVibration = useCallback(() => {
        if (isVibrating) return;
        setIsVibrating(true);

        const left = leftEnabled ? leftIntensity : 0;
        const right = rightEnabled ? rightIntensity : 0;

        triggerVibration(left, right, duration);

        setTimeout(() => setIsVibrating(false), duration);
    }, [isVibrating, leftEnabled, rightEnabled, leftIntensity, rightIntensity, duration, triggerVibration]);

    // Stop all vibration
    const stopVibration = useCallback(() => {
        routineAbortRef.current = true;
        setIsVibrating(false);
        setRunningRoutine(null);
        setRoutineProgress(0);

        const gamepads = navigator.getGamepads();
        const gp = gamepads[selectedGamepad];
        if (gp?.vibrationActuator) {
            gp.vibrationActuator.reset?.();
        }
    }, [selectedGamepad]);

    // Run test routine
    const runRoutine = useCallback(async (routineKey) => {
        if (runningRoutine || !vibrationSupported) return;

        const routine = TEST_ROUTINES[routineKey];
        if (!routine) return;

        routineAbortRef.current = false;
        setRunningRoutine(routineKey);
        setRoutineProgress(0);
        setIsVibrating(true);

        const totalSteps = routine.steps.length;

        for (let i = 0; i < totalSteps; i++) {
            if (routineAbortRef.current) break;

            const step = routine.steps[i];
            await triggerVibration(step.left, step.right, step.duration);
            await new Promise(r => setTimeout(r, step.duration + 50));

            setRoutineProgress(((i + 1) / totalSteps) * 100);
        }

        setIsVibrating(false);
        setRunningRoutine(null);
        setRoutineProgress(0);

        // Calculate grade after routine
        calculateGrade();
    }, [runningRoutine, vibrationSupported, triggerVibration]);

    // Calculate overall grade
    const calculateGrade = useCallback(() => {
        const { testsRun, failures, leftResponseTime, rightResponseTime } = diagnostics;

        if (testsRun < 3) return;

        const failureRate = failures / testsRun;
        const avgResponseTime = (leftResponseTime + rightResponseTime) / 2;
        const imbalance = Math.abs(leftResponseTime - rightResponseTime) / Math.max(leftResponseTime, rightResponseTime, 1) * 100;

        let grade = 'A';
        if (failureRate > 0.3 || avgResponseTime > 100) grade = 'F';
        else if (failureRate > 0.2 || avgResponseTime > 50 || imbalance > 30) grade = 'C';
        else if (failureRate > 0.1 || avgResponseTime > 30 || imbalance > 15) grade = 'B';

        setDiagnostics(prev => ({
            ...prev,
            grade,
            imbalancePercent: imbalance
        }));
    }, [diagnostics]);

    // Export JSON
    const exportJSON = useCallback(() => {
        const report = {
            timestamp: new Date().toISOString(),
            controller: gamepadNames[selectedGamepad],
            vibrationSupported,
            diagnostics,
            results: results.slice(0, 50)
        };
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vibration-test-${Date.now()}.json`;
        a.click();
    }, [gamepadNames, selectedGamepad, vibrationSupported, diagnostics, results]);

    // Export CSV
    const exportCSV = useCallback(() => {
        const rows = [['Timestamp', 'Message', 'Success']];
        results.forEach(r => rows.push([r.time, r.message, r.success]));
        const csv = rows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vibration-log-${Date.now()}.csv`;
        a.click();
    }, [results]);

    // Clear results
    const clearResults = useCallback(() => {
        setResults([]);
        setDiagnostics({
            leftResponseTime: 0,
            rightResponseTime: 0,
            leftConsistency: 100,
            rightConsistency: 100,
            imbalancePercent: 0,
            testsRun: 0,
            failures: 0,
            grade: null
        });
    }, []);

    const isConnected = connectionStatus[selectedGamepad];

    return (
        <VibrationWrapper>
            <Title>📳 Controller Rumble & Haptics Test</Title>

            <StyledUl>
                {[0, 1, 2, 3].map((index) => (
                    <TabButton
                        key={index}
                        $active={selectedGamepad === index}
                        onClick={() => setSelectedGamepad(index)}
                    >
                        {connectionStatus[index] ? `${index + 1}: ${gamepadNames[index]}` : `Gamepad #${index + 1}`}
                        <StyledConnected>{connectionStatus[index] && "Connected"}</StyledConnected>
                        <StyledNotFound>{!connectionStatus[index] && "Not found"}</StyledNotFound>
                    </TabButton>
                ))}
            </StyledUl>

            {isConnected ? (
                <>
                    <ControllerInfo>
                        <span className="name">{gamepadNames[selectedGamepad]}</span>
                        <span className={`badge ${vibrationSupported ? 'supported' : 'unsupported'}`}>
                            {vibrationSupported ? '✓ Vibration Supported' : '✗ No Vibration'}
                        </span>
                    </ControllerInfo>

                    {!vibrationSupported ? (
                        <AlertBox $type="error">
                            <div className="icon">⚠️</div>
                            <div>
                                <h4>Vibration Not Supported</h4>
                                <p>This controller does not support vibration via the browser API. Try using Chrome or Edge with a USB connection.</p>
                            </div>
                        </AlertBox>
                    ) : (
                        <>
                            <ModeToggle>
                                <ModeButton $active={mode === 'manual'} onClick={() => setMode('manual')}>
                                    Manual Control
                                </ModeButton>
                                <ModeButton $active={mode === 'routines'} onClick={() => setMode('routines')}>
                                    Test Routines
                                </ModeButton>
                                <ModeButton $active={mode === 'diagnostics'} onClick={() => setMode('diagnostics')}>
                                    Diagnostics
                                </ModeButton>
                            </ModeToggle>

                            {/* Manual Mode */}
                            {mode === 'manual' && (
                                <>
                                    <MotorControlGrid>
                                        <MotorCard $active={isVibrating && leftEnabled}>
                                            <h4>
                                                <div className="status" />
                                                Left Motor (Strong)
                                            </h4>
                                            <ToggleSwitch $checked={leftEnabled}>
                                                <input
                                                    type="checkbox"
                                                    checked={leftEnabled}
                                                    onChange={(e) => setLeftEnabled(e.target.checked)}
                                                />
                                                <div className="switch" />
                                                <span>{leftEnabled ? 'Enabled' : 'Disabled'}</span>
                                            </ToggleSwitch>
                                            <SliderGroup>
                                                <div className="label-row">
                                                    <span>Intensity</span>
                                                    <span className="value">{(leftIntensity * 100).toFixed(0)}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.05"
                                                    value={leftIntensity}
                                                    onChange={(e) => setLeftIntensity(parseFloat(e.target.value))}
                                                    disabled={!leftEnabled}
                                                />
                                            </SliderGroup>
                                        </MotorCard>

                                        <MotorCard $active={isVibrating && rightEnabled}>
                                            <h4>
                                                <div className="status" />
                                                Right Motor (Weak)
                                            </h4>
                                            <ToggleSwitch $checked={rightEnabled}>
                                                <input
                                                    type="checkbox"
                                                    checked={rightEnabled}
                                                    onChange={(e) => setRightEnabled(e.target.checked)}
                                                />
                                                <div className="switch" />
                                                <span>{rightEnabled ? 'Enabled' : 'Disabled'}</span>
                                            </ToggleSwitch>
                                            <SliderGroup>
                                                <div className="label-row">
                                                    <span>Intensity</span>
                                                    <span className="value">{(rightIntensity * 100).toFixed(0)}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.05"
                                                    value={rightIntensity}
                                                    onChange={(e) => setRightIntensity(parseFloat(e.target.value))}
                                                    disabled={!rightEnabled}
                                                />
                                            </SliderGroup>
                                        </MotorCard>
                                    </MotorControlGrid>

                                    <SliderGroup>
                                        <div className="label-row">
                                            <span>Duration</span>
                                            <span className="value">{duration}ms</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="100"
                                            max="3000"
                                            step="100"
                                            value={duration}
                                            onChange={(e) => setDuration(parseInt(e.target.value))}
                                        />
                                    </SliderGroup>

                                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                        <ActionButton onClick={startManualVibration} disabled={isVibrating}>
                                            {isVibrating ? '📳 Vibrating...' : '▶ Start Vibration'}
                                        </ActionButton>
                                        <ActionButton $danger onClick={stopVibration}>
                                            ⏹ Stop
                                        </ActionButton>
                                    </div>
                                </>
                            )}

                            {/* Routines Mode */}
                            {mode === 'routines' && (
                                <TestRoutinePanel>
                                    <h4>🔄 Automated Test Routines</h4>
                                    <RoutineGrid>
                                        {Object.entries(TEST_ROUTINES).map(([key, routine]) => (
                                            <RoutineButton
                                                key={key}
                                                $running={runningRoutine === key}
                                                onClick={() => runRoutine(key)}
                                                disabled={runningRoutine !== null && runningRoutine !== key}
                                            >
                                                {routine.name}
                                                <br />
                                                <small style={{ opacity: 0.7 }}>{routine.description}</small>
                                            </RoutineButton>
                                        ))}
                                    </RoutineGrid>

                                    {runningRoutine && (
                                        <>
                                            <ProgressBar>
                                                <div className="fill" style={{ width: `${routineProgress}%` }} />
                                            </ProgressBar>
                                            <div style={{ textAlign: 'center' }}>
                                                <ActionButton $danger onClick={stopVibration}>
                                                    ⏹ Stop Test
                                                </ActionButton>
                                            </div>
                                        </>
                                    )}
                                </TestRoutinePanel>
                            )}

                            {/* Diagnostics Mode */}
                            {mode === 'diagnostics' && (
                                <DiagnosticsPanel>
                                    <h4>📊 Motor Diagnostics</h4>

                                    {diagnostics.grade && (
                                        <GradeCard $grade={diagnostics.grade}>
                                            <div className="grade">{diagnostics.grade}</div>
                                            <div className="label">
                                                {diagnostics.grade === 'A' ? 'Excellent - Motors working perfectly' :
                                                    diagnostics.grade === 'B' ? 'Good - Minor variations detected' :
                                                        diagnostics.grade === 'C' ? 'Fair - Some issues detected' :
                                                            'Poor - Significant problems'}
                                            </div>
                                        </GradeCard>
                                    )}

                                    <DiagGrid>
                                        <DiagCard $color={diagnostics.leftResponseTime < 30 ? '#4caf50' : '#ff9800'}>
                                            <h5>Left Response</h5>
                                            <div className="value">{diagnostics.leftResponseTime.toFixed(1)}ms</div>
                                        </DiagCard>
                                        <DiagCard $color={diagnostics.rightResponseTime < 30 ? '#4caf50' : '#ff9800'}>
                                            <h5>Right Response</h5>
                                            <div className="value">{diagnostics.rightResponseTime.toFixed(1)}ms</div>
                                        </DiagCard>
                                        <DiagCard $color={diagnostics.imbalancePercent < 15 ? '#4caf50' : '#f44336'}>
                                            <h5>Imbalance</h5>
                                            <div className="value">{diagnostics.imbalancePercent.toFixed(1)}%</div>
                                        </DiagCard>
                                        <DiagCard>
                                            <h5>Tests Run</h5>
                                            <div className="value">{diagnostics.testsRun}</div>
                                        </DiagCard>
                                        <DiagCard $color={diagnostics.failures === 0 ? '#4caf50' : '#f44336'}>
                                            <h5>Failures</h5>
                                            <div className="value">{diagnostics.failures}</div>
                                        </DiagCard>
                                        <DiagCard>
                                            <h5>Success Rate</h5>
                                            <div className="value">
                                                {diagnostics.testsRun > 0
                                                    ? ((1 - diagnostics.failures / diagnostics.testsRun) * 100).toFixed(0)
                                                    : 0}%
                                            </div>
                                        </DiagCard>
                                    </DiagGrid>

                                    <p style={{ textAlign: 'center', marginTop: '1rem', color: Theme.textSecondary, fontSize: '0.9rem' }}>
                                        Run test routines to generate diagnostic data
                                    </p>
                                </DiagnosticsPanel>
                            )}

                            {/* Results Log */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h4 style={{ color: Theme.primary, margin: 0 }}>📋 Test Log</h4>
                                <ExportBtn onClick={clearResults}>🗑️ Clear</ExportBtn>
                            </div>
                            <ResultsLog>
                                {results.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '1rem', color: Theme.textSecondary }}>
                                        Run a test to see results...
                                    </div>
                                ) : (
                                    results.slice(0, 20).map((r, i) => (
                                        <LogEntry key={i} $success={r.success}>
                                            <span style={{ color: Theme.textSecondary }}>{r.time}</span> - {r.message}
                                        </LogEntry>
                                    ))
                                )}
                            </ResultsLog>

                            {/* Export */}
                            <ExportButtons>
                                <ExportBtn onClick={exportJSON}>📄 Export JSON Report</ExportBtn>
                                <ExportBtn onClick={exportCSV}>📊 Export CSV Logs</ExportBtn>
                            </ExportButtons>

                            <SectionHeading style={{ marginTop: '4rem' }}>🎮 Why Your Controller Rumble Might Be Failing</SectionHeading>
                            <ArticleText>
                                Missing the visceral feedback of an explosion or the subtle "click" of a lockpick often indicates a physical motor failure or a software translation issue. Modern controllers like the <strong>PS5 DualSense</strong> use advanced Voice Coil Actuators (VCA) for haptics, while <strong>Xbox</strong> controllers rely on traditional eccentric rotating mass (ERM) motors and dedicated impulse triggers.
                            </ArticleText>
                            <ArticleText>
                                Our vibration tester allows you to isolate the <strong>Left Motor (Strong/Low Frequency)</strong> and the <strong>Right Motor (Weak/High Frequency)</strong> to identify exactly which side is failing. If you are experiencing "weak rumble," it is often due to low battery voltage or Bluetooth bandwidth limitations—testing via USB can confirm if the hardware is still healthy.
                            </ArticleText>

                            <SectionHeading>HD Rumble vs. Standard Vibration</SectionHeading>
                            <ArticleText>
                                Nintendo Switch Joy-Cons and the DualSense use Linear Resonant Actuators (LRA) to produce "HD Rumble." Unlike standard motors that just spin, these can move at specific frequencies to simulate textures. If your HD rumble feels "grindey" or makes a high-pitched buzzing noise, the motor may have come loose from its housing.
                            </ArticleText>

                            <ToolCTA>
                                <h3>Full Hardware Wellness Check</h3>
                                <p>Rumble is just one part of the experience. We recommend running a complete stick drift audit once you've verified your motors are working.</p>
                                <Link href="/stick-drift-test" style={{ background: '#DA7756', color: 'white', padding: '1rem 2.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 800 }}>
                                    Run Stick Drift Test
                                </Link>
                            </ToolCTA>

                            <RelatedTools currentPath="/vibration-test" />
                        </>
                    )}
                </>
            ) : (
                <LoadingState>
                    <h3>🎮 Connect Your Controller</h3>
                    <p>Connect via USB or Bluetooth</p>
                    <p>Press any button to activate</p>
                    <div className="warning">
                        <strong>Note:</strong> Vibration testing works best with USB connection on Chrome or Edge.
                        Some controllers may not support browser-based vibration.
                    </div>
                </LoadingState>
            )}
        </VibrationWrapper>
    );
};

export default VibrationTesterTool;
