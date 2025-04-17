import { describe, expect, it } from 'vitest';

import { SparseOctree } from '../src/octree.js';
import { parseVoxModel } from '../src/parser.js';

function createArrayBuffer(bytes) {
  const buffer = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(buffer);
  view.set(bytes);
  return buffer;
}

function createMinimalVox(
  sizeX = 1,
  sizeY = 1,
  sizeZ = 1,
  numVoxels = 1,
  voxels = [],
  paletteBytes = [],
  materialChunks = []
) {
  const header = [0x56, 0x4f, 0x58, 0x20, 0x96, 0x00, 0x00, 0x00];
  const mainChunkHeader = [0x4d, 0x41, 0x49, 0x4e, 0x00, 0x00, 0x00, 0x00];

  const sizeChunk = [
    0x53,
    0x49,
    0x5a,
    0x45,
    0x0c,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    sizeX,
    0x00,
    0x00,
    0x00,
    sizeY,
    0x00,
    0x00,
    0x00,
    sizeZ,
    0x00,
    0x00,
    0x00,
  ];

  const actualNumVoxels = voxels.length > 0 ? voxels.length : numVoxels;
  const xyziChunkHeader = [
    0x58,
    0x59,
    0x5a,
    0x49,
    4 + actualNumVoxels * 4,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    actualNumVoxels,
    0x00,
    0x00,
    0x00,
  ];

  const voxelDataBytes = [];
  if (voxels.length > 0) {
    for (const v of voxels) {
      voxelDataBytes.push(v.x, v.y, v.z, v.c);
    }
  } else {
    for (let i = 0; i < actualNumVoxels; i++) {
      voxelDataBytes.push(i % sizeX, i % sizeY, i % sizeZ, (i % 255) + 1);
    }
  }

  const rgbaChunk = [];
  if (paletteBytes.length > 0) {
    const contentSize = paletteBytes.length;
    rgbaChunk.push(
      0x52,
      0x47,
      0x42,
      0x41,
      contentSize & 0xff,
      (contentSize >> 8) & 0xff,
      (contentSize >> 16) & 0xff,
      (contentSize >> 24) & 0xff,
      0x00,
      0x00,
      0x00,
      0x00
    );
    rgbaChunk.push(...paletteBytes);
  }

  const childrenSize =
    sizeChunk.length +
    xyziChunkHeader.length +
    voxelDataBytes.length +
    rgbaChunk.length +
    materialChunks.reduce((sum, chunk) => sum + chunk.length, 0);

  mainChunkHeader.push(
    childrenSize & 0xff,
    (childrenSize >> 8) & 0xff,
    (childrenSize >> 16) & 0xff,
    (childrenSize >> 24) & 0xff
  );

  const allBytes = [
    ...header,
    ...mainChunkHeader,
    ...sizeChunk,
    ...xyziChunkHeader,
    ...voxelDataBytes,
    ...rgbaChunk,
    ...materialChunks.flat(),
  ];

  return createArrayBuffer(allBytes);
}

