'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import Image from 'next/image';
import '../app/horizontal-words.css';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, InertiaPlugin);
}

const IG_POSTS = [
    { id: 1, url: "https://www.instagram.com/reel/DNhu1d9z_2K", embed: "https://www.instagram.com/reel/DNhu1d9z_2K/embed" },
    { id: 2, url: "https://www.instagram.com/p/DBOIXfMi2E4", embed: "https://www.instagram.com/p/DBOIXfMi2E4/embed" },
    { id: 3, url: "https://www.instagram.com/p/DBYo3AYCGUE", embed: "https://www.instagram.com/p/DBYo3AYCGUE/embed" },
    { id: 4, url: "https://www.instagram.com/reel/DHvl9bPzIlP", embed: "https://www.instagram.com/reel/DHvl9bPzIlP/embed" },
    { id: 5, url: "https://www.instagram.com/reel/DNnABcASisF", embed: "https://www.instagram.com/reel/DNnABcASisF/embed" },
];

const HorizontalWords = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            if (!container) return;
            const textRef = container.querySelector('.horizontal-words__relative');
            const letters = container.querySelectorAll('.letter');

            // Select the individual stickers instead of just the wrapper
            // or we select the images directly if they are the elements we want to animate.
            // The original logic animated .horizontal-words__sticker-svg, but since you have multiple images:
            const stickers = container.querySelectorAll('.horizontal-words__sticker-watch, .horizontal-words__sticker-cursor, .horizontal-words__sticker-phone');

            // Note: To animate SVG paths with strokeDashoffset, the SVG must be inlined in the HTML,
            // not loaded via <img> tags. The current setup uses <img> tags, so direct path animation
            // as written below will not work unless the SVGs are converted to inline <svg> elements.
            // For the purpose of this exercise, we'll assume the intent is for inline SVGs or
            // that the querySelectorAll will find nothing and the animation will gracefully skip.
            const arrows = container.querySelectorAll('.horizontal-words__arrow-svg path, .horizontal-words__arrow-end-svg path');

            // --- ENTRANCE & PINNING LOGIC ---
            // To make letters start animating as we scroll down from VimeoHero,
            // we start the horizontal movement as soon as the section enters the viewport (top bottom).
            const entranceDistance = window.innerHeight;
            const pinnedDistance = 800;

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: () => `+=${entranceDistance + pinnedDistance}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            scrollTween
                .fromTo(textRef, {
                    x: window.innerWidth // Start words off-screen right
                }, {
                    x: window.innerWidth * 0.5,
                    ease: "none",
                    duration: entranceDistance
                })
                .to(textRef, {
                    x: () => {
                      if(textRef) {
                        return -(textRef.scrollWidth - window.innerWidth * 0.5);
                      }
                      return 0;
                    },
                    ease: "none",
                    duration: pinnedDistance
                });

            // Separate pinning logic so it only locks when the section hits the top
            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: () => `+=${pinnedDistance}`,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true
            });
            // ------------------------------------

            // Bounce each letter randomly
            letters.forEach((letter) => {
                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * 500,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: letter,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 50%', // Finish as it reaches center
                        scrub: 0.5
                    }
                });
            });

            // Bounce stickers
            stickers.forEach((sticker) => {
                gsap.from(sticker, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * 400,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: sticker,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 50%', // Finish as it reaches center
                        scrub: 0.5
                    }
                });
            });

            // Animate Drawing SVG Arrows 
            arrows.forEach((arrowPath) => {
                // @ts-ignore
                if (arrowPath.getTotalLength) {
                    // @ts-ignore
                    const pathLen = arrowPath.getTotalLength();
                    gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                    gsap.to(arrowPath, {
                        strokeDashoffset: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: arrowPath.parentElement,
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 50%', // This is the last arrow's end point
                            scrub: 0.5
                        }
                    });
                }
            });

            // --- INERTIA LOGIC FOR MOCK IG POSTS ---
            const cards = container.querySelectorAll(".motion-card__card");
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

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section relative z-20 bg-transparent overflow-hidden text-[#fdf6e3]">
            <div className="horizontal-words__relative">
                <div className="horizontal-words__sticker-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg"><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>
                    <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-thumps-up.svg" className="horizontal-words__sticker-watch" alt="thumbs up sticker" />
                    <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-cursor.svg" className="horizontal-words__sticker-cursor" alt="cursor sticker" />
                    <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-phone.svg" className="horizontal-words__sticker-phone" alt="phone sticker" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 127" fill="none" className="horizontal-words__arrow-end-svg"><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>

                    <h2 className="display horizontal-words__h2" aria-label="We wanna be where the people are">
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>W</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>w</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>a</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>n</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>n</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>a</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>b</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>w</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>h</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>r</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>t</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>h</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>p</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>o</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>p</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>l</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                        {" "}
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>a</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>r</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>e</div>
                    </h2>
                </div>
            </div>

            {/* Mock IG Posts via Motion Cards */}
            <div className="horizontal-words__ig-container absolute bottom-[5%] md:bottom-[15%] left-0 w-full flex justify-center items-center h-auto pointer-events-none z-50">
                <div className="motion-card__cards pointer-events-auto max-w-[1100px] w-full flex justify-center relative h-[30vh]">
                    {IG_POSTS.map((post, index) => (
                        <div key={post.id} className={`motion-card__card motion-card__card--${index + 1}`}>
                            <div className="motion-card__card-image border border-glass-border relative w-full h-full bg-black overflow-hidden">
                                <div className="absolute top-[-56px] bottom-[-65px] left-[-2px] right-[-2px]">
                                    <iframe 
                                        src={post.embed} 
                                        width="100%" 
                                        height="100%" 
                                        frameBorder="0" 
                                        scrolling="no" 
                                        className="pointer-events-none w-full h-full"
                                    ></iframe>
                                </div>
                                {/* IG Hover Overlay - Captures dragging and click-through */}
                                <a 
                                  href={post.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-colors duration-300 group cursor-grab active:cursor-grabbing"
                                >
                                    <div className="opacity-0 group-hover:opacity-100 text-white text-sm font-sans flex flex-col items-center space-y-1 transition-opacity duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram mb-1"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                        <span className="font-bold tracking-wider">View on Instagram</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HorizontalWords;
