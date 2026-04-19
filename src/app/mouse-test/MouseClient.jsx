'use client'

import React from 'react';
import styled from 'styled-components';
import MouseTester from '@/components/Tools/MouseTester';
import MouseContent from '@/components/Tools/MouseContent';

const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background: #fff;
`;

export default function MouseClient() {
    return (
        <PageWrapper>
            {/* 🖱️ Interactive Mouse Tool */}
            <div style={{ padding: '1.5rem 0' }}>
               <MouseTester />
            </div>

            {/* 📚 SEO & Educational Content */}
            <div style={{ background: '#fff', paddingBottom: '5rem' }}>
                <MouseContent />
            </div>
        </PageWrapper>
    );
}
