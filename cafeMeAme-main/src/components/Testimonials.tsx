"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, ArrowLeft, ArrowRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "Local Guide",
    rating: 5,
    text: "The Chocolate Truffle Cake here is hands down the best in Raipur! Very soft layers, rich taste, and visually stunning. The ambiance is so warm, cozy, and perfect for meetings.",
  },
  {
    id: 2,
    name: "Nisha Patel",
    role: "Food Blogger",
    rating: 5,
    text: "Loved the 3-layered Cafe MeAme Special Sandwich and their Iced Latte. It's a premium, Instagrammable cafe with authentic vibes. Great pricing for such high-end quality!",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Coffee Enthusiast",
    rating: 5,
    text: "Cafe MeAme has nailed both the bakery items and savories. The baked pasta was cooked to perfection and their cappuccino has a rich, strong espresso flavor. Highly recommended!",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="relative py-16 md:py-20 bg-cacao-dark overflow-hidden px-6 md:px-12">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-20">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MessageSquare className="w-5 h-5 text-gold" />
            <span className="font-sans text-xs font-semibold tracking-widest text-gold uppercase">
              Guest Testimonials
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            What Our <span className="italic text-gold">Visitors Say</span>
          </h2>
          <p className="font-sans text-sm text-foreground/60 leading-relaxed">
            Read authentic reviews from guests who have experienced our gourmet bakes and coffee craft at Cafe MeAme.
          </p>
        </div>

        {/* Testimonial Card Display */}
        <div className="relative min-h-[300px] md:min-h-[250px] flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-3xl p-8 md:p-12 relative w-full border border-gold/15 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 shadow-2xl shadow-black/45"
            >
              {/* Quote Icon overlay */}
              <div className="absolute right-8 top-8 opacity-5 text-gold pointer-events-none">
                <Quote className="w-24 h-24 rotate-180" />
              </div>

              {/* Card Body */}
              <div className="flex-1">
                {/* Stars */}
                <div className="flex space-x-1.5 mb-6">
                  {Array.from({ length: TESTIMONIALS[index].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif text-lg md:text-xl font-light text-foreground/90 italic leading-relaxed mb-6">
                  "{TESTIMONIALS[index].text}"
                </p>

                {/* Profile info */}
                <div>
                  <h4 className="font-sans text-sm tracking-widest text-gold uppercase font-bold">
                    {TESTIMONIALS[index].name}
                  </h4>
                  <p className="font-sans text-xs text-foreground/40 uppercase mt-0.5">
                    {TESTIMONIALS[index].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Controls */}
        <div className="flex justify-center items-center space-x-6 mt-10">
          <button
            onClick={prevTestimonial}
            className="p-3.5 rounded-full border border-glass-border hover:border-gold hover:text-gold text-foreground transition-all duration-300 bg-glass-bg"
            aria-label="Previous review"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex space-x-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === i ? "bg-gold w-6" : "bg-glass-border hover:bg-gold/40"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3.5 rounded-full border border-glass-border hover:border-gold hover:text-gold text-foreground transition-all duration-300 bg-glass-bg"
            aria-label="Next review"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
