/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * @fileoverview Main entry point for DN Voxel Loader.
 * @author DivNotes
 * @module dn-voxel-loader
 */

import { parseVoxModel } from './parser.js';

/**
 * @typedef {import('./types.js').VoxelData} VoxelData
 */

/**
 * Loads and parses a .vox file from a URL or ArrayBuffer.
 *
 * @param {string | ArrayBuffer | Buffer} source - The URL of the .vox file or an ArrayBuffer/Buffer containing the file data.
 * @returns {Promise<VoxelData>} A promise that resolves with the parsed voxel data.
 * @throws {Error} If the source is invalid, fetch fails, or parsing fails.
 * @example
 * // Load from URL
 * try {
 *   const voxelData = await load('path/to/your/model.vox');
 *   console.log('Voxels loaded:', voxelData);
 *   // Use voxelData (e.g., render it)
 * } catch (error) {
 *   console.error('Loading failed:', error);
 * }
 *
 * @example
 * // Load from ArrayBuffer (e.g., from a file input)
 * async function handleFile(file) {
 *   const arrayBuffer = await file.arrayBuffer();
 *   try {
 *     const voxelData = await load(arrayBuffer);
 *     console.log('Voxels loaded:', voxelData);
 *   } catch (error) {
 *     console.error('Loading failed:', error);
 *   }
 * }
 */
export async function load(source) {
  let arrayBuffer;

  if (typeof source === 'string') {
    // Assume URL
    try {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} for URL: ${source}`
        );
      }
      arrayBuffer = await response.arrayBuffer();
    } catch (error) {
      throw new Error(
        `Failed to fetch voxel model from ${source}: ${error.message}`
      );
    }
  } else if (source instanceof ArrayBuffer) {
    arrayBuffer = source;
  } else if (typeof Buffer !== 'undefined' && source instanceof Buffer) {
    // Handle Node.js Buffer
    if (source.buffer.byteLength === source.length) {
      arrayBuffer = source.buffer;
    } else {
      arrayBuffer = new ArrayBuffer(source.length);
      const view = new Uint8Array(arrayBuffer);
      view.set(source);
    }
  } else {
    throw new Error(
      'Invalid source type. Expected URL string, ArrayBuffer, or Buffer.'
    );
  }

  if (!arrayBuffer) {
    throw new Error('Failed to obtain ArrayBuffer from source.');
  }

  try {
    return await parseVoxModel(arrayBuffer);
  } catch (error) {
    throw new Error(`Failed to parse voxel model: ${error.message}`);
  }
}

// Potential future extensions:
// export function loadFromPath(filePath) { /* Node.js specific file loading */ }
