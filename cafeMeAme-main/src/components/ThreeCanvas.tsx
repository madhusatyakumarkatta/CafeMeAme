"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import Cake3D from "./models/Cake3D";
import CoffeeCup3D from "./models/CoffeeCup3D";
import FloatingElements from "./models/FloatingElements";

// Scene content coordinator to handle scroll interpolation and responsiveness
function SceneContent({ scrollProgress, activeHoverModel }: { scrollProgress: number; activeHoverModel: string | null }) {
  const [isMobile, setIsMobile] = useState(false);
  const cakeGroup = useRef<THREE.Group>(null);
  const cupGroup = useRef<THREE.Group>(null);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame(() => {
    if (!cakeGroup.current || !cupGroup.current) return;

    // Scroll mapping logic
    // 1. Cake3D (Visible in Hero section: scrollProgress 0 -> 0.35)
    if (scrollProgress < 0.45) {
      // Scale and position cake
      const scaleVal = THREE.MathUtils.mapLinear(scrollProgress, 0, 0.45, 1, 0);
      const targetScale = Math.max(0, scaleVal);
      cakeGroup.current.scale.setScalar(THREE.MathUtils.lerp(cakeGroup.current.scale.x, targetScale, 0.1));

      // Move cake off-screen upwards
      const targetY = THREE.MathUtils.mapLinear(scrollProgress, 0, 0.45, isMobile ? -0.4 : -0.2, 3);
      cakeGroup.current.position.y = THREE.MathUtils.lerp(cakeGroup.current.position.y, targetY, 0.1);

      // Desktop/Mobile positioning
      const targetX = isMobile ? 0 : 2.0;
      cakeGroup.current.position.x = THREE.MathUtils.lerp(cakeGroup.current.position.x, targetX, 0.1);
    } else {
      cakeGroup.current.scale.setScalar(0);
    }

    // 2. CoffeeCup3D (Visible in Story / Menu sections: scrollProgress 0.25 -> 0.75)
    if (scrollProgress > 0.15 && scrollProgress < 0.85) {
      // Transition cup in
      let targetScale = 0;
      if (scrollProgress >= 0.2 && scrollProgress <= 0.55) {
        targetScale = THREE.MathUtils.mapLinear(scrollProgress, 0.2, 0.35, 0, 1);
      } else if (scrollProgress > 0.55 && scrollProgress <= 0.85) {
        targetScale = THREE.MathUtils.mapLinear(scrollProgress, 0.6, 0.8, 1, 0);
      }
      targetScale = Math.max(0, Math.min(1, targetScale));
      cupGroup.current.scale.setScalar(THREE.MathUtils.lerp(cupGroup.current.scale.x, targetScale, 0.1));

      // Vertical movement
      const targetY = THREE.MathUtils.mapLinear(scrollProgress, 0.2, 0.8, -2, isMobile ? 0 : -0.2);
      cupGroup.current.position.y = THREE.MathUtils.lerp(cupGroup.current.position.y, targetY, 0.1);

      // X placement (Left side on desktop, centered on mobile)
      const targetX = isMobile ? 0 : -2.0;
      cupGroup.current.position.x = THREE.MathUtils.lerp(cupGroup.current.position.x, targetX, 0.1);
    } else {
      cupGroup.current.scale.setScalar(0);
    }
  });

  return (
    <>
      {/* Floating backdrops (coffee beans, gold leaf) */}
      <FloatingElements scrollProgress={scrollProgress} />

      {/* Main Cake Model */}
      <group ref={cakeGroup} position={[2.0, -0.2, 0]} scale={0}>
        <Cake3D scrollProgress={scrollProgress} hoverActive={activeHoverModel === "cake"} />
      </group>

      {/* Main Coffee Cup Model */}
      <group ref={cupGroup} position={[-2.0, -2, 0]} scale={0}>
        <CoffeeCup3D scrollProgress={scrollProgress} hoverActive={activeHoverModel === "cup"} />
      </group>
    </>
  );
}

export default function ThreeCanvas({ scrollProgress, activeHoverModel }: { scrollProgress: number; activeHoverModel: string | null }) {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.4} />

        {/* Cinematic Studio Lights */}
        {/* Main Key Light (Warm gold/white) */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          color="#fff5ea"
          castShadow
        />
        {/* Fill Light (Soft warm brass) */}
        <directionalLight
          position={[-5, 3, 2]}
          intensity={0.6}
          color="#ffdca0"
        />
        {/* Rim / Back Light (Cold white/cyan for premium contrast outline) */}
        <directionalLight
          position={[0, -5, -5]}
          intensity={1.2}
          color="#d4af37"
        />

        {/* Soft sparkling lights inside the scene */}
        <pointLight position={[0, 2, 1]} intensity={0.4} color="#ffffff" />

        <Suspense fallback={null}>
          <SceneContent scrollProgress={scrollProgress} activeHoverModel={activeHoverModel} />
        </Suspense>
      </Canvas>
    </div>
  );
}
