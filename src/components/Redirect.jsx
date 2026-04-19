'use client'

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function Redirect({ to }) {
    const router = useRouter();

    useLayoutEffect(() => {
        router.replace(to);
    }, [router, to]);

    return (
        <>
            {/* Meta refresh as a fallback for SSR or search engines */}
            <head>
                <meta httpEquiv="refresh" content={`0;url=${to}`} />
                <link rel="canonical" href={`https://mygamepadtester.com${to}`} />
                <title>Redirecting...</title>
            </head>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Redirecting you to <a href={to}>{to}</a>...</p>
            </div>
        </>
    );
}
