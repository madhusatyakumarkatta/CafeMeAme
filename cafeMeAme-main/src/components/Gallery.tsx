"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "../app/motion-cards.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, InertiaPlugin);
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  size: "large" | "medium" | "tall";
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: "Cinematic Brew Counter", category: "Ambiance", image: "/images/scene5.jpg", size: "large" },
  { id: 2, title: "Cafe Interior", category: "Ambiance", image: "/images/scene2.jpg", size: "medium" },
  { id: 3, title: "Luxury Seating", category: "Ambiance", image: "/images/scene3.jpg", size: "tall" },
  { id: 4, title: "Pastry Display", category: "Cakes", image: "/images/scene4.jpg", size: "tall" },
  { id: 5, title: "Cozy Dining Lounge", category: "Ambiance", image: "/images/scene1.jpg", size: "large" },
  { id: 6, title: "Gourmet Setup", category: "Specialty", image: "/images/scene2.jpg", size: "medium" },
  { id: 7, title: "Lounge View", category: "Ambiance", image: "/images/scene6.jpg", size: "medium" },
  { id: 8, title: "Wide Interior", category: "Ambiance", image: "/images/scene7.jpg", size: "tall" },
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Inertia on cards
      const cards = document.querySelectorAll(".motion-card__card");
      cards.forEach((card) => {
        let lastX = 0;
        let lastY = 0;
        let speedX = 0;
        let speedY = 0;

        const startRotation = gsap.getProperty(card, "rotation");
        const startX = gsap.getProperty(card, "x");
        const startY = gsap.getProperty(card, "y");

        const onMove = (e: any) => {
          speedX = e.clientX - lastX;
          speedY = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
        };

        const onEnter = (e: any) => {
          speedX = 0;
          speedY = 0;
          lastX = e.clientX;
          lastY = e.clientY;
        };

        const onLeave = () => {
          gsap.to(card, {
            inertia: {
              x: { velocity: speedX * 20, end: startX as number },
              y: { velocity: speedY * 20, end: startY as number },
              rotation: { velocity: speedX * 1.5, end: startRotation as number },
            },
          });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });

      // Inertia on floating labels
      const labels = document.querySelectorAll(".motion-card__floating-label");
      labels.forEach((label) => {
        let lastX = 0;
        let lastY = 0;
        let speedX = 0;
        let speedY = 0;

        const startRotation = gsap.getProperty(label, "rotation");
        const startX = gsap.getProperty(label, "x");
        const startY = gsap.getProperty(label, "y");

        const onMove = (e: any) => {
          speedX = e.clientX - lastX;
          speedY = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
        };

        const onEnter = (e: any) => {
          speedX = 0;
          speedY = 0;
          lastX = e.clientX;
          lastY = e.clientY;
        };

        const onLeave = () => {
          gsap.to(label, {
            inertia: {
              x: { velocity: speedX * 25, end: startX as number },
              y: { velocity: speedY * 25, end: startY as number },
              rotation: { velocity: speedX * 2, end: startRotation as number },
            },
          });
        };

        label.addEventListener("mousemove", onMove);
        label.addEventListener("mouseenter", onEnter);
        label.addEventListener("mouseleave", onLeave);
      });

      // Entry Animations: Sticker Pop & Underline Draw
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      const topStickerImg = sectionRef.current?.querySelector(".motion-card__sticker--top img");
      if (topStickerImg) {
        gsap.set(topStickerImg, { scale: 0, opacity: 0, rotation: -30 });
        tl.to(topStickerImg, { scale: 1, opacity: 1, rotation: 0, duration: 1.7, ease: "elastic.out(1, 0.4)" }, 0);
      }

      const underlinePath = sectionRef.current?.querySelector(".motion-card__underline-path") as SVGPathElement;
      if (underlinePath && underlinePath.getTotalLength) {
        const pathLen = underlinePath.getTotalLength();
        gsap.set(underlinePath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
        tl.to(underlinePath, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 0.2);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="motion-card-section bg-transparent border-t border-b border-glass-border/30">
      
      {/* ─── Part 1: Heading ─── */}
      <div className="motion-card__heading">
        <h2 className="motion-card__title !font-serif text-white">
          a place built
          <br />
          for the senses.
        </h2>
        <p className="motion-card__subtitle !font-sans !italic !text-gold">
          from brew to bite.
          <span className="motion-card__sticker motion-card__sticker--top">
            <img
              src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
              alt="Green heart hands sticker"
              className="motion-card__sticker-img"
            />
          </span>
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="motion-card__underline-svg text-gold">
          <path className="motion-card__underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ─── Part 2: Cards Area ─── */}
      <div className="motion-card__cards-area">
        {/* Blue SVG blob behind everything */}
        <div className="motion-card__blob">
          <img
            src="/assets/MotionCard SVG/motion-card-blob.svg"
            alt=""
            className="motion-card__blob-svg opacity-50"
          />
        </div>

        {/* 8 Photo Cards in 2 rows */}
        <div ref={containerRef} className="motion-card__cards-container flex flex-col items-center justify-center gap-12 z-10 relative h-[80%]">
          {/* Row 1 */}
          <div className="motion-card__cards flex items-center justify-center w-full">
            {GALLERY_ITEMS.slice(0, 4).map((item, index) => (
              <div 
                key={item.id} 
                className={`motion-card__card motion-card__card--${index + 1} cursor-pointer`}
                onClick={() => setActiveImage(item.image)}
              >
                <div className="motion-card__card-image border border-glass-border">
                  <Image
                    src={item.image}
                    width={600}
                    height={800}
                    alt={item.title}
                    className="cover-image"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="motion-card__cards flex items-center justify-center w-full">
            {GALLERY_ITEMS.slice(4, 8).map((item, index) => (
              <div 
                key={item.id} 
                className={`motion-card__card motion-card__card--${index + 5} cursor-pointer`}
                onClick={() => setActiveImage(item.image)}
              >
                <div className="motion-card__card-image border border-glass-border">
                  <Image
                    src={item.image}
                    width={600}
                    height={800}
                    alt={item.title}
                    className="cover-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating labels */}
        <div className="motion-card__floating-labels">
          <div className="motion-card__floating-label motion-card__floating-label--pink">
            <p className="motion-card__floating-text">crafted with love!</p>
          </div>
          <div className="motion-card__floating-label motion-card__floating-label--orange">
            <p className="motion-card__floating-text">premium ingredients</p>
          </div>
          <div className="motion-card__floating-label motion-card__floating-label--red">
            <p className="motion-card__floating-text">luxury seating</p>
          </div>
        </div>
      </div>

      {/* ─── Part 3: Bottom Paragraph Text ─── */}
      <div className="motion-card__footer-text mt-20 text-[#fdf6e3] opacity-90">
        <p className="motion-card__description font-sans">
          Experience the finest handcrafted beverages and premium custom baking in an atmosphere designed to impress. From cozy corners to cinematic brew counters, every detail matters.
        </p>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl h-[70vh] rounded-2xl overflow-hidden border border-glass-border"
            >
              <Image
                src={activeImage}
                alt="Enlarged gallery view"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
