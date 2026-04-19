import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const PopupOverlay = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  max-width: calc(100vw - 40px);
  
  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
    max-width: calc(100vw - 30px);
  }
`;

const PopupContainer = styled.div`
  background: ${Theme.background};
  border-radius: 12px;
  width: 350px;
  overflow: hidden;
  border: 2px solid ${Theme.primary};
  position: relative;
  
  @media (max-width: 768px) {
    width: 300px;
  }
  
  @media (max-width: 480px) {
    width: 280px;
  }
  
  @media (max-width: 400px) {
    width: 250px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${Theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  transition: all 0.3s ease;

  &:hover {
    background: ${Theme.accent};
    transform: scale(1.1);
  }
`;

const AdContent = styled.div`
  padding: 20px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .adsbygoogle {
    display: block !important;
    width: 100%;
    min-height: 250px;
  }
  
  @media (max-width: 768px) {
    min-height: 250px;
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    min-height: 220px;
    padding: 12px;
  }
`;

const PopupAd = () => {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef(null);

  useEffect(() => {
    // Show popup after 10 seconds
    const popupTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Load ad when popup becomes visible
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        setTimeout(() => {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (error) {
            console.error('AdSense error:', error);
          }
        }, 300);
      }
    }, 10000); // 10 seconds

    return () => clearTimeout(popupTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <PopupOverlay>
      <PopupContainer>
        <CloseButton onClick={handleClose}>Ã-</CloseButton>
        <AdContent>
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3152466698030918"
            data-ad-slot="3816511606"
            data-ad-format="rectangle"
            data-full-width-responsive="true"
          ></ins>
        </AdContent>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default PopupAd;
