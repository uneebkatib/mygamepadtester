'use client'

import React from "react";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import Link from "next/link";
import { FiBox, FiHardDrive, FiZap } from "react-icons/fi";
import styled from "styled-components";
import { Theme } from "@/styles/Theme";

const QuickSpec = styled.div`
  display: flex;
  background: ${Theme.surface};
  border: 1px solid ${Theme.border};
  border-radius: 12px;
  overflow: hidden;
  margin: 30px 0;
  
  .label { background: #2f855a; color: white; padding: 15px 25px; font-weight: 700; width: 140px; text-align: center; }
  .value { padding: 15px 25px; display: flex; align-items: center; font-weight: 600; color: #2d3748; }
`;

export const XboxSeriesXSSDGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>Xbox Series X SSD Expansion: The definitive Velocity Guide</h1>
      <p className="meta">BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026</p>
    </div>

    <p>
      The Xbox Series X is the most powerful console Microsoft has ever built, powered by the "Velocity Architecture." At its heart is a 1TB custom NVMe SSD, but with game file sizes ballooning—*Call of Duty* and *Forza Horizon 5* can easily eat 100GB+ each—the default drive fills up rapidly. 
    </p>

    <p>
      Unlike previous Xbox generations, the Series X requires high-performance storage that matches the internal 2.4GB/s (raw) bandwidth to play Series X|S optimized titles. This guide covers the official expansion methods and how to optimize your storage hierarchy.
    </p>

    <QuickSpec>
      <div className="label">PORT TYPE</div>
      <div className="value">Storage Expansion Port (CFexpress Form Factor)</div>
    </QuickSpec>

    <h2>The Proprietary Requirement</h2>
    <p>
      For playing current-gen games, you MUST use the physical <strong>Storage Expansion Card</strong> (available from Seagate and Western Digital). These cards utilize the PCI Express Gen4 x2 lanes directly connected to the CPU. A standard USB external SSD is limited by the 10Gbps USB 3.0 bus and CANNOT play optimized games—it can only store them.
    </p>

    <h2>Installation: Plug-and-Play Efficiency</h2>
    <ol>
      <li>Locate the <strong>Storage Expansion</strong> port on the back of the console, situated between the HDMI Out and the Ethernet port.</li>
      <li>Remove the protective cap from your expansion card.</li>
      <li>Slide the card into the port until it clicks. You can do this while the console is powered on.</li>
      <li>A notification will appear: "Expansion Card Ready." No formatting is required.</li>
    </ol>

    <h2>Optimizing Your Storage Strategy</h2>
    <p>
      In our <Link href="/">testing lab</Link>, we've identified the most efficient way to manage a 1TB+ library:
    </p>
    <ul>
      <li><strong>Internal SSD:</strong> Keep your most-played competitive shooters (for minimal latency).</li>
      <li><strong>Expansion Card:</strong> Use for massive open-world RPGs (identical speed to internal).</li>
      <li><strong>USB External Drive:</strong> Massive 4TB-8TB HDD for Xbox One and backward-compatible titles.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    <span className="q">Can I use a CFexpress Type B camera card?</span>
    <span className="a">No. While the physical connector is the same, the Xbox uses a proprietary firmware handshake and a custom NVMe protocol. Standard camera cards will not be recognized.</span>

    <span className="q">Is the Series S expansion card the same as Series X?</span>
    <span className="a">Yes. The cards are 100% cross-compatible between both consoles. If you upgrade from a Series S to a Series X, you can simply move the card and your games will be ready to play instantly.</span>

    <div style={{ marginTop: '50px' }}>
      <Link href="/guides/microsoft/xbox-series-x/liquid-metal-maintenance" className="related-link">
        Advanced: Xbox Series X Thermal Maintenance →
      </Link>
    </div>
  </StyledArticleWrapper>
);
