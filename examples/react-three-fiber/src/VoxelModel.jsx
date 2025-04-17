import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';

import { load } from '../../../dist/dn-voxel-loader.esm.js';

// Path to the asset relative to the public directory or served location
// Vite serves assets from `public` or handles imports directly.
// Let's assume the model is copied to the `public` dir for simplicity.
// OR: Adjust path if serving differently, e.g., from `../assets/` might work if Vite handles it.
const modelPath = '/coding.vox'; // Needs to be in examples/react-three-fiber/public/

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function VoxelModel(props) {
  const [voxelData, setVoxelData] = useState(null);
  const [error, setError] = useState(null);
  const meshRef = useRef();

  useEffect(() => {
    console.log(`Attempting to load model from: ${modelPath}`);
    load(modelPath)
      .then((data) => {
        console.log('Model loaded successfully:', data);
        // Estimate voxel count for InstancedMesh initialization
        let count = 0;
        if (data && data.octree) {
          // Check data and octree exist
          data.octree.iterateVoxels(() => count++);
        } else {
          console.warn('[VoxelModel] Octree missing in loaded data!', data);
        }
        console.log('[VoxelModel] Estimated voxel count:', count);
        setVoxelData({ ...data, estimatedCount: count });
      })
      .catch((err) => {
        console.error('Failed to load voxel model:', err);
        setError(err.message || 'Failed to load model');
      });
  }, []); // Load only once on mount

  // Memoize geometry and material to prevent recreation on every render
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  // Revert back to MeshStandardMaterial for lighting interaction
  const standardMaterial = useMemo(() => new THREE.MeshStandardMaterial(), []);

  // Effect to update InstancedMesh when voxelData is loaded
  useEffect(() => {
    if (!voxelData || !meshRef.current || voxelData.estimatedCount === 0) {
      console.log(
        '[VoxelModel] Skipping instance update (no data, mesh, or zero count).',
        {
          hasData: !!voxelData,
          hasMesh: !!meshRef.current,
          count: voxelData?.estimatedCount,
        }
      ); // DEBUG LOG
      return;
    }

    const { size, octree, palette, /* materials, */ estimatedCount } =
      voxelData;
    const mesh = meshRef.current;

    // Center offset (Mapping MagicaVoxel Z-up to Three.js Y-up)
    const offsetX = -size.x / 2 + 0.5;
    const offsetY = -size.z / 2 + 0.5; // Map VOX Z (up) to THREE Y (up)
    const offsetZ = -size.y / 2 + 0.5; // Map VOX Y (depth) to THREE Z (depth)

    console.log(`[VoxelModel] Setting up ${estimatedCount} instances...`); // DEBUG LOG
    let instanceIndex = 0;

    // Iterate through voxels in the octree
    octree.iterateVoxels((x, y, z, leafData) => {
      if (instanceIndex >= estimatedCount) {
        console.warn(
          'More voxels found than initially estimated. Resizing InstancedMesh might be needed for accuracy.'
        );
        // In a real app, you might want to resize the InstancedMesh here if the count differs significantly
        // or ensure the initial count is precise.
        return;
      }

      const colorIndex = leafData.colorIndex;
      const colorData =
        colorIndex > 0 && colorIndex < palette.length
          ? palette[colorIndex]
          : null;

      if (!colorData || colorData.a === 0) return; // Skip empty/transparent

      // TODO: Incorporate material properties if needed
      // const materialId = leafData.materialId;
      // const material = materialId && materials[materialId - 1];
      // if (material) { ... apply material props ... }

      // Set position (mapping VOX Z-up to Three Y-up)
      tempObject.position.set(
        x + offsetX,
        z + offsetY, // VOX Z is up
        y + offsetZ // VOX Y is depth
      );
      tempObject.updateMatrix();
      mesh.setMatrixAt(instanceIndex, tempObject.matrix);

      // Set color
      tempColor.setRGB(colorData.r / 255, colorData.g / 255, colorData.b / 255);
      // Assuming sRGB output, convert color to linear for MeshStandardMaterial
      tempColor.convertSRGBToLinear();
      mesh.setColorAt(instanceIndex, tempColor);

      instanceIndex++;
    });

    console.log(
      `[VoxelModel] Finished iteration. Actual instances set: ${instanceIndex}`
    ); // DEBUG LOG

    // If the actual count was less than estimated (due to simplification or iteration issues),
    // we might have unused instances. This is generally okay, but good to log.
    if (instanceIndex < estimatedCount) {
      console.warn(
        `Final instance count (${instanceIndex}) is less than estimated (${estimatedCount}).`
      );
    }

    mesh.count = instanceIndex; // Set the actual count used
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
    console.log('InstancedMesh updated.');
  }, [voxelData]);

  if (error) {
    // Handle error display if needed, maybe using <Html>
    // For now, just log and render nothing for the model
    console.error('Render error state:', error);
    return null;
  }

  if (!voxelData) {
    // Render nothing while loading, parent component handles <Loader>
    return null;
  }

  // Render only when voxelData is available and has an estimated count > 0
  return (
    <instancedMesh
      ref={meshRef}
      // Initialize with estimated count, update actual count after iteration
      args={[boxGeometry, standardMaterial, voxelData.estimatedCount || 1]}
      {...props}
    />
  );
}
