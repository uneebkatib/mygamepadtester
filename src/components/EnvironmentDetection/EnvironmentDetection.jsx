'use client'

import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { FaDesktop, FaChrome, FaFirefox, FaEdge, FaSafari, FaUsb, FaBluetooth, FaWifi, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { Theme } from '../../styles/Theme';

const EnvironmentContainer = styled.div`
  background: ${Theme.surface};
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid ${Theme.border};
  margin-bottom: 1rem;
`;

const EnvironmentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  
  h4 {
    margin: 0;
    font-size: 0.9rem;
    color: ${Theme.textPrimary};
  }
`;

const EnvironmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
`;

const EnvironmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: ${Theme.backgroundLight};
  border-radius: 8px;
  font-size: 0.8rem;
  
  svg {
    color: ${Theme.primary};
    flex-shrink: 0;
  }
  
  .label {
    color: ${Theme.textMuted};
    font-size: 0.7rem;
  }
  
  .value {
    color: ${Theme.textPrimary};
    font-weight: 500;
  }
`;

const WarningsList = styled.div`
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const WarningItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  background: ${props =>
        props.$type === 'error' ? 'rgba(239, 68, 68, 0.1)' :
            props.$type === 'warning' ? 'rgba(245, 158, 11, 0.1)' :
                'rgba(59, 130, 246, 0.1)'
    };
  border: 1px solid ${props =>
        props.$type === 'error' ? 'rgba(239, 68, 68, 0.3)' :
            props.$type === 'warning' ? 'rgba(245, 158, 11, 0.3)' :
                'rgba(59, 130, 246, 0.3)'
    };
  
  svg {
    color: ${props =>
        props.$type === 'error' ? '#EF4444' :
            props.$type === 'warning' ? '#F59E0B' :
                '#3B82F6'
    };
    margin-top: 2px;
    flex-shrink: 0;
  }
  
  .message {
    color: ${Theme.textPrimary};
    line-height: 1.4;
  }
  
  a {
    color: ${Theme.accent};
    text-decoration: underline;
  }
`;

/**
 * Detect operating system from user agent
 */
const detectOS = () => {
    if (typeof navigator === 'undefined') return { name: 'Unknown', icon: FaDesktop };

    const ua = navigator.userAgent;

    if (ua.includes('Windows NT 10') || ua.includes('Windows NT 11')) {
        return { name: 'Windows 10/11', icon: FaDesktop };
    }
    if (ua.includes('Windows')) {
        return { name: 'Windows', icon: FaDesktop };
    }
    if (ua.includes('Mac OS X')) {
        const version = ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || '';
        return { name: `macOS ${version}`, icon: FaDesktop };
    }
    if (ua.includes('Linux')) {
        return { name: 'Linux', icon: FaDesktop };
    }
    if (ua.includes('CrOS')) {
        return { name: 'ChromeOS', icon: FaChrome };
    }
    if (ua.includes('Android')) {
        return { name: 'Android', icon: FaDesktop };
    }
    if (ua.includes('iPhone') || ua.includes('iPad')) {
        return { name: 'iOS', icon: FaDesktop };
    }

    return { name: 'Unknown OS', icon: FaDesktop };
};

/**
 * Detect browser from user agent
 */
const detectBrowser = () => {
    if (typeof navigator === 'undefined') return { name: 'Unknown', version: '', icon: FaDesktop };

    const ua = navigator.userAgent;

    if (ua.includes('Edg/')) {
        const version = ua.match(/Edg\/(\d+)/)?.[1] || '';
        return { name: 'Edge', version, icon: FaEdge };
    }
    if (ua.includes('Chrome') && !ua.includes('Edg')) {
        const version = ua.match(/Chrome\/(\d+)/)?.[1] || '';
        return { name: 'Chrome', version, icon: FaChrome };
    }
    if (ua.includes('Firefox')) {
        const version = ua.match(/Firefox\/(\d+)/)?.[1] || '';
        return { name: 'Firefox', version, icon: FaFirefox };
    }
    if (ua.includes('Safari') && !ua.includes('Chrome')) {
        const version = ua.match(/Version\/(\d+)/)?.[1] || '';
        return { name: 'Safari', version, icon: FaSafari };
    }

    return { name: 'Unknown Browser', version: '', icon: FaDesktop };
};

/**
 * Infer connection type from polling rate
 */
export const inferConnectionType = (pollingRate) => {
    if (pollingRate >= 500) return { type: 'usb', label: 'USB', icon: FaUsb };
    if (pollingRate >= 200) return { type: 'wireless', label: '2.4GHz', icon: FaWifi };
    return { type: 'bluetooth', label: 'Bluetooth', icon: FaBluetooth };
};

/**
 * Generate environment warnings based on detected conditions
 */
const generateWarnings = (browser, os, isSecure) => {
    const warnings = [];

    if (!isSecure) {
        warnings.push({
            type: 'error',
            message: 'HTTPS required. The Gamepad API is disabled on non-secure (HTTP) connections.'
        });
    }

    if (browser.name === 'Safari') {
        warnings.push({
            type: 'warning',
            message: 'Safari has limited Gamepad API support. For best results, we recommend using Chrome or Edge.'
        });
    }

    if (browser.name === 'Firefox') {
        warnings.push({
            type: 'info',
            message: 'Firefox requires a button press to detect controllers (security feature). Press any button on your controller.'
        });
    }

    return warnings;
};

/**
 * EnvironmentDetection Component
 * Shows user's OS, browser, and connection info with relevant warnings
 */
const EnvironmentDetection = ({ pollingRate = null, showWarnings = true, compact = false }) => {
    const [isSecure, setIsSecure] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsSecure(window.isSecureContext);
        }
    }, []);

    const os = useMemo(() => detectOS(), []);
    const browser = useMemo(() => detectBrowser(), []);
    const connection = useMemo(() => pollingRate ? inferConnectionType(pollingRate) : null, [pollingRate]);
    const warnings = useMemo(() => generateWarnings(browser, os, isSecure), [browser, os, isSecure]);

    const OSIcon = os.icon;
    const BrowserIcon = browser.icon;
    const ConnectionIcon = connection?.icon || FaUsb;

    if (compact) {
        return (
            <EnvironmentContainer style={{ padding: '0.75rem' }}>
                <EnvironmentGrid>
                    <EnvironmentItem>
                        <BrowserIcon />
                        <span className="value">{browser.name} {browser.version}</span>
                    </EnvironmentItem>
                    {connection && (
                        <EnvironmentItem>
                            <ConnectionIcon />
                            <span className="value">{connection.label}</span>
                        </EnvironmentItem>
                    )}
                </EnvironmentGrid>
            </EnvironmentContainer>
        );
    }

    return (
        <EnvironmentContainer>
            <EnvironmentHeader>
                <FaDesktop color={Theme.primary} />
                <h4>Your Environment</h4>
            </EnvironmentHeader>

            <EnvironmentGrid>
                <EnvironmentItem>
                    <OSIcon />
                    <div>
                        <div className="label">OS</div>
                        <div className="value">{os.name}</div>
                    </div>
                </EnvironmentItem>

                <EnvironmentItem>
                    <BrowserIcon />
                    <div>
                        <div className="label">Browser</div>
                        <div className="value">{browser.name} {browser.version}</div>
                    </div>
                </EnvironmentItem>

                {connection && (
                    <EnvironmentItem>
                        <ConnectionIcon />
                        <div>
                            <div className="label">Connection</div>
                            <div className="value">{connection.label}</div>
                        </div>
                    </EnvironmentItem>
                )}

                <EnvironmentItem>
                    {isSecure ? <FaCheckCircle color="#10B981" /> : <FaExclamationTriangle color="#EF4444" />}
                    <div>
                        <div className="label">Security</div>
                        <div className="value">{isSecure ? 'HTTPS ✓' : 'HTTP ✗'}</div>
                    </div>
                </EnvironmentItem>
            </EnvironmentGrid>

            {showWarnings && warnings.length > 0 && (
                <WarningsList>
                    {warnings.map((warning, index) => (
                        <WarningItem key={index} $type={warning.type}>
                            {warning.type === 'error' ? <FaExclamationTriangle /> :
                                warning.type === 'warning' ? <FaExclamationTriangle /> :
                                    <FaInfoCircle />}
                            <span className="message">{warning.message}</span>
                        </WarningItem>
                    ))}
                </WarningsList>
            )}
        </EnvironmentContainer>
    );
};

export default EnvironmentDetection;
