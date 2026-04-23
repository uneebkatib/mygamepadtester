import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../GuideFaqAccordion";
import GuideTableOfContents from "../../GuideTableOfContents";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";

export const ControllerCalibrationGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-container">
      <img loading="lazy" decoding="async" src="/images/guides/calibration/calibration-hero.webp" alt="controller calibration interface showing axis centering and range adjustment" />
    </div>

    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#3182ce', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>GAMEPAD CALIBRATION</span>
      <span style={{ padding: '6px 12px', background: '#ebf8ff', color: '#3182ce', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>UPDATED APRIL 2026</span>
      <span style={{ padding: '6px 12px', background: '#e2e8f0', color: '#4a5568', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>20-30 MIN READ</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Professional Calibration Methods: How to Fix Stick Drift and Accuracy Issues</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
      Calibration is the software-level process of re-establishing the relationship between a controller&apos;s physical input and its digital signal. This guide covers professional methods for Windows, Steam, and console-specific calibration.
    </p>

    <GuideTableOfContents items={[
      { text: "When to Calibrate vs. Repair", href: "#when" },
      { text: "Windows HID Calibration", href: "#windows" },
      { text: "Steam Input Calibration", href: "#steam" },
      { text: "Console-Specific Calibration", href: "#console" },
      { text: "Frequently Asked Questions", href: "#faq" }
    ]} />

    <section id="windows" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Windows HID Calibration</h2>
      <p style={{ lineHeight: '1.8' }}>Use the &quot;Set up USB game controllers&quot; tool. Follow the wizard to calibrate the axes and buttons for standard XInput devices.</p>
    </section>

    <section id="faq" style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '30px' }}>Frequently Asked Questions</h2>
      <GuideFaqAccordion faqs={[
        { q: "Does calibration fix physical wear?", a: "No, it masks it. Significant wear requires hardware replacement." },
        { q: "How often should I calibrate?", a: "Every 6 months or whenever you notice slight camera creep." }
      ]} />
    </section>
  </StyledArticleWrapper>
);
