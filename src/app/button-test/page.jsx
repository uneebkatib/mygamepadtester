import ButtonTestClient from './Client'
import Script from 'next/script'

export const metadata = {
    title: 'Controller Button Test – Check Every Button Online Free',
    description: 'Test face buttons, shoulder buttons, triggers & D-pad on PS5, Xbox or Switch. Detect stuck, dead or unresponsive inputs instantly — free, no download, results in seconds.',
    alternates: {
        canonical: "https://mygamepadtester.com/button-test",
    },
    openGraph: {
        title: 'Controller Button Test – Detect Stuck, Dead & Unresponsive Buttons',
        description: 'Test face buttons, shoulder buttons, triggers & D-pad on PS5, Xbox or Switch. Detect stuck, dead or unresponsive inputs instantly.',
        url: 'https://mygamepadtester.com/button-test',
        type: 'website',
    }
}

export default function ButtonTestPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Controller Button Tester",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Windows, macOS, Linux, ChromeOS, Android, iOS",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Does the Controller Button Tester work with wireless controllers?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the tool works with both wired and wireless controllers. Pair your wireless controller via Bluetooth before opening the tool."
                }
            },
            {
                "@type": "Question",
                "name": "Which controller brands are supported?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The tool supports Xbox, PlayStation (DualSense/DualShock), Nintendo Switch Pro controllers, 8BitDo, and most generic HID/XInput devices."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": "Button Test", "item": "https://mygamepadtester.com/button-test" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <ButtonTestClient />
        </>
    )
}
