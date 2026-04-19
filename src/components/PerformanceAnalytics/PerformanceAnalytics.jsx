import React, { useState, useEffect, useRef } from 'react';
import { FaChartLine, FaPlay, FaStop } from 'react-icons/fa';
import PageSEO from '../SEO/PageSEO.jsx';
import { PerformanceAnalyticsContent } from '../SEO/OptimizedContent.jsx';
import { Theme } from '../../styles/Theme';
import {
  AnalyticsContainer,
  AnalyticsHeader,
  MetricsGrid,
  MetricCard,
  ChartContainer,
  ControlsPanel,
  SessionSummary,
  ExportPanel
} from './PerformanceAnalytics.styles';

function PerformanceAnalytics() {
  const [gamepadIndex, setGamepadIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionData, setSessionData] = useState({
    startTime: null,
    inputCount: 0,
    averageLatency: 0,
    buttonPresses: {},
    stickMovements: 0,
    sessionDuration: 0
  });
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    currentLatency: 0,
    inputsPerSecond: 0,
    accuracy: 100,
    driftDetected: false
  });

  const intervalRef = useRef(null);
  const lastInputTime = useRef(0);
  const inputBuffer = useRef([]);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        recordPerformanceData();
      }, 16); // ~60fps monitoring
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, gamepadIndex]);

  const recordPerformanceData = () => {
    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (!gamepad || !gamepad.connected) return;

    const currentTime = performance.now();
    
    // Calculate input latency (simplified)
    const latency = currentTime - lastInputTime.current;
    lastInputTime.current = currentTime;

    // Count button presses
    let currentInputCount = sessionData.inputCount;
    let buttonPresses = { ...sessionData.buttonPresses };
    
    gamepad.buttons.forEach((button, index) => {
      if (button.pressed) {
        buttonPresses[`B${index}`] = (buttonPresses[`B${index}`] || 0) + 1;
        currentInputCount++;
      }
    });

    // Count stick movements (significant movements only)
    let stickMovements = sessionData.stickMovements;
    gamepad.axes.forEach((axis, index) => {
      if (Math.abs(axis) > 0.3) {
        stickMovements++;
      }
    });

    // Calculate inputs per second
    const sessionDuration = (currentTime - sessionData.startTime) / 1000;
    const inputsPerSecond = sessionDuration > 0 ? currentInputCount / sessionDuration : 0;

    // Update buffer for real-time metrics
    inputBuffer.current.push({
      timestamp: currentTime,
      latency: latency,
      inputCount: currentInputCount
    });

    // Keep only last 60 data points (1 second at 60fps)
    if (inputBuffer.current.length > 60) {
      inputBuffer.current.shift();
    }

    // Calculate real-time metrics
    const avgLatency = inputBuffer.current.reduce((sum, data) => sum + data.latency, 0) / inputBuffer.current.length;
    
    setSessionData({
      ...sessionData,
      inputCount: currentInputCount,
      buttonPresses,
      stickMovements,
      sessionDuration,
      averageLatency: avgLatency
    });

    setRealTimeMetrics({
      currentLatency: latency,
      inputsPerSecond: Math.round(inputsPerSecond * 10) / 10,
      accuracy: calculateAccuracy(gamepad),
      driftDetected: detectDrift(gamepad)
    });
  };

  const calculateAccuracy = (gamepad) => {
    // Simple accuracy calculation based on stick precision
    const leftStick = Math.sqrt(gamepad.axes[0] ** 2 + gamepad.axes[1] ** 2);
    const rightStick = Math.sqrt(gamepad.axes[2] ** 2 + gamepad.axes[3] ** 2);
    
    // Calculate precision (less drift = higher accuracy)
    const precision = 100 - Math.min(leftStick + rightStick, 1) * 20;
    return Math.round(precision);
  };

  const detectDrift = (gamepad) => {
    // Simple drift detection
    const threshold = 0.1;
    return Math.abs(gamepad.axes[0]) > threshold || 
           Math.abs(gamepad.axes[1]) > threshold ||
           Math.abs(gamepad.axes[2]) > threshold || 
           Math.abs(gamepad.axes[3]) > threshold;
  };

  const startSession = () => {
    setIsRecording(true);
    setSessionData({
      startTime: performance.now(),
      inputCount: 0,
      averageLatency: 0,
      buttonPresses: {},
      stickMovements: 0,
      sessionDuration: 0
    });
    setPerformanceHistory([]);
  };

  const stopSession = () => {
    setIsRecording(false);
    // Save session to history
    setPerformanceHistory(prev => [...prev, {
      ...sessionData,
      endTime: performance.now(),
      id: Date.now()
    }]);
  };

  const exportData = () => {
    const data = {
      sessionData,
      performanceHistory,
      exportTime: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gamepad-performance-${Date.now()}.json`;
    a.click();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
    <AnalyticsContainer>
      <PageSEO page="performanceAnalytics" />
      <AnalyticsHeader>
        <h1>📊 Performance Analytics</h1>
        <p>Advanced performance monitoring and analytics for your gamepad</p>
      </AnalyticsHeader>

      <ControlsPanel>
        <div className="controls-group">
          <label htmlFor="gamepad-select">Select Controller:</label>
          <select
            id="gamepad-select"
            value={gamepadIndex}
            onChange={(e) => setGamepadIndex(parseInt(e.target.value))}
          >
            {[0, 1, 2, 3].map(index => (
              <option key={index} value={index}>
                Controller #{index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="controls-group">
          {!isRecording ? (
            <button className="start-btn" onClick={startSession}>
              🎬 Start Recording
            </button>
          ) : (
            <button className="stop-btn" onClick={stopSession}>
              ⏹️ Stop Recording
            </button>
          )}
        </div>

        <div className="recording-status">
          <span className={`status-indicator ${isRecording ? 'recording' : 'stopped'}`}></span>
          {isRecording ? 'Recording...' : 'Stopped'}
        </div>
      </ControlsPanel>

      <MetricsGrid>
        <MetricCard>
          <div className="metric-header">
            <span className="metric-icon">⚡</span>
            <h3>Current Latency</h3>
          </div>
          <div className="metric-value">
            {realTimeMetrics.currentLatency.toFixed(1)}ms
          </div>
          <div className="metric-trend">
            {realTimeMetrics.currentLatency < 50 ? '🟢 Excellent' : 
             realTimeMetrics.currentLatency < 100 ? '🟡 Good' : '🔴 High'}
          </div>
        </MetricCard>

        <MetricCard>
          <div className="metric-header">
            <span className="metric-icon">🎯</span>
            <h3>Inputs/Second</h3>
          </div>
          <div className="metric-value">
            {realTimeMetrics.inputsPerSecond}
          </div>
          <div className="metric-trend">
            {realTimeMetrics.inputsPerSecond > 5 ? '🔥 Active' : 
             realTimeMetrics.inputsPerSecond > 1 ? '📊 Moderate' : '😴 Low'}
          </div>
        </MetricCard>

        <MetricCard>
          <div className="metric-header">
            <span className="metric-icon">🎯</span>
            <h3>Accuracy</h3>
          </div>
          <div className="metric-value">
            {realTimeMetrics.accuracy}%
          </div>
          <div className="metric-trend">
            {realTimeMetrics.accuracy > 95 ? '🟢 Perfect' : 
             realTimeMetrics.accuracy > 80 ? '🟡 Good' : '🔴 Check Drift'}
          </div>
        </MetricCard>

        <MetricCard>
          <div className="metric-header">
            <span className="metric-icon">🔍</span>
            <h3>Drift Status</h3>
          </div>
          <div className="metric-value">
            {realTimeMetrics.driftDetected ? '⚠️' : '✅'}
          </div>
          <div className="metric-trend">
            {realTimeMetrics.driftDetected ? '🔴 Drift Detected' : '🟢 No Drift'}
          </div>
        </MetricCard>
      </MetricsGrid>

      {isRecording && (
        <SessionSummary>
          <h3>📋 Current Session</h3>
          <div className="session-stats">
            <div className="stat">
              <span className="stat-label">Duration:</span>
              <span className="stat-value">{formatDuration(sessionData.sessionDuration)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total Inputs:</span>
              <span className="stat-value">{sessionData.inputCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Stick Movements:</span>
              <span className="stat-value">{sessionData.stickMovements}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Avg Latency:</span>
              <span className="stat-value">{sessionData.averageLatency.toFixed(1)}ms</span>
            </div>
          </div>

          <div className="button-stats">
            <h4>Button Press Count:</h4>
            <div className="button-grid">
              {Object.entries(sessionData.buttonPresses).map(([button, count]) => (
                <div key={button} className="button-stat">
                  <span className="button-name">{button}:</span>
                  <span className="button-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </SessionSummary>
      )}

      <ExportPanel>
        <h3>💾 Export Data</h3>
        <div className="export-options">
          <button onClick={exportData} disabled={!sessionData.inputCount}>
            📥 Export JSON Data
          </button>
          <span className="export-info">
            Export performance data for analysis in external tools
          </span>
        </div>
      </ExportPanel>

      <div className="analytics-footer">
        <h3>📈 Performance Tips</h3>
        <div className="tips-grid">
          <div className="tip">
            <h4>🎯 Improve Accuracy</h4>
            <p>Calibrate your controller sticks regularly and check for drift issues</p>
          </div>
          <div className="tip">
            <h4>⚡ Reduce Latency</h4>
            <p>Use wired connection and ensure drivers are up to date</p>
          </div>
          <div className="tip">
            <h4>📊 Monitor Trends</h4>
            <p>Regular monitoring helps identify controller degradation early</p>
          </div>
        </div>
      </div>
    </AnalyticsContainer>
      <PerformanceAnalyticsContent />
    </>
  );
}

export default PerformanceAnalytics;