describe('parseVoxModel', () => {
  it('should parse a minimal valid VOX file', async () => {
    const buffer = createMinimalVox(2, 3, 4, 1);
    const data = await parseVoxModel(buffer);

    expect(data).toBeDefined();
    expect(data.size).toEqual({ x: 2, y: 3, z: 4 });
    expect(data.octree).toBeInstanceOf(SparseOctree);
    const retrievedVoxels = data.octree.getAllVoxels();
    expect(retrievedVoxels).toHaveLength(1);
    expect(retrievedVoxels[0]).toEqual({ x: 0, y: 0, z: 0, colorIndex: 1 });
    expect(data.palette).toBeDefined();
    expect(data.palette.length).toBe(257);
    expect(data.palette[1]).toEqual({ r: 255, g: 255, b: 255, a: 255 });
  });

  it('should parse multiple voxels', async () => {
    const inputVoxels = [
      { x: 0, y: 0, z: 0, c: 1 },
      { x: 1, y: 1, z: 1, c: 2 },
      { x: 2, y: 2, z: 2, c: 3 },
    ];
    const buffer = createMinimalVox(5, 5, 5, 0, inputVoxels);
    const data = await parseVoxModel(buffer);

    const retrievedVoxels = data.octree.getAllVoxels();
    retrievedVoxels.sort((a, b) => a.x - b.x || a.y - b.y || a.z - b.z);

    expect(retrievedVoxels).toHaveLength(3);
    expect(retrievedVoxels[0]).toEqual({ x: 0, y: 0, z: 0, colorIndex: 1 });
    expect(retrievedVoxels[1]).toEqual({ x: 1, y: 1, z: 1, colorIndex: 2 });
    expect(retrievedVoxels[2]).toEqual({ x: 2, y: 2, z: 2, colorIndex: 3 });
  });

  it('should parse RGBA palette chunk', async () => {
    const customPaletteBytes = [];
    for (let i = 0; i < 256; i++) {
      customPaletteBytes.push(i, 0, 0, 255);
    }
    const buffer = createMinimalVox(1, 1, 1, 1, [], customPaletteBytes);
    const data = await parseVoxModel(buffer);

    expect(data.palette).toHaveLength(257);
    expect(data.palette[0]).toEqual({ r: 0, g: 0, b: 0, a: 0 });
    expect(data.palette[1]).toEqual({ r: 0, g: 0, b: 0, a: 255 });
    expect(data.palette[10]).toEqual({ r: 9, g: 0, b: 0, a: 255 });
    expect(data.palette[255]).toEqual({ r: 254, g: 0, b: 0, a: 255 });
    expect(data.palette[256]).toEqual({ r: 255, g: 0, b: 0, a: 255 });
  });

  it('should reject if magic number is incorrect', async () => {
    const invalidHeader = [0x58, 0x4f, 0x58, 0x20, 0x96, 0x00, 0x00, 0x00];
    const buffer = createArrayBuffer(invalidHeader);
    await expect(parseVoxModel(buffer)).rejects.toThrow(
      'Invalid VOX file: magic number mismatch.'
    );
  });

  it('should reject if MAIN chunk is missing', async () => {
    const header = [0x56, 0x4f, 0x58, 0x20, 0x96, 0x00, 0x00, 0x00];
    const notMainChunk = [
      0x53, 0x49, 0x5a, 0x45, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ];
    const buffer = createArrayBuffer([...header, ...notMainChunk]);
    await expect(parseVoxModel(buffer)).rejects.toThrow(
      'Invalid VOX file: MAIN chunk not found.'
    );
  });

  it('should reject if SIZE chunk is missing', async () => {
    const header = [0x56, 0x4f, 0x58, 0x20, 0x96, 0x00, 0x00, 0x00];
    const mainChunkHeader = [
      0x4d, 0x41, 0x49, 0x4e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ];
    const buffer = createArrayBuffer([...header, ...mainChunkHeader]);
    await expect(parseVoxModel(buffer)).rejects.toThrow(
      'Parse Error: VOX file missing SIZE chunk or failed Octree initialization.'
    );
  });

  it('should handle 0 voxels correctly', async () => {
    const buffer = createMinimalVox(2, 3, 4, 0, []);
    const data = await parseVoxModel(buffer);

    expect(data.size).toEqual({ x: 2, y: 3, z: 4 });
    expect(data.octree).toBeInstanceOf(SparseOctree);
    expect(data.octree.getAllVoxels()).toHaveLength(0);
    expect(data.palette).toBeDefined();
  });

  it('should ignore voxels with colorIndex 0', async () => {
    const buffer = createMinimalVox(2, 2, 2, 0, [
      { x: 0, y: 0, z: 0, c: 1 },
      { x: 1, y: 0, z: 0, c: 0 },
      { x: 0, y: 1, z: 0, c: 2 },
    ]);
    const data = await parseVoxModel(buffer);
    const retrievedVoxels = data.octree.getAllVoxels();
    retrievedVoxels.sort((a, b) => a.x - b.x || a.y - b.y || a.z - b.z);

    expect(retrievedVoxels).toHaveLength(2);
    expect(retrievedVoxels[0]).toEqual({ x: 0, y: 0, z: 0, colorIndex: 1 });
    expect(retrievedVoxels[1]).toEqual({ x: 0, y: 1, z: 0, colorIndex: 2 });
  });

  it('should reject if XYZI chunk comes before SIZE', async () => {
    const header = [0x56, 0x4f, 0x58, 0x20, 0x96, 0x00, 0x00, 0x00];
    const mainHeader = [0x4d, 0x41, 0x49, 0x4e, 0x00, 0x00, 0x00, 0x00];
    const xyziChunk = [
      0x58, 0x59, 0x5a, 0x49, 8, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1,
    ];
    const sizeChunk = [
      0x53, 0x49, 0x5a, 0x45, 12, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
      1, 0, 0, 0,
    ];
    const childrenSize = xyziChunk.length + sizeChunk.length;
    mainHeader.push(
      childrenSize & 0xff,
      (childrenSize >> 8) & 0xff,
      (childrenSize >> 16) & 0xff,
      (childrenSize >> 24) & 0xff
    );
    const buffer = createArrayBuffer([
      ...header,
      ...mainHeader,
      ...xyziChunk,
      ...sizeChunk,
    ]);
    await expect(parseVoxModel(buffer)).rejects.toThrow(
      'Parse Error: Found XYZI chunk before SIZE chunk.'
    );
  });

  it('should parse a MATL chunk correctly', async () => {
    const typeKey = [0x05, 0x00, 0x00, 0x00, ...Buffer.from('_type')];
    const typeVal = [0x05, 0x00, 0x00, 0x00, ...Buffer.from('metal')];
    const roughKey = [0x06, 0x00, 0x00, 0x00, ...Buffer.from('_rough')];
    const roughVal = [0x03, 0x00, 0x00, 0x00, ...Buffer.from('0.2')];
    const dictBytes = [
      0x02,
      0x00,
      0x00,
      0x00,
      ...typeKey,
      ...typeVal,
      ...roughKey,
      ...roughVal,
    ];

    const matlContentSize = 4 + dictBytes.length;
    const matlChunk = [
      0x4d,
      0x41,
      0x54,
      0x4c,
      matlContentSize & 0xff,
      (matlContentSize >> 8) & 0xff,
      (matlContentSize >> 16) & 0xff,
      (matlContentSize >> 24) & 0xff,
      0,
      0,
      0,
      0,
      42,
      0,
      0,
      0,
      ...dictBytes,
    ];

    const buffer = createMinimalVox(1, 1, 1, 1, [], [], [matlChunk]);
    const data = await parseVoxModel(buffer);

    expect(data.materials).toBeDefined();
    expect(data.materials.length).toBeGreaterThanOrEqual(42);
    expect(data.materials[41]).toBeDefined();
    expect(data.materials[41]).toEqual({
      id: 42,
      type: 'metal',
      rough: 0.2,
    });
  });
});
