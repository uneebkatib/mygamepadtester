import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaStop, FaExclamationTriangle, FaCog, FaVolumeUp, FaHeart } from 'react-icons/fa';
import { GiVibratingBall } from 'react-icons/gi';
import { Theme } from '../../styles/Theme';
import PageSEO from '../SEO/PageSEO.jsx';
import { VibrationTesterContent } from '../SEO/OptimizedContent.jsx';
import {
  VibrationContainer,
  VibrationHeader,
  ControllerStatus,
  VibrationPanel,
  PatternSelector,
  PatternCard,
  IntensityControls,
  TestControls,
  VirtualController,
  ResultsSection,
  AlertMessage
} from './VibrationTester.styles';

const VIBRATION_PATTERNS = {
  'basic': {
    name: 'Basic Rumble',
    icon: '🎮',
    description: 'Standard dual-motor rumble effect',
    config: { duration: 1000, weakMagnitude: 0.5, strongMagnitude: 0.5 }
  },
  'pulse': {
    name: 'Pulse Effect',
    icon: '💓',
    description: 'Rhythmic pulsing vibration',
    config: { duration: 200, weakMagnitude: 0.8, strongMagnitude: 0.2 }
  },
  'strong': {
    name: 'Strong Impact',
    icon: '💥',
    description: 'High-intensity impact feedback',
    config: { duration: 500, weakMagnitude: 0.2, strongMagnitude: 1.0 }
  },
  'subtle': {
    name: 'Subtle Touch',
    icon: '🌊',
    description: 'Light, gentle vibration',
    config: { duration: 800, weakMagnitude: 0.3, strongMagnitude: 0.1 }
  },
  'heartbeat': {
    name: 'Heartbeat',
    icon: '❤️',
    description: 'Dual-beat pattern like a heartbeat',
    config: { duration: 150, weakMagnitude: 0.6, strongMagnitude: 0.4 }
  },
  'custom': {
    name: 'Custom Pattern',
    icon: '⚙️',
    description: 'User-defined vibration settings',
    config: { duration: 1000, weakMagnitude: 0.5, strongMagnitude: 0.5 }
  }
};

