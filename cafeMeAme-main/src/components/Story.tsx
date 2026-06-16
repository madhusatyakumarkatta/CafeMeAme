"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, Heart, Star } from "lucide-react";

interface StoryProps {
  onHoverCup: (isHovered: boolean) => void;
}

export default function Story({ onHoverCup }: StoryProps) {
  return (
    <section 
      id="story" 
      className="relative min-h-screen py-24 md:py-32 bg-cacao-medium flex items-center overflow-hidden px-6 md:px-12 border-t border-b border-glass-border/30"
    >
      {/* Subtle light glow behind text */}
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] bg-bronze/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 items-center relative z-20">
        
        {/* Left Side: Three.js Cup Area (Empty container on desktop to let Cup3D shine) */}
        <div className="md:col-span-5 order-2 md:order-1 h-[300px] md:h-[500px] pointer-events-none" />

        {/* Right Side: Narrative and Cafe Interior Photo */}
        <div className="md:col-span-7 order-1 md:order-2 flex flex-col justify-center">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3 mb-4"
          >
            <Coffee className="w-5 h-5 text-gold" />
            <span className="font-sans text-xs font-semibold tracking-widest text-gold uppercase">
              Our Heritage & Philosophy
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-light text-foreground leading-[1.2] mb-6"
          >
            We Blend <span className="italic text-gold">Local Roots</span> with <br />
            Global Cafe Culture
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base text-foreground/80 leading-relaxed mb-8"
            onMouseEnter={() => onHoverCup(true)}
            onMouseLeave={() => onHoverCup(false)}
          >
            Located in Mowa, Raipur, Cafe MeAme is built on a simple promise: to elevate the everyday bakery experience. Inspired by the cozy, minimalist, and "mass-premium" spirit of modern coffeehouses, we source standard AAA Arabica coffee beans and roast them to perfection. Every cake, sandwich, and pastry we make is crafted with premium ingredients, designed to create a sense of community and warmth.
          </motion.p>

          {/* Interactive Parallax Cafe Image & Narrative Column */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start mt-4">
            
            {/* Styled Image Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="sm:col-span-7 relative h-[250px] sm:h-[300px] rounded-2xl overflow-hidden glass-panel group shadow-2xl"
            >
              <Image
                src="/images/cafe_interior.png"
                alt="Cafe MeAme Cozy Interior"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cacao-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="font-sans text-xs text-foreground/90 tracking-widest uppercase">
                  Cozy Corner, Saddu Mowa
                </span>
              </div>
            </motion.div>

            {/* Subtext Grid */}
            <div className="sm:col-span-5 flex flex-col space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start space-x-3"
              >
                <div className="p-2 rounded-lg bg-glass-bg border border-glass-border">
                  <Star className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-foreground">Premium Ingredients</h4>
                  <p className="font-sans text-xs text-foreground/60 leading-normal mt-1">Real chocolate, high-grade flour, fresh dairy only.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-start space-x-3"
              >
                <div className="p-2 rounded-lg bg-glass-bg border border-glass-border">
                  <Heart className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-foreground">Crafted with Love</h4>
                  <p className="font-sans text-xs text-foreground/60 leading-normal mt-1">Custom-made shapes, layer decorations, and fine textures.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
