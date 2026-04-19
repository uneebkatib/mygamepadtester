import InputLagClient from './InputLagClient';
import Script from 'next/script';
import en from '@/locales/en.json';

const tool = en.tools.inputLag;

export const metadata = {
    title: 'Controller Input Lag Test – Monitor Polling Rate & Latency Free',
    description: 'Measure your controller input lag and polling rate in real-time. Benchmark PS5, PS4, Xbox, and Switch controller latency. Online and free tool.',
    alternates: {
        canonical: "https://mygamepadtester.com/input-lag-test",
    },
    openGraph: {
        title: 'Controller Input Lag Test – Monitor Polling Rate & Latency Free',
        description: 'Measure your controller input lag and polling rate in real-time. Benchmark PS5, PS4, Xbox, and Switch controller latency. Online and free tool.',
        url: 'https://mygamepadtester.com/input-lag-test',
        type: 'website',
    }
}

export default function InputLagTestPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Controller Input Lag Test",
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
                "name": "What is controller input lag?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Input lag is the delay between pressing a button on your controller and the action registering on screen. For controllers this is typically caused by USB polling rate, Bluetooth latency, or slow firmware processing. Wired USB controllers typically poll at 125 Hz (8 ms intervals) while high-performance controllers can reach 1000 Hz (1 ms)."
                }
            },
            {
                "@type": "Question",
                "name": "Is wired or wireless better for input lag?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Wired (USB) connections consistently deliver lower and more stable latency. A wired Xbox or PlayStation controller typically averages 4–8 ms. Bluetooth introduces variability of 8–30 ms depending on the adapter and environment. For competitive gaming, wired is always recommended."
                }
            }
        ]
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": "Input Lag Test", "item": "https://mygamepadtester.com/input-lag-test" }
        ]
    }

    return (
        <>
            <Script id="software-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <InputLagClient />
        </>
    );
}
