import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const VisualHighlight = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden group">
      
      {/* 1. Background Image with Parallax-like scale effect */}
      <div 
        className="absolute inset-0 z-0 w-full h-full transform transition-transform duration-2000 ease-out group-hover:scale-103"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')", // Swapped for a more 'travel' centric wide shot
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 2. Theme-Based Gradient Overlay */}
      {/* This uses the variables to tint the image Blue in light mode / Dark Navy in dark mode */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* 3. Content Container */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col justify-center">
        
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-widest">Premium Travel</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6 drop-shadow-xl">
            Designed for the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-white">
              Modern Traveler
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-blue-50 font-medium max-w-xl leading-relaxed mb-10 drop-shadow-md">
            Experience the next generation of booking. Seamless, secure, and crafted for your comfort from departure to arrival.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            
            {/* Primary CTA */}
            <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-blue-900 font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-white/20 active:scale-95">
              <span>Start Booking</span>
              <ArrowRight size={18} />
            </button>

            {/* Secondary Glass Button */}
            <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-blue-900">
                <Play size={10} fill="currentColor" />
              </div>
              <span>Watch Video</span>
            </button>

          </div>
        </div>

      </div>

    </section>
  );
};

export default VisualHighlight;
