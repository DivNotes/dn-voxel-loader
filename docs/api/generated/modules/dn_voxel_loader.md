[dn-voxel-loader - v0.1.0](../README.md) / dn-voxel-loader

# Module: dn-voxel-loader

**`Fileoverview`**

Main entry point for DN Voxel Loader.

**`Author`**

DivNotes

## Table of contents

### Interfaces

- [VoxelData](../interfaces/dn_voxel_loader.VoxelData.md)

### Functions

- [load](dn_voxel_loader.md#load)

## Functions

### load

▸ **load**(`source`): `Promise`\<[`VoxelData`](../interfaces/dn_voxel_loader.VoxelData.md)\>

Loads and parses a .vox file from a URL or ArrayBuffer.

#### Parameters

| Name     | Type  | Description                                                                 |
| :------- | :---- | :-------------------------------------------------------------------------- |
| `source` | `any` | The URL of the .vox file or an ArrayBuffer/Buffer containing the file data. |

#### Returns

`Promise`\<[`VoxelData`](../interfaces/dn_voxel_loader.VoxelData.md)\>

A promise that resolves with the parsed voxel data.

**`Throws`**

If the source is invalid, fetch fails, or parsing fails.

**`Example`**

```ts
// Load from URL
try {
  const voxelData = await load('path/to/your/model.vox');
  console.log('Voxels loaded:', voxelData);
  // Use voxelData (e.g., render it)
} catch (error) {
  console.error('Loading failed:', error);
}
```

**`Example`**

```ts
// Load from ArrayBuffer (e.g., from a file input)
async function handleFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  try {
    const voxelData = await load(arrayBuffer);
    console.log('Voxels loaded:', voxelData);
  } catch (error) {
    console.error('Loading failed:', error);
  }
}
```

#### Defined in

index.js:47
