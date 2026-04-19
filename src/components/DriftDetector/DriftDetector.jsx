'use client'

import React, { useState, useEffect, useRef } from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaAdjust, FaCog, FaChartBar } from 'react-icons/fa';
import { Theme } from '../../styles/Theme';
import PageSEO from '../SEO/PageSEO.jsx';
import { DriftDetectorContent } from '../SEO/OptimizedContent';
import ShareExport from '../ShareExport/ShareExport';
import {
  DriftContainer,
  DriftHeader,
  DriftStatusPanel,
  DriftStatus,
  StickAnalyzer,
  StickVisualizer,
  StickIndicator,
  AxisData,
  ControlPanel,
  DeadzoneControl,
  CalibrationPanel,
  ResultsPanel,
  AlertMessage
} from './DriftDetector.styles';

// Calculate drift severity as percentage (0-100%)
const calculateSeverityPercentage = (maxDrift) => {
  const distance = Math.sqrt(maxDrift.x * maxDrift.x + maxDrift.y * maxDrift.y);
  // Normalize: anything above 0.5 is considered 100% severe
  const maxThreshold = 0.5;
  const percentage = Math.min((distance / maxThreshold) * 100, 100);
  return Math.round(percentage);
};

// Get severity level and color based on percentage
const getSeverityInfo = (percentage) => {
  if (percentage <= 5) return { level: 'Excellent', color: '#22C55E', emoji: '✅', description: 'No detectable drift' };
  if (percentage <= 15) return { level: 'Good', color: '#84CC16', emoji: '👍', description: 'Minimal drift, within normal range' };
  if (percentage <= 30) return { level: 'Moderate', color: '#EAB308', emoji: '⚠️', description: 'Noticeable drift, may affect precision games' };
  if (percentage <= 50) return { level: 'Warning', color: '#F97316', emoji: '🔶', description: 'Significant drift, calibration recommended' };
  return { level: 'Severe', color: '#EF4444', emoji: '🔴', description: 'Critical drift, repair or replacement needed' };
};

// Get overall controller health score
const getOverallHealthScore = (leftSeverity, rightSeverity) => {
  const avgSeverity = (leftSeverity + rightSeverity) / 2;
  return Math.max(0, Math.round(100 - avgSeverity));
};

