"use client";
/* eslint-disable react-hooks/purity */

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SteamParticle {
  ref: React.RefObject<THREE.Mesh | null>;
  speed: number;
  offsetX: number;
  offsetZ: number;
  scaleSpeed: number;
  initialY: number;
}

export default function CoffeeCup3D({ scrollProgress = 0, hoverActive = false }) {
  const groupRef = useRef<THREE.Group>(null);
  const cupGroupRef = useRef<THREE.Group>(null);

  // Steam particles settings
  const particleCount = 12;
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      ref: React.createRef<THREE.Mesh>(),
      speed: 0.3 + Math.random() * 0.4,
      offsetX: (Math.random() - 0.5) * 0.25,
      offsetZ: (Math.random() - 0.5) * 0.25,
      scaleSpeed: 0.1 + Math.random() * 0.2,
      initialY: 0.3 + (i / particleCount) * 0.8, // Stagger initial heights
    }));
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !cupGroupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Floating animation
    groupRef.current.position.y = Math.cos(time * 1.5) * 0.12 - 0.2;

    // Rotation
    const targetYRot = -time * 0.2 - scrollProgress * Math.PI * 1.5;
    cupGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      cupGroupRef.current.rotation.y,
      targetYRot + (hoverActive ? -0.5 : 0),
      0.05
    );

    // Tilt
    const targetXRot = Math.sin(time * 0.7) * 0.04 + 0.25 + (hoverActive ? 0.1 : 0);
    cupGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      cupGroupRef.current.rotation.x,
      targetXRot,
      0.05
    );

    // Steam particle animation
    particles.forEach((p) => {
      const mesh = p.ref.current;
      if (!mesh) return;

      // Update position Y
      mesh.position.y += delta * p.speed;
      
      // Calculate age/progress
      const maxDistance = 1.2;
      const progress = (mesh.position.y - 0.3) / maxDistance;

      // Reset when particle goes too high
      if (progress >= 1.0) {
        mesh.position.y = 0.3;
        mesh.position.x = p.offsetX;
        mesh.position.z = p.offsetZ;
        mesh.scale.setScalar(0.01);
      } else {
        // Sway sideways slightly
        mesh.position.x = p.offsetX + Math.sin(time * 2 + mesh.position.y * 3) * 0.08;
        
        // Scale up, then fade out
        const scaleVal = Math.sin(progress * Math.PI) * 0.15;
        mesh.scale.setScalar(Math.max(0.01, scaleVal));

        // Fade material opacity
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = (1 - progress) * 0.35;
        }
      }
    });
  });

  // Materials
  const ceramicMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1b1210"), // Dark cacao ceramic
    roughness: 0.15,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });

  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d4af37"), // Gold highlights
    roughness: 0.2,
    metalness: 0.8,
  });

  const coffeeLiquidMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2a1810"), // Espresso brown
    roughness: 0.1,
    metalness: 0.0,
  });

  const steamMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#f5efe6"),
      transparent: true,
      opacity: 0.25,
      blending: THREE.NormalBlending,
    });
  }, []);

  return (
    <group ref={groupRef}>
      <group ref={cupGroupRef} scale={2.4}>
        {/* Saucer */}
        <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} material={ceramicMat}>
          <cylinderGeometry args={[0.7, 0.75, 0.04, 32]} />
        </mesh>
        <mesh position={[0, -0.37, 0]} rotation={[-Math.PI / 2, 0, 0]} material={goldTrimMat}>
          <torusGeometry args={[0.72, 0.015, 8, 32]} />
        </mesh>

        {/* Cup Body (Cylinder, open at top) */}
        <mesh position={[0, -0.05, 0]} material={ceramicMat}>
          <cylinderGeometry args={[0.48, 0.38, 0.65, 32, 1, true]} />
        </mesh>

        {/* Inner base/bottom of the cup */}
        <mesh position={[0, -0.32, 0]} material={ceramicMat}>
          <cylinderGeometry args={[0.36, 0.36, 0.02, 32]} />
        </mesh>

        {/* Cup Rim (Gold trim at top) */}
        <mesh position={[0, 0.27, 0]} rotation={[Math.PI / 2, 0, 0]} material={goldTrimMat}>
          <torusGeometry args={[0.48, 0.02, 8, 32]} />
        </mesh>

        {/* Cup Handle (Gold / Ceramic torus) */}
        <mesh position={[-0.45, -0.05, 0]} rotation={[0, 0, Math.PI / 6]} material={goldTrimMat}>
          <torusGeometry args={[0.18, 0.04, 12, 24, Math.PI * 1.3]} />
        </mesh>

        {/* Coffee Liquid */}
        <mesh position={[0, 0.18, 0]} material={coffeeLiquidMat}>
          <cylinderGeometry args={[0.45, 0.44, 0.02, 32]} />
        </mesh>

        {/* Steam Particles */}
        <group>
          {particles.map((p, i) => (
            <mesh
              key={`steam-${i}`}
              ref={p.ref}
              position={[p.offsetX, p.initialY, p.offsetZ]}
              material={steamMat}
            >
              <sphereGeometry args={[0.8, 8, 8]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
