import React from 'react';
import { ArrowRight, Star, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router'; // Assuming you are using react-router

const FinalCTA = () => {
  const features = [
    {
      icon: Star,
      text: "Best Price Guarantee"
    },
    {
      icon: ShieldCheck,
      text: "100% Secure Booking"
    },
    {
      icon: Clock,
      text: "24/7 Expert Support"
    }
  ];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-(--bg-page)  overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-(--bg-card) border border-(--border-card) shadow-sm animate-bounce-slow">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--grad-start) opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-(--grad-start)"></span>
            </span>
           <span className="text-xs font-bold text-(--text-main) tracking-widest uppercase">
             Start Your Adventure
           </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-black text-(--text-main) tracking-tighter mb-6 leading-[1.1]">
          Ready to Start Your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            Journey?
          </span>
        </h2>
        
        {/* Subtext */}
        <p className="text-xl text-(--text-muted) font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
          Join over 50,000+ travelers who skip the lines and book smart with TicketZone. fast, secure, and reliable.
        </p>

        {/* Features Row */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-(--bg-card)/50 border border-(--border-card) backdrop-blur-sm"
            >
              <feature.icon className="w-5 h-5 text-(--grad-start)" />
              <span className="text-sm font-bold text-(--text-main)">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          
          {/* Primary Button */}
          <Link to="/all-tickets">
            <button className="group relative px-8 py-4 rounded-xl font-bold text-white text-lg overflow-hidden shadow-xl shadow-(--grad-start)/30 hover:shadow-(--grad-start)/50 transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-(--grad-start) to-(--grad-end)"></span>
              <span className="absolute inset-0 w-full h-full bg-linear-to-r from-(--grad-end) to-(--grad-start) opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-2">
                Book First Ticket
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </Link>
          
          {/* Secondary Button */}
          <Link to="/routes">
            <button className="px-8 py-4 rounded-xl font-bold text-(--text-main) bg-(--bg-card) border border-(--border-card) hover:bg-(--bg-page) hover:border-(--grad-start)/50 transition-all duration-300 min-w-[180px]">
              Browse Routes
            </button>
          </Link>
        </div>

        {/* Trust Indicators / Social Proof */}
        <div className="pt-8 border-t border-(--border-card) max-w-xl mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="flex -space-x-3">
               {[...Array(5)].map((_, i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 20}`} 
                    alt="user" 
                    className="w-10 h-10 rounded-full border-4 border-(--bg-page)"
                  />
               ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-(--star-color) text-(--star-color)" />
                ))}
              </div>
              <span className="text-sm font-bold text-(--text-main)">4.8/5</span>
              <span className="text-sm font-medium text-(--text-muted) px-2">•</span>
              <span className="text-sm font-medium text-(--text-muted)">Verified Reviews</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
