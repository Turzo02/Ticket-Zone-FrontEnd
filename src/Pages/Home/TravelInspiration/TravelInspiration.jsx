import React from 'react';
import { MapPin, Compass, Heart, ArrowRight, Sun, Shield } from 'lucide-react';

const TravelInspiration = () => {
  const travelTips = [
    {
      icon: Sun,
      title: "Best Time to Visit",
      description: "October to March offers the most pleasant weather for exploring."
    },
    {
      icon: MapPin,
      title: "Popular Routes",
      description: "Don't miss the scenic drive from Chittagong to Bandarban."
    },
    {
      icon: Shield,
      title: "Travel Smart",
      description: "Always book with verified operators for a hassle-free journey."
    }
  ];

  return (
    <section className="w-full py-24 bg-(--bg-soft-accent) transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-(--grad-start)/10 border border-(--grad-start)/20">
            <Compass size={14} className="text-(--grad-start)" />
            <span className="text-xs font-bold text-(--grad-start) uppercase tracking-widest">
              Explore
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-(--text-main) tracking-tight mb-4">
            Discover <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">Bangladesh</span>
          </h2>
          <p className="text-lg text-(--text-muted) font-medium leading-relaxed">
            From the world's longest sea beach to lush tea gardens, uncover the hidden gems and diverse beauty of our country.
          </p>
        </div>

        {/* Feature Box: Travel Tips */}
        <div className="relative rounded-3xl overflow-hidden border border-(--border-card) shadow-sm shadow-(--grad-start)/5">
          
          {/* Background linear/Fill */}
          <div className="absolute inset-0 bg-(--bg-soft-accent)"></div>
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
              <h3 className="text-2xl md:text-3xl font-bold text-(--text-main) flex items-center gap-3">
                <span className="p-2 rounded-xl bg-(--grad-start) text-white shadow-lg shadow-(--grad-start)/30">
                  <Heart size={24} fill="currentColor" />
                </span>
                Traveler's Essentials
              </h3>
              <p className="text-(--text-muted) font-medium text-sm md:text-right max-w-md">
                Curated advice to help you make the most of your trip, whether it's business or leisure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {travelTips.map((tip, index) => (
                <div
                  key={index}
                  className="
                    group flex items-start gap-5 p-6 rounded-2xl
                    bg-(--icon-box-bg) border border-(--border-card)
                    hover:border-(--grad-start)/30
                    shadow-sm hover:shadow-lg hover:shadow-(--grad-start)/10
                    transition-all duration-300 ease-out
                  "
                >
                  <div className="
                    shrink-0 w-12 h-12 rounded-xl 
                    bg-(--bg-soft-accent) text-(--grad-start)
                    flex items-center justify-center
                    group-hover:scale-110 group-hover:bg-(--grad-start) group-hover:text-white
                    transition-all duration-300
                  ">
                    <tip.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-(--text-main) mb-2 group-hover:text-(--grad-start) transition-colors">
                      {tip.title}
                    </h4>
                    <p className="text-sm font-medium text-(--text-muted) leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-(--bg-card) border border-(--border-card) text-(--text-main) font-bold overflow-hidden shadow-lg shadow-(--shadow-color)/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <span className="absolute inset-0 bg-linear-to-r from-(--grad-start) to-(--grad-end) opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            <span>View All Destinations</span>
            <span className="p-1 rounded-full bg-(--bg-soft-accent) group-hover:bg-(--grad-start) group-hover:text-white transition-colors duration-300">
              <ArrowRight size={16} />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default TravelInspiration;
