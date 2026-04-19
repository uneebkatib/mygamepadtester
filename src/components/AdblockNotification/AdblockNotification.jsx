import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, ${Theme.backgroundDark}, ${Theme.primary});
  color: ${Theme.white};
  padding: 20px;
  border-radius: 12px;
  border: 2px solid ${Theme.accent};
  max-width: 400px;
  z-index: 10000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: ${Theme.white};
  }
  
  svg {
    margin-right: 10px;
    font-size: 1.5rem;
    color: ${Theme.accent};
  }
`;

const NotificationContent = styled.div`
  p {
    margin: 0 0 15px 0;
    font-size: 1rem;
    line-height: 1.5;
    color: ${Theme.textLight};
  }
  
  ul {
    margin: 0 0 15px 20px;
    padding: 0;
    
    li {
      margin-bottom: 8px;
      font-size: 0.95rem;
      color: ${Theme.textLight};
    }
  }
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  
  button {
    flex: 1;
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 120px;
    
    &.primary {
      background: ${Theme.accent};
      color: ${Theme.backgroundDark};
      
      &:hover {
        background: #fff;
        transform: translateY(-2px);
      }
    }
    
    &.secondary {
      background: transparent;
      color: ${Theme.textLight};
      border: 1px solid ${Theme.textLight};
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }
    }
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${Theme.textLight};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

function AdblockNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if adblock is enabled
    const checkAdblock = async () => {
      try {
        let isBlocked = false;
        
        // Method 1: Check for ad element blocking
        const adElement = document.createElement('div');
        adElement.className = 'adsbox';
        adElement.style.height = '1px';
        document.body.appendChild(adElement);
        
        // Wait a bit for adblockers to potentially block it
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if the element was hidden or removed
        isBlocked = (
          adElement.offsetHeight === 0 || 
          window.getComputedStyle(adElement).display === 'none' ||
          window.getComputedStyle(adElement).visibility === 'hidden'
        );
        
        document.body.removeChild(adElement);
        
        // Method 2: Check Google AdSense blocking
        if (!isBlocked) {
          const adTest = document.createElement('ins');
          adTest.className = 'adsbygoogle';
          adTest.style.display = 'block';
          adTest.style.height = '1px';
          document.body.appendChild(adTest);
          
          await new Promise(resolve => setTimeout(resolve, 100));
          
          isBlocked = (
            adTest.offsetHeight === 0 || 
            window.getComputedStyle(adTest).display === 'none'
          );
          
          document.body.removeChild(adTest);
        }
        
        // Method 3: Check for blocked ad requests
        if (!isBlocked) {
          try {
            const adRequest = new Request('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
            const response = await fetch(adRequest, { method: 'HEAD', mode: 'no-cors' });
            // If the request is blocked, it may throw an error or return specific properties
          } catch (error) {
            isBlocked = true;
          }
        }
        
        // Method 4: Check for specific ad blocker extensions
        if (!isBlocked) {
          const adblockPatterns = [
            'adblock',
            'adblocker',
            'ublock',
            'adguard'
          ];
          
          const extensionNames = Array.from(navigator.plugins).map(plugin => plugin.name.toLowerCase());
          isBlocked = extensionNames.some(name => 
            adblockPatterns.some(pattern => name.includes(pattern))
          );
        }
        
        // Show notification if adblock is detected
        if (isBlocked) {
          // Check if user has already dismissed this notification recently
          const dismissedTime = localStorage.getItem('adblockNotificationDismissed');
          const now = new Date().getTime();
          
          // Show again after 1 day if previously dismissed
          if (!dismissedTime || (now - parseInt(dismissedTime)) > 86400000) {
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.log('Adblock detection error:', error);
      } finally {
        setIsChecking(false);
      }
    };
    
    // Small delay to ensure page is loaded
    const timer = setTimeout(checkAdblock, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('adblockNotificationDismissed', new Date().getTime().toString());
  };
  
  const handleDisableAdblock = () => {
    // Show instructions for different browsers
    const instructions = `
How to disable ad blocker for this site:

Chrome:
1. Click the ad blocker icon in the address bar
2. Select "Don't run on pages on this site" or "Disable on this site"

Firefox:
1. Click the ad blocker icon in the address bar
2. Select "Disable" or "Turn off blocking for this site"

Safari:
1. Go to Safari > Preferences > Extensions
2. Find your ad blocker and disable it for this site

Edge:
1. Click the ad blocker icon in the address bar
2. Select "Turn off on this site"

For other ad blockers, look for similar options to whitelist or disable blocking for this website.
    `.trim();
    
    alert(instructions);
  };
  
  const handleLater = () => {
    handleClose();
  };

  if (!isVisible || isChecking) {
    return null;
  }

  return (
    <NotificationContainer>
      <CloseButton onClick={handleClose} aria-label="Close notification">
        Ã-
      </CloseButton>
      
      <NotificationHeader>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <h3>Support Our Website</h3>
      </NotificationHeader>
      
      <NotificationContent>
        <p>We noticed you're using an ad blocker. Our website depends on ad revenue to stay free and provide you with the best service.</p>
        
        <p>To support us and continue enjoying our content:</p>
        
        <ul>
          <li>Disable your ad blocker for this site</li>
          <li>Add our site to your ad blocker's whitelist</li>
          <li>Consider this as a small contribution to our work</li>
        </ul>
      </NotificationContent>
      
      <NotificationActions>
        <button className="primary" onClick={handleDisableAdblock}>
          Show Me How
        </button>
        <button className="secondary" onClick={handleLater}>
          Later
        </button>
      </NotificationActions>
    </NotificationContainer>
  );
}

export default AdblockNotification;
