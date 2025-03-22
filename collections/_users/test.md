---
layout: articles
show_title: false
show_date: false
permalink: /test
titles:
  en: &EN Voyage
  en-GB: *EN
  en-US: *EN
  en-CA: *EN
  en-AU: *EN
key: IP
public: false
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Three.js Module Test</title>
</head>
<body>
  <h1>Three.js Module Test</h1>
  <div id="viewer" style="width: 600px; height: 400px;"></div>

  <!-- Initialize Three.js -->
  <script type="module">
    import * as THREE from '/assets/js/three.module.js'; // Ensure this path is correct
    import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/OBJLoader.js';
    import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';

    console.log("Three.js imported:", THREE.REVISION);
    console.log("OBJLoader imported:", OBJLoader);
    console.log("OrbitControls imported:", OrbitControls);

    // Basic scene setup
    const container = document.getElementById('viewer');
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Load a simple OBJ model
    const loader = new OBJLoader();
    loader.load(
      'http://api.plantasia.space/uploads/models/4/077899da693f__Design_a_3D_model_.obj',
      (object) => {
        scene.add(object);
        console.log("Model loaded successfully.");
      },
      (xhr) => {
        console.log(`Model loading progress: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  </script>
</body>
</html>
