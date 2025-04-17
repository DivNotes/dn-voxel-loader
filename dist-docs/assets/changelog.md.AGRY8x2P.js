import {
  _ as a,
  c as l,
  o as i,
  ae as o,
} from './chunks/framework.vCSBSCtM.js';
const p = JSON.parse(
    '{"title":"Changelog","description":"","frontmatter":{"title":"Changelog"},"headers":[],"relativePath":"changelog.md","filePath":"changelog.md"}'
  ),
  r = { name: 'changelog.md' };
function t(n, e, s, d, c, h) {
  return (
    i(),
    l(
      'div',
      null,
      e[0] ||
        (e[0] = [
          o(
            '<h1 id="changelog" tabindex="-1">Changelog <a class="header-anchor" href="#changelog" aria-label="Permalink to &quot;Changelog&quot;">​</a></h1><p>All notable changes to this project will be documented in this file.</p><p>The format is based on <a href="https://keepachangelog.com/en/1.0.0/" target="_blank" rel="noreferrer">Keep a Changelog</a>, and this project adheres to <a href="https://semver.org/spec/v2.0.0.html" target="_blank" rel="noreferrer">Semantic Versioning</a>.</p><h2 id="_0-1-0-2023-06-30" tabindex="-1">[0.1.0] - 2023-06-30 <a class="header-anchor" href="#_0-1-0-2023-06-30" aria-label="Permalink to &quot;[0.1.0] - 2023-06-30&quot;">​</a></h2><h3 id="added" tabindex="-1">Added <a class="header-anchor" href="#added" aria-label="Permalink to &quot;Added&quot;">​</a></h3><ul><li>Initial release of <code>dn-voxel-loader</code></li><li>Basic functionality for loading and parsing MagicaVoxel <code>.vox</code> files (version 150)</li><li>Support for extracting voxel dimensions, positions, color indices, and palettes</li><li>Implementation of Sparse Octree data structure for efficient voxel storage</li><li>Support for different environments: <ul><li>ESM build for modern bundlers (Vite, Rollup, Webpack)</li><li>CJS build for Node.js <code>require()</code></li><li>UMD build for direct browser use via <code>&lt;script&gt;</code> tag</li></ul></li><li>Basic API documentation with examples</li><li>Full support for RGBA and MATL chunks from MagicaVoxel files</li><li>Unit tests for core functionality</li><li>Examples for pure JavaScript and React Three Fiber integration</li><li>Comprehensive JSDoc type annotations throughout the codebase</li></ul><h3 id="known-issues" tabindex="-1">Known Issues <a class="header-anchor" href="#known-issues" aria-label="Permalink to &quot;Known Issues&quot;">​</a></h3><ul><li>Performance optimization needed for very large voxel models (&gt;1 million voxels)</li><li>Browser compatibility testing is currently limited to modern browsers</li></ul><h2 id="unreleased" tabindex="-1">[Unreleased] <a class="header-anchor" href="#unreleased" aria-label="Permalink to &quot;[Unreleased]&quot;">​</a></h2><h3 id="planned" tabindex="-1">Planned <a class="header-anchor" href="#planned" aria-label="Permalink to &quot;Planned&quot;">​</a></h3><ul><li>Dedicated chunking API for improved large model rendering</li><li>Level of Detail (LOD) support for optimization</li><li>Additional rendering examples with popular frameworks (Vue, Svelte, Babylon.js)</li><li>WebGPU-based renderer example</li><li>Custom voxel format conversion utilities</li></ul>',
            11
          ),
        ])
    )
  );
}
const f = a(r, [['render', t]]);
export { p as __pageData, f as default };
