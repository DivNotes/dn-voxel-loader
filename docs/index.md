---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

home: true
title: DN Voxel Loader
tagline: A framework-agnostic JavaScript library for loading MagicaVoxel .vox files.

features:
  - title: ⚡️ Performant
    details: Optimized parsing and efficient octree-based storage for voxel data.
  - title: 🔧 Framework Agnostic
    details: Use it with any JavaScript framework (React, Vue, Svelte, Three.js) or vanilla JS.
  - title: 📦 Multiple Formats
    details: Provides ESM, CJS, and UMD builds for Node.js, bundlers, and direct browser use.
  - title: 🧩 Zero Dependencies
    details: No runtime dependencies, keeping your bundle size small.

actions:
  - theme: brand
    text: Get Started
    link: /guide
  - theme: alt
    text: View on GitHub
    link: https://github.com/divnotes/dn-voxel-loader
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(60px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(80px);
  }
}
</style>
