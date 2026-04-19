'use client'

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
// Lazy load heavy SVG components to improve initial render performance
const AxesSVG = React.lazy(() => import("../../components/AxesSVG/AxesSVG").then(module => ({ default: module.AxesSVG })));
const XboxSVG = React.lazy(() => import("../../components/XboxSVG/XboxSVG").then(module => ({ default: module.XboxSVG })));
const PS4SVG = React.lazy(() => import("../../components/PS4SVG/PS4SVG").then(module => ({ default: module.PS4SVG })));

// Optimized individual icon imports to reduce bundle size
// Optimized individual icon imports to reduce bundle size
import { GiVibratingBall } from "react-icons/gi";
import { MdDeleteSweep } from "react-icons/md";
import {
  StyledSVG,
  StyledLoader,
  AxesAndButtonsWrapper,
  AxesWrapper,
  ButtonsWrapper,
  HistoryWrapper,
  StyledButtons,
  HistoryList,
  HistoryItem,
  StyledContener,
  StyledGamepadSVGAxesAVGWrapper,
  StyledHistoryAndVibrationButtonsWrapper,
  StyledVibrationLoopButtonWrapper,
  StyledSmallInfo,
  StyledLoaderTextWrapper,
} from "./MainGamepad.styles";

// Lazy load MainPageInfo

import { AudioRecorder } from "../AudioRecorder/AudioRecorder";
import { Theme } from "../../styles/Theme";
// Helmet removed - use Next.js metadata API

// Lazy load Ad component
const Ad = React.lazy(() => import("../Ad/Ad.jsx"));

// Lazy load TriggerPressureGraph for advanced trigger visualization
const TriggerPressureGraph = React.lazy(() => import("../TriggerPressureGraph/TriggerPressureGraph.jsx"));

// Lazy load Pro monitoring components
const InputLagMonitor = React.lazy(() => import("../InputLagMonitor/InputLagMonitor.jsx"));
const BatteryConnectionMonitor = React.lazy(() => import("../BatteryConnectionMonitor/BatteryConnectionMonitor.jsx"));
const DPadHeatmap = React.lazy(() => import("../DPadHeatmap/DPadHeatmap.jsx"));
const ExportReport = React.lazy(() => import("../ExportReport/ExportReport.jsx"));
const ControllerInfo = React.lazy(() => import("../ControllerInfo/ControllerInfo.jsx"));

import { useI18n } from "../../contexts/I18nContext";
import { useAutoSubmitControllerData } from "../../hooks/useAutoSubmitControllerData";

