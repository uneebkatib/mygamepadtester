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
            <section aria-label="Global Analytics Preview" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}>
                <TopControllersPreview />
            </section>

            {/* Partners Section — below the fold; defer rendering */}
            <section style={{ contentVisibility: 'auto', containIntrinsicSize: '0 200px' }}>
                <Partners />
            </section>

            {/* Article Content Section — below the fold; defer rendering */}
            <article style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}>
                <MainPageInfo />
            </article>
        </div>
    );
}
