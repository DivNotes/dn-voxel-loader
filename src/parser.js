/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * @fileoverview Parser for MagicaVoxel .vox files.
 * @author DivNotes
 * @module dn-voxel-loader/parser
 */

/**
 * @typedef {import('./types.js').VoxelData} VoxelData
 * @typedef {import('./types.js').RGBA} RGBA
 * @typedef {import('./types.js').VoxelMaterial} VoxelMaterial
 */

import { SparseOctree } from './octree.js';

const MAGIC_NUMBER = 'VOX ';

// Full default palette from MagicaVoxel (indices 1-255, index 0 is unused by voxels but often black in file)
const DEFAULT_PALETTE_COLORS = [
  { r: 255, g: 255, b: 255, a: 255 },
  { r: 255, g: 255, b: 204, a: 255 },
  { r: 255, g: 255, b: 153, a: 255 },
  { r: 255, g: 255, b: 102, a: 255 },
  { r: 255, g: 255, b: 51, a: 255 },
  { r: 255, g: 255, b: 0, a: 255 },
  { r: 255, g: 204, b: 255, a: 255 },
  { r: 255, g: 204, b: 204, a: 255 },
  { r: 255, g: 204, b: 153, a: 255 },
  { r: 255, g: 204, b: 102, a: 255 },
  { r: 255, g: 204, b: 51, a: 255 },
  { r: 255, g: 204, b: 0, a: 255 },
  { r: 255, g: 153, b: 255, a: 255 },
  { r: 255, g: 153, b: 204, a: 255 },
  { r: 255, g: 153, b: 153, a: 255 },
  { r: 255, g: 153, b: 102, a: 255 },
  { r: 255, g: 153, b: 51, a: 255 },
  { r: 255, g: 153, b: 0, a: 255 },
  { r: 255, g: 102, b: 255, a: 255 },
  { r: 255, g: 102, b: 204, a: 255 },
  { r: 255, g: 102, b: 153, a: 255 },
  { r: 255, g: 102, b: 102, a: 255 },
  { r: 255, g: 102, b: 51, a: 255 },
  { r: 255, g: 102, b: 0, a: 255 },
  { r: 255, g: 51, b: 255, a: 255 },
  { r: 255, g: 51, b: 204, a: 255 },
  { r: 255, g: 51, b: 153, a: 255 },
  { r: 255, g: 51, b: 102, a: 255 },
  { r: 255, g: 51, b: 51, a: 255 },
  { r: 255, g: 51, b: 0, a: 255 },
  { r: 255, g: 0, b: 255, a: 255 },
  { r: 255, g: 0, b: 204, a: 255 },
  { r: 255, g: 0, b: 153, a: 255 },
  { r: 255, g: 0, b: 102, a: 255 },
  { r: 255, g: 0, b: 51, a: 255 },
  { r: 255, g: 0, b: 0, a: 255 },
  { r: 204, g: 255, b: 255, a: 255 },
  { r: 204, g: 255, b: 204, a: 255 },
  { r: 204, g: 255, b: 153, a: 255 },
  { r: 204, g: 255, b: 102, a: 255 },
  { r: 204, g: 255, b: 51, a: 255 },
  { r: 204, g: 255, b: 0, a: 255 },
  { r: 204, g: 204, b: 255, a: 255 },
  { r: 204, g: 204, b: 204, a: 255 },
  { r: 204, g: 204, b: 153, a: 255 },
  { r: 204, g: 204, b: 102, a: 255 },
  { r: 204, g: 204, b: 51, a: 255 },
  { r: 204, g: 204, b: 0, a: 255 },
  { r: 204, g: 153, b: 255, a: 255 },
  { r: 204, g: 153, b: 204, a: 255 },
  { r: 204, g: 153, b: 153, a: 255 },
  { r: 204, g: 153, b: 102, a: 255 },
  { r: 204, g: 153, b: 51, a: 255 },
  { r: 204, g: 153, b: 0, a: 255 },
  { r: 204, g: 102, b: 255, a: 255 },
  { r: 204, g: 102, b: 204, a: 255 },
  { r: 204, g: 102, b: 153, a: 255 },
  { r: 204, g: 102, b: 102, a: 255 },
  { r: 204, g: 102, b: 51, a: 255 },
  { r: 204, g: 102, b: 0, a: 255 },
  { r: 204, g: 51, b: 255, a: 255 },
  { r: 204, g: 51, b: 204, a: 255 },
  { r: 204, g: 51, b: 153, a: 255 },
  { r: 204, g: 51, b: 102, a: 255 },
  { r: 204, g: 51, b: 51, a: 255 },
  { r: 204, g: 51, b: 0, a: 255 },
  { r: 204, g: 0, b: 255, a: 255 },
  { r: 204, g: 0, b: 204, a: 255 },
  { r: 204, g: 0, b: 153, a: 255 },
  { r: 204, g: 0, b: 102, a: 255 },
  { r: 204, g: 0, b: 51, a: 255 },
  { r: 204, g: 0, b: 0, a: 255 },
  { r: 153, g: 255, b: 255, a: 255 },
  { r: 153, g: 255, b: 204, a: 255 },
  { r: 153, g: 255, b: 153, a: 255 },
  { r: 153, g: 255, b: 102, a: 255 },
  { r: 153, g: 255, b: 51, a: 255 },
  { r: 153, g: 255, b: 0, a: 255 },
  { r: 153, g: 204, b: 255, a: 255 },
  { r: 153, g: 204, b: 204, a: 255 },
  { r: 153, g: 204, b: 153, a: 255 },
  { r: 153, g: 204, b: 102, a: 255 },
  { r: 153, g: 204, b: 51, a: 255 },
  { r: 153, g: 204, b: 0, a: 255 },
  { r: 153, g: 153, b: 255, a: 255 },
  { r: 153, g: 153, b: 204, a: 255 },
  { r: 153, g: 153, b: 153, a: 255 },
  { r: 153, g: 153, b: 102, a: 255 },
  { r: 153, g: 153, b: 51, a: 255 },
  { r: 153, g: 153, b: 0, a: 255 },
  { r: 153, g: 102, b: 255, a: 255 },
  { r: 153, g: 102, b: 204, a: 255 },
  { r: 153, g: 102, b: 153, a: 255 },
  { r: 153, g: 102, b: 102, a: 255 },
  { r: 153, g: 102, b: 51, a: 255 },
  { r: 153, g: 102, b: 0, a: 255 },
  { r: 153, g: 51, b: 255, a: 255 },
  { r: 153, g: 51, b: 204, a: 255 },
  { r: 153, g: 51, b: 153, a: 255 },
  { r: 153, g: 51, b: 102, a: 255 },
  { r: 153, g: 51, b: 51, a: 255 },
  { r: 153, g: 51, b: 0, a: 255 },
  { r: 153, g: 0, b: 255, a: 255 },
  { r: 153, g: 0, b: 204, a: 255 },
  { r: 153, g: 0, b: 153, a: 255 },
  { r: 153, g: 0, b: 102, a: 255 },
  { r: 153, g: 0, b: 51, a: 255 },
  { r: 153, g: 0, b: 0, a: 255 },
  { r: 102, g: 255, b: 255, a: 255 },
  { r: 102, g: 255, b: 204, a: 255 },
  { r: 102, g: 255, b: 153, a: 255 },
  { r: 102, g: 255, b: 102, a: 255 },
  { r: 102, g: 255, b: 51, a: 255 },
  { r: 102, g: 255, b: 0, a: 255 },
  { r: 102, g: 204, b: 255, a: 255 },
  { r: 102, g: 204, b: 204, a: 255 },
  { r: 102, g: 204, b: 153, a: 255 },
  { r: 102, g: 204, b: 102, a: 255 },
  { r: 102, g: 204, b: 51, a: 255 },
  { r: 102, g: 204, b: 0, a: 255 },
  { r: 102, g: 153, b: 255, a: 255 },
  { r: 102, g: 153, b: 204, a: 255 },
  { r: 102, g: 153, b: 153, a: 255 },
  { r: 102, g: 153, b: 102, a: 255 },
  { r: 102, g: 153, b: 51, a: 255 },
  { r: 102, g: 153, b: 0, a: 255 },
  { r: 102, g: 102, b: 255, a: 255 },
  { r: 102, g: 102, b: 204, a: 255 },
  { r: 102, g: 102, b: 153, a: 255 },
  { r: 102, g: 102, b: 102, a: 255 },
  { r: 102, g: 102, b: 51, a: 255 },
  { r: 102, g: 102, b: 0, a: 255 },
  { r: 102, g: 51, b: 255, a: 255 },
  { r: 102, g: 51, b: 204, a: 255 },
  { r: 102, g: 51, b: 153, a: 255 },
  { r: 102, g: 51, b: 102, a: 255 },
  { r: 102, g: 51, b: 51, a: 255 },
  { r: 102, g: 51, b: 0, a: 255 },
  { r: 102, g: 0, b: 255, a: 255 },
  { r: 102, g: 0, b: 204, a: 255 },
  { r: 102, g: 0, b: 153, a: 255 },
  { r: 102, g: 0, b: 102, a: 255 },
  { r: 102, g: 0, b: 51, a: 255 },
  { r: 102, g: 0, b: 0, a: 255 },
  { r: 51, g: 255, b: 255, a: 255 },
  { r: 51, g: 255, b: 204, a: 255 },
  { r: 51, g: 255, b: 153, a: 255 },
  { r: 51, g: 255, b: 102, a: 255 },
  { r: 51, g: 255, b: 51, a: 255 },
  { r: 51, g: 255, b: 0, a: 255 },
  { r: 51, g: 204, b: 255, a: 255 },
  { r: 51, g: 204, b: 204, a: 255 },
  { r: 51, g: 204, b: 153, a: 255 },
  { r: 51, g: 204, b: 102, a: 255 },
  { r: 51, g: 204, b: 51, a: 255 },
  { r: 51, g: 204, b: 0, a: 255 },
  { r: 51, g: 153, b: 255, a: 255 },
  { r: 51, g: 153, b: 204, a: 255 },
  { r: 51, g: 153, b: 153, a: 255 },
  { r: 51, g: 153, b: 102, a: 255 },
  { r: 51, g: 153, b: 51, a: 255 },
  { r: 51, g: 153, b: 0, a: 255 },
  { r: 51, g: 102, b: 255, a: 255 },
  { r: 51, g: 102, b: 204, a: 255 },
  { r: 51, g: 102, b: 153, a: 255 },
  { r: 51, g: 102, b: 102, a: 255 },
  { r: 51, g: 102, b: 51, a: 255 },
  { r: 51, g: 102, b: 0, a: 255 },
  { r: 51, g: 51, b: 255, a: 255 },
  { r: 51, g: 51, b: 204, a: 255 },
  { r: 51, g: 51, b: 153, a: 255 },
  { r: 51, g: 51, b: 102, a: 255 },
  { r: 51, g: 51, b: 51, a: 255 },
  { r: 51, g: 51, b: 0, a: 255 },
  { r: 51, g: 0, b: 255, a: 255 },
  { r: 51, g: 0, b: 204, a: 255 },
  { r: 51, g: 0, b: 153, a: 255 },
  { r: 51, g: 0, b: 102, a: 255 },
  { r: 51, g: 0, b: 51, a: 255 },
  { r: 51, g: 0, b: 0, a: 255 },
  { r: 0, g: 255, b: 255, a: 255 },
  { r: 0, g: 255, b: 204, a: 255 },
  { r: 0, g: 255, b: 153, a: 255 },
  { r: 0, g: 255, b: 102, a: 255 },
  { r: 0, g: 255, b: 51, a: 255 },
  { r: 0, g: 255, b: 0, a: 255 },
  { r: 0, g: 204, b: 255, a: 255 },
  { r: 0, g: 204, b: 204, a: 255 },
  { r: 0, g: 204, b: 153, a: 255 },
  { r: 0, g: 204, b: 102, a: 255 },
  { r: 0, g: 204, b: 51, a: 255 },
  { r: 0, g: 204, b: 0, a: 255 },
  { r: 0, g: 153, b: 255, a: 255 },
  { r: 0, g: 153, b: 204, a: 255 },
  { r: 0, g: 153, b: 153, a: 255 },
  { r: 0, g: 153, b: 102, a: 255 },
  { r: 0, g: 153, b: 51, a: 255 },
  { r: 0, g: 153, b: 0, a: 255 },
  { r: 0, g: 102, b: 255, a: 255 },
  { r: 0, g: 102, b: 204, a: 255 },
  { r: 0, g: 102, b: 153, a: 255 },
  { r: 0, g: 102, b: 102, a: 255 },
  { r: 0, g: 102, b: 51, a: 255 },
  { r: 0, g: 102, b: 0, a: 255 },
  { r: 0, g: 51, b: 255, a: 255 },
  { r: 0, g: 51, b: 204, a: 255 },
  { r: 0, g: 51, b: 153, a: 255 },
  { r: 0, g: 51, b: 102, a: 255 },
  { r: 0, g: 51, b: 51, a: 255 },
  { r: 0, g: 51, b: 0, a: 255 },
  { r: 0, g: 0, b: 255, a: 255 },
  { r: 0, g: 0, b: 204, a: 255 },
  { r: 0, g: 0, b: 153, a: 255 },
  { r: 0, g: 0, b: 102, a: 255 },
  { r: 0, g: 0, b: 51, a: 255 },
  { r: 0, g: 0, b: 0, a: 255 },
];

