import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../../GuideFaqAccordion";
import GuideTableOfContents from "../../../GuideTableOfContents";
import { StyledArticleWrapper } from "../../ArticleStyles";

export const XboxOneSFanCleaningGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-container">
      <img src="/images/guides/microsoft/xbox-one-s/fan-hero.png" alt="Xbox One S rear vent showing dust accumulation causing overheating" />
    </div>

    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#e53e3e', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>THERMAL REPAIR</span>
      <span style={{ padding: '6px 12px', background: '#fff5f5', color: '#c53030', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>PUBLISHED APRIL 2026</span>
      <span style={{ padding: '6px 12px', background: '#e2e8f0', color: '#4a5568', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>35 MIN READ</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Xbox One S Fan Cleaning and Replacement: Stop Overheating and Reduce Fan Noise</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
      <p style={{ marginBottom: '15px' }}>
        A loud Xbox One S fan is the console telling you something specific: either the thermal system is working harder than it should because dust is restricting airflow, or the fan itself has developed a bearing or blade issue that cleaning cannot fix. Getting the diagnosis right before opening the console saves time and money — a thorough internal cleaning resolves the majority of Xbox One S fan and overheating complaints.
      </p>
      <p style={{ marginBottom: '15px' }}>
        The Xbox One S uses a centrifugal blower fan rather than the axial (propeller-style) fan found in most PC towers. This design is efficient but blade geometry accumulates dust in a way that external compressed air alone cannot fully clear. This guide covers the full disassembly for model 1681.
      </p>
    </div>

    <GuideTableOfContents items={[
      { text: "How Xbox One S Cooling Works", href: "#how-it-works" },
      { text: "Confirming the Thermal Problem", href: "#confirm" },
      { text: "Tools and Parts You Will Need", href: "#tools" },
      { text: "Safety and Common Mistakes", href: "#safety" },
      { text: "Step-by-Step Cleaning and Replacement", href: "#step-by-step" },
      { text: "How to Test If the Repair Worked", href: "#test" },
      { text: "Preventive Maintenance", href: "#longevity" },
      { text: "Frequently Asked Questions", href: "#faq" }
    ]} />

    <section id="how-it-works" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>How Xbox One S Cooling Works and Why It Fails</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        The Xbox One S is built around an AMD custom APU that combines the CPU and GPU on a single die. A copper heat pipe draws heat to an aluminum fin stack (heatsink). The centrifugal blower fan draws air through the chassis, across the heatsink, and exhausts it through the rear vent.
      </p>
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3>Three common failure categories:</h3>
        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
          <li><strong>Dust accumulation:</strong> Fan runs loud, console may shut down under load. Solution: cleaning.</li>
          <li><strong>Fan bearing failure:</strong> Persistent rattling or grinding noise regardless of load. Solution: fan replacement.</li>
          <li><strong>Fan blade damage:</strong> Rhythmic vibration due to physical impact or debris. Solution: fan replacement.</li>
        </ul>
      </div>
    </section>

    <section id="confirm" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>How to Confirm the Fan or Thermal System Is the Problem</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>Before opening the console, perform these checks:</p>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Noise Type</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Loud &quot;rushing air&quot; (High RPM)</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Dust restriction causing thermal stress</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Grinding/Rattling at idle</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Fan bearing failure</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Hot exhaust (&gt;110°F)</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Inefficient heat dissipation</td>
          </tr>
        </tbody>
      </table>
      <p style={{ lineHeight: '1.8' }}>
        If your console isn&apos;t just hot but also isn&apos;t reading discs, check the <Link href="/guides/microsoft/xbox-one-s/optical-drive-replacement" style={{ color: '#3182ce' }}>optical drive replacement guide</Link>.
      </p>
    </section>

    <section id="tools" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Tools and Parts You Will Need</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4>Required Tools</h4>
          <ul style={{ paddingLeft: '20px' }}>
            <li>T8 Torx security screwdriver</li>
            <li>T9 Torx screwdriver</li>
            <li>Compressed air canister</li>
            <li>99% Isopropyl Alcohol</li>
            <li>Thermal compound (e.g. MX-4)</li>
          </ul>
        </div>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4>Parts</h4>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Xbox One S 1681 Blower Fan</li>
            <li>Cotton swabs</li>
            <li>Anti-static wrist strap</li>
          </ul>
        </div>
      </div>
      <img src="/images/guides/microsoft/xbox-one-s/fan-tools.png" alt="Tools needed for Xbox One S fan service" style={{ width: '100%', borderRadius: '12px', marginBottom: '30px' }} />
    </section>

    <section id="safety" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Before You Start: Safety and Common Mistakes</h2>
      <div style={{ borderLeft: '4px solid #e53e3e', padding: '15px', background: '#fff5f5', marginBottom: '20px' }}>
        <p><strong>Warning:</strong> Disconnect power completely. Do not let the fan spin freely with compressed air—this can damage the bearings. Hold the blades stationary while cleaning.</p>
      </div>
      <p style={{ lineHeight: '1.8' }}>
        All Xbox One S units are out of warranty. Opening does not affect any active warranty. Ensure you work on a non-conductive surface.
      </p>
    </section>

    <section id="step-by-step" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Step-by-Step Fan Cleaning and Replacement</h2>
      
      <div style={{ marginBottom: '40px' }}>
        <h3>Step 1 — Disassembly</h3>
        <p style={{ lineHeight: '1.8' }}>
          Remove the side vents to expose T8 screws. Remove the top cover by sliding it toward the rear. Remove the internal metal RF shield using a T9 screwdriver to reach the fan and heatsink assembly.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Step 2 — Cleaning the Heatsink</h3>
        <p style={{ lineHeight: '1.8' }}>
          The heatsink fins often accumulate a &quot;mat&quot; of dust. Use compressed air and cotton swabs with IPA to clear every channel.
        </p>
        <img src="/images/guides/microsoft/xbox-one-s/heatsink-dust.png" alt="Xbox One S heatsink with dust accumulation" style={{ width: '100%', borderRadius: '12px', margin: '20px 0' }} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Step 3 — Fan Replacement and Connection</h3>
        <p style={{ lineHeight: '1.8' }}>
          Unplug the fan power connector. Remove the mounting screws and swap the fan. Ensure the 3-pin/4-pin connector is fully seated—a loose connector is a common failure point.
        </p>
        <img src="/images/guides/microsoft/xbox-one-s/fan-connector.png" alt="Connecting the replacement fan to the motherboard" style={{ width: '100%', borderRadius: '12px', margin: '20px 0' }} />
      </div>
    </section>

    <section id="test" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>How to Test If the Repair Worked</h2>
      <p style={{ lineHeight: '1.8' }}>
        Power on and listen. The fan should be near-silent at the dashboard. Play a demanding game for 30-45 minutes. The fan will spin up, but it should return to idle speed quickly once you exit the game. If it stays high, the <strong>thermal compound</strong> may need replacement. After testing, <Link href="/button-test" style={{ color: '#3182ce' }}>verify your controller inputs</Link> are still working correctly.
      </p>
    </section>

    <section id="faq" style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '30px' }}>Frequently Asked Questions</h2>
      <GuideFaqAccordion faqs={[
        { q: "Will external compressed air fix my loud fan?", a: "Only partially. External air doesn't reach the dust packed deep inside the blower blade cage or the heatsink fins. Internal cleaning is required for a lasting fix." },
        { q: "How do I know if the bearing is failed?", a: "If you hear grinding, rattling, or clicking even when the console is cool and the fan is slow, the bearing is mechanically failing." },
        { q: "Is overheating dangerous for my console?", a: "The Xbox One S has thermal shutdown protection, but repeated overheating cycles stress the solder joints and can lead to premature MB failure." },
        { q: "How often should I clean the fan?", a: "In average environments, every 2-3 years. In dusty/pet-filled homes, annual cleaning is recommended." },
        { q: "Should I replace the thermal paste while I am in there?", a: "Yes, especially on consoles over 4 years old. High-quality paste like MX-4 significantly improves thermals." }
      ]} />
    </section>
  </StyledArticleWrapper>
);
