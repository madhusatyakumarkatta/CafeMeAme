"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, Utensils, Coffee as CoffeeIcon } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "cakes" | "pastries" | "drinks" | "savories";
  image?: string;
}

const MENU_ITEMS: MenuItem[] = [
  // Cakes
  {
    id: "c1",
    name: "Chocolate Truffle Gold Cake",
    price: 650,
    description: "Layers of rich Belgian dark chocolate, cocoa ganache, and edible 24k gold flakes.",
    category: "cakes",
    image: "/images/chocolate_pastry.png"
  },
  {
    id: "c2",
    name: "Red Velvet Royal Cake",
    price: 700,
    description: "Fluffy velvet red sponge layered with whipped cream cheese and luxury vanilla frosting.",
    category: "cakes",
    image: "/images/red_velvet_cake.png"
  },
  {
    id: "c3",
    name: "Fresh Fruit Gateau",
    price: 600,
    description: "Vanilla sponge layered with light pastry cream and topped with fresh local berries.",
    category: "cakes",
    image: "/images/cafe_interior.png"
  },
  // Pastries
  {
    id: "p1",
    name: "Chocolate Truffle Pastry",
    price: 110,
    description: "Single slice of our signature dark chocolate ganache truffle cake.",
    category: "pastries",
    image: "/images/chocolate_pastry.png"
  },
  {
    id: "p2",
    name: "Classic Cream Donut",
    price: 90,
    description: "Fluffy yeast-raised donut filled with sweet vanilla pastry cream and powdered sugar.",
    category: "pastries",
    image: "/images/cream_donut.png"
  },
  {
    id: "p3",
    name: "Hazelnut Praline Brownie",
    price: 130,
    description: "Rich, fudgy chocolate brownie topped with toasted hazelnuts and dark chocolate swirls.",
    category: "pastries",
    image: "/images/chocolate_pastry.png"
  },
  // Drinks
  {
    id: "d1",
    name: "Signature Iced Latte",
    price: 160,
    description: "Double espresso shot poured over chilled milk, finished with a gold-dusted cream foam.",
    category: "drinks",
    image: "/images/coffee.png"
  },
  {
    id: "d2",
    name: "Classic Cappuccino",
    price: 130,
    description: "Perfectly balanced espresso shot with steamed milk and a thick layer of silky foam.",
    category: "drinks",
    image: "/images/coffee.png"
  },
  {
    id: "d3",
    name: "Cold Brew Ginger Ale",
    price: 150,
    description: "Slow-steeped coffee concentrate topped with fizzy ginger ale and a twist of lime.",
    category: "drinks",
    image: "/images/coffee.png"
  },
  // Savories
  {
    id: "s1",
    name: "Cafe MeAme Special Sandwich",
    price: 140,
    description: "3-layered toastie loaded with spiced paneer, fresh vegetables, cheese, and spicy mint chutney.",
    category: "savories",
    image: "/images/cafe_interior.png"
  },
  {
    id: "s2",
    name: "Mix Sauce Baked Pasta",
    price: 180,
    description: "Penne pasta baked in a hybrid of creamy Alfredo white sauce and tangy tomato marinara.",
    category: "savories",
    image: "/images/baked_pasta.png"
  },
  {
    id: "s3",
    name: "Bombay Masala Toast Pizza",
    price: 160,
    description: "Fusion flatbread pizza topped with street-style potato masala, onions, capsicum, and cheddar.",
    category: "savories",
    image: "/images/baked_pasta.png"
  },
  {
    id: "s4",
    name: "Special Mowa Vada Pav",
    price: 70,
    description: "Crispy fried spiced potato dumpling served inside butter-grilled soft bun with garlic chutney.",
    category: "savories",
    image: "/images/vada_pav.png"
  },
];

