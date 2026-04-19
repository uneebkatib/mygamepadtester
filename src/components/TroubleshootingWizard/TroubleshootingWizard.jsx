'use client'

import React, { useMemo } from 'react';
import styled from 'styled-components';
import Link from "next/link";
import {
    FaExclamationTriangle,
    FaCheckCircle,
    FaWrench,
    FaClock,
    FaArrowRight,
    FaGamepad,
    FaBolt,
    FaMousePointer
} from 'react-icons/fa';
import { Theme } from '../../styles/Theme';

const WizardContainer = styled.div`
  background: ${Theme.surface};
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid ${Theme.border};
`;

const WizardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${Theme.borderLight};
  
  h3 {
    margin: 0;
    font-size: 1rem;
    color: ${Theme.textPrimary};
  }
  
  svg {
    color: ${Theme.primary};
  }
`;

const IssuesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const IssueCard = styled.div`
  background: ${props =>
        props.$severity === 'critical' ? 'rgba(239, 68, 68, 0.08)' :
            props.$severity === 'warning' ? 'rgba(245, 158, 11, 0.08)' :
                'rgba(59, 130, 246, 0.08)'
    };
  border: 1px solid ${props =>
        props.$severity === 'critical' ? 'rgba(239, 68, 68, 0.25)' :
            props.$severity === 'warning' ? 'rgba(245, 158, 11, 0.25)' :
                'rgba(59, 130, 246, 0.25)'
    };
  border-radius: 10px;
  padding: 1rem;
  
  .issue-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    
    svg {
      color: ${props =>
        props.$severity === 'critical' ? '#EF4444' :
            props.$severity === 'warning' ? '#F59E0B' :
                '#3B82F6'
    };
    }
    
    .issue-title {
      font-weight: 600;
      color: ${Theme.textPrimary};
      font-size: 0.9rem;
    }
    
    .severity-badge {
      margin-left: auto;
      font-size: 0.65rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: 600;
      background: ${props =>
        props.$severity === 'critical' ? 'rgba(239, 68, 68, 0.2)' :
            props.$severity === 'warning' ? 'rgba(245, 158, 11, 0.2)' :
                'rgba(59, 130, 246, 0.2)'
    };
      color: ${props =>
        props.$severity === 'critical' ? '#DC2626' :
            props.$severity === 'warning' ? '#D97706' :
                '#2563EB'
    };
    }
  }
  
  .quick-fix {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: ${Theme.textSecondary};
    margin-bottom: 0.75rem;
    line-height: 1.4;
    
    svg {
      color: ${Theme.primary};
      margin-top: 2px;
      flex-shrink: 0;
    }
  }
  
  .issue-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    
    .time-estimate {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      color: ${Theme.textMuted};
      
      svg {
        font-size: 0.7rem;
      }
    }
    
    .guide-link {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      color: ${Theme.accent};
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
      
      svg {
        font-size: 0.7rem;
      }
    }
  }
`;

const AllGoodMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 10px;
  
  svg {
    color: #10B981;
    font-size: 1.5rem;
  }
  
  .message {
    .title {
      font-weight: 600;
      color: ${Theme.textPrimary};
      margin-bottom: 0.25rem;
    }
    
    .subtitle {
      font-size: 0.85rem;
      color: ${Theme.textSecondary};
    }
  }
`;

/**
 * Generate troubleshooting steps based on test results
 */
