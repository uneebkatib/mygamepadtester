'use client'

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";
import dynamic from "next/dynamic";
import {
  FaHome,
  FaInfoCircle,
  FaTools,
  FaBars,
  FaTimes,
  FaNewspaper,
  FaChevronDown,
  FaGamepad,
  FaChartBar,
} from "react-icons/fa";
import { GrGamepad } from "react-icons/gr";

// Dynamic import for Ad
const Ad = dynamic(
  () => import('../Ad/Ad'),
  { ssr: false, loading: () => null }
);

const StyledNav = styled.div`
  display: flex;
  background: linear-gradient(135deg, ${Theme.backgroundLight} 0%, ${Theme.surface} 100%);
  width: 100%;
  max-width: 1200px;
  border-radius: 0 0 16px 16px;
  border-bottom: 2px solid ${Theme.primary};
  min-height: 80px;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  align-items: center;
  position: relative;
  z-index: 9999;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    inset-inline: 10%;
    height: 2px;
    background: linear-gradient(90deg, ${Theme.accent}, ${Theme.primary}, ${Theme.accent});
    border-radius: 1px;
  }

  @media (max-width: 765px) {
    min-height: 60px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.02);
  }

  .logo-text {
    color: ${Theme.textPrimary};
    font-weight: 800;
    font-size: 1.25rem;
    background: linear-gradient(135deg, ${Theme.primary} 0%, ${Theme.accent} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo {
    color: ${Theme.primary};
    font-size: 1.4rem;
    display: flex;
    align-items: center;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 765px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    inset-inline: 0;
    background: ${Theme.backgroundLight};
    flex-direction: column;
    padding: 1rem;
    border-bottom: 2px solid ${Theme.primary};
    z-index: 9999;
    box-shadow: 0 4px 12px ${Theme.shadow};
  }

  a, .dropdown-trigger {
    transition: all 0.2s ease;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: ${Theme.textSecondary};
    font-weight: 600;
    font-size: 0.95rem;
    
    &:hover {
      color: ${Theme.primary};
      background: ${Theme.primary}08;
    }
  }

  .active {
    color: ${Theme.primary} !important;
    background: ${Theme.primary}10 !important;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  
  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  inset-inline-start: 0;
  background: white;
  border: 2px solid ${Theme.primary};
  border-radius: 8px;
  padding: 0.5rem 0;
  min-width: 220px;
  box-shadow: 0 4px 12px ${Theme.shadowMedium};
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 99999;
  
  @media (max-width: 765px) {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
  
  a {
    display: block;
    padding: 0.75rem 1rem;
    color: ${Theme.textSecondary};
    text-decoration: none;
    font-size: 0.9rem;
    
    &:hover {
      background: ${Theme.primary}10;
      color: ${Theme.textPrimary};
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${Theme.primary};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 765px) {
    display: block;
  }
`;

const NavbarComponent = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  }, [pathname]);

  return (
    <StyledNav ref={navRef}>
      <LogoWrapper>
        <Link href="/">
          <span className="logo-text">
            MyGamepadTester
            <span className="logo">
              <GrGamepad />
            </span>
          </span>
        </Link>
      </LogoWrapper>

      <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>

      <MenuWrapper $isOpen={mobileMenuOpen}>
        <Link href="/" className={pathname === "/" ? "active" : ""}>
          <span><FaHome /> Home</span>
        </Link>

        <DropdownWrapper
          onMouseEnter={() => setToolsDropdownOpen(true)}
          onMouseLeave={() => setToolsDropdownOpen(false)}
        >
          <button
            className={`dropdown-trigger ${(pathname.includes("-test") || pathname.includes("-tester") || pathname.includes("-converter")) ? "active" : ""}`}
            onClick={() => setToolsDropdownOpen(prev => !prev)}
          >
            <span><FaTools /> Hardware Tests <FaChevronDown style={{ fontSize: '0.8rem', marginLeft: '4px' }} /></span>
          </button>
          <DropdownMenu $isOpen={toolsDropdownOpen}>
            <Link href="/joycon-tester">🎮 Joy-Con Tester</Link>
            <Link href="/vibration-test">📳 Vibration Test</Link>
            <Link href="/joystick-calibration">⚙️ Calibration</Link>
            <Link href="/stick-drift-test">🕹️ Stick Drift</Link>
            <Link href="/button-test">🔘 Button Test</Link>
            <Link href="/input-lag-test">⏱️ Input Lag</Link>
            <Link href="/trigger-test">🔫 Trigger Test</Link>
            <Link href="/deadzone-test">🎯 Deadzone Test</Link>
            <Link href="/keyboard-test">⌨️ Keyboard Test</Link>
            <Link href="/mouse-test">🖱️ Mouse Test</Link>
            <Link href="/aim-sensitivity-converter">🎯 Sensitivity Converter</Link>
          </DropdownMenu>
        </DropdownWrapper>

        <Link href="/global-stats" className={pathname === "/global-stats" ? "active" : ""}>
          <span><FaChartBar /> Stats</span>
        </Link>

        <Link href="/guides" className={pathname.startsWith("/guides") ? "active" : ""}>
          <span><FaTools /> Guides</span>
        </Link>

        <Link href="/about" className={pathname === "/about" ? "active" : ""}>
          <span><FaInfoCircle /> About</span>
        </Link>
        
        <Link href="/blog">
          <span><FaNewspaper /> Blog</span>
        </Link>
      </MenuWrapper>
    </StyledNav>
  );
};

export const Navbar = memo(NavbarComponent);