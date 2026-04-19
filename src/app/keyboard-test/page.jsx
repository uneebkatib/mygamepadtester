import KeyboardClient from './KeyboardClient';
import Script from 'next/script';

export const metadata = {
    title: 'Keyboard Test Online – Check Every Key, Ghosting & Rollover Free',
    description: 'Identify dead keys, stuck switches, and ghosting issues on any keyboard. Test your hardware health instantly with our free, no-download tool.',
    alternates: {
        canonical: "https://mygamepadtester.com/keyboard-test",
    },
    openGraph: {
        title: 'Keyboard Test Online – Check Every Key, Ghosting & Rollover Free',
        description: 'Identify dead keys, stuck switches, and ghosting issues on any keyboard. Test your hardware health instantly with our free, no-download tool.',
        url: 'https://mygamepadtester.com/keyboard-test',
        type: 'website',
    }
}

export default function KeyboardTestPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Keyboard Test Online",
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
                "name": "How do I test if my keyboard keys are working?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Open this tool and press each key one by one. Each key that registers will light up on the on-screen keyboard. Any key that does not light up is dead, unresponsive, or has a failed switch that may need cleaning or replacement."
                }
            },
            {
                "@type": "Question",
                "name": "What is keyboard ghosting?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ghosting occurs when pressing multiple keys simultaneously causes some inputs to not register. This is a hardware limitation of keyboards that lack full N-key rollover (NKRO). Mechanical gaming keyboards typically offer NKRO and are immune to ghosting. Test your keyboard's rollover by pressing 6+ keys at the same time."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": "Keyboard Test", "item": "https://mygamepadtester.com/keyboard-test" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <KeyboardClient />
        </>
    );
}
