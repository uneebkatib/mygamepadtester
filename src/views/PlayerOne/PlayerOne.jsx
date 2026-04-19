import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { MainGamepad } from "../../components/MainGamepad/MainGamepad";

// Lazy load MainPageInfo for better performance
const MainPageInfo = React.lazy(() => import("../../components/MainPageInfo/MainPageInfo").then(module => ({ default: module.MainPageInfo })));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    color: '#DA7756',
    fontSize: '14px'
  }}>
    <div style={{
      width: '20px',
      height: '20px',
      border: '2px solid #DA7756',
      borderTop: '2px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
  </div>
);

function PlayerOne() {
  return (
    <>
      {/* Unique meta tags for Player 1 page - prevents keyword cannibalization */}
      <Helmet>
        <title>Gamepad Tester - Player One Controller | MyGamepadTester</title>
        <meta name="description" content="Test Player 1 controller with dedicated gamepad testing interface. Ideal for multi-controller setups and local multiplayer gaming." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://mygamepadtester.com" />
      </Helmet>

      <div style={{
        width: '100%',
        maxWidth: '1150px',
        margin: '0 auto',
        padding: '1rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'stretch'
        }}>
          {/* Gamepad testing tool */}
          <MainGamepad playerNumber={0} />

        </div>
      </div>
    </>
  );
}

export default PlayerOne;
