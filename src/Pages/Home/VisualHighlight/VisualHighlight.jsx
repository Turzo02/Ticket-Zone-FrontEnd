import React from 'react';

const VisualHighlight = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-white dark:bg-slate-900">
      {/* Background Image - Scenic Travel Photo */}
      <div 
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center ">
        
        {/* Headline: Extra-bold, 3xl–4xl */}
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 drop-shadow-lg">
          Designed for modern travelers
        </h2>

        {/* Subtext: Regular font, medium size */}
        <p className="text-white text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
          Book your journey quickly, safely, and in style.
        </p>

      </div>
    </section>
  );
};

export default VisualHighlight;
