# Guide

This guide provides detailed instructions and explanations for using DN Voxel Loader.

## What is DN Voxel Loader?

DN Voxel Loader is a JavaScript library designed for efficient loading and parsing of voxel models, particularly in the `.vox` (MagicaVoxel) format. Its goal is to provide a simple and flexible API for integrating voxel assets into web-based 3D applications, games, and visualizations.

Key Features:

- **Format Support:** Optimized for `.vox` files.
- **Flexible Input:** Accepts URLs, `ArrayBuffer`s, or Node.js `Buffer`s as input.
- **Structured Output:** Provides parsed voxel data in an easy-to-use format, including dimensions, palette, and voxel positions/colors.
- **Efficient Storage:** Uses a Sparse Octree data structure for optimal memory usage and fast spatial queries.
- **Palette & Material Support:** Fully supports RGBA color palettes and materials from MagicaVoxel.

**(Potential Future Features):** Chunking API for rendering, Level of Detail (LOD), additional format support.

## Getting Started

### Installation

```bash
npm install dn-voxel-loader
# or
yarn add dn-voxel-loader
# or
pnpm add dn-voxel-loader
```

### Basic Usage

Loading a voxel model is straightforward using the `load` function.

```javascript
import { load } from 'dn-voxel-loader';

// Provide the source of your voxel model.
// This can be a URL string pointing to the file...
const modelUrl = 'path/to/your/model.vox';
// ...or an ArrayBuffer if you've already fetched the file...
// const modelBuffer = fetchedArrayBuffer;
// ...or a Node.js Buffer if running in a Node environment.
// const modelNodeBuffer = fs.readFileSync('path/to/your/model.vox');

async function loadModel(source) {
  try {
    console.log(
      `Loading model from: ${typeof source === 'string' ? source : 'Buffer/ArrayBuffer'}...`
    );
    // The load function is asynchronous and returns a Promise
    const voxelData = await load(source);

    console.log('Model loaded successfully!');
    console.log('Dimensions:', voxelData.size); // { x: number, y: number, z: number }
    console.log('Number of voxels:', voxelData.voxels.length);
    // console.log('Palette:', voxelData.palette); // Array of {r, g, b, a} objects
    // console.log('First 10 Voxels:', voxelData.voxels.slice(0, 10)); // Array of { x, y, z, colorIndex } objects

    // Now you can use the voxelData to render the model,
    // for example, by creating instances or geometry in Three.js, Babylon.js, etc.
    // renderMyModel(voxelData);
  } catch (error) {
    console.error('Failed to load voxel model:', error);
  }
}

// Example call
loadModel(modelUrl);

// Function to integrate with your rendering logic (example placeholder)
function renderMyModel(voxelData) {
  console.log('Rendering logic would go here.');
  // Example: Iterate through voxelData.voxels and create meshes
}
```

The `load` function takes the model source as its primary argument. Optional configuration parameters might be added in the future.

The returned `voxelData` object typically contains:

- `size`: An object `{ x, y, z }` representing the dimensions of the model volume.
- `voxels`: An array of objects `{ x, y, z, colorIndex }`, where `x, y, z` are the coordinates of the voxel, and `colorIndex` refers to the index in the `palette`.
- `palette`: An array of color objects `{ r, g, b, a }` (usually 256 entries, index 0 is empty space).

## Advanced Usage

### Working with the Octree

The octree is central to efficiently working with DN Voxel Loader. It allows you to access voxel data without keeping everything in a flat array:

```javascript
import { load } from 'dn-voxel-loader';

async function workWithOctree() {
  const voxelData = await load('model.vox');
  const { octree, palette } = voxelData;

  // Method 1: Iterate through all non-empty voxels (most efficient)
  octree.iterateVoxels((x, y, z, data) => {
    const { colorIndex, materialId } = data;
    const color = palette[colorIndex];

    // Do something with each voxel
    console.log(
      `Voxel at (${x},${y},${z}) has color RGB(${color.r},${color.g},${color.b})`
    );

    if (materialId !== undefined) {
      const material = voxelData.materials[materialId - 1];
      console.log(`  This voxel uses material ID ${materialId}`);
    }
  });

  // Method 2: Get a specific voxel by coordinates
  const voxelAt123 = octree.get(1, 2, 3);
  if (voxelAt123) {
    console.log(
      'Found voxel at (1,2,3) with color index:',
      voxelAt123.colorIndex
    );
  } else {
    console.log('No voxel at (1,2,3)');
  }

  // Method 3: Get all voxels as an array (less efficient for large models)
  // Avoid this for very large models as it will create a large array
  const allVoxels = octree.getAllVoxels();
  console.log(`Model has ${allVoxels.length} voxels in total`);
}
```

