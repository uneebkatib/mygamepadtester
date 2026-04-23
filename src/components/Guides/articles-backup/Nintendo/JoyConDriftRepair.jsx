import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../GuideFaqAccordion";
import GuideTableOfContents from "../../GuideTableOfContents";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";

export const JoyConDriftRepair = () => (
  <StyledArticleWrapper>
    <div className="hero-container">
      <img loading="lazy" decoding="async" src="/images/guides/nintendo/switch/hero.webp" alt="Nintendo Switch Joycon drift repair showing internal stick module" />
    </div>

    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#3182ce', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>HARDWARE REPAIR</span>
      <span style={{ padding: '6px 12px', background: '#ebf8ff', color: '#3182ce', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>UPDATED APRIL 2026</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Nintendo Switch Joycon Drift Repair Guide</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <p style={{ fontSize: '1.2rem', color: '#4a5568', marginBottom: '40px', fontStyle: 'italic', borderLeft: '4px solid #e53e3e', paddingLeft: '20px' }}>
      &quot;Nintendo Switch Joy-Cons are unique because they develop drift at much lower thresholds (0.05) than PS5 or Xbox controllers. Whether you choose the non-destructive cardboard fix or a full hardware swap, this guide will walk you through the physics of the fix.&quot;
    </p>

    <GuideTableOfContents items={[
      { text: "Method 1: The 'Pressure Fix' (Non-Soldering)", href: "#pressure-fix" },
      { text: "Method 2: Full Stick Module Replacement", href: "#module-swap" },
      { text: "Tools Required for Joy-Con Repair", href: "#tools" },
      { text: "Nintendo Official Repair Program", href: "#official" }
    ]} />

    <section id="tools" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Tools Required</h2>
      <ul style={{ lineHeight: '1.8', marginBottom: '20px' }}>
        <li><strong>Y00 Tri-wing Screwdriver:</strong> Essential for the outer shell.</li>
        <li><strong>PH00 Phillips Screwdriver:</strong> For internal components.</li>
        <li><strong>Plastic Spudger:</strong> To disconnect the delicate battery and ribbon cables.</li>
        <li><strong>Precision Tweezers:</strong> For handling the ZIF connectors.</li>
      </ul>
    </section>

    <section id="pressure-fix" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Method 1: The &apos;Cardboard&apos; Pressure Fix</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        Research has shown that Joy-Con drift is often caused by the metal housing of the stick module loosening over time. Adding pressure can re-seat the sensors.
      </p>
      <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '16px', margin: '20px 0' }}>
        <ol style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Open the Joy-Con and remove the battery.</li>
          <li>Cut a small piece of cardstock (approx. 1mm thick) to the size of the stick module&apos;s metal backplate.</li>
          <li>Place the cardstock directly on top of the stick module.</li>
          <li>Reassemble. The back case will now apply downward pressure on the module, eliminating drift in roughly 70% of cases.</li>
        </ol>
      </div>
    </section>

    <section id="module-swap" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Method 2: Full Stick Module Replacement</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        If the carbon tracks are physically worn through, pressure won&apos;t help. You must swap the module.
      </p>
      <ol style={{ lineHeight: '1.8', marginBottom: '20px', paddingLeft: '20px' }}>
        <li>Disconnect the battery and the midframe (L/R button assembly).</li>
        <li>Release the two ribbon cables connected to the stick module using tweezers.</li>
        <li>Unscrew the two Phillips screws holding the stick in place.</li>
        <li>Drop in the new module (preferably a <strong>Hall Effect</strong> module to prevent future drift).</li>
        <li>Reconnect cables and calibrate in the Switch System Settings.</li>
      </ol>
    </section>

    <section id="official" style={{ marginTop: '40px', background: '#fff5f5', padding: '25px', borderRadius: '12px', border: '1px solid #feb2b2' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#c53030', marginBottom: '10px', marginTop: '0' }}>Don&apos;t Forget: Free Official Repairs</h2>
      <p style={{ lineHeight: '1.8', color: '#742a2a' }}>
        In many regions (including North America, Europe, and Latin America), Nintendo offers <strong>free Joy-Con drift repairs</strong> even if your console is out of warranty. Check the official Nintendo Support site before attempting a DIY repair that could damage the delicate internal ribbon cables.
      </p>
    </section>
  </StyledArticleWrapper>
);
