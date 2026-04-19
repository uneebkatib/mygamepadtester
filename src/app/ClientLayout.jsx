'use client'

import { Navbar } from '@/components/Navbar/Navbar'
import { Footer } from '@/components/Footer/Footer'
import StyledComponentsRegistry from '@/lib/registry'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { I18nProvider } from '@/contexts/I18nContext'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Ad = dynamic(
    () => import('@/components/Ad/Ad'),
    { ssr: false, loading: () => null }
);

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isWidget = pathname === '/widget' || pathname?.startsWith('/widget/');

    return (
        <I18nProvider>
            <ThemeProvider>
                <StyledComponentsRegistry>
                    <div style={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {!isWidget && <Navbar />}
                        
                        {/* 📢 GLOBAL TOP AD (EXCEPT IN WIDGET MODE) */}
                        {!isWidget && (
                            <Suspense fallback={null}>
                                <div style={{ width: '100%', maxWidth: '1200px', margin: '1rem auto 0 auto', padding: '0 1rem' }}>
                                    <Ad type="top" />
                                </div>
                            </Suspense>
                        )}

                        <main style={{
                            flex: 1,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: isWidget ? 'transparent' : 'inherit'
                        }}>
                            {children}
                        </main>
                        {!isWidget && <Footer />}
                    </div>
                </StyledComponentsRegistry>
            </ThemeProvider>
        </I18nProvider>
    )
}
