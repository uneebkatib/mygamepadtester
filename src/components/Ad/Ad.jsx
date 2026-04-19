'use client'

import React, { useEffect, useRef, memo, useCallback, useState } from 'react';
import AdFacade from './AdFacade';
// Memoized Ad component for better performance (lazy loading removed to protect revenue)
const AdComponent = ({ type = 'inline', slotId, style = {} }) => {
  const adRef = useRef(null);
  const uniqueId = useRef(Math.random().toString(36).substr(2, 9));
  const hasLoadedRef = useRef(false);
  const [shouldRender, setShouldRender] = useState(false); // Start hidden to avoid placeholder
  const [isVisible, setIsVisible] = useState(false);

  // Set up ad loading - DEFERRED to prioritize LCP
  useEffect(() => {
    // Don't render ads in development or if disabled
    if (process.env.NODE_ENV === 'development') {
      setShouldRender(false);
      return;
    }

    // CRITICAL PERFORMANCE FIX: Defer ad loading by 3 seconds
    // This allows critical content (LCP) to load first
    const deferTimer = setTimeout(() => {
      setIsVisible(true);
      setShouldRender(true);
    }, 2000); // 2 second delay to prioritize page content

    return () => {
      clearTimeout(deferTimer);
    };
  }, []);

  // Callback function when ad is ready
  const handleAdReady = useCallback(() => {
    setShouldRender(true); // Show ad slot when ad system is ready
  }, []);

  useEffect(() => {
    // Load ad when visible
    if (isVisible) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        // Ad loading is now handled by AdFacade
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Different ad configurations based on type
  const adConfig = {
    inline: {
      'data-ad-slot': slotId || '3816511606',
      'data-ad-format': 'auto',
      'data-full-width-responsive': 'true'
    },
    top: {
      'data-ad-slot': slotId || '3816511606',
      'data-ad-format': 'auto',
      'data-full-width-responsive': 'true'
    },
    article: {
      'data-ad-slot': slotId || '3816511606',
      'data-ad-format': 'fluid',
      'data-full-width-responsive': 'true'
    }
  };

  const config = adConfig[type] || adConfig.inline;

  const getAdStyle = () => {
    const baseStyle = {
      textAlign: 'center',
      margin: type === 'top' ? '0 0 1rem 0' : '1rem 0',
      ...style
    };

    switch (type) {
      case 'top':
        return {
          ...baseStyle,
          minHeight: '90px',
          width: '100%',
          contain: 'layout style'
        };
      case 'article':
        return {
          ...baseStyle,
          minHeight: '100px',
          width: '100%',
          contain: 'layout style'
        };
      default:
        return {
          ...baseStyle,
          minHeight: '280px',
          width: '100%',
          contain: 'layout style'
        };
    }
  };

  // Always render the container to reserve space and fix CLS
  return (
    <div ref={adRef} style={getAdStyle()}>
      {shouldRender && (
        <AdFacade
          adFormat={config['data-ad-format']}
          onAdReady={handleAdReady}
          style={{
            display: 'block',
            width: '100%',
            minHeight: type === 'top' ? '90px' : type === 'article' ? '100px' : '280px',
            contain: 'layout style'
          }}
        />
      )}
    </div>
  );
};

// Export memoized component for better performance
export default memo(AdComponent, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return prevProps.type === nextProps.type &&
    prevProps.slotId === nextProps.slotId &&
    JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style);
});

