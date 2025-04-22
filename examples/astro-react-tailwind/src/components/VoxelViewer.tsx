import { Suspense, useEffect, useMemo, useRef, useState } from 'react';

import * as THREE from 'three';

import { load, type VoxelData } from '@divnotes/dn-voxel-loader';
import { Environment, OrbitControls, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

interface LeafData {
  colorIndex: number;
}

const modelPath = '/coding.vox';

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

const Loader = () => {
  return (
    <Text
      position={[0, 0, 0]}
      fontSize={5}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Loading...
    </Text>
  );
};

const VoxelModel = () => {
  const [renderData, setRenderData] = useState<{
    data: VoxelData;
    count: number;
  } | null>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    console.log(`[VoxelViewer] Loading model: ${modelPath}`);
    load(modelPath)
      .then((loadedData: VoxelData) => {
        console.log('[VoxelViewer] Model loaded:', loadedData);

        if (!loadedData || !loadedData.octree || !loadedData.palette) {
          console.error(
            '[VoxelViewer] Loaded data missing required properties (octree/palette).'
          );
          return;
        }

        let count = 0;
        loadedData.octree.iterateVoxels(
          (_x: number, _y: number, _z: number, leafData: LeafData) => {
            const colorIndex = leafData.colorIndex;
            const colorData =
              colorIndex > 0 && colorIndex < loadedData.palette.length
                ? loadedData.palette[colorIndex]
                : null;
            if (colorData && colorData.a > 0) {
              count++;
            }
          }
        );

        console.log('[VoxelViewer] Calculated instance count:', count);
        setRenderData({ data: loadedData, count });
      })
      .catch((err: Error | any) => {
        console.error('[VoxelViewer] Failed to load voxel model:', err);
      });
  }, []);

  const boxGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const standardMaterial = useMemo(() => new THREE.MeshStandardMaterial(), []);

  useEffect(() => {
    if (!renderData || !meshRef.current) {
      console.log(
        '[VoxelViewer] Skipping mesh population (no data or mesh ref).'
      );
      return;
    }

    const { data, count } = renderData;
    const { size, octree, palette } = data;
    const mesh = meshRef.current;

    if (!size || !octree || !palette || count === 0) {
      console.warn(
        '[VoxelViewer] Skipping mesh population due to missing data or zero count.'
      );
      mesh.count = 0;
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      return;
    }

    // Calculate offsets for centering
    const offsetX = -size.x / 2 + 0.5;
    const offsetY = -size.z / 2 + 0.5; // VOX Z -> THREE Y
    const offsetZ = -size.y / 2 + 0.5; // VOX Y -> THREE Z

    console.log(`[VoxelViewer] Populating ${count} instances...`);
    let instanceIndex = 0;

    octree.iterateVoxels(
      (x: number, y: number, z: number, leafData: LeafData) => {
        const colorIndex = leafData.colorIndex;
        const colorData =
          colorIndex > 0 && colorIndex < palette.length
            ? palette[colorIndex]
            : null;

        // Skip empty/transparent voxels
        if (!colorData || colorData.a === 0) return;

        // Prevent buffer overflow if count logic was somehow wrong
        if (instanceIndex >= count) {
          console.warn(
            '[VoxelViewer] Exceeded calculated instance count while populating mesh.'
          );
          return;
        }

        // Set instance position
        tempObject.position.set(x + offsetX, z + offsetY, y + offsetZ);
        tempObject.updateMatrix();
        mesh.setMatrixAt(instanceIndex, tempObject.matrix);

        // Set instance color (sRGB to Linear)
        tempColor.setRGB(
          colorData.r / 255,
          colorData.g / 255,
          colorData.b / 255
        );
        tempColor.convertSRGBToLinear();
        mesh.setColorAt(instanceIndex, tempColor);

        instanceIndex++;
      }
    );

    // Important: Update mesh instance count and flags
    mesh.count = instanceIndex; // Use actual populated count
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }

    console.log(
      `[VoxelViewer] InstancedMesh population complete. Actual instances: ${instanceIndex}`
    );
  }, [renderData, boxGeometry, standardMaterial]); // Depend on renderData state

  // Conditionally render the InstancedMesh only when data and count are ready
  if (!renderData) {
    // Optionally return a loader or null while data is loading/counting
    return null;
  }

  return (
    <instancedMesh
      ref={meshRef}
      // Use the calculated count from state for initial allocation
      args={[boxGeometry, standardMaterial, renderData.count]}
    />
  );
};

// Main component wrapping the Canvas setup
const VoxelViewer = () => {
  return (
    // Container div for sizing
    <div style={{ width: '100%', height: '80vh', background: '#282c34' }}>
      <Canvas camera={{ position: [0, 30, 100], fov: 50 }}>
        {/* Lighting setup */}
        <ambientLight intensity={1.0} />
        <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} />

        {/* Environment map */}
        <Environment preset="sunset" />

        {/* Suspense for loading state */}
        <Suspense fallback={<Loader />}>
          <VoxelModel />
        </Suspense>

        {/* Camera controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default VoxelViewer;
