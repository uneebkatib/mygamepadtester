import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../../GuideFaqAccordion";
import GuideTableOfContents from "../../../GuideTableOfContents";
import { StyledArticleWrapper } from "../../ArticleStyles";

export const XboxOneSOpticalDriveReplacementGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-container">
      <img src="/images/guides/microsoft/xbox-one-s/optical-hero.png" alt="Xbox One S optical drive disc slot showing hardware failure" />
    </div>

    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#3182ce', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>DRIVE REPLACEMENT</span>
      <span style={{ padding: '6px 12px', background: '#ebf8ff', color: '#3182ce', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>UPDATED APRIL 2026</span>
      <span style={{ padding: '6px 12px', background: '#e2e8f0', color: '#4a5568', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>75 MIN READ</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Xbox One S Optical Drive Replacement: Complete Repair Guide with PCB Key Transfer</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
      <p style={{ marginBottom: '15px' }}>
        Replacing the optical drive on an Xbox One S looks straightforward until the repair is done and the disc still will not read. That outcome happens regularly because most guides omit the most important step: the replacement drive must use the original drive&apos;s PCB (logic board).
      </p>
      <p style={{ marginBottom: '15px' }}>
        Every Xbox One S optical drive ships with a PCB that contains a cryptographic security key matched to a specific console&apos;s NAND chip. A mismatched key produces a &quot;disc unrecognized&quot; error regardless of how perfect the new drive is.
      </p>
    </div>

    <GuideTableOfContents items={[
      { text: "Why Replacement Is Complex", href: "#why-complex" },
      { text: "Confirming Drive Failure", href: "#confirm" },
      { text: "Tools and Parts Needed", href: "#tools" },
      { text: "Safety and the PCB Key Rule", href: "#before-start" },
      { text: "Step-by-Step Replacement", href: "#step-by-step" },
      { text: "How to Test If Fixed", href: "#test" },
      { text: "Frequently Asked Questions", href: "#faq" }
    ]} />

    <section id="why-complex" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Why Xbox One S Optical Drive Replacement Is Complex</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        The Xbox One S uses a Liteon Blu-ray drive (DG-6M5S or DG-6M2S). The primary complexity isn&apos;t the mechanical swap, but the <strong>Security Key Pairing</strong>.
      </p>
      <div style={{ background: '#fffaf0', borderLeft: '4px solid #ed8936', padding: '15px', marginBottom: '20px' }}>
        <p><strong>Crucial Rule:</strong> YOU MUST TRANSFER THE PCB. The console validates a unique encrypted key at startup. If you use the PCB that comes with your replacement drive, it will fail to authenticate.</p>
      </div>
      <p style={{ lineHeight: '1.8' }}>
        The [Xbox One S repair hub](/guides/microsoft/xbox-one-s) contains this guide and others for console maintenance.
      </p>
    </section>

    <section id="confirm" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>How to Confirm the Drive Is the Actual Problem</h2>
      <ul style={{ lineHeight: '1.8', marginBottom: '20px' }}>
        <li><strong>Mechanical Noise:</strong> Grinding or clicking during disc insertion indicates a failed motor or gears.</li>
        <li><strong>Software Errors:</strong> Error 0x91d700a specifically indicates a disc authentication failure (often a key mismatch).</li>
        <li><strong>Laser Failure:</strong> If the drive accepts the disc quietly but fails to read after 5-10 seconds, the laser lens is likely degraded.</li>
      </ul>
      <p style={{ lineHeight: '1.8' }}>
        Before replacing, try a lens cleaning disc and ensure your console isn&apos;t overheating by checking the <Link href="/guides/microsoft/xbox-one-s/fan-cleaning-and-replacement" style={{ color: '#3182ce' }}>fan cleaning guide</Link>.
      </p>
    </section>

    <section id="tools" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Tools and Parts You Will Need</h2>
      <img src="/images/guides/microsoft/xbox-one-s/optical-tools.png" alt="Tools needed for Xbox One S drive replacement" style={{ width: '100%', borderRadius: '12px', marginBottom: '30px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
          <h4>Screwdrivers</h4>
          <ul style={{ paddingLeft: '20px' }}>
            <li>T8 Torx Security</li>
            <li>T9 Torx</li>
            <li>T10 Torx (for PCB)</li>
          </ul>
        </div>
        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
          <h4>Handling</h4>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Plastic Spudger</li>
            <li>Tweezers</li>
            <li>Anti-static strap</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="step-by-step" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Step-by-Step Optical Drive Replacement</h2>
      
      <h3>Step 1 — Disassembly</h3>
      <p style={{ lineHeight: '1.8' }}>
        Remove side vents and T8 security screws. Slide off the top cover. Remove the internal metal RF shield (8-10 T9 screws). Disconnect the SATA data and power cables from the drive.
      </p>

      <h3>Step 2 — The PCB Transfer (Essential)</h3>
      <p style={{ lineHeight: '1.8' }}>
        Flip the drive. Remove the T10 screws holding the green PCB. <strong>Wait:</strong> Disconnect the small flex ribbon cable from the ZIF connector first. Move this PCB to your new drive and reconnect the cables.
      </p>
      <img src="/images/guides/microsoft/xbox-one-s/optical-pcb.png" alt="Transferring the optical drive PCB" style={{ width: '100%', borderRadius: '12px', margin: '20px 0' }} />

      <h3>Step 3 — Installation</h3>
      <p style={{ lineHeight: '1.8' }}>
        Seat the new drive in the chassis. Connect the SATA and power cables. Reassemble the RF shield and outer shell.
      </p>
      <img src="/images/guides/microsoft/xbox-one-s/optical-install.png" alt="Installing the replacement drive in the console" style={{ width: '100%', borderRadius: '12px', margin: '20px 0' }} />
    </section>

    <section id="test" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>How to Test If the Repair Worked</h2>
      <p style={{ lineHeight: '1.8' }}>
        Test with 3 different discs: a game disc, a Blu-ray movie, and a DVD. Success is indicated when the console recognizes all three within 10 seconds. After reassembly, <Link href="/button-test" style={{ color: '#3182ce' }}>run a controller button test</Link> to ensure no other hardware issues exist.
      </p>
    </section>

    <section id="faq" style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '30px' }}>Frequently Asked Questions</h2>
      <GuideFaqAccordion faqs={[
        { q: "Why did my replacement drive fail to read discs?", a: "Unless you transferred the original PCB, the console's security system will reject the new drive. The security key must match your motherboard." },
        { q: "Can I buy a 'plug-and-play' drive?", a: "No. All off-the-shelf drives require PCB transfer unless they include a specialized key extraction service." },
        { q: "What if my original PCB is burnt?", a: "If the PCB is physically damaged, you need advanced firmware tools to extract the key from the console itself. This is not a standard DIY repair." },
        { q: "Does this repair work for the Xbox One X?", a: "The process is similar, but the drive model and disassembly steps are different. This guide is for the 1681 model." }
      ]} />
    </section>
  </StyledArticleWrapper>
);
