/**
 * Google Analytics Component
 * React component for managing Google Analytics lazy loading
 */

import React, { useEffect, useState } from 'react';
// Helmet removed - use Next.js metadata API
import analyticsUtils from '../../utils/analyticsUtils.js';

const GoogleAnalytics = ({ 
  strategy = 'idle', // Changed to 'idle' for better performance
  options = {}, 
  enablePerformanceTracking = false, // Disabled by default for faster load
  children 
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay GA loading until page is idle or user interacts
    const loadGA = () => {
      if (!shouldLoad) {
        setShouldLoad(true);
        analyticsUtils.initializeGA({
          strategy,
          options,
          enablePerformanceTracking
        });
        setIsInitialized(true);
      }
    };

    // Load GA after 3 seconds or on first user interaction
    const timeout = setTimeout(loadGA, 3000);
    
    const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
    const handleInteraction = () => {
      clearTimeout(timeout);
      loadGA();
      events.forEach(event => window.removeEventListener(event, handleInteraction));
    };

    events.forEach(event => window.addEventListener(event, handleInteraction, { passive: true, once: true }));

    return () => {
      clearTimeout(timeout);
      events.forEach(event => window.removeEventListener(event, handleInteraction));
    };
  }, [strategy, options, enablePerformanceTracking, shouldLoad]);

  // Only load GA script after user interaction
  if (!shouldLoad) {
    return children || null;
  }

  // Optional: Render children with GA script
  if (children) {
    return (
      <>
        {children}
        {/* Google Analytics meta tags for better tracking */}
        {/* Schema moved to Next.js metadata */}
      </>
    );
  }

  return null;
};

export default GoogleAnalytics;
