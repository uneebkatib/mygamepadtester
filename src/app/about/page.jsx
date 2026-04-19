import AboutClient from './Client'
import Script from 'next/script'
import en from '@/locales/en.json';

export const metadata = {
    title: `${en.about?.title || 'About Us'} | MyGamepadTester`,
    alternates: {
        canonical: 'https://mygamepadtester.com/about',
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
