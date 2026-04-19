import TriggerClient from './TriggerClient';
import Script from 'next/script';
import en from '@/locales/en.json';

const tool = en.tools.trigger;

export const metadata = {
    title: 'Controller Trigger Test – Check Full Pressure Range on PS5, Xbox & Switch',
    description: 'Test your controller triggers (L2/R2/LT/RT) for full 0-100% travel. Detect stuck triggers, limited range or adaptive trigger issues on PS5 DualSense, Xbox, and Switch.',
    alternates: {
        canonical: "https://mygamepadtester.com/trigger-test",
    },
    openGraph: {
        title: `Controller Trigger Test – Check PS5 Adaptive Triggers & Xbox Full Range`,
        description: `Free trigger pressure test for PS5, Xbox, and PC controllers. Check 0-100% travel, detect deadzones and limited range.`,
        url: 'https://mygamepadtester.com/trigger-test',
        type: 'website',
    }
}

export default function TriggerTestPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Controller Trigger Test",
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
                "name": "How do I test if my triggers are working correctly?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Connect your controller, then slowly press each trigger from 0% to 100%. The live graph should show a smooth, linear increase from 0 to 1.0. If the value jumps, skips, or fails to reach 1.0, the trigger mechanism or sensor may be damaged."
                }
            },
            {
                "@type": "Question",
                "name": "Does this test work with PS5 DualSense adaptive triggers?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. This tool reads the raw analog pressure value (0.0–1.0) from both adaptive triggers on the PS5 DualSense. To test the physical adaptive resistance feature, use a game or the DualSense settings panel — the resistance is a hardware feature independent of the axis reading."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": "Trigger Test", "item": "https://mygamepadtester.com/trigger-test" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <TriggerClient />
        </>
    );
}