const EMPTY_COLOR = { r: 0, g: 0, b: 0, a: 0 };

/**
 * Creates the default MagicaVoxel color palette (256 colors + 1 empty slot at index 0).
 * Index 0 is typically unused or represents empty space.
 * Indices 1-255 contain the standard colors.
 * Index 256 often corresponds to the last color defined in the VOX file's RGBA chunk (which might be index 255 in the chunk).
 * @returns {RGBA[]} An array of 257 RGBA color objects, where index 0 is empty.
 */
function getDefaultPalette() {
  const palette = new Array(257).fill(EMPTY_COLOR);
  // Default palette indices are 1-based in MagicaVoxel
  // Copy colors into indices 1-256
  for (let i = 0; i < 255; i++) {
    palette[i + 1] = DEFAULT_PALETTE_COLORS[i];
  }
  // MagicaVoxel's file often has black at index 255 of the chunk (maps to 256 here)
  palette[256] = DEFAULT_PALETTE_COLORS[255];
  return palette;
}

/**
 * Reads a chunk header from the DataView at the specified offset.
 * The .vox format consists of a hierarchy of chunks.
 * Each chunk has an ID (4 bytes), content size (4 bytes), and children size (4 bytes).
 * @param {DataView} view The DataView representing the file buffer.
 * @param {number} offset The byte offset within the DataView where the chunk header starts.
 * @returns {{id: string, contentSize: number, childrenSize: number, nextChunkOffset: number}} An object containing the parsed chunk header information and the offset for the next chunk.
 * @throws {Error} If the offset is out of bounds or data cannot be read.
 */
