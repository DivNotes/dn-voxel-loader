# Examples

This section provides practical examples of how to use DN Voxel Loader in different scenarios.

## Pure JS Example

This example demonstrates the most basic usage of `dn-voxel-loader` in a plain JavaScript environment, perhaps fetching a `.vox` file and logging its contents or performing a simple render to a canvas.

(Link to or embed the code from `examples/pure-js/`, explaining how it works)

```javascript
import { load } from 'dn-voxel-loader';

const modelUrl = '/path/to/some/model.vox'; // Ensure this path is accessible

async function displayModelInfo(source) {
  try {
    const voxelData = await load(source);
    console.log('Loaded Model Data:', voxelData);

    // Basic visualization (e.g., drawing pixels to a 2D canvas based on voxel data)
    // or just logging the information.
    const infoDiv = document.getElementById('model-info');
    if (infoDiv) {
      infoDiv.textContent = `Model Size: ${voxelData.size.x}x${voxelData.size.y}x${voxelData.size.z}, Voxels: ${voxelData.voxels.length}`;
    }
  } catch (error) {
    console.error('Error loading model:', error);
    const infoDiv = document.getElementById('model-info');
    if (infoDiv) {
      infoDiv.textContent = 'Failed to load model.';
    }
  }
}

displayModelInfo(modelUrl);
```

## React Three Fiber Example

This demonstrates how to integrate `dn-voxel-loader` within a React application using `react-three-fiber` for 3D rendering. It shows how to load the voxel data and use it to generate and position meshes in a Three.js scene managed by R3F.

(Link to or embed code from `examples/react-three-fiber/`, explaining the integration)

```javascript
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { load } from 'dn-voxel-loader';

function VoxelModel({ url }) {
  const [voxelData, setVoxelData] = useState(null);
  const meshRef = useRef();

  useEffect(() => {
    load(url).then(setVoxelData).catch(console.error);
  }, [url]);

  // Example: Create instanced mesh once data is loaded
  useEffect(() => {
    if (!voxelData || !meshRef.current) return;

    const tempObject = new THREE.Object3D();
    const tempColor = new THREE.Color();
    const { size, voxels, palette } = voxelData;

    // Center the model
    const offset = new THREE.Vector3(
      -size.x / 2 + 0.5,
      -size.y / 2 + 0.5,
      -size.z / 2 + 0.5
    );

    let count = 0;
    voxels.forEach((voxel) => {
      const { x, y, z, colorIndex } = voxel;
      const color = palette[colorIndex];
      tempObject.position.set(x + offset.x, y + offset.y, z + offset.z);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(count, tempObject.matrix);
      meshRef.current.setColorAt(
        count,
        tempColor.setRGB(color.r / 255, color.g / 255, color.b / 255)
      );
      count++;
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [voxelData]);

  if (!voxelData) return null; // Or return loading state

  // Use InstancedMesh for performance
  return (
    <instancedMesh ref={meshRef} args={[null, null, voxelData.voxels.length]}>
      <boxGeometry args={[1, 1, 1]} />
      {/* Use a material that supports vertex colors or instanced colors */}
      <meshStandardMaterial vertexColors={true} />
    </instancedMesh>
  );
}

// Example Usage in an R3F Canvas
function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <VoxelModel url="/path/to/your/model.vox" />
      <OrbitControls />
    </Canvas>
  );
}
```

## Other Examples

We plan to add more examples demonstrating usage with different frameworks and libraries:

- **Vue.js + Three.js:** Similar integration as React, but within a Vue component.
- **Svelte + Threlte:** Using the Svelte-native Three.js wrapper.
- **Babylon.js:** Showing how to load and render voxels using the Babylon.js engine.
- **Node.js Script:** Example of using the loader in a backend script for processing or analysis.

(Community contributions for examples are welcome!)
