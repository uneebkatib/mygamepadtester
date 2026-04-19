import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../../GuideFaqAccordion";
import GuideTableOfContents from "../../../GuideTableOfContents";
import { StyledArticleWrapper } from "../../ArticleStyles";

export const XboxOneXThermalPasteReplacementGuide = () => (
  <StyledArticleWrapper>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#e53e3e', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>THERMAL SERVICE</span>
      <span style={{ padding: '6px 12px', background: '#fff5f5', color: '#e53e3e', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>UPDATED APRIL 2026</span>
      <span style={{ padding: '6px 12px', background: '#e2e8f0', color: '#4a5568', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>120 MIN READ</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Xbox One X Thermal Paste Replacement: Vapor Chamber Service Guide</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
      <p style={{ marginBottom: '15px' }}>
        The Xbox One X is the high-performance powerhouse of its generation, generating massive heat that puts it at high risk for thermal shutdown. If your fan sounds like a jet engine or your console cuts power mid-game, it’s time for a full thermal overhaul.
      </p>
      <p style={{ marginBottom: '15px' }}>
        This isn&apos;t a standard paste job. The Xbox One X uses a vapor chamber heatsink and critical GDDR5 memory pads that most guides overlook. To ensure your system is fully stable after reassembly, <Link href="/" style={{ color: '#3182ce' }}>check your controller inputs</Link> for any heat-related drift or latency issues.
      </p>
    </div>

    <GuideTableOfContents items={[
      { text: "Vapor Chamber vs Standard Cooling", href: "#vapor" },
      { text: "Identifying Thermal Degradation", href: "#diagnose" },
      { text: "Best Thermal Compounds &amp; Pads", href: "#supplies" },
      { text: "Disassembly &amp; Application", href: "#steps" },
      { text: "Before/After Benchmarks", href: "#benchmarks" },
      { text: "Frequently Asked Questions", href: "#faq" }
    ]} />

    <section id="vapor" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Understanding Vapor Chamber Cooling</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        Unlike the Xbox One S, which uses copper heat pipes, the One X uses a flat, sealed <strong>Vapor Chamber</strong>. This spreads heat across a larger surface area but requires a specific &quot;Spread Method&quot; for paste application, as the rigid base doesn&apos;t compress a center dot evenly.
      </p>
      <p style={{ lineHeight: '1.8' }}>
        Explore the <Link href="/guides/microsoft/xbox-one-x" style={{ color: '#3182ce' }}>Xbox One X hub</Link> for full platform diagnostics.
      </p>
    </section>

    <section id="diagnose" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Is Thermal Paste the Culprit?</h2>
      <ul style={{ lineHeight: '1.8' }}>
        <li><strong>Shutdowns:</strong> Console cuts power after 20-30 minutes of high-end titles.</li>
        <li><strong>Jet Engine Fan:</strong> Fan ramps to max speed immediately on game launch.</li>
        <li><strong>Thermal Stress:</strong> Heat can also destabilize your HDD; check our <Link href="/guides/microsoft/xbox-one-x/hard-drive-upgrade" style={{ color: '#3182ce' }}>Hard Drive Upgrade guide</Link> if you see load errors.</li>
      </ul>
    </section>

    <section id="supplies" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Supplies for a Pro Service</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <h4 style={{ color: '#c53030' }}>Thermal Compound</h4>
          <p>Recommended: <strong>Thermal Grizzly Kryonaut</strong> (12.5 W/m·K). High conductivity is essential for the One X&apos;s 112W output.</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <h4 style={{ color: '#c53030' }}>Memory Pads</h4>
          <p>Don&apos;t forget the GDDR5 chips. Use <strong>1.0mm</strong> high-performance thermal pads to ensure contact with the secondary spreader.</p>
        </div>
      </div>
    </section>

    <section id="steps" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Vapor Chamber Service Protocol</h2>
      <ol style={{ lineHeight: '1.8', marginLeft: '20px' }}>
        <li style={{ marginBottom: '10px' }}><strong>Clean:</strong> Use 99% IPA and a lint-free coffee filter to strip the old, grayed paste until the APU die is mirror-reflective.</li>
        <li style={{ marginBottom: '10px' }}><strong>Spread Method:</strong> Apply two grains of rice worth of paste and spread it into a thin, uniform sheet covering the *entire* die surface.</li>
        <li style={{ marginBottom: '10px' }}><strong>Tension:</strong> Reinstall the X-bracket screws in a cross pattern (1-3, 2-4) to prevent tilting the heatsink and cracking the die.</li>
      </ol>
      <p style={{ marginTop: '15px' }}>
        Post-service, <Link href="/button-test" style={{ color: '#3182ce' }}>run a controller test</Link> to ensure no cables were pinched during reassembly.
      </p>
    </section>

    <section id="benchmarks" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Before vs After Expectations</h2>
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
        <p><strong>Idle Temp:</strong> ~40°C (Down from 60°C+)</p>
        <p><strong>Load Temp (4K Gaming):</strong> ~75°C (Down from 100°C+)</p>
        <p><strong>Fan Noise:</strong> Smooth automatic modulation vs constant high-speed whirl.</p>
      </div>
    </section>

    <section id="faq" style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '30px' }}>Frequently Asked Questions</h2>
      <GuideFaqAccordion faqs={[
        { q: "Is factory paste really that bad?", a: "Yes. Microsoft uses a bulk industrial compound that dries out significantly within 3-4 years, especially under the One X's heat load." },
        { q: "What happens if I skip the memory pads?", a: "The GDDR5 video memory will overheat independently, causing graphical artifacts or crashes even if the APU is cool." },
        { q: "Can I use conductive liquid metal?", a: "NEVER. Liquid metal can spill onto the surrounding memory chips and short-circuit the entire board. Stick to non-conductive pastes." },
        { q: "How tight should the heatsink screws be?", a: "Finger-tight plus a quarter turn. The spring washers provide the necessary pressure; don't overtorque." }
      ]} />
    </section>
  </StyledArticleWrapper>
);
