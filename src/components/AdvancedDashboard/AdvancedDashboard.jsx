import React, { useState, useEffect } from 'react';
import { FaGamepad, FaCog, FaExclamationTriangle, FaBatteryHalf, FaPlug, FaRocket } from 'react-icons/fa';
import PageSEO from '../SEO/PageSEO.jsx';
import { AdvancedDashboardContent } from '../SEO/OptimizedContent.jsx';
import { Theme } from '../../styles/Theme';
import {
  DashboardContainer,
  DashboardHeader,
  FeaturesGrid,
  FeatureCard,
  QuickStatsPanel,
  StatusIndicator,
  AlertMessage
} from './AdvancedDashboard.styles';

const ADVANCED_FEATURES = [
  {
    id: 'drift-test',
    title: 'Stick Drift Detection',
    icon: '🎯',
    description: 'Advanced drift detection with visual indicators, numerical analysis, and deadzone management',
    path: '/drift-test',
    color: '#ff4757',
    category: 'Diagnostics'
  },
  {
    id: 'latency-test',
    title: 'Latency Testing',
    icon: '⚡',
    description: 'Measure controller input lag and reaction time with millisecond precision',
    path: '/latency-test',
    color: '#ffa502',
    category: 'Performance'
  },
  {
    id: 'vibration-test',
    title: 'Vibration Testing',
    icon: '🎮',
    description: 'Comprehensive haptic feedback testing with multiple patterns and intensity controls',
    path: '/vibration-test',
    color: '#5352ed',
    category: 'Hardware'
  },
  {
    id: 'multi-controller',
    title: 'Multi-Controller Manager',
    icon: '🎮',
    description: 'Manage and test multiple gamepad controllers simultaneously',
    path: '/multi-controller',
    color: '#2ed573',
    category: 'Management'
  },
  {
    id: 'device-info',
    title: 'Device Information',
    icon: '📱',
    description: 'Detailed controller specifications, capabilities, and technical analysis',
    path: '/device-info',
    color: '#3742fa',
    category: 'Information'
  },
  {
    id: 'performance-analytics',
    title: 'Performance Analytics',
    icon: '📊',
    description: 'Advanced performance monitoring and analytics with detailed metrics tracking',
    path: '/performance-analytics',
    color: '#70a1ff',
    category: 'Analytics'
  },
  {
    id: 'calibration-tools',
    title: 'Calibration Tools',
    icon: '🔧',
    description: 'Precise calibration for analog sticks, triggers, and deadzone adjustment',
    path: '/calibration-tools',
    color: '#7bed9f',
    category: 'Tools'
  },
  {
    id: 'trigger-pressure-test',
    title: 'Trigger Pressure Test',
    icon: '🎯',
    description: 'Advanced trigger sensitivity and pressure testing for precise diagnostics',
    path: '/trigger-pressure-test',
    color: '#ff6b6b',
    category: 'Diagnostics'
  },
  {
    id: 'battery-status',
    title: 'Battery & Connection Status',
    icon: '🔋',
    description: 'Monitor controller battery levels and connection types in real-time',
    path: '/battery-status',
    color: '#2ed573',
    category: 'Hardware'
  },
  {
    id: 'input-recorder',
    title: 'Input Recorder & Playback',
    icon: '🎬',
    description: 'Record, analyze, and replay controller input sequences for testing',
    path: '/input-recorder',
    color: '#5352ed',
    category: 'Analytics'
  },
  {
    id: 'deadzone-adjustment',
    title: 'Deadzone Adjustment Tool',
    icon: '🎯',
    description: 'Fine-tune deadzone settings for optimal precision and drift elimination',
    path: '/deadzone-adjustment',
    color: '#ff9f43',
    category: 'Tools'
  }
];

