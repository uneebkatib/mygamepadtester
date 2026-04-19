import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../../GuideFaqAccordion";
import GuideTableOfContents from "../../../GuideTableOfContents";
import { StyledArticleWrapper } from "../../ArticleStyles";

export const XboxOneStickDriftRepairGuide = () => (
  <StyledArticleWrapper>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#3182ce', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>REPAIR GUIDE</span>
      <span style={{ padding: '6px 12px', background: '#ebf8ff', color: '#3182ce', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>UPDATED APRIL 2026</span>
      <span style={{ padding: '6px 12px', background: '#e2e8f0', color: '#4a5568', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>60 MIN READ</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Xbox One Controller Stick Drift Repair: Standard Gamepad Fix</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
      <p style={{ marginBottom: '15px' }}>
        Xbox One controller stick drift turns a minor annoyance into an unplayable experience. Your character moves without input, the camera creeps sideways, and menu cursors wander.
      </p>
      <p style={{ marginBottom: '15px' }}>
        The fix depends on severity. Before you open your controller, <Link href="/stick-drift-test" style={{ color: '#3182ce' }}>check your stick drift online</Link> to measure your actual axis offset. A 5% drift is fixed differently than a 25% drift.
      </p>
    </div>

    <GuideTableOfContents items={[
      { text: "Causes of Xbox Stick Drift", href: "#causes" },
      { text: "Drift Severity Scale", href: "#severity" },
      { text: "Tools &amp; Parts Needed", href: "#tools" },
      { text: "Method A: Cleaning (No Opening)", href: "#cleaning" },
      { text: "Method B: Replacement (Solder)", href: "#replacement" },
      { text: "Frequently Asked Questions", href: "#faq" }
    ]} />

    <section id="causes" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Why Xbox Controllers Drift</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        Xbox One controllers (Models 1537, 1697, 1708) use ALPS RKJXV modules. Inside, a carbon brush slides on a resistive track. Over time, this track wears down, especially at the &quot;neutral&quot; center position, leading to erratic signals.
      </p>
      <p style={{ lineHeight: '1.8' }}>
        For more on the physics of wear, see <Link href="/blog/what-is-ps5-stick-drift" style={{ color: '#3182ce' }}>why analog sticks develop drift</Link>.
      </p>
    </section>

    <section id="severity" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Drift Severity &amp; Action Scale</h2>
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <ul style={{ lineHeight: '2' }}>
          <li><strong>0 - 1.2%:</strong> Normal signal noise. No action needed.</li>
          <li><strong>1.2% - 5%:</strong> Mild Drift. Try an <Link href="/joystick-calibration" style={{ color: '#3182ce' }}>IPA flush</Link> or deadzone adjustment.</li>
          <li><strong>5% - 12%:</strong> Moderate. Expand deadzone thresholds.</li>
          <li><strong>12%+:</strong> Critical. Module replacement required.</li>
        </ul>
      </div>
      <p style={{ marginTop: '15px' }}>
        <Link href="/deadzone-test" style={{ color: '#3182ce' }}>Map your deadzone radius</Link> to see how much room you have for software fixes.
      </p>
    </section>

    <section id="tools" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Tools &amp; Parts Needed</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h4 style={{ color: '#2d3748' }}>Parts</h4>
          <p>ALPS RKJXV Module (Specify model 1537/1697/1708)</p>
          <p>99% IPA (Isopropyl Alcohol)</p>
        </div>
        <div style={{ padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <h4 style={{ color: '#2d3748' }}>Tools</h4>
          <p>T8 Torx Security &amp; T6 Torx</p>
          <p>Soldering Iron &amp; Wick</p>
          <p>Plastic Pry Tool</p>
        </div>
      </div>
    </section>

    <section id="cleaning" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Method A: IPA Flush (No Opening)</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        Mild drift is often caused by dust or oxidation rather than track wear.
      </p>
      <ol style={{ lineHeight: '1.8', marginLeft: '20px' }}>
        <li>Tilt the stick and apply 1-2 drops of 99% IPA into the base.</li>
        <li>Rotate the stick in 20 full circles to work the fluid into the sensor.</li>
        <li>Let it dry for 15 minutes before powering on.</li>
      </ol>
    </section>

    <section id="replacement" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Method B: Module Replacement (Solder)</h2>
      <ol style={{ lineHeight: '1.8', marginLeft: '20px' }}>
        <li>Remove the 5 screws behind grip panels and battery tray.</li>
        <li>Desolder the 14 pins of the old ALPS module from the PCB underside.</li>
        <li>Install the new module and solder clean fillets on all signal pins.</li>
      </ol>
      <p style={{ marginTop: '15px' }}>
        For advanced measurement before/after, follow our <Link href="/guides/controller-testing/drift-detection/advanced-drift-analysis" style={{ color: '#3182ce' }}>Advanced Drift Analysis</Link>.
      </p>
    </section>

    <section id="faq" style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '30px' }}>Frequently Asked Questions</h2>
      <GuideFaqAccordion faqs={[
        { q: "Can I fix this without soldering?", a: "Only if the drift is mild. Cleaning (Method A) or software deadzone adjustments are your only non-solder options." },
        { q: "What is the specific module model?", a: "Standard Xbox One controllers use the ALPS RKJXV module. Elite Series modules are different." },
        { q: "Is it worth repairing an old controller?", a: "If the parts cost $5 and the controller is $50, yes. If multiple parts are broken, buying used may be cheaper." },
        { q: "Why did cleaning not work?", a: "If cleaning fails, the carbon resistive track is physically eroded. The material is gone, and only replacement will fix it." }
      ]} />
    </section>
  </StyledArticleWrapper>
);
