'use client'

import styled, { keyframes } from "styled-components";
import { Theme } from "@/styles/Theme";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StyledArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 2rem;
  width: 95%;
  max-width: 800px;
  border-top: 3px solid ${Theme.interface};
  background: linear-gradient(135deg, ${Theme.backgroundLight}, ${Theme.surface});
  border: 2px solid ${Theme.border};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px ${Theme.shadowMedium};

  h1 {
    // Use it for NOTE or other important info
    color: ${Theme.disconnected};
    margin: 1rem 0;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    background: linear-gradient(135deg, ${Theme.primary}, ${Theme.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h2 {
    color: ${Theme.black};
    margin: 1.5rem 0 1rem 0;
    text-align: left;
    font-size: 1.5rem;
    font-weight: 600;
    border-bottom: 2px solid ${Theme.primary};
    padding-bottom: 0.5rem;
  }

  h3 {
    color: ${Theme.textPrimary};
    margin: 1.2rem 0 0.8rem 0;
    text-align: left;
    font-size: 1.3rem;
    font-weight: 600;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2rem auto;
    display: block;
    box-shadow: 0 8px 30px ${Theme.shadowMedium};
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid ${Theme.borderLight};

    &:hover {
      transform: scale(1.015);
      box-shadow: 0 12px 40px ${Theme.shadowHeavy};
    }
  }

  /* Hero Image - Optimized for impact without being overwhelming */
  .hero-container {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 auto 2.5rem auto; /* Centered */
    box-shadow: 0 15px 45px ${Theme.shadowMedium};
    border: 1px solid ${Theme.border};
    background: ${Theme.surface};
    aspect-ratio: 21 / 9; /* Wider, more cinematic banner */
    width: 100%;
    max-width: 750px; /* Limit width on PC to prevent overwhelming size */
    max-height: 320px;

    img {
      width: 100%;
      height: 100%;
      margin: 0;
      border: none;
      border-radius: 0;
      object-fit: cover;
      display: block;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%);
      pointer-events: none;
    }
  }

  /* Small/Icon images - for tools or single components */
  .img-small {
    max-width: 260px;
    margin: 1.5rem auto;
    box-shadow: 0 4px 20px ${Theme.shadow};
  }

  /* Regular content images - standard for guides */
  .img-regular {
    max-width: 650px; /* Reduced from 800px for better balance */
    margin: 2rem auto;
  }

  /* Full width images */
  .img-full {
    max-width: 100%;
    margin: 3rem auto;
  }

  p,
  li {
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${Theme.textPrimary};
  }

  p {
    margin-bottom: 1rem;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  ol {
    li {
      text-align: left;
      list-style-type: decimal;
      margin: 0.5rem 2rem;
    }
  }

  table {
    border: 1px solid ${Theme.interface};
    width: 100%;
    margin: 1rem 0;
    border-collapse: collapse;

    td, th {
      border-top: 1px solid ${Theme.interface};
      padding: 0.75rem;
      text-align: left;
    }
    
    th {
      background: ${Theme.surface};
      font-weight: 600;
    }
  }

  .gallery {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    img {
      margin-top: 1rem;
      max-width: 80%;
      border-radius: 1rem;
    }
  }
  
  a {
    color: ${Theme.primary};
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  strong {
    color: ${Theme.primary};
  }
`;