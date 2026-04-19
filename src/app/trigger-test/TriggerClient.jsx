'use client'

import React from 'react';
import styled from 'styled-components';
import TriggerTester from '@/components/Tools/TriggerTester';
import TriggerContent from '@/components/Tools/TriggerContent';

const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  background: #fff;
`;

const ContentSection = styled.div`
  background: #fff;
  padding-bottom: 5rem;
`;

export default function TriggerClient() {
    return (
        <PageWrapper>
            {/* 🚀 Interactive Tool Section */}
            <div style={{ padding: '1rem 0' }}>
               <TriggerTester />
            </div>

            {/* 📚 SEO Content Section */}
            <ContentSection>
                <TriggerContent />
            </ContentSection>
        </PageWrapper>
    );
}