function readChunkHeader(view, offset) {
  if (offset + 12 > view.byteLength) {
    throw new Error(
      `Parse Error: Attempting to read chunk header past end of file. Offset: ${offset}`
    );
  }
  const id = String.fromCharCode(
    view.getUint8(offset),
    view.getUint8(offset + 1),
    view.getUint8(offset + 2),
    view.getUint8(offset + 3)
  );
  const contentSize = view.getUint32(offset + 4, true);
  const childrenSize = view.getUint32(offset + 8, true);
  const nextChunkOffset = offset + 12 + contentSize + childrenSize;
  return { id, contentSize, childrenSize, nextChunkOffset };
}

/**
 * Reads a UCS4 string from a DataView.
 * VOX format strings: INT32: num bytes, BYTE[num bytes]: string content.
 * @param {DataView} view
 * @param {number} offset
 * @returns {{value: string, nextOffset: number}}
 */
function readString(view, offset) {
  try {
    const length = view.getInt32(offset, true);
    offset += 4;
    if (offset + length > view.byteLength) {
      throw new Error('String length exceeds buffer size.');
    }
    let value = '';
    for (let i = 0; i < length; i++) {
      value += String.fromCharCode(view.getUint8(offset + i));
    }
    return { value, nextOffset: offset + length };
  } catch (e) {
    throw new Error(
      `Parse Error: Failed to read string at offset ${offset}: ${e.message}`
    );
  }
}

