import {
  _ as o,
  c as a,
  o as t,
  ae as r,
} from './chunks/framework.vCSBSCtM.js';
const h = JSON.parse(
    '{"title":"API Reference","description":"","frontmatter":{},"headers":[],"relativePath":"api.md","filePath":"api.md"}'
  ),
  l = { name: 'api.md' };
function i(c, e, n, d, s, u) {
  return (
    t(),
    a(
      'div',
      null,
      e[0] ||
        (e[0] = [
          r(
            '<h1 id="api-reference" tabindex="-1">API Reference <a class="header-anchor" href="#api-reference" aria-label="Permalink to &quot;API Reference&quot;">​</a></h1><p>Welcome to the API reference for DN Voxel Loader.</p><p>The detailed documentation for all public functions, classes, interfaces, and types is automatically generated from the source code comments using <a href="https://typedoc.org/" target="_blank" rel="noreferrer">TypeDoc</a>.</p><p>Please use the sidebar navigation under &quot;API Reference&quot; to explore the available modules and components.</p><ul><li><strong><a href="./api/generated/README.html">Generated API Overview</a></strong></li></ul><h2 id="load-source" tabindex="-1"><code>load(source)</code> <a class="header-anchor" href="#load-source" aria-label="Permalink to &quot;`load(source)`&quot;">​</a></h2><p>Asynchronously loads and parses a <code>.vox</code> file.</p><ul><li><strong>Parameters:</strong><ul><li><code>source</code> (<code>string | ArrayBuffer | Buffer</code>): The source of the <code>.vox</code> file. Can be: <ul><li>A URL string (fetched using <code>fetch</code>).</li><li>An <code>ArrayBuffer</code> containing the file data.</li><li>A Node.js <code>Buffer</code> containing the file data.</li></ul></li></ul></li><li><strong>Returns:</strong> <code>Promise&lt;VoxelData&gt;</code> - A promise that resolves to a <code>VoxelData</code> object.</li><li><strong>Throws:</strong> An error if fetching or parsing fails.</li></ul><p>The <code>load</code> function is the primary method for loading voxel models. It handles different input types and returns a structured <code>VoxelData</code> object containing all necessary information about the model.</p><h2 id="voxeldata" tabindex="-1"><code>VoxelData</code> <a class="header-anchor" href="#voxeldata" aria-label="Permalink to &quot;`VoxelData`&quot;">​</a></h2><p>The object returned by the <code>load</code> function.</p><ul><li><strong>Properties:</strong><ul><li><code>size</code> (<code>{ x: number; y: number; z: number }</code>): The dimensions of the model.</li><li><code>octree</code> (<code>SparseOctree</code>): The octree containing voxel data. This structure allows for efficient storage and retrieval of voxel information.</li><li><code>palette</code> (<code>{ r: number; g: number; b: number; a: number }[]</code>): The color palette (257 entries, index 0 is empty). This array provides the RGBA values for each color used in the model.</li><li><code>materials</code> (<code>(VoxelMaterial | null)[]</code>): Array of parsed materials. Each material contains properties that define its appearance and behavior.</li></ul></li></ul><h2 id="sparseoctree" tabindex="-1"><code>SparseOctree</code> <a class="header-anchor" href="#sparseoctree" aria-label="Permalink to &quot;`SparseOctree`&quot;">​</a></h2><p>A class representing the octree structure used for efficient voxel storage.</p><ul><li><strong>Methods:</strong><ul><li><code>iterateVoxels(callback)</code>: Iterates over non-empty voxels. <ul><li><code>callback</code> (<code>(x, y, z, data) =&gt; void</code>): Function called for each voxel. <ul><li><code>data</code> (<code>{ colorIndex: number; materialId?: number }</code>): Contains the color index and optional material ID for the voxel.</li></ul></li></ul></li><li><code>getAllVoxels()</code>: Returns an array of all voxels (potentially large). This method is useful for accessing all voxel data at once but can be memory-intensive.</li><li><code>get(x, y, z)</code>: Returns data for a specific voxel or <code>null</code>. This method allows for direct access to voxel data at specific coordinates.</li></ul></li></ul><p>The <code>SparseOctree</code> class is central to the dn-voxel-loader&#39;s ability to properly manage voxel data, providing methods for both iteration and direct access.</p><h2 id="type-definitions" tabindex="-1">Type Definitions <a class="header-anchor" href="#type-definitions" aria-label="Permalink to &quot;Type Definitions&quot;">​</a></h2><p>We use JSDoc annotations to define types such as <code>VoxelMaterial</code>.</p>',
            18
          ),
        ])
    )
  );
}
const p = o(l, [['render', i]]);
export { h as __pageData, p as default };
