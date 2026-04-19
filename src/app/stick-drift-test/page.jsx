import StickDriftTestClient from './Client'
import Script from 'next/script'

export const metadata = {
    title: 'Stick Drift Test – Detect PS5, Xbox & Switch Controller Drift Free',
    description: 'Run a free stick drift test to detect joystick drift on PS5, PS4, Xbox, Switch, and PC controllers. See your exact X/Y axis offset at rest — no download needed.',
    alternates: {
        canonical: "https://mygamepadtester.com/stick-drift-test",
    },
    openGraph: {
        title: 'Stick Drift Test – Detect PS5, Xbox & Switch Controller Drift Free',
        description: 'Free stick drift test with live X/Y axis readings. Check PS5, Xbox, and Nintendo controllers for joystick drift in your browser.',
        url: 'https://mygamepadtester.com/stick-drift-test',
        type: 'website',
    }
}

export default function StickDriftTestPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "name": "Stick Drift Test",
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
                "name": "Does this test work with wireless controllers?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the Stick Drift Test works with both wired and wireless controllers. Connect your wireless controller via USB or pair it through Bluetooth before opening the tool. For the most accurate readings, test wired first because Bluetooth connections can introduce signal noise."
                }
            },
            {
                "@type": "Question",
                "name": "What does a healthy X/Y reading look like?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A healthy controller at rest shows X/Y values that stay close to zero and remain stable without wandering. Readings under 1% are excellent. The 1 to 5% range is normal for any controller that has seen regular use."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": "Stick Drift Test", "item": "https://mygamepadtester.com/stick-drift-test" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <StickDriftTestClient />
        </>
    )
}
