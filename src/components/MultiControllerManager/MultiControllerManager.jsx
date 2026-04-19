import React, { useState, useEffect } from 'react';
import { FaGamepad, FaUsers, FaBluetooth, FaUsb, FaCog, FaExclamationTriangle, FaPlay } from 'react-icons/fa';
import PageSEO from '../SEO/PageSEO.jsx';
import { MultiControllerContent } from '../SEO/OptimizedContent.jsx';
import { Theme } from '../../styles/Theme';
import {
  ManagerContainer,
  ManagerHeader,
  ControllersGrid,
  ControllerCard,
  ControllerStatus,
  ControllerInfo,
  ControllerActions,
  QuickTestPanel,
  NoControllersMessage
} from './MultiControllerManager.styles';

function MultiControllerManager() {
  const [controllers, setControllers] = useState([]);
  const [activeController, setActiveController] = useState(null);
  const [testingController, setTestingController] = useState(null);

  // Poll for gamepads
  useEffect(() => {
    const pollGamepads = () => {
      const gamepads = navigator.getGamepads();
      const connectedControllers = [];

      for (let i = 0; i < 4; i++) {
        const gamepad = gamepads[i];
        if (gamepad && gamepad.connected) {
          connectedControllers.push({
            index: i,
            id: gamepad.id,
            connected: gamepad.connected,
            buttons: gamepad.buttons ? gamepad.buttons.length : 0,
            axes: gamepad.axes ? gamepad.axes.length : 0,
            vibrationSupported: !!gamepad.vibrationActuator,
            timestamp: gamepad.timestamp,
            mapping: gamepad.mapping || 'unknown'
          });
        }
      }

      setControllers(connectedControllers);
      
      // Set first controller as active if none selected
      if (!activeController && connectedControllers.length > 0) {
        setActiveController(connectedControllers[0]);
      }
      
      // Clear active controller if it disconnects
      if (activeController && !connectedControllers.find(c => c.index === activeController.index)) {
        setActiveController(connectedControllers[0] || null);
      }
    };

    const interval = setInterval(pollGamepads, 100);
    return () => clearInterval(interval);
  }, [activeController]);

  const getControllerType = (id) => {
    const idLower = id.toLowerCase();
    if (idLower.includes('xbox')) return { type: 'Xbox', icon: '🎮', color: '#107C10' };
    if (idLower.includes('playstation') || idLower.includes('ps4') || idLower.includes('ps5') || idLower.includes('dualshock') || idLower.includes('dualsense')) 
      return { type: 'PlayStation', icon: '🎮', color: '#003791' };
    if (idLower.includes('nintendo') || idLower.includes('switch') || idLower.includes('joy-con')) 
      return { type: 'Nintendo', icon: '🎮', color: '#E60012' };
    if (idLower.includes('steam')) return { type: 'Steam', icon: '🎮', color: '#1B2838' };
    return { type: 'Generic', icon: '🎮', color: Theme.primary };
  };

  const getConnectionType = (id) => {
    const idLower = id.toLowerCase();
    if (idLower.includes('wireless') || idLower.includes('bluetooth')) {
      return { type: 'Wireless', icon: <FaBluetooth />, color: '#0066CC' };
    }
    return { type: 'Wired', icon: <FaUsb />, color: '#FF6B35' };
  };

  const testController = async (controller) => {
    setTestingController(controller.index);
    
    try {
      const gamepad = navigator.getGamepads()[controller.index];
      if (gamepad && gamepad.vibrationActuator) {
        await gamepad.vibrationActuator.playEffect('dual-rumble', {
          duration: 500,
          weakMagnitude: 0.5,
          strongMagnitude: 0.5
        });
      }
      
      setTimeout(() => {
        setTestingController(null);
      }, 600);
    } catch (error) {
      console.error('Test vibration failed:', error);
      setTestingController(null);
    }
  };

  const selectController = (controller) => {
    setActiveController(controller);
  };

  const refreshControllers = () => {
    // Force a refresh by clearing state; the 100ms polling loop 
    // in useEffect will automatically re-populate the list.
    setControllers([]);
  };

  const formatControllerName = (id) => {
    // Clean up controller name for display
    return id
      .replace(/\(.*?\)/g, '') // Remove parentheses content
      .replace(/Controller|Gamepad|Wireless/gi, '') // Remove common words
      .trim()
      .substring(0, 30); // Limit length
  };

  const getHealthStatus = (controller) => {
    // Simple health check based on timestamp updates
    const gamepad = navigator.getGamepads()[controller.index];
    if (!gamepad) return 'disconnected';
    
    // Check if buttons are responsive
    if (gamepad.buttons && gamepad.axes) {
      return 'healthy';
    }
    
    return 'warning';
  };

  return (
    <>
      <ManagerContainer>
      <PageSEO page="multiController" />
      <ManagerHeader>
        <h1>🎮 Multi-Controller Manager</h1>
        <p>Monitor and manage multiple gamepad controllers simultaneously</p>
        <button className="refresh-btn" onClick={refreshControllers}>
          <FaCog />
          Refresh Controllers
        </button>
      </ManagerHeader>

      {controllers.length === 0 ? (
        <NoControllersMessage>
          <FaExclamationTriangle />
          <div>
            <h3>No Controllers Detected</h3>
            <p>Connect your gamepad controllers and press any button to register them</p>
            <ul>
              <li>Make sure your controller is properly connected (USB or Bluetooth)</li>
              <li>Press any button on your controller to activate it</li>
              <li>Try refreshing the page if controllers don't appear</li>
              <li>Some controllers may require specific drivers</li>
            </ul>
          </div>
        </NoControllersMessage>
      ) : (
        <>
          <ControllersGrid>
            {controllers.map((controller) => {
              const controllerType = getControllerType(controller.id);
              const connectionType = getConnectionType(controller.id);
              const healthStatus = getHealthStatus(controller);
              const isActive = activeController?.index === controller.index;
              const isTesting = testingController === controller.index;

              return (
                <ControllerCard
                  key={controller.index}
                  isActive={isActive}
                  healthStatus={healthStatus}
                  onClick={() => selectController(controller)}
                >
                  <ControllerStatus>
                    <div className="controller-index">#{controller.index + 1}</div>
                    <div className="health-indicator" title={`Status: ${healthStatus}`}>
                      {healthStatus === 'healthy' && '🟢'}
                      {healthStatus === 'warning' && '🟡'}
                      {healthStatus === 'disconnected' && '🔴'}
                    </div>
                  </ControllerStatus>

                  <ControllerInfo>
                    <div className="controller-icon" style={{ color: controllerType.color }}>
                      {controllerType.icon}
                    </div>
                    
                    <div className="controller-details">
                      <h3>{controllerType.type}</h3>
                      <p className="controller-name">
                        {formatControllerName(controller.id)}
                      </p>
                      
                      <div className="connection-info">
                        <span 
                          className="connection-type" 
                          style={{ color: connectionType.color }}
                        >
                          {connectionType.icon}
                          {connectionType.type}
                        </span>
                      </div>
                      
                      <div className="specs">
                        <span>{controller.buttons} Buttons</span>
                        <span>{controller.axes} Axes</span>
                        <span>{controller.vibrationSupported ? 'Vibration ✅' : 'No Vibration ❌'}</span>
                      </div>
                      
                      <div className="mapping-info">
                        <span>Mapping: {controller.mapping}</span>
                      </div>
                    </div>
                  </ControllerInfo>

                  <ControllerActions>
                    <button 
                      className="test-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        testController(controller);
                      }}
                      disabled={isTesting || !controller.vibrationSupported}
                    >
                      {isTesting ? '🔄 Testing...' : '🧪 Test Vibration'}
                    </button>
                    
                    <button 
                      className="select-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectController(controller);
                      }}
                    >
                      {isActive ? '✅ Active' : '👆 Select'}
                    </button>
                  </ControllerActions>
                </ControllerCard>
              );
            })}
          </ControllersGrid>

          {activeController && (
            <QuickTestPanel>
              <h3>🎯 Active Controller: {getControllerType(activeController.id).type} #{activeController.index + 1}</h3>
              <div className="quick-actions">
                <div className="action-group">
                  <span>Quick Tests:</span>
                  <button onClick={() => testController(activeController)}>
                    <FaPlay />
                    Vibration Test
                  </button>
                </div>
                
                <div className="action-group">
                  <span>Advanced Tests:</span>
                  <button onClick={() => window.location.href = '/drift-test'}>
                    🎯 Drift Test
                  </button>
                  <button onClick={() => window.location.href = '/latency-test'}>
                    ⚡ Latency Test
                  </button>
                </div>
              </div>
              
              <div className="real-time-data">
                <h4>Real-time Data</h4>
                <div className="data-grid">
                  <RealTimeDisplay controller={activeController} />
                </div>
              </div>
            </QuickTestPanel>
          )}
        </>
      )}
      </ManagerContainer>
      <MultiControllerContent />
    </>
  );
}

