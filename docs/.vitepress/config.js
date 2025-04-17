import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'DN Voxel Loader',
  description:
    'A framework-agnostic JavaScript library for loading MagicaVoxel .vox files.',

  // Theme related configurations.
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // Navbar
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'API', link: '/api' },
      { text: 'Examples', link: '/examples' },
      {
        text: 'Changelog',
        link: '/changelog',
      },
    ],

    // Sidebar
    sidebar: [
      {
        text: 'Introduction',
        items: [
          {
            text: 'What is DN Voxel Loader?',
            link: '/guide#what-is-dn-voxel-loader',
          },
          { text: 'Getting Started', link: '/guide#getting-started' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Overview', link: '/api' },
          { text: 'load Function', link: '/api#load-source' },
          { text: 'VoxelData Interface', link: '/api#voxeldata' },
          { text: 'SparseOctree Class', link: '/api#sparseoctree' },
          { text: 'VoxelMaterial Interface', link: '/api#type-definitions' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Pure JS Example', link: '/examples#pure-js' },
          {
            text: 'React Three Fiber Example',
            link: '/examples#react-three-fiber',
          },
        ],
      },
    ],

    // Social links in nav bar
    socialLinks: [
      { icon: 'github', link: 'https://github.com/divnotes/dn-voxel-loader' },
    ],

    // Footer
    footer: {
      message: 'Released under the MPL-2.0 License.',
      copyright:
        'Copyright © 2025 <a href="https://divnotes.com">DivNotes</a>',
    },
  },

  // Base URL for deployment
  base: '/dn-voxel-loader/', // uncomment and set if deploying to github pages subdir

  // Out directory
  outDir: '../dist-docs',
});
