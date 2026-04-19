'use client'

import React from "react";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import Link from "next/link";
import { FiCpu, FiHardDrive, FiAlertTriangle } from "react-icons/fi";
import styled from "styled-components";
import { Theme } from "@/styles/Theme";

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 30px 0;
  
  .tool-item {
    background: #f7fafc;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #edf2f7;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

export const SteamDeckSSDUpgradeGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>Steam Deck SSD Upgrade: Maximum Storage &amp; Speed Guide</h1>
      <p className="meta">BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026</p>
    </div>

    <p>
      The Valve Steam Deck is the first mass-market handheld that encourages user-repairability. While the base 64GB eMMC and 256GB NVMe models are capable, modern Steam titles like <em>Baldur's Gate 3</em> or <em>Cyberpunk 2077</em> often exceed 100GB. upgrading your internal storage to a 1TB or 2TB NVMe SSD isn't just about capacity—it also significantly improves shader cache performance and system responsiveness.
    </p>

    <p>
      This guide provides the technical breakdown for selecting a compatible <strong>M.2 2230</strong> drive and performing a professional-grade installation on the LCD (1010) model.
    </p>

    <h2>Essential Component: M.2 2230 NVMe</h2>
    <p>
      <strong>Crucial:</strong> The Steam Deck does NOT support standard desktop M.2 2280 drives. You must purchase a 2230 (30mm) format drive. Using a larger drive with an adapter is dangerous as it can overheat the power IC or provide physical pressure on the screen assembly.
    </p>

    <ToolGrid>
      <div className="tool-item">Phillips #0 / #1</div>
      <div className="tool-item">Plastic Pry Tool</div>
      <div className="tool-item">Anti-static Tweezers</div>
      <div className="tool-item">USB-C Drive (8GB+)</div>
    </ToolGrid>

    <h2>Professional Teardown Workflow</h2>
    <h3>1. Preparation &amp; Battery Storage Mode</h3>
    <p>Before opening the deck, enter the BIOS (Volume + and Power) and navigate to <strong>Setup Utility &gt; Power &gt; Battery Storage Mode</strong>. This electronically disconnects the battery from the circuit, preventing accidental shorts during the SSD swap.</p>

    <h3>2. Removing the Chassis</h3>
    <p>Remove the 8 screws at the back. Note that the 4 outer screws are longer than the 4 inner screws. Use your plastic pry tool to unclip the seam starting near the triggers. <strong>Warning:</strong> Remove your microSD card before prying, or you will snap it in half.</p>

    <h3>3. Shield and SSD Swap</h3>
    <p>Remove the foil shield (held by 3 screws, one is under a sticker). Once the SSD is exposed, unscrew it and slide the <strong>shielding sleeve</strong> off the old drive and onto the new one. This sleeve is critical for preventing EMI interference with the Wi-Fi/Bluetooth module.</p>

    <h2>Re-Imaging SteamOS</h2>
    <p>
      Your new drive is blank. You must use the official Steam Deck Recovery Image:
    </p>
    <ol>
      <li>Download the image from Valve's website.</li>
      <li>Flash it to a USB drive using Rufus or BalenaEtcher.</li>
      <li>Connect to the Deck, hold Volume Down and Power, select your USB drive, and choose <strong>Re-image Steam Deck</strong>.</li>
    </ol>

    <div style={{ padding: '30px', background: '#fffaf0', border: '1px solid #feebc8', borderRadius: '12px', marginTop: '40px' }}>
      <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><FiAlertTriangle color="#dd6b20" /> Technical Limitation</h3>
      <p>While the Steam Deck supports PCIe Gen4 drives, the internal interface is capped at Gen3 x2 speeds (LCD model) or Gen3 x4 (OLED model). You won't see the full 7000MB/s speeds of a high-end Gen4 drive, but the increased IOPS (Input/Output Operations Per Second) will still provide a noticeable boost over eMMC.</p>
    </div>

    <h2>Frequently Asked Questions</h2>
    <span className="q">Does this void my warranty?</span>
    <span className="a">In the US and EU, opening your device does not void your warranty thanks to Right to Repair laws. However, any damage you cause (like stripping screws or puncturing the battery) is not covered.</span>

    <span className="q">Can I just run everything from a fast MicroSD card?</span>
    <span className="a">You can, but the MicroSD slot is capped at UHS-I speeds (~100MB/s). Modern shader caches perform significantly better on NVMe storage, reducing "stuttering" in demanding games.</span>

    <div style={{ marginTop: '50px' }}>
      <Link href="/guides/valve/steamdeck-1010-lcd/thumbstick-replacement" className="related-link">
        Next: Steam Deck Thumbstick Replacement Guide →
      </Link>
    </div>
  </StyledArticleWrapper>
);
