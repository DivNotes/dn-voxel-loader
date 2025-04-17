/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * @fileoverview Type definitions for DN Voxel Loader.
 * @author DivNotes
 * @module dn-voxel-loader/types
 */

/**
 * @typedef {import('./octree.js').SparseOctree} SparseOctree
 */

/**
 * Represents the dimensions of the voxel model.
 * @typedef {object} VoxelSize
 * @property {number} x - Width
 * @property {number} y - Height (or Depth depending on convention)
 * @property {number} z - Depth (or Height depending on convention)
 */

/**
 * Represents a single voxel (as returned by octree iteration).
 * @typedef {object} Voxel
 * @property {number} x - X coordinate
 * @property {number} y - Y coordinate
 * @property {number} z - Z coordinate
 * @property {number} colorIndex - 1-based index into the palette array.
 * @property {number} [materialId] - Optional material ID if present
 */

/**
 * Represents an RGBA color.
 * @typedef {object} RGBA
 * @property {number} r - Red component (0-255)
 * @property {number} g - Green component (0-255)
 * @property {number} b - Blue component (0-255)
 * @property {number} a - Alpha component (0-255)
 */

/**
 * Represents material properties (from MATL chunk).
 * Based on https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox-extension.txt
 * @typedef {object} VoxelMaterial
 * @property {number} id - Material ID (1-255).
 * @property {'diffuse' | 'metal' | 'glass' | 'emissive' | 'blend' | 'media'} type - Material type (_type).
 * @property {number} [weight] - Float property (_weight).
 * @property {number} [rough] - Float property (_rough).
 * @property {number} [spec] - Float property (_spec).
 * @property {number} [ior] - Float property (_ior).
 * @property {number} [att] - Float property (_att).
 * @property {number} [flux] - Float property (_flux).
 * @property {number} [emit] - Float property (_emit).
 * @property {number} [ldr] - Float property (_ldr).
 * @property {number} [metal] - Float property (_metal).
 * @property {number} [power] - Float property (_power).
 * @property {number} [glow] - Float property (_glow).
 * @property {boolean} [isTotalPower] - Boolean property (_isTotalPower).
 * // Other properties like _plastic, _media, _d, etc. can be added if needed
 */

/**
 * Represents the parsed voxel data.
 * @typedef {object} VoxelData
 * @property {VoxelSize} size - The dimensions of the model.
 * @property {SparseOctree} octree - The sparse octree containing voxel data.
 * @property {RGBA[]} palette - The color palette (array of 257 RGBA objects, index 0 is empty).
 * @property {VoxelMaterial[]} materials - Array of materials defined in the file (index corresponds to material ID - 1, e.g., materials[0] is ID 1).
 */

// Export empty object to make this a module recognized by JSDoc importers
export {};
