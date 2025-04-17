[dn-voxel-loader - v0.1.0](../README.md) / [dn-voxel-loader/octree](../modules/dn_voxel_loader_octree.md) / OctreeNode

# Class: OctreeNode

[dn-voxel-loader/octree](../modules/dn_voxel_loader_octree.md).OctreeNode

Represents a node in the Sparse Octree.
It can either be an internal node with 8 children or a leaf node holding data.

## Table of contents

### Constructors

- [constructor](dn_voxel_loader_octree.OctreeNode.md#constructor)

### Properties

- [children](dn_voxel_loader_octree.OctreeNode.md#children)
- [data](dn_voxel_loader_octree.OctreeNode.md#data)
- [isLeaf](dn_voxel_loader_octree.OctreeNode.md#isleaf)

### Methods

- [isEmpty](dn_voxel_loader_octree.OctreeNode.md#isempty)

## Constructors

### constructor

• **new OctreeNode**(): [`OctreeNode`](dn_voxel_loader_octree.OctreeNode.md)

#### Returns

[`OctreeNode`](dn_voxel_loader_octree.OctreeNode.md)

#### Defined in

octree.js:34

## Properties

### children

• **children**: [`OctreeNode`](dn_voxel_loader_octree.OctreeNode.md)[] = `null`

#### Defined in

octree.js:26

---

### data

• **data**: `Object` = `null`

#### Type declaration

| Name          | Type     |
| :------------ | :------- |
| `colorIndex`  | `number` |
| `materialId?` | `number` |

#### Defined in

octree.js:29

---

### isLeaf

• **isLeaf**: `boolean` = `false`

#### Defined in

octree.js:32

## Methods

### isEmpty

▸ **isEmpty**(): `boolean`

Determines if this node is effectively empty (no data and no children with data).

#### Returns

`boolean`

#### Defined in

octree.js:44
