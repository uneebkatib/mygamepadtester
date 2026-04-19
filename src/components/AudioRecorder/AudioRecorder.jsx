import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Theme } from "../../styles/Theme";

// Define the pulse animation using styled-components keyframes
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

const AudioRecorderWrapper = styled.div`
  h3 {
    color: ${Theme.textPrimary};
    background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
    border-radius: 12px;
    padding: 1.25rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 2px solid ${Theme.border};
    border: 2px solid ${Theme.border};
    font-weight: 600;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, ${Theme.primary}, ${Theme.accent}, ${Theme.primary});
      border-radius: 12px 12px 0 0;
    }

    span {
      font-size: 0.85rem;
      color: ${Theme.primary};
      font-weight: 500;
    }
  }
`;

const StyledSmallInfo = styled.div`
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: ${Theme.textMuted};
  font-style: italic;
`;

const StyledRecorderConatiner = styled.div`
  text-align: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border-radius: 12px;
  border: 2px solid ${Theme.border};
  border: 2px solid ${Theme.border};
`;

// Styled component for the pulse animation
const PulseIndicator = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${Theme.disconnected};
  animation: ${pulse} 1s infinite;
  box-shadow: 0 0 10px ${Theme.disconnected};
`;

export function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const intervalRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        chunks.current = [];
        clearInterval(intervalRef.current);
      };

      mediaRecorder.current.start();
      setRecording(true);

      setTimeout(() => {
        if (mediaRecorder.current?.state === "recording") {
          stopRecording();
        }
      }, 20000);

      intervalRef.current = setInterval(() => {}, 200);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const deleteRecording = () => {
    setAudioURL(null);
  };

  const openInNewTab = () => {
    if (audioURL) {
      window.open(audioURL, "_blank");
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <AudioRecorderWrapper>
      <h3>
        Gamepad Microphone Tester <span>(Experimental)</span>
        <StyledSmallInfo>If supported</StyledSmallInfo>
      </h3>

      <StyledRecorderConatiner>
        {!recording && !audioURL && (
          <button style={styles.button} onClick={startRecording}>
            Start Recording
          </button>
        )}

        {recording && (
          <div style={styles.recordingContainer}>
            <div style={styles.recordingIndicator}>
              <PulseIndicator />
              <span>Recording...</span>
            </div>
            <button
              style={{
                ...styles.button_stop,
              }}
              onClick={stopRecording}
            >
              Stop
            </button>
          </div>
        )}

        {audioURL && (
          <div style={{ marginTop: 20 }}>
            <audio controls src={audioURL} style={{ width: "100%" }} />
            <div style={{ marginTop: 10 }}>
              <button
                style={{
                  ...styles.button,
                  backgroundColor: Theme.disconnected,
                  marginLeft: 8,
                }}
                onClick={deleteRecording}
              >
                Delete
              </button>
              <button
                style={{
                  ...styles.button,
                  backgroundColor: Theme.accent,
                  marginLeft: 8,
                }}
                onClick={openInNewTab}
              >
                Open in New Tab
              </button>
              <StyledSmallInfo>
                For audio playback, connect headphones to the gamepad. If you
                don’t have headphones, open the audio in a new tab before
                unplugging the gamepad.
              </StyledSmallInfo>
            </div>
          </div>
        )}
      </StyledRecorderConatiner>
    </AudioRecorderWrapper>
  );
}

const styles = {
  container: {},
  button: {
    backgroundColor: Theme.primary,
    color: Theme.white,
    padding: "12px 24px",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: `2px solid ${Theme.primary}`,
  },
  button_stop: {
    backgroundColor: Theme.disconnected,
    color: Theme.white,
    padding: "12px 24px",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: `2px solid ${Theme.disconnected}`,
  },
  recordingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  recordingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
    fontWeight: "bold",
    color: Theme.disconnected,
    fontSize: "1.1rem",
  },
};
