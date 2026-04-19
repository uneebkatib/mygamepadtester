import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../GuideFaqAccordion";
import GuideTableOfContents from "../../GuideTableOfContents";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";

export const StickDriftDiagnostics = () => (
  <StyledArticleWrapper>
    <div className="hero-container">
      <img src="/images/guides/drift/diagnostic-hero.png" alt="Stick drift diagnostic telemetry showing jitter and axis bias" />
    </div>

    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#3182ce', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>HARDWARE DIAGNOSTIC</span>
      <span style={{ padding: '6px 12px', background: '#ebf8ff', color: '#3182ce', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>UPDATED APRIL 2026</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Stick Drift Diagnostics: Reading the Raw Data</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <p style={{ lineHeight: '1.8' }}>This guide explains how to use the raw coordinate telemetry from our tools to diagnose specific hardware failures in your analog sticks.</p>
  </StyledArticleWrapper>
);
