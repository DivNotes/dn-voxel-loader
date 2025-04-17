[dn-voxel-loader - v0.1.0](../README.md) / dn-voxel-loader/parser

# Module: dn-voxel-loader/parser

**`Fileoverview`**

Parser for MagicaVoxel .vox files.

**`Author`**

DivNotes

## Table of contents

### References

- [RGBA](dn_voxel_loader_parser.md#rgba)
- [VoxelData](dn_voxel_loader_parser.md#voxeldata)
- [VoxelMaterial](dn_voxel_loader_parser.md#voxelmaterial)

### Type Aliases

- [SparseOctree](dn_voxel_loader_parser.md#sparseoctree)

### Functions

- [parseVoxModel](dn_voxel_loader_parser.md#parsevoxmodel)

## References

### RGBA

Re-exports [RGBA](../interfaces/dn_voxel_loader_types.RGBA.md)

---

### VoxelData

Re-exports [VoxelData](../interfaces/dn_voxel_loader.VoxelData.md)

---

### VoxelMaterial

Re-exports [VoxelMaterial](../interfaces/dn_voxel_loader_types.VoxelMaterial.md)

## Type Aliases

### SparseOctree

Ƭ **SparseOctree**\<\>: [`dn-voxel-loader/octree`](dn_voxel_loader_octree.md)

#### Defined in

parser.js:17

## Functions

### parseVoxModel

▸ **parseVoxModel**(`arrayBuffer`): `Promise`\<[`VoxelData`](../interfaces/dn_voxel_loader.VoxelData.md)\>

Parses the .vox file content.

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `arrayBuffer` | `ArrayBuffer` |

#### Returns

`Promise`\<[`VoxelData`](../interfaces/dn_voxel_loader.VoxelData.md)\>

#### Defined in

parser.js:350
