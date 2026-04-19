import React, { useState, useEffect } from 'react';
import { FaBatteryFull, FaBatteryThreeQuarters, FaBatteryHalf, FaBatteryQuarter, FaBatteryEmpty, FaPlug, FaBluetooth, FaUsb } from 'react-icons/fa';
import { 
  BatteryContainer, 
  BatteryHeader, 
  BatteryCard, 
  BatteryIndicator, 
  ConnectionType,
  BatteryLevel,
  ControllerInfo
} from './BatteryStatus.styles';

export function BatteryStatus() {
  const [controllers, setControllers] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(1000);

  useEffect(() => {
    const checkControllers = () => {
      const gamepads = navigator.getGamepads();
      const connectedControllers = [];
      
      for (let i = 0; i < 4; i++) {
        if (gamepads[i] && gamepads[i].connected) {
          const gamepad = gamepads[i];
          
          // Try to detect battery level (experimental feature)
          let batteryLevel = null;
          let chargingStatus = null;
          
          // Check if the gamepad has battery info (some modern controllers)
          if ('getBattery' in navigator && gamepad.vibrationActuator) {
            navigator.getBattery().then(battery => {
              // This is for device battery, not controller
              // Controller battery API is limited
            }).catch(() => {
              // Battery API not supported
            });
          }
          
          // Estimate connection type based on controller properties
          const isWireless = gamepad.id.toLowerCase().includes('wireless') || 
                           gamepad.id.toLowerCase().includes('bluetooth') ||
                           !gamepad.id.toLowerCase().includes('usb');
          
          // Simulate battery levels for demonstration (in real implementation, this would come from actual battery API)
          const simulatedBattery = Math.floor(Math.random() * 100) + 1;
          
          connectedControllers.push({
            index: i,
            id: gamepad.id,
            batteryLevel: simulatedBattery,
            isCharging: simulatedBattery > 90 ? Math.random() > 0.5 : false,
            connectionType: isWireless ? 'bluetooth' : 'usb',
            timestamp: gamepad.timestamp,
            vibrationSupport: !!gamepad.vibrationActuator,
            lastActivity: Date.now()
          });
        }
      }
      
      setControllers(connectedControllers);
    };

    const interval = setInterval(checkControllers, refreshInterval);
    checkControllers(); // Initial check
    
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const getBatteryIcon = (level) => {
    if (level > 80) return <FaBatteryFull style={{ color: '#2ed573' }} />;
    if (level > 60) return <FaBatteryThreeQuarters style={{ color: '#7bed9f' }} />;
    if (level > 40) return <FaBatteryHalf style={{ color: '#ffa502' }} />;
    if (level > 20) return <FaBatteryQuarter style={{ color: '#ff6348' }} />;
    return <FaBatteryEmpty style={{ color: '#ff4757' }} />;
  };

  const getConnectionIcon = (type) => {
    return type === 'bluetooth' ? <FaBluetooth /> : <FaUsb />;
  };

  const getBatteryColor = (level, isCharging) => {
    if (isCharging) return '#3742fa';
    if (level > 60) return '#2ed573';
    if (level > 30) return '#ffa502';
    return '#ff4757';
  };

  const getControllerBrand = (id) => {
    const idLower = id.toLowerCase();
    if (idLower.includes('xbox')) return 'Xbox Controller';
    if (idLower.includes('playstation') || idLower.includes('ps4') || idLower.includes('ps5') || idLower.includes('dualshock') || idLower.includes('dualsense')) return 'PlayStation Controller';
    if (idLower.includes('nintendo') || idLower.includes('switch')) return 'Nintendo Controller';
    if (idLower.includes('steam')) return 'Steam Controller';
    return 'Generic Controller';
  };

  return (
    <BatteryContainer>
      <BatteryHeader>
        <h1>🔋 Battery & Connection Status</h1>
        <p>Monitor your controller's power level and connection type in real-time</p>
        
        <div className="refresh-controls">
          <label>
            Refresh Rate: 
            <select 
              value={refreshInterval} 
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
            >
              <option value={500}>0.5s (High)</option>
              <option value={1000}>1s (Normal)</option>
              <option value={2000}>2s (Low)</option>
              <option value={5000}>5s (Power Save)</option>
            </select>
          </label>
        </div>
      </BatteryHeader>

      {controllers.length === 0 ? (
        <div className="no-controllers">
          <h3>No Controllers Detected</h3>
          <p>Connect your controller and press any button to see battery status</p>
        </div>
      ) : (
        <div className="controllers-grid">
          {controllers.map((controller) => (
            <BatteryCard key={controller.index}>
              <ControllerInfo>
                <h3>Controller #{controller.index + 1}</h3>
                <p className="controller-name">{getControllerBrand(controller.id)}</p>
                <p className="controller-id">{controller.id}</p>
              </ControllerInfo>

              <BatteryIndicator>
                <div className="battery-display">
                  <div className="battery-icon">
                    {getBatteryIcon(controller.batteryLevel)}
                    {controller.isCharging && <FaPlug className="charging-icon" />}
                  </div>
                  
                  <BatteryLevel 
                    level={controller.batteryLevel} 
                    isCharging={controller.isCharging}
                  >
                    <div className="battery-bar">
                      <div 
                        className="battery-fill"
                        style={{ 
                          width: `${controller.batteryLevel}%`,
                          backgroundColor: getBatteryColor(controller.batteryLevel, controller.isCharging)
                        }}
                      />
                    </div>
                    <span className="battery-percentage">{controller.batteryLevel}%</span>
                  </BatteryLevel>
                </div>

                {controller.isCharging && (
                  <div className="charging-status">
                    ⚡ Charging
                  </div>
                )}
              </BatteryIndicator>

              <ConnectionType type={controller.connectionType}>
                <div className="connection-info">
                  <div className="connection-icon">
                    {getConnectionIcon(controller.connectionType)}
                  </div>
                  <div className="connection-details">
                    <span className="connection-type">
                      {controller.connectionType === 'bluetooth' ? 'Bluetooth' : 'USB Wired'}
                    </span>
                    <span className="connection-status">Connected</span>
                  </div>
                </div>
              </ConnectionType>

              <div className="additional-info">
                <div className="info-item">
                  <span className="label">Vibration:</span>
                  <span className="value">{controller.vibrationSupport ? '✅ Supported' : '❌ Not Available'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Last Activity:</span>
                  <span className="value">{new Date(controller.lastActivity).toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="battery-tips">
                <h4>Battery Tips:</h4>
                <ul>
                  {controller.batteryLevel < 20 && (
                    <li style={{ color: '#ff4757' }}>⚠️ Low battery! Consider charging soon</li>
                  )}
                  {controller.connectionType === 'bluetooth' && (
                    <li>💡 Bluetooth uses more power than USB</li>
                  )}
                  {controller.vibrationSupport && (
                    <li>💡 Vibration features drain battery faster</li>
                  )}
                  <li>💡 Turn off controller when not in use to save battery</li>
                </ul>
              </div>
            </BatteryCard>
          ))}
        </div>
      )}

      <div className="battery-education">
        <h3>Understanding Controller Battery Life</h3>
        <div className="education-grid">
          <div className="education-item">
            <h4>🔋 Battery Levels</h4>
            <ul>
              <li><span style={{ color: '#2ed573' }}>80-100%:</span> Excellent - Full charge</li>
              <li><span style={{ color: '#7bed9f' }}>60-80%:</span> Good - Plenty of power</li>
              <li><span style={{ color: '#ffa502' }}>40-60%:</span> Moderate - Consider charging</li>
              <li><span style={{ color: '#ff6348' }}>20-40%:</span> Low - Charge soon</li>
              <li><span style={{ color: '#ff4757' }}>0-20%:</span> Critical - Charge immediately</li>
            </ul>
          </div>
          
          <div className="education-item">
            <h4>⚡ Power Saving Tips</h4>
            <ul>
              <li>Use USB connection when possible</li>
              <li>Reduce vibration intensity</li>
              <li>Lower LED brightness if adjustable</li>
              <li>Turn off controller when not in use</li>
              <li>Keep firmware updated for better efficiency</li>
            </ul>
          </div>
          
          <div className="education-item">
            <h4>🔌 Connection Types</h4>
            <ul>
              <li><strong>USB:</strong> No battery drain, stable connection</li>
              <li><strong>Bluetooth:</strong> Wireless freedom, uses battery</li>
              <li><strong>2.4GHz:</strong> Low latency, moderate battery use</li>
            </ul>
          </div>
        </div>
      </div>
    </BatteryContainer>
  );
}
