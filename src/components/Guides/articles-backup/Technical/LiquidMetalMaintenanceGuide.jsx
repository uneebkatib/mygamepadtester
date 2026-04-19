'use client'

import React from "react";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import Link from "next/link";
import { FiAlertTriangle, FiThermometer, FiZap } from "react-icons/fi";

export const LiquidMetalMaintenanceGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>Xbox Series X &amp; PS5 Liquid Metal Maintenance Guide</h1>
      <p className="meta">BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026</p>
    </div>

    <p>
      Both the PlayStation 5 and later revisions of the Xbox Series X utilize Liquid Metal (Gallium-based) thermal interface material (TIM) instead of traditional paste. While liquid metal has incredible thermal conductivity (~73 W/mK), it is also electrically conductive and prone to "pooling" if the console is kept in a vertical orientation for several years.
    </p>

    <h2>The "Dry Spot" Phenomenon</h2>
    <p>
      Over time, gravity can cause the liquid metal to shift, leaving a dry spot on the top half of the APU silicon. This results in instant localized overheating and the "Console is too hot" message within seconds of launching a game.
    </p>

    <h2>Maintenance Steps (Expert Only)</h2>
    <ul>
      <li><strong>Containment:</strong> If you open the APU clamp, you MUST ensure the foam or rubber gasket around the die is intact. A single droplet of liquid metal on the motherboard will cause a permanent short circuit.</li>
      <li><strong>Spreading:</strong> You do not necessarily need to add more. Often, simply using a lint-free swab to "redistribute" the existing pool across the die and heatsink surface restores thermal performance.</li>
      <li><strong>Replacement:</strong> If the gallium has oxidized (turned gray/crusty), use specialized cleaners and apply a fresh drop of Thermal Grizzly Conductonaut.</li>
    </ul>

    <div style={{ padding: '20px', background: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '8px', margin: '30px 0' }}>
      <FiAlertTriangle color="#e53e3e" /> <strong>WARNING:</strong> This is a high-risk repair. 90% of DIY liquid metal repairs result in a dead console due to improper containment. Do not attempt without a microscopic inspection tool.
    </div>

    <div style={{ marginTop: '50px' }}>
      <Link href="/guides/sony/ps5-console/fan-cleaning-guide" className="related-link">
        See Also: PS5 Fan Cleaning Guide →
      </Link>
    </div>
  </StyledArticleWrapper>
);
