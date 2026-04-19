'use client'

import dynamic from 'next/dynamic'

// Dynamic import with SSR to instantly deliver the visual layout (LCP boost)
const Main = dynamic(
    () => import('./Main'),
    {
        ssr: true
    }
)

export default function TesterWrapper() {
    return <Main />
}
