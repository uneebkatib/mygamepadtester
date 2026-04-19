import JoystickCalibrationClient from './Client'
import Script from 'next/script'

export const metadata = {
    title: 'Joystick Calibration – Fix Controller Stick Offset & Drift Online',
    description: 'Use our free Joystick Calibration tool to check analog stick accuracy, fix center drift, and tune deadzones for any gamepad. No download needed.',
    alternates: {
        canonical: "https://mygamepadtester.com/joystick-calibration",
    },
    openGraph: {
        title: 'Joystick Calibration Tool - Fix Controller Drift Online',
        description: 'Instant browser-based joystick calibration for PS5, Xbox, and Nintendo controllers.',
        url: 'https://mygamepadtester.com/joystick-calibration',
        type: 'website',
    }
}

export default function JoystickCalibrationPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Joystick Calibration Tool",
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
                "name": "Does the Joystick Calibration tool work without downloading anything?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The tool runs entirely in your browser using the HTML5 Gamepad API. Open it in Chrome or Edge, connect your controller via USB, and the tool detects it automatically."
                }
            },
            {
                "@type": "Question",
                "name": "Will calibrating my joystick fix stick drift?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It depends on the cause. If drift comes from a minor center offset caused by sensor shift or dust, calibration can correct it fully. If the joystick module is physically worn, calibration may not be a permanent fix."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": "Joystick Calibration", "item": "https://mygamepadtester.com/joystick-calibration" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <JoystickCalibrationClient />
        </>
    )
}
