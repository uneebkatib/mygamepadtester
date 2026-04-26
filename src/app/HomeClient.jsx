'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Main from '@/components/Main/Main';
import { MainPageInfo } from '@/components/MainPageInfo/MainPageInfo';
import Partners from '@/components/Partners/Partners';
import TopControllersPreview from '@/components/MainPageInfo/TopControllersPreview';

export default function HomeClient() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'stretch'
        }}>
            {/* Gamepad Testing Tool Section */}
            <section aria-label="Gamepad Testing Tool">
                <Main />
            </section>

            {/* Global Telemetry Preview Section — below the fold; defer rendering */}
            {/* containIntrinsicSize matches the actual rendered height so contentVisibility
                does not cause a layout shift when the element enters the viewport. */}
            <section aria-label="Global Analytics Preview" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 480px' }}>
                <TopControllersPreview />
            </section>

            {/* Partners Section — below the fold; defer rendering */}
            <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 220px' }}>
                <Partners />
            </section>

            {/* Article Content Section — contentVisibility removed because the reserved
                size (800 px) was far smaller than the actual rendered height (~14 500 px),
                causing a large layout shift (CLS 0.11) when the browser un-skipped the
                element on first scroll.  The article loads progressively via its own
                lazy-loaded sub-components, so no explicit deferral wrapper is needed. */}
            <article>
                <MainPageInfo />
            </article>
        </div>
    );
}
