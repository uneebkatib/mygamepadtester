'use client'

import React from 'react';
import styled from 'styled-components';
import KeyboardTester from '@/components/Tools/KeyboardTester';
import KeyboardContent from '@/components/Tools/KeyboardContent';

const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background: #fff;
`;

export default function KeyboardClient() {
    return (
        <PageWrapper>
            {/* ⌨️ Interactive Keyboard Tool */}
            <div style={{ padding: '1.5rem 0' }}>
               <KeyboardTester />
            </div>

            {/* 📚 SEO & Educational Content */}
            <div style={{ background: '#fff', paddingBottom: '5rem' }}>
                <KeyboardContent />
            </div>
        </PageWrapper>
    );
}
