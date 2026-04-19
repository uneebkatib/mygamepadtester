import AboutClient from './Client'
import Script from 'next/script'
import en from '@/locales/en.json';

export const metadata = {
    title: `${en.about?.title || 'About Us'} | MyGamepadTester`,
    description: 'Learn about MyGamepadTester — the free browser-based tool for testing PS5, Xbox, Switch, and PC controllers. Built by Uneeb Katib to help gamers diagnose drift and hardware issues.',
    alternates: {
        canonical: 'https://mygamepadtester.com/about',
    },
    openGraph: {
        title: `${en.about?.title || 'About Us'} | MyGamepadTester`,
        description: 'Learn about MyGamepadTester — the free browser-based tool for testing PS5, Xbox, Switch, and PC controllers.',
        url: 'https://mygamepadtester.com/about',
        type: 'website',
    },
}

export default function AboutPage() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MyGamepadTester",
        "url": "https://mygamepadtester.com",
        "logo": "https://mygamepadtester.com/logo.png",
        "description": en.about?.mainIntro || "Free online gamepad testing and calibration tools for PS5, PS4, Xbox, Switch, and PC controllers."
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
            { "@type": "ListItem", "position": 2, "name": en.about?.title || "About", "item": "https://mygamepadtester.com/about" }
        ]
    }

    return (
        <>
            <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <AboutClient />
        </>
    )
}
