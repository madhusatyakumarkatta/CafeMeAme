"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Story", href: "#story" },
    { name: "The Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Find Us", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 mx-auto transition-all duration-500 w-[calc(100%-2rem)] max-w-7xl rounded-full ${
          scrolled
            ? "top-4 py-4 px-8 md:px-10 bg-cacao-dark/40 backdrop-blur-xl border border-gold/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
            : "top-6 py-5 px-8 md:px-10 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <img
              src="/logo2.png"
              alt="Logo"
              style={{ width: "45px", height: "auto" }}
              className="object-contain group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="font-sans font-semibold text-2xl tracking-wide text-foreground group-hover:text-gold transition-colors duration-300">
              Cafe meAme
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-sans text-sm tracking-widest text-foreground/80 hover:text-gold uppercase transition-colors duration-300 py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://meamecafe.petpooja.com/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-gold/40 text-sm tracking-widest uppercase text-gold hover:bg-gold hover:text-cacao-dark transition-all duration-300 font-sans font-medium"
            >
              Order Online
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-gold transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 bg-cacao-dark/95 backdrop-blur-lg border-b border-glass-border flex flex-col md:hidden"
          >
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 py-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-3xl font-light tracking-wide text-foreground hover:text-gold transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://meamecafe.petpooja.com/menu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 rounded-full bg-gold text-cacao-dark text-md tracking-wider uppercase font-semibold hover:bg-gold-hover transition-colors"
              >
                Order Online
              </a>
            </div>
            
            <div className="py-6 border-t border-glass-border flex justify-center space-x-6">
              <a
                href="https://www.instagram.com/meame_bakery_cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-gold transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