// Throttle function to limit update frequency
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Memoized MainGamepad component for better performance
const MainGamepadComponent = ({ playerNumber }) => {
  const { t, isRTL } = useI18n();
  // Consolidated state to prevent max update depth exceeded error
  const [gamepadState, setGamepadState] = useState({
    leftX: 0, leftY: 0, rightX: 0, rightY: 0,
    l3Pressed: false, r3Pressed: false,
    lt: 0, rt: 0,
    lbPressed: false, rbPressed: false,
    APressed: false, BPressed: false, XPressed: false, YPressed: false,
    upPressed: false, downPressed: false, leftPressed: false, rightPressed: false,
    sharePressed: false, optionsPressed: false, logoPressed: false, touchbarPressed: false,
    gamepadName: "Waiting for connection...", buttons: 0, axes: 0
  });

  const [connectionStatus, setConnectionStatus] = useState(false);
  const [buttonHistory, setButtonHistory] = useState([]);
  const historyListRef = useRef(null);
  const [scaleValue, setScaleValue] = useState("scale1");
  const [infiniteVibration, setInfiniteVibration] = useState(false);
  const [rawGpadSnapshot, setRawGpadSnapshot] = useState(null);

  // Initialize Telemetry Auto-Submit Hook
  useAutoSubmitControllerData(rawGpadSnapshot);

  // Load scale from localStorage on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScale = localStorage.getItem("interfaceScale");
      if (savedScale) {
        setScaleValue(savedScale);
      }
    }
  }, []);

  const intervalRef = useRef();
  const prevGamepadDataRef = useRef({});


  // Deep equality check for gamepad data
  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  // Optimized gamepad update using requestAnimationFrame for better performance
  const updateGamepad = useCallback(() => {
    try {
      const gpad = navigator.getGamepads()[playerNumber];
      if (gpad && gpad.connected && gpad.buttons) {
        // Create current data object for comparison
        const currentData = {
          leftX: gpad.axes[0] || 0,
          leftY: gpad.axes[1] || 0,
          rightX: gpad.axes[2] || 0,
          rightY: gpad.axes[3] || 0,
          l3Pressed: gpad.buttons[10]?.pressed || false,
          r3Pressed: gpad.buttons[11]?.pressed || false,
          lt: gpad.buttons[6]?.value || 0,
          rt: gpad.buttons[7]?.value || 0,
          lbPressed: gpad.buttons[4]?.pressed || false,
          rbPressed: gpad.buttons[5]?.pressed || false,
          APressed: gpad.buttons[0]?.pressed || false,
          BPressed: gpad.buttons[1]?.pressed || false,
          XPressed: gpad.buttons[2]?.pressed || false,
          YPressed: gpad.buttons[3]?.pressed || false,
          upPressed: gpad.buttons[12]?.pressed || false,
          downPressed: gpad.buttons[13]?.pressed || false,
          leftPressed: gpad.buttons[14]?.pressed || false,
          rightPressed: gpad.buttons[15]?.pressed || false,
          sharePressed: gpad.buttons[8]?.pressed || false,
          optionsPressed: gpad.buttons[9]?.pressed || false,
          logoPressed: gpad.buttons[16]?.pressed || false,
          touchbarPressed: gpad.buttons[17]?.pressed || false,
          gamepadName: gpad.id || "",
          buttons: gpad.buttons.length || 0,
          axes: gpad.axes.length || 0
        };

        // Only update state if data has changed significantly
        if (!isEqual(currentData, prevGamepadDataRef.current)) {
          prevGamepadDataRef.current = currentData;
          setGamepadState(currentData);

          // Save a snapshot for the telemetry hook
          setRawGpadSnapshot({
            id: gpad.id,
            timestamp: gpad.timestamp,
            axes: [...gpad.axes],
            buttons: gpad.buttons.map(b => ({ pressed: b.pressed, value: b.value }))
          });

          setConnectionStatus(true);
        }

        // Update buttons history with optimized logic
        const newHistory = [];
        for (let i = 0; i < gpad.buttons.length; i++) {
          if (gpad.buttons[i]?.pressed) {
            newHistory.push(`B${i}`);
          }
        }

        if (newHistory.length > 0) {
          setButtonHistory(prevHistory => {
            // Only update if history has changed
            const lastItems = prevHistory.slice(-3); // Reduced from 5 to 3 for better performance
            const hasNewItems = newHistory.some(item => !lastItems.includes(item));

            if (hasNewItems) {
              // Limit history to last 15 items to prevent memory issues (reduced from 20)
              const updatedHistory = [...prevHistory, ...newHistory];
              return updatedHistory.slice(-15);
            }
            return prevHistory;
          });
        }
      } else {
        setConnectionStatus(false);
        setButtonHistory([]);
        setGamepadState(prev => ({ ...prev, buttons: 0 }));
      }
    } catch (error) {
      console.error("Error updating gamepad data:", error);
      setConnectionStatus(false);
    }
  }, [playerNumber, t]);

  // Start/stop gamepad updates using requestAnimationFrame for better performance
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      updateGamepad();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updateGamepad]);

  // ------------------------------- SCALE INTERFACE SECTION
  const scaleInterface = (
    <>
      <label>{t('tester.interfaceScale')}: </label>
      <select
        value={scaleValue}
        onChange={(e) => {
          setScaleValue(e.target.value);
          localStorage.setItem("interfaceScale", e.target.value);
        }}
      >
        <option value={"scale1"}>x1.0</option>
        <option value={"scale08"}>x0.8</option>
        <option value={"scale09"}>x0.9</option>
        <option value={"scale11"}>x1.1</option>
        <option value={"scale12"}>x1.2</option>
      </select>
      <br />
      <br />
    </>
  );

  // ------------------------------- BUTTONS HISTORY SECTION
  useEffect(() => {
    if (historyListRef.current) {
      historyListRef.current.scrollLeft = historyListRef.current.scrollWidth;
    }
  }, [buttonHistory]);

  // ------------------------------- VIBRATION INFINITE LOOP SECTION
  useEffect(() => {
    let vibrationInterval;

    if (infiniteVibration) {
      vibrationInterval = setInterval(() => {
        try {
          const activeGpad = navigator.getGamepads()[0];
          if (activeGpad && activeGpad.vibrationActuator) {
            activeGpad.vibrationActuator.playEffect("dual-rumble", {
              startDelay: 0,
              duration: 1000,
              weakMagnitude: 1.0,
              strongMagnitude: 1.0,
            });
          }
        } catch (error) {
          console.error("Error during vibration:", error);
        }
      }, 1000); // Trigger every 1 second
    } else {
      if (vibrationInterval) clearInterval(vibrationInterval);
    }

    return () => {
      if (vibrationInterval) clearInterval(vibrationInterval);
    };
  }, [infiniteVibration]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "v" || e.key === "V") {
        setInfiniteVibration((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "h" || e.key === "H") {
        setButtonHistory([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const buttonHistorySection = (
    <HistoryWrapper>
      <AudioRecorder />
      <h3>{t('tester.buttonsHistory')} (h)</h3>
      <HistoryList ref={historyListRef}>
        {buttonHistory.map((event, index) => (
          <HistoryItem key={index}>{event}</HistoryItem>
        ))}
      </HistoryList>
      <StyledHistoryAndVibrationButtonsWrapper>
        <button onClick={() => setButtonHistory([])}>
          <MdDeleteSweep />
        </button>

        {/* // ------------------------------- VIBRATION SECTION */}
        <StyledVibrationLoopButtonWrapper>
          <label>
            <input
              type="checkbox"
              checked={infiniteVibration}
              onChange={(e) => setInfiniteVibration(e.target.checked)}
            />{" "}
            {t('tester.infiniteVibration')} (v)
          </label>
          <button
            onClick={() => {
              try {
                navigator
                  .getGamepads()[0]
                  ?.vibrationActuator?.playEffect("dual-rumble", {
                    startDelay: 0,
                    duration: 1000,
                    weakMagnitude: 1.0,
                    strongMagnitude: 1.0,
                  });
              } catch (error) {
                console.error("Error triggering vibration:", error);
              }
            }}
          >
            <GiVibratingBall />
          </button>
          <StyledSmallInfo>{t('tester.ps5NotSupported')}</StyledSmallInfo>
        </StyledVibrationLoopButtonWrapper>
      </StyledHistoryAndVibrationButtonsWrapper>
    </HistoryWrapper>
  );

  // ------------------------------- BUTTONS SECTION
  let buttonsNumber = [];
  const gpad = typeof navigator !== 'undefined' && navigator.getGamepads ? navigator.getGamepads()[playerNumber] : null;

  if (gpad && gpad.buttons) {
    for (let i = 0; i < gpad.buttons.length; i++) {
      let buttonsValue = gpad.buttons[i]?.value || 0;
      buttonsNumber.push(
        <StyledButtons key={i} value={buttonsValue}>
          B {i}
          <span>
            {(i === 6 || i === 7) && <><br />{buttonsValue.toFixed(2)}</>}
          </span>
        </StyledButtons>
      );
    }
  } else {
    // Render inactive placeholder buttons instantly
    for (let i = 0; i < 17; i++) {
      buttonsNumber.push(
        <StyledButtons key={i} value={0}>
          B {i}
          <span>
            {(i === 6 || i === 7) && <><br />0.00</>}
          </span>
        </StyledButtons>
      );
    }
  }

  // ------------------------------- AXES SECTION
  let axesNumber = [];
  if (gpad && gpad.axes) {
    for (let i = 0; i < gpad.axes.length; i++) {
      let renderedAxesValue = Math.abs(gpad.axes[i] || 0).toFixed(3).substring(0, 5);
      const axesLabels = [
        t('tester.leftStick') + " X ",
        t('tester.leftStick') + " Y ",
        t('tester.rightStick') + " X ",
        t('tester.rightStick') + " Y "
      ];

      axesNumber.push(
        <div key={i}>
          {axesLabels[i] || `Axes${i} `}→
          <span
            style={{
              color:
                renderedAxesValue <= 0.14 ? `${Theme.connected}` : "inherit",
            }}
          >
            {renderedAxesValue}
          </span>
        </div>
      );
    }
  } else {
    // Render inactive placeholder axes instantly
    const axesLabels = [
      t('tester.leftStick') + " X ",
      t('tester.leftStick') + " Y ",
      t('tester.rightStick') + " X ",
      t('tester.rightStick') + " Y "
    ];
    for (let i = 0; i < 4; i++) {
      axesNumber.push(
        <div key={i}>
          {axesLabels[i]}→
          <span style={{ color: `${Theme.connected}` }}>0.000</span>
        </div>
      );
    }
  }

  // RENDER SECTION

  // Player-specific SEO data
  const getPlayerSEOData = () => {
    const playerNames = ["One", "Two", "Three", "Four"];
    const playerName = playerNames[playerNumber] || "One";

    return {
      title: `Gamepad Tester - Player ${playerName} Controller`,
      description: `Test and analyze your Player ${playerName} game controller online. Check button presses, analog sticks, triggers, and vibration for any USB or Bluetooth gamepad.`,
      canonicalPath: playerNumber === 0 ? "main/one" :
        playerNumber === 1 ? "main/two" :
          playerNumber === 2 ? "main/three" : "main/four"
    };
  };

  const seoData = getPlayerSEOData();

  // Define gamepadName from state to fix ReferenceError
  const gamepadName = gamepadState.gamepadName;

  if (!connectionStatus) {
    return (
      <>
        {/* SEO meta tags removed - handled by PageSEO component at page level */}
        <StyledLoaderTextWrapper className={scaleValue}>
          <StyledLoader>
            <div></div>
            <div></div>
          </StyledLoader>

          <div className="connection-instructions">
            <h2><span style={{ background: 'none', WebkitTextFillColor: 'initial', marginRight: '10px' }}>🎮</span> {t('tester.readyToTest')}</h2>
            <p className="main-instruction">
              {t('tester.connectMessage')}
            </p>
            <div className="connection-methods">
              <div className="method-card">
                <span className="method-icon">🔌</span>
                <h3>{t('tester.usbConnection')}</h3>
                <p>{t('tester.usbInstruction')}</p>
              </div>
              <div className="method-card">
                <span className="method-icon">📶</span>
                <h3>{t('tester.wirelessPairing')}</h3>
                <p>{t('tester.wirelessInstruction')}</p>
              </div>
            </div>

            <p className="action-prompt">
              <strong>{t('tester.nextStep')}:</strong> {t('tester.pressAnyButton')}
            </p>
          </div>
        </StyledLoaderTextWrapper>

      </>
    );
  }

  // For Xbox controllers
  if (
    gamepadState.gamepadName.includes("Xbox") ||
    gamepadState.gamepadName.includes("XBOX") ||
    gamepadState.gamepadName.includes("xbox")
  ) {
    return (
      <>
        {/* SEO meta tags removed - handled by PageSEO component at page level */}
        <StyledContener id="gamepad-tester-container" className={scaleValue}>
          <AxesAndButtonsWrapper>
            {scaleInterface}
            <p>
              <span>{t('tester.gamepadId')}:</span> {gamepadName}
            </p>
            <AxesWrapper>{axesNumber}</AxesWrapper>
            <ButtonsWrapper>{buttonsNumber}</ButtonsWrapper>
            {buttonHistorySection}
          </AxesAndButtonsWrapper>
          <StyledGamepadSVGAxesAVGWrapper>
            <React.Suspense fallback={<div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t('tester.loadingVisuals')}</div>}>
              <XboxSVG
                leftX={gamepadState.leftX}
                leftY={gamepadState.leftY}
                rightX={gamepadState.rightX}
                rightY={gamepadState.rightY}
                l3Pressed={gamepadState.l3Pressed}
                r3Pressed={gamepadState.r3Pressed}
                lt={gamepadState.lt}
                rt={gamepadState.rt}
                lbPressed={gamepadState.lbPressed}
                rbPressed={gamepadState.rbPressed}
                APressed={gamepadState.APressed}
                BPressed={gamepadState.BPressed}
                XPressed={gamepadState.XPressed}
                YPressed={gamepadState.YPressed}
                upPressed={gamepadState.upPressed}
                downPressed={gamepadState.downPressed}
                leftPressed={gamepadState.leftPressed}
                rightPressed={gamepadState.rightPressed}
                sharePressed={gamepadState.sharePressed}
                optionsPressed={gamepadState.optionsPressed}
              />
              <AxesSVG
                leftX={gamepadState.leftX}
                leftY={gamepadState.leftY}
                l3Pressed={gamepadState.l3Pressed}
                rightX={gamepadState.rightX}
                rightY={gamepadState.rightY}
                r3Pressed={gamepadState.r3Pressed}
              />
              <TriggerPressureGraph lt={gamepadState.lt} rt={gamepadState.rt} />

              {/* Pro Monitoring Components */}
              <ExportReport />
              <InputLagMonitor />
              <BatteryConnectionMonitor />
              <DPadHeatmap />
              <ControllerInfo />
            </React.Suspense>
          </StyledGamepadSVGAxesAVGWrapper>
        </StyledContener>

      </>
    );
  }

  // For PS4 and PS5 controllers
  else {
    return (
      <>
        {/* SEO meta tags removed - handled by PageSEO component at page level */}
        <StyledContener id="gamepad-tester-container" className={scaleValue}>
          <AxesAndButtonsWrapper>
            {scaleInterface}
            <p>
              <span>{t('tester.gamepadId')}:</span> {gamepadName}
            </p>
            <AxesWrapper>{axesNumber}</AxesWrapper>
            <ButtonsWrapper>{buttonsNumber}</ButtonsWrapper>
            {buttonHistorySection}
          </AxesAndButtonsWrapper>
          <StyledGamepadSVGAxesAVGWrapper>
            <React.Suspense fallback={<div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t('tester.loadingVisuals')}</div>}>
              <PS4SVG
                leftX={gamepadState.leftX}
                leftY={gamepadState.leftY}
                rightX={gamepadState.rightX}
                rightY={gamepadState.rightY}
                l3Pressed={gamepadState.l3Pressed}
                r3Pressed={gamepadState.r3Pressed}
                lt={gamepadState.lt}
                rt={gamepadState.rt}
                lbPressed={gamepadState.lbPressed}
                rbPressed={gamepadState.rbPressed}
                APressed={gamepadState.APressed}
                BPressed={gamepadState.BPressed}
                XPressed={gamepadState.XPressed}
                YPressed={gamepadState.YPressed}
                upPressed={gamepadState.upPressed}
                downPressed={gamepadState.downPressed}
                leftPressed={gamepadState.leftPressed}
                rightPressed={gamepadState.rightPressed}
                sharePressed={gamepadState.sharePressed}
                optionsPressed={gamepadState.optionsPressed}
                logoPressed={gamepadState.logoPressed}
                touchbarPressed={gamepadState.touchbarPressed}
              />
              <AxesSVG
                leftX={gamepadState.leftX}
                leftY={gamepadState.leftY}
                l3Pressed={gamepadState.l3Pressed}
                rightX={gamepadState.rightX}
                rightY={gamepadState.rightY}
                r3Pressed={gamepadState.r3Pressed}
              />
              <TriggerPressureGraph lt={gamepadState.lt} rt={gamepadState.rt} />

              {/* Pro Monitoring Components */}
              <ExportReport />
              <InputLagMonitor />
              <BatteryConnectionMonitor />
              <DPadHeatmap />
              <ControllerInfo />
            </React.Suspense>
          </StyledGamepadSVGAxesAVGWrapper>
        </StyledContener>
        <React.Suspense fallback={null}>
          <Ad />
        </React.Suspense>

      </>
    );
  }
};

// Export memoized component for better performance
export const MainGamepad = memo(MainGamepadComponent, (prevProps, nextProps) => {
  // Custom comparison function for memoization
  return prevProps.playerNumber === nextProps.playerNumber;
});