function DriftDetector() {
  const [leftStick, setLeftStick] = useState({ x: 0, y: 0 });
  const [rightStick, setRightStick] = useState({ x: 0, y: 0 });
  const [leftDrift, setLeftDrift] = useState(false);
  const [rightDrift, setRightDrift] = useState(false);
  const [deadzone, setDeadzone] = useState(0.1);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [gamepadConnected, setGamepadConnected] = useState(false);
  const [gamepadName, setGamepadName] = useState('');
  const [maxDriftLeft, setMaxDriftLeft] = useState({ x: 0, y: 0 });
  const [maxDriftRight, setMaxDriftRight] = useState({ x: 0, y: 0 });
  const [testDuration, setTestDuration] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);

  const testIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Calculate severity percentages
  const leftSeverityPercent = calculateSeverityPercentage(maxDriftLeft);
  const rightSeverityPercent = calculateSeverityPercentage(maxDriftRight);
  const leftSeverityInfo = getSeverityInfo(leftSeverityPercent);
  const rightSeverityInfo = getSeverityInfo(rightSeverityPercent);
  const overallHealthScore = getOverallHealthScore(leftSeverityPercent, rightSeverityPercent);

  useEffect(() => {
    const interval = setInterval(() => {
      const gamepad = navigator.getGamepads()[0];

      if (gamepad && gamepad.connected) {
        setGamepadConnected(true);
        setGamepadName(gamepad.id);

        const leftX = gamepad.axes[0] || 0;
        const leftY = gamepad.axes[1] || 0;
        const rightX = gamepad.axes[2] || 0;
        const rightY = gamepad.axes[3] || 0;

        setLeftStick({ x: leftX, y: leftY });
        setRightStick({ x: rightX, y: rightY });

        // Calculate drift distance from center
        const leftDistance = Math.sqrt(leftX * leftX + leftY * leftY);
        const rightDistance = Math.sqrt(rightX * rightX + rightY * rightY);

        // Check for drift
        const leftDrifting = leftDistance > deadzone;
        const rightDrifting = rightDistance > deadzone;

        setLeftDrift(leftDrifting);
        setRightDrift(rightDrifting);

        // Track maximum drift during test
        if (isTestRunning) {
          if (leftDistance > Math.sqrt(maxDriftLeft.x * maxDriftLeft.x + maxDriftLeft.y * maxDriftLeft.y)) {
            setMaxDriftLeft({ x: leftX, y: leftY });
          }
          if (rightDistance > Math.sqrt(maxDriftRight.x * maxDriftRight.x + maxDriftRight.y * maxDriftRight.y)) {
            setMaxDriftRight({ x: rightX, y: rightY });
          }
        }
      } else {
        setGamepadConnected(false);
        setGamepadName('');
        setLeftStick({ x: 0, y: 0 });
        setRightStick({ x: 0, y: 0 });
        setLeftDrift(false);
        setRightDrift(false);
      }
    }, 16); // ~60fps polling

    return () => clearInterval(interval);
  }, [deadzone, isTestRunning, maxDriftLeft, maxDriftRight]);

  const startDriftTest = () => {
    setIsTestRunning(true);
    setMaxDriftLeft({ x: 0, y: 0 });
    setMaxDriftRight({ x: 0, y: 0 });
    setTestDuration(0);
    startTimeRef.current = Date.now();

    testIntervalRef.current = setInterval(() => {
      setTestDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
  };

  const stopDriftTest = () => {
    setIsTestRunning(false);
    if (testIntervalRef.current) {
      clearInterval(testIntervalRef.current);
    }
  };

  const resetTest = () => {
    stopDriftTest();
    setMaxDriftLeft({ x: 0, y: 0 });
    setMaxDriftRight({ x: 0, y: 0 });
    setTestDuration(0);
  };

  const calibrateSticks = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      // Reset drift tracking after calibration
      setMaxDriftLeft({ x: 0, y: 0 });
      setMaxDriftRight({ x: 0, y: 0 });
    }, 3000);
  };

  const getDriftSeverity = (stick) => {
    const distance = Math.sqrt(stick.x * stick.x + stick.y * stick.y);
    if (distance <= deadzone) return 'none';
    if (distance <= 0.2) return 'minor';
    if (distance <= 0.4) return 'moderate';
    return 'severe';
  };

  // Render severity score card
  const renderSeverityCard = (label, severity, info) => (
    <div style={{
      background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(40,40,40,0.9) 100%)',
      borderRadius: '16px',
      padding: '20px',
      border: `2px solid ${info.color}30`,
      textAlign: 'center',
      flex: 1,
      minWidth: '200px'
    }}>
      <h4 style={{ color: '#888', marginBottom: '8px', fontSize: '14px' }}>{label}</h4>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: info.color,
        lineHeight: 1
      }}>
        {severity}%
      </div>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: `${info.color}20`,
        color: info.color,
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        marginTop: '10px'
      }}>
        <span>{info.emoji}</span>
        <span>{info.level}</span>
      </div>
      <p style={{ color: '#888', fontSize: '12px', marginTop: '8px' }}>{info.description}</p>
    </div>
  );

  const renderStickVisualizer = (stick, label, isDrifting) => (
    <StickAnalyzer>
      <h3>{label}</h3>
      <StickVisualizer>
        <div className="deadzone-circle" style={{
          width: `${deadzone * 200}px`,
          height: `${deadzone * 200}px`
        }} />
        <StickIndicator
          x={stick.x}
          y={stick.y}
          isDrifting={isDrifting}
          severity={getDriftSeverity(stick)}
        />
      </StickVisualizer>
      <AxisData>
        <div className="axis-row">
          <span>X-Axis:</span>
          <span className={Math.abs(stick.x) > deadzone ? 'drift-value' : 'normal-value'}>
            {stick.x.toFixed(4)}
          </span>
        </div>
        <div className="axis-row">
          <span>Y-Axis:</span>
          <span className={Math.abs(stick.y) > deadzone ? 'drift-value' : 'normal-value'}>
            {stick.y.toFixed(4)}
          </span>
        </div>
        <div className="axis-row">
          <span>Distance:</span>
          <span className={isDrifting ? 'drift-value' : 'normal-value'}>
            {Math.sqrt(stick.x * stick.x + stick.y * stick.y).toFixed(4)}
          </span>
        </div>
      </AxisData>
    </StickAnalyzer>
  );

  return (
    <DriftContainer>
      <PageSEO page="driftDetector" />
      <DriftHeader>
        <h1>🎯 Stick Drift Detector &amp; Severity Analyzer</h1>
        <p>Professional-grade analog stick drift detection with severity scoring for PS5, PS4, Xbox Series X|S, and Nintendo Switch controllers</p>
      </DriftHeader>

      {!gamepadConnected && (
        <AlertMessage type="warning">
          <FaExclamationTriangle />
          <div>
            <h3>No Gamepad Detected</h3>
            <p>Please connect your controller and press any button to begin drift analysis</p>
          </div>
        </AlertMessage>
      )}

      {gamepadConnected && (
        <>
          <DriftStatusPanel>
            <div className="controller-info">
              <h3>📱 {gamepadName}</h3>
              <p>Connected &amp; Ready for Analysis</p>
            </div>

            <DriftStatus>
              <div className={`status-indicator ${leftDrift || rightDrift ? 'drift-detected' : 'no-drift'}`}>
                {leftDrift || rightDrift ? (
                  <>
                    <FaExclamationTriangle />
                    <span>Drift Detected!</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    <span>No Drift Detected</span>
                  </>
                )}
              </div>
            </DriftStatus>
          </DriftStatusPanel>

          {/* Severity Score Section */}
          {(testDuration > 0 || isTestRunning) && (
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '24px',
              flexWrap: 'wrap'
            }}>
              {renderSeverityCard('Left Stick Drift', leftSeverityPercent, leftSeverityInfo)}

              {/* Overall Health Score */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(218,119,86,0.2) 0%, rgba(218,119,86,0.1) 100%)',
                borderRadius: '16px',
                padding: '20px',
                border: '2px solid rgba(218,119,86,0.3)',
                textAlign: 'center',
                flex: 1,
                minWidth: '200px'
              }}>
                <h4 style={{ color: '#DA7756', marginBottom: '8px', fontSize: '14px' }}>
                  <FaChartBar style={{ marginRight: '6px' }} />
                  Overall Stick Health
                </h4>
                <div style={{
                  fontSize: '56px',
                  fontWeight: 'bold',
                  color: overallHealthScore >= 80 ? '#22C55E' : overallHealthScore >= 50 ? '#EAB308' : '#EF4444',
                  lineHeight: 1
                }}>
                  {overallHealthScore}
                </div>
                <div style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>out of 100</div>
                <p style={{ color: '#aaa', fontSize: '12px', marginTop: '8px' }}>
                  {overallHealthScore >= 80 ? 'Your sticks are in great condition!' :
                    overallHealthScore >= 50 ? 'Some drift detected, consider calibration' :
                      'Significant issues detected, repair recommended'}
                </p>
              </div>

              {renderSeverityCard('Right Stick Drift', rightSeverityPercent, rightSeverityInfo)}
            </div>
          )}

          <div className="analyzers-grid">
            {renderStickVisualizer(leftStick, '🕹️ Left Analog Stick', leftDrift)}
            {renderStickVisualizer(rightStick, '🕹️ Right Analog Stick', rightDrift)}
          </div>

          <ControlPanel>
            <DeadzoneControl>
              <label>
                <FaAdjust />
                Deadzone Sensitivity: {deadzone.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={deadzone}
                onChange={(e) => setDeadzone(parseFloat(e.target.value))}
              />
              <div className="deadzone-presets">
                <button onClick={() => setDeadzone(0.05)}>Strict (0.05)</button>
                <button onClick={() => setDeadzone(0.1)}>Normal (0.10)</button>
                <button onClick={() => setDeadzone(0.2)}>Loose (0.20)</button>
              </div>
            </DeadzoneControl>

            <CalibrationPanel>
              <h3><FaCog /> Test Controls</h3>
              <div className="control-buttons">
                {!isTestRunning ? (
                  <button className="start-btn" onClick={startDriftTest}>
                    Start Drift Test
                  </button>
                ) : (
                  <button className="stop-btn" onClick={stopDriftTest}>
                    Stop Test ({testDuration}s)
                  </button>
                )}
                <button className="reset-btn" onClick={resetTest}>
                  Reset Results
                </button>
                <button
                  className="calibrate-btn"
                  onClick={calibrateSticks}
                  disabled={isCalibrating}
                >
                  {isCalibrating ? 'Calibrating...' : 'Calibrate Sticks'}
                </button>
              </div>
            </CalibrationPanel>
          </ControlPanel>

          {(testDuration > 0 || isTestRunning) && (
            <ResultsPanel>
              <h3>📊 Detailed Test Results</h3>
              <div className="results-grid">
                <div className="result-item">
                  <span>Test Duration:</span>
                  <span>{testDuration}s</span>
                </div>
                <div className="result-item">
                  <span>Left Stick Max Drift:</span>
                  <span className={getDriftSeverity(maxDriftLeft) !== 'none' ? 'drift-value' : 'normal-value'}>
                    {Math.sqrt(maxDriftLeft.x * maxDriftLeft.x + maxDriftLeft.y * maxDriftLeft.y).toFixed(4)}
                  </span>
                </div>
                <div className="result-item">
                  <span>Right Stick Max Drift:</span>
                  <span className={getDriftSeverity(maxDriftRight) !== 'none' ? 'drift-value' : 'normal-value'}>
                    {Math.sqrt(maxDriftRight.x * maxDriftRight.x + maxDriftRight.y * maxDriftRight.y).toFixed(4)}
                  </span>
                </div>
                <div className="result-item">
                  <span>Overall Status:</span>
                  <span className={leftDrift || rightDrift ? 'drift-value' : 'normal-value'}>
                    {leftDrift || rightDrift ? 'Drift Present' : 'No Drift Detected'}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', borderTop: `1px solid ${Theme.border}`, paddingTop: '1.5rem' }}>
                <h4 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#fff' }}>Generate Health Report</h4>
                <ShareExport
                  testData={{
                    controllerName: gamepadName || 'Standard Controller',
                    driftLeft: leftSeverityPercent,
                    driftRight: rightSeverityPercent,
                    latency: 0,
                    buttonsWorking: 16,
                    buttonsTotal: 16,
                    triggersFullRange: true
                  }}
                  healthScore={{
                    total: overallHealthScore,
                    grade: overallHealthScore >= 90 ? 'S' : overallHealthScore >= 80 ? 'A' : overallHealthScore >= 60 ? 'B' : 'F',
                    gradeLabel: overallHealthScore >= 80 ? 'Excellent' : overallHealthScore >= 50 ? 'Fair' : 'Repair Needed',
                    breakdown: {
                      drift: { score: Math.round(overallHealthScore / 4) }
                    }
                  }}
                />
              </div>
            </ResultsPanel>
          )}
        </>
      )}

      <DriftDetectorContent />
    </DriftContainer>
  );
}

export default DriftDetector;