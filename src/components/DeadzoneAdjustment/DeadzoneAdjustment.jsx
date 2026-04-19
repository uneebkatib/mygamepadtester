import React, { useState, useEffect } from 'react';
import { FaSync, FaSave, FaUndo, FaCog } from 'react-icons/fa';
import { 
  DeadzoneContainer, 
  DeadzoneHeader, 
  DeadzoneControls, 
  VisualizationArea,
  SettingsPanel,
  PresetPanel
} from './DeadzoneAdjustment.styles';

export function DeadzoneAdjustment() {
  const [gamepadData, setGamepadData] = useState(null);
  const [deadzoneSettings, setDeadzoneSettings] = useState({
    leftStick: { x: 0.1, y: 0.1 },
    rightStick: { x: 0.1, y: 0.1 },
    leftTrigger: 0.05,
    rightTrigger: 0.05
  });
  const [originalSettings, setOriginalSettings] = useState(null);
  const [presets, setPresets] = useState([
    { name: 'Conservative', leftStick: { x: 0.15, y: 0.15 }, rightStick: { x: 0.15, y: 0.15 }, leftTrigger: 0.1, rightTrigger: 0.1 },
    { name: 'Balanced', leftStick: { x: 0.1, y: 0.1 }, rightStick: { x: 0.1, y: 0.1 }, leftTrigger: 0.05, rightTrigger: 0.05 },
    { name: 'Aggressive', leftStick: { x: 0.05, y: 0.05 }, rightStick: { x: 0.05, y: 0.05 }, leftTrigger: 0.02, rightTrigger: 0.02 },
    { name: 'Racing', leftStick: { x: 0.08, y: 0.12 }, rightStick: { x: 0.12, y: 0.08 }, leftTrigger: 0.01, rightTrigger: 0.01 },
    { name: 'FPS', leftStick: { x: 0.12, y: 0.08 }, rightStick: { x: 0.06, y: 0.06 }, leftTrigger: 0.03, rightTrigger: 0.03 }
  ]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [driftDetection, setDriftDetection] = useState({ enabled: true, threshold: 0.02 });

  useEffect(() => {
    const checkGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];
      
      if (gamepad && gamepad.connected) {
        // Apply deadzone filtering
        const processedAxes = gamepad.axes.map((axis, index) => {
          let deadzone = 0.1; // default
          
          // Determine which deadzone setting to use
          if (index === 0) deadzone = deadzoneSettings.leftStick.x;
          else if (index === 1) deadzone = deadzoneSettings.leftStick.y;
          else if (index === 2) deadzone = deadzoneSettings.rightStick.x;
          else if (index === 3) deadzone = deadzoneSettings.rightStick.y;
          
          // Apply deadzone
          if (Math.abs(axis) < deadzone) {
            return 0;
          } else {
            // Scale the remaining range
            const sign = axis > 0 ? 1 : -1;
            return sign * ((Math.abs(axis) - deadzone) / (1 - deadzone));
          }
        });

        const processedButtons = gamepad.buttons.map((button, index) => {
          let deadzone = 0.05; // default for triggers
          
          // Typically buttons 6 and 7 are triggers (LT/RT)
          if (index === 6) deadzone = deadzoneSettings.leftTrigger;
          else if (index === 7) deadzone = deadzoneSettings.rightTrigger;
          
          let value = button.value;
          if (value < deadzone) {
            value = 0;
          } else {
            value = (value - deadzone) / (1 - deadzone);
          }
          
          return {
            pressed: value > 0,
            value: value
          };
        });
        
        setGamepadData({
          original: {
            axes: [...gamepad.axes],
            buttons: gamepad.buttons.map(b => ({ pressed: b.pressed, value: b.value }))
          },
          processed: {
            axes: processedAxes,
            buttons: processedButtons
          },
          timestamp: Date.now()
        });
      } else {
        setGamepadData(null);
      }
    };

    const interval = setInterval(checkGamepad, 16); // ~60fps
    return () => clearInterval(interval);
  }, [deadzoneSettings]);

  useEffect(() => {
    if (!originalSettings) {
      setOriginalSettings(JSON.parse(JSON.stringify(deadzoneSettings)));
    }
  }, []);

  const updateDeadzone = (category, axis, value) => {
    setDeadzoneSettings(prev => ({
      ...prev,
      [category]: axis ? { ...prev[category], [axis]: value } : value
    }));
  };

  const applyPreset = (preset) => {
    setDeadzoneSettings({
      leftStick: { ...preset.leftStick },
      rightStick: { ...preset.rightStick },
      leftTrigger: preset.leftTrigger,
      rightTrigger: preset.rightTrigger
    });
  };

  const resetToOriginal = () => {
    if (originalSettings) {
      setDeadzoneSettings(JSON.parse(JSON.stringify(originalSettings)));
    }
  };

  const saveCurrentAsPreset = () => {
    const name = prompt('Enter preset name:');
    if (name && name.trim()) {
      setPresets(prev => [...prev, {
        name: name.trim(),
        ...deadzoneSettings
      }]);
    }
  };

  const detectDrift = () => {
    if (!gamepadData || !driftDetection.enabled) return null;
    
    const driftData = [];
    gamepadData.original.axes.forEach((axis, index) => {
      if (Math.abs(axis) > 0 && Math.abs(axis) < driftDetection.threshold) {
        const axisName = index === 0 ? 'Left Stick X' : 
                       index === 1 ? 'Left Stick Y' : 
                       index === 2 ? 'Right Stick X' : 
                       index === 3 ? 'Right Stick Y' : `Axis ${index}`;
        driftData.push({
          axis: axisName,
          value: axis,
          severity: Math.abs(axis) / driftDetection.threshold
        });
      }
    });
    
    return driftData;
  };

  const driftIssues = detectDrift();

  return (
    <DeadzoneContainer>
      <DeadzoneHeader>
        <h1>🎯 Deadzone Adjustment Tool</h1>
        <p>Fine-tune your controller's deadzone settings for optimal precision</p>
      </DeadzoneHeader>

      {!gamepadData && (
        <div className="no-controller">
          <h3>No Controller Detected</h3>
          <p>Connect your controller and move the sticks to see deadzone adjustments</p>
        </div>
      )}

      {gamepadData && (
        <>
          <VisualizationArea>
            <div className="sticks-container">
              <div className="stick-visualization">
                <h3>Left Stick</h3>
                <div className="stick-display">
                  <div className="deadzone-circle" style={{
                    width: `${Math.max(deadzoneSettings.leftStick.x, deadzoneSettings.leftStick.y) * 200}px`,
                    height: `${Math.max(deadzoneSettings.leftStick.x, deadzoneSettings.leftStick.y) * 200}px`
                  }} />
                  <div 
                    className="stick-position original"
                    style={{
                      left: `${50 + gamepadData.original.axes[0] * 45}%`,
                      top: `${50 + gamepadData.original.axes[1] * 45}%`
                    }}
                    title="Original Position"
                  />
                  <div 
                    className="stick-position processed"
                    style={{
                      left: `${50 + gamepadData.processed.axes[0] * 45}%`,
                      top: `${50 + gamepadData.processed.axes[1] * 45}%`
                    }}
                    title="Processed Position"
                  />
                </div>
                <div className="stick-values">
                  <div>Original: ({gamepadData.original.axes[0]?.toFixed(3) || '0.000'}, {gamepadData.original.axes[1]?.toFixed(3) || '0.000'})</div>
                  <div>Processed: ({gamepadData.processed.axes[0]?.toFixed(3) || '0.000'}, {gamepadData.processed.axes[1]?.toFixed(3) || '0.000'})</div>
                </div>
              </div>

              <div className="stick-visualization">
                <h3>Right Stick</h3>
                <div className="stick-display">
                  <div className="deadzone-circle" style={{
                    width: `${Math.max(deadzoneSettings.rightStick.x, deadzoneSettings.rightStick.y) * 200}px`,
                    height: `${Math.max(deadzoneSettings.rightStick.x, deadzoneSettings.rightStick.y) * 200}px`
                  }} />
                  <div 
                    className="stick-position original"
                    style={{
                      left: `${50 + (gamepadData.original.axes[2] || 0) * 45}%`,
                      top: `${50 + (gamepadData.original.axes[3] || 0) * 45}%`
                    }}
                  />
                  <div 
                    className="stick-position processed"
                    style={{
                      left: `${50 + (gamepadData.processed.axes[2] || 0) * 45}%`,
                      top: `${50 + (gamepadData.processed.axes[3] || 0) * 45}%`
                    }}
                  />
                </div>
                <div className="stick-values">
                  <div>Original: ({gamepadData.original.axes[2]?.toFixed(3) || '0.000'}, {gamepadData.original.axes[3]?.toFixed(3) || '0.000'})</div>
                  <div>Processed: ({gamepadData.processed.axes[2]?.toFixed(3) || '0.000'}, {gamepadData.processed.axes[3]?.toFixed(3) || '0.000'})</div>
                </div>
              </div>
            </div>

            <div className="triggers-container">
              <div className="trigger-visualization">
                <h3>Left Trigger</h3>
                <div className="trigger-bar">
                  <div className="deadzone-indicator" style={{ width: `${deadzoneSettings.leftTrigger * 100}%` }} />
                  <div className="trigger-value original" style={{ width: `${(gamepadData.original.buttons[6]?.value || 0) * 100}%` }} />
                  <div className="trigger-value processed" style={{ width: `${(gamepadData.processed.buttons[6]?.value || 0) * 100}%` }} />
                </div>
                <div className="trigger-values">
                  <div>Original: {(gamepadData.original.buttons[6]?.value || 0).toFixed(3)}</div>
                  <div>Processed: {(gamepadData.processed.buttons[6]?.value || 0).toFixed(3)}</div>
                </div>
              </div>

              <div className="trigger-visualization">
                <h3>Right Trigger</h3>
                <div className="trigger-bar">
                  <div className="deadzone-indicator" style={{ width: `${deadzoneSettings.rightTrigger * 100}%` }} />
                  <div className="trigger-value original" style={{ width: `${(gamepadData.original.buttons[7]?.value || 0) * 100}%` }} />
                  <div className="trigger-value processed" style={{ width: `${(gamepadData.processed.buttons[7]?.value || 0) * 100}%` }} />
                </div>
                <div className="trigger-values">
                  <div>Original: {(gamepadData.original.buttons[7]?.value || 0).toFixed(3)}</div>
                  <div>Processed: {(gamepadData.processed.buttons[7]?.value || 0).toFixed(3)}</div>
                </div>
              </div>
            </div>
          </VisualizationArea>

          {driftIssues && driftIssues.length > 0 && (
            <div className="drift-alert">
              <h3>⚠️ Drift Detected</h3>
              {driftIssues.map((issue, index) => (
                <div key={index} className="drift-issue">
                  <span className="axis-name">{issue.axis}</span>
                  <span className="drift-value">{issue.value.toFixed(4)}</span>
                  <span className={`severity ${issue.severity > 0.7 ? 'high' : issue.severity > 0.4 ? 'medium' : 'low'}`}>
                    {issue.severity > 0.7 ? 'High' : issue.severity > 0.4 ? 'Medium' : 'Low'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <DeadzoneControls>
            <div className="controls-section">
              <h3>Left Stick Deadzone</h3>
              <div className="control-group">
                <label>
                  X-Axis: {(deadzoneSettings.leftStick.x * 100).toFixed(1)}%
                  <input
                    type="range"
                    min="0"
                    max="0.3"
                    step="0.001"
                    value={deadzoneSettings.leftStick.x}
                    onChange={(e) => updateDeadzone('leftStick', 'x', parseFloat(e.target.value))}
                  />
                </label>
                <label>
                  Y-Axis: {(deadzoneSettings.leftStick.y * 100).toFixed(1)}%
                  <input
                    type="range"
                    min="0"
                    max="0.3"
                    step="0.001"
                    value={deadzoneSettings.leftStick.y}
                    onChange={(e) => updateDeadzone('leftStick', 'y', parseFloat(e.target.value))}
                  />
                </label>
              </div>
            </div>

            <div className="controls-section">
              <h3>Right Stick Deadzone</h3>
              <div className="control-group">
                <label>
                  X-Axis: {(deadzoneSettings.rightStick.x * 100).toFixed(1)}%
                  <input
                    type="range"
                    min="0"
                    max="0.3"
                    step="0.001"
                    value={deadzoneSettings.rightStick.x}
                    onChange={(e) => updateDeadzone('rightStick', 'x', parseFloat(e.target.value))}
                  />
                </label>
                <label>
                  Y-Axis: {(deadzoneSettings.rightStick.y * 100).toFixed(1)}%
                  <input
                    type="range"
                    min="0"
                    max="0.3"
                    step="0.001"
                    value={deadzoneSettings.rightStick.y}
                    onChange={(e) => updateDeadzone('rightStick', 'y', parseFloat(e.target.value))}
                  />
                </label>
              </div>
            </div>

            <div className="controls-section">
              <h3>Trigger Deadzone</h3>
              <div className="control-group">
                <label>
                  Left Trigger: {(deadzoneSettings.leftTrigger * 100).toFixed(1)}%
                  <input
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.001"
                    value={deadzoneSettings.leftTrigger}
                    onChange={(e) => updateDeadzone('leftTrigger', null, parseFloat(e.target.value))}
                  />
                </label>
                <label>
                  Right Trigger: {(deadzoneSettings.rightTrigger * 100).toFixed(1)}%
                  <input
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.001"
                    value={deadzoneSettings.rightTrigger}
                    onChange={(e) => updateDeadzone('rightTrigger', null, parseFloat(e.target.value))}
                  />
                </label>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={resetToOriginal} className="reset-btn">
                <FaUndo /> Reset to Original
              </button>
              <button onClick={saveCurrentAsPreset} className="save-btn">
                <FaSave /> Save as Preset
              </button>
              <button onClick={() => setShowAdvanced(!showAdvanced)} className="settings-btn">
                <FaCog /> Advanced Settings
              </button>
            </div>
          </DeadzoneControls>

          <PresetPanel>
            <h3>Quick Presets</h3>
            <div className="presets-grid">
              {presets.map((preset, index) => (
                <div key={index} className="preset-card">
                  <h4>{preset.name}</h4>
                  <div className="preset-values">
                    <span>L: {(preset.leftStick.x * 100).toFixed(0)}%/{(preset.leftStick.y * 100).toFixed(0)}%</span>
                    <span>R: {(preset.rightStick.x * 100).toFixed(0)}%/{(preset.rightStick.y * 100).toFixed(0)}%</span>
                    <span>T: {(preset.leftTrigger * 100).toFixed(0)}%/{(preset.rightTrigger * 100).toFixed(0)}%</span>
                  </div>
                  <button onClick={() => applyPreset(preset)}>Apply</button>
                </div>
              ))}
            </div>
          </PresetPanel>

          {showAdvanced && (
            <SettingsPanel>
              <h3>Advanced Settings</h3>
              <div className="advanced-controls">
                <label>
                  <input
                    type="checkbox"
                    checked={driftDetection.enabled}
                    onChange={(e) => setDriftDetection(prev => ({ ...prev, enabled: e.target.checked }))}
                  />
                  Enable Drift Detection
                </label>
                <label>
                  Drift Threshold: {(driftDetection.threshold * 100).toFixed(1)}%
                  <input
                    type="range"
                    min="0.005"
                    max="0.05"
                    step="0.001"
                    value={driftDetection.threshold}
                    onChange={(e) => setDriftDetection(prev => ({ ...prev, threshold: parseFloat(e.target.value) }))}
                    disabled={!driftDetection.enabled}
                  />
                </label>
              </div>
            </SettingsPanel>
          )}
        </>
      )}

      <div className="education-section">
        <h3>Understanding Deadzone</h3>
        <div className="education-content">
          <div className="education-item">
            <h4>What is Deadzone?</h4>
            <p>Deadzone is the area around the center position where stick movement is ignored. This helps eliminate stick drift and provides a stable neutral position.</p>
          </div>
          
          <div className="education-item">
            <h4>Optimal Settings</h4>
            <ul>
              <li><strong>Conservative (15%):</strong> Eliminates most drift, less sensitive</li>
              <li><strong>Balanced (10%):</strong> Good compromise between precision and drift elimination</li>
              <li><strong>Aggressive (5%):</strong> Maximum sensitivity, may allow some drift</li>
            </ul>
          </div>
          
          <div className="education-item">
            <h4>Game-Specific Tips</h4>
            <ul>
              <li><strong>FPS Games:</strong> Lower deadzone on right stick for precise aiming</li>
              <li><strong>Racing Games:</strong> Very low trigger deadzone for precise throttle control</li>
              <li><strong>Platformers:</strong> Balanced deadzone to prevent accidental movement</li>
            </ul>
          </div>
        </div>
      </div>
    </DeadzoneContainer>
  );
}
