'use client'

import React from "react";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import Link from "next/link";
import { FiBattery, FiZap, FiTarget } from "react-icons/fi";
import styled from "styled-components";
import { Theme } from "@/styles/Theme";

const BatteryWarning = styled.div`
  background: #fffaf0;
  border: 1px solid #feebc8;
  padding: 20px;
  border-radius: 12px;
  margin: 30px 0;
  color: #7b341e;
  
  h4 { margin-top: 0; display: flex; align-items: center; gap: 8px; }
`;

export const SwitchBatteryReplacementGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>Nintendo Switch Battery Replacement: Lifespan Restoration Guide</h1>
      <p className="meta">BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026</p>
    </div>

    <p>
      Lithium-Ion batteries are consumables. After 500 charge cycles (roughly 2-3 years of heavy use), the Nintendo Switch's internal 4310mAh battery begins to lose capacity, manifesting as sudden percentage drops or a "sleep" mode that drains 20% overnight.
    </p>

    <p>
      Replacing the battery is one of the most effective ways to revitalize an original 2017/2018 Switch. This guide provides the technical methodology for safely removing the heavily-glued internal cell and calibrating the new battery management system (BMS).
    </p>

    <h2>Signs of Battery Failure</h2>
    <ul>
      <li><strong>Swollen Backplate:</strong> The battery is off-gassing and expanding—replace immediately to avoid fire risk.</li>
      <li><strong>Rapid Discharge:</strong> Console drops from 100% to 20% in under an hour.</li>
      <li><strong>Shutdown at 15-20%:</strong> The BMS cannot accurately read the voltage curve of the degraded cells.</li>
    </ul>

    <BatteryWarning>
      <h4><FiZap /> Chemical Safety</h4>
      <p>Lithium-Ion batteries can catch fire if punctured. Use only <strong>plastic prying tools</strong>. Never use a metal screwdriver to pry the battery as a short between the cell layers can cause a thermal runaway event.</p>
    </BatteryWarning>

    <h2>The Replacement Process</h2>
    <h3>1. Gaining Access</h3>
    <p>Remove the four Y00 screws on the corners and the Phillips screws on the sides/top/bottom. Pop the backplate off and remove the silver metal shield plate. You will see the battery secured by thick adhesive strips.</p>

    <h3>2. Removing the Adhesive</h3>
    <p><strong>The Pro Method:</strong> Apply a few drops of 90%+ Isopropyl Alcohol around the edges of the battery. Wait 2 minutes for the alcohol to dissolve the adhesive. Use a wide plastic spudger to gently lift the battery from the right side. Do not bend the motherboard while prying.</p>

    <h3>3. Connecting the New Cell</h3>
    <p>Ensure the connector is perfectly aligned before pressing down. The Switch uses a fragile 3-pin friction connector. Replace the metal shield plate and ensure the SD card reader is clicked back into place before testing.</p>

    <h2>Post-Installation Calibration</h2>
    <p>
      To "teach" the Switch its new battery capacity, you must perform a full cycle:
    </p>
    <ol>
      <li>Charge to 100% and leave it on the charger for 2 extra hours.</li>
      <li>Use the console until it shuts down automatically from 0% battery.</li>
      <li>Charge back to 100% without interruption.</li>
    </ol>
    <p>
      During this process, ensure your joycons are connected to the rails. Use our <Link href="/">Power Diagnostic tool</Link> to check if the charging current is stable at 15V (Docked) or 5V (Handheld).
    </p>

    <h2>Frequently Asked Questions</h2>
    <span className="q">Can I use a higher capacity battery?</span>
    <span className="a">Be cautious. While "5000mAh+" batteries exist on third-party markets, many are mislabeled or lack proper thermal protection circuits. Stick to reputable brands like iFixit or genuine OEM pulls.</span>

    <span className="q">My console won't turn on at all after replacement.</span>
    <span className="a">Ensure the battery connector is fully seated. Also, check the tiny ribbon cable for the power/volume button assembly—it is easy to snag during disassembly.</span>

    <div style={{ marginTop: '50px' }}>
      <Link href="/guides/nintendo/nintendo-switch-joy-con/joycon-drift" className="related-link">
        Related: Joy-Con Drift Repair Guide →
      </Link>
    </div>
  </StyledArticleWrapper>
);
