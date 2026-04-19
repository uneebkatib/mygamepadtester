'use client'

import React, { useState, useEffect } from 'react';

/**
 * AdFacade Component
 * Provides a placeholder for ads that loads the actual ad script only after page load
 * This prevents ad scripts from blocking critical resources and improves Core Web Vitals
 */
const AdFacade = ({ className = '', style = {}, adFormat = 'auto', onAdReady = () => { } }) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // Load ad script only once globally to prevent conflicts
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadAdScript = () => {
      // Check if adsbygoogle is already loaded globally
      if (window.adsbygoogle && window._adScriptLoaded) {
        setAdLoaded(true);
        setShowPlaceholder(false);
        onAdReady(); // Notify parent that ad is ready
        return;
      }

      // Check if script is already loading
      if (window._adScriptLoading) {
        // Wait for script to load
        const checkScript = setInterval(() => {
          if (window._adScriptLoaded) {
            clearInterval(checkScript);
            setAdLoaded(true);
            setShowPlaceholder(false);
            onAdReady();
          }
        }, 100);
        return () => clearInterval(checkScript);
      }

      // Mark script as loading
      window._adScriptLoading = true;

      // Create and load adsbygoogle script
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.onload = () => {
        // Mark script as loaded globally
        window._adScriptLoaded = true;
        window._adScriptLoading = false;
        setAdLoaded(true);
        setShowPlaceholder(false);
        onAdReady(); // Notify parent that ad is ready
      };
      script.onerror = () => {
        window._adScriptLoading = false;
        setShowPlaceholder(false);
        console.error('Ad script failed to load');
      };

      document.head.appendChild(script);
    };

    // Load ad script
    loadAdScript();
  }, [onAdReady]);

  // Generate unique ID for ad slot
  const uniqueId = React.useRef(`ad-${Math.random().toString(36).substr(2, 9)}`);
  const [hasPushed, setHasPushed] = useState(false);

  if (showPlaceholder) {
    // Don't render anything while loading to avoid placeholder
    return null;
  }

  if (adLoaded && !hasPushed) {
    // Only push ad once per component instance
    setTimeout(() => {
      if (window.adsbygoogle && !hasPushed) {
        window.adsbygoogle.push({});
        setHasPushed(true);
      }
    }, 100);

    return (
      <ins
        key={uniqueId.current}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          ...style
        }}
        data-ad-client="ca-pub-3152466698030918"
        data-ad-slot="3816511606"
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    );
  }

  if (hasPushed) {
    // Return the ad element without pushing again
    return (
      <ins
        key={uniqueId.current}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          ...style
        }}
        data-ad-client="ca-pub-3152466698030918"
        data-ad-slot="3816511606"
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    );
  }

  return null;
};

export default AdFacade;

