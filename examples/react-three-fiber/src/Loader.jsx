import React from 'react';

import { Html } from '@react-three/drei';

export function Loader() {
  // Simple CSS spinner
  const spinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3' /* Light grey */,
    borderTop: '4px solid #3498db' /* Blue */,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: 'auto',
  };

  // Keyframes need to be global, add to index.css or use a styled-components approach if preferred

  return (
    <Html center>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <div style={spinnerStyle}></div>
        <p>Loading Model...</p>
      </div>
    </Html>
  );
}
