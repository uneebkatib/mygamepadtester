import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../../GuideFaqAccordion";
import GuideTableOfContents from "../../../GuideTableOfContents";
import { StyledArticleWrapper } from "../../ArticleStyles";

export const XboxOneFatHdmiReplacementGuide = () => (
  <StyledArticleWrapper>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#3182ce', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>HARDWARE REPAIR</span>
      <span style={{ padding: '6px 12px', background: '#ebf8ff', color: '#3182ce', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>UPDATED APRIL 2026</span>
      <span style={{ padding: '6px 12px', background: '#e2e8f0', color: '#4a5568', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>120 MIN READ</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Xbox One HDMI Port Replacement: Original Model 1540 Guide</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
      <p style={{ marginBottom: '15px' }}>
        A broken HDMI port is the most common hardware failure on the original &quot;fat&quot; Xbox One. Mechanical stress from cable movement fractures the through-hole mounting joints, leading to no video or intermittent signal.
      </p>
      <p style={{ marginBottom: '15px' }}>
        Before you start, ensure your tools are ready. While your console is out for service, it&apos;s a perfect time to <Link href="/" style={{ color: '#3182ce' }}>run a full controller diagnostic</Link> to ensure your peripherals are as healthy as your output.
      </p>
    </div>

    <GuideTableOfContents items={[
      { text: "Diagnosing Port vs IC Failure", href: "#diagnose" },
      { text: "Confirming via Diode Test", href: "#diode" },
      { text: "Required Tools &amp; Parts", href: "#tools" },
      { text: "Replacement Procedure", href: "#procedure" },
      { text: "Testing Post-Repair", href: "#testing" },
      { text: "Frequently Asked Questions", href: "#faq" }
    ]} />

    <section id="diagnose" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>What Else Can Look Identical?</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        Replacing the port won&apos;t help if the <strong>T9500CG HDMI Retimer IC</strong> has failed. If you have audio but no video, the IC is the likely culprit. For a full technical tree, see our <Link href="/guides/hdmi/all-consoles/hdmi-troubleshooting-guide" style={{ color: '#3182ce' }}>HDMI troubleshooting guide</Link>.
      </p>
    </section>

    <section id="diode" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>The HDMI Diode Test</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        Using a multimeter in diode mode is the gold standard. Check the impedance of signal pins against ground. <Link href="/guides/hdmi/all-consoles/all-consoles-hdmi-diode-test" style={{ color: '#3182ce' }}>Learn how to run an HDMI diode test</Link> before you heat up your soldering iron.
      </p>
    </section>

    <section id="tools" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Required Tools &amp; Parts</h2>
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <ul style={{ lineHeight: '2' }}>
          <li><strong>Replacement Port:</strong> 19-pin Type A, through-hole mount model 1540.</li>
          <li><strong>Stationary:</strong> Soldering Iron (350-380°C) + Hot Air Station.</li>
          <li><strong>Consumables:</strong> Solder Wick, Flux, Kapton Tape (Heat shielding).</li>
          <li><strong>Diagnostic:</strong> Multimeter with Diode Mode.</li>
        </ul>
      </div>
    </section>

    <section id="procedure" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Removal &amp; Installation Steps</h2>
      <ol style={{ lineHeight: '1.8', marginLeft: '20px' }}>
        <li style={{ marginBottom: '10px' }}><strong>Shielding:</strong> Apply Kapton tape to adjacent components to prevent heat damage to the retimer IC.</li>
        <li style={{ marginBottom: '10px' }}><strong>Hot Air Removal:</strong> Use hot air (350°C) to liquefy the SMD shield tabs while gently wicking the through-hole legs from the underside.</li>
        <li style={{ marginBottom: '10px' }}><strong>Pin Prep:</strong> Clean pads with IPA 99% and confirm through-holes are clear of old solder.</li>
        <li style={{ marginBottom: '10px' }}><strong>Soldering:</strong> Tack shield tabs for alignment, then solder through-hole legs using leaded solder (Sn63Pb37) for cleaner fillets.</li>
      </ol>
    </section>

    <section id="testing" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Testing Post-Repair</h2>
      <p style={{ lineHeight: '1.8' }}>
        Reassemble and boot the console. If you still see a black screen, rerun the diode test. To <Link href="/button-test" style={{ color: '#3182ce' }}>verify your controller inputs</Link>, use our button tester to ensure the system is reading all peripherals correctly.
      </p>
    </section>

    <section id="faq" style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '30px' }}>Frequently Asked Questions</h2>
      <GuideFaqAccordion faqs={[
        { q: "Can I do this without hot air?", a: "It is possible but extremely difficult and risks lifting pads. Hot air is essential for the shield tabs on the top side." },
        { q: "What should I do if I lift a pad?", a: "Stop immediately. Trace repair requires micro-soldering. If you aren't experienced, take it to a professional." },
        { q: "Does the Xbox One S use the same port?", a: "No. The One S and One X use different mount architectures. This guide is for the 1540 'Fat' model only." },
        { q: "Will this fix 'Black Screen with Audio'?", a: "If the diode test shows the port is fine but video is missing, you likely need a retimer IC replacement, not a port." }
      ]} />
    </section>
  </StyledArticleWrapper>
);
