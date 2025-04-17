[dn-voxel-loader - v0.1.0](../README.md) / [dn-voxel-loader](../modules/dn_voxel_loader.md) / VoxelData

# Interface: VoxelData\<\>

[dn-voxel-loader](../modules/dn_voxel_loader.md).VoxelData

## Table of contents

### Properties

- [materials](dn_voxel_loader.VoxelData.md#materials)
- [octree](dn_voxel_loader.VoxelData.md#octree)
- [palette](dn_voxel_loader.VoxelData.md#palette)
- [size](dn_voxel_loader.VoxelData.md#size)

## Properties

### materials

• **materials**: [`VoxelMaterial`](dn_voxel_loader_types.VoxelMaterial.md)[]

Array of materials defined in the file (index corresponds to material ID - 1, e.g., materials[0] is ID 1).

#### Defined in

types.js:71

---

### octree

• **octree**: [`SparseOctree`](../classes/dn_voxel_loader_octree.SparseOctree.md)

The sparse octree containing voxel data.

#### Defined in

types.js:69

---

### palette

• **palette**: [`RGBA`](dn_voxel_loader_types.RGBA.md)[]

The color palette (array of 257 RGBA objects, index 0 is empty).

#### Defined in

types.js:70

---

### size

• **size**: [`VoxelSize`](dn_voxel_loader_types.VoxelSize.md)

The dimensions of the model.

#### Defined in

types.js:68
