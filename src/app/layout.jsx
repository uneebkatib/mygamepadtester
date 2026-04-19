import ClientLayout from './ClientLayout'
import localFont from 'next/font/local'
import Script from 'next/script'

const inter = localFont({
    src: '../fonts/Inter-latin.woff2',
    // 'optional': browser gives the font a very short block period (0–100 ms); if the font
    // has not started loading by then, the browser renders with the fallback (Arial) and does
    // NOT swap later. This eliminates the late font-swap layout shift (CLS) that 'swap' causes
    // on slow 4G connections where the 50 KB woff2 takes 2–3 s to arrive.
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
                {/*
                  * Global base styles – inlined to eliminate the render-blocking external CSS
                  * request that was previously emitted for src/styles/globals.css (1.8 KB gzip,
                  * ~160 ms RTT on slow 4G). The source files for these rules are kept at:
                  *   • src/styles/globals.css  – reset, typography, button/input base styles
                  *   • src/app/globals.css     – CSS custom properties, .theme-ready transitions
                  * When editing these styles, update the corresponding source file so the
                  * readable version stays in sync.
                  */}
                <style dangerouslySetInnerHTML={{
                    __html: `
/* === CSS custom properties (formerly in src/app/globals.css) === */
:root{--background:#FAF9F5;--background-light:#FFFFFF;--background-dark:#F8F7F4;--surface:#F8F7F4;--surface-hover:#F2F1ED;--foreground:#000000;--foreground-secondary:#444444;--foreground-muted:#666666;--border:#E5E3DE;--border-light:#F0EFEB;--primary:#DA7756;--primary-hover:#C15F3C;--accent:#1C6BBB;--success:#10B981;--warning:#F59E0B;--error:#EF4444;--shadow:rgba(31,30,29,0.1);color-scheme:light;--primary-color:#DA7756;--background-color:#FAF9F5;--text-color:#1A1A1A;--font-family:var(--font-inter),-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto',sans-serif;}
/* === Base reset (formerly in src/styles/globals.css) === */
*{box-sizing:border-box;margin:0;padding:0;}
html,body{max-width:100vw;overflow-x:hidden;}
/* === Body === */
body{font-family:var(--font-family,'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto',sans-serif);background:var(--background,#FAF9F5);color:var(--foreground,#000000);min-height:100vh;line-height:1.6;font-weight:400;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-image:radial-gradient(circle at 25% 25%,rgba(218,119,86,.03) 0%,transparent 50%),radial-gradient(circle at 75% 75%,rgba(28,107,187,.02) 0%,transparent 50%);-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;touch-action:manipulation;}
/* === Typography === */
h1,h2,h3{font-weight:700;color:#000000;margin-bottom:.5rem;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto',sans-serif;}
h1{font-size:2rem;}h2{font-size:1.5rem;}h3{font-size:1.25rem;}
/* === Links === */
a{text-decoration:none;cursor:pointer;color:inherit;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto',sans-serif;}
/* === Buttons === */
button{cursor:pointer;font-family:inherit;border:none;background:none;outline:none;}
button:focus-visible{outline:2px solid #DA7756;outline-offset:2px;box-shadow:0 0 0 4px rgba(218,119,86,.15);}
/* === Inputs === */
input,select,textarea{font-family:inherit;background:#FFFFFF;border:2px solid #E5E3DE;border-radius:8px;color:#000000;padding:.75rem;font-size:.95rem;}
input:focus,select:focus,textarea:focus{outline:none;border-color:#DA7756;box-shadow:0 0 0 3px rgba(218,119,86,.1);background:#FFFFFF;}
input::placeholder,textarea::placeholder{color:#555555;}
input:hover,select:hover,textarea:hover{border-color:#D1CFC8;}
select option{background:#FFFFFF;color:#1A1A1A;padding:.5rem;}
/* === Focus === */
:focus-visible{outline:2px solid var(--primary,#DA7756);outline-offset:2px;}
/* === Scrollbar === */
::-webkit-scrollbar{width:8px;height:8px;}
::-webkit-scrollbar-track{background:var(--background-dark,#F8F7F4);}
::-webkit-scrollbar-thumb{background:var(--border,#E5E3DE);border-radius:4px;}
::-webkit-scrollbar-thumb:hover{background:var(--foreground-muted,#666666);}
/* === Theme transitions — only after hydration (.theme-ready added by ThemeContext) === */
.theme-ready *,.theme-ready *::before,.theme-ready *::after{transition:background-color .2s ease,border-color .2s ease,color .15s ease;}
/* === Mobile === */
@media(max-width:768px){body{font-size:16px;}html{font-size:clamp(14px,1vw + .5rem,18px);}h1{font-size:clamp(1.8rem,5vw,2.5rem);}h2{font-size:clamp(1.5rem,4vw,2rem);}h3{font-size:clamp(1.2rem,3vw,1.5rem);}img,picture,video{max-width:100%;height:auto;display:block;}button,a,input,select{min-height:48px;min-width:48px;padding:.75rem 1rem;}html{scroll-behavior:smooth;}}
@media(max-width:480px){h1{font-size:1.5rem;}h2{font-size:1.25rem;}h3{font-size:1.1rem;}button,a,input,select{min-height:48px;min-width:48px;padding:.8rem 1.2rem;}body{font-size:15px;}}
@media(max-height:500px) and (orientation:landscape){body{font-size:14px;}}
@media(prefers-contrast:high){body{background:#FFFFFF;color:#000000;}a,button{border:1px solid #000000;}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;}body{scroll-behavior:auto;}}
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
