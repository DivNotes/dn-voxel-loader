import path from 'path';
import { fileURLToPath } from 'url'; // Import url module utils
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// Get current directory path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map 'dn-voxel-loader' directly to the ESM build file
      'dn-voxel-loader': path.resolve(
        __dirname,
        '../../dist/dn-voxel-loader.esm.js'
      ),
    },
  },
  // optimizeDeps: {
  //   include: ['dn-voxel-loader'], // Keep or remove, alias might be sufficient
  // },
});
