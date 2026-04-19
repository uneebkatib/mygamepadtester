'use client'

import React from "react";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import Link from "next/link";
import { FiTarget, FiTool, FiAlertCircle } from "react-icons/fi";
import styled from "styled-components";
import { Theme } from "@/styles/Theme";

const TechNote = styled.div`
  background: #ebf8ff;
  border-left: 4px solid #4299e1;
  padding: 20px;
  margin: 30px 0;
  border-radius: 4px;
  color: #2b6cb0;
  font-size: 0.95rem;
`;

export const SwitchLiteStickReplacementGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>Nintendo Switch Lite Analog Stick Replacement Guide</h1>
      <p className="meta">BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026</p>
    </div>

    <p>
      The Nintendo Switch Lite is a beautiful, unified handheld, but it shares the same fatal flaw as the original Switch: Joy-Con drift. However, unlike the original Switch where you can simply swap the Joy-Con, the Lite requires a full internal disassembly to replace the analog sticks.
    </p>

    <p>
      This is a "Level 3" repair—it is tedious and involves handling several delicate ribbon cables. This guide provides the professional methodology for replacing both the Left and Right sticks, which have slightly different internal layouts.
    </p>

    <h2>Required Tools</h2>
    <ul>
      <li>Replacement Joy-Con Stick (Standard or Hall Effect)</li>
      <li>Tri-point Y00 and Phillips #00 Screwdrivers</li>
      <li>Plastic spudger and tweezers</li>
      <li>99% Isopropyl Alcohol (for cleaning)</li>
    </ul>

    <TechNote>
      <strong><FiInfo /> Pro Tip:</strong> If you are already opening your Switch Lite for drift repair, we highly recommend upgrading to **Hall Effect Sensor Sticks**. These use magnetic fields instead of carbon tracks and will never develop drift from mechanical wear.
    </TechNote>

    <h2>The Diagnostic First Step</h2>
    <p>
      Before taking out a single screw, verify the drift in our <Link href="/">online gamepad tester</Link>. If the drift is minor (resting value under 0.10), you might be able to resolve it with a simple calibration. If it's erratic or "stuck" in one direction, the hardware replacement is necessary.
    </p>

    <h2>Disassembly Highlights</h2>
    <h3>1. Backplate and Heat Shield</h3>
    <p>Remove the outer Y00 screws and the phillips screws hidden under the MicroSD flap. Pop the backplate. You must remove the large silver heat shield and disconnect the battery immediately.</p>

    <h3>2. The Left Stick (Easier)</h3>
    <p>The Left stick is located under a separate sub-PCB (daughterboard). Disconnect the ribbon cables for the L-button and the stick, remove two screws, and swap the module.</p>

    <h3>3. The Right Stick (Difficult)</h3>
    <p>The Right stick is located directly under the motherboard. You do NOT necessarily need to remove the whole motherboard, but you must move the screen and digitizer cables aside to reach the screws. Be extremely careful not to tear the thin display ribbons.</p>

    <h2>Reassembly and Recalibration</h2>
    <p>
      Once reassembled, you MUST calibrate the new sticks in the System Settings. After system calibration, return to <Link href="/joystick-calibration">our calibration tool</Link> to verify that your circularity error is under 10% and your X/Y range is full.
    </p>

    <h2>Frequently Asked Questions</h2>
    <span className="q">Can I just use WD-40?</span>
    <span className="a"><strong>NO.</strong> Standard WD-40 is a lubricant, not a cleaner, and will destroy the sensors and the screen adhesive. Only use Electronics Contact Cleaner if you are attempting a spray-fix, and only as a temporary measure.</span>

    <span className="q">Will this fix the "ghost" button presses?</span>
    <span className="a">Sometimes. Ghost presses are often caused by the same debris that causes drift. While the shell is open, clean the button membranes with 99% IPA.</span>

    <div style={{ marginTop: '50px' }}>
      <Link href="/guides/nintendo/nintendo-switch-lite/d-pad-repair" className="related-link">
        Next: Switch Lite D-Pad Optimization Guide →
      </Link>
    </div>
  </StyledArticleWrapper>
);
