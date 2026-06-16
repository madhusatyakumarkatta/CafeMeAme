"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import LoadingPage from "@/components/LoadingPage";
import HeroSection from "@/components/HeroSection";
import HorizontalWords from "@/components/HorizontalWords";
import Gallery from "@/components/Gallery";
import MenuSection from "@/components/MenuSection";
import ServiceCards from "@/components/ServiceCards";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis smooth scroll and monitor scroll progress
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential out
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Monitor scroll updates
    lenis.on("scroll", (e) => {
      setScrollProgress(e.progress);
    });

    // Fallback resize hook to verify total height changes
    const handleScrollFallback = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener("scroll", handleScrollFallback);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, []);

  return (
    <>
      {/* Local Business Structured Data for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Bakery",
            "name": "Cafe MeAme",
            "image": "https://meamecafe.com/images/cafe_interior.png",
            "priceRange": "₹₹",
            "telephone": "+917997189718",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Gowtham, Buddha Rd, opposite NRI hospital road",
              "addressLocality": "Mangalagiri",
              "addressRegion": "Andhra Pradesh",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 21.2848569,
              "longitude": 81.7138207
            },
            "url": "https://meamecafe.com",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "09:00",
              "closes": "22:30"
            },
            "sameAs": [
              "https://www.instagram.com/meame_bakery_cafe"
            ]
          }),
        }}
      />

      {/* Loading Screen */}
      <LoadingPage onLoaded={() => setIsLoaded(true)} />

      {/* Premium Glassmorphic Navigation Bar */}
      <Navbar />

      {/* Content overlaying the WebGL background */}
      <main className="relative z-20 w-full overflow-hidden">
        {/* Hero Section - featuring coffee cups fly-in and scroll */}
        <HeroSection />

        {/* Layered background wrapper for bottom sections */}
        <div id="brown-rectangle" className="mx-4 md:mx-8 mb-12 rounded-[2.5rem] bg-[#2a1610] shadow-2xl overflow-hidden relative border border-white/5">
          {/* Horizontal words transition section */}
          <HorizontalWords />

          {/* Cinematic Grid Gallery */}
          <Gallery />

          {/* Menu Section */}
          <MenuSection />

          {/* Cafe Offerings / Service Cards */}
          <ServiceCards />

          {/* Reviews Marquee */}
          <ReviewSection />
        </div>

        {/* Contact, Operating Hours, and Maps Routing */}
        <Footer />
      </main>
    </>
  );
}
