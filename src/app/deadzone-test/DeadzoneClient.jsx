'use client'

import React from 'react';
import styled from 'styled-components';
import DeadzoneTester from '@/components/Tools/DeadzoneTester';
import DeadzoneContent from '@/components/Tools/DeadzoneContent';

const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background: #fff;
`;

export default function DeadzoneClient() {
    return (
        <PageWrapper>
            {/* 🚀 Interactive Deadzone Tool */}
            <div style={{ padding: '1.5rem 0' }}>
               <DeadzoneTester />
            </div>

            {/* 📚 SEO & Educational Content */}
            <div style={{ background: '#fff', paddingBottom: '5rem' }}>
                <DeadzoneContent />
            </div>
        </PageWrapper>
    );
}
