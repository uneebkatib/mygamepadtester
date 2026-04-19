import React, { useEffect } from 'react';
import { preloadImage, preloadImages } from '../utils/imageOptimizer.js';

/**
 * Critical Resources Component
 * Handles preloading of critical resources for improved Core Web Vitals
 * Optimized to reduce initial load time
 */
const CriticalResources = () => {
  // Remove image preloading - let browser handle lazy loading
  // Critical images should use loading="eager" attribute instead

  // Only preconnect to the MOST critical domains (max 2-3)
  const criticalResources = [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    }
    // Removed ads preconnect - load after interaction instead
  ];

  // Preconnect links moved to index.html for faster loading
  // useEffect(() => { ... }, []);

  // Simplified critical CSS - only what's absolutely needed
  useEffect(() => {
    const criticalCSS = `
      /* Reduce layout shifts */
      * { box-sizing: border-box; }
      body { margin: 0; padding: 0; }
      img { max-width: 100%; height: auto; }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.id = 'critical-css';
    document.head.appendChild(style);

    return () => {
      const criticalStyle = document.getElementById('critical-css');
      if (criticalStyle) criticalStyle.remove();
    };
  }, []);


  return null; // This component only handles resource optimization
};

export default CriticalResources;
