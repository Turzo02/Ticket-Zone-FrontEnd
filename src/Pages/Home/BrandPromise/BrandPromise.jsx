import React, { useRef, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BrandPromise = () => {
  const sectionRef = useRef(null);
  const iconRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", 
          end: "center center",
          scrub: 1, 
        }
      });

      tl.fromTo(iconRef.current, 
        { 
          scale: 0, 
          rotation: -45, 
          opacity: 0 
        },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1, 
          ease: "power2.out" 
        }
      )
      
      .fromTo(contentRef.current.children, 
        { 
          y: 100, // Text comes from further down
          opacity: 0,
          scale: 0.9
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.2, 
        }, 
        "<0.2" 
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 lg:py-32 overflow-hidden bg-(--bg-soft-accent) transition-colors duration-300"
    >
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        {/* Icon Container - Added Ref */}
        <div ref={iconRef} className="flex justify-center mb-8">
          <div className="relative group">
            {/* Glow effect behind the icon */}
            <div className="absolute inset-0 bg-linear-to-r from-(--grad-start) to-(--grad-end) rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* The Icon Box */}
            <div className="relative p-4 rounded-2xl bg-linear-to-br from-(--grad-start) to-(--grad-end) shadow-xl shadow-(--grad-start)/20 ring-1 ring-white/20 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
              <ShieldCheck className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Text Content Wrapper - Added Ref to parent to stagger children */}
        <div ref={contentRef}>
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-6 text-(--text-main)">
            Travel booking,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
                done right.
            </span>
            </h2>

            {/* Subtext */}
            <p className="text-lg md:text-xl leading-relaxed text-(--text-muted) max-w-2xl mx-auto font-medium">
            Experience the premium standard of travel. Reliable, fast, and comfortable ticketing designed for your journey.
            </p>
        </div>

      </div>
    </section>
  );
};

export default BrandPromise;
