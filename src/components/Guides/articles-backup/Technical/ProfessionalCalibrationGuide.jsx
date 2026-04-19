'use client'

import React from "react";
import Link from "next/link";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import { FiTool, FiCheckCircle, FiInfo, FiExternalLink } from "react-icons/fi";
import styled from "styled-components";
import { Theme } from "@/styles/Theme";

const ToolBox = styled.div`
  background: ${Theme.surface};
  border-left: 4px solid ${Theme.primary};
  padding: 20px;
  margin: 30px 0;
  border-radius: 0 12px 12px 0;
  
  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 0 !important;
    font-size: 1.1rem !important;
  }
`;

const StepList = styled.div`
  margin: 30px 0;
  
  .step {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
    
    .number {
      background: ${Theme.primary};
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-weight: 700;
      font-size: 0.9rem;
    }
    
    .text {
      h4 {
        margin-top: 0 !important;
        margin-bottom: 8px !important;
        font-size: 1.1rem !important;
      }
      p {
        margin-bottom: 0 !important;
        color: #4a5568;
      }
    }
  }
`;

const FaqSection = styled.div`
  margin-top: 50px;
  border-top: 1px solid #edf2f7;
  padding-top: 40px;
  
  .q {
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 10px;
    display: block;
  }
  .a {
    color: #4a5568;
    margin-bottom: 30px;
    display: block;
    line-height: 1.6;
  }
`;

export const ProfessionalCalibrationGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>Professional Gamepad Calibration Methods: Technical Accuracy Guide</h1>
      <p className="meta">
        BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026
      </p>
    </div>

    <p>
      Calibration is the bridge between a physical sensor's raw electrical output and the binary instructions your gaming console understands. In a perfect world, every analog stick would rest at an absolute 0,0 coordinate value. In reality, manufacturing tolerances and wear introduce "center noise" and axis offsets that can only be resolved through systematic, professional calibration.
    </p>

    <p>
      At <strong>mygamepadtester.com</strong>, we analyze thousands of controller telemetry profiles daily. Our data suggests that over 30% of "faulty" controllers aren't broken—they are simply out of sync with their software baselines. This guide provides the definitive methodology for re-establishing a professional-grade calibration on Xbox, PlayStation, and Nintendo hardware.
    </p>

    <h2>Why Professional Calibration Matters</h2>
    <p>
      Standard "thumbstick clicking" resets are often placebo effects. Professional calibration involves resetting the actual sensor thresholds at the driver or firmware level. This is critical because:
    </p>
    <ul>
      <li><strong>Deadzone Reduction:</strong> Allows you to play with a 0-2% deadzone without drift.</li>
      <li><strong>Input Linearity:</strong> Ensures that moving the stick 50% physically results in exactly 50% movement in-game.</li>
      <li><strong>Circularity Correction:</strong> Fixes "squaring" issues where diagonal movement is faster or slower than cardinal directions.</li>
    </ul>

    <ToolBox>
      <h3><FiTool /> Required Diagnostic Tools</h3>
      <ul>
        <li><Link href="/joystick-calibration">Live Joystick Calibration Tool</Link></li>
        <li>USB-C or Micro-USB Data Cable (Bluetooth-only calibration is unreliable)</li>
        <li>Hardware-specific calibration software (Xbox Accessories App, DualSense Edge Profiles)</li>
      </ul>
    </ToolBox>

    <h2>Confirming Calibration Baseline</h2>
    <p>
      Before attempting a reset, you must confirm your current baseline. Connect your controller and open our <Link href="/joystick-calibration">calibration diagnostic</Link>. Move the stick slowly in a circle and then let it snap back to center.
    </p>
    <p>
      If your <strong>Center Offset</strong> is consistently above 0.08 (8%) or your <strong>Circularity Error</strong> exceeds 15%, your controller requires a recalibration to restore competitive performance.
    </p>

    <h2>Step-by-Step Professional Calibration Method</h2>
    
    <StepList>
      <div className="step">
        <div className="number">1</div>
        <div className="text">
          <h4>Zeroing the Physical Axis</h4>
          <p>Ensure the analog stick is completely clean of debris. Use compressed air around the base of the stick to remove "stick dust" which can physically prevent the stick from returning to absolute center.</p>
        </div>
      </div>
      <div className="step">
        <div className="number">2</div>
        <div className="text">
          <h4>Firmware-Level Reset</h4>
          <p>For Xbox, use the Accessories App to trigger a firmware-level reset. On PlayStation, utilize the recessed reset button for 10 seconds while the console is powered off to clear the internal sensor cache.</p>
        </div>
      </div>
      <div className="step">
        <div className="number">3</div>
        <div className="text">
          <h4>Range-of-Motion (ROM) Mapping</h4>
          <p>With the <Link href="/joystick-calibration">Calibration Tool</Link> active, move the stick to its absolute outer limits in 8 cardinal directions. This teaches the driver where the physical physical housing ends, preventing "stick acceleration" issues.</p>
        </div>
      </div>
      <div className="step">
        <div className="number">4</div>
        <div className="text">
          <h4>Testing Asymmetric Deviation</h4>
          <p>Check if the stick reaches 1.00 (100%) on the X-axis but only 0.95 on the Y-axis. Professional calibration software allows for axis independent scaling to fix this common manufacturer defect.</p>
        </div>
      </div>
    </StepList>

    <h2>How to Maintain Calibration Longevity</h2>
    <p>
      Potentiometer sensors (found in DualSense and Xbox controllers) degrade over time due to carbon contact wear. Hall Effect sensors (found in modern pro controllers) use magnetic fields and rarely require recalibration. 
    </p>
    <p>
      To maximize your calibration's life, avoid "snapping" the sticks back to center. Instead, guide them back. This preserves the internal spring tension which is the primary driver of physical centering.
    </p>

    <FaqSection>
      <h2>Frequently Asked Questions</h2>
      
      <span className="q">Can I calibrate a controller without using a PC?</span>
      <span className="a">Yes, modern consoles like Xbox and Switch have built-in calibration menus under "Devices" or "Controllers". However, they lack the high-precision telemetry available on our browser-based tools.</span>

      <span className="q">Will calibration fix stick drift?</span>
      <span className="a">Calibration can fix "software drift" where the center has shifted. It cannot fix "mechanical drift" caused by worn-out carbon tracks inside the stick module. If calibration doesn't work, see our <Link href="/guides/controller-testing/drift-detection/advanced-drift-analysis">Advanced Drift Analysis Guide</Link>.</span>

      <span className="q">How often should I recalibrate?</span>
      <span className="a">Professional gamers recalibrate their controllers once a month. For casual use, once every 6 months is sufficient to maintain optimal input response.</span>
    </FaqSection>

    <div style={{ marginTop: '60px', padding: '30px', background: '#f7fafc', borderRadius: '16px', border: '1px solid #edf2f7' }}>
      <h3 style={{ marginTop: 0 }}>Next Steps</h3>
      <p>Now that your sticks are calibrated, verify your input latency to ensure your controller is performing at its peak potential.</p>
      <Link href="/guides/controller-testing/latency-testing/input-lag-optimization" style={{ color: Theme.primary, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
        Read the Input Lag Optimization Guide <FiExternalLink />
      </Link>
    </div>
  </StyledArticleWrapper>
);