### Working with Materials

MagicaVoxel's `.vox` format supports materials with various properties. When a model includes material definitions, you can access them through the `materials` array:

```javascript
import { load } from 'dn-voxel-loader';

async function workWithMaterials() {
  const voxelData = await load('model_with_materials.vox');

  // Print information about all materials
  voxelData.materials.forEach((material, index) => {
    if (!material) return; // Skip null entries

    console.log(`Material ID ${material.id} (type: ${material.type})`);

    // Material properties vary based on type
    for (const [key, value] of Object.entries(material.properties)) {
      console.log(`  ${key}: ${value}`);
    }

    // Common properties include:
    // - weight: material weight for blending
    // - rough: roughness
    // - spec: specularity
    // - ior: index of refraction (for glass)
    // - att: attenuation (for glass)
    // - flux: for emissive materials
    // - emit: for emissive materials
    // - ldr: for limiting flux
    // - metal: metalness factor
  });

  // Find voxels with a specific material
  const emissiveMaterialId =
    voxelData.materials.findIndex((m) => m && m.type === 'emissive') + 1;

  if (emissiveMaterialId > 0) {
    const emissiveVoxels = [];
    voxelData.octree.iterateVoxels((x, y, z, data) => {
      if (data.materialId === emissiveMaterialId) {
        emissiveVoxels.push({ x, y, z, ...data });
      }
    });

    console.log(`Found ${emissiveVoxels.length} emissive voxels`);
  }
}
```

### Performance Considerations

When working with large voxel models, consider these performance tips:

1. **Use iterateVoxels instead of getAllVoxels**: The `iterateVoxels` method avoids creating large temporary arrays.

2. **Chunking for Rendering**: When rendering large models in WebGL/Three.js, consider splitting the model into chunks:

```javascript
import { load } from 'dn-voxel-loader';
import * as THREE from 'three'; // Example with Three.js

async function renderWithChunking() {
  const voxelData = await load('large_model.vox');
  const chunkSize = 16; // Size of each chunk
  const chunks = new Map(); // Map to store chunks

  // Group voxels into chunks
  voxelData.octree.iterateVoxels((x, y, z, data) => {
    // Calculate chunk coordinates
    const chunkX = Math.floor(x / chunkSize);
    const chunkY = Math.floor(y / chunkSize);
    const chunkZ = Math.floor(z / chunkSize);
    const chunkKey = `${chunkX},${chunkY},${chunkZ}`;

    // Create or add to chunk
    if (!chunks.has(chunkKey)) {
      chunks.set(chunkKey, []);
    }
    chunks.get(chunkKey).push({
      x: x % chunkSize, // Local position within chunk
      y: y % chunkSize,
      z: z % chunkSize,
      colorIndex: data.colorIndex,
      materialId: data.materialId,
    });
  });

  // Now render each chunk separately
  for (const [chunkKey, voxels] of chunks) {
    // Create geometry for this chunk
    const [chunkX, chunkY, chunkZ] = chunkKey.split(',').map(Number);
    const chunkPosition = new THREE.Vector3(
      chunkX * chunkSize,
      chunkY * chunkSize,
      chunkZ * chunkSize
    );

    // Create merged geometry or instanced mesh for this chunk
    // (implementation depends on your rendering approach)
  }
}
```

3. **Instanced Rendering**: For WebGL rendering, use instanced meshes instead of individual meshes for each voxel.

4. **Level of Detail (LOD)**: For very large models, implement LOD by simplifying distant chunks.
