import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Import the 'load' function from the dn-voxel-loader library (ESM build)
import { load } from '../../dist/dn-voxel-loader.esm.js';

// --- Three.js Instancing --- Use InstancedMesh for performance
const instanceGeometry = new THREE.BoxGeometry(1, 1, 1);
// Material for the instances - colors will be set per instance
const instanceMaterial = new THREE.MeshStandardMaterial();
// ------------------------

const modelPath = '../assets/coding.vox';

// --- DOM Elements ---
const modelNameEl = document.getElementById('model-name');
const sizeEl = document.getElementById('size');
const countEl = document.getElementById('count');
const paletteInfoEl = document.getElementById('palette-info');
const canvas = document.getElementById('voxelCanvas');
const container = canvas.parentElement;

// --- Global Variables ---
let scene, camera, renderer, controls;
let voxelMesh = null; // To hold the InstancedMesh

modelNameEl.textContent = modelPath;

// --- Three.js Setup ---
function initThree() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);

  // Camera
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
  camera.position.set(50, 50, 50); // Initial position

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 0.5).normalize();
  scene.add(directionalLight);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.screenSpacePanning = false;

  // Resize Handler
  window.addEventListener('resize', onWindowResize);

  // Start Animation Loop
  animate();
}

// --- Animation Loop ---
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Only required if controls.enableDamping or controls.autoRotate are set to true
  renderer.render(scene, camera);
}

// --- Resize Handler ---
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// --- Load Model & Create Mesh ---
async function loadAndRender() {
  try {
    console.log(`Loading model from ${modelPath}...`);

    // === Use dn-voxel-loader ===
    // Call the imported 'load' function to parse the .vox file.
    // It returns a promise resolving to an object containing:
    // { size: {x, y, z}, octree: SparseOctree, palette: [{r, g, b, a}, ...], materials: [VoxelMaterial, ...] }
    const data = await load(modelPath);
    // ==========================

    console.log('Model loaded:', data);

    // Add check for valid data and octree
    if (!data || !data.octree) {
      throw new Error('Loaded data is invalid or missing the octree property.');
    }

    // Clear previous mesh if any
    if (voxelMesh) {
      scene.remove(voxelMesh);
      voxelMesh.geometry.dispose();
      voxelMesh.material.dispose(); // Assuming single material for InstancedMesh
      voxelMesh = null;
    }

    const { size, octree, palette } = data;

    // Estimate number of voxels (can be slightly off if octree is simplified)
    // For accurate count, we need to iterate
    let voxelCount = 0;
    octree.iterateVoxels(() => voxelCount++); // Count actual voxels

    // Update info display
    sizeEl.textContent = `${size.x} x ${size.y} x ${size.z}`;
    countEl.textContent = voxelCount.toLocaleString();
    const loadedColors = palette.filter((c) => c && c.a > 0).length - 1; // Exclude empty [0]
    const loadedMaterials = data.materials.filter((m) => m).length;
    paletteInfoEl.textContent =
      `Loaded ${loadedColors} colors` +
      (loadedMaterials > 0 ? ` / ${loadedMaterials} materials` : '');

    if (voxelCount === 0) {
      console.log('No voxels found in the octree to render.');
      return; // Nothing to render
    }

    // --- Create InstancedMesh ---
    voxelMesh = new THREE.InstancedMesh(
      instanceGeometry,
      instanceMaterial,
      voxelCount
    );

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    // Center the model based on its size
    // Note: MagicaVoxel Y is depth, Z is height. Three.js Y is height, Z is depth.
    // Adjust offset accordingly based on how you want to orient the model.
    const centerOffset = new THREE.Vector3(
      size.x / 2 - 0.5, // Center origin is 0,0,0, Boxes are 1x1, offset by 0.5
      size.z / 2 - 0.5, // Map VOX Z (up) to THREE Y (up)
      size.y / 2 - 0.5 // Map VOX Y (depth) to THREE Z (depth)
    );

    let instanceIndex = 0;
    octree.iterateVoxels((x, y, z, voxelLeafData) => {
      if (instanceIndex >= voxelCount) {
        console.warn('Voxel count mismatch during iteration');
        return;
      }

      // Set position, mapping VOX coords to THREE coords
      matrix.setPosition(
        x - centerOffset.x,
        z - centerOffset.y, // VOX Z (up) -> THREE Y (up)
        y - centerOffset.z // VOX Y (depth) -> THREE Z (depth)
      );
      voxelMesh.setMatrixAt(instanceIndex, matrix);

      // Set color
      const colorIndex = voxelLeafData.colorIndex;
      const voxelColor =
        colorIndex > 0 && colorIndex < palette.length
          ? palette[colorIndex]
          : null;

      if (voxelColor && voxelColor.a > 0) {
        // TODO: Handle materials - for now, just use palette color
        // const materialId = voxelLeafData.materialId;
        // const material = materialId && materials[materialId - 1] ? materials[materialId - 1] : null;
        // Apply material properties if needed (e.g., emissive, metalness, roughness)

        color.setRGB(
          voxelColor.r / 255,
          voxelColor.g / 255,
          voxelColor.b / 255
        );
        // Optional: Adjust color space if needed (e.g., renderer.outputEncoding = THREE.sRGBEncoding)
        // color.convertSRGBToLinear(); // Only if using linear workflow correctly
        voxelMesh.setColorAt(instanceIndex, color);
      } else {
        // Use a default color for missing palette indices or fully transparent voxels
        console.warn(
          `Voxel at (${x},${y},${z}) has invalid colorIndex ${colorIndex} or alpha 0.`
        );
        voxelMesh.setColorAt(instanceIndex, new THREE.Color(0xff00ff)); // Magenta for errors
      }
      instanceIndex++;
    });

    if (instanceIndex !== voxelCount) {
      console.error(
        `Final instance count ${instanceIndex} does not match initial count ${voxelCount}`
      );
    }

    voxelMesh.instanceMatrix.needsUpdate = true;
    if (voxelMesh.instanceColor) {
      voxelMesh.instanceColor.needsUpdate = true;
    }

    scene.add(voxelMesh);

    // --- Adjust Camera ---
    // Fit camera to the bounding box of the mesh
    const boundingBox = new THREE.Box3().setFromObject(voxelMesh);
    const center = boundingBox.getCenter(new THREE.Vector3());

    controls.reset(); // Reset controls to default state
    controls.target.copy(center); // Look at the center of the model

    // Adjust camera distance based on model size
    // Heuristic: Use the diagonal of the bounding box
    const modelDiagonal = Math.sqrt(size.x ** 2 + size.y ** 2 + size.z ** 2);
    const cameraDistance = modelDiagonal * 1.5; // Adjust multiplier as needed

    // Position camera relative to the center
    camera.position.copy(center);
    camera.position.x += cameraDistance * 0.707; // Position diagonally
    camera.position.y += cameraDistance * 0.5; // Slightly elevated
    camera.position.z += cameraDistance * 0.707;

    camera.lookAt(center);
    controls.update();
  } catch (error) {
    console.error('Failed to load or render voxel model:', error);
    sizeEl.textContent = 'Error';
    countEl.textContent = 'Error';
    paletteInfoEl.textContent = 'Error loading model';
    alert(`Error loading model: ${error.message}`);
  }
}

// --- Initialization ---
// Since this script is type=module, it runs after the HTML is parsed.
// Imports handle dependency loading.
initThree();
loadAndRender();
