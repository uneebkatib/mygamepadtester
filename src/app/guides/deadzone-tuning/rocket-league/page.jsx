



import GuideLayout from '@/components/Guides/GuideLayout';
import TesterWrapper from '@/components/Main/TesterWrapper';

export const metadata = {
    title: 'Rocket League Deadzone & Sensibility Guide - Hit SSL',
    description: 'Perfect your Rocket League Deadzone and Dodge shapes. Discover the cross-shaped vs square-shaped setups the pros use for flip resets and aerials.',
    alternates: { canonical: 'https://mygamepadtester.com/guides/deadzone-tuning/rocket-league' }
};

export default function RocketLeagueDeadzoneGuide() {
    return (
        <GuideLayout title="The Ultimate Rocket League Deadzone Tuning Guide">
            <p>
                In a physics-based, momentum-driven arena like Rocket League, a gamepad is practically mandatory.
                However, unlike a shooter game, deadzone configurations here dictate car rotation speed, half-flip consistency, and stalling mechanics.
            </p>

            <h2>Understanding Deadzone Shape (Cross vs. Square)</h2>
            <p>
                While Rocket League natively utilizes a <strong>Cross deadzone</strong> shape on PC and console,
                Steam users who bypass default inputs can unlock the <strong>Square deadzone</strong> format.
            </p>
            <ul>
                <li><strong>Cross Deadzone (Default):</strong> Feels natural and prevents diagonal inputs from overriding direct horizontal/vertical snaps. Excellent for standard fast-aerials.</li>
                <li><strong>Square Deadzone (Advanced):</strong> Expands the outer input boundaries, essentially allowing your analog stick to hit "maximum velocity" on diagonal outputs faster. Highly prized by freestyle players hitting flip resets and breezi flicks.</li>
            </ul>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '2rem 0' }}>
                <h3 style={{ marginTop: 0 }}>Test Your Stick Calibration</h3>
                <p>Run your controller through our grid to verify circularity. If your outer bounds do not reach 100%, you must reduce your Rocket League deadzone to compensate.</p>
                <div style={{ height: '300px', overflow: 'hidden' }}>
                    <TesterWrapper />
                </div>
            </div>

            <h2>Controller Deadzone vs. Dodge Deadzone</h2>
            <p>
                Psyonix wisely separated base stick input from the flip input threshold.
            </p>
            <ul>
                <li><strong>Controller Deadzone (0.05 - 0.10):</strong> The lower this is, the faster your car responds in the air and on the ground. Pros play between 0.05 and 0.08. If your car turns on its own, increase it using your baseline hardware drift.</li>
                <li><strong>Dodge Deadzone (0.50 - 0.85):</strong> How far the stick must be pushed before double-jumping triggers a flip instead. Setting this too low (0.30) causes accidental backflips during fast aerials. Setting it too high (0.90) makes executing diagonal speed-flips nearly impossible.</li>
            </ul>

            <h2>Recommended Pro Baselines</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr style={{ background: '#f1f5f9' }}>
                        <th style={{ padding: '10px', borderBottom: '2px solid #cbd5e1' }}>Metric</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #cbd5e1' }}>Value (Zen/MonkeyM00n Average)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}><strong>Controller Deadzone</strong></td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>0.05 - 0.07</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}><strong>Dodge Deadzone</strong></td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>0.70 - 0.80</td>
                    </tr>
                    <tr>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}><strong>Aerial/Steering Sens</strong></td>
                        <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>1.30 - 1.60</td>
                    </tr>
                </tbody>
            </table>
        </GuideLayout>
    );
}
