import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../GuideFaqAccordion";
import GuideTableOfContents from "../../GuideTableOfContents";
import { StyledArticleWrapper } from "@/components/Guides/articles/ArticleStyles";

export const XboxControllerRepair = () => (
  <StyledArticleWrapper>
    <div className="hero-container">
      <img src="/images/guides/microsoft/xbox-controller-repair.png" alt="Xbox controller repair disassembly" />
    </div>

    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#3182ce', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>HARDWARE REPAIR</span>
      <span style={{ padding: '6px 12px', background: '#ebf8ff', color: '#3182ce', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>UPDATED APRIL 2026</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Xbox Controller Repair: Hub for All Xbox Models</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <p style={{ lineHeight: '1.8' }}>This hub contains specific guides for repairing Xbox One, Xbox Series, and Xbox Elite controllers. Select your model to continue.</p>

    <ul style={{ lineHeight: '2.5' }}>
      <li><Link href="/guides/microsoft/xbox-one-gamepad/stick-drift-repair" style={{ color: '#3182ce' }}>Xbox One Stick Drift Repair</Link></li>
      <li><Link href="/guides/microsoft/xbox-one-gamepad/button-repair-guide" style={{ color: '#3182ce' }}>Xbox One Button &amp; Bumper Repair Guide</Link></li>
    </ul>
  </StyledArticleWrapper>
);
