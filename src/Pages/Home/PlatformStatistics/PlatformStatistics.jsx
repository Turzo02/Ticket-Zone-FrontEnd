import React, { useRef, useEffect } from 'react';
import { Ticket, Map, Users, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PlatformStatistics = () => {
  const containerRef = useRef(null);
  const numbersRef = useRef([]);
  const cardsRef = useRef([]);

  const stats = [
    {
      id: 1,
      icon: Ticket,
      value: "25k+",
      label: "Tickets Booked",
      desc: "Seamless journeys started"
    },
    {
      id: 2,
      icon: Map,
      value: "90k+",
      label: "Routes Covered",
      desc: "Connecting every corner"
    },
    {
      id: 3,
      icon: Users,
      value: "500+",
      label: "Travel Partners",
      desc: "Verified & trusted operators"
    },
    {
      id: 4,
      icon: Star,
      value: "98%",
      label: "Satisfaction Rate",
      desc: "Based on traveler reviews"
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(cardsRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          }
        }
      );

      stats.forEach((stat, index) => {
        const element = numbersRef.current[index];
        if (!element) return;

        const valueString = stat.value; 
        const numericValue = parseFloat(valueString.replace(/,/g, '')); 
        const suffix = valueString.replace(/[0-9.]/g, '');

        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: numericValue,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1, 
          },
          onUpdate: () => {
            if (element) {
              element.textContent = Math.floor(proxy.val) + suffix;
            }
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  });

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 bg-(--bg-soft-accent) transition-colors duration-300 overflow-hidden"
    >
      
      {/* Decorative Background Pattern */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--pattern-color) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* 1. Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-(--grad-start)/10 border border-(--grad-start)/20">
            <span className="text-xs font-bold text-(--grad-start) uppercase tracking-widest">
              Our Growth
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-(--text-main) tracking-tight mb-4">
            Trusted by <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
              Thousands Daily
            </span>
          </h2>
          <p className="text-lg text-(--text-muted) font-medium">
            We are redefining the travel experience with numbers that speak for themselves.
          </p>
        </div>
        
        {/* 2. Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              // Ref for the Card Animation
              ref={el => cardsRef.current[index] = el}
              className="
                group relative p-8 rounded-3xl overflow-hidden
                bg-(--bg-card) border border-(--border-card)
                shadow-sm hover:shadow-xl hover:shadow-(--grad-start)/5
                hover:-translate-y-2
                transition-all duration-300 ease-out
                flex flex-col items-center text-center
              "
            >
              {/* Icon Bubble */}
              <div className="mb-6 p-4 rounded-2xl bg-(--bg-soft-accent) border border-(--border-card) group-hover:scale-110 transition-transform duration-300 text-(--grad-start)">
                <stat.icon size={28} strokeWidth={1.5} />
              </div>

              {/* Number - THIS IS WHAT WE ANIMATE */}
              <div 
                className="text-4xl md:text-5xl font-black mb-3 text-(--text-main) group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-br group-hover:from-(--grad-start) group-hover:to-(--grad-end) transition-all duration-300"
              >
                {/* We put a span here to target just the text */}
                <span ref={el => numbersRef.current[index] = el}>
                    0{/* Initial Value */}
                </span>
              </div>

              {/* Label */}
              <div className="text-sm font-bold uppercase tracking-wider text-(--text-main) mb-2">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-xs font-medium text-(--text-muted)">
                {stat.desc}
              </div>

              {/* Bottom Line Accent */}
              <div className="absolute -bottom-0.5 left-0 w-full h-2 bg-linear-to-r from-(--grad-start) to-(--grad-end) transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-3xl" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PlatformStatistics;
