'use client'

import React from "react";
import styled from "styled-components";
import Link from "next/link";

const GuidesContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
`;

const Breadcrumbs = styled.div`
  margin-bottom: 2rem;
  font-size: 0.95rem;
  color: #64748b;

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

const GuideHeader = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

const Meta = styled.div`
  color: #64748b;
  font-size: 0.95rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GuideContent = styled.article`
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

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 1rem;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
  }

  th {
    background: #fdf2ef;
    color: #1e293b;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1.05rem;
    
    table {
        display: block;
        overflow-x: auto;
    }
  }
`;

const GuideLayout = ({ title, breadcrumbs, children, lastUpdated }) => {
  return (
    <GuidesContainer>
      <Breadcrumbs>
        <Link href="/">Home</Link>
        {breadcrumbs && breadcrumbs.map((bc, i) => (
          <React.Fragment key={i}>
            <span>/</span>
            {bc.href ? <Link href={bc.href}>{bc.label}</Link> : <span className="current">{bc.label}</span>}
          </React.Fragment>
        ))}
        <span>/</span>
        <span className="current">{title}</span>
      </Breadcrumbs>

      <GuideHeader>
        <Title>{title}</Title>
      </GuideHeader>

      <GuideContent>
        {children}
      </GuideContent>
    </GuidesContainer>
  );
};

export default GuideLayout;
