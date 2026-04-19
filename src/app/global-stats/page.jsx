import GlobalStatsClient from './Client'
import Script from 'next/script'

export const metadata = {
  title: 'Global Controller Stats | MyGamepadTester',
  description: 'Live global database of controller health, drift failures, and latency tests from thousands of users.',
  alternates: {
    canonical: 'https://mygamepadtester.com/global-stats',
  },
  openGraph: {
    title: 'Global Controller Stats | MyGamepadTester',
    description: 'Live global database of controller health, drift failures, and latency tests from thousands of users worldwide.',
    url: 'https://mygamepadtester.com/global-stats',
    type: 'website',
  },
}

export default function GlobalStatsPage() {
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Global Gamepad Controller Health Statistics",
    "description": "Aggregated anonymized data on controller drift, button failures, and latency readings from MyGamepadTester users worldwide.",
    "url": "https://mygamepadtester.com/global-stats",
    "creator": {
      "@type": "Organization",
      "name": "MyGamepadTester",
      "url": "https://mygamepadtester.com"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mygamepadtester.com/" },
      { "@type": "ListItem", "position": 2, "name": "Global Stats", "item": "https://mygamepadtester.com/global-stats" }
    ]
  }

  return (
    <>
      <Script id="dataset-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GlobalStatsClient />
    </>
  );
}
