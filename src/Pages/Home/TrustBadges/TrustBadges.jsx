import React, { useRef, useEffect } from "react";
import { ShieldCheck, UserCheck, CheckCircle, Headphones } from "lucide-react";

// GSAP Imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TrustBadges = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const badgesRef = useRef([]);

  const badges = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Secure Transactions",
      description: "Bank-grade encryption for every payment.",
    },
    {
      id: 2,
      icon: UserCheck,
      title: "Verified Operators",
      description: "We only partner with trusted travel providers.",
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Instant Confirmation",
      description: "Get your digital tickets immediately.",
    },
    {
      id: 4,
      icon: Headphones,
      title: "24/7 Expert Support",
      description: "Our team is here to help, anytime, anywhere.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
      .fromTo(
        badgesRef.current,
        {
          opacity: 0,
          rotationY: 45,
          x: -30,
          transformPerspective: 1000,
          transformOrigin: "left center",
        },
        {
          opacity: 1,
          rotationY: 0,
          x: 0,
          stagger: 0.2,
          ease: "power2.out",
        },
        "<0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-20 bg-(--bg-soft-accent) transition-colors duration-300 border-y border-(--border-card)"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* New Headline Section - Added Ref */}
        <div ref={headlineRef} className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-(--text-main)">
            Why Travelers{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
              Trust Us
            </span>
          </h2>
          <p className="text-(--text-muted) text-lg font-medium">
            We prioritize your safety and convenience with a seamless booking
            experience you can rely on.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div
              key={badge.id}
              // Added Ref Assignment
              ref={(el) => (badgesRef.current[index] = el)}
              className="
                group relative flex flex-col items-center text-center p-8 rounded-3xl
                border border-(--border-card) hover:border-(--border-hover)
                bg-(--bg-card) 
                shadow-sm hover:shadow-xl hover:shadow-(--grad-start)/10 hover:-translate-y-1
                transition-all duration-300 ease-out
                cursor-default
                perspective-1000
              "
            >
              {/* Icon Wrapper */}
              <div
                className="
                mb-6 p-5 rounded-2xl 
                bg-(--icon-bg)
                group-hover:scale-110 group-hover:rotate-6 
                transition-transform duration-300 ease-out
              "
              >
                <badge.icon
                  className="w-10 h-10 text-(--grad-start)"
                  strokeWidth={1.5}
                />
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold mb-3 text-(--text-main) tracking-tight">
                {badge.title}
              </h3>

              <p className="text-sm font-medium text-(--text-muted) leading-relaxed">
                {badge.description}
              </p>

              {/* Decorative Hover Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-linear-to-r from-(--grad-start) to-(--grad-end) rounded-t-full opacity-0 group-hover:w-16 group-hover:opacity-100 transition-all duration-500 delay-75 ease-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
