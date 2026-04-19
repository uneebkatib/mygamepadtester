import '@/styles/globals.css'
import ClientLayout from './ClientLayout'
import localFont from 'next/font/local'
import Script from 'next/script'

const inter = localFont({
    src: '../fonts/Inter-latin.woff2',
    // 'optional' gives the font a 100 ms block window then stops waiting;
    // this eliminates the late font-swap layout shift (CLS) seen on slow 4G connections.
    display: 'optional',
    variable: '--font-inter',
    preload: true,
})

export const metadata = {
    title: 'Free Gamepad Tester – PS5, Xbox, Switch & PC Online',
    description: 'Test any PS5, Xbox, Switch or PC controller for stick drift, button response and trigger accuracy. Free, instant, no download. Works in Chrome and Edge.',
    metadataBase: new URL('https://mygamepadtester.com'),
    openGraph: {
        siteName: 'MyGamepadTester',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: '/og-images/homepage.png',
                width: 1200,
                height: 630,
                alt: 'MyGamepadTester – Free Online Gamepad Tester',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@mygamepadtester',
        creator: '@uneebkatib',
        images: ['/og-images/homepage.png'],
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://www.google-analytics.com" />
                <style dangerouslySetInnerHTML={{
                    __html: `
                        :root {
                            --primary-color: #DA7756;
                            --background-color: #FAF9F5;
                            --text-color: #1A1A1A;
                            --font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                        }
                        body {
                            font-family: var(--font-family);
                            background: var(--background-color);
                            color: var(--text-color);
                            margin: 0;
                            padding: 0;
                        }
                    `
                }} />
            </head>
            <body className={inter.className}>
                <ClientLayout>{children}</ClientLayout>

                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-765PK89FYV"
                    strategy="lazyOnload"
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-765PK89FYV');
                    `}
                </Script>

                <Script id="person-schema" type="application/ld+json" strategy="afterInteractive">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Uneeb Katib",
                        "url": "https://mygamepadtester.com/",
                        "jobTitle": "Lead Developer & Hardware Analyst",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "MyGamepadTester"
                        },
                        "sameAs": [
                            "https://www.linkedin.com/in/uneebkatib",
                            "https://github.com/uneebkatib"
                        ]
                    })}
                </Script>
                <Script id="website-global-schema" type="application/ld+json" strategy="afterInteractive">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "MyGamepadTester",
                        "url": "https://mygamepadtester.com",
                        "description": "Free online gamepad testing tools for PS5, Xbox, Switch and PC controllers."
                    })}
                </Script>
            </body>
        </html>
    );
}
