import React, { useEffect, useState, useCallback, useMemo } from 'react';

// Only import web-vitals in development to avoid production overhead
let webVitals = null;

if (process.env.NODE_ENV === 'development') {
  import('web-vitals').then(imported => {
    webVitals = imported;
  }).catch(() => {
    webVitals = null;
  });
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Track Web Vitals metrics efficiently
  const trackMetric = useCallback((metric) => {
    setMetrics(prev => ({
      ...prev,
      [metric.name]: {
        value: Math.round(metric.value),
        rating: metric.rating,
        delta: Math.round(metric.delta)
      }
    }));
  }, []);

  useEffect(() => {
    // Only run in development mode and if web-vitals is available
    if (process.env.NODE_ENV === 'development' && webVitals) {
      // Track all Web Vitals with minimal overhead
      webVitals.getCLS?.(trackMetric);
      webVitals.getFID?.(trackMetric);
      webVitals.getFCP?.(trackMetric);
      webVitals.getLCP?.(trackMetric);
      webVitals.getTTFB?.(trackMetric);

      // Also subscribe to real-time updates
      const unsubscribeCLS = webVitals.onCLS?.(trackMetric);
      const unsubscribeFID = webVitals.onFID?.(trackMetric);
      const unsubscribeFCP = webVitals.onFCP?.(trackMetric);
      const unsubscribeLCP = webVitals.onLCP?.(trackMetric);
      const unsubscribeTTFB = webVitals.onTTFB?.(trackMetric);

      return () => {
        unsubscribeCLS?.();
        unsubscribeFID?.();
        unsubscribeFCP?.();
        unsubscribeLCP?.();
        unsubscribeTTFB?.();
      };
    }
  }, [trackMetric]);

  // Toggle visibility with keyboard shortcut - optimized
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Memoize the metrics display for performance
  const metricsDisplay = useMemo(() => {
    return Object.entries(metrics).map(([name, data]) => (
      <div key={name} style={{ marginBottom: '4px' }}>
        <span style={{ 
          color: data.rating === 'good' ? '#4CAF50' : 
                 data.rating === 'needs-improvement' ? '#FF9800' : '#F44336',
          fontWeight: data.rating === 'good' ? 'bold' : 'normal'
        }}>
          {name}: {data.value}ms ({data.rating})
        </span>
      </div>
    ));
  }, [metrics]);

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.85)',
      color: 'white',
      padding: '8px',
      borderRadius: '6px',
      fontSize: '11px',
      fontFamily: 'monospace, monospace',
      zIndex: 9999,
      maxWidth: '280px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <strong style={{ fontSize: '12px' }}>Performance</strong>
        <button 
          onClick={() => setIsVisible(false)}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer',
            fontSize: '14px',
            lineHeight: '1',
            padding: '2px'
          }}
          aria-label="Close performance monitor"
        >
          ✕
        </button>
      </div>
      
      {metricsDisplay}
      
      <div style={{ marginTop: '6px', fontSize: '9px', color: '#ccc', lineHeight: '1.2' }}>
        Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;
export { PerformanceMonitor };