const CATEGORIES = [
  { id: "all", name: "All Delights" },
  { id: "cakes", name: "Specialty Cakes" },
  { id: "pastries", name: "Pastries & Brownies" },
  { id: "drinks", name: "Coffee & Drinks" },
  { id: "savories", name: "Gourmet Savories" },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<{ [id: string]: number }>({});

  const filteredItems = selectedCategory === "all" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const currentQty = prev[itemId] || 0;
      const newQty = currentQty + delta;
      
      if (newQty <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [itemId, qty]) => {
      const item = MENU_ITEMS.find((i) => i.id === itemId);
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const handleWhatsAppCheckout = () => {
    // Composition of the WhatsApp text message
    let messageText = "☕ *Cafe MeAme Order Request* 🍰\n\n";
    messageText += "I would like to order the following items:\n\n";

    Object.entries(cart).forEach(([itemId, qty]) => {
      const item = MENU_ITEMS.find((i) => i.id === itemId);
      if (item) {
        messageText += `• *${item.name}* x${qty} - ₹${item.price * qty}\n`;
      }
    });

    messageText += `\n💵 *Total Bill Amount:* ₹${getCartTotal()}\n\n`;
    messageText += "Please confirm availability and prep time. Thank you!";

    // Encode message for URL
    const encodedText = encodeURIComponent(messageText);
    
    // Cafe MeAme Phone number (formatted for India +91)
    // Replace with correct WhatsApp contact number if needed
    const whatsappNum = "917997189718"; 
    
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="menu" className="relative py-16 md:py-20 bg-cacao-dark overflow-hidden px-6 md:px-12">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-bronze/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20 pb-20">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Utensils className="w-5 h-5 text-gold" />
            <span className="font-sans text-xs font-semibold tracking-widest text-gold uppercase">
              Culinary Collection
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
            Browse Our <span className="italic text-gold">Delicious Menu</span>
          </h2>
          <p className="font-sans text-sm text-foreground/60 leading-relaxed">
            Order freshly prepared delicacies directly to your table or doorstep. Add items to your tray and click the order button to text us on WhatsApp.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full border text-xs font-sans tracking-widest uppercase transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-gold text-cacao-dark border-gold font-bold shadow-lg shadow-gold/20"
                  : "bg-glass-bg text-foreground/80 border-glass-border/80 hover:border-gold/45 hover:text-gold"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between min-h-[220px]"
                >
                  <div className="flex gap-4">
                    {/* Item Image if available */}
                    {item.image && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-glass-border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="font-serif text-xl font-medium text-foreground leading-tight">
                          {item.name}
                        </h3>
                        <span className="font-sans text-md font-semibold text-gold shrink-0">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-foreground/60 leading-normal mb-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-glass-border/30">
                    <div className="flex items-center space-x-1 text-xs text-foreground/40 font-sans uppercase tracking-wider">
                      {item.category === "drinks" ? (
                        <CoffeeIcon className="w-3.5 h-3.5 mr-1" />
                      ) : (
                        <Utensils className="w-3.5 h-3.5 mr-1" />
                      )}
                      {item.category}
                    </div>

                    <div className="flex items-center space-x-3 bg-cacao-medium rounded-full p-1 border border-glass-border">
                      {qty > 0 ? (
                        <>
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 rounded-full hover:bg-glass-border text-foreground/80 hover:text-gold transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-sans font-semibold text-sm px-2 text-foreground">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 rounded-full hover:bg-glass-border text-foreground/80 hover:text-gold transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-4 py-1.5 text-xs tracking-widest uppercase font-semibold text-gold hover:text-foreground hover:bg-glass-border/20 rounded-full transition-all"
                        >
                          Add to Tray
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating Checkout Drawer */}
      <AnimatePresence>
        {getCartCount() > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40"
          >
            <div className="glass-panel rounded-full p-4 flex items-center justify-between shadow-2xl border border-gold/30 bg-cacao-light/90 shadow-black/60 pr-6 pl-8">
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-foreground/50 tracking-widest uppercase">
                  Your Tray ({getCartCount()} items)
                </span>
                <span className="font-serif text-lg font-normal text-foreground">
                  Total: <span className="text-gold font-bold">₹{getCartTotal()}</span>
                </span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gold text-cacao-dark font-sans text-xs tracking-widest uppercase font-bold hover:bg-gold-hover transition-colors shadow-lg shadow-gold/20"
              >
                <MessageCircle className="w-4 h-4 fill-cacao-dark" />
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
