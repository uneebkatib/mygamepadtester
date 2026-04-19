"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";

const ToolPageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
`;

const Breadcrumbs = styled.div`
  margin-bottom: 2rem;
  font-size: 0.95rem;
  color: #64748b;
  max-width: 1200px;
  margin: 0 auto 2rem;

  a {
    color: #DA7756;
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }

  span {
    margin: 0 8px;
    color: #cbd5e1;
  }

  .current {
    color: #1e293b;
    font-weight: 600;
  }
`;

const ToolHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  max-width: 900px;
  margin: 0 auto 3rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

const ToolArea = styled.div`
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
`;

const ContentBelowTool = styled.article`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid #f1f5f9;
  line-height: 1.8;
  font-size: 1.125rem;
  color: #334155;

  h2 {
    font-size: 1.75rem;
    color: #1e293b;
    margin: 2.5rem 0 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #fdf2ef;
    
    &:first-child {
        margin-top: 0;
    }
  }

  h3 {
    font-size: 1.4rem;
    color: #334155;
    margin: 2rem 0 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.75rem;
  }

  strong {
    color: #1e293b;
  }
`;

const ToolLayout = ({ title, description, children, content }) => {
  return (
    <ToolPageContainer>
      <ToolArea>
        {children}
      </ToolArea>

      <ContentBelowTool>
        <Breadcrumbs>
          <Link href="/">Home</Link>
          <span>/</span>
          <span className="current">{title}</span>
        </Breadcrumbs>

        <ToolHeader style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
          <Title style={{ fontSize: '2.4rem' }}>{title}</Title>
          {description && (
            <p style={{ fontSize: '1.15rem', color: '#4a5568', lineHeight: '1.7', marginTop: '1rem' }}>
              {description}
            </p>
          )}
        </ToolHeader>

        {content}
      </ContentBelowTool>
    </ToolPageContainer>
  );
};

export default ToolLayout;
