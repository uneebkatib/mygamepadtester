'use client'

import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTrophy, FaMedal } from 'react-icons/fa';
import { Theme } from '../../styles/Theme';

// Animation for score reveal
const scoreReveal = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
  50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.5); }
`;

const HealthScoreContainer = styled.div`
  background: linear-gradient(135deg, ${Theme.surface} 0%, ${Theme.background} 100%);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid ${Theme.border};
  animation: ${scoreReveal} 0.5s ease-out;
`;

const ScoreHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: ${Theme.textPrimary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ScoreCircle = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: ${props => props.$gradient};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: ${props => props.$score >= 80 ? pulseGlow : 'none'} 2s infinite;
  
  &::before {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: ${Theme.background};
  }
  
  @media (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
`;

const ScoreValue = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.$color};
  position: relative;
  z-index: 1;
  
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const ScoreLabel = styled.span`
  font-size: 0.75rem;
  color: ${Theme.textMuted};
  position: relative;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const GradeBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  .grade {
    font-size: 3rem;
    font-weight: 800;
    color: ${props => props.$color};
  }
  
  .label {
    font-size: 0.85rem;
    color: ${Theme.textSecondary};
    text-align: center;
    max-width: 120px;
  }
`;

const BreakdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
`;

const BreakdownItem = styled.div`
  background: ${Theme.backgroundLight};
  border-radius: 10px;
  padding: 0.75rem;
  border: 1px solid ${Theme.borderLight};
  
  .label {
    font-size: 0.75rem;
    color: ${Theme.textMuted};
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  
  .value {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${props => props.$color || Theme.textPrimary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .points {
    font-size: 0.7rem;
    color: ${Theme.textMuted};
    margin-top: 0.25rem;
  }
`;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  background: ${props => props.$bgColor};
  border: 1px solid ${props => props.$borderColor};
  
  svg {
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .message {
    font-size: 0.9rem;
    color: ${Theme.textPrimary};
  }
`;

/**
 * Calculate health score from test results
 * @param {Object} testData - Test results containing drift, latency, buttons, triggers data
 * @returns {Object} Health score breakdown and grade
 */
export const calculateHealthScore = (testData) => {
    const {
        driftLeft = 0,
        driftRight = 0,
        latency = 0,
        buttonsWorking = 0,
        buttonsTotal = 16,
        triggersFullRange = true,
        jitterScore = 0
    } = testData;

    // Drift scoring (0-25 points) - lower drift is better
    const avgDrift = (driftLeft + driftRight) / 2;
    let driftScore = 25;
    if (avgDrift > 20) driftScore = 0;
    else if (avgDrift > 15) driftScore = 5;
    else if (avgDrift > 10) driftScore = 10;
    else if (avgDrift > 5) driftScore = 18;
    else if (avgDrift > 2) driftScore = 22;
    else if (avgDrift > 0.5) driftScore = 24;

    // Latency scoring (0-25 points) - lower latency is better
    let latencyScore = 25;
    if (latency > 50) latencyScore = 5;
    else if (latency > 32) latencyScore = 10;
    else if (latency > 16) latencyScore = 15;
    else if (latency > 8) latencyScore = 20;
    else if (latency > 4) latencyScore = 23;

    // Button scoring (0-25 points) - all working = 25
    const buttonScore = Math.round((buttonsWorking / buttonsTotal) * 25);

    // Trigger scoring (0-25 points)
    let triggerScore = triggersFullRange ? 25 : 12;

    // Jitter penalty (reduces score if high jitter)
    const jitterPenalty = jitterScore > 5 ? Math.min(10, jitterScore) : 0;

    const total = Math.max(0, Math.min(100,
        Math.round(driftScore + latencyScore + buttonScore + triggerScore - jitterPenalty)
    ));

    // Determine grade
    let grade = 'F';
    let gradeLabel = 'Needs Replacement';
    let gradeColor = '#EF4444';

    if (total >= 95) {
        grade = 'A+';
        gradeLabel = 'Excellent';
        gradeColor = '#10B981';
    } else if (total >= 90) {
        grade = 'A';
        gradeLabel = 'Great Condition';
        gradeColor = '#10B981';
    } else if (total >= 80) {
        grade = 'B';
        gradeLabel = 'Good Condition';
        gradeColor = '#34D399';
    } else if (total >= 70) {
        grade = 'C';
        gradeLabel = 'Fair Condition';
        gradeColor = '#FBBF24';
    } else if (total >= 60) {
        grade = 'D';
        gradeLabel = 'Needs Attention';
        gradeColor = '#F59E0B';
    } else if (total >= 40) {
        grade = 'E';
        gradeLabel = 'Poor Condition';
        gradeColor = '#EF4444';
    }

    return {
        total,
        grade,
        gradeLabel,
        gradeColor,
        breakdown: {
            drift: { score: driftScore, max: 25, value: avgDrift.toFixed(1) + '%' },
            latency: { score: latencyScore, max: 25, value: latency.toFixed(1) + 'ms' },
            buttons: { score: buttonScore, max: 25, value: `${buttonsWorking}/${buttonsTotal}` },
            triggers: { score: triggerScore, max: 25, value: triggersFullRange ? 'Full' : 'Limited' }
        }
    };
};

/**
 * Get gradient colors based on score
 */
const getScoreGradient = (score) => {
    if (score >= 80) return 'linear-gradient(135deg, #10B981, #34D399)';
    if (score >= 60) return 'linear-gradient(135deg, #FBBF24, #F59E0B)';
    return 'linear-gradient(135deg, #EF4444, #DC2626)';
};

/**
 * Get status icon based on score
 */
const getStatusIcon = (score) => {
    if (score >= 80) return <FaCheckCircle color="#10B981" />;
    if (score >= 60) return <FaExclamationTriangle color="#F59E0B" />;
    return <FaTimesCircle color="#EF4444" />;
};

/**
 * Get status message based on score
 */
const getStatusMessage = (score, grade) => {
    if (score >= 90) {
        return {
            message: "Your controller is in excellent condition! Perfect for competitive gaming.",
            bgColor: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 0.3)'
        };
    }
    if (score >= 80) {
        return {
            message: "Your controller is performing well. Minor calibration may improve it further.",
            bgColor: 'rgba(52, 211, 153, 0.1)',
            borderColor: 'rgba(52, 211, 153, 0.3)'
        };
    }
    if (score >= 70) {
        return {
            message: "Your controller is functional but showing some wear. Consider cleaning or adjusting deadzones.",
            bgColor: 'rgba(251, 191, 36, 0.1)',
            borderColor: 'rgba(251, 191, 36, 0.3)'
        };
    }
    if (score >= 60) {
        return {
            message: "Your controller needs attention. Check our fix guides or consider replacement.\n",
            bgColor: 'rgba(245, 158, 11, 0.1)',
            borderColor: 'rgba(245, 158, 11, 0.3)'
        };
    }
    return {
        message: "Your controller has significant issues. Repair or replacement is recommended.",
        bgColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.3)'
    };
};

/**
 * HealthScore Component
 * Displays a visual health score for controller diagnostics
 */
const HealthScore = ({ testData, showBreakdown = true, compact = false }) => {
    const healthData = useMemo(() => calculateHealthScore(testData), [testData]);
    const statusInfo = useMemo(() => getStatusMessage(healthData.total, healthData.grade), [healthData]);

    if (compact) {
        return (
            <HealthScoreContainer style={{ padding: '1rem' }}>
                <ScoreHeader>
                    <h3>
                        <FaTrophy color={healthData.gradeColor} />
                        Health Score
                    </h3>
                    <GradeBadge $color={healthData.gradeColor} style={{ flexDirection: 'row', gap: '0.5rem' }}>
                        <span className="grade" style={{ fontSize: '1.5rem' }}>{healthData.grade}</span>
                        <span className="label" style={{ maxWidth: 'none' }}>{healthData.total}/100</span>
                    </GradeBadge>
                </ScoreHeader>
            </HealthScoreContainer>
        );
    }

    return (
        <HealthScoreContainer>
            <ScoreHeader>
                <h3>
                    <FaTrophy color={Theme.primary} />
                    Controller Health Score
                </h3>
            </ScoreHeader>

            <ScoreDisplay>
                <ScoreCircle $gradient={getScoreGradient(healthData.total)} $score={healthData.total}>
                    <ScoreValue $color={healthData.gradeColor}>{healthData.total}</ScoreValue>
                    <ScoreLabel>out of 100</ScoreLabel>
                </ScoreCircle>

                <GradeBadge $color={healthData.gradeColor}>
                    <FaMedal size={24} color={healthData.gradeColor} />
                    <span className="grade">{healthData.grade}</span>
                    <span className="label">{healthData.gradeLabel}</span>
                </GradeBadge>
            </ScoreDisplay>

            {showBreakdown && (
                <BreakdownGrid>
                    <BreakdownItem $color={healthData.breakdown.drift.score >= 20 ? '#10B981' : healthData.breakdown.drift.score >= 15 ? '#FBBF24' : '#EF4444'}>
                        <div className="label">Stick Drift</div>
                        <div className="value">
                            {getStatusIcon(healthData.breakdown.drift.score * 4)}
                            {healthData.breakdown.drift.value}
                        </div>
                        <div className="points">{healthData.breakdown.drift.score}/{healthData.breakdown.drift.max} pts</div>
                    </BreakdownItem>

                    <BreakdownItem $color={healthData.breakdown.latency.score >= 20 ? '#10B981' : healthData.breakdown.latency.score >= 15 ? '#FBBF24' : '#EF4444'}>
                        <div className="label">Latency</div>
                        <div className="value">
                            {getStatusIcon(healthData.breakdown.latency.score * 4)}
                            {healthData.breakdown.latency.value}
                        </div>
                        <div className="points">{healthData.breakdown.latency.score}/{healthData.breakdown.latency.max} pts</div>
                    </BreakdownItem>

                    <BreakdownItem $color={healthData.breakdown.buttons.score >= 20 ? '#10B981' : healthData.breakdown.buttons.score >= 15 ? '#FBBF24' : '#EF4444'}>
                        <div className="label">Buttons</div>
                        <div className="value">
                            {getStatusIcon(healthData.breakdown.buttons.score * 4)}
                            {healthData.breakdown.buttons.value}
                        </div>
                        <div className="points">{healthData.breakdown.buttons.score}/{healthData.breakdown.buttons.max} pts</div>
                    </BreakdownItem>

                    <BreakdownItem $color={healthData.breakdown.triggers.score >= 20 ? '#10B981' : healthData.breakdown.triggers.score >= 15 ? '#FBBF24' : '#EF4444'}>
                        <div className="label">Triggers</div>
                        <div className="value">
                            {getStatusIcon(healthData.breakdown.triggers.score * 4)}
                            {healthData.breakdown.triggers.value}
                        </div>
                        <div className="points">{healthData.breakdown.triggers.score}/{healthData.breakdown.triggers.max} pts</div>
                    </BreakdownItem>
                </BreakdownGrid>
            )}

            <StatusMessage $bgColor={statusInfo.bgColor} $borderColor={statusInfo.borderColor}>
                {getStatusIcon(healthData.total)}
                <span className="message">{statusInfo.message}</span>
            </StatusMessage>
        </HealthScoreContainer>
    );
};

export default HealthScore;
