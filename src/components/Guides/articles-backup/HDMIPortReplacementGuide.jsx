'use client'

import React from "react";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import Link from "next/link";
import { FiTool, FiZap, FiCheckCircle } from "react-icons/fi";

export const HDMIPortReplacementGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>Professional HDMI Port Replacement: Microsoldering Tutorial</h1>
      <p className="meta">BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026</p>
    </div>

    <p>
      HDMI port replacement is the most common board-level repair in modern gaming. The mechanical stress of frequently plugging/unplugging cables, combined with the "leverage" effect of heavy HDMI 2.1 cables, eventually tears the surface-mount pads off the motherboard.
    </p>

    <h2>The Professional Equipment List</h2>
    <ul>
      <li>Hot Air Rework Station (Quick 861DW or equivalent)</li>
      <li>Microsoldering Iron with a fine chisel tip</li>
      <li>Amtech NC-559 Flux</li>
      <li>Low-melt solder (for easier removal)</li>
      <li>High-quality replacement port with through-hole anchors</li>
    </ul>

    <h2>Workflow Summary</h2>
    <ol>
      <li><strong>Removal:</strong> Apply flux and low-melt solder to the anchor legs. Use hot air (400°C) to lift the old port. Avoid "blasting" nearby components like the HDMI encoder chip.</li>
      <li><strong>Clearing the Pads:</strong> Use solder wick to clean the 19 tiny pins and the 4 anchor holes. The pads must be perfectly flat.</li>
      <li><strong>Tinning:</strong> Pre-tin the pads on the motherboard and the pins on the new port.</li>
      <li><strong>Installation:</strong> Seat the new port and use a soldering iron to "drag solder" the 19 pins. Finalize by soldering the 4 physical anchors for structural strength.</li>
    </ol>

    <h2>Verification</h2>
    <p>
      Once installed, use a <Link href="/guides/hdmi/all-consoles/all-consoles-hdmi-diode-test">diode mode test</Link> to ensure no bridge exists between pins. Then, test with a 4K/120Hz display to verify that the handshake is stable under high bandwidth.
    </p>

    <div style={{ marginTop: '50px' }}>
      <Link href="/guides/hdmi/all-consoles/hdmi-troubleshooting-guide" className="related-link">
        Back to: HDMI Troubleshooting Hub →
      </Link>
    </div>
  </StyledArticleWrapper>
);
