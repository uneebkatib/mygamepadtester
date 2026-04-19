'use client'

import React from "react";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import Link from "next/link";
import { FiWind, FiBattery, FiZap, FiEdit3 } from "react-icons/fi";
import styled from "styled-components";
import { Theme } from "@/styles/Theme";

export const DualSenseTroubleshootingGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>PS5 DualSense Complete Troubleshooting &amp; Repair Hub</h1>
      <p className="meta">BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026</p>
    </div>

    <p>
      The PS5 DualSense is the most advanced standard controller ever released, featuring haptic feedback and adaptive triggers. However, its complexity makes it prone to specific failures—from stick drift to "clicking" triggers and battery depletion. 
    </p>

    <p>
      This master guide covers the standard diagnostic path for the DualSense, utilizing our <Link href="/">online testing suite</Link> to identify if your issue is software-locked or requires hardware intervention.
    </p>

    <h2>1. The Hard Reset (Step One for All Issues)</h2>
    <p>
      Before assuming a mechanical failure, perform a hardware reset. Locate the tiny hole on the back of the controller near the Sony logo. Use a paperclip to hold the internal button for 5 full seconds while the PS5 is off. Re-pair via USB. This clears the internal Bluetooth cache and resets the trigger calibration.
    </p>

    <h2>2. Adaptive Trigger "Grinding" or Failure</h2>
    <p>
      If your triggers feel loose or make a grinding sound, the internal worm gear or the return spring has likely failed. <strong>Diagnostic:</strong> Go to <strong>Settings &gt; Accessories &gt; Controller &gt; Trigger Effect Intensity</strong> and toggle it off. If the sound persists, the mechanical gear is jammed and requires disassembly to clear debris.
    </p>

    <h2>3. Stick Drift: The ALPS Reality</h2>
    <p>
      The DualSense uses standard ALPS potentiometers. If your <Link href="/stick-drift-test">stick drift test</Link> shows an offset greater than 10%, cleaning the sensor with 99% IPA is the first step. If the drift returns within days, the potentiometer track is worn and requires a soldering-level replacement.
    </p>

    <h2>4. Battery Life Optimization</h2>
    <p>
      The DualSense battery is rated for 1560mAh. To maximize playtime:
    </p>
    <ul>
      <li>Reduce Brightness of the light bar (Settings &gt; Controllers).</li>
      <li>Lower Haptic Feedback to "Medium" or "Weak".</li>
      <li>Turn off the controller speaker if not in use.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    <span className="q">My controller won't charge on the dock.</span>
    <span className="a">Check the "EXT" port pins at the bottom. These often become oxidized or dirty. Clean them with a Q-tip and IPA. If it charges via USB-C but not the dock, the bottom flex ribbon is the culprit.</span>

    <span className="q">Is there a "V3" DualSense?</span>
    <span className="a">Yes. Sony has silently updated the stick springs and trigger assemblies in newer models (usually distinguished by the FCC ID ending in 'A' or 'B'). These are significantly more durable than the launch V1 units.</span>

    <div style={{ marginTop: '50px' }}>
      <Link href="/guides/sony/ps5-gamepad-dualsense-edge/dualsense-edge-repair" className="related-link">
        Pro Level: DualSense Edge Module Replacement Guide →
      </Link>
    </div>
  </StyledArticleWrapper>
);
