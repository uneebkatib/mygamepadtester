/**
 * Performance monitoring utilities for the gamepad tester application
 */

// Performance metrics tracking
class PerformanceTracker {
  constructor() {
    this.metrics = new Map();
    this.observers = new Set();
    this.isTracking = false;
  }

  // Start tracking performance metrics
  startTracking() {
    if (this.isTracking) return;
    
    this.isTracking = true;
    
    // Track frame rate
    this.startFrameRateTracking();
    
    // Track memory usage
    this.startMemoryTracking();
    
    // Track network requests
    this.startNetworkTracking();
    
    // Track custom metrics
    this.startCustomMetrics();
  }

  // Stop tracking performance metrics
  stopTracking() {
    this.isTracking = false;
    
    if (this.frameRateObserver) {
      this.frameRateObserver.disconnect();
    }
    
    if (this.memoryObserver) {
      this.memoryObserver.disconnect();
    }
  }

  // Track frame rate using requestAnimationFrame
  startFrameRateTracking() {
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    const measureFPS = (currentTime) => {
      frames++;
      
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime));
        this.updateMetric('fps', fps);
        frames = 0;
        lastTime = currentTime;
      }
      
      if (this.isTracking) {
        requestAnimationFrame(measureFPS);
      }
    };

    requestAnimationFrame(measureFPS);
  }

  // Track memory usage
  startMemoryTracking() {
    const trackMemory = () => {
      if (performance.memory) {
        const memory = performance.memory;
        this.updateMetric('memory', {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
        });
      }
      
      if (this.isTracking) {
        setTimeout(trackMemory, 5000); // Check every 5 seconds
      }
    };

    trackMemory();
  }

  // Track network requests
  startNetworkTracking() {
    // Override fetch to track network requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0];
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        
        this.updateMetric('network', {
          url,
          duration: Math.round(endTime - startTime),
          status: response.status,
          size: response.headers.get('content-length') || 0,
        });
        
        return response;
      } catch (error) {
        const endTime = performance.now();
        
        this.updateMetric('network', {
          url,
          duration: Math.round(endTime - startTime),
          status: 'error',
          error: error.message,
        });
        
        throw error;
      }
    };
  }

  // Track custom metrics
  startCustomMetrics() {
    // Track gamepad update frequency
    let updateCount = 0;
    let lastUpdateCheck = performance.now();
    
    const originalUpdate = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) => {
      updateCount++;
      
      const now = performance.now();
      if (now - lastUpdateCheck >= 1000) {
        this.updateMetric('gamepadUpdates', {
          updatesPerSecond: updateCount,
          timestamp: now,
        });
        updateCount = 0;
        lastUpdateCheck = now;
      }
      
      return originalUpdate(callback);
    };
  }

  // Update a specific metric
  updateMetric(name, value) {
    this.metrics.set(name, {
      value,
      timestamp: performance.now(),
    });
    
    // Notify observers
    this.notifyObservers(name, value);
  }

  // Get current metrics
  getMetrics() {
    const result = {};
    for (const [name, data] of this.metrics.entries()) {
      result[name] = data.value;
    }
    return result;
  }

  // Add observer for metrics changes
  addObserver(callback) {
    this.observers.add(callback);
  }

  // Remove observer
  removeObserver(callback) {
    this.observers.delete(callback);
  }

  // Notify all observers
  notifyObservers(name, value) {
    for (const observer of this.observers) {
      try {
        observer(name, value);
      } catch (error) {
        console.error('Error in performance observer:', error);
      }
    }
  }

  // Get performance score
  getPerformanceScore() {
    const metrics = this.getMetrics();
    let score = 100;
    
    // FPS score (target: 60+ FPS)
    if (metrics.fps && metrics.fps < 30) {
      score -= 30;
    } else if (metrics.fps && metrics.fps < 45) {
      score -= 15;
    }
    
    // Memory score (target: < 100MB)
    if (metrics.memory && metrics.memory.used > 200) {
      score -= 20;
    } else if (metrics.memory && metrics.memory.used > 150) {
      score -= 10;
    }
    
    // Network score (target: < 500ms average)
    if (metrics.network && metrics.network.duration > 1000) {
      score -= 10;
    }
    
    return Math.max(0, Math.min(100, score));
  }
}

// Performance monitoring hook for React components
export function usePerformanceMonitor(componentName) {
  const tracker = new PerformanceTracker();
  
  React.useEffect(() => {
    tracker.startTracking();
    
    // Track component mount
    tracker.updateMetric(`${componentName}_mount`, performance.now());
    
    return () => {
      // Track component unmount
      tracker.updateMetric(`${componentName}_unmount`, performance.now());
      tracker.stopTracking();
    };
  }, [componentName]);
  
  return tracker;
}

// Performance warning system
export class PerformanceWarningSystem {
  constructor() {
    this.thresholds = {
      fps: 30,
      memory: 150, // MB
      network: 1000, // ms
      gamepadUpdates: 30, // updates per second
    };
    
    this.warnings = new Set();
  }

  // Check if performance is below thresholds
  checkPerformance(metrics) {
    const issues = [];
    
    if (metrics.fps && metrics.fps < this.thresholds.fps) {
      issues.push({
        type: 'low-fps',
        severity: 'high',
        message: `Low FPS: ${metrics.fps} (threshold: ${this.thresholds.fps})`,
        timestamp: performance.now(),
      });
    }
    
    if (metrics.memory && metrics.memory.used > this.thresholds.memory) {
      issues.push({
        type: 'high-memory',
        severity: 'medium',
        message: `High memory usage: ${metrics.memory.used}MB (threshold: ${this.thresholds.memory}MB)`,
        timestamp: performance.now(),
      });
    }
    
    if (metrics.network && metrics.network.duration > this.thresholds.network) {
      issues.push({
        type: 'slow-network',
        severity: 'low',
        message: `Slow network request: ${metrics.network.duration}ms (threshold: ${this.thresholds.network}ms)`,
        timestamp: performance.now(),
      });
    }
    
    return issues;
  }

  // Display performance warnings
  displayWarnings(issues) {
    if (issues.length === 0) return;
    
    // Only show each warning type once per session
    for (const issue of issues) {
      if (!this.warnings.has(issue.type)) {
        console.warn(`Performance Warning: ${issue.message}`);
        this.warnings.add(issue.type);
        
        // Clear warning after 5 minutes
        setTimeout(() => {
          this.warnings.delete(issue.type);
        }, 5 * 60 * 1000);
      }
    }
  }
}

// Export singleton instances
export const performanceTracker = new PerformanceTracker();
export const performanceWarningSystem = new PerformanceWarningSystem();

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  performanceTracker.startTracking();
  
  // Monitor performance changes
  performanceTracker.addObserver((name, value) => {
    const issues = performanceWarningSystem.checkPerformance(performanceTracker.getMetrics());
    performanceWarningSystem.displayWarnings(issues);
  });
}

export default {
  PerformanceTracker,
  PerformanceWarningSystem,
  usePerformanceMonitor,
  performanceTracker,
  performanceWarningSystem,
};
