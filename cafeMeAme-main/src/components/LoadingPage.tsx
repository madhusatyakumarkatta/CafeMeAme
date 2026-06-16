"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./LoadingPage.module.css";

interface LoadingPageProps {
  onLoaded: () => void;
}

export default function LoadingPage({ onLoaded }: LoadingPageProps) {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // References for coffee pieces
  const p1 = useRef<HTMLDivElement>(null);
  const p2 = useRef<HTMLDivElement>(null);
  const p3 = useRef<HTMLDivElement>(null);
  const p4 = useRef<HTMLDivElement>(null);
  const p5 = useRef<HTMLDivElement>(null);
  const p6 = useRef<HTMLDivElement>(null);
  const p7 = useRef<HTMLDivElement>(null);
  const p8 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const t = window.innerWidth <= 768;
    const pieces = [
      p1.current,
      p2.current,
      p3.current,
      p4.current,
      p5.current,
      p6.current,
      p7.current,
      p8.current,
    ];

    if (pieces.some((p) => !p)) return;

    // Reset initial states
    gsap.set([p1.current, p3.current, p6.current], {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
      rotation: -15,
    });
    gsap.set([p2.current, p7.current], {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
      rotation: 20,
    });
    gsap.set([p4.current, p5.current, p8.current], {
      scale: 0,
      opacity: 0,
      x: 0,
      y: 0,
      rotation: 10,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaded(true);
        onLoaded();
      },
    });

    // Animate timeline
    tl.to({}, { duration: 1.5 })
      .to([leftRef.current, rightRef.current], {
        scale: 1.3,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(
        pieces,
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
        },
        "<"
      )
      .to(
        leftRef.current,
        {
          x: t ? 0 : "-8vw",
          y: t ? "-8vh" : 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        rightRef.current,
        {
          x: t ? 0 : "8vw",
          y: t ? "8vh" : 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        p1.current,
        {
          x: t ? 0 : "-15vw",
          y: t ? "-15vh" : 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        p2.current,
        {
          x: t ? 0 : "-22.8vw",
          y: t ? "-22.8vh" : 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        p3.current,
        {
          x: t ? 0 : "-15vw",
          y: t ? "-15vh" : 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        p6.current,
        {
          x: t ? 0 : "-18vw",
          y: t ? "-18vh" : 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        p4.current,
        {
          x: t ? 0 : "15vw",
          y: t ? "15vh" : 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        p5.current,
        {
          x: t ? 0 : "15vw",
          y: t ? "15vh" : 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        p7.current,
        {
          x: t ? 0 : "18vw",
          y: t ? "18vh" : 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        p8.current,
        {
          x: t ? 0 : "12vw",
          y: t ? "12vh" : 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "<"
      )
      .to({}, { duration: 0.3 })
      // Zoom out/fly out
      .to([leftRef.current, rightRef.current], {
        scale: 2.5,
        duration: 1,
        ease: "power2.in",
      })
      .to(
        p1.current,
        {
          x: t ? "-35vw" : "-130vw",
          y: t ? "-130vh" : "-35vh",
          duration: 1.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        p2.current,
        {
          x: t ? "20vw" : "-130vw",
          y: t ? "-130vh" : "20vh",
          duration: 1.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        p3.current,
        {
          x: t ? "40vw" : "-130vw",
          y: t ? "-130vh" : "40vh",
          duration: 1.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        p6.current,
        {
          x: t ? "-10vw" : "-130vw",
          y: t ? "-130vh" : "-10vh",
          duration: 1.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        p4.current,
        {
          x: t ? "-25vw" : "130vw",
          y: t ? "130vh" : "-25vh",
          duration: 1.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        p5.current,
        {
          x: t ? "30vw" : "130vw",
          y: t ? "130vh" : "30vh",
          duration: 1.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        p7.current,
        {
          x: t ? "10vw" : "130vw",
          y: t ? "130vh" : "10vh",
          duration: 1.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        p8.current,
        {
          x: t ? "35vw" : "130vw",
          y: t ? "130vh" : "35vh",
          duration: 1.3,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        leftRef.current,
        {
          x: t ? 0 : "-100vw",
          y: t ? "-100vh" : 0,
          duration: 1,
          ease: "power2.in",
        },
        "<"
      )
      .to(
        rightRef.current,
        {
          x: t ? 0 : "100vw",
          y: t ? "100vh" : 0,
          duration: 1,
          ease: "power2.in",
        },
        "<"
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (loaded) return null;

  return (
    <div ref={containerRef} className={styles.loadingContainer}>
      {/* Background halves */}
      <div ref={leftRef} className={`${styles.loadingImage} ${styles.loadingLeft}`}>
        <img src={isMobile ? "/b1.png" : "/b1.png"} alt="Background Left" />
      </div>
      <div ref={rightRef} className={`${styles.loadingImage} ${styles.loadingRight}`}>
        <img src={isMobile ? "/b2.png" : "/b2.png"} alt="Background Right" />
      </div>

      {/* Floating Coffee Pieces */}
      <div ref={p1} className={`${styles.piece} ${styles.piece1}`}>
        <img src="/pieceCoffee1.svg" alt="Coffee Piece 1" />
      </div>
      <div ref={p2} className={`${styles.piece} ${styles.piece2}`}>
        <img src="/pieceCoffee2.svg" alt="Coffee Piece 2" />
      </div>
      <div ref={p3} className={`${styles.piece} ${styles.piece3}`}>
        <img src="/pieceCoffee3.svg" alt="Coffee Piece 3" />
      </div>
      <div ref={p4} className={`${styles.piece} ${styles.piece4}`}>
        <img src="/pieceCoffee4.svg" alt="Coffee Piece 4" />
      </div>
      <div ref={p5} className={`${styles.piece} ${styles.piece5}`}>
        <img src="/pieceCoffee5.svg" alt="Coffee Piece 5" />
      </div>
      <div ref={p6} className={`${styles.piece} ${styles.piece6}`}>
        <img src="/pieceCoffee1.svg" alt="Coffee Piece 6" />
      </div>
      <div ref={p7} className={`${styles.piece} ${styles.piece7}`}>
        <img src="/pieceCoffee3.svg" alt="Coffee Piece 7" />
      </div>
      <div ref={p8} className={`${styles.piece} ${styles.piece8}`}>
        <img src="/pieceCoffee2.svg" alt="Coffee Piece 8" />
      </div>
    </div>
  );
}
