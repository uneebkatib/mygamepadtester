import React from "react";
import Link from "next/link";
import GuideFaqAccordion from "../../../GuideFaqAccordion";
import GuideTableOfContents from "../../../GuideTableOfContents";
import { StyledArticleWrapper } from "../../ArticleStyles";

export const XboxOnePowerSupplyRepairGuide = () => (
  <StyledArticleWrapper>
    <div className="hero-container">
      <img src="/images/guides/microsoft/xbox-one/power-hero.png" alt="Xbox One original power supply brick showing LED indicator light" />
    </div>

    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
      <span style={{ padding: '6px 12px', background: '#ed8936', color: 'white', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>POWER REPAIR</span>
      <span style={{ padding: '6px 12px', background: '#fffaf0', color: '#ed8936', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>PUBLISHED APRIL 2026</span>
      <span style={{ padding: '6px 12px', background: '#e2e8f0', color: '#4a5568', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>15 MIN READ</span>
    </div>

    <h1 style={{ fontSize: '2.5rem', color: '#1a202c', marginBottom: '10px' }}>Xbox One Power Supply Repair: Diagnosing and Fixing the Model 1540 Brick</h1>
    <p style={{ color: '#718096', marginBottom: '20px' }}>
      <strong>Author:</strong> Uneeb Katib | Hardware Diagnostic Specialist | <strong>Published:</strong> April 6, 2026
    </p>

    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '30px' }}>
      <p style={{ marginBottom: '15px' }}>
        The original Xbox One (model 1540) will not power on without its external power brick working correctly. When the console goes dark, the brick is usually the first suspect — but it is not always the actual fault. Replacing a good brick while the real problem sits on the console&apos;s internal power board is an expensive mistake.
      </p>
      <p style={{ marginBottom: '15px' }}>
        The original Xbox One power brick has an internal thermal protection circuit that trips under overheat conditions and can be reset without any replacement. This guide covers the diagnostic triage to separate brick faults from console faults.
      </p>
    </div>

    <GuideTableOfContents items={[
      { text: "How the Power System Works", href: "#how-it-works" },
      { text: "Diagnosing the LED States", href: "#led-diagnosis" },
      { text: "Tools and Parts Needed", href: "#tools" },
      { text: "Safety Warnings", href: "#safety" },
      { text: "Thermal Reset Procedure", href: "#thermal-reset" },
      { text: "Measuring Output Voltage", href: "#voltage-test" },
      { text: "Frequently Asked Questions", href: "#faq" }
    ]} />

    <section id="how-it-works" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>How the Xbox One Power System Works</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        The &quot;fat&quot; Xbox One uses an external PB2V brick that converts AC to 12V DC. This 12V is then stepped down by an internal power board inside the console. Understanding this two-stage process is key to identifying if your brick is actually dead or if the internal board has failed.
      </p>
      <p style={{ lineHeight: '1.8' }}>
        The [Xbox One repair hub](/guides/microsoft/xbox-one-fat-original) covers this and other common repairs like HDMI port replacement.
      </p>
    </section>

    <section id="led-diagnosis" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Diagnosing the LED States</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#f7fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#2d3748', borderBottom: '2px solid #fff', paddingBottom: '10px' }}>SOLID WHITE</h4>
          <p>Standby mode ready. The brick is healthy. Fault is likely console-side.</p>
        </div>
        <div style={{ background: '#fffaf0', padding: '20px', borderRadius: '12px', border: '1px solid #feebc8' }}>
          <h4 style={{ color: '#c05621', borderBottom: '2px solid #fff', paddingBottom: '10px' }}>ORANGE/AMBER</h4>
          <p>Standby protection. Thermal fuse has tripped. Needs a reset.</p>
        </div>
        <div style={{ background: '#fff5f5', padding: '20px', borderRadius: '12px', border: '1px solid #fed7d7' }}>
          <h4 style={{ color: '#c53030', borderBottom: '2px solid #fff', paddingBottom: '10px' }}>NO LIGHT</h4>
          <p>Complete failure or no AC input. Check your wall socket.</p>
        </div>
      </div>
    </section>

    <section id="safety" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Safety Warnings</h2>
      <div style={{ borderLeft: '4px solid #e53e3e', padding: '15px', background: '#fff5f5', marginBottom: '20px' }}>
        <p><strong>DANGER:</strong> Do not open the power brick. It contains high-voltage capacitors that can be lethal even when unplugged. There are no safe user-serviceable parts inside the brick.</p>
      </div>
    </section>

    <section id="thermal-reset" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Step-by-Step Thermal Reset Procedure</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        A PTC resettable fuse trips when the brick overheats. Most &quot;failed&quot; bricks just need a cooling period to reset this circuit.
      </p>
      <ol style={{ lineHeight: '1.8', marginBottom: '20px', paddingLeft: '20px' }}>
        <li>Unplug the brick from both the wall and the Xbox.</li>
        <li>Leave it in a cool, ventilated area for at least <strong>60 minutes</strong>.</li>
        <li>Plug the brick directly into a wall socket (no power strips).</li>
        <li>If the light returns to white, reconnect the console and power on.</li>
      </ol>
    </section>

    <section id="diagnosis" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Diagnosing Internal vs. External Power Faults</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        Is the problem the brick or the console itself? Use this test logic:
      </p>
      <div style={{ background: '#fffaf0', padding: '20px', borderRadius: '12px', border: '1px solid #feebc8' }}>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li><strong>Scenario A:</strong> The light turns WHITE when you press the power button, but the console immediately shuts off. <em>(Likely an internal short on the console motherboard or a CPU thermal trip.)</em></li>
          <li><strong>Scenario B:</strong> The light stays ORANGE when you press the power button. <em>(The brick is failing to switch from 5V standby to 12V main power. The brick is likely the culprit.)</em></li>
          <li><strong>Scenario C:</strong> The light goes dark the moment you plug it into the console. <em>(There is a hard short on the console&apos;s 12V entry rail; the brick&apos;s protection circuit is shutting it down to prevent a fire.)</em></li>
        </ul>
      </div>
    </section>

    <section id="replacement" style={{ marginTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px' }}>Compatible Replacement Bricks</h2>
      <p style={{ lineHeight: '1.8', marginBottom: '15px' }}>
        If your brick is dead, replacement is the only safe option. Look for these specifications:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#3182ce', color: 'white' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #2b6cb0' }}>Metric</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #2b6cb0' }}>Required Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Input Voltage</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>100-240V (Auto-switching preferred)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Output Voltage</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>12V (Main) / 5V (Standby)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Wattage / Amperage</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Min 200W / 16.5A</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Noise Level</td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>30dB or lower (Look for high-quality fan reviews)</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="faq" style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '1.8rem', color: '#1a202c', marginBottom: '30px' }}>Frequently Asked Questions</h2>
      <GuideFaqAccordion faqs={[
        { q: "Is it safe to open the power brick?", a: "No. The main capacitors hold high voltage even when unplugged. The housing is ultrasonically welded and not designed for user service." },
        { q: "Can I use a third-party power brick?", a: "Yes, but ensure it is rated for at least 200W/16.5A. Underpowered bricks will shut down during intensive gaming." },
        { q: "The console turns on then immediately off. Is it the brick?", a: "If the LED stays white, it's likely a console thermal issue. If it returns to orange, it's a brick failure or short on the console." },
        { q: "Why is the fan in my power brick so loud?", a: "It is likely clogged with dust. Use compressed air to blow through the vents. If it still grinds, the fan bearing is failing." }
      ]} />
    </section>
  </StyledArticleWrapper>
);
