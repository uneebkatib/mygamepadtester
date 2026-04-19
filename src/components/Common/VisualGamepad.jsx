'use client';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

const XboxSVG = React.lazy(() => import('../XboxSVG/XboxSVG').then(m => ({ default: m.XboxSVG })));
const PS4SVG = React.lazy(() => import('../PS4SVG/PS4SVG').then(m => ({ default: m.PS4SVG })));
const AxesSVG = React.lazy(() => import('../AxesSVG/AxesSVG').then(m => ({ default: m.AxesSVG })));

const VisualWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${Theme.surface};
  border-radius: 20px;
  border: 2px solid ${Theme.border};
  height: fit-content;
  box-shadow: 0 4px 12px ${Theme.shadow};
  
  .controller-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    
    svg {
      max-width: 100%;
      height: auto;
      filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
    }
  }

  .axes-container {
      border-top: 1px solid ${Theme.border};
      padding-top: 1rem;
  }
`;

export default function VisualGamepad({ gamepadName, states }) {
    const isXbox = gamepadName?.toLowerCase().includes('xbox');

    const props = {
        leftX: states.axes[0] || 0,
        leftY: states.axes[1] || 0,
        rightX: states.axes[2] || 0,
        rightY: states.axes[3] || 0,
        l3Pressed: states.buttons[10]?.pressed || false,
        r3Pressed: states.buttons[11]?.pressed || false,
        lt: states.buttons[6]?.value || 0,
        rt: states.buttons[7]?.value || 0,
        lbPressed: states.buttons[4]?.pressed || false,
        rbPressed: states.buttons[5]?.pressed || false,
        APressed: states.buttons[0]?.pressed || false,
        BPressed: states.buttons[1]?.pressed || false,
        XPressed: states.buttons[2]?.pressed || false,
        YPressed: states.buttons[3]?.pressed || false,
        upPressed: states.buttons[12]?.pressed || false,
        downPressed: states.buttons[13]?.pressed || false,
        leftPressed: states.buttons[14]?.pressed || false,
        rightPressed: states.buttons[15]?.pressed || false,
        sharePressed: states.buttons[8]?.pressed || false,
        optionsPressed: states.buttons[9]?.pressed || false,
        logoPressed: states.buttons[16]?.pressed || false,
        touchbarPressed: states.buttons[17]?.pressed || false,
    };

    return (
        <VisualWrapper>
            <Suspense fallback={<div style={{ color: Theme.textMuted, textAlign: 'center' }}>Loading Visuals...</div>}>
                <div className="controller-container">
                    {isXbox ? <XboxSVG {...props} /> : <PS4SVG {...props} />}
                </div>
            </Suspense>
        </VisualWrapper>
    );
}
