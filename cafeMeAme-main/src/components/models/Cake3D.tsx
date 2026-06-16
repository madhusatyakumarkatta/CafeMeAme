"use client";
/* eslint-disable react-hooks/purity */

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Cake3D({ scrollProgress = 0, hoverActive = false }) {
  const groupRef = useRef<THREE.Group>(null);
  const cakeRef = useRef<THREE.Group>(null);

  // Animate the cake rotation and floating on frame loop
  useFrame((state) => {
    if (!groupRef.current || !cakeRef.current) return;

    const time = state.clock.getElapsedTime();

    // Floating animation
    groupRef.current.position.y = Math.sin(time * 1.2) * 0.15;
    
    // Auto rotation + scroll rotation + mouse-hover rotation
    const targetYRot = time * 0.15 + scrollProgress * Math.PI * 2;
    cakeRef.current.rotation.y = THREE.MathUtils.lerp(
      cakeRef.current.rotation.y,
      targetYRot + (hoverActive ? 0.8 : 0),
      0.05
    );

    // Tilt animation on hover
    const targetXRot = Math.sin(time * 0.5) * 0.05 + (hoverActive ? -0.15 : 0);
    cakeRef.current.rotation.x = THREE.MathUtils.lerp(
      cakeRef.current.rotation.x,
      targetXRot,
      0.05
    );
  });

  // Materials
  const cakeChocolateMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1a0e0c"), // Deep chocolate brown
    roughness: 0.8,
    metalness: 0.1,
  });

  const frostingMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#fffaf0"), // Vanilla cream white
    roughness: 0.3,
    metalness: 0.0,
  });

  const berryMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#bc1838"), // Deep crimson red
    roughness: 0.6,
    metalness: 0.1,
  });

  const goldFlakeMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#d4af37"), // Shiny gold
    roughness: 0.15,
    metalness: 0.9,
  });

  // Generate gold flake positions around the cake
  const goldFlakes = Array.from({ length: 25 }).map((_, i) => {
    const angle = (i / 25) * Math.PI * 2 + Math.random() * 0.2;
    const radius = 1.05 + Math.random() * 0.3;
    const y = Math.random() * 1.5 - 0.75;
    return {
      position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number],
      scale: [0.03 + Math.random() * 0.04, 0.01 + Math.random() * 0.02, 0.03 + Math.random() * 0.04] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number]
    };
  });

  // Generate raspberry positions on the top tier
  const raspberries = Array.from({ length: 10 }).map((_, i) => {
    const angle = (i / 10) * Math.PI * 2;
    const radius = 0.55;
    const y = 0.85;
    return [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number];
  });

  return (
    <group ref={groupRef}>
      <group ref={cakeRef} scale={1.8}>
        {/* Tier 1 (Bottom) */}
        <mesh position={[0, -0.6, 0]} material={cakeChocolateMat}>
          <cylinderGeometry args={[1.2, 1.25, 0.5, 32]} />
        </mesh>
        {/* Bottom Frosting Ring */}
        <mesh position={[0, -0.35, 0]} material={frostingMat}>
          <cylinderGeometry args={[1.22, 1.22, 0.06, 32]} />
        </mesh>

        {/* Tier 2 (Middle) */}
        <mesh position={[0, -0.1, 0]} material={cakeChocolateMat}>
          <cylinderGeometry args={[0.9, 0.95, 0.45, 32]} />
        </mesh>
        {/* Middle Frosting Ring */}
        <mesh position={[0, 0.125, 0]} material={frostingMat}>
          <cylinderGeometry args={[0.92, 0.92, 0.06, 32]} />
        </mesh>

        {/* Tier 3 (Top) */}
        <mesh position={[0, 0.4, 0]} material={cakeChocolateMat}>
          <cylinderGeometry args={[0.6, 0.65, 0.4, 32]} />
        </mesh>
        {/* Top Glaze/Frosting Drip */}
        <mesh position={[0, 0.61, 0]} material={frostingMat}>
          <cylinderGeometry args={[0.62, 0.62, 0.04, 32]} />
        </mesh>
        
        {/* Chocolate Drips (Procedural cylindrical droplets) */}
        <group>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const r = 0.92;
            const length = 0.1 + Math.random() * 0.2;
            return (
              <mesh 
                key={`drip-m-${i}`} 
                position={[Math.cos(angle) * r, 0.125 - length / 2, Math.sin(angle) * r]} 
                material={frostingMat}
              >
                <cylinderGeometry args={[0.025, 0.015, length, 8]} />
              </mesh>
            );
          })}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const r = 0.62;
            const length = 0.08 + Math.random() * 0.15;
            return (
              <mesh 
                key={`drip-t-${i}`} 
                position={[Math.cos(angle) * r, 0.61 - length / 2, Math.sin(angle) * r]} 
                material={frostingMat}
              >
                <cylinderGeometry args={[0.02, 0.01, length, 8]} />
              </mesh>
            );
          })}
        </group>

        {/* Raspberries on Top */}
        <group>
          {raspberries.map((pos, i) => (
            <group key={`berry-${i}`} position={pos}>
              {/* Raspberry body using sphere */}
              <mesh material={berryMat}>
                <sphereGeometry args={[0.08, 12, 12]} />
              </mesh>
              {/* Little green leaf on top of berry */}
              <mesh position={[0, 0.08, 0]}>
                <boxGeometry args={[0.02, 0.02, 0.02]} />
                <meshStandardMaterial color="#4d7c0f" roughness={0.9} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Golden Flakes scattered on the chocolate cake body */}
        <group>
          {goldFlakes.map((flake, i) => (
            <mesh 
              key={`gold-${i}`} 
              position={flake.position} 
              scale={flake.scale} 
              rotation={flake.rotation} 
              material={goldFlakeMat}
            >
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
          ))}
        </group>
        
        {/* Cake Stand (Luxury Brass/Bronze stand) */}
        <group position={[0, -0.9, 0]}>
          {/* Base */}
          <mesh material={goldFlakeMat}>
            <cylinderGeometry args={[0.8, 0.9, 0.08, 32]} />
          </mesh>
          {/* Column */}
          <mesh position={[0, 0.14, 0]} material={goldFlakeMat}>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
          </mesh>
          {/* Top Plate */}
          <mesh position={[0, 0.25, 0]} material={goldFlakeMat}>
            <cylinderGeometry args={[1.35, 1.35, 0.04, 32]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
