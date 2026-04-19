'use client'

import Link from "next/link";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";
import React, { Suspense } from 'react';
// Optimized individual icon imports to reduce bundle size
import { FaHome, FaExclamationTriangle, FaGamepad } from "react-icons/fa";

// Lazy load Ad component
const Ad = React.lazy(() => import("../Ad/Ad"));

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, ${Theme.backgroundDark} 0%, ${Theme.backgroundLight} 100%);
  border-radius: 16px;
  margin: 2rem;

  border: 1px solid ${Theme.border};

  h1 {
    font-size: 4rem;
    color: ${Theme.primary};
    margin-bottom: 1rem;
    text-shadow: 0 0 10px ${Theme.glow};
  }

  h2 {
    font-size: 2rem;
    color: ${Theme.textPrimary};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: ${Theme.textSecondary};
    margin-bottom: 2rem;
    max-width: 600px;
    line-height: 1.6;
  }

  .error-code {
    font-size: 1.5rem;
    color: ${Theme.accent};
    font-weight: bold;
    margin: 1rem 0;
  }

  .home-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, ${Theme.primary} 0%, ${Theme.accent} 100%);
    color: ${Theme.white};
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.1rem;
    transition: all 0.3s ease;
      &:hover {
      transform: translateY(-3px);
    }
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
    
    h1 {
      font-size: 3rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

export function ErrorPage() {
  const error = useRouteError();
  console.error("ErrorPage received error:", error);

  // Safely extract error information without causing additional errors
  let errorMessage = "An unexpected error occurred";

  try {
    if (error) {
      if (error.status === 404) {
        errorMessage = "Page not found";
      } else if (typeof error.statusText === 'string') {
        errorMessage = error.statusText;
      } else if (typeof error.message === 'string') {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else {
        // Try to convert to string safely
        errorMessage = String(error);
        // If String() doesn't work, use a generic message
        if (errorMessage === '[object Object]') {
          errorMessage = "An unknown error occurred";
        }
      }
    }
  } catch (e) {
    console.error("Error processing error object:", e);
    errorMessage = "An unknown error occurred";
  }

  return (
    <ErrorContainer>
      <FaExclamationTriangle />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        Oops! The page you're looking for doesn't exist or has been moved.
        Don't worry, you can return to our homepage and continue testing your gamepad.
      </p>
      <div className="error-code">
        <i>{errorMessage}</i>
      </div>

      {/* Ad for error page */}
      <div style={{ width: '100%', maxWidth: '600px', margin: '1rem 0' }}>
        <Suspense fallback={null}>
          <Ad type="article" />
        </Suspense>
      </div>

      <Link to="/" className="home-link">
        <FaHome /> Return to Homepage
      </Link>
    </ErrorContainer>
  );
}