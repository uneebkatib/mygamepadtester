/**
 * Google Analytics Lazy Loading Utility
 * Provides sophisticated lazy loading for Google Analytics with user experience optimization
 */

// Google Analytics configuration
const GA_CONFIG = {
  MEASUREMENT_ID: 'G-765PK89FYV',
  // Load strategies
  STRATEGIES: {
    INTERACTION: 'interaction', // Load on first user interaction
    TIME: 'time', // Load after time delay
    VISIBLE: 'visible', // Load when element becomes visible
    CUSTOM: 'custom' // Custom loading logic
  }
};

// Track if GA has been loaded to prevent multiple loads
let isGALoaded = false;
let loadPromise = null;

/**
 * Creates and loads the Google Analytics script
 * @returns {Promise} Promise that resolves when GA is loaded
 */
function loadGAScript() {
  return new Promise((resolve, reject) => {
    if (isGALoaded) {
      resolve();
      return;
    }

    try {
      // Create the gtag script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_CONFIG.MEASUREMENT_ID}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', GA_CONFIG.MEASUREMENT_ID, {
          // Enhanced measurement settings
          send_page_view: false, // We'll send manually after load
          anonymize_ip: true, // Privacy compliance
          cookie_flags: 'SameSite=None;Secure' // Cross-site cookie support
        });
        
        isGALoaded = true;
        resolve();
      };
      
      script.onerror = reject;
      document.head.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Loads Google Analytics with specified strategy
 * @param {string} strategy - Loading strategy to use
 * @param {Object} options - Strategy-specific options
 * @returns {Promise} Promise that resolves when GA is loaded
 */
async function loadGA(strategy = GA_CONFIG.STRATEGIES.TIME, options = {}) {
  if (isGALoaded) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    try {
      switch (strategy) {
        case GA_CONFIG.STRATEGIES.INTERACTION:
          await loadOnInteraction(options);
          break;
        case GA_CONFIG.STRATEGIES.TIME:
          await loadOnTime(options);
          break;
        case GA_CONFIG.STRATEGIES.VISIBLE:
          await loadOnVisible(options);
          break;
        case GA_CONFIG.STRATEGIES.CUSTOM:
          await loadOnCustom(options);
          break;
        default:
          await loadOnTime(options);
      }
      
      // Send initial page view after GA is loaded
      if (window.gtag) {
        window.gtag('config', GA_CONFIG.MEASUREMENT_ID, {
          send_page_view: true
        });
      }
    } catch (error) {
      console.warn('Google Analytics load failed:', error);
      // Don't reject - just log the error and continue
    }
  })();

  return loadPromise;
}

/**
 * Load GA on first user interaction
 */
function loadOnInteraction(options = {}) {
  return new Promise((resolve) => {
    const timeout = options.timeout || 10000; // 10s timeout
    let resolved = false;
    
    const events = ['click', 'scroll', 'keydown', 'touchstart'];
    
    const cleanup = () => {
      if (resolved) return;
      resolved = true;
      
      events.forEach(event => {
        document.removeEventListener(event, handler);
      });
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      loadGAScript().then(resolve);
    };
    
    const handler = () => cleanup();
    const timeoutId = setTimeout(cleanup, timeout);
    
    events.forEach(event => {
      document.addEventListener(event, handler, { once: true, passive: true });
    });
  });
}

/**
 * Load GA after time delay
 */
function loadOnTime(options = {}) {
  return new Promise((resolve) => {
    const delay = options.delay || 3000; // 3s default
    
    setTimeout(() => {
      loadGAScript().then(resolve);
    }, delay);
  });
}

/**
 * Load GA when specific element becomes visible
 */
function loadOnVisible(options = {}) {
  return new Promise((resolve) => {
    const selector = options.selector || 'body';
    const threshold = options.threshold || 0.1; // 10% visibility
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.disconnect();
            loadGAScript().then(resolve);
          }
        });
      }, { threshold });
      
      const target = document.querySelector(selector);
      if (target) {
        observer.observe(target);
      } else {
        // Fallback to time-based loading
        setTimeout(() => loadGAScript().then(resolve), 1000);
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setTimeout(() => loadGAScript().then(resolve), 1000);
    }
  });
}

/**
 * Load GA with custom logic
 */
function loadOnCustom(options = {}) {
  return new Promise((resolve) => {
    if (options.condition && options.condition()) {
      loadGAScript().then(resolve);
    } else if (options.promise) {
      options.promise.then(() => loadGAScript().then(resolve));
    } else {
      // Fallback to time-based loading
      setTimeout(() => loadGAScript().then(resolve), 1000);
    }
  });
}

/**
 * Send event to Google Analytics (safe wrapper)
 * @param {string} eventName - Event name
 * @param {Object} params - Event parameters
 */
function sendEvent(eventName, params = {}) {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/**
 * Send page view to Google Analytics (safe wrapper)
 * @param {string} pagePath - Page path
 * @param {string} pageTitle - Page title
 */
function sendPageView(pagePath, pageTitle) {
  if (window.gtag) {
    window.gtag('config', GA_CONFIG.MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
}

/**
 * Check if user has opted out of tracking
 * @returns {boolean} True if user has opted out
 */
function hasOptedOut() {
  return localStorage.getItem('ga_opt_out') === 'true';
}

/**
 * Set opt-out preference
 * @param {boolean} optOut - True to opt out, false to opt in
 */
function setOptOut(optOut) {
  localStorage.setItem('ga_opt_out', optOut.toString());
  if (optOut && window.gtag) {
    // Disable Google Analytics
    window['ga-disable-' + GA_CONFIG.MEASUREMENT_ID] = true;
  }
}

/**
 * Initialize Google Analytics with optimal strategy
 * @param {Object} config - Configuration options
 */
function initializeGA(config = {}) {
  // Don't initialize if user has opted out
  if (hasOptedOut()) {
    return;
  }

  const {
    strategy = GA_CONFIG.STRATEGIES.INTERACTION,
    options = {},
    enablePerformanceTracking = true
  } = config;

  // Load GA with specified strategy
  loadGA(strategy, options);

  // Optional: Track performance metrics if enabled
  if (enablePerformanceTracking && window.gtag) {
    // Track initial page load performance
    if (window.performance && window.performance.timing) {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
      sendEvent('page_load', {
        event_category: 'Performance',
        event_label: 'Initial Load Time',
        value: Math.round(loadTime)
      });
    }
  }
}

// Export utilities
export {
  GA_CONFIG,
  loadGA,
  loadOnInteraction,
  loadOnTime,
  loadOnVisible,
  loadOnCustom,
  sendEvent,
  sendPageView,
  hasOptedOut,
  setOptOut,
  initializeGA,
  isGALoaded
};

// Export default for easy import
export default {
  loadGA,
  initializeGA,
  sendEvent,
  sendPageView,
  hasOptedOut,
  setOptOut,
  isGALoaded
};
