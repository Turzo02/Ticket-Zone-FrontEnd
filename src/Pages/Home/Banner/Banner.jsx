import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Compass } from "lucide-react";

// --- Helper Component ---
const Column = ({ images = [], direction = "up", duration = 20 }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="flex flex-col gap-6"
        animate={{
          y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...images, ...images, ...images].map((src, idx) => (
          <div key={idx} className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shrink-0 relative group">
             <img 
               src={src} 
               alt="Travel Destination" 
               className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" 
             />
             {/* Subtle overlay to blend images with theme */}
             <div className="absolute inset-0 bg-(--bg-page)/10 transition-colors" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Component ---
const HeroInfinite = () => {
  
  // Placeholder Data
  const imagesCol1 = [
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1474487548417-781cb714c2f0?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
  ];
  
  const imagesCol2 = [
    "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
  ];

  const imagesCol3 = [
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1532105956626-9569c03602f6?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-(--bg-page) flex items-center justify-center transition-colors duration-300">
      
      {/* --- BACKGROUND: Infinite Moving Columns --- */}
      <div className="absolute inset-0 w-full h-full flex gap-4 md:gap-6 px-4 md:px-0 -skew-y-3 scale-110 opacity-30">
        <div className="flex-1 hidden md:block overflow-hidden relative">
          <Column images={imagesCol1} direction="up" duration={45} />
        </div>
        <div className="flex-1 overflow-hidden relative">
           <Column images={imagesCol2} direction="down" duration={55} />
        </div>
        <div className="flex-1 hidden md:block overflow-hidden relative">
           <Column images={imagesCol3} direction="up" duration={50} />
        </div>
      </div>

      {/* --- OVERLAY: Gradient Fade into Page Color --- */}
      <div className="absolute inset-0 bg-linear-to-b from-(--bg-soft-accent) via-(--bg-soft-accent)/10 to-(--bg-soft-accent)" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-(--bg-soft-accent) opacity-90" />

      {/* --- FOREGROUND: Content --- */}
      <div className="relative z-20 text-center max-w-5xl px-6">
        
        {/* Badge - Soft Opacity Background */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="inline-flex items-center gap-2 border border-(--border-card) bg-(--bg-soft-accent)/40 backdrop-blur-md px-4 py-2 rounded-2xl mb-8"
        >
           <span className="w-2 h-2 rounded-2xl bg-(--grad-start) animate-pulse" />
           <span className="text-xs font-bold text-(--text-muted) uppercase tracking-widest">
             Gateway to 64 Districts
           </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black text-(--text-main) tracking-tighter mb-8 leading-[0.9] drop-shadow-xl"
        >
          Your Journey <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            Starts Here.
          </span>
        </motion.h1>

        {/* Static CTA Buttons (Replaced Input Field) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
            <button className="group relative px-8 py-4 rounded-2xl font-bold text-(--text-inv) text-lg overflow-hidden shadow-xl shadow-(--grad-start)/20 hover:shadow-(--grad-start)/40 transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-(--grad-start) to-(--grad-end)"></span>
              <span className="relative flex items-center gap-2 text-white">
                Book Your Ticket
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-(--text-main) bg-(--bg-soft-accent)/60 border border-(--border-card) hover:bg-(--bg-soft-accent) transition-all duration-300 backdrop-blur-sm">
               <Compass size={18} className="text-(--grad-start)" />
               Explore Routes
            </button>
        </motion.div>

        {/* Quick Links (Static Design) */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="mt-10 flex flex-wrap justify-center gap-6 text-(--text-muted) text-sm font-medium"
        >
           <span>Trending:</span>
           {['Cox\'s Bazar', 'Sylhet', 'Sajek', 'Bandarban'].map((place) => (
             <span key={place} className="flex items-center gap-1 hover:text-(--grad-start) cursor-pointer transition-colors duration-300">
               <MapPin size={14} className="opacity-70" /> {place}
             </span>
           ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HeroInfinite;
