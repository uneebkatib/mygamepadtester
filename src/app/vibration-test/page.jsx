import VibrationTestClient from './Client'
import Script from 'next/script'
import en from '@/locales/en.json';

const tool = en.tools.vibration;

export const metadata = {
    title: 'Controller Vibration Test – Check PS5, Xbox & All Gamepad Rumble Free',
    description: 'Test your controller vibration and rumble motors. This free tool checks both heavy and fine rumble, haptic feedback, and motor imbalance on PS5, Xbox, Switch and more.',
    alternates: {
        canonical: "https://mygamepadtester.com/vibration-test",
    },
    openGraph: {
        title: 'Controller Vibration Test – Check PS5, Xbox & All Gamepad Rumble Free',
        description: 'Test your controller vibration and rumble motors. Check both heavy and fine rumble, haptic feedback, and motor imbalance on PS5, Xbox, Switch and more.',
        url: 'https://mygamepadtester.com/vibration-test',
        type: 'website',
    },
}

export default function VibrationTestPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Controller Vibration Test",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Windows, macOS, Linux, ChromeOS",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Does the Controller Vibration Tester work with wireless controllers?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Connect your wireless controller via Bluetooth or its USB receiver before opening the tool, then press any button to wake the API. Both wired and wireless connections work."
                }
            },
            {
                "@type": "Question",
                "name": "Why does vibration work in games but not in the browser tool?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "This is usually a browser compatibility issue, not a hardware problem. The Gamepad API requires Chrome or Edge for reliable vibration support."
                }
            },
            {
                "@type": "Question",
                "name": "Does this test support PS5 DualSense haptics?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. This tool can trigger the standard rumble motors on a PS5 controller. For high-definition haptic feedback and adaptive trigger resistance, ensure you are using a wired connection on a Chromium-based browser like Chrome or Edge."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": "Vibration Tester", "item": "https://mygamepadtester.com/vibration-test" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <VibrationTestClient />

            <div style={{ maxWidth: '1200px', width: '100%', padding: '0 1.5rem', margin: '2rem auto' }}>
                <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', border: '1px solid #eba28a' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#333' }}>{tool.relatedTitle || 'Related Hardware & Haptics Guides'}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                        <a href="/guides/sony/ps5/dualsense-complete-troubleshooting" style={{ background: '#fff', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', color: '#DA7756', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>PS5 DualSense Complete Troubleshooting Guide</a>
                        <a href="/guides/xbox/series-x/impulse-triggers" style={{ background: '#fff', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', color: '#DA7756', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>Xbox Impulse Triggers Repair Guide</a>
                    </div>
                </div>
            </div>
        </>
    )
}
