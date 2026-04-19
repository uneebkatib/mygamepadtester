'use client'

import React from 'react';
import styled from 'styled-components';
import InputLagTester from '@/components/Tools/InputLagTester';
import InputLagContent from '@/components/Tools/InputLagContent';

const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background: #fff;
`;

const ContentSection = styled.div`
  background: #fff;
  padding-bottom: 5rem;
`;

export default function InputLagClient() {
    return (
        <PageWrapper>
            {/* 🚀 Interactive Tool Section */}
            <div style={{ padding: '1rem 0' }}>
               <InputLagTester />
            </div>

            {/* 📚 SEO Content Section */}
            <ContentSection>
                <InputLagContent />
            </ContentSection>
        </PageWrapper>
    );
}
