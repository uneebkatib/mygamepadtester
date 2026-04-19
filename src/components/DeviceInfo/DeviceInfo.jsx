import React, { useState, useEffect } from 'react';
import { FaGamepad, FaMicrochip, FaExclamationTriangle, FaCopy, FaCheck, FaInfoCircle } from 'react-icons/fa';
import PageSEO from '../SEO/PageSEO.jsx';
import { DeviceInfoContent } from '../SEO/OptimizedContent.jsx';
import { Theme } from '../../styles/Theme';
import {
  DeviceContainer,
  DeviceHeader,
  DeviceOverview,
  SpecsGrid,
  SpecCard,
  TechnicalDetails,
  CapabilitiesPanel,
  RawDataSection,
  AlertMessage
} from './DeviceInfo.styles';

function DeviceInfo() {
  const [gamepadConnected, setGamepadConnected] = useState(false);
  const [gamepadData, setGamepadData] = useState(null);
  const [copiedData, setCopiedData] = useState(false);

  useEffect(() => {
    const pollGamepad = () => {
      const gamepad = navigator.getGamepads()[0];

      if (gamepad && gamepad.connected) {
        setGamepadConnected(true);
        setGamepadData({
          // Basic Info
          id: gamepad.id,
          index: gamepad.index,
          connected: gamepad.connected,
          timestamp: gamepad.timestamp,
          mapping: gamepad.mapping,

          // Input Capabilities
          buttons: gamepad.buttons ? gamepad.buttons.length : 0,
          axes: gamepad.axes ? gamepad.axes.length : 0,

          // Advanced Features
          vibrationActuator: gamepad.vibrationActuator ? {
            type: gamepad.vibrationActuator.type || 'dual-rumble',
            playEffect: typeof gamepad.vibrationActuator.playEffect === 'function'
          } : null,

          pose: gamepad.pose || null,
          hand: gamepad.hand || 'unknown',
          displayId: gamepad.displayId || null,

          // Button Details
          buttonDetails: gamepad.buttons ? gamepad.buttons.map((button, index) => ({
            index,
            pressed: button.pressed,
            touched: button.touched,
            value: button.value
          })) : [],

          // Axes Details
          axesDetails: gamepad.axes ? gamepad.axes.map((axis, index) => ({
            index,
            value: axis
          })) : [],

          // Browser Support Info
          browserInfo: {
            userAgent: navigator.userAgent,
            gamepadSupport: 'getGamepads' in navigator,
            vibrationSupport: gamepad.vibrationActuator ? true : false,
            timestamp: Date.now()
          }
        });
      } else {
        setGamepadConnected(false);
        setGamepadData(null);
      }
    };

    const interval = setInterval(pollGamepad, 100);
    return () => clearInterval(interval);
  }, []);

  const getControllerBrand = (id) => {
    const idLower = id.toLowerCase();
    if (idLower.includes('xbox')) return { brand: 'Microsoft', series: 'Xbox', color: '#107C10' };
    if (idLower.includes('playstation') || idLower.includes('ps4') || idLower.includes('ps5') || idLower.includes('dualshock') || idLower.includes('dualsense'))
      return { brand: 'Sony', series: 'PlayStation', color: '#003791' };
    if (idLower.includes('nintendo') || idLower.includes('switch') || idLower.includes('joy-con'))
      return { brand: 'Nintendo', series: 'Switch', color: '#E60012' };
    if (idLower.includes('steam')) return { brand: 'Valve', series: 'Steam', color: '#1B2838' };
    return { brand: 'Unknown', series: 'Generic', color: Theme.primary };
  };

  const getConnectionType = (id) => {
    const idLower = id.toLowerCase();
    if (idLower.includes('wireless') || idLower.includes('bluetooth')) return 'Bluetooth/Wireless';
    if (idLower.includes('usb') || idLower.includes('wired')) return 'USB/Wired';
    return 'Unknown';
  };

  const getMappingDescription = (mapping) => {
    switch (mapping) {
      case 'standard': return 'Standard Gamepad Layout (W3C)';
      case 'xr-standard': return 'WebXR Standard Mapping';
      default: return 'Non-standard or Custom Layout';
    }
  };

  const copyToClipboard = async () => {
    if (!gamepadData) return;

    const data = {
      deviceInfo: {
        id: gamepadData.id,
        brand: getControllerBrand(gamepadData.id).brand,
        series: getControllerBrand(gamepadData.id).series,
        connection: getConnectionType(gamepadData.id),
        mapping: gamepadData.mapping
      },
      capabilities: {
        buttons: gamepadData.buttons,
        axes: gamepadData.axes,
        vibration: !!gamepadData.vibrationActuator,
        pose: !!gamepadData.pose,
        hand: gamepadData.hand
      },
      browserInfo: gamepadData.browserInfo,
      timestamp: new Date().toISOString()
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopiedData(true);
      setTimeout(() => setCopiedData(false), 2000);
    } catch (error) {
      console.error('Failed to copy data:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!gamepadConnected || !gamepadData) {
    return (
      <DeviceContainer>
        <DeviceHeader>
          <p style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>📱 Device Information Panel</p>
          <p>Comprehensive controller specifications and technical details</p>
        </DeviceHeader>

        <AlertMessage type="warning">
          <FaExclamationTriangle />
          <div>
            <h3>No Controller Detected</h3>
            <p>Connect your gamepad controller and press any button to view detailed device information</p>
          </div>
        </AlertMessage>
      </DeviceContainer>
    );
  }

  const controllerInfo = getControllerBrand(gamepadData.id);

  return (
    <DeviceContainer>
      <PageSEO page="deviceInfo" />
      <DeviceHeader>
        <h1>📱 Device Information Panel</h1>
        <p>Comprehensive controller specifications and technical details</p>
        <button className="copy-btn" onClick={copyToClipboard}>
          {copiedData ? <FaCheck /> : <FaCopy />}
          {copiedData ? 'Copied!' : 'Copy Device Data'}
        </button>
      </DeviceHeader>

      <DeviceOverview>
        <div className="device-visual">
          <FaGamepad style={{ color: controllerInfo.color }} />
          <h2>{controllerInfo.brand} {controllerInfo.series}</h2>
          <p className="device-model">{gamepadData.id}</p>
        </div>

        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-label">Controller Index</span>
            <span className="stat-value">#{gamepadData.index}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Connection Type</span>
            <span className="stat-value">{getConnectionType(gamepadData.id)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Mapping Standard</span>
            <span className="stat-value">{gamepadData.mapping}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Status</span>
            <span className="stat-value connected">Connected ✅</span>
          </div>
        </div>
      </DeviceOverview>

      <SpecsGrid>
        <SpecCard>
          <h3><FaInfoCircle /> Input Specifications</h3>
          <div className="spec-details">
            <div className="spec-row">
              <span>Total Buttons:</span>
              <span className="spec-value">{gamepadData.buttons}</span>
            </div>
            <div className="spec-row">
              <span>Analog Axes:</span>
              <span className="spec-value">{gamepadData.axes}</span>
            </div>
            <div className="spec-row">
              <span>Mapping Type:</span>
              <span className="spec-value">{getMappingDescription(gamepadData.mapping)}</span>
            </div>
            <div className="spec-row">
              <span>Last Update:</span>
              <span className="spec-value timestamp">{formatTimestamp(gamepadData.timestamp)}</span>
            </div>
          </div>
        </SpecCard>

        <SpecCard>
          <h3>🔧 Advanced Capabilities</h3>
          <div className="spec-details">
            <div className="spec-row">
              <span>Vibration/Haptics:</span>
              <span className={`spec-value ${gamepadData.vibrationActuator ? 'supported' : 'not-supported'}`}>
                {gamepadData.vibrationActuator ? 'Supported ✅' : 'Not Available ❌'}
              </span>
            </div>
            <div className="spec-row">
              <span>Pose Tracking:</span>
              <span className={`spec-value ${gamepadData.pose ? 'supported' : 'not-supported'}`}>
                {gamepadData.pose ? 'Available ✅' : 'Not Available ❌'}
              </span>
            </div>
            <div className="spec-row">
              <span>Hand Detection:</span>
              <span className="spec-value">{gamepadData.hand || 'Unknown'}</span>
            </div>
            <div className="spec-row">
              <span>Display ID:</span>
              <span className="spec-value">{gamepadData.displayId || 'None'}</span>
            </div>
          </div>
        </SpecCard>
      </SpecsGrid>

      {gamepadData.vibrationActuator && (
        <CapabilitiesPanel>
          <h3>🎮 Haptic Feedback Details</h3>
          <div className="capabilities-grid">
            <div className="capability-item">
              <span>Actuator Type:</span>
              <span>{gamepadData.vibrationActuator.type}</span>
            </div>
            <div className="capability-item">
              <span>Play Effect Method:</span>
              <span className={gamepadData.vibrationActuator.playEffect ? 'supported' : 'not-supported'}>
                {gamepadData.vibrationActuator.playEffect ? 'Available' : 'Not Available'}
              </span>
            </div>
            <div className="capability-item">
              <span>Effect Types:</span>
              <span>dual-rumble, weak/strong motors</span>
            </div>
          </div>
        </CapabilitiesPanel>
      )}

      <TechnicalDetails>
        <h3>🔬 Technical Analysis</h3>
        <div className="analysis-grid">
          <div className="analysis-section">
            <h4>Button Mapping Analysis</h4>
            <div className="button-grid">
              {gamepadData.buttonDetails.slice(0, 17).map((button) => (
                <div key={button.index} className={`button-info ${button.pressed ? 'pressed' : ''}`}>
                  <span className="button-index">B{button.index}</span>
                  <span className="button-value">{button.value.toFixed(3)}</span>
                  <span className="button-state">
                    {button.pressed ? 'PRESSED' : button.touched ? 'TOUCHED' : 'IDLE'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="analysis-section">
            <h4>Analog Axes Analysis</h4>
            <div className="axes-grid">
              {gamepadData.axesDetails.map((axis) => (
                <div key={axis.index} className="axis-info">
                  <span className="axis-label">Axis {axis.index}:</span>
                  <span className="axis-value">{axis.value.toFixed(6)}</span>
                  <div className="axis-bar">
                    <div
                      className="axis-indicator"
                      style={{
                        left: `${((axis.value + 1) / 2) * 100}%`,
                        backgroundColor: Math.abs(axis.value) > 0.1 ? Theme.primary : Theme.textMuted
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TechnicalDetails>

      <RawDataSection>
        <h3>💾 Raw Device Data</h3>
        <div className="browser-info">
          <h4>Browser Environment</h4>
          <div className="info-grid">
            <div className="info-item">
              <span>Gamepad API:</span>
              <span className="supported">Supported ✅</span>
            </div>
            <div className="info-item">
              <span>Vibration API:</span>
              <span className={gamepadData.browserInfo.vibrationSupport ? 'supported' : 'not-supported'}>
                {gamepadData.browserInfo.vibrationSupport ? 'Supported ✅' : 'Not Available ❌'}
              </span>
            </div>
            <div className="info-item">
              <span>User Agent:</span>
              <span className="user-agent">{gamepadData.browserInfo.userAgent}</span>
            </div>
          </div>
        </div>

        <div className="raw-data-display">
          <h4>Complete Device Object</h4>
          <pre className="json-data">
            {JSON.stringify({
              id: gamepadData.id,
              index: gamepadData.index,
              connected: gamepadData.connected,
              mapping: gamepadData.mapping,
              timestamp: gamepadData.timestamp,
              buttons: gamepadData.buttonDetails,
              axes: gamepadData.axesDetails,
              vibrationActuator: gamepadData.vibrationActuator,
              pose: gamepadData.pose,
              hand: gamepadData.hand,
              displayId: gamepadData.displayId
            }, null, 2)}
          </pre>
        </div>
      </RawDataSection>
    </DeviceContainer>
  );
}

export default DeviceInfo;
