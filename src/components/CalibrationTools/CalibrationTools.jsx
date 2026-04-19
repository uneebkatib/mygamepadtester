import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import { Theme } from "../../styles/Theme";
import PageSEO from "../SEO/PageSEO";
import { CalibrationToolsContent } from "../SEO/OptimizedContent";

const StyledCalibrationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border-radius: 16px;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};
  border: 2px solid ${Theme.border};

  h1 {
    color: ${Theme.primary};
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .content-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: ${Theme.backgroundLight};
    border-radius: 12px;
    border: 1px solid ${Theme.border};
  }

  h2 {
    color: ${Theme.textPrimary};
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }

  p {
    color: ${Theme.textPrimary};
    line-height: 1.6;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export function CalibrationTools() {
  return (
    <>
      <PageSEO page="calibrationTools" />
      <StyledCalibrationContainer>
        <h1>🎮 Professional Gamepad Calibration Tools</h1>
        
        <div className="content-section">
          <h2>Precision Controller Calibration</h2>
          <p>
            Our advanced calibration tools help you fine-tune your gaming controller for optimal performance. 
            Whether you're a competitive gamer or casual player, proper calibration can significantly improve 
            your gaming experience by reducing input lag, eliminating drift, and ensuring accurate response times.
          </p>
          <p>
            Calibration is the process of adjusting your controller's sensitivity, deadzone, and response curves 
            to match your playstyle and game requirements. This is especially important for precision-based games 
            like first-person shooters, racing simulators, and fighting games.
          </p>
        </div>
        
        <div className="content-section">
          <h2>Calibration Features</h2>
          <p>
            Our calibration suite includes tools for adjusting analog stick deadzones, trigger sensitivity, 
            button response curves, and haptic feedback settings. Each tool provides real-time feedback and 
            precise measurements to help you achieve the perfect setup for your gaming needs.
          </p>
          <p>
            With our professional-grade calibration tools, you can:
          </p>
          <ul>
            <li>Eliminate analog stick drift and improve accuracy</li>
            <li>Customize trigger response for racing and shooting games</li>
            <li>Adjust button sensitivity for faster response times</li>
            <li>Optimize haptic feedback for immersive gaming experiences</li>
            <li>Save and load calibration profiles for different games</li>
          </ul>
        </div>
        
        <CalibrationToolsContent />
      </StyledCalibrationContainer>
    </>
  );
}

