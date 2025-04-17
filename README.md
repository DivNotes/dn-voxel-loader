# DN Voxel Loader [![npm version](https://badge.fury.io/js/dn-voxel-loader.svg)](https://badge.fury.io/js/dn-voxel-loader) ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) [![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

A framework-agnostic JavaScript library for loading MagicaVoxel `.vox` files.

## Features

- Parses `.vox` file format (version 150).
- Extracts voxel dimensions, positions, color indices, palette, and materials.
- Stores voxel data efficiently in a Sparse Octree.
- Zero runtime dependencies.
- Works in Node.js (v18+) and modern browsers supporting `fetch` and `ArrayBuffer`.
- Provides optimized builds for different environments:
  - **ESM** (`dist/dn-voxel-loader.esm.js`): For modern bundlers like Vite, Rollup, Webpack.
  - **CJS** (`dist/dn-voxel-loader.cjs.js`): For Node.js `require()`.
  - **UMD** (`dist/dn-voxel-loader.umd.js`): For direct use in browsers via `<script>` tag (exposes `dnVoxLoader` global).

## Installation

```bash
npm install dn-voxel-loader
# or
yarn add dn-voxel-loader
# or
pnpm add dn-voxel-loader
```

## Basic Usage

```javascript
import { load } from 'dn-voxel-loader'; // Use this for ESM (bundlers, Node.js with "type": "module")
// For CJS: const { load } = require('dn-voxel-loader');
// For UMD: Use the global dnVoxLoader.load()

// Can be a URL, ArrayBuffer, or Node.js Buffer
const modelSource = 'path/to/your/model.vox';

async function loadModel() {
  try {
    // Load the model data
    const voxelData = await load(modelSource);

    console.log('Model Size:', voxelData.size); // { x: number, y: number, z: number }
    console.log('Octree Root:', voxelData.octree.root); // Access the SparseOctree root node

    // Efficiently iterate through all voxels in the octree
    let voxelCount = 0;
    voxelData.octree.iterateVoxels((x, y, z, data) => {
      voxelCount++;
      // Example: Access voxel position (x, y, z) and its data
      // const color = voxelData.palette[data.colorIndex];
      // const material = data.materialId ? voxelData.materials[data.materialId - 1] : null;
      // Use this data for rendering, analysis, etc.
    });
    console.log('Number of Voxels (via iteration):', voxelCount);

    // Alternative: Get all voxels as an array (less efficient for large models)
    // const allVoxels = voxelData.octree.getAllVoxels();
    // console.log('Number of Voxels (via array):', allVoxels.length);
    // if (allVoxels.length > 0) {
    //   console.log('First Voxel:', allVoxels[0]); // { x, y, z, colorIndex, materialId? }
    // }

    console.log('Palette Color Count:', voxelData.palette.length); // Should be 257 (index 0 is empty)
    console.log('Color at Index 1:', voxelData.palette[1]); // { r: number, g: number, b: number, a: number }

    const materialCount = voxelData.materials.filter((m) => m).length;
    console.log('Number of Materials:', materialCount);
    if (materialCount > 0) {
      console.log(
        'First Defined Material:',
        voxelData.materials.find((m) => m)
      );
    }

    // Now use the voxelData, particularly by iterating the octree,
    // to render the model in your chosen framework or engine.
    // See the /examples directory for concrete usage.
  } catch (error) {
    console.error('Failed to load voxel model:', error);
  }
}

loadModel();
```

## Returned Data Structure (`VoxelData`)

The `load` function returns a Promise that resolves to an object with the following structure:

```typescript
interface VoxelData {
  /** The dimensions of the model volume. */
  size: { x: number; y: number; z: number };
  /**
   * A Sparse Octree containing the voxel data for efficient storage and querying.
   * Use methods like `octree.iterateVoxels((x, y, z, data) => ...)` to access voxels.
   * `data` object contains `{ colorIndex: number, materialId?: number }`.
   */
  octree: SparseOctree;
  /**
   * The color palette. This is an array of 257 RGBA color objects.
   * Index 0 is reserved and represents an empty voxel ({ r: 0, g: 0, b: 0, a: 0 }).
   * Indices 1-256 correspond to the colorIndex property of the voxels.
   * Each color object is { r: number; g: number; b: number; a: number } (0-255).
   * If the .vox file includes an RGBA chunk, that palette is used.
   * Otherwise, the standard MagicaVoxel default palette is loaded.
   */
  palette: { r: number; g: number; b: number; a: number }[];
  /**
   * An array containing materials parsed from MATL chunks (if present).
   * The array index corresponds to `material_id - 1`.
   * Contains `VoxelMaterial` objects or `null` for unused IDs.
   */
  materials: (VoxelMaterial | null)[];
}

// Definition for SparseOctree (conceptual - see src/octree.js for implementation)
interface SparseOctree {
  // Iterate over all non-empty voxels in the octree.
  iterateVoxels(
    callback: (
      x: number,
      y: number,
      z: number,
      data: { colorIndex: number; materialId?: number }
    ) => void
  ): void;

  // Get all voxels as an array (potentially memory-intensive).
  getAllVoxels(): {
    x: number;
    y: number;
    z: number;
    colorIndex: number;
    materialId?: number;
  }[];

  // Get the data for a specific voxel coordinate.
  get(
    x: number,
    y: number,
    z: number
  ): { colorIndex: number; materialId?: number } | null;

  // ... other potential methods (traverse, simplify)
}

// Definition for VoxelMaterial (conceptual - see src/types.js)
interface VoxelMaterial {
  id: number;
  type: 'diffuse' | 'metal' | 'glass' | 'emissive' | 'blend' | 'media';
  // Optional float properties like: weight, rough, spec, ior, att, flux, emit, ldr, metal, power, glow
  // Optional boolean properties like: isTotalPower
  properties: Record<string, number | boolean>; // Properties parsed from MATL chunk dict
}
```

## Examples

- **Pure JS:** See `examples/pure-js/`. Open `index.html` in your browser. This example uses the UMD build and renders the voxels to a 2D Canvas.
- **React Three Fiber:** See `examples/react-three-fiber/`. This demonstrates using the library with React and Three.js.

## Development

To contribute or work on this library locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/divnotes/dn-voxel-loader.git
    cd dn-voxel-loader
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Build the library:**

    ```bash
    npm run build
    ```

    This generates the `dist/` directory containing the ESM, CJS, and UMD builds along with sourcemaps.

4.  **Run tests:**

    ```bash
    npm run test
    # Or for watch mode:
    npm run test:watch
    ```

5.  **Check formatting and linting:**

    ```bash
    npm run format:check
    npm run lint
    # To automatically fix formatting:
    npm run format
    # To automatically fix linting errors:
    npm run lint:fix
    ```

6.  **Contribution Guidelines:** Please review the [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

7.  **Releases:** Releases to npm and GitHub are automated via [GitHub Actions](.github/workflows/release.yml) when a new version tag (e.g., `v1.2.3`) is pushed.

## License

[MPL-2.0](LICENSE)