export const getTroubleshootingSteps = (testData) => {
    const {
        driftLeft = 0,
        driftRight = 0,
        latency = 0,
        buttonsWorking = 0,
        buttonsTotal = 16,
        triggersFullRange = true,
        jitterScore = 0,
        pollingRate = 0
    } = testData;

    const steps = [];

    // Drift detection
    const maxDrift = Math.max(driftLeft, driftRight);
    if (maxDrift > 5) {
        steps.push({
            issue: `Stick drift detected (${maxDrift.toFixed(1)}%)`,
            severity: maxDrift > 15 ? 'critical' : 'warning',
            icon: FaGamepad,
            quickFix: 'Try cleaning around the analog stick with compressed air or isopropyl alcohol. Increase your in-game deadzone setting to compensate.',
            guideLink: '/fix/stick-drift',
            guideLabel: 'Fix Stick Drift',
            estimatedTime: '5-15 min'
        });
    }

    // Button issues
    const missingButtons = buttonsTotal - buttonsWorking;
    if (missingButtons > 0) {
        steps.push({
            issue: `${missingButtons} button${missingButtons > 1 ? 's' : ''} not responding`,
            severity: 'critical',
            icon: FaMousePointer,
            quickFix: 'Press each button firmly several times to clear potential debris. Check if buttons are physically stuck or damaged.',
            guideLink: '/fix/sticky-buttons',
            guideLabel: 'Fix Button Issues',
            estimatedTime: '10-20 min'
        });
    }

    // Trigger issues
    if (!triggersFullRange) {
        steps.push({
            issue: 'Triggers not reaching full range',
            severity: 'warning',
            icon: FaGamepad,
            quickFix: 'Check for debris under the trigger mechanism. Adjust your in-game trigger deadzone settings. Some games allow trigger sensitivity adjustments.',
            guideLink: '/fix/trigger-deadzone',
            guideLabel: 'Fix Trigger Issues',
            estimatedTime: '5 min'
        });
    }

    // High latency
    if (latency > 16) {
        steps.push({
            issue: `High latency detected (${latency.toFixed(0)}ms)`,
            severity: latency > 32 ? 'critical' : 'warning',
            icon: FaBolt,
            quickFix: 'Use a USB cable instead of Bluetooth for lower latency. Close background applications. Ensure you\'re using a direct USB connection, not a hub.',
            guideLink: '/learn/latency-explained',
            guideLabel: 'Reduce Latency',
            estimatedTime: '1-5 min'
        });
    }

    // High jitter
    if (jitterScore > 3) {
        steps.push({
            issue: `Unstable input detected (jitter: ${jitterScore.toFixed(1)})`,
            severity: jitterScore > 8 ? 'critical' : 'warning',
            icon: FaGamepad,
            quickFix: 'This may indicate worn joystick components. Try increasing deadzone slightly. Consider Hall Effect joystick replacement for a permanent fix.',
            guideLink: '/learn/hall-effect-technology',
            guideLabel: 'Learn About Hall Effect',
            estimatedTime: '2 min read'
        });
    }

    // Low polling rate (Bluetooth)
    if (pollingRate > 0 && pollingRate < 200) {
        steps.push({
            issue: `Low polling rate (${pollingRate}Hz) - likely Bluetooth`,
            severity: 'info',
            icon: FaBolt,
            quickFix: 'Bluetooth typically runs at 125Hz. Connect via USB for 250-1000Hz polling rate, reducing input lag in fast-paced games.',
            guideLink: '/learn/polling-rate-explained',
            guideLabel: 'Learn About Polling Rate',
            estimatedTime: '2 min read'
        });
    }

    return steps;
};

/**
 * TroubleshootingWizard Component
 * Shows actionable troubleshooting steps based on detected issues
 */
const TroubleshootingWizard = ({ testData, maxSteps = 5 }) => {
    const steps = useMemo(() => {
        const allSteps = getTroubleshootingSteps(testData);
        // Sort by severity (critical first)
        return allSteps
            .sort((a, b) => {
                const order = { critical: 0, warning: 1, info: 2 };
                return order[a.severity] - order[b.severity];
            })
            .slice(0, maxSteps);
    }, [testData, maxSteps]);

    return (
        <WizardContainer>
            <WizardHeader>
                <FaWrench />
                <h3>Recommended Actions</h3>
            </WizardHeader>

            {steps.length === 0 ? (
                <AllGoodMessage>
                    <FaCheckCircle />
                    <div className="message">
                        <div className="title">Your controller is in great shape!</div>
                        <div className="subtitle">No issues detected. Ready for gaming.</div>
                    </div>
                </AllGoodMessage>
            ) : (
                <IssuesList>
                    {steps.map((step, index) => {
                        const IconComponent = step.icon || FaExclamationTriangle;
                        return (
                            <IssueCard key={index} $severity={step.severity}>
                                <div className="issue-header">
                                    <IconComponent />
                                    <span className="issue-title">{step.issue}</span>
                                    <span className="severity-badge">{step.severity}</span>
                                </div>

                                <div className="quick-fix">
                                    <FaWrench />
                                    <span>{step.quickFix}</span>
                                </div>

                                <div className="issue-footer">
                                    <span className="time-estimate">
                                        <FaClock />
                                        {step.estimatedTime}
                                    </span>

                                    {step.guideLink && (
                                        <Link href={step.guideLink} className="guide-link">
                                            {step.guideLabel}
                                            <FaArrowRight />
                                        </Link>
                                    )}
                                </div>
                            </IssueCard>
                        );
                    })}
                </IssuesList>
            )}
        </WizardContainer>
    );
};

export default TroubleshootingWizard;
