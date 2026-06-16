'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CARDS_DATA } from '@/lib/data';

export default function ServiceCards() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate underline SVG paths on scroll
        gsap.to('.title-underline-svg path', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.service-cards-wrapper',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        const cards = gsap.utils.toArray('.card') as HTMLElement[];
        if (!cards.length) return;

        const originalData = [
            { rotation: 4 },
            { rotation: -5 },
            { rotation: 5 },
            { rotation: -8 },
            { rotation: 5 }
        ];

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        let leaveTimeout: NodeJS.Timeout | null = null;

        if (!isMobile) {
            cards.forEach((card, index) => {
                card.addEventListener('mouseenter', () => {
                    if (leaveTimeout) { clearTimeout(leaveTimeout); leaveTimeout = null; }
                    const hoverGap = 120;
                    const clusterGap = 150;
                    const cardWidth = 320;
                    const hoveredLeft = cards[index].offsetLeft;
                    const leftCards: any[] = [];
                    const rightCards: any[] = [];

                    cards.forEach((otherCard, otherIndex) => {
                        if (otherIndex < index) leftCards.push({ card: otherCard, index: otherIndex });
                        else if (otherIndex > index) rightCards.push({ card: otherCard, index: otherIndex });
                    });

                    const currentTop = cards[index].offsetTop;
                    const targetCommonTop = 50;
                    const moveY = targetCommonTop - currentTop;

                    gsap.to(cards[index], { x: 0, y: moveY, rotation: 0, scale: 1.08, duration: 0.9, ease: 'elastic.out(1, 0.5)', overwrite: true });

                    if (rightCards.length) {
                        const clusterStart = hoveredLeft + cardWidth + hoverGap;
                        rightCards.forEach((item, i) => {
                            const targetAbsLeft = clusterStart + (i * clusterGap);
                            const targetX = Math.max(targetAbsLeft - item.card.offsetLeft, 10);
                            const angleRad = originalData[item.index].rotation * (Math.PI / 180);
                            const targetY = targetX * Math.tan(angleRad);
                            gsap.to(item.card, { x: targetX, y: targetY, rotation: originalData[item.index].rotation, scale: 1, duration: 1.0, ease: 'elastic.out(1, 0.5)', overwrite: true });
                        });
                    }

                    if (leftCards.length) {
                        leftCards.reverse();
                        const clusterStart = hoveredLeft - hoverGap - cardWidth;
                        leftCards.forEach((item, i) => {
                            const targetAbsLeft = clusterStart - (i * clusterGap);
                            const targetX = Math.min(targetAbsLeft - item.card.offsetLeft, -10);
                            const angleRad = originalData[item.index].rotation * (Math.PI / 180);
                            const targetY = targetX * Math.tan(angleRad);
                            gsap.to(item.card, { x: targetX, y: targetY, rotation: originalData[item.index].rotation, scale: 1, duration: 1.0, ease: 'elastic.out(1, 0.5)', overwrite: true });
                        });
                    }
                });

                card.addEventListener('mouseleave', () => {
                    leaveTimeout = setTimeout(() => {
                        cards.forEach((c, i) => {
                            gsap.to(c, { x: 0, y: 0, scale: 1, rotation: originalData[i].rotation, duration: 1.0, ease: 'elastic.out(1, 0.5)', overwrite: true, zIndex: i + 1 });
                        });
                    }, 80);
                });
            });
        } else {
            // Mobile: Stacked card scroll reveal
            const cardsWrapper = document.querySelector('.cards-wrapper') as HTMLElement;
            const scrollPerCard = window.innerHeight * 0.8;
            const navH = 60;
            const mobileRotations = [-6, 4, -8, 5, -3];

            cards.forEach((card, i) => {
                gsap.set(card, {
                    position: 'absolute', left: '50%', top: '0', xPercent: -50,
                    y: i === 0 ? 0 : window.innerHeight * 1.1,
                    rotation: mobileRotations[i % mobileRotations.length],
                    zIndex: i + 1,
                    transformOrigin: 'center center'
                });
            });

            const wrapperH = window.innerHeight * 0.7 + scrollPerCard * (cards.length - 1);
            gsap.set(cardsWrapper, { height: wrapperH });

            ScrollTrigger.create({
                trigger: cardsWrapper,
                start: `top ${navH}px`,
                end: `+=${scrollPerCard * (cards.length - 1)}`,
                pin: true,
                pinSpacing: true,
                id: 'mobile-cards-pin'
            });

            cards.forEach((card, i) => {
                if (i === 0) return;
                gsap.fromTo(card,
                    { y: window.innerHeight * 1.1 },
                    {
                        y: 0,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: cardsWrapper,
                            start: `top+=${(i - 1) * scrollPerCard} ${navH}px`,
                            end: `top+=${i * scrollPerCard} ${navH}px`,
                            scrub: 0.4
                        }
                    }
                );
            });
        }
    }, []);

    return (
        <div className="service-cards-wrapper w-full bg-transparent text-[#fdf6e3] overflow-hidden relative py-12 md:py-[80px]" style={{ fontFamily: 'Epilogue, sans-serif' }}>
            {/* Inline SVG definitions for the symbols */}
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }} aria-hidden="true">
                <symbol id="bullet-icon" viewBox="0 0 13 16">
                    <path
                        d="M12.2765 7.03536V7.0403C12.2519 7.1343 12.0977 7.23633 12.0197 7.31177C11.5445 7.73351 11.0321 8.12803 10.6259 8.62706C10.3265 8.99562 10.0295 9.36293 9.75533 9.75128C9.66653 9.87186 9.55433 9.96647 9.47513 10.0901C9.39653 10.2157 9.34613 10.3579 9.26873 10.4865C9.18053 10.625 9.11813 10.7778 9.05033 10.9274C8.96213 11.1074 8.82353 11.2614 8.74373 11.4475C8.64773 11.6985 8.57213 11.9558 8.45573 12.1988C8.30093 12.6311 8.11493 13.0522 7.97573 13.49C7.89953 13.8171 7.91513 14.1585 7.81193 14.4806C7.72553 14.7793 7.71053 15.0873 7.71173 15.3964C7.70573 15.5127 7.73633 15.6951 7.65593 15.7483C7.62773 15.7557 7.58993 15.7199 7.55633 15.6617C7.44893 15.4645 7.40393 15.2326 7.29653 15.0279C7.13393 14.7094 6.87713 14.4559 6.68273 14.1572C6.57713 13.9989 6.48353 13.832 6.36533 13.6823C6.25973 13.5456 6.13073 13.4282 6.01673 13.2977C5.90753 13.1734 5.81633 13.0336 5.70653 12.9112C5.14013 12.3299 4.57133 11.7369 3.91793 11.2614C3.79493 11.1723 3.64673 11.1346 3.50753 11.0839C3.30113 10.9917 3.10253 10.8538 2.88293 10.7815C2.40293 10.6046 1.93733 10.3598 1.43633 10.2596C1.20593 10.2151 0.970727 10.212 0.736727 10.2107C0.555527 10.2052 0.0203267 10.2441 0.424127 9.98069C0.650927 9.83661 0.868127 9.68016 1.08713 9.52495C1.29353 9.3821 1.50893 9.25286 1.70393 9.09394C2.22653 8.61779 2.74913 8.15277 3.20813 7.60798C3.76013 6.9358 4.21373 6.18138 4.55453 5.36759C4.73033 4.99038 4.93673 4.62739 5.06693 4.23101C5.17553 3.83896 5.34293 3.46175 5.45093 3.07155C5.61113 2.35176 5.71013 1.61589 5.82173 0.888061C5.83433 0.813237 5.85113 0.755728 5.87093 0.750781C5.88893 0.744597 5.90873 0.775516 5.92793 0.829933C5.98313 0.989475 6.03353 1.15211 6.08753 1.31289C6.27773 1.91952 6.50993 2.51192 6.76673 3.08949C7.05473 3.75301 7.38413 4.41096 7.84553 4.96812C8.09333 5.25134 8.31833 5.55743 8.55593 5.84807C8.89613 6.20302 9.29213 6.52458 9.72413 6.73854C9.95513 6.85417 10.2005 6.95126 10.4573 6.98774C10.6247 7.01433 10.7819 7.0737 10.9523 7.09101C11.3123 7.12379 11.6693 7.03288 12.0257 6.99826C12.1391 6.98774 12.2645 6.96857 12.2759 7.03659L12.2765 7.03536Z"
                        fill="currentColor" />
                </symbol>
                <symbol id="card-divider" viewBox="0 0 250 5">
                    <path
                        d="M2.0019 3.05432C84.0122 2.70675 166.022 2.34756 248.04 2C244.505 2.66037 240.969 3.32077 237.434 3.98115"
                        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </symbol>
            </svg>

            {/* ─── Heading ─── */}
            <div className="title-container text-center mb-[30px] md:mb-[50px] px-4">
                <h2 className="main-title text-5xl md:text-[4rem] font-extrabold tracking-[-1px] md:tracking-[-2px] inline-block relative z-10">explore what we <br className="md:hidden" /><span className="italic-text font-serif italic font-medium ml-2">offer:</span></h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="160" viewBox="0 0 159 17" fill="none" className="title-underline-svg absolute bottom-[-10px] right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 z-0 text-[#f55a3b]" style={{ strokeDashoffset: '200', strokeDasharray: '200' }}>
                    <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>

            {/* ─── Service Cards ─── */}
            <div className="cards-wrapper" id="cards-wrapper" ref={wrapperRef}>
                {CARDS_DATA.map((card) => (
                    <div key={card.color} className={`card card-${card.color}`}>
                        <div className={`card-sticker sticker-${card.sticker}`}>
                            <img
                                src={`/assets/Card-Sticker SVG/sticker-${card.sticker}.svg`}
                                alt=""
                                width="100%"
                                loading="lazy"
                                aria-hidden="true"
                            />
                        </div>
                        <h3 className="card-title text-[1.8rem] md:text-[2.2rem] font-extrabold leading-none mt-[20px] md:mt-[30px] tracking-[-1px]">{card.title}</h3>
                        <svg width="100%" height="10" className="card-divider-svg my-3 md:my-4" aria-hidden="true">
                            <use href="#card-divider" />
                        </svg>
                        <ul className="card-list list-none font-medium text-[1rem] md:text-[1.15rem]">
                            {card.services.map((service) => (
                                <li key={service} className="mb-2 flex items-start gap-2 md:gap-3 leading-[1.3] tracking-[-0.3px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" className="services-card__bullet-svg w-[14px] h-[18px] shrink-0 mt-[2px] text-current" aria-hidden="true">
                                        <use href="#bullet-icon" />
                                    </svg>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
