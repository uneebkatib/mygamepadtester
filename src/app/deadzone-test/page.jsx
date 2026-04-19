import DeadzoneClient from './DeadzoneClient';
import Script from 'next/script';
import en from '@/locales/en.json';

const tool = en.tools.deadzone || { title: "Controller Deadzone Test", description: "Test your controller deadzone online." };

export const metadata = {
    title: `Controller Deadzone Test – Find Your Exact Joystick Threshold Free`,
    description: `Run a free controller deadzone test to measure your joystick's exact idle threshold. See radial and per-axis readings for Xbox, PlayStation, and Switch — no download needed.`,
    alternates: {
        canonical: "https://mygamepadtester.com/deadzone-test",
    },
    openGraph: {
        title: `Controller Deadzone Test – Find Your Exact Joystick Threshold Free`,
        description: `Measure your controller's precise deadzone threshold. Visualize idle jitter and optimize your in-game deadzone settings for maximum precision.`,
        url: 'https://mygamepadtester.com/deadzone-test',
        type: 'website',
    }
}

export default function DeadzoneTestPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Controller Deadzone Test",
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
                "name": "What is a controller deadzone?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A deadzone is the area around the center of an analog stick where movement is intentionally ignored. It prevents minor imperfections in the hardware from registering as input. This tester shows the raw deadzone value your controller reports before any game applies its own deadzone."
                }
            },
            {
                "@type": "Question",
                "name": "What deadzone value is ideal?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For most players, a raw resting value under 0.05 (5%) is excellent. Competitive FPS players often prefer values as low as 0.02–0.03 for maximum precision. If your resting value exceeds 0.10 (10%), you may need to increase your in-game deadzone or clean the controller."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": "Deadzone Test", "item": "https://mygamepadtester.com/deadzone-test" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <DeadzoneClient />
        </>
    );
}