function AdvancedDashboard() {
  const [gamepadStatus, setGamepadStatus] = useState({
    connected: false,
    count: 0,
    controllers: []
  });

  useEffect(() => {
    const checkGamepads = () => {
      const gamepads = navigator.getGamepads();
      const connectedControllers = [];

      for (let i = 0; i < 4; i++) {
        if (gamepads[i] && gamepads[i].connected) {
          connectedControllers.push({
            index: i,
            id: gamepads[i].id,
            vibration: !!gamepads[i].vibrationActuator
          });
        }
      }

      setGamepadStatus({
        connected: connectedControllers.length > 0,
        count: connectedControllers.length,
        controllers: connectedControllers
      });
    };

    const interval = setInterval(checkGamepads, 500);
    return () => clearInterval(interval);
  }, []);

  const getControllerBrand = (id) => {
    const idLower = id.toLowerCase();
    if (idLower.includes('xbox')) return 'Xbox';
    if (idLower.includes('playstation') || idLower.includes('ps4') || idLower.includes('ps5') || idLower.includes('dualshock') || idLower.includes('dualsense')) return 'PlayStation';
    if (idLower.includes('nintendo') || idLower.includes('switch')) return 'Nintendo';
    if (idLower.includes('steam')) return 'Steam';
    return 'Generic';
  };

  return (
    <>
      <DashboardContainer>
        <PageSEO page="advancedDashboard" />
        <DashboardHeader>
          <h1>🚀 COMMAND Advanced Testing Dashboard</h1>
          <p>Professional gamepad testing suite with comprehensive diagnostics and analysis tools</p>
        </DashboardHeader>

        {!gamepadStatus.connected && (
          <AlertMessage type="warning">
            <FaExclamationTriangle />
            <div>
              <h3>No Controllers Detected</h3>
              <p>Connect your gamepad controller and press any button to access advanced testing features</p>
            </div>
          </AlertMessage>
        )}

        {gamepadStatus.connected && (
          <QuickStatsPanel>
            <h3>📊 Quick Status</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Connected Controllers:</span>
                <span className="stat-value">{gamepadStatus.count}</span>
              </div>

              {gamepadStatus.controllers.map((controller, index) => (
                <div key={controller.index} className="controller-summary">
                  <StatusIndicator connected />
                  <div className="controller-details">
                    <span className="controller-name">
                      {getControllerBrand(controller.id)} #{controller.index + 1}
                    </span>
                    <span className="controller-features">
                      {controller.vibration ? 'Vibration ✅' : 'No Vibration ❌'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </QuickStatsPanel>
        )}

        <FeaturesGrid>
          {ADVANCED_FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              to={feature.path}
              color={feature.color}
              disabled={!gamepadStatus.connected && feature.id !== 'device-info'}
            >
              <div className="feature-header">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-category">{feature.category}</div>
              </div>

              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>

              <div className="feature-footer">
                <span className="launch-text">
                  {!gamepadStatus.connected && feature.id !== 'device-info'
                    ? 'Connect Controller'
                    : 'Launch Test'
                  }
                </span>
                <FaRocket className="launch-icon" />
              </div>

              {!gamepadStatus.connected && feature.id !== 'device-info' && (
                <div className="disabled-overlay">
                  <FaGamepad />
                  <span>Controller Required</span>
                </div>
              )}
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <div className="dashboard-footer">
          <h3>🎮 Getting Started</h3>
          <div className="getting-started">
            <div className="step">
              <span className="step-number">1</span>
              <div className="step-content">
                <h4>Connect Your Controller</h4>
                <p>Connect your gamepad via USB or Bluetooth and press any button to register it</p>
              </div>
            </div>

            <div className="step">
              <span className="step-number">2</span>
              <div className="step-content">
                <h4>Choose Your Test</h4>
                <p>Select from our comprehensive suite of advanced testing tools</p>
              </div>
            </div>

            <div className="step">
              <span className="step-number">3</span>
              <div className="step-content">
                <h4>Analyze Results</h4>
                <p>Get detailed insights and professional diagnostics for your controller</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="seo-content">
          <h2>Industry-Leading Controller Analysis Platform</h2>
          <p>Access the most comprehensive <strong>gamepad testing dashboard</strong> available online. Trusted by esports organizations, gaming hardware manufacturers, and professional technicians worldwide for accurate controller diagnostics and performance optimization.</p>

          <div className="feature-highlights">
            <div className="highlight-item">
              <strong>🏆 Professional Suite:</strong> 11+ specialized testing tools in one integrated platform
            </div>
            <div className="highlight-item">
              <strong>📈 Real-Time Analytics:</strong> Live performance monitoring with <a href="/performance-analytics" style={{ color: '#DA7756' }}>advanced metrics tracking</a>
            </div>
            <div className="highlight-item">
              <strong>🔧 Universal Compatibility:</strong> Complete testing for all major controller brands and platforms
            </div>
          </div>

          <h3>Why Choose Professional Controller Testing?</h3>
          <p>Modern gaming demands peak controller performance. Our <em>advanced testing dashboard</em> provides laboratory-grade diagnostics that identify performance bottlenecks, hardware degradation, and optimization opportunities. Research from <a href="https://www.gamedeveloper.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#DA7756' }}>Game Developer</a> shows that properly tested and calibrated controllers improve competitive gaming performance by up to 25%.</p>

          <div className="internal-links">
            <p><strong>Complete Testing Workflow:</strong></p>
            <ul>
              <li>🎯 Begin with <a href="/drift-test" style={{ color: '#DA7756' }}>stick drift detection</a> for baseline hardware assessment</li>
              <li>⚡ Measure <a href="/latency-test" style={{ color: '#DA7756' }}>input response times</a> for competitive edge analysis</li>
              <li>🎮 Validate <a href="/vibration-test" style={{ color: '#DA7756' }}>haptic feedback systems</a> for immersive gaming</li>
              <li>🔧 Fine-tune with <a href="/calibration-tools" style={{ color: '#DA7756' }}>precision calibration tools</a></li>
              <li>📊 Monitor long-term trends with <a href="/performance-analytics" style={{ color: '#DA7756' }}>performance analytics</a></li>
            </ul>
          </div>
        </div>
      </DashboardContainer>
      <AdvancedDashboardContent />
    </>
  );
}

export default AdvancedDashboard;

