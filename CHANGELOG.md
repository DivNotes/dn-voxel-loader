# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-05-18

### Added

- Initial release of `dn-voxel-loader`
- Basic functionality for loading and parsing MagicaVoxel `.vox` files (version 150)
- Support for extracting voxel dimensions, positions, color indices, and palettes
- Implementation of Sparse Octree data structure for efficient voxel storage
- Support for different environments:
  - ESM build for modern bundlers (Vite, Rollup, Webpack)
  - CJS build for Node.js `require()`
  - UMD build for direct browser use via `<script>` tag
- Basic API documentation with examples
- Full support for RGBA and MATL chunks from MagicaVoxel files
- Unit tests for core functionality
- Examples for pure JavaScript and React Three Fiber integration
- Comprehensive JSDoc type annotations throughout the codebase

### Known Issues

- Performance optimization needed for very large voxel models (>1 million voxels)
- Browser compatibility testing is currently limited to modern browsers

## [Unreleased]

### Planned

- Dedicated chunking API for improved large model rendering
- Level of Detail (LOD) support for optimization
- Additional rendering examples with popular frameworks (Vue, Svelte, Babylon.js)
- WebGPU-based renderer example
- Custom voxel format conversion utilities
