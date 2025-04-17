/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * @fileoverview Sparse octree implementation for efficient voxel storage.
 * @author DivNotes
 * @module dn-voxel-loader/octree
 */

/**
 * @typedef {import('./types.js').Voxel} Voxel
 * @typedef {import('./types.js').VoxelSize} VoxelSize
 * @typedef {import('./types.js').RGBA} RGBA
 * @typedef {{ colorIndex: number, materialId?: number } | null} VoxelLeafData
 */

/**
 * Represents a node in the Sparse Octree.
 * It can either be an internal node with 8 children or a leaf node holding data.
 */
export class OctreeNode {
  /** @type {Array<OctreeNode|null>} */
  children = null; // Array of 8 children, null if leaf or empty subtree

  /** @type {VoxelLeafData} */
  data = null; // Data associated with this node (only if leaf)

  /** @type {boolean} */
  isLeaf = false;

  constructor() {
    this.children = new Array(8).fill(null);
    this.isLeaf = false; // Start as internal node
    this.data = null;
  }

  /**
   * Determines if this node is effectively empty (no data and no children with data).
   * @returns {boolean}
   */
  isEmpty() {
    if (this.isLeaf) {
      return this.data === null || this.data.colorIndex === 0; // Consider index 0 as empty
    }
    // Check if all children are null or empty
    return this.children.every((child) => !child || child.isEmpty());
  }
}

/**
 * Simple Sparse Octree implementation for storing voxel data.
 * Assumes coordinates are non-negative integers.
 */
export class SparseOctree {
  /** @type {OctreeNode} */
  root = null;

  /** @type {VoxelSize} */
  size = null;

  /** @type {number} Calculated maximum dimension based on size */
  maxDimension = 0;

  /** @type {number} Calculated depth based on maxDimension */
  depth = 0;

  /**
   * @param {VoxelSize} size The bounding box dimensions of the voxel space.
   */
  constructor(size) {
    if (!size || size.x <= 0 || size.y <= 0 || size.z <= 0) {
      throw new Error('Invalid size for Octree');
    }
    this.size = { ...size };
    this.root = new OctreeNode();

    // Determine the power-of-two bounding box that fits the size
    this.maxDimension = Math.max(size.x, size.y, size.z);
    // Calculate depth needed (e.g., 128 -> 2^7 -> depth 7)
    // Smallest power of 2 >= maxDimension
    const sideLength = Math.pow(2, Math.ceil(Math.log2(this.maxDimension)));
    this.depth = Math.log2(sideLength);
  }

  /**
   * Gets the octant index (0-7) for a given point within a node's bounds.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} nodeCenterX
   * @param {number} nodeCenterY
   * @param {number} nodeCenterZ
   * @returns {number} Octant index (0-7)
   */
  _getOctant(x, y, z, nodeCenterX, nodeCenterY, nodeCenterZ) {
    let index = 0;
    if (x >= nodeCenterX) index |= 1; // Right half
    if (y >= nodeCenterY) index |= 2; // Top half (or front depending on axis)
    if (z >= nodeCenterZ) index |= 4; // Front half (or top depending on axis)
    return index;
  }

  /**
   * Inserts voxel data into the octree.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {VoxelLeafData} data Data associated with the voxel (e.g., { colorIndex, materialId? }). Must not be null/empty.
   */
  insert(x, y, z, data) {
    if (
      x < 0 ||
      x >= this.size.x ||
      y < 0 ||
      y >= this.size.y ||
      z < 0 ||
      z >= this.size.z
    ) {
      // Skip silently if out of bounds
      return;
    }
    if (!data || data.colorIndex === 0) {
      // Do not insert empty voxels
      return;
    }

    // Root is always an internal node
    if (!this.root) {
      this.root = new OctreeNode();
      this.root.isLeaf = false;
    }

    // Calculate the path based on our coordinate system
    const path = this._calculatePath(x, y, z);

    // Handle the case where identical data is already there (optimized early exit)
    const existingData = this.get(x, y, z);
    if (existingData && this._compareLeafData(existingData, data)) {
      // Important: do NOT early exit here for leaf nodes at the root level
      // This prevents issues with "redundant insertion into simplified leaf" test
      // Only do an early exit for deep leaf nodes

      // Check if this is a simplified leaf node at a higher level by following the path
      let node = this.root;
      for (let level = 0; level < this.depth && level < path.length; level++) {
        if (node.isLeaf) {
          // If we've hit a leaf node and the data matches, it's a safe early exit
          if (this._compareLeafData(node.data, data)) {
            return; // Same data in a simplified node, no change needed
          }
          break; // Found a leaf, but with different data. Will need subdivision.
        }

        const octant = path[level];
        if (!node.children[octant]) {
          break; // Path doesn't exist, continue with normal insertion
        }
        node = node.children[octant];
      }
    }

    // Start at the root and follow the path
    let node = this.root;
    let nodeSize = Math.pow(2, this.depth);

    // Traverse down to the correct location
    for (let level = 0; level < this.depth; level++) {
      const octant = path[level];
      const halfSize = nodeSize / 2;

      // If this is a leaf node before reaching max depth, it's a simplified node
      if (node.isLeaf) {
        // Skip subdivision if we're inserting the exact same data
        if (this._compareLeafData(node.data, data)) {
          return; // Exit early, no change needed
        }

        // We're modifying a simplified node - need to subdivide it
        const originalData = node.data ? { ...node.data } : null;

        // Convert leaf to internal node
        node.isLeaf = false;
        node.data = null;

        // Fill all children with the original data
        for (let i = 0; i < 8; i++) {
          node.children[i] = new OctreeNode();
          node.children[i].isLeaf = true;
          node.children[i].data = originalData ? { ...originalData } : null;
        }
      }

      // Create the child node if it doesn't exist
      if (!node.children[octant]) {
        node.children[octant] = new OctreeNode();
      }

      // Prepare for next level of traversal
      node = node.children[octant];

      nodeSize = halfSize;
    }

    // At max depth, set the data in the leaf
    node.isLeaf = true;
    node.data = { ...data }; // Make a copy to avoid reference issues
  }

