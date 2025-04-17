# API Reference

Welcome to the API reference for DN Voxel Loader.

The detailed documentation for all public functions, classes, interfaces, and types is automatically generated from the source code comments using [TypeDoc](https://typedoc.org/).

Please use the sidebar navigation under "API Reference" to explore the available modules and components.

- **[Generated API Overview](./api/generated/README.md)**

## `load(source)`

Asynchronously loads and parses a `.vox` file.

- **Parameters:**
  - `source` (`string | ArrayBuffer | Buffer`): The source of the `.vox` file. Can be:
    - A URL string (fetched using `fetch`).
    - An `ArrayBuffer` containing the file data.
    - A Node.js `Buffer` containing the file data.
- **Returns:** `Promise<VoxelData>` - A promise that resolves to a `VoxelData` object.
- **Throws:** An error if fetching or parsing fails.

The `load` function is the primary method for loading voxel models. It handles different input types and returns a structured `VoxelData` object containing all necessary information about the model.

## `VoxelData`

The object returned by the `load` function.

- **Properties:**
  - `size` (`{ x: number; y: number; z: number }`): The dimensions of the model.
  - `octree` (`SparseOctree`): The octree containing voxel data. This structure allows for efficient storage and retrieval of voxel information.
  - `palette` (`{ r: number; g: number; b: number; a: number }[]`): The color palette (257 entries, index 0 is empty). This array provides the RGBA values for each color used in the model.
  - `materials` (`(VoxelMaterial | null)[]`): Array of parsed materials. Each material contains properties that define its appearance and behavior.

## `SparseOctree`

A class representing the octree structure used for efficient voxel storage.

- **Methods:**
  - `iterateVoxels(callback)`: Iterates over non-empty voxels.
    - `callback` (`(x, y, z, data) => void`): Function called for each voxel.
      - `data` (`{ colorIndex: number; materialId?: number }`): Contains the color index and optional material ID for the voxel.
  - `getAllVoxels()`: Returns an array of all voxels (potentially large). This method is useful for accessing all voxel data at once but can be memory-intensive.
  - `get(x, y, z)`: Returns data for a specific voxel or `null`. This method allows for direct access to voxel data at specific coordinates.

The `SparseOctree` class is central to the dn-voxel-loader's ability to properly manage voxel data, providing methods for both iteration and direct access.

## Type Definitions

We use JSDoc annotations to define types such as `VoxelMaterial`.
