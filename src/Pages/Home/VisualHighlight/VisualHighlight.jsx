import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router";

const destinations = [
  {
    id: 1,
    title: "Cox's Bazar",
    location: "Chittagong Division",
    desc: "The world's longest natural sea beach awaits your footprints.",
    img: "/Cox.png",
  },
  {
    id: 2,
    title: "Sylhet",
    location: "Tea Gardens",
    desc: "Lush green carpets of tea and the crystal clear waters of Jaflong.",
    img: "/Shy.png",
  },
  {
    id: 3,
    title: "Saint Martin",
    location: "Coral Island",
    desc: "Blue waters and coconut groves. Bangladesh's only coral island.",
    img: "/martin.png",
  },
  {
    id: 4,
    title: "Sajek Valley",
    location: "Rangamati",
    desc: "Touch the clouds and experience the serenity of the hills.",
    img: "/sajek.png",
  },
];

const VisualHighlight = memo(() => {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden flex flex-col transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full p-8 z-30 flex justify-between items-center pointer-events-none">
        <div className="hidden md:flex gap-4 pointer-events-auto">
          <div className="px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-widest shadow-sm">
            Explore The Unseen
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-full w-full">
        {destinations.map((item) => (
          <motion.div
            key={item.id}
            layout
            onClick={() => setActiveId(item.id)}
            onHoverStart={() => setActiveId(item.id)}
            style={{ willChange: "flex" }} 
            className={`
              relative h-full cursor-pointer overflow-hidden 
              border-b md:border-b-0 md:border-r border-white/10 
              group
              ${activeId === item.id ? "flex-3 md:flex-4" : "flex-1"} 
              transition-[flex] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
            `}
          >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 w-full h-full">
              <motion.img
                src={item.img}
                alt={item.title}
                decoding="async"
                style={{ willChange: "transform" }}
                className="w-full h-full object-cover"
                animate={{ scale: activeId === item.id ? 1.1 : 1 }}
                transition={{ duration: 10, ease: "linear" }}
              />
              
              {/* Theme-Aware Overlays */}
              <div
                className={`
                  absolute inset-0 transition-opacity duration-500
                  bg-black
                  ${activeId === item.id ? "opacity-1" : "opacity-60 group-hover:opacity-50"}
                `}
              />
              {/* 2. Gradient Readability Layer: Hardcoded black for universal contrast */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent opacity-100" />
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
              
              {activeId !== item.id && (
                <div className="hidden md:flex absolute inset-0 items-center justify-center">
                  <h3 className="text-4xl font-black text-white -rotate-90 whitespace-nowrap tracking-[0.15em] uppercase mix-blend-overlay">
                    {item.title}
                  </h3>
                </div>
              )}

              {/* Expanded Content (Active State) */}
              <AnimatePresence mode="wait">
                {activeId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative z-10"
                  >
                    {/* Massive Showcase Title - Tightly stacked */}
                    <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-5 drop-shadow-2xl">
                      {item.title}
                    </h2>

                    {/* Compact Footer: Description & Button Side-by-Side */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/20 pt-5">
                      <p className="text-white/90 text-sm md:text-base font-medium max-w-xs leading-snug drop-shadow-md">
                        {item.desc}
                      </p>

                      <Link to="/all-tickets" className="w-fit flex items-center justify-center gap-3 px-6 py-3 cursor-pointer rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-(--grad-start) hover:text-white transition-all duration-300 shadow-xl shadow-black/20 group/btn">
                        Explore
                        <ArrowRight
                          size={16}
                          className="group-hover/btn:-rotate-45 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Title (Inactive State - Mobile) */}
              <div className="md:hidden">
                {activeId !== item.id && (
                  <h3 className="text-2xl font-black text-white/90 tracking-tighter drop-shadow-lg">
                    {item.title}
                  </h3>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

export default VisualHighlight;
