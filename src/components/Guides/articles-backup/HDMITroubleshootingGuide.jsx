'use client'

import React from "react";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";
import Link from "next/link";
import { FiMonitor, FiZap, FiWifi } from "react-icons/fi";
import styled from "styled-components";
import { Theme } from "@/styles/Theme";

const DiodeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 30px 0;
  
  .diode-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #edf2f7;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    
    h4 { margin-top: 0; color: #2d3748; font-size: 1rem; margin-bottom: 10px; }
    p { margin-bottom: 0; font-size: 0.9rem; color: #718096; }
    .val { font-family: monospace; font-weight: 700; color: #3182ce; font-size: 1.1rem; margin-top: 8px; display: block; }
  }
`;

export const HDMITroubleshootingGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-section">
      <h1>Universal HDMI Troubleshooting: Fixed "No Signal" &amp; Flickering Issues</h1>
      <p className="meta">BY UNEEB KATIB | HARDWARE DIAGNOSTIC SPECIALIST | APRIL 11, 2026</p>
    </div>

    <p>
      An HDMI failure is often the most frustrating hardware issue a gamer can face. Whether it's a completely black screen, flickering "sparkles" in the image, or a console that works on one TV but not another, the cause ranges from a simple cable mismatch to a catastrophic HDMI Encoder IC failure on the motherboard.
    </p>

    <p>
      This guide provides a professional diagnostic path for identifying the root cause of HDMI signal loss across PS5, Xbox Series X, and Nintendo Switch using both software-based logic and hardware-level diode testing.
    </p>

    <h2>The "3-Step" Signal Chain Audit</h2>
    <ol>
      <li><strong>The Link:</strong> Test with a certified HDMI 2.1 cable. 80% of "flickering" at 4K/120Hz is caused by using an older HDMI 2.0 cable that cannot handle the 48Gbps bandwidth.</li>
      <li><strong>The Display:</strong> Disable "HDMI-CEC" and "HDCP" in your console settings (if you can reach them via remote play or a lower resolution). Often, a handshake mismatch causes a permanent "No Signal" loop.</li>
      <li><strong>The Port:</strong> Use a flashlight to inspect the physical pins inside the console's HDMI port. If any pin is pushed back or touching the metal shroud, DO NOT plug it in, as you risk shorting the 5V rail to a data line.</li>
    </ol>

    <h2>Professional Diagnostic: The Diode Test</h2>
    <p>
      If the physical port looks fine but you still have no signal, you likely have a failed ESD protection diode or a blown HDMI Encoder IC (like the Panasonic MN864739 on PS5). Advanced technicians use a Multimeter in <strong>Diode Mode</strong> to check the integrity of the 19 pins.
    </p>

    <DiodeGrid>
      <div className="diode-card">
        <h4>Data Lanes (Pins 1-9)</h4>
        <p>Expect consistent readings across all TMDS differential pairs.</p>
        <span className="val">0.400V - 0.600V</span>
      </div>
      <div className="diode-card">
        <h4>5V Supply (Pin 18)</h4>
        <p>The handshake voltage that tells the TV a device is connected.</p>
        <span className="val">0.150V - 0.250V</span>
      </div>
      <div className="diode-card">
        <h4>HPD (Pin 19)</h4>
        <p>Hot Plug Detect signal. If "OL" (Open Loop), the TV won't wake up.</p>
        <span className="val">0.500V - 0.700V</span>
      </div>
    </DiodeGrid>

    <p>
      If you find a pin reading <strong>0.000V (Short)</strong> or <strong>OL (Open)</strong>, the corresponding filter or the encoder chip itself is dead. For a detailed breakdown of these readings on specific consoles, refer to our <Link href="/guides/hdmi/all-consoles/all-consoles-hdmi-diode-test">Master Diode Map Guide</Link>.
    </p>

    <h2>Safe-Mode Resolution Reset</h2>
    <p>
      Sometimes the console is outputting a resolution your TV doesn't support (e.g., trying to push 4K to a 1080p monitor). 
    </p>
    <ul>
      <li><strong>PS5:</strong> Hold power for 7 seconds until the second beep, select "Change Video Output."</li>
      <li><strong>Xbox:</strong> Hold Power and Eject for 10 seconds until you hear a second beep to boot in 640x480.</li>
      <li><strong>Switch:</strong> Ensure the dock is receiving 15V from the original AC adapter; third-party chargers often fail to trigger the HDMI out.</li>
    </ul>

    <h2>Frequently Asked Questions</h2>
    <span className="q">What are the "glitches" or "white dots" on my screen?</span>
    <span className="a">This is known as "interference noise" or "digital snow." It usually indicates a failing HDMI cable or a damaged trace on the motherboard near the HDMI filter.</span>

    <span className="q">Can a software update fix HDMI issues?</span>
    <span className="a">Rarely. Handshake issues can sometimes be improved via firmware, but a "No Signal" after a power surge or a physical drop is almost certainly a hardware failure.</span>

    <div style={{ marginTop: '50px' }}>
      <Link href="/guides/hdmi/all-consoles/hdmi-port-replacement-guide" className="related-link">
        Next: Professional HDMI Port Replacement Tutorial →
      </Link>
    </div>
  </StyledArticleWrapper>
);
