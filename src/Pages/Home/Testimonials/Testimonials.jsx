import React, { useRef, useEffect } from "react";
import { Quote, Star, MapPin } from "lucide-react";

// GSAP Imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const testimonials = [
    {
      id: 1,
      name: "Ali Khan",
      route: "Dhaka → Chittagong",
      quote: "Booking tickets was incredibly fast. The UI is so intuitive, and I got my confirmation instantly.",
      image: "https://i.pravatar.cc/150?u=ali",
      rating: 5,
    },
    {
      id: 2,
      name: "Fatima Rahman",
      route: "Sylhet → Dhaka",
      quote: "The bus tracking feature was a lifesaver. I knew exactly when to leave home. Highly recommended!",
      image: "https://i.pravatar.cc/150?u=fatima",
      rating: 5,
    },
    {
      id: 3,
      name: "Tanvir Hasan",
      route: "Khulna → Jessore",
      quote: "Great prices and very comfortable seat selection process. This is my go-to travel app now.",
      image: "https://i.pravatar.cc/150?u=tanvir",
      rating: 4,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(cardsRef.current,
        {
          y: 100, 
          opacity: 0,
          scale: 0.8, 
          rotate: (index) => index % 2 === 0 ? -10 : 10, 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0, 
          ease: "back.out(1.7)",
          duration: 0.8,
          stagger: 0.25, 

          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", 
            end: "center center", 
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 bg-(--bg-soft-accent) transition-colors duration-300 relative overflow-hidden"
    >
      
      {/* Decorative Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-(--grad-start) rounded-full opacity-5 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-(--grad-end) rounded-full opacity-5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Title */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-(--text-main) tracking-tight mb-4">
            Loved by <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">Travelers</span>
          </h2>
          <p className="text-lg text-(--text-muted) font-medium">
            Join thousands of satisfied passengers who trust us for their daily commutes and holiday journeys.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              // Ref Assignment
              ref={(el) => (cardsRef.current[index] = el)}
              
              className="
                group relative flex flex-col justify-between
                p-8 rounded-3xl
                bg-(--bg-card) border border-(--border-card)
                hover:border-(--border-hover)
                shadow-sm hover:shadow-xl hover:shadow-(--grad-start)/5
                hover:-translate-y-2
                transition-all duration-300 ease-out
              "
            >
              {/* Large Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-(--quote-icon) transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Quote size={64} fill="currentColor" stroke="none" />
              </div>

              <div>
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={`${i < item.rating ? "text-(--star-color)" : "text-(--border-card)"} fill-current`} 
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="relative z-10 text-lg font-medium text-(--text-main) leading-relaxed mb-8">
                  "{item.quote}"
                </blockquote>
              </div>

              {/* User Profile Section */}
              <div className="flex items-center gap-4 pt-6 border-t border-(--border-card)">
                
                {/* Avatar with Gradient Ring */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-linear-to-br from-(--grad-start) to-(--grad-end) rounded-full blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity" />
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="relative w-12 h-12 rounded-full border-2 border-(--bg-card) object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col">
                  <h3 className="text-base font-bold text-(--text-main)">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-(--text-muted)">
                    <MapPin size={12} className="text-(--grad-start)" />
                    {item.route}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
