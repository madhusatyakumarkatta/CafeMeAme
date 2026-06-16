"use client";
/* eslint-disable react-hooks/purity */

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingItem {
  ref: React.RefObject<THREE.Group | null>;
  initialPosition: [number, number, number];
  rotationSpeed: [number, number, number];
  driftSpeed: number;
  type: "bean" | "gold";
  scale: number;
  floatOffset: number;
}

export default function FloatingElements({ scrollProgress = 0 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const count = 35;
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const type = Math.random() > 0.4 ? ("bean" as const) : ("gold" as const);
      
      // Distribute in a large volume around the screen
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      // Z-depth: some in front of text, some way in the back
      const z = -6 + Math.random() * 8; 

      return {
        ref: React.createRef<THREE.Group>(),
        initialPosition: [x, y, z] as [number, number, number],
        rotationSpeed: [
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.2,
        ] as [number, number, number],
        driftSpeed: 0.15 + Math.random() * 0.25,
        type,
        scale: type === "bean" ? 0.25 + Math.random() * 0.2 : 0.08 + Math.random() * 0.1,
        floatOffset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    items.forEach((item) => {
      const meshGroup = item.ref.current;
      if (!meshGroup) return;

      // Drift upwards slowly
      const currentY = item.initialPosition[1] + (time * item.driftSpeed) % 14 - 7;
      
      // Apply float sway
      const swayX = Math.sin(time * 0.5 + item.floatOffset) * 0.3;
      
      // Apply scroll parallax
      const scrollYOffset = scrollProgress * 6;

      meshGroup.position.x = item.initialPosition[0] + swayX;
      meshGroup.position.y = currentY - scrollYOffset;
      meshGroup.position.z = item.initialPosition[2];

      // Spin
      meshGroup.rotation.x = time * item.rotationSpeed[0];
      meshGroup.rotation.y = time * item.rotationSpeed[1];
      meshGroup.rotation.z = time * item.rotationSpeed[2];
    });
  });

  // Materials
  const beanMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2f1c16"), // Dark roast coffee bean
      roughness: 0.65,
      metalness: 0.15,
    });
  }, []);

  const goldLeafMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d4af37"), // Gold flake
      roughness: 0.2,
      metalness: 0.9,
      side: THREE.DoubleSide,
    });
  }, []);

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <group key={`float-${i}`} ref={item.ref} scale={item.scale}>
          {item.type === "bean" ? (
            /* Procedural Coffee Bean (Stretched sphere with center crease) */
            <group>
              {/* Left half bean */}
              <mesh position={[-0.07, 0, 0]} material={beanMat}>
                <sphereGeometry args={[0.5, 16, 16]} />
              </mesh>
              {/* Right half bean */}
              <mesh position={[0.07, 0, 0]} material={beanMat}>
                <sphereGeometry args={[0.5, 16, 16]} />
              </mesh>
              {/* Crease inside */}
              <mesh position={[0, 0, 0]} scale={[0.05, 0.45, 0.98]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#120806" roughness={0.9} />
              </mesh>
            </group>
          ) : (
            /* Procedural Gold Leaf (Thin diamond shape) */
            <mesh material={goldLeafMat}>
              <coneGeometry args={[0.5, 1.2, 4]} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