  /**
   * Helper method to calculate the octant path for a coordinate
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number[]} Array of octant indices representing the path from root to leaf
   */
  _calculatePath(x, y, z) {
    const path = [];
    let size = Math.pow(2, this.depth);
    let currentX = 0,
      currentY = 0,
      currentZ = 0;

    for (let level = 0; level < this.depth; level++) {
      const halfSize = size / 2;
      const centerX = currentX + halfSize;
      const centerY = currentY + halfSize;
      const centerZ = currentZ + halfSize;

      const octant = this._getOctant(x, y, z, centerX, centerY, centerZ);
      path.push(octant);

      // Update position for next level
      if (octant & 1) currentX += halfSize;
      if (octant & 2) currentY += halfSize;
      if (octant & 4) currentZ += halfSize;
      size = halfSize;
    }

    return path;
  }

  /**
   * Retrieves voxel data at the specified coordinates.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {VoxelLeafData | null} The data at the coordinates, or null if empty.
   */
  get(x, y, z) {
    if (
      x < 0 ||
      x >= this.size.x ||
      y < 0 ||
      y >= this.size.y ||
      z < 0 ||
      z >= this.size.z
    ) {
      return null; // Out of bounds
    }

    if (!this.root) {
      return null;
    }

    // Calculate the path to the voxel
    const path = this._calculatePath(x, y, z);

    // Traverse the path
    let node = this.root;
    for (let level = 0; level < this.depth; level++) {
      // If we hit a leaf node before max depth, it's a simplified region
      if (node.isLeaf) {
        return node.data; // All voxels in this region have the same data
      }

      // If we hit a null node, the voxel is empty
      const octant = path[level];
      node = node.children[octant];
      if (!node) {
        return null;
      }
    }

    // At max depth - return the data if it's a leaf, otherwise null
    return node && node.isLeaf ? node.data : null;
  }

  /**
   * Traverses the octree and calls a callback for each node.
   * @param {(node: OctreeNode, x: number, y: number, z: number, depth: number, sideLength: number) => void} callback
   */
  traverse(callback) {
    this._traverseNode(
      this.root,
      0,
      0,
      0,
      this.depth,
      Math.pow(2, this.depth),
      callback
    );
  }

  /**
   * Recursive helper for traverse.
   * @param {OctreeNode} node
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} depth
   * @param {number} sideLength
   * @param {(node: OctreeNode, x: number, y: number, z: number, depth: number, sideLength: number) => void} callback
   */
  _traverseNode(node, x, y, z, depth, sideLength, callback) {
    if (!node) return;

    callback(node, x, y, z, depth, sideLength);

    if (!node.isLeaf && depth > 0) {
      const halfSide = sideLength / 2;
      const nextDepth = depth - 1;
      for (let i = 0; i < 8; i++) {
        if (node.children[i]) {
          const childX = x + (i & 1 ? halfSide : 0);
          const childY = y + (i & 2 ? halfSide : 0);
          const childZ = z + (i & 4 ? halfSide : 0);
          this._traverseNode(
            node.children[i],
            childX,
            childY,
            childZ,
            nextDepth,
            halfSide,
            callback
          );
        }
      }
    }
  }

  /**
   * Iterates through all non-empty leaf nodes (voxels) and calls a callback.
   * @param {(x: number, y: number, z: number, data: VoxelLeafData) => void} callback
   */
  iterateVoxels(callback) {
    this._iterateNodeVoxels(this.root, 0, 0, 0, this.depth, callback);
  }

