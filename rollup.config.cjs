const pkg = require('./package.json');

const input = 'src/index.js';
const name = 'dnVoxLoader'; // Global variable name for UMD build

// Add banner with attribution
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * A framework-agnostic JavaScript library for loading MagicaVoxel .vox files.
 * Created by DivNotes (https://divnotes.com)
 * 
 * @license MPL-2.0
 */`;

module.exports = [
  // ESM (for bundlers) build.
  {
    input: input,
    output: {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      banner,
    },
    // Indicate which modules should be treated as external
    // (We have no external dependencies in this case)
    external: [],
  },
  // CommonJS (for Node) build.
  {
    input: input,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto', // Automatically determine exports
      banner,
    },
    external: [],
  },
  // UMD (for browser <script>) build.
  {
    input: input,
    output: {
      name: name,
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      globals: {},
      banner,
    },
    external: [],
  },
];