function VibrationTester() {
  const [gamepadConnected, setGamepadConnected] = useState(false);
  const [gamepadName, setGamepadName] = useState('');
  const [vibrationSupported, setVibrationSupported] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState('basic');
  const [customDuration, setCustomDuration] = useState(1000);
  const [customWeak, setCustomWeak] = useState(0.5);
  const [customStrong, setCustomStrong] = useState(0.5);
  const [testResults, setTestResults] = useState([]);
  const [isLooping, setIsLooping] = useState(false);
  
  const vibrationTimeoutRef = useRef(null);
  const loopIntervalRef = useRef(null);

  // Check gamepad connection and vibration support
  useEffect(() => {
    const checkGamepad = () => {
      const gamepad = navigator.getGamepads()[0];
      if (gamepad && gamepad.connected) {
        setGamepadConnected(true);
        setGamepadName(gamepad.id);
        setVibrationSupported(!!gamepad.vibrationActuator);
      } else {
        setGamepadConnected(false);
        setGamepadName('');
        setVibrationSupported(false);
      }
    };

    const interval = setInterval(checkGamepad, 100);
    return () => clearInterval(interval);
  }, []);

  const triggerVibration = async (pattern = selectedPattern, isTest = false) => {
    const gamepad = navigator.getGamepads()[0];
    if (!gamepad || !gamepad.vibrationActuator) return false;

    let config;
    if (pattern === 'custom') {
      config = {
        duration: customDuration,
        weakMagnitude: customWeak,
        strongMagnitude: customStrong
      };
    } else {
      config = { ...VIBRATION_PATTERNS[pattern].config };
    }

    try {
      setIsVibrating(true);
      
      if (pattern === 'heartbeat') {
        // Special heartbeat pattern with double beat
        await gamepad.vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: config.duration,
          weakMagnitude: config.weakMagnitude,
          strongMagnitude: config.strongMagnitude
        });
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        await gamepad.vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: config.duration,
          weakMagnitude: config.weakMagnitude * 0.7,
          strongMagnitude: config.strongMagnitude * 0.7
        });
      } else if (pattern === 'pulse') {
        // Pulse pattern with multiple short bursts
        for (let i = 0; i < 3; i++) {
          await gamepad.vibrationActuator.playEffect('dual-rumble', {
            startDelay: i * 250,
            duration: config.duration,
            weakMagnitude: config.weakMagnitude,
            strongMagnitude: config.strongMagnitude
          });
        }
      } else {
        // Standard vibration pattern
        await gamepad.vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: config.duration,
          weakMagnitude: config.weakMagnitude,
          strongMagnitude: config.strongMagnitude
        });
      }

      if (isTest) {
        setTestResults(prev => [...prev, {
          pattern: VIBRATION_PATTERNS[pattern].name,
          timestamp: new Date().toLocaleTimeString(),
          config: config,
          success: true
        }]);
      }

      vibrationTimeoutRef.current = setTimeout(() => {
        setIsVibrating(false);
      }, config.duration + (pattern === 'pulse' ? 500 : 0));

      return true;
    } catch (error) {
      console.error('Vibration failed:', error);
      setIsVibrating(false);
      
      if (isTest) {
        setTestResults(prev => [...prev, {
          pattern: VIBRATION_PATTERNS[pattern].name,
          timestamp: new Date().toLocaleTimeString(),
          config: config,
          success: false,
          error: error.message
        }]);
      }
      
      return false;
    }
  };

  const startLoopTest = () => {
    if (isLooping) {
      stopLoopTest();
      return;
    }

    setIsLooping(true);
    const testPattern = () => {
      triggerVibration(selectedPattern, false);
    };

    testPattern(); // Start immediately
    loopIntervalRef.current = setInterval(testPattern, 2000);
  };

  const stopLoopTest = () => {
    setIsLooping(false);
    setIsVibrating(false);
    
    if (loopIntervalRef.current) {
      clearInterval(loopIntervalRef.current);
    }
    if (vibrationTimeoutRef.current) {
      clearTimeout(vibrationTimeoutRef.current);
    }
  };

  const testPattern = (patternKey) => {
    if (isVibrating) return;
    triggerVibration(patternKey, true);
  };

  const testAllPatterns = async () => {
    const patterns = Object.keys(VIBRATION_PATTERNS).filter(p => p !== 'custom');
    
    for (let i = 0; i < patterns.length; i++) {
      if (!gamepadConnected) break;
      
      await triggerVibration(patterns[i], true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Wait between tests
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  useEffect(() => {
    return () => {
      if (vibrationTimeoutRef.current) {
        clearTimeout(vibrationTimeoutRef.current);
      }
      if (loopIntervalRef.current) {
        clearInterval(loopIntervalRef.current);
      }
    };
  }, []);

  return (
    <VibrationContainer>
      <PageSEO page="vibrationTester" />
      <VibrationHeader>
        <h1>🎮 ULTIMATE Vibration Tester</h1>
        <p>Professional haptic feedback analysis with advanced vibration patterns and intensity diagnostics</p>
      </VibrationHeader>

      {!gamepadConnected && (
        <AlertMessage type="warning">
          <FaExclamationTriangle />
          <div>
            <h3>No Gamepad Detected</h3>
            <p>Please connect your controller to test vibration functionality</p>
          </div>
        </AlertMessage>
      )}

      {gamepadConnected && !vibrationSupported && (
        <AlertMessage type="error">
          <FaExclamationTriangle />
          <div>
            <h3>Vibration Not Supported</h3>
            <p>Your controller does not support vibration feedback</p>
          </div>
        </AlertMessage>
      )}

      {gamepadConnected && (
        <>
          <ControllerStatus>
            <div className="controller-info">
              <h3>🎮 {gamepadName}</h3>
              <p>{vibrationSupported ? 'Vibration Supported ✅' : 'No Vibration Support ❌'}</p>
            </div>
            
            <VirtualController isVibrating={isVibrating}>
              <div className="controller-body">
                <GiVibratingBall className="vibration-icon" />
                <span>{isVibrating ? 'Vibrating...' : 'Ready'}</span>
              </div>
            </VirtualController>
          </ControllerStatus>

          {vibrationSupported && (
            <>
              <VibrationPanel>
                <h3>🎛️ Vibration Patterns</h3>
                <PatternSelector>
                  {Object.entries(VIBRATION_PATTERNS).map(([key, pattern]) => (
                    <PatternCard
                      key={key}
                      isSelected={selectedPattern === key}
                      onClick={() => setSelectedPattern(key)}
                      disabled={isVibrating}
                    >
                      <div className="pattern-icon">{pattern.icon}</div>
                      <div className="pattern-name">{pattern.name}</div>
                      <div className="pattern-description">{pattern.description}</div>
                      <button 
                        className="test-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          testPattern(key);
                        }}
                        disabled={isVibrating}
                      >
                        Test
                      </button>
                    </PatternCard>
                  ))}
                </PatternSelector>
              </VibrationPanel>

              {selectedPattern === 'custom' && (
                <IntensityControls>
                  <h3><FaCog /> Custom Pattern Settings</h3>
                  <div className="controls-grid">
                    <div className="control-group">
                      <label>
                        Duration: {customDuration}ms
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="3000"
                        step="100"
                        value={customDuration}
                        onChange={(e) => setCustomDuration(parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="control-group">
                      <label>
                        Weak Motor: {(customWeak * 100).toFixed(0)}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={customWeak}
                        onChange={(e) => setCustomWeak(parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div className="control-group">
                      <label>
                        Strong Motor: {(customStrong * 100).toFixed(0)}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={customStrong}
                        onChange={(e) => setCustomStrong(parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                </IntensityControls>
              )}

              <TestControls>
                <div className="control-buttons">
                  <button 
                    className="single-test-btn"
                    onClick={() => triggerVibration(selectedPattern, true)}
                    disabled={isVibrating}
                  >
                    <FaPlay />
                    Test Selected Pattern
                  </button>
                  
                  <button 
                    className={`loop-test-btn ${isLooping ? 'active' : ''}`}
                    onClick={startLoopTest}
                  >
                    {isLooping ? <FaStop /> : <FaVolumeUp />}
                    {isLooping ? 'Stop Loop' : 'Loop Test'}
                  </button>
                  
                  <button 
                    className="all-test-btn"
                    onClick={testAllPatterns}
                    disabled={isVibrating}
                  >
                    <FaHeart />
                    Test All Patterns
                  </button>
                </div>
              </TestControls>

              {testResults.length > 0 && (
                <ResultsSection>
                  <div className="results-header">
                    <h3>📊 Test Results</h3>
                    <button className="clear-btn" onClick={clearResults}>
                      Clear Results
                    </button>
                  </div>
                  
                  <div className="results-list">
                    {testResults.slice(-10).reverse().map((result, index) => (
                      <div 
                        key={testResults.length - index} 
                        className={`result-item ${result.success ? 'success' : 'error'}`}
                      >
                        <div className="result-info">
                          <span className="pattern-name">{result.pattern}</span>
                          <span className="timestamp">{result.timestamp}</span>
                        </div>
                        <div className="result-details">
                          {result.success ? (
                            <span className="success-indicator">✅ Success</span>
                          ) : (
                            <span className="error-indicator">❌ Failed</span>
                          )}
                          <span className="config">
                            {result.config.duration}ms, W:{(result.config.weakMagnitude * 100).toFixed(0)}%, S:{(result.config.strongMagnitude * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ResultsSection>
              )}
            </>
          )}
        </>
      )}
      
      {/* SEO Content Section */}
      <VibrationTesterContent />
    </VibrationContainer>
  );
}

export default VibrationTester;
