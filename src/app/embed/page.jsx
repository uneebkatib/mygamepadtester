import GuideLayout from '@/components/Guides/GuideLayout';

export const metadata = {
    title: 'Embed Gamepad Tester | MyGamepadTester',
    alternates: {
        canonical: "https://mygamepadtester.com/embed",
    },
}

export default function EmbedWidgetPage() {
    return (
        <GuideLayout title="Embed Gamepad Tester on Your Website">
            <p className="lead" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#4a5568', marginBottom: '2rem' }}>
                Increase your users' time-on-page and add massive value to your gaming content by embedding our live <strong>Hardware Stick Drift Tester</strong> directly onto your blog, wiki, or forum—100% free.
            </p>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', margin: '2rem 0', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ marginTop: 0, color: '#DA7756', borderBottom: 'none' }}>Copy Your Embed Code</h2>
                <p>Copy and paste the following HTML snippet directly into your website builder (WordPress, Wix, Webflow) or custom codebase:</p>

                <div style={{ position: 'relative', marginTop: '1rem' }}>
                    <textarea
                        readOnly
                        value={`<iframe \n  title="Live Gamepad Tester"\n  src="https://mygamepadtester.com/widget" \n  width="100%" \n  height="600px" \n  style="border: none; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"\n></iframe>`}
                        style={{
                            width: '100%',
                            minHeight: '130px',
                            padding: '1rem',
                            background: '#1e293b',
                            color: '#e2e8f0',
                            fontFamily: 'monospace',
                            fontSize: '0.95rem',
                            borderRadius: '8px',
                            border: 'none',
                            resize: 'none'
                        }}
                    />
                </div>
            </div>

            <h2>Why Embed Our Tool?</h2>

            <h3>1. Boost SEO & Dwell Time</h3>
            <p>
                When a user tests their controller, they physically engage with your webpage. Hardware diagnostics take an average of <strong>2-4 minutes</strong>, drastically reducing your bounce rate and signaling high engagement to Google's ranking algorithms.
            </p>

            <h3>2. Perfect for Hardware Reviews & Guides</h3>
            <p>
                If you are writing a review for the latest Scuf controller, or writing a tutorial on fixing Joy-Con drift, embedding the tool natively allows the reader to visually verify the hardware flaw without ever leaving your domain.
            </p>

            <h3>3. Zero Maintenance Required</h3>
            <p>
                The Gamepad API is constantly shifting across browser versions (Chrome, Safari, Firefox). We handle 100% of the API updates, CSS scaling, and server costs. Your embedded widget is served through a CDN and will functionally adapt to any container size you drop it into.
            </p>

            <h2>Customization & Dimensions</h2>
            <p>
                The widget dynamically collapses its outer margins. However, because graphing SVG axes requires vertical real estate, the absolute minimum recommended height is <code>600px</code>. We strongly advise setting width to <code>100%</code> so it seamlessly fits on mobile screens.
            </p>
        </GuideLayout>
    );
}
