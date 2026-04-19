import JoyConClient from './Client'
import Script from 'next/script'
import en from '@/locales/en.json';

const tool = en.tools.joycon;

export const metadata = {
    title: 'Joy-Con Drift Test – Detect Nintendo Switch Stick Drift Free Online',
    description: 'Run a free Joy-Con drift test in your browser. Detect Nintendo Switch controller problems, button issues, and stick drift instantly. No download needed.',
    alternates: {
        canonical: 'https://mygamepadtester.com/joycon-tester',
    },
    openGraph: {
        title: 'Joy-Con Drift Test – Detect Nintendo Switch Stick Drift Free Online',
        description: 'Free Joy-Con drift test in your browser. Detect Switch controller stick drift, button issues, and analog stick problems instantly.',
        url: 'https://mygamepadtester.com/joycon-tester',
        type: 'website',
    },
}

export default function JoyConTesterPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Joy-Con Drift Test",
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
                "name": "How do I test Joy-Con drift?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Connect your Joy-Con via Bluetooth, then use this tool to observe the stick's resting position. Any value other than 0.00000 while neutral indicates drift. For Nintendo warranty claims, values consistently above 0.14 are considered documented evidence of hardware failure."
                }
            },
            {
                "@type": "Question",
                "name": "Does Nintendo fix Joy-Con drift for free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. In many regions including North America, the EEA, and the UK, Nintendo offers free repairs for Joy-Con drift even if your console is out of warranty. Use the data from this tester to confirm your drift before starting a support ticket."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": tool.title || "Joy-Con Tester", "item": "https://mygamepadtester.com/joycon-tester" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <JoyConClient />

            <div style={{ maxWidth: '1200px', width: '100%', padding: '0 1.5rem', margin: '2rem auto' }}>
                <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', border: '1px solid #eba28a' }}>
                    <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#333' }}>{tool.relatedTitle || 'Related Joy-Con Repair Guides'}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                        <a href="/guides/nintendo/switch/joycon-drift" style={{ background: '#fff', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', color: '#DA7756', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>{tool.guide1 || 'Joy-Con Drift: The Definitive Fix Guide'}</a>
                        <a href="/guides/nintendo/switch/stick-replacement" style={{ background: '#fff', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', color: '#DA7756', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>{tool.guide2 || 'How to Replace Joy-Con Joystick Modules'}</a>
                    </div>
                </div>
            </div>
        </>
    )
}
