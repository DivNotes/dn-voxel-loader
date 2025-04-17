import React, { Suspense } from 'react';

import {
  Environment,
  OrbitControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Loader } from './Loader';
import { VoxelModel } from './VoxelModel';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#333' }}>
      <Canvas camera={{ position: [0, 30, 100], fov: 50 }}>
        {/* Basic Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Environment for reflections (optional but nice) */}
        <Environment preset="sunset" />

        {/* Use Suspense to show Loader while VoxelModel might be internally loading */}
        {/* Note: Our VoxelModel handles its own loading state, but Suspense */}
        {/* is good practice if components internally suspend */}
        <Suspense fallback={<Loader />}>
          <VoxelModel />
        </Suspense>

        {/* Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
