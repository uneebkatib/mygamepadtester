import MouseClient from './MouseClient';
import Script from 'next/script';

export const metadata = {
    title: `Mouse Test Online: Check Buttons, Clicks & Double-Click Issues`,
    description: `Detect double-click issues, scroll wheel skipping, and side button failures instantly. Run a free mouse test in your browser with no download required.`,
    alternates: {
        canonical: "https://mygamepadtester.com/mouse-test",
    },
    openGraph: {
        title: 'Mouse Test Online – Check Clicks, Scroll & Side Buttons Free',
        description: 'Run a free mouse test online. Detect double-clicks, scroll wheel skipping, and side button issues on any mouse. No download needed.',
        url: 'https://mygamepadtester.com/mouse-test',
        type: 'website',
    }
}

export default function MouseTestPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Mouse Test Online",
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
                "name": "How do I test my mouse for double-click issues?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Click the left mouse button once on the test area and watch the click counter. If the counter increments by 2 from a single physical click, your mouse has a double-click problem, usually caused by a worn-out Omron switch or debounce circuit failure."
                }
            },
            {
                "@type": "Question",
                "name": "Why is my scroll wheel skipping?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Scroll wheel skipping is typically caused by a dirty or worn optical encoder inside the mouse. Use the scroll test area and scroll slowly — if the direction reverses or skips steps, the encoder disc needs cleaning with compressed air or isopropyl alcohol, or full replacement."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": "Mouse Test", "item": "https://mygamepadtester.com/mouse-test" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <MouseClient />
        </>
    );
}
