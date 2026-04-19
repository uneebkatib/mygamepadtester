import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../../GuideFaqAccordion";
import GuideTableOfContents from "../../../GuideTableOfContents";
import { StyledArticleWrapper } from "../../ArticleStyles";

export const XboxOneButtonRepairGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-container">
      <img src="/images/guides/microsoft/xbox-one-gamepad/button-repair-hero.png" alt="Xbox One controller button repair showing stuck ABXY face button requiring cleaning or membrane replacement" />
    </div>

    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#38a169', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>GAMEPAD REPAIR</span>
      <span style={{ padding: '6px 12px', background: '#f0fff4', color: '#38a169', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>UPDATED APRIL 2026</span>
      <span style={{ padding: '6px 12px', background: '#e2e8f0', color: '#4a5568', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>30-45 MIN READ</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Xbox One Controller Button Repair Guide: Fix Unresponsive, Sticky, and Broken Buttons</h1>
    
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <p style={{ fontSize: '1.2rem', color: '#4a5568', marginBottom: '40px', fontStyle: 'italic', borderLeft: '4px solid #38a169', paddingLeft: '20px' }}>
      "A button that doesn't register, registers only when pressed hard, or feels sticky under the cap has a fixable cause in most cases. The key is knowing which failure type you are dealing with before opening the controller."
    </p>

    <div style={{ background: '#fff5f5', padding: '20px', borderRadius: '12px', border: '1px solid #feb2b2', marginBottom: '30px' }}>
      <p style={{ margin: 0, color: '#c53030', fontWeight: 'bold' }}>⚠️ IMPORTANT: Identify your failure type first. Identifying your failure type takes two minutes and prevents attempting the wrong repair.</p>
    </div>

    <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
      Xbox One controller button failures fall into three categories, each with different symptoms and different repair paths. Whether your A button is sticking or your RB bumper won&apos;t click, <Link href="/button-test" style={{ color: '#3182ce' }}>run a button registration test</Link> before starting. This guide covers membrane cleaning for face buttons and switch replacement for bumpers on models 1537, 1697, and 1708.
    </p>

    <GuideTableOfContents items={[
      { text: "How Xbox One Controller Buttons Work", href: "#how-they-work" },
      { text: "How to Identify Your Button Failure Type", href: "#identify" },
      { text: "Tools and Parts You Will Need", href: "#tools-needed" },
      { text: "Safety and Scope", href: "#before-start" },
      { text: "Step-by-Step Repair Guide", href: "#step-by-step" },
      { text: "How to Test If the Repair Worked", href: "#test" },
      { text: "Frequently Asked Questions", href: "#faq" }
    ]} />

    <section id="how-they-work" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>How Xbox One Controller Buttons Work and Why They Fail</h2>
      
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        The Xbox One Wireless Controller uses two different button mechanisms depending on which button you are looking at:
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h3>Rubber membrane buttons (ABXY, D-pad, bumpers on 1697/1708)</h3>
        <p style={{ lineHeight: '1.8' }}>
          The face buttons sit above a rubber membrane sheet. Each position has a dome-shaped section of rubber with a <strong>carbon contact pad</strong> on its underside. When pressed, this pad bridges gold electrical contact traces on the PCB.
        </p>
        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
          <li>The carbon pad wears thin (intermittent registration).</li>
          <li>Contamination from oils or debris (intermittent or no registration).</li>
          <li>Rubber dome fatigue-cracks (mushy feel, incomplete travel).</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Tact switches (Menu, View, Xbox Guide button, etc.)</h3>
        <p style={{ lineHeight: '1.8' }}>
          Some buttons use a small tactile switch (tact switch) mounted directly on the PCB. These are rated for 100,000-500,000 actuation cycles.
        </p>
        <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
          <li>The metal leaf inside loses tension (mushy feel, inconsistent registration).</li>
          <li>Switch contacts oxidize (no registration).</li>
          <li>Solder joints crack (intermittent failure).</li>
        </ul>
      </div>
    </section>

    <section id="identify" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>How to Identify Your Button Failure Type</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '20px' }}>
        Before disassembly, <Link href="/button-test" style={{ color: '#3182ce' }}>test your button inputs online</Link> to distinguish between mechanical and electrical failures.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Symptom</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Most Likely Failure Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Button never registers</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Failed tact switch or cracked solder joint</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Button registers inconsistently</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Worn or contaminated carbon pad</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Button requires hard press</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Fatigued membrane dome</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>LB or RB loose (model 1537)</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Bumper housing fracture</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="tools-needed" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Tools and Parts You Will Need</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4>Required Tools</h4>
          <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
            <li>T8 Torx security screwdriver</li>
            <li>T6 Torx screwdriver</li>
            <li>Plastic pry tool (Spudger)</li>
            <li>99% Isopropyl Alcohol</li>
            <li>Soldering iron (fine tip)</li>
          </ul>
        </div>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4>Replacement Parts</h4>
          <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
            <li>Rubber membrane sheet (~$5)</li>
            <li>Bumper housing kit (model 1537)</li>
            <li>6x6x4.3mm Tact switches</li>
          </ul>
        </div>
      </div>
      <img src="/images/guides/microsoft/xbox-one-gamepad/button-repair-tools.png" alt="Xbox One controller button repair tools including Torx screwdrivers and replacement parts" style={{ width: '100%', borderRadius: '12px', marginBottom: '30px' }} />
    </section>

    <section id="step-by-step" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Step-by-Step Xbox One Controller Button Repair</h2>
      
      <div style={{ marginBottom: '40px' }}>
        <h3>Step 1: Open the Controller</h3>
        <p style={{ lineHeight: '1.8' }}>
          Remove batteries and battery cover. Peel back the grip panels to expose hidden screws. Remove all five T8 security screws (including the one behind the sticker). Use your pry tool to pop the shell clips around the perimeter.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Path A: Membrane Cleaning and Replacement</h3>
        <p style={{ lineHeight: '1.8' }}>
          Remove the T6 internal screws and lift the PCB. Inspect the <strong>carbon contact pads</strong> on the membrane and the gold traces on the PCB. Clean both with a cotton swab soaked in 99% IPA. If the pads are worn thin, replace the entire rubber membrane sheet.
        </p>
        <img src="/images/guides/microsoft/xbox-one-gamepad/membrane-inspection.png" alt="Xbox One controller button membrane removed showing carbon contact pad" style={{ width: '100%', borderRadius: '12px', margin: '20px 0' }} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Path B: Tact Switch Replacement (Soldering Required)</h3>
        <p style={{ lineHeight: '1.8' }}>
          For failed Menu/View buttons or 1708 bumpers, identify the tact switch on the PCB. Apply flux and use solder wick to remove the four old joints. Solder the new 4.3mm switch in place, ensuring it sits flush against the board.
        </p>
        <img src="/images/guides/microsoft/xbox-one-gamepad/tact-switch-replacement.png" alt="Soldering a new tact switch to the Xbox One controller PCB" style={{ width: '100%', borderRadius: '12px', margin: '20px 0' }} />
      </div>
    </section>

    <section id="test" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>How to Test If the Repair Worked</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        Before fully tightening all screws, reconnect to USB and <Link href="/button-test" style={{ color: '#3182ce' }}>confirm full button registration</Link>.
      </p>
      <ul style={{ lineHeight: '1.8', marginBottom: '20px', paddingLeft: '20px' }}>
        <li>Consistent registration on every press (10/10 success rate).</li>
        <li>No additional force required compared to factory-new buttons.</li>
        <li>Zero delay between physical press and on-screen registration.</li>
      </ul>
    </section>

    <section id="faq" style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '30px' }}>Frequently Asked Questions</h2>
      <GuideFaqAccordion faqs={[
        { q: "Can I fix Xbox One buttons without opening it?", a: "For light contamination, yes. Use compressed air and apply 99% IPA under the button cap. If it's a worn membrane or failed internal switch, you must open it." },
        { q: "Why does my bumper feel mushy but still click?", a: "On model 1537, this is usually a fractured pivot point in the plastic housing. On 1697/1708, it's often the tact switch internal leaf losing tension." },
        { q: "My A button only works if I press really hard. Why?", a: "This is a classic sign of rubber membrane dome fatigue. The dome has lost its spring-back force and needs replacement." },
        { q: "Will cleaning my controller fix double-clicks?", a: "Sometimes. Double-clicking is usually debris between the contact surfaces or a failing tact switch bounce. Try cleaning first." },
        { q: "Is it worth repairing vs. buying new?", a: "A new controller is $60+. A repair kit is ~$10. If the main PCB is functional, repair is far more cost-effective." }
      ]} />
    </section>
  </StyledArticleWrapper>
);
