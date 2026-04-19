



import GuideLayout from '@/components/Guides/GuideLayout';
import TesterWrapper from '@/components/Main/TesterWrapper';

export const metadata = {
    title: 'Best Apex Legends Controller Deadzone & ALCs',
    description: 'Perfect your Apex Legends ALC settings. Eliminate stick drift, optimize response curves, and hit masters with these professional deadzone tunings.',
    alternates: { canonical: 'https://mygamepadtester.com/guides/deadzone-tuning/apex-legends' }
};

export default function ApexDeadzoneGuide() {
    return (
        <GuideLayout title="Apex Legends Deadzone & ALC Tuning Guide (2026)">
            <p>
                Apex Legends has arguably the most intricate controller tuning system of any competitive shooter: Advanced Look Controls (ALC).
                Given the heavy emphasis on movement mechanics (tap-strafing, wall-bouncing) and high Time-to-Kill (TTK) tracking, micro-managing your deadzones in Apex is critical to eliminating recoil and winning your 1v1s.
            </p>

            <h2>Standard Settings vs. ALCs</h2>
            <p>
                While the default Number/Number sensitivity settings (e.g., 4-3 Linear) are popular among pros, enabling ALCs gives you raw access to your controller hardware limits.
            </p>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '2rem 0' }}>
                <h3 style={{ marginTop: 0 }}>Establish Your Stick Drift Baseline</h3>
                <p>Before tweaking your ALCs, plug in your controller below and establish your natural hardware drift. If your right stick rests at <strong>0.04</strong>, you should establish a <strong>5%</strong> deadzone in ALCs to prevent screen jitter while looting.</p>
                <div style={{ height: '300px', overflow: 'hidden' }}>
                    <TesterWrapper />
                </div>
            </div>

            <h2>The 4-3 Linear Phenomenon (No Deadzone)</h2>
            <p>
                Currently, 90% of ALGS professional players run <strong>4 Look / 3 ADS Sensitivity on Linear Curve with "Small" or "None" Deadzone.</strong>
            </p>
            <ul>
                <li><strong>Why "None" Deadzone?</strong> Aim assist in Apex Legends activates upon any detected stick movement. A zero or near-zero deadzone ensures the right stick is perpetually in motion due to natural thumb resting or microscopic stick drift. This essentially "tricks" the engine into engaging rotational aim assist infinitely, making tracking inherently easier.</li>
                <li><strong>The Trade-off:</strong> Your camera will drift slightly while looting death boxes. The compromise is worth the enhanced rotational tracking.</li>
            </ul>

            <h2>Recommended ALC Deadzone Inputs</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr style={{ background: '#f1f5f9' }}>
                        <th style={{ padding: '10px', borderBottom: '2px solid #cbd5e1' }}>Setting Name</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #cbd5e1' }}>Value (Ticks)</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #cbd5e1' }}>Explanation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}><strong>Deadzone</strong></td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>2 to 6%</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Keep as close to 0 as the hardware tolerates without wild drift.</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}><strong>Outer Threshold</strong></td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>1 to 2%</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Prevents the need to physically jam the stick into its plastic rim to hit maximum turn speed.</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}><strong>Response Curve</strong></td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>0 (Linear) to 6 (Classic)</td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Lower values for raw aim; higher for recoil absorption.</td>
                    </tr>
                </tbody>
            </table>
        </GuideLayout>
    );
}
