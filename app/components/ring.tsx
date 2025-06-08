"use client"

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let hasInitialized = false; // 👈 Global module-level guard

export default function Ring() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasInitialized) return;
    hasInitialized = true;

    let camera: THREE.PerspectiveCamera,
        scene: THREE.Scene,
        renderer: THREE.WebGLRenderer;

    // Init Three.js
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.set(0, 0, 250);

    const ambient = new THREE.AmbientLight(0xffffff, 10);
    scene.add(ambient);

    const spotlight = new THREE.SpotLight(0xffffff, 50, 225, Math.PI / 6, 2, 0);
    spotlight.position.set(0, 0, 200);
    scene.add(spotlight);

    // Ring geometry
    const outerRadius = 40;
    const innerRadius = 35;
    const height = 15;

    const arcShape = new THREE.Shape();
    arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false);

    const holePath = new THREE.Path();
    holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true);
    arcShape.holes.push(holePath);

    const geometry = new THREE.ExtrudeGeometry(arcShape, {
      depth: height,
      bevelEnabled: false,
      steps: 1,
      curveSegments: 240,
    });

    geometry.center();
    geometry.rotateX(Math.PI * -0.5);

    const loader = new THREE.TextureLoader();
    const roughnessMap = loader.load('/textures/Metal011_2K-JPG_Roughness.jpg');
    roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
    roughnessMap.repeat.set(2, 2);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.4,
      roughness: 1,
      roughnessMap,
    });

    const ringBand = new THREE.Mesh(geometry, material);
    ringBand.castShadow = true;

    const ring = new THREE.Group();
    ring.add(ringBand);
    ring.rotation.z = Math.PI / 1.5;
    scene.add(ring);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      ring.rotation.x += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ overflow: 'hidden', pointerEvents: 'none' }}
    />
  );
}
