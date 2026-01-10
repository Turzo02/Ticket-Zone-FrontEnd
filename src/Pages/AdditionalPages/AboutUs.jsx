import React from "react";
import { 
  CheckCircle, 
  Globe, 
  Heart, 
  ShieldCheck, 
  Users, 
  Zap 
} from "lucide-react";

const AboutUs = () => {
  
  const values = [
    {
      icon: ShieldCheck,
      title: "Safety First",
      desc: "We verify every operator to ensure your journey is secure from start to finish."
    },
    {
      icon: Zap,
      title: "Seamless Tech",
      desc: "Booking a ticket shouldn't be a chore. Our platform is built for speed and ease."
    },
    {
      icon: Heart,
      title: "Customer Obsession",
      desc: "We are available 24/7 to ensure your travel experience is flawless."
    },
    {
      icon: Globe,
      title: "Nationwide Reach",
      desc: "Connecting every district, upazila, and hidden gem in Bangladesh."
    }
  ];

  

  return (
    <div className="w-full min-h-screen bg-(--bg-soft-accent) text-(--text-main) transition-colors duration-300 overflow-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative pt-24 pb-20 px-6">
        {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
           <div className="absolute top-20 left-10 w-72 h-72 bg-(--grad-start) rounded-full opacity-10 blur-[100px]" />
           <div className="absolute top-40 right-10 w-96 h-96 bg-(--grad-end) rounded-full opacity-10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--bg-card) border border-(--border-card) shadow-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--grad-start) opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-(--grad-start)"></span>
            </span>
            <span className="text-xs font-bold text-(--text-muted) uppercase tracking-widest">
              Established 2024
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            We are <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
              TicketZone
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-(--text-muted) max-w-2xl mx-auto leading-relaxed">
            Revolutionizing the way Bangladesh travels. We bridge the gap between travelers and destinations with technology, trust, and transparency.
          </p>
        </div>
      </section>


      {/* --- Core Values --- */}
      <section className="py-24 bg-(--bg-soft-accent)">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-(--text-main) mb-4">
              Our Core <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">Values</span>
            </h2>
            <p className="text-(--text-muted) max-w-2xl mx-auto">
              The principles that drive every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, index) => (
              <div 
                key={index}
                className="
                  group p-8 rounded-3xl bg-(--bg-card) border border-(--border-card)
                  hover:border-(--grad-start)/30 hover:shadow-xl hover:shadow-(--grad-start)/5
                  hover:-translate-y-2 transition-all duration-300 ease-out
                "
              >
                <div className="w-12 h-12 rounded-xl bg-(--bg-soft-accent) flex items-center justify-center text-(--grad-start) mb-6 group-hover:scale-110 transition-transform">
                  <val.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-(--text-main) mb-3">
                  {val.title}
                </h3>
                <p className="text-sm font-medium text-(--text-muted) leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

 

    </div>
  );
};

export default AboutUs;
