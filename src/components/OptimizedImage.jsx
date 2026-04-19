import React, { useRef, useEffect, useState } from 'react';
import { lazyLoadImage, supportsWebP, getOptimalImageSrc } from '../utils/imageOptimizer.js';

/**
 * Optimized Image Component
 * Provides lazy loading, WebP support, and responsive images for better performance
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width = null, 
  height = null,
  loading = 'lazy',
  sizes = '100vw',
  srcSet = null,
  priority = false,
  placeholder = 'blur',
  ...otherProps 
}) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');

  // Generate optimized src based on WebP support and device pixel ratio
  const getOptimizedSrc = () => {
    if (!src) return '';
    
    // If WebP is supported, use WebP format
    if (supportsWebP()) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    
    return src;
  };

  // Generate responsive srcSet
  const getOptimizedSrcSet = () => {
    if (srcSet) return srcSet;
    
    if (!src) return '';
    
    const baseName = src.replace(/\.(jpg|jpeg|png)$/i, '');
    const webpExtension = supportsWebP() ? '.webp' : '.jpg';
    
    return `
      ${baseName}-320w${webpExtension} 320w,
      ${baseName}-640w${webpExtension} 640w,
      ${baseName}-1024w${webpExtension} 1024w,
      ${baseName}-1920w${webpExtension} 1920w
    `.trim();
  };

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    // Fallback to original src if WebP fails
    if (supportsWebP() && src.includes('.webp')) {
      setCurrentSrc(src.replace('.webp', '.jpg'));
    }
  };

  // Setup lazy loading
  useEffect(() => {
    if (!imgRef.current || priority || loading !== 'lazy') return;

    // Use native lazy loading if supported, otherwise use Intersection Observer
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading is supported
      setCurrentSrc(src);
    } else {
      // Fallback to Intersection Observer
      lazyLoadImage(imgRef.current, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
    }
  }, [src, priority, loading]);

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      // Preload critical images
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedSrc();
      link.fetchPriority = 'high';
      document.head.appendChild(link);
      
      setCurrentSrc(getOptimizedSrc());
    }
  }, [priority, src]);

  const optimizedSrc = getOptimizedSrc();
  const optimizedSrcSet = getOptimizedSrcSet();

  // Show placeholder while loading
  if (!isLoaded && !hasError && placeholder === 'blur') {
    return (
      <div 
        className={`optimized-image-placeholder ${className}`}
        style={{
          width: width || '100%',
          height: height || 'auto',
          backgroundColor: '#f0f0f0',
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          transition: 'filter 0.3s ease'
        }}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={currentSrc || optimizedSrc}
      srcSet={optimizedSrcSet}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      sizes={sizes}
      className={`optimized-image ${isLoaded ? 'loaded' : 'loading'} ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        opacity: isLoaded ? 1 : 0.7,
        transition: 'opacity 0.3s ease',
        ...otherProps.style
      }}
      {...otherProps}
    />
  );
};

export default OptimizedImage;
