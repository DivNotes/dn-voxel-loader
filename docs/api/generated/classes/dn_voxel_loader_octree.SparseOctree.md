[dn-voxel-loader - v0.1.0](../README.md) / [dn-voxel-loader/octree](../modules/dn_voxel_loader_octree.md) / SparseOctree

# Class: SparseOctree

[dn-voxel-loader/octree](../modules/dn_voxel_loader_octree.md).SparseOctree

Simple Sparse Octree implementation for storing voxel data.
Assumes coordinates are non-negative integers.

## Table of contents

### Constructors

- [constructor](dn_voxel_loader_octree.SparseOctree.md#constructor)

### Properties

- [depth](dn_voxel_loader_octree.SparseOctree.md#depth)
- [maxDimension](dn_voxel_loader_octree.SparseOctree.md#maxdimension)
- [root](dn_voxel_loader_octree.SparseOctree.md#root)
- [size](dn_voxel_loader_octree.SparseOctree.md#size)

### Methods

- [\_calculatePath](dn_voxel_loader_octree.SparseOctree.md#_calculatepath)
- [\_compareLeafData](dn_voxel_loader_octree.SparseOctree.md#_compareleafdata)
- [\_getOctant](dn_voxel_loader_octree.SparseOctree.md#_getoctant)
- [\_iterateNodeVoxels](dn_voxel_loader_octree.SparseOctree.md#_iteratenodevoxels)
- [\_simplifyNode](dn_voxel_loader_octree.SparseOctree.md#_simplifynode)
- [\_traverseNode](dn_voxel_loader_octree.SparseOctree.md#_traversenode)
- [get](dn_voxel_loader_octree.SparseOctree.md#get)
- [getAllVoxels](dn_voxel_loader_octree.SparseOctree.md#getallvoxels)
- [insert](dn_voxel_loader_octree.SparseOctree.md#insert)
- [iterateVoxels](dn_voxel_loader_octree.SparseOctree.md#iteratevoxels)
- [simplify](dn_voxel_loader_octree.SparseOctree.md#simplify)
- [traverse](dn_voxel_loader_octree.SparseOctree.md#traverse)

## Constructors

### constructor

• **new SparseOctree**(`size`): [`SparseOctree`](dn_voxel_loader_octree.SparseOctree.md)

#### Parameters

| Name   | Type                                                            | Description                                     |
| :----- | :-------------------------------------------------------------- | :---------------------------------------------- |
| `size` | [`VoxelSize`](../interfaces/dn_voxel_loader_types.VoxelSize.md) | The bounding box dimensions of the voxel space. |

#### Returns

[`SparseOctree`](dn_voxel_loader_octree.SparseOctree.md)

#### Defined in

octree.js:73

## Properties

### depth

• **depth**: `number` = `0`

#### Defined in

octree.js:68

---

### maxDimension

• **maxDimension**: `number` = `0`

#### Defined in

octree.js:65

---

### root

• **root**: [`OctreeNode`](dn_voxel_loader_octree.OctreeNode.md) = `null`

#### Defined in

octree.js:59

---

### size

• **size**: [`VoxelSize`](../interfaces/dn_voxel_loader_types.VoxelSize.md) = `null`

#### Defined in

octree.js:62

## Methods

### \_calculatePath

▸ **\_calculatePath**(`x`, `y`, `z`): `number`[]

Helper method to calculate the octant path for a coordinate

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |
| `z`  | `number` |

#### Returns

`number`[]

Array of octant indices representing the path from root to leaf

#### Defined in

octree.js:219

---

### \_compareLeafData

▸ **\_compareLeafData**(`d1`, `d2`): `boolean`

Compares two leaf data objects.

#### Parameters

| Name             | Type     |
| :--------------- | :------- |
| `d1`             | `Object` |
| `d1.colorIndex`  | `number` |
| `d1.materialId?` | `number` |
| `d2`             | `Object` |
| `d2.colorIndex`  | `number` |
| `d2.materialId?` | `number` |

#### Returns

`boolean`

#### Defined in

octree.js:509

---

### \_getOctant

▸ **\_getOctant**(`x`, `y`, `z`, `nodeCenterX`, `nodeCenterY`, `nodeCenterZ`): `number`

Gets the octant index (0-7) for a given point within a node's bounds.

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `x`           | `number` |
| `y`           | `number` |
| `z`           | `number` |
| `nodeCenterX` | `number` |
| `nodeCenterY` | `number` |
| `nodeCenterZ` | `number` |

#### Returns

`number`

Octant index (0-7)

#### Defined in

octree.js:98

---

### \_iterateNodeVoxels

▸ **\_iterateNodeVoxels**(`node`, `currentX`, `currentY`, `currentZ`, `depth`, `callback`): `void`

Recursive helper for iterateVoxels.

#### Parameters

| Name       | Type                                                                                                                   | Description                                            |
| :--------- | :--------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| `node`     | [`OctreeNode`](dn_voxel_loader_octree.OctreeNode.md)                                                                   |                                                        |
| `currentX` | `number`                                                                                                               | Minimum corner coordinate of the current node's bounds |
| `currentY` | `number`                                                                                                               | Minimum corner coordinate of the current node's bounds |
| `currentZ` | `number`                                                                                                               | Minimum corner coordinate of the current node's bounds |
| `depth`    | `number`                                                                                                               | Current depth level (decreases as we go down)          |
| `callback` | (`x`: `number`, `y`: `number`, `z`: `number`, `data`: \{ `colorIndex`: `number` ; `materialId?`: `number` }) => `void` |                                                        |

#### Returns

`void`

#### Defined in

octree.js:361

---

### \_simplifyNode

▸ **\_simplifyNode**(`node`): `boolean`

Recursive helper for simplify.

#### Parameters

| Name   | Type                                                 |
| :----- | :--------------------------------------------------- |
| `node` | [`OctreeNode`](dn_voxel_loader_octree.OctreeNode.md) |

#### Returns

`boolean`

Whether all children have the same data

#### Defined in

octree.js:443

---

### \_traverseNode

▸ **\_traverseNode**(`node`, `x`, `y`, `z`, `depth`, `sideLength`, `callback`): `void`

Recursive helper for traverse.

#### Parameters

| Name         | Type                                                                                                                                                             |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node`       | [`OctreeNode`](dn_voxel_loader_octree.OctreeNode.md)                                                                                                             |
| `x`          | `number`                                                                                                                                                         |
| `y`          | `number`                                                                                                                                                         |
| `z`          | `number`                                                                                                                                                         |
| `depth`      | `number`                                                                                                                                                         |
| `sideLength` | `number`                                                                                                                                                         |
| `callback`   | (`node`: [`OctreeNode`](dn_voxel_loader_octree.OctreeNode.md), `x`: `number`, `y`: `number`, `z`: `number`, `depth`: `number`, `sideLength`: `number`) => `void` |

#### Returns

`void`

#### Defined in

octree.js:317

---

### get

▸ **get**(`x`, `y`, `z`): `Object`

Retrieves voxel data at the specified coordinates.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |
| `z`  | `number` |

#### Returns

`Object`

The data at the coordinates, or null if empty.

| Name          | Type     |
| :------------ | :------- |
| `colorIndex`  | `number` |
| `materialId?` | `number` |

#### Defined in

octree.js:252

---

### getAllVoxels

▸ **getAllVoxels**(): [`Voxel`](../interfaces/dn_voxel_loader_types.Voxel.md)[]

Returns an array of all non-empty voxels in the octree.
Note: This can be memory-intensive for large models. Prefer using iterateVoxels.

#### Returns

[`Voxel`](../interfaces/dn_voxel_loader_types.Voxel.md)[]

Array of voxels with their coordinates and data

#### Defined in

octree.js:422

---

### insert

▸ **insert**(`x`, `y`, `z`, `data`): `void`

Inserts voxel data into the octree.

#### Parameters

| Name               | Type     | Description                                                                                 |
| :----------------- | :------- | :------------------------------------------------------------------------------------------ |
| `x`                | `number` |                                                                                             |
| `y`                | `number` |                                                                                             |
| `z`                | `number` |                                                                                             |
| `data`             | `Object` | Data associated with the voxel (e.g., { colorIndex, materialId? }). Must not be null/empty. |
| `data.colorIndex`  | `number` | -                                                                                           |
| `data.materialId?` | `number` | -                                                                                           |

#### Returns

`void`

#### Defined in

octree.js:113

---

### iterateVoxels

▸ **iterateVoxels**(`callback`): `void`

Iterates through all non-empty leaf nodes (voxels) and calls a callback.

#### Parameters

| Name       | Type                                                                                                                   |
| :--------- | :--------------------------------------------------------------------------------------------------------------------- |
| `callback` | (`x`: `number`, `y`: `number`, `z`: `number`, `data`: \{ `colorIndex`: `number` ; `materialId?`: `number` }) => `void` |

#### Returns

`void`

#### Defined in

octree.js:348

---

### simplify

▸ **simplify**(): `void`

Simplifies the octree by merging nodes with the same data.
Call this after all voxels have been inserted to optimize the tree.

#### Returns

`void`

#### Defined in

octree.js:434

---

### traverse

▸ **traverse**(`callback`): `void`

Traverses the octree and calls a callback for each node.

#### Parameters

| Name       | Type                                                                                                                                                             |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `callback` | (`node`: [`OctreeNode`](dn_voxel_loader_octree.OctreeNode.md), `x`: `number`, `y`: `number`, `z`: `number`, `depth`: `number`, `sideLength`: `number`) => `void` |

#### Returns

`void`

#### Defined in

octree.js:295