  /**
   * Recursive helper for iterateVoxels.
   * @param {OctreeNode} node
   * @param {number} currentX - Minimum corner coordinate of the current node's bounds
   * @param {number} currentY - Minimum corner coordinate of the current node's bounds
   * @param {number} currentZ - Minimum corner coordinate of the current node's bounds
   * @param {number} depth - Current depth level (decreases as we go down)
   * @param {(x: number, y: number, z: number, data: VoxelLeafData) => void} callback
   */
  _iterateNodeVoxels(node, currentX, currentY, currentZ, depth, callback) {
    if (!node || node.isEmpty()) {
      // Skip empty subtrees
      return;
    }

    if (node.isLeaf) {
      if (node.data && node.data.colorIndex > 0) {
        // For leaf nodes at maximum depth (depth 0), just output one voxel
        if (depth === 0) {
          if (
            currentX < this.size.x &&
            currentY < this.size.y &&
            currentZ < this.size.z
          ) {
            callback(currentX, currentY, currentZ, node.data);
          }
          return;
        }

        // For other simplified nodes, output all voxels within bounds
        const sideLength = Math.pow(2, depth);
        const maxX = Math.min(currentX + sideLength, this.size.x);
        const maxY = Math.min(currentY + sideLength, this.size.y);
        const maxZ = Math.min(currentZ + sideLength, this.size.z);

        for (let x = currentX; x < maxX; x++) {
          for (let y = currentY; y < maxY; y++) {
            for (let z = currentZ; z < maxZ; z++) {
              callback(x, y, z, node.data);
            }
          }
        }
      }
      return;
    }

    // For internal nodes, recurse to each child
    const halfSize = Math.pow(2, depth - 1);
    for (let i = 0; i < 8; i++) {
      if (node.children[i]) {
        const childX = currentX + (i & 1 ? halfSize : 0);
        const childY = currentY + (i & 2 ? halfSize : 0);
        const childZ = currentZ + (i & 4 ? halfSize : 0);
        this._iterateNodeVoxels(
          node.children[i],
          childX,
          childY,
          childZ,
          depth - 1,
          callback
        );
      }
    }
  }

  /**
   * Returns an array of all non-empty voxels in the octree.
   * Note: This can be memory-intensive for large models. Prefer using iterateVoxels.
   * @returns {Voxel[]} Array of voxels with their coordinates and data
   */
  getAllVoxels() {
    const voxels = [];
    this.iterateVoxels((x, y, z, data) => {
      voxels.push({ x, y, z, ...data });
    });
    return voxels;
  }

  /**
   * Simplifies the octree by merging nodes with the same data.
   * Call this after all voxels have been inserted to optimize the tree.
   */
  simplify() {
    this._simplifyNode(this.root);
  }

  /**
   * Recursive helper for simplify.
   * @param {OctreeNode} node
   * @returns {boolean} Whether all children have the same data
   */
  _simplifyNode(node) {
    if (!node || node.isLeaf) {
      return true; // Leaf nodes are already simplified
    }

    // First, simplify all children (bottom-up approach)
    let hasChildren = false;
    for (let i = 0; i < 8; i++) {
      if (node.children[i]) {
        hasChildren = true;
        this._simplifyNode(node.children[i]);
      }
    }

    if (!hasChildren) {
      // No children, this node is effectively empty
      return true;
    }

    // Check if all children are leaves with the same data
    let firstLeafIdx = -1;
    for (let i = 0; i < 8; i++) {
      if (node.children[i] && node.children[i].isLeaf) {
        firstLeafIdx = i;
        break;
      }
    }

    if (firstLeafIdx === -1) {
      // No leaf children, can't simplify at this level
      return false;
    }

    const firstData = node.children[firstLeafIdx].data;
    let allSame = true;

    for (let i = 0; i < 8; i++) {
      // If any child is not a leaf or has different data, we can't simplify
      if (
        !node.children[i] ||
        !node.children[i].isLeaf ||
        !this._compareLeafData(node.children[i].data, firstData)
      ) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      // All children are leaves with the same data, simplify by making this node a leaf
      node.isLeaf = true;
      node.data = firstData ? { ...firstData } : null;
      // Clear all children to free memory
      node.children.fill(null);
      return true;
    }

    return false;
  }

  /**
   * Compares two leaf data objects.
   * @param {VoxelLeafData} d1
   * @param {VoxelLeafData} d2
   * @returns {boolean}
   */
  _compareLeafData(d1, d2) {
    if (d1 === null && d2 === null) return true;
    if (d1 === null || d2 === null) return false;

    // Check colorIndex first
    if (d1.colorIndex !== d2.colorIndex) return false;

    // Check materialId, treating undefined and null as equivalent
    const mat1 = d1.materialId ?? null;
    const mat2 = d2.materialId ?? null;

    return mat1 === mat2;
  }
}
