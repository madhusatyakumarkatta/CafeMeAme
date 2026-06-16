"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ReviewSection.module.css";

const REVIEWS = [
  { 
    name: "Rahul S.", 
    rating: 5, 
    text: "Absolutely loved the ambiance! The apricot chicken and Oreo milkshake are a must-try. Very courteous staff and a premium feel." 
  },
  { 
    name: "Priya M.", 
    rating: 5, 
    text: "Best cafe in Mangalagiri! The Chinese food was surprisingly authentic and delicious. The coffee is top-notch and the vibe is perfect." 
  },
  { 
    name: "Kiran V.", 
    rating: 4, 
    text: "Great place to hang out with friends. The interior is very pretty and Instagram-worthy. The soups and starters were excellent." 
  },
  { 
    name: "Anita R.", 
    rating: 5, 
    text: "A premium dining experience. We tried the continental dishes and the baked delights, everything tasted incredibly fresh and well-prepared." 
  },
  { 
    name: "Suresh K.", 
    rating: 5, 
    text: "Amazing specialty coffee and the desserts are to die for. The service was very professional and quick. Highly recommend the Mango Tres Leches!" 
  }
];

export default function ReviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current.querySelector(`.${styles.header}`),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.reviewSection} id="reviews">
      <div className={styles.container}>
        
        {/* Heading */}
        <div className={styles.header}>
          <h2 className={styles.title}>WHAT PEOPLE SAY</h2>
          <div className={styles.divider}></div>
        </div>

        {/* Marquee Wrapper */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {/* Double the list for infinite seamless scrolling */}
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i} 
                      className={i < review.rating ? styles.starFilled : styles.starEmpty} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className={styles.reviewText}>"{review.text}"</p>
                <div className={styles.reviewerInfo}>
                  <div className={styles.avatar}>{review.name.charAt(0)}</div>
                  <span className={styles.reviewerName}>{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
