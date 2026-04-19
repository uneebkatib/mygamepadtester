/**
 * Image Optimization Utilities
 * Provides functions to optimize images for web performance
 */

// Convert image to WebP format with optimal compression
export const convertToWebP = async (imagePath, quality = 80) => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (webpBlob) => {
            resolve(webpBlob);
          },
          'image/webp',
          quality / 100
        );
      };
      
      img.src = URL.createObjectURL(blob);
    });
  } catch (error) {
    console.error('Image conversion failed:', error);
    return null;
  }
};

// Generate responsive image sizes
export const generateResponsiveImages = (originalWidth, originalHeight) => {
  const sizes = [320, 640, 768, 1024, 1280, 1920];
  const images = [];
  
  for (const size of sizes) {
    if (size <= originalWidth) {
      const ratio = size / originalWidth;
      images.push({
        width: size,
        height: Math.round(originalHeight * ratio),
        src: `${imagePath}?w=${size}&h=${Math.round(originalHeight * ratio)}`
      });
    }
  }
  
  return images;
};

// Lazy load image with Intersection Observer
export const lazyLoadImage = (imageElement, options = {}) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support Intersection Observer
    imageElement.src = imageElement.dataset.src;
    return;
  }
  
  const defaultOptions = {
    root: null,
    rootMargin: '50px 0px',
    threshold: 0.01
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        
        observer.unobserve(img);
      }
    });
  }, { ...defaultOptions, ...options });
  
  observer.observe(imageElement);
};

// Create optimized image component
export const createOptimizedImage = (src, alt, options = {}) => {
  const {
    className = '',
    loading = 'lazy',
    sizes = '100vw',
    srcSet = null,
    width = null,
    height = null,
    ...otherProps
  } = options;
  
  const img = document.createElement('img');
  img.alt = alt;
  img.loading = loading;
  img.className = `optimized-image ${className}`;
  img.sizes = sizes;
  
  if (width) img.width = width;
  if (height) img.height = height;
  
  // Set srcset for responsive images
  if (srcSet) {
    img.srcset = srcSet;
  } else {
    // Generate srcset automatically
    const baseName = src.replace(/\.(jpg|jpeg|png)$/i, '');
    img.srcset = `
      ${baseName}-320w.webp 320w,
      ${baseName}-640w.webp 640w,
      ${baseName}-1024w.webp 1024w,
      ${baseName}-1920w.webp 1920w
    `.trim();
  }
  
  // Set data-src for lazy loading
  img.dataset.src = src;
  img.classList.add('lazy');
  
  return img;
};

// Check if WebP is supported
export const supportsWebP = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('webp') === 4;
};

// Optimize image for different screen densities
export const getOptimalImageSrc = (baseSrc, pixelRatio = window.devicePixelRatio) => {
  const density = Math.min(Math.max(pixelRatio, 1), 3);
  const extension = supportsWebP() ? '.webp' : '.jpg';
  
  return `${baseSrc}@${density}x${extension}`;
};

// Image preloading utility
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.onload = resolve;
    link.onerror = reject;
    
    document.head.appendChild(link);
  });
};

// Batch preload images
export const preloadImages = async (imageSources) => {
  const promises = imageSources.map(preloadImage);
  return Promise.allSettled(promises);
};

// Get image dimensions without loading
export const getImageDimensions = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      });
    };
    img.src = src;
  });
};

// Optimize image for critical rendering
export const optimizeCriticalImage = async (src, options = {}) => {
  const {
    priority = 'high',
    fetchPriority = 'high',
    ...otherOptions
  } = options;
  
  const img = new Image();
  img.src = src;
  img.fetchPriority = fetchPriority;
  
  // Add preload link for critical images
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'image';
  preloadLink.href = src;
  preloadLink.fetchPriority = fetchPriority;
  
  if (priority === 'high') {
    document.head.appendChild(preloadLink);
  }
  
  return new Promise((resolve) => {
    img.onload = () => {
      resolve(img);
    };
  });
};

export default {
  convertToWebP,
  generateResponsiveImages,
  lazyLoadImage,
  createOptimizedImage,
  supportsWebP,
  getOptimalImageSrc,
  preloadImage,
  preloadImages,
  getImageDimensions,
  optimizeCriticalImage
};
