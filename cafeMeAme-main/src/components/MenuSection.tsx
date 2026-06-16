"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MenuSection.module.css";
import { MENU_DATA } from "@/lib/menuData";

export default function MenuSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(`.${styles.menuItem}`) as HTMLElement[];
      
      if (items.length > 0 && sectionRef.current) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const midPoint = Math.ceil(MENU_DATA.length / 2);
  const leftColumnData = MENU_DATA.slice(0, midPoint);
  const rightColumnData = MENU_DATA.slice(midPoint);

  return (
    <section ref={sectionRef} className={styles.menuSection} id="menu">
      <div className={styles.receiptsContainer}>
        
        {/* LEFT COLUMN (Receipt + Cup) */}
        <div className={styles.leftColumnWrapper}>
          <div className={styles.receiptPaper}>
            <div className={styles.receiptHeader}>
              <h2 className={styles.receiptTitle}>CAFE MeAme</h2>
              <p className={styles.receiptSubtitle} suppressHydrationWarning>Order #001 &bull; {new Date().toLocaleDateString()}</p>
              <div className={styles.receiptDivider}></div>
            </div>

            <div className={styles.receiptBody}>
              {leftColumnData.map((category, idx) => (
                <div key={`left-${idx}`} className={styles.categoryBlock}>
                  <h3 className={styles.categoryTitle}>{category.category}</h3>
                  
                  <div className={styles.itemsList}>
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className={styles.menuItem}>
                        <div className={styles.itemRow}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.itemDots}></span>
                          <span className={styles.itemPrice}>{item.price}</span>
                        </div>
                        {item.description && (
                          <p className={styles.itemDescription}>{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.receiptFooter}>
              <div className={styles.receiptDivider}></div>
              <p>--- PAGE 1 ---</p>
            </div>
          </div>
        </div>

        {/* RIGHT RECEIPT */}
        <div className={styles.receiptPaper}>
          <div className={styles.receiptHeader}>
            <h2 className={styles.receiptTitle}>CAFE MeAme</h2>
            <p className={styles.receiptSubtitle}>Order #001 &bull; {new Date().toLocaleDateString()}</p>
            <div className={styles.receiptDivider}></div>
          </div>

          <div className={styles.receiptBody}>
            {rightColumnData.map((category, idx) => (
              <div key={`right-${idx}`} className={styles.categoryBlock}>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
                
                <div className={styles.itemsList}>
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className={styles.menuItem}>
                      <div className={styles.itemRow}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemDots}></span>
                        <span className={styles.itemPrice}>{item.price}</span>
                      </div>
                      {item.description && (
                        <p className={styles.itemDescription}>{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.receiptFooter}>
            <div className={styles.receiptDivider}></div>
            <p>THANK YOU FOR YOUR VISIT</p>
            <p>PLEASE COME AGAIN</p>
          </div>
        </div>

      </div>
    </section>
  );
}
