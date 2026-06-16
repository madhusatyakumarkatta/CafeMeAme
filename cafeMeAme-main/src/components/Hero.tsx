"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onHoverCake: (isHovered: boolean) => void;
}

export default function Hero({ onHoverCake }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cacao-dark via-cacao-medium to-cacao-dark px-6 md:px-12 pt-20">
      {/* Decorative gradient overlay */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-bronze/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-20">
        {/* Content Area (Left side) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-7 flex flex-col items-start justify-center text-left"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border shadow-inner backdrop-blur-md mb-6"
          >
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span className="font-sans text-xs font-semibold tracking-widest text-gold uppercase">
              Mass-Premium Experiential Cafe
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl font-extralight tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Savor the Art of <br />
            <span className="font-normal italic text-gold">Artisanal Baking</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-lg text-foreground/75 leading-relaxed max-w-xl mb-8"
          >
            Step into Cafe MeAme. From multi-tiered luxury cakes with real gold flakes to slow-dripped specialty coffee, we fuse local heritage with global vibes in Raipur.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
            onMouseEnter={() => onHoverCake(true)}
            onMouseLeave={() => onHoverCake(false)}
          >
            <a
              href="#menu"
              className="flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-gold text-cacao-dark font-sans text-sm tracking-wider uppercase font-semibold hover:bg-gold-hover transition-colors shadow-lg shadow-gold/25"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a
              href="#story"
              className="flex items-center justify-center px-8 py-4 rounded-full border border-foreground/20 text-foreground hover:border-gold hover:text-gold transition-colors font-sans text-sm tracking-wider uppercase glass-panel"
            >
              Our Story
            </a>
          </motion.div>

          {/* Quick Info Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-glass-border/40 w-full max-w-lg"
          >
            <div>
              <p className="font-serif text-3xl text-gold font-light">100%</p>
              <p className="font-sans text-xs tracking-wider text-foreground/50 uppercase mt-1">Freshly Baked</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-gold font-light">A-Grade</p>
              <p className="font-sans text-xs tracking-wider text-foreground/50 uppercase mt-1">Coffee Beans</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-gold font-light">Custom</p>
              <p className="font-sans text-xs tracking-wider text-foreground/50 uppercase mt-1">Cake Designs</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Empty Area (Right side) - Reserved for Three.js Canvas positioning */}
        <div className="md:col-span-5 h-[350px] md:h-[600px] pointer-events-none" />
      </div>

      {/* Parallax Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer z-20"
        onClick={() => {
          document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="font-sans text-[10px] tracking-widest text-foreground/40 uppercase">
          Scroll Down
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent relative overflow-hidden">
          <motion.div
            animate={{
              y: ["0%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-foreground"
          />
        </div>
      </motion.div>
    </section>
  );
}
