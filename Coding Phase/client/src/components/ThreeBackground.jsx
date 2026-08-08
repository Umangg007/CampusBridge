import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Add Floating Geometric 3D Nodes (Icosahedron Particles)
    const particleCount = 120;
    const geometry = new THREE.IcosahedronGeometry(0.35, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x6366F1,
      emissive: 0x4F46E5,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, particleCount);
    const dummy = new THREE.Object3D();

    const particleData = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 50;

      const speedX = (Math.random() - 0.5) * 0.03;
      const speedY = (Math.random() - 0.5) * 0.03;
      const rotSpeed = Math.random() * 0.02;

      particleData.push({ x, y, z, speedX, speedY, rotSpeed });

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    scene.add(instancedMesh);

    // 3. Add Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06B6D4, 2, 100);
    pointLight.position.set(10, 20, 20);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x7C3AED, 2, 100);
    pointLight2.position.set(-20, -10, 10);
    scene.add(pointLight2);

    // 4. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce boundaries
        if (p.x > 40 || p.x < -40) p.speedX *= -1;
        if (p.y > 40 || p.y < -40) p.speedY *= -1;

        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.x += p.rotSpeed;
        dummy.rotation.y += p.rotSpeed;
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      instancedMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    // 5. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div id="canvas-3d-container" ref={mountRef} />;
};