/**
 * Reads a DICT (key-value pairs) from a DataView.
 * VOX format DICT: INT32: num pairs, (STRING: key, STRING: value)[num pairs].
 * @param {DataView} view
 * @param {number} offset
 * @returns {{value: Record<string, string>, nextOffset: number}}
 */
function readDict(view, offset) {
  /** @type {Record<string, string>} */
  const dict = {};
  try {
    const numPairs = view.getInt32(offset, true);
    offset += 4;
    for (let i = 0; i < numPairs; i++) {
      const keyResult = readString(view, offset);
      offset = keyResult.nextOffset;
      const valueResult = readString(view, offset);
      offset = valueResult.nextOffset;
      dict[keyResult.value] = valueResult.value;
    }
    return { value: dict, nextOffset: offset };
  } catch (e) {
    throw new Error(
      `Parse Error: Failed to read dictionary at offset ${offset}: ${e.message}`
    );
  }
}

/**
 * Parses the .vox file content.
 * @param {ArrayBuffer} arrayBuffer
 * @returns {Promise<VoxelData>}
 */
export async function parseVoxModel(arrayBuffer) {
  return new Promise((resolve, reject) => {
    const view = new DataView(arrayBuffer);
    let offset = 0;

    // Read header
    if (offset + 8 > view.byteLength) {
      const error = new Error('Invalid VOX file: File too short for header.');
      return reject(error);
    }
    const magic = String.fromCharCode(
      view.getUint8(offset++),
      view.getUint8(offset++),
      view.getUint8(offset++),
      view.getUint8(offset++)
    );

    if (magic !== MAGIC_NUMBER) {
      const error = new Error('Invalid VOX file: magic number mismatch.');
      return reject(error);
    }

    // Skip version number (4 bytes)
    offset += 4;

    // Read chunks
    if (offset + 12 > view.byteLength) {
      const error = new Error(
        'Invalid VOX file: File too short for MAIN chunk header.'
      );
      return reject(error);
    }
    const mainHeader = readChunkHeader(view, offset);
    if (mainHeader.id !== 'MAIN') {
      const error = new Error('Invalid VOX file: MAIN chunk not found.');
      return reject(error);
    }
    offset += 12; // Move past MAIN chunk header

    const endOfFile = view.byteLength;
    let size = null;
    /** @type {RGBA[]} */
    let palette = null; // Initialize as null, will be set later
    let paletteSet = false;
    /** @type {VoxelMaterial[]} */
    let materials = new Array(256).fill(null); // Initialize correctly sized array
    /** @type {SparseOctree | null} */
    let octree = null;

    const mainChunkEnd =
      offset + mainHeader.contentSize + mainHeader.childrenSize;

    // If MAIN content size is > 0, it's an empty pack chunk
    if (mainHeader.contentSize > 0) {
      offset += mainHeader.contentSize;
    }

    // Process child chunks of MAIN
    while (offset < mainChunkEnd && offset < endOfFile) {
      const chunkHeader = readChunkHeader(view, offset);
      const chunkContentOffset = offset + 12;

      // Check if chunk content extends beyond file end
      if (chunkContentOffset + chunkHeader.contentSize > endOfFile) {
        const error = new Error(
          `Parse Error: Chunk ${chunkHeader.id} content (size ${chunkHeader.contentSize}) at offset ${chunkContentOffset} extends beyond file boundary (${endOfFile}).`
        );
        return reject(error);
      }

      // Skip silently if chunk children extend beyond file end
      if (chunkHeader.nextChunkOffset > endOfFile) {
        // File structure may be corrupt, but we can try to continue
      }

      switch (chunkHeader.id) {
        case 'PACK':
          // Optional: Handle PACK chunk if multiple models are needed
          // For now, we assume a single model per file
          break;

        case 'SIZE': {
          if (chunkHeader.contentSize !== 12) {
            const error = new Error(
              `Invalid SIZE chunk size: ${chunkHeader.contentSize}`
            );
            return reject(error);
          }
          size = {
            x: view.getInt32(chunkContentOffset, true),
            y: view.getInt32(chunkContentOffset + 4, true),
            z: view.getInt32(chunkContentOffset + 8, true),
          };
          // Create the octree once we know the size
          try {
            octree = new SparseOctree(size);
          } catch (e) {
            const error = new Error(
              `Failed to initialize Octree: ${e.message}`
            );
            return reject(error);
          }
          break;
        }

        case 'XYZI': {
          if (!octree) {
            // Throw Error instead of returning reject(error)
            throw new Error('Parse Error: Found XYZI chunk before SIZE chunk.');
          }
          if (chunkHeader.contentSize < 4) {
            // Throw Error instead of returning reject(error)
            throw new Error(
              `Invalid XYZI chunk size: ${chunkHeader.contentSize}. Expected at least 4 bytes for count.`
            );
          }
          const numVoxels = view.getInt32(chunkContentOffset, true);
          const expectedContentSize = 4 + numVoxels * 4;
          // Ensure the declared number of voxels fits within the chunk content size
          // Use strict check: == expected size
          if (chunkHeader.contentSize !== expectedContentSize) {
            // Throw Error instead of returning reject(error)
            throw new Error(
              `Invalid XYZI chunk: Declared ${numVoxels} voxels (expected content size ${expectedContentSize}), but actual content size is ${chunkHeader.contentSize}.`
            );
          }
          const voxelDataOffset = chunkContentOffset + 4;
          for (let i = 0; i < numVoxels; i++) {
            const voxelOffset = voxelDataOffset + i * 4;
            if (
              voxelOffset + 4 >
              chunkContentOffset + chunkHeader.contentSize
            ) {
              // This check should ideally be caught by the chunk size check above, but keep as safety
              // Throw Error instead of returning reject(error)
              throw new Error(
                `Parse Error: Attempted to read voxel data out of bounds in XYZI chunk. Index: ${i}, Offset: ${voxelOffset}`
              );
            }
            const x = view.getUint8(voxelOffset);
            const y = view.getUint8(voxelOffset + 1); // MagicaVoxel Y (depth)
            const z = view.getUint8(voxelOffset + 2); // MagicaVoxel Z (up)
            const colorIndex = view.getUint8(voxelOffset + 3); // 1-based index

            if (colorIndex > 0) {
              // Only insert non-empty voxels
              // Assume material ID 0 (or undefined) if no MATL chunk info yet
              octree.insert(x, y, z, { colorIndex });
            } else {
              // Note: Index 0 represents empty space in MagicaVoxel, we don't store these.
            }
          }
          break;
        }

        case 'RGBA': {
          if (
            chunkHeader.contentSize !== 1024 &&
            chunkHeader.contentSize !== 1020 /* Sometimes 255 colors? */
          ) {
            // Only accept exactly 1024 (256 colors * 4 bytes) or maybe 1020 (255 colors * 4 bytes)
            if (chunkHeader.contentSize !== 1024) {
              const error = new Error(
                `Invalid RGBA chunk size: ${chunkHeader.contentSize}. Expected 1024.`
              );
              return reject(error);
            }
          }

          // Create palette array: 257 entries, index 0 = empty, 1-256 = colors
          palette = new Array(257).fill(null);
          palette[0] = EMPTY_COLOR;

          const numColorsToRead = 256;
          for (let i = 0; i < numColorsToRead; i++) {
            const colorOffset = chunkContentOffset + i * 4;
            // Strict boundary check for reading each color
            if (
              colorOffset + 4 >
              chunkContentOffset + chunkHeader.contentSize
            ) {
              // Throw error if trying to read past the actual chunk content
              throw new Error(
                `Parse Error: RGBA chunk ended prematurely while reading color index ${
                  i + 1
                }. Chunk size ${
                  chunkHeader.contentSize
                } is insufficient for 256 colors.`
              );
            }
            // Read color and place it at index i+1 in our palette array
            palette[i + 1] = {
              r: view.getUint8(colorOffset),
              g: view.getUint8(colorOffset + 1),
              b: view.getUint8(colorOffset + 2),
              a: view.getUint8(colorOffset + 3),
            };
          }
          // Ensure any remaining slots (if loop broke early) are filled
          for (let i = 1; i < 257; i++) {
            if (palette[i] === null) {
              palette[i] = EMPTY_COLOR;
            }
          }
          paletteSet = true;
          break;
        }

        // Handle Material Chunk (Old format)
        case 'MATL': {
          if (chunkHeader.contentSize < 4) {
            // Skip silently if invalid
            break;
          }
          const materialId = view.getInt32(chunkContentOffset, true); // 1-based index

          // Check dictionary read boundaries *before* reading it
          const dictOffset = chunkContentOffset + 4;
          if (dictOffset >= chunkContentOffset + chunkHeader.contentSize) {
            // Skip silently
            break;
          }

          const dictResult = readDict(view, dictOffset);
          const props = dictResult.value;

          // Ensure material ID is within expected range (1-255 typically)
          if (materialId <= 0 || materialId > 256) {
            // Skip silently
            break;
          }

          /** @type {import('./types.js').VoxelMaterial} */
          const material = { id: materialId, type: 'diffuse' }; // Initialize with required type property

          // Map dictionary properties to VoxelMaterial fields
          if (props._type) {
            const typeValue = props._type.toLowerCase();
            if (
              [
                'diffuse',
                'metal',
                'glass',
                'emissive',
                'blend',
                'media',
              ].includes(typeValue)
            ) {
              // @ts-ignore - Type is checked in the condition above
              material.type = typeValue;
            }
          }

          // Parse float properties (add more as needed)
          if (props._weight) material.weight = parseFloat(props._weight);
          if (props._rough) material.rough = parseFloat(props._rough);
          if (props._spec) material.spec = parseFloat(props._spec);
          if (props._ior) material.ior = parseFloat(props._ior);
          if (props._att) material.att = parseFloat(props._att);
          if (props._flux) material.flux = parseFloat(props._flux);
          if (props._emit) material.emit = parseFloat(props._emit);
          if (props._ldr) material.ldr = parseFloat(props._ldr);
          if (props._metal) material.metal = parseFloat(props._metal); // Allow direct metal value
          if (props._power) material.power = parseFloat(props._power);
          if (props._glow) material.glow = parseFloat(props._glow);

          // Parse boolean properties (represented as '1' or '0')
          if (props._isTotalPower)
            material.isTotalPower = props._isTotalPower === '1';

          // Store material using 0-based index (materialId 1 -> index 0)
          // Ensure array is large enough (already initialized to 256 nulls)
          if (materialId >= 1 && materialId <= materials.length) {
            materials[materialId - 1] = material;
          } else {
            // This case should be caught by the ID check above, but adding safety.
            console.warn(
              `Attempted to store material with out-of-bounds ID: ${materialId}`
            );
          }
          break;
        }

        // Ignore other chunk types (nTRN, nGRP, nSHP, LAYR, ROBJ, etc.) silently
        default: {
          break;
        }
      }

      offset = chunkHeader.nextChunkOffset;
    }

    // If palette wasn't set by RGBA chunk, use the default
    if (!paletteSet) {
      palette = getDefaultPalette();
    }

    if (!size || !octree) {
      const error = new Error(
        'Parse Error: VOX file missing SIZE chunk or failed Octree initialization.'
      );
      return reject(error);
    }

    // Resolve with the final structure
    const result = { size, octree, palette, materials };
    resolve(result);
  });
}
