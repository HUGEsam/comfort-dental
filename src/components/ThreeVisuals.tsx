'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DentalTooth3DProps {
  className?: string;
  wireframeColor?: string;
  glowColor?: string;
}

export function DentalTooth3D({
  className = 'w-full h-full min-h-[280px]',
  wireframeColor = '#38BDF8',
  glowColor = '#D4AF37',
}: DentalTooth3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 300;
    const height = currentMount.clientHeight || 280;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group to hold the tooth / implant assembly
    const toothGroup = new THREE.Group();

    // 1. Tooth Crown (faceted geometric crown)
    const crownGeo = new THREE.CylinderGeometry(1.4, 1.1, 1.8, 12, 6);
    const crownMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(wireframeColor),
      wireframe: true,
      emissive: new THREE.Color(wireframeColor),
      emissiveIntensity: 0.35,
      roughness: 0.2,
      metalness: 0.9,
    });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.y = 0.9;
    toothGroup.add(crown);

    // 2. Tooth Roots / Implant Screw (spiraled cylinder)
    const rootGeo1 = new THREE.ConeGeometry(0.55, 2.2, 10, 8);
    const rootMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(glowColor),
      wireframe: true,
      emissive: new THREE.Color(glowColor),
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.8,
    });
    const root1 = new THREE.Mesh(rootGeo1, rootMat);
    root1.position.set(-0.45, -1.0, 0);
    root1.rotation.z = 0.1;
    root1.rotation.x = Math.PI;
    toothGroup.add(root1);

    const rootGeo2 = new THREE.ConeGeometry(0.55, 2.2, 10, 8);
    const root2 = new THREE.Mesh(rootGeo2, rootMat);
    root2.position.set(0.45, -1.0, 0);
    root2.rotation.z = -0.1;
    root2.rotation.x = Math.PI;
    toothGroup.add(root2);

    // 3. Orbital Ring (implants precision collar)
    const ringGeo = new THREE.TorusGeometry(1.65, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(glowColor),
      wireframe: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    toothGroup.add(ring);

    // 4. Floating Bio-particles
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(wireframeColor),
      size: 0.07,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    scene.add(toothGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(new THREE.Color(wireframeColor), 2.5, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const goldLight = new THREE.PointLight(new THREE.Color(glowColor), 2, 50);
    goldLight.position.set(-5, -5, 5);
    scene.add(goldLight);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = mouseX * 0.9;
      targetRotationX = mouseY * 0.5;
    };

    currentMount.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle rotation + mouse tracking
      toothGroup.rotation.y += (targetRotationY + elapsedTime * 0.25 - toothGroup.rotation.y) * 0.05;
      toothGroup.rotation.x += (targetRotationX - toothGroup.rotation.x) * 0.05;

      ring.rotation.z = elapsedTime * 0.5;
      particles.rotation.y = elapsedTime * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      currentMount.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      crownGeo.dispose();
      crownMat.dispose();
      rootGeo1.dispose();
      rootMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [wireframeColor, glowColor]);

  return <div ref={mountRef} className={className} />;
}