// Real-time data display component
function RealTimeDisplay({ controller }) {
  const [gamepadData, setGamepadData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const gamepad = navigator.getGamepads()[controller.index];
      if (gamepad) {
        setGamepadData({
          timestamp: gamepad.timestamp,
          buttonsPressed: gamepad.buttons ? gamepad.buttons.filter(btn => btn.pressed).length : 0,
          leftStick: gamepad.axes ? { x: gamepad.axes[0]?.toFixed(3) || 0, y: gamepad.axes[1]?.toFixed(3) || 0 } : { x: 0, y: 0 },
          rightStick: gamepad.axes ? { x: gamepad.axes[2]?.toFixed(3) || 0, y: gamepad.axes[3]?.toFixed(3) || 0 } : { x: 0, y: 0 },
          triggers: gamepad.buttons ? {
            left: gamepad.buttons[6]?.value.toFixed(3) || 0,
            right: gamepad.buttons[7]?.value.toFixed(3) || 0
          } : { left: 0, right: 0 }
        });
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [controller.index]);

  if (!gamepadData) return <div>Loading data...</div>;

  return (
    <>
      <div className="data-item">
        <span>Buttons Pressed:</span>
        <span className={gamepadData.buttonsPressed > 0 ? 'active' : 'inactive'}>
          {gamepadData.buttonsPressed}
        </span>
      </div>
      <div className="data-item">
        <span>Left Stick:</span>
        <span className="stick-data">
          X: {gamepadData.leftStick.x}, Y: {gamepadData.leftStick.y}
        </span>
      </div>
      <div className="data-item">
        <span>Right Stick:</span>
        <span className="stick-data">
          X: {gamepadData.rightStick.x}, Y: {gamepadData.rightStick.y}
        </span>
      </div>
      <div className="data-item">
        <span>Triggers:</span>
        <span className="trigger-data">
          L: {gamepadData.triggers.left}, R: {gamepadData.triggers.right}
        </span>
      </div>
      <div className="data-item">
        <span>Last Update:</span>
        <span className="timestamp">
          {new Date(gamepadData.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </>
  );
}

export default MultiControllerManager;
