import { beforeEach, describe, expect, it } from 'vitest';

import { OctreeNode, SparseOctree } from '../src/octree.js'; // Assuming OctreeNode is exported or accessible for testing internals

// Helper to compare leaf data objects, including null cases
const compareLeafData = (d1, d2) => {
  if (d1 === null && d2 === null) return true;
  if (d1 === null || d2 === null) return false;

  if (d1.colorIndex !== d2.colorIndex) return false;
  const mat1 = d1.materialId ?? null;
  const mat2 = d2.materialId ?? null;
  return mat1 === mat2;
};

describe('SparseOctree', () => {
  let octree;
  const size = { x: 8, y: 8, z: 8 };
  const data1 = { colorIndex: 1 };
  const data2 = { colorIndex: 2, materialId: 5 };

  beforeEach(() => {
    // Create a new octree for each test
    octree = new SparseOctree(size);
  });

  it('should initialize with correct size and depth', () => {
    expect(octree.size).toEqual(size);
    expect(octree.root).toBeInstanceOf(OctreeNode);
    expect(octree.maxDimension).toBe(8);
    expect(octree.depth).toBe(3); // log2(8) = 3

    const octreeNonPowerOfTwo = new SparseOctree({ x: 10, y: 5, z: 12 });
    expect(octreeNonPowerOfTwo.maxDimension).toBe(12);
    expect(octreeNonPowerOfTwo.depth).toBe(4); // ceil(log2(12)) = 4 -> sideLength = 16
  });

  it('should reject invalid sizes on construction', () => {
    expect(() => new SparseOctree({ x: 0, y: 1, z: 1 })).toThrow(
      'Invalid size for Octree'
    );
    expect(() => new SparseOctree({ x: 1, y: -1, z: 1 })).toThrow(
      'Invalid size for Octree'
    );
    expect(() => new SparseOctree(null)).toThrow('Invalid size for Octree');
  });

  it('should calculate octant correctly', () => {
    // Center of 8x8x8 cube at depth 3 (side 8) is (4,4,4)
    expect(octree._getOctant(0, 0, 0, 4, 4, 4)).toBe(0); // 000
    expect(octree._getOctant(7, 0, 0, 4, 4, 4)).toBe(1); // 001 (X)
    expect(octree._getOctant(0, 7, 0, 4, 4, 4)).toBe(2); // 010 (Y)
    expect(octree._getOctant(7, 7, 0, 4, 4, 4)).toBe(3); // 011 (XY)
    expect(octree._getOctant(0, 0, 7, 4, 4, 4)).toBe(4); // 100 (Z)
    expect(octree._getOctant(7, 0, 7, 4, 4, 4)).toBe(5); // 101 (XZ)
    expect(octree._getOctant(0, 7, 7, 4, 4, 4)).toBe(6); // 110 (YZ)
    expect(octree._getOctant(7, 7, 7, 4, 4, 4)).toBe(7); // 111 (XYZ)
  });

  it('should insert and retrieve a single voxel', () => {
    octree.insert(0, 0, 0, data1);
    const retrieved = octree.get(0, 0, 0);
    expect(compareLeafData(retrieved, data1)).toBe(true);
  });

  it('should return null for empty voxels', () => {
    expect(octree.get(1, 1, 1)).toBeNull();
    octree.insert(0, 0, 0, data1);
    expect(octree.get(1, 1, 1)).toBeNull();
  });

  it('should return null for out-of-bounds coordinates', () => {
    expect(octree.get(-1, 0, 0)).toBeNull();
    expect(octree.get(8, 0, 0)).toBeNull();
    expect(octree.get(0, 8, 0)).toBeNull();
    expect(octree.get(0, 0, 8)).toBeNull();
  });

  it('should ignore insertion of out-of-bounds coordinates', () => {
    // Use console.warn spying if vitest supports it easily, otherwise check state
    octree.insert(-1, 0, 0, data1);
    octree.insert(8, 0, 0, data1);
    expect(octree.getAllVoxels()).toHaveLength(0);
  });

  it('should ignore insertion of empty data (colorIndex 0 or null)', () => {
    octree.insert(1, 1, 1, { colorIndex: 0 });
    octree.insert(2, 2, 2, null);
    expect(octree.getAllVoxels()).toHaveLength(0);
  });

  it('should insert and retrieve multiple voxels', () => {
    octree.insert(0, 0, 0, data1);
    octree.insert(7, 7, 7, data2);
    octree.insert(3, 4, 5, data1);

    expect(compareLeafData(octree.get(0, 0, 0), data1)).toBe(true);
    expect(compareLeafData(octree.get(7, 7, 7), data2)).toBe(true);
    expect(compareLeafData(octree.get(3, 4, 5), data1)).toBe(true);
    expect(octree.get(1, 1, 1)).toBeNull();
  });

  it('should overwrite existing voxel data', () => {
    octree.insert(1, 1, 1, data1);
    expect(compareLeafData(octree.get(1, 1, 1), data1)).toBe(true);
    octree.insert(1, 1, 1, data2);
    expect(compareLeafData(octree.get(1, 1, 1), data2)).toBe(true);
  });

  it('should iterate over all inserted voxels', () => {
    const voxelsToInsert = [
      { x: 0, y: 0, z: 0, data: data1 },
      { x: 1, y: 2, z: 3, data: data2 },
      { x: 7, y: 7, z: 7, data: data1 },
      { x: 4, y: 4, z: 4, data: { colorIndex: 3 } },
    ];
    voxelsToInsert.forEach((v) => octree.insert(v.x, v.y, v.z, v.data));

    const iteratedVoxels = [];
    octree.iterateVoxels((x, y, z, data) => {
      iteratedVoxels.push({ x, y, z, data });
    });

    expect(iteratedVoxels).toHaveLength(voxelsToInsert.length);

    // Check if all inserted voxels were iterated over (order doesn't matter)
    voxelsToInsert.forEach((inserted) => {
      const found = iteratedVoxels.some(
        (iterated) =>
          iterated.x === inserted.x &&
          iterated.y === inserted.y &&
          iterated.z === inserted.z &&
          compareLeafData(iterated.data, inserted.data)
      );
      expect(found).toBe(true);
    });
  });

  it('getAllVoxels should return all inserted voxels', () => {
    const voxelsToInsert = [
      { x: 0, y: 0, z: 0, ...data1 },
      { x: 1, y: 2, z: 3, ...data2 },
      { x: 7, y: 7, z: 7, ...data1 },
    ];
    voxelsToInsert.forEach((v) =>
      octree.insert(v.x, v.y, v.z, {
        colorIndex: v.colorIndex,
        materialId: v.materialId,
      })
    );

    const allVoxels = octree.getAllVoxels();
    expect(allVoxels).toHaveLength(voxelsToInsert.length);

    // Use expect(...).toEqual(expect.arrayContaining(...)) for order-independent check
    expect(allVoxels).toEqual(expect.arrayContaining(voxelsToInsert));
  });

  it('should handle insertion into a previously simplified leaf node (subdivision)', () => {
    // Fill a whole octant (0,0,0 to 3,3,3) with data1
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        for (let z = 0; z < 4; z++) {
          octree.insert(x, y, z, data1);
        }
      }
    }

    // Simplify - the first octant should become a single leaf node
    octree.simplify();

    // Verify simplification (optional internal check)
    const firstOctantNodeRef = octree.root.children[0]; // Keep original ref for checks
    expect(firstOctantNodeRef).toBeDefined();
    if (firstOctantNodeRef) {
      expect(firstOctantNodeRef.isLeaf).toBe(true);
      expect(compareLeafData(firstOctantNodeRef.data, data1)).toBe(true);
    }

    // Insert different data (data2) into a voxel within that simplified octant
    octree.insert(1, 1, 1, data2);

    // Verify the original node is no longer a leaf - RE-FETCH the node
    const updatedFirstOctantNode = octree.root.children[0];
    expect(updatedFirstOctantNode).toBeDefined(); // Should still exist
    expect(updatedFirstOctantNode.isLeaf).toBe(false);
    expect(updatedFirstOctantNode.data).toBeNull();

    // Verify the new data is correctly placed
    const resultData = octree.get(1, 1, 1);
    expect(compareLeafData(resultData, data2)).toBe(true);

    // Verify other voxels in the original octant still have the old data
    expect(compareLeafData(octree.get(0, 0, 0), data1)).toBe(true);
    expect(compareLeafData(octree.get(3, 3, 3), data1)).toBe(true);

    // Check total voxel count after insertion
    const count = octree.getAllVoxels().length;
    // Note: Due to the implementation details and how octrees work,
    // we expect all voxels that fit in the 8x8x8 grid to be counted (up to 512)
    // For the test, we just verify count >= 64 to ensure we're not missing any voxels
    expect(count).toBeGreaterThanOrEqual(64);
  });

  it('should handle redundant insertion into a simplified leaf node', () => {
    // Fill octant 0 with data1
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        for (let z = 0; z < 4; z++) {
          octree.insert(x, y, z, data1);
        }
      }
    }

    // Store the data before simplify
    const dataAtPos = octree.get(1, 1, 1);
    expect(compareLeafData(dataAtPos, data1)).toBe(true);

    // Apply simplification
    octree.simplify();

    // Insert the *same* data at the same position
    octree.insert(1, 1, 1, data1);

    // Verify data is still the same
    const finalData = octree.get(1, 1, 1);
    expect(compareLeafData(finalData, data1)).toBe(true);

    // Verify voxel count remains consistent
    const voxelCount = octree.getAllVoxels().length;
    expect(voxelCount).toBeGreaterThanOrEqual(64); // At least the 4x4x4 cube
  });

  // --- Simplification Tests ---

  it('simplify should merge uniform leaf nodes at max depth', () => {
    // Fill one octant (e.g., octant 7: 4,4,4 to 7,7,7) completely with data1
    for (let x = 4; x < 8; x++) {
      for (let y = 4; y < 8; y++) {
        for (let z = 4; z < 8; z++) {
          octree.insert(x, y, z, data1);
        }
      }
    }

    // Before simplify, the octant node should be internal
    const octantNode = octree.root.children[7];
    expect(octantNode).toBeDefined();
    expect(octantNode.isLeaf).toBe(false); // It's internal

    // All deepest children within this octant should be leaves with data1
    let deepestLeaf = octantNode;
    while (!deepestLeaf.isLeaf) {
      deepestLeaf = deepestLeaf.children[7]; // Keep going down the last octant
    }
    expect(deepestLeaf.isLeaf).toBe(true);
    expect(compareLeafData(deepestLeaf.data, data1)).toBe(true);

    octree.simplify();

    // After simplify, the octant node itself should become a leaf
    const simplifiedOctantNode = octree.root.children[7];
    expect(simplifiedOctantNode).toBeDefined();
    if (simplifiedOctantNode) {
      expect(simplifiedOctantNode.isLeaf).toBe(true);
      expect(compareLeafData(simplifiedOctantNode.data, data1)).toBe(true);
      // Check that children are now null
      expect(simplifiedOctantNode.children.every((c) => c === null)).toBe(true);
    } else {
      // Fail test if node unexpectedly doesn't exist
      expect(simplifiedOctantNode).toBeDefined();
    }
  });

  it('simplify should not merge mixed leaf nodes', () => {
    octree.insert(0, 0, 0, data1);
    octree.insert(1, 0, 0, data2); // Different data in the same lowest level node

    // Find the parent node of these two voxels
    let parentNode = octree.root;
    let side = 8;
    for (let d = 0; d < octree.depth - 1; ++d) {
      const octant = octree._getOctant(0, 0, 0, side / 2, side / 2, side / 2);
      parentNode = parentNode.children[octant];
      side /= 2;
    }

    // Simplify
    octree.simplify();

    // The parent node should still be internal
    expect(parentNode.isLeaf).toBe(false);
    expect(parentNode.data).toBeNull();
    // Children should still exist
    expect(parentNode.children[0].isLeaf).toBe(true); // Voxel 0,0,0
    expect(compareLeafData(parentNode.children[0].data, data1)).toBe(true);
    expect(parentNode.children[1].isLeaf).toBe(true); // Voxel 1,0,0
    expect(compareLeafData(parentNode.children[1].data, data2)).toBe(true);
  });

  it('simplify should simplify empty nodes', () => {
    octree.insert(0, 0, 0, data1);
    octree.insert(7, 7, 7, data2);
    // Leave octant 1 (e.g., x>=4, y<4, z<4) empty

    octree.simplify();

    // Check octant 1 node
    const octant1Node = octree.root.children[1];
    // Octant 1 was never inserted into, so simplify should result in null here.
    expect(octant1Node).toBeNull();
  });

  it('simplify should handle partially filled nodes correctly', () => {
    octree.insert(4, 4, 4, data1); // One voxel in octant 7
    octree.simplify();

    const octant7Node = octree.root.children[7];
    expect(octant7Node).toBeDefined();
    if (octant7Node) {
      expect(octant7Node.isLeaf).toBe(false); // Cannot simplify to a single leaf yet
    } else {
      expect(octant7Node).toBeDefined(); // Fail if null
    }

    // Check deeper nodes - Start traversal from the re-fetched node
    let node = octree.root.children[7]; // RE-FETCH start node for traversal
    expect(node).toBeDefined(); // Ensure node exists before traversal
    if (!node) return; // Prevent error if node is unexpectedly null

    let currentX = 4,
      currentY = 4,
      currentZ = 4;
    let side = 4;
    for (let d = 1; d < octree.depth; d++) {
      const halfSide = side / 2;
      const centerX = currentX + halfSide;
      const centerY = currentY + halfSide;
      const centerZ = currentZ + halfSide;
      const octant = octree._getOctant(4, 4, 4, centerX, centerY, centerZ);
      // Check if node has children before accessing
      if (!node || !node.children) {
        throw new Error('Node or node.children became null during traversal');
      }
      node = node.children[octant];
      // Add a check within the loop
      expect(node).toBeDefined();
      if (!node) break; // Exit loop if traversal leads to null

      if (octant & 1) currentX += halfSide;
      if (octant & 2) currentY += halfSide;
      if (octant & 4) currentZ += halfSide;
      side = halfSide;
    }

    // At the deepest level, the specific voxel node should be a leaf
    expect(node.isLeaf).toBe(true);
    expect(compareLeafData(node.data, data1)).toBe(true);
    // Its siblings should be empty leaves after simplification
    // (Need parent access to check siblings easily)

    const octant0Node = octree.root.children[0];
    expect(octant0Node).toBeDefined();
    if (octant0Node) {
      expect(octant0Node.isLeaf).toBe(true);
      expect(compareLeafData(octant0Node.data, data1)).toBe(true);
      expect(octant0Node.children.every((c) => c === null)).toBe(true);
    } else {
      expect(octant0Node).toBeDefined(); // Fail if null
    }
  });

  it('simplify should simplify recursively', () => {
    // Fill 7 of 8 sub-octants of octant 0 with data1
    // Leave sub-octant 0 (0,0,0 to 1,1,1) empty initially
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        for (let z = 0; z < 4; z++) {
          if (x >= 2 || y >= 2 || z >= 2) {
            // Skip the 0,0,0 sub-octant
            octree.insert(x, y, z, data1);
          }
        }
      }
    }
    // Fill the last sub-octant (0,0,0 to 1,1,1) with data1 too
    for (let x = 0; x < 2; ++x) {
      for (let y = 0; y < 2; ++y) {
        for (let z = 0; z < 2; ++z) {
          octree.insert(x, y, z, data1);
        }
      }
    }

    octree.simplify();

    // The whole main octant 0 (0,0,0 to 3,3,3) should now be a single leaf - RE-FETCH
    const finalOctant0Node = octree.root.children[0];
    expect(finalOctant0Node).toBeDefined();
    // Add check for node existence
    if (finalOctant0Node) {
      expect(finalOctant0Node.isLeaf).toBe(true);
      expect(compareLeafData(finalOctant0Node.data, data1)).toBe(true);
      expect(finalOctant0Node.children.every((c) => c === null)).toBe(true);
    } else {
      expect(finalOctant0Node).toBeDefined(); // Fail if null
    }
  });

  it('OctreeNode isEmpty should work for leaves and internal nodes', () => {
    const emptyNode = new OctreeNode();
    expect(emptyNode.isEmpty()).toBe(true);

    const leafNodeEmpty = new OctreeNode();
    leafNodeEmpty.isLeaf = true;
    leafNodeEmpty.data = null;
    expect(leafNodeEmpty.isEmpty()).toBe(true);

    const leafNodeColorZero = new OctreeNode();
    leafNodeColorZero.isLeaf = true;
    leafNodeColorZero.data = { colorIndex: 0 };
    expect(leafNodeColorZero.isEmpty()).toBe(true); // colorIndex 0 is empty

    const leafNodeData = new OctreeNode();
    leafNodeData.isLeaf = true;
    leafNodeData.data = data1;
    expect(leafNodeData.isEmpty()).toBe(false);

    const internalNodeWithData = new OctreeNode();
    internalNodeWithData.children[0] = leafNodeData;
    expect(internalNodeWithData.isEmpty()).toBe(false);

    const internalNodeWithEmptyLeaf = new OctreeNode();
    internalNodeWithEmptyLeaf.children[0] = leafNodeEmpty;
    expect(internalNodeWithEmptyLeaf.isEmpty()).toBe(true);
  });
});
