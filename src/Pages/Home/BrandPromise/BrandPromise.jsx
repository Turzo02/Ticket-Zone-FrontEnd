import React from 'react';
import { ShieldCheck } from 'lucide-react'; // Assuming lucide-react is installed

const BrandPromise = () => {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden">
      {/* Optional: Subtle decorative background blur element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-600 dark:bg-blue-500 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-inter text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight  mb-6">
          Travel booking, done right.
        </h2>

        {/* Subtext */}
        <p className="font-inter text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Reliable, fast, and comfortable ticket booking for all your journeys.
        </p>

      </div>
    </section>
  );
};

export default BrandPromise;
