'use client'

import React from "react";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import Link from "next/link";
import { FiBattery, FiZap, FiTarget } from "react-icons/fi";
import styled from "styled-components";
import { Theme } from "@/styles/Theme";

export const XboxEliteBatteryGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>Xbox Elite Series 2 Battery Replacement: Internal Power Repair</h1>
      <p className="meta">BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026</p>
    </div>

    <p>
      The Xbox Elite Series 2 is a masterpiece of controller design, but unlike the standard Xbox controller, it utilizes an internal, non-removable Lithium-Ion battery. After 1,000+ charge cycles, this battery will inevitably degrade, leading to shorter play sessions or a complete failure to power on without being tethered to a USB-C cable.
    </p>

    <p>
      This guide provides the technical methodology for opening the adhesive-sealed Elite 2 chassis and safely replacing the internal 2050mAh cell.
    </p>

    <h2>Symptoms of Elite 2 Battery Failure</h2>
    <ul>
      <li><strong>Bluetooth Disconnects:</strong> Signal strength drops as voltage fluctuates under load.</li>
      <li><strong>LED Indicators:</strong> The front LED flashes orange rapidly but never reaches a solid white/green charge.</li>
      <li><strong>Swelling:</strong> The front faceplate begins to feel "tight" or buttons become unresponsive due to internal pressure.</li>
    </ul>

    <h2>The Specialist Teardown</h2>
    <p>
      <strong>Step 1: The Shell.</strong> The Elite 2 uses internal plastic clips and adhesive. Use a thin metal prying tool carefully around the seam to pop the top shell. Avoid the paddles at the back.
    </p>
    <p>
      <strong>Step 2: Motherboard Access.</strong> You must remove the main logic board screws (T6 Torx). The battery is located directly beneath the mid-frame, glued to the underside.
    </p>
    <p>
      <strong>Step 3: The Swap.</strong> Disconnect the 2-pin JST connector. Use a plastic spudger to pry the battery from the adhesive. Install the new cell and ensure the thermal sensor (if present) is properly positioned.
    </p>

    <h2>Maintenance Tip</h2>
    <p>To extend your new battery's life, avoid leaving the controller on the charging dock 24/7. Keep the charge between 20% and 80% for maximum chemical longevity. For more on optimizing your controller's wireless performance, check our <Link href="/guides/controller-testing/latency-testing/wireless-vs-wired-analysis">Wireless vs Wired Analysis</Link>.</p>

    <h2>Frequently Asked Questions</h2>
    <span className="q">Can I use a higher capacity battery?</span>
    <span className="a">The physical space inside the Elite 2 is extremely tight. Any battery larger than the 2050mAh OEM spec will likely prevent the shell from closing properly.</span>

    <span className="q">Does this fix the stick drift?</span>
    <span className="a">No. Battery replacement only addresses power issues. For stick drift, see our <Link href="/guides/microsoft/xbox-one-gamepad/stick-drift-repair">Elite Stick Drift Guide</Link>.</span>
  </StyledArticleWrapper>
);
