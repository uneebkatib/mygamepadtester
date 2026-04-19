import React from "react";
import styled from "styled-components";

// Responsive utility component for handling different screen sizes
const ResponsiveWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.25rem;
  }
`;

const MobileOnly = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopOnly = styled.div`
  display: block;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TabletOnly = styled.div`
  display: none;
  
  @media (min-width: 769px) and (max-width: 1024px) {
    display: block;
  }
`;

const LargeScreenOnly = styled.div`
  display: none;
  
  @media (min-width: 1025px) {
    display: block;
  }
`;

// Touch device detection
const TouchDeviceOnly = styled.div`
  display: none;
  
  @media (hover: none) and (pointer: coarse) {
    display: block;
  }
`;

const NonTouchDeviceOnly = styled.div`
  display: block;
  
  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;

// Orientation detection
const LandscapeOnly = styled.div`
  display: none;
  
  @media (orientation: landscape) {
    display: block;
  }
`;

const PortraitOnly = styled.div`
  display: none;
  
  @media (orientation: portrait) {
    display: block;
  }
`;

export {
  ResponsiveWrapper,
  MobileOnly,
  DesktopOnly,
  TabletOnly,
  LargeScreenOnly,
  TouchDeviceOnly,
  NonTouchDeviceOnly,
  LandscapeOnly,
  PortraitOnly
};