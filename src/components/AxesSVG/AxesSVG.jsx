import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const AxesSVGWrapper = styled.div`
  margin: 12px 0;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const StatCard = styled.div`
  background: ${Theme.surface};
  border: 1px solid ${props => props.$borderColor || Theme.border};
  border-radius: 8px;
  padding: 8px 14px;
  text-align: center;
  min-width: 90px;
`;

const StatLabel = styled.div`
  font-size: 9px;
  color: ${Theme.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.$color || Theme.primary};
`;

const Badge = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: 600;
  background: ${props => props.$bg || `${Theme.connected}20`};
  color: ${props => props.$color || Theme.connected};
  margin-top: 2px;
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid ${props => props.$active ? Theme.primary : Theme.border};
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${props => props.$active ? Theme.primary : Theme.surface};
  color: ${props => props.$active ? '#fff' : Theme.textSecondary};
  
  &:hover {
    background: ${props => props.$active ? Theme.primaryHover : Theme.surfaceHover};
  }
`;

const DeadzoneSlider = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: ${Theme.textMuted};
  
  input[type="range"] {
    width: 80px;
    accent-color: ${Theme.primary};
  }
  
  span {
    color: ${Theme.primary};
    font-weight: 600;
    min-width: 30px;
  }
`;

// Calculate circularity error
const calculateCircularityError = (points) => {
  if (points.length < 10) return { error: 0, avgRadius: 0 };
  const radii = points.map(([x, y]) => Math.sqrt(x * x + y * y));
  const avgRadius = radii.reduce((a, b) => a + b, 0) / radii.length;
  if (avgRadius < 10) return { error: 0, avgRadius: 0 };
  const deviations = radii.map(r => Math.abs(r - avgRadius));
  const avgDeviation = deviations.reduce((a, b) => a + b, 0) / deviations.length;
  return { error: Math.min(100, (avgDeviation / avgRadius) * 100), avgRadius };
};

// Get severity using theme colors
const getSeverity = (error) => {
  if (error < 5) return { level: 'Excellent', color: Theme.connected, bg: `${Theme.connected}20` };
  if (error < 10) return { level: 'Good', color: '#84CC16', bg: 'rgba(132,204,22,0.2)' };
  if (error < 20) return { level: 'Moderate', color: Theme.warning, bg: `${Theme.warning}20` };
  if (error < 35) return { level: 'Poor', color: '#F97316', bg: 'rgba(249,115,22,0.2)' };
  return { level: 'Critical', color: Theme.disconnected, bg: `${Theme.disconnected}20` };
};

export function AxesSVG({ leftX, leftY, l3Pressed, rightX, rightY, r3Pressed, minimal = false }) {
  const maxPoints = 400;
  const radius = 78.5;

  const [leftPath, setLeftPath] = useState([]);
  const [rightPath, setRightPath] = useState([]);
  const [deadzone, setDeadzone] = useState(0.1);
  const [showPerfectCircle, setShowPerfectCircle] = useState(true);
  const [showDeadzone, setShowDeadzone] = useState(true);

  const leftStats = useMemo(() => calculateCircularityError(leftPath), [leftPath]);
  const rightStats = useMemo(() => calculateCircularityError(rightPath), [rightPath]);
  const leftSeverity = useMemo(() => getSeverity(leftStats.error), [leftStats.error]);
  const rightSeverity = useMemo(() => getSeverity(rightStats.error), [rightStats.error]);

  useEffect(() => {
    setLeftPath((prev) => {
      const updated = [...prev, [leftX * radius, leftY * radius]];
      return updated.length > maxPoints ? updated.slice(-maxPoints) : updated;
    });
    setRightPath((prev) => {
      const updated = [...prev, [rightX * radius, rightY * radius]];
      return updated.length > maxPoints ? updated.slice(-maxPoints) : updated;
    });
  }, [leftX, leftY, rightX, rightY]);

  const renderPath = (points) =>
    points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");

  const clearPaths = () => { setLeftPath([]); setRightPath([]); };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "p" || e.key === "P") clearPaths();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderStick = (pathData, stats, severity, x, y, isPressed, translateX) => (
    <g transform={`translate(${translateX} ${radius}) scale(0.95, 0.95)`}>
      {/* Deadzone circle */}
      {showDeadzone && (
        <circle
          cx="0" cy="0" r={deadzone * radius}
          fill={`${Theme.disconnected}15`}
          stroke={Theme.disconnected}
          strokeWidth="1"
          strokeDasharray="4,2"
          strokeOpacity="0.4"
        />
      )}

      {/* Perfect circle reference */}
      {showPerfectCircle && stats.avgRadius > 10 && (
        <circle
          cx="0" cy="0" r={stats.avgRadius}
          fill="none"
          stroke={Theme.connected}
          strokeWidth="2"
          strokeDasharray="6,3"
          strokeOpacity="0.5"
        />
      )}

      {/* Outer boundary */}
      <circle
        cx="0" cy="0" r={radius}
        fill="none"
        stroke={Theme.border}
        strokeWidth={isPressed ? "3" : "1"}
      />

      {/* Axis lines */}
      <line x1="0" y1={-radius} x2="0" y2={radius} stroke={Theme.border} strokeOpacity="0.5" />
      <line x1={-radius} y1="0" x2={radius} y2="0" stroke={Theme.border} strokeOpacity="0.5" />

      {/* Traced path */}
      <path
        d={renderPath(pathData)}
        fill="none"
        stroke={severity.color}
        strokeWidth="2.5"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Current position line */}
      <line
        x1="0" y1="0" x2={x * radius} y2={y * radius}
        stroke={Theme.textSecondary}
        strokeWidth="2"
      />

      {/* Position dot */}
      <circle cx={x * radius} cy={y * radius} r="6" fill={severity.color} fillOpacity="0.3" />
      <circle cx={x * radius} cy={y * radius} r="4" fill={severity.color} />
    </g>
  );

  return (
    <AxesSVGWrapper>
      {!minimal && (
        <StatsRow>
          <StatCard $borderColor={leftSeverity.color}>
            <StatLabel>Left Stick Error</StatLabel>
            <StatValue $color={leftSeverity.color}>{leftStats.error.toFixed(1)}%</StatValue>
            <Badge $color={leftSeverity.color} $bg={leftSeverity.bg}>{leftSeverity.level}</Badge>
          </StatCard>

          <StatCard>
            <StatLabel>Deadzone</StatLabel>
            <StatValue $color={Theme.primary}>{(deadzone * 100).toFixed(0)}%</StatValue>
          </StatCard>

          <StatCard $borderColor={rightSeverity.color}>
            <StatLabel>Right Stick Error</StatLabel>
            <StatValue $color={rightSeverity.color}>{rightStats.error.toFixed(1)}%</StatValue>
            <Badge $color={rightSeverity.color} $bg={rightSeverity.bg}>{rightSeverity.level}</Badge>
          </StatCard>
        </StatsRow>
      )}

      <svg viewBox="0 0 335 157" style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '335px' }}>
        {renderStick(leftPath, leftStats, leftSeverity, leftX, leftY, l3Pressed, 78.5)}
        {renderStick(rightPath, rightStats, rightSeverity, rightX, rightY, r3Pressed, 258.5)}
      </svg>

      {!minimal && (
        <ControlsRow>
          <Btn onClick={clearPaths}>🗑️ Clear Paths (P)</Btn>
          <Btn $active={showPerfectCircle} onClick={() => setShowPerfectCircle(!showPerfectCircle)}>
            {showPerfectCircle ? '✓' : '⭕'} Perfect Circle
          </Btn>
          <Btn $active={showDeadzone} onClick={() => setShowDeadzone(!showDeadzone)}>
            {showDeadzone ? '✓' : '⭕'} Deadzone
          </Btn>
        </ControlsRow>
      )}
    </AxesSVGWrapper>
  );
}

