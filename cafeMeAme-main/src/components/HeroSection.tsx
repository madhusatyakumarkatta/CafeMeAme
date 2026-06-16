"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroSection.module.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);


  // References for coffee cups
  const cup3Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const mobile = window.innerWidth <= 768;

    // 1. Entry Animation (delayed to wait for LoadingPage to slide out)
    if (mobile) {
      gsap.fromTo(
        cup3Ref.current,
        { x: "100vw", y: -40, rotation: -18 },
        { x: 0, y: 0, rotation: 0, duration: 2.8, ease: "power2.out", delay: 2.7 }
      );
    } else {
      gsap.fromTo(
        cup3Ref.current,
        { x: "100vw", y: -40, rotation: -18 },
        { x: 0, y: 0, rotation: 0, duration: 2.8, ease: "power2.out", delay: 2.9 }
      );
    }

    // 2. Scroll-Triggered Pinning & Micro-Animations
    const pinTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=50%",
        scrub: 1,
        pin: true,
      },
    });

    if (mobile) {
      pinTimeline
        .fromTo(cup3Ref.current, { rotation: 2 }, { rotation: -2 }, 0);
    } else {
      pinTimeline
        .fromTo(cup3Ref.current, { rotation: 0 }, { rotation: -2 }, 0);
    }

    // 3. Precalculate cup3's target horizontal position for smooth scrolling
    let targetX = 0;
    const calculateTargetX = () => {
      if (cup3Ref.current) {
        // Store current transform properties
        const currentTransform = cup3Ref.current.style.transform;
        // Temporarily reset transform to get natural bounding rect
        cup3Ref.current.style.transform = "none";
        const rect = cup3Ref.current.getBoundingClientRect();
        const cupCenter = rect.left + rect.width / 2;
        targetX = window.innerWidth / 2 - cupCenter;
        // Reapply the original transform
        cup3Ref.current.style.transform = currentTransform;
      }
    };

    // Calculate once initial render completes and on window resizes
    const timer = setTimeout(calculateTargetX, 500);
    window.addEventListener("resize", calculateTargetX);

    // 4. Middle Cup Scroll Down & Center into About Section
    gsap.fromTo(
      cup3Ref.current,
      { y: 0, x: 0, rotation: mobile ? -2 : 0, scale: 1, marginBottom: 10 },
      {
        y: mobile ? "170vh" : "100vh",
        x: () => targetX, // Use precalculated static value
        rotation: -6,
        scale: 1.2,
        marginTop: 200 * Number(mobile),
        scrollTrigger: {
          trigger: "#brown-rectangle",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      }
    );

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateTargetX);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.heroSection} id="home">




      {/* Background Text Behind Cup */}
      <div className={styles.backgroundTextContainer}>
        <div className={styles.lineWrapper}>
          <h2 className={styles.line}>USE PREMIUM</h2>
        </div>
        <div className={styles.lineWrapper}>
          <h2 className={styles.line}>FRESH BEANS. AND FRESHLY</h2>
        </div>
        <div className={styles.lineWrapper}>
          <h2 className={styles.line}>BAKED DELIGHTS</h2>
        </div>
      </div>

      {/* 2D Coffee Cups Overlay */}
      <div className={styles.imagesContainer}>
        <Image
          ref={cup3Ref}
          src="/cup3-final.png"
          alt="Cup 3"
          width={300}
          height={400}
          className={styles.cup3}
          priority
        />
      </div>

      {/* Main Hero Content */}
      <div className={styles.content}>

      </div>
    </section>
  );
}
