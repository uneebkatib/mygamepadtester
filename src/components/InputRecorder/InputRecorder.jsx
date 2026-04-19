import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaStop, FaRecord, FaPause, FaDownload, FaUpload, FaTrash, FaCopy } from 'react-icons/fa';
import { 
  RecorderContainer, 
  RecorderHeader, 
  RecordingControls, 
  RecordingsList, 
  PlaybackControls,
  VisualizationPanel,
  StatsPanel
} from './InputRecorder.styles';

export function InputRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [currentRecording, setCurrentRecording] = useState(null);
  const [recordingName, setRecordingName] = useState('');
  const [gamepadData, setGamepadData] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedRecording, setSelectedRecording] = useState(null);
  
  const recordingData = useRef([]);
  const startTime = useRef(0);
  const playbackTimer = useRef(null);
  const recordingTimer = useRef(null);

  useEffect(() => {
    const checkGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];
      
      if (gamepad && gamepad.connected) {
        const currentData = {
          timestamp: Date.now(),
          buttons: gamepad.buttons.map(button => ({
            pressed: button.pressed,
            value: button.value
          })),
          axes: [...gamepad.axes]
        };
        
        setGamepadData(currentData);
        
        if (isRecording && !isPaused) {
          recordingData.current.push({
            ...currentData,
            relativeTime: Date.now() - startTime.current
          });
        }
      }
    };

    const interval = setInterval(checkGamepad, 16); // ~60fps
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const startRecording = () => {
    if (!recordingName.trim()) {
      alert('Please enter a recording name');
      return;
    }
    
    recordingData.current = [];
    startTime.current = Date.now();
    setIsRecording(true);
    setIsPaused(false);
    setCurrentRecording({
      name: recordingName,
      startTime: Date.now(),
      duration: 0
    });
  };

  const pauseRecording = () => {
    setIsPaused(!isPaused);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    
    if (recordingData.current.length > 0) {
      const newRecording = {
        id: Date.now(),
        name: recordingName,
        data: [...recordingData.current],
        duration: recordingData.current[recordingData.current.length - 1]?.relativeTime || 0,
        timestamp: Date.now(),
        inputCount: recordingData.current.length,
        uniqueInputs: getUniqueInputsCount(recordingData.current)
      };
      
      setRecordings(prev => [...prev, newRecording]);
      setRecordingName('');
      setCurrentRecording(null);
    }
  };

  const getUniqueInputsCount = (data) => {
    const uniqueStates = new Set();
    data.forEach(frame => {
      const state = JSON.stringify({
        buttons: frame.buttons.map(b => b.pressed),
        axes: frame.axes.map(a => Math.round(a * 100) / 100)
      });
      uniqueStates.add(state);
    });
    return uniqueStates.size;
  };

  const playRecording = (recording) => {
    if (isPlaying) {
      stopPlayback();
      return;
    }
    
    setSelectedRecording(recording);
    setIsPlaying(true);
    
    let frameIndex = 0;
    const playData = recording.data;
    
    const playFrame = () => {
      if (frameIndex >= playData.length) {
        setIsPlaying(false);
        setSelectedRecording(null);
        return;
      }
      
      setGamepadData(playData[frameIndex]);
      frameIndex++;
      
      const nextFrameDelay = frameIndex < playData.length 
        ? (playData[frameIndex].relativeTime - playData[frameIndex - 1].relativeTime) / playbackSpeed
        : 0;
      
      playbackTimer.current = setTimeout(playFrame, Math.max(16, nextFrameDelay));
    };
    
    playFrame();
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    setSelectedRecording(null);
    if (playbackTimer.current) {
      clearTimeout(playbackTimer.current);
      playbackTimer.current = null;
    }
  };

  const deleteRecording = (id) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
  };

  const exportRecording = (recording) => {
    const dataStr = JSON.stringify(recording, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${recording.name.replace(/\s+/g, '_')}_recording.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const importRecording = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedRecording = JSON.parse(e.target.result);
        setRecordings(prev => [...prev, { ...importedRecording, id: Date.now() }]);
      } catch (error) {
        alert('Invalid recording file');
      }
    };
    reader.readAsText(file);
  };

  const copyRecording = (recording) => {
    const copy = {
      ...recording,
      id: Date.now(),
      name: `${recording.name} (Copy)`,
      timestamp: Date.now()
    };
    setRecordings(prev => [...prev, copy]);
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <RecorderContainer>
      <RecorderHeader>
        <h1>🎬 Input Recorder & Playback</h1>
        <p>Record, analyze, and replay controller input sequences</p>
      </RecorderHeader>

      <RecordingControls>
        <div className="recording-input">
          <input
            type="text"
            placeholder="Recording name..."
            value={recordingName}
            onChange={(e) => setRecordingName(e.target.value)}
            disabled={isRecording}
          />
        </div>
        
        <div className="control-buttons">
          {!isRecording ? (
            <button 
              className="record-btn"
              onClick={startRecording}
              disabled={!gamepadData || !recordingName.trim()}
            >
              <FaRecord /> Start Recording
            </button>
          ) : (
            <>
              <button 
                className="pause-btn"
                onClick={pauseRecording}
              >
                {isPaused ? <FaPlay /> : <FaPause />} 
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button 
                className="stop-btn"
                onClick={stopRecording}
              >
                <FaStop /> Stop Recording
              </button>
            </>
          )}
        </div>
        
        {currentRecording && (
          <div className="recording-status">
            <span className={`recording-indicator ${isPaused ? 'paused' : ''}`}>
              {isPaused ? '⏸️' : '🔴'} Recording: {currentRecording.name}
            </span>
            <span className="recording-time">
              {formatDuration(Date.now() - currentRecording.startTime)}
            </span>
          </div>
        )}
      </RecordingControls>

      {gamepadData && (
        <VisualizationPanel>
          <h3>Live Controller State</h3>
          <div className="gamepad-visual">
            <div className="buttons-section">
              <h4>Buttons</h4>
              <div className="buttons-grid">
                {gamepadData.buttons.map((button, index) => (
                  <div 
                    key={index} 
                    className={`button-indicator ${button.pressed ? 'pressed' : ''}`}
                    title={`Button ${index}: ${button.value.toFixed(2)}`}
                  >
                    {index}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="axes-section">
              <h4>Analog Sticks</h4>
              <div className="axes-grid">
                {gamepadData.axes.map((axis, index) => (
                  <div key={index} className="axis-indicator">
                    <label>Axis {index}</label>
                    <div className="axis-bar">
                      <div 
                        className="axis-value"
                        style={{ 
                          left: `${(axis + 1) * 50}%`,
                          backgroundColor: Math.abs(axis) > 0.1 ? '#ff6b6b' : '#2ed573'
                        }}
                      />
                    </div>
                    <span className="axis-number">{axis.toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualizationPanel>
      )}

      <PlaybackControls>
        <h3>Playback Settings</h3>
        <div className="playback-settings">
          <label>
            Speed: 
            <select 
              value={playbackSpeed} 
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              disabled={isPlaying}
            >
              <option value={0.25}>0.25x (Slow)</option>
              <option value={0.5}>0.5x</option>
              <option value={1}>1x (Normal)</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x (Fast)</option>
              <option value={4}>4x (Very Fast)</option>
            </select>
          </label>
          
          {isPlaying && selectedRecording && (
            <div className="playback-status">
              <span>▶️ Playing: {selectedRecording.name}</span>
              <button onClick={stopPlayback} className="stop-playback-btn">
                <FaStop /> Stop Playback
              </button>
            </div>
          )}
        </div>
      </PlaybackControls>

      <RecordingsList>
        <div className="recordings-header">
          <h3>Saved Recordings ({recordings.length})</h3>
          <div className="import-section">
            <label className="import-btn">
              <FaUpload /> Import Recording
              <input 
                type="file" 
                accept=".json"
                onChange={importRecording}
                hidden
              />
            </label>
          </div>
        </div>
        
        {recordings.length === 0 ? (
          <div className="no-recordings">
            <p>No recordings yet. Start recording to see them here!</p>
          </div>
        ) : (
          <div className="recordings-grid">
            {recordings.map((recording) => (
              <div key={recording.id} className="recording-card">
                <div className="recording-info">
                  <h4>{recording.name}</h4>
                  <div className="recording-details">
                    <span>Duration: {formatDuration(recording.duration)}</span>
                    <span>Inputs: {recording.inputCount}</span>
                    <span>Unique States: {recording.uniqueInputs}</span>
                    <span>Date: {new Date(recording.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="recording-actions">
                  <button 
                    onClick={() => playRecording(recording)}
                    disabled={isRecording}
                    className="play-btn"
                  >
                    <FaPlay /> Play
                  </button>
                  <button 
                    onClick={() => exportRecording(recording)}
                    className="export-btn"
                  >
                    <FaDownload /> Export
                  </button>
                  <button 
                    onClick={() => copyRecording(recording)}
                    className="copy-btn"
                  >
                    <FaCopy /> Copy
                  </button>
                  <button 
                    onClick={() => deleteRecording(recording.id)}
                    className="delete-btn"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </RecordingsList>

      <StatsPanel>
        <h3>Recording Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Recordings:</span>
            <span className="stat-value">{recordings.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Duration:</span>
            <span className="stat-value">
              {formatDuration(recordings.reduce((sum, r) => sum + r.duration, 0))}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Inputs:</span>
            <span className="stat-value">
              {recordings.reduce((sum, r) => sum + r.inputCount, 0).toLocaleString()}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Duration:</span>
            <span className="stat-value">
              {recordings.length > 0 
                ? formatDuration(recordings.reduce((sum, r) => sum + r.duration, 0) / recordings.length)
                : '0:00'
              }
            </span>
          </div>
        </div>
      </StatsPanel>

      {!gamepadData && (
        <div className="no-controller">
          <h3>No Controller Detected</h3>
          <p>Connect your controller and press any button to start recording inputs</p>
        </div>
      )}
    </RecorderContainer>
  );
}