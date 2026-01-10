import React, { useRef, useEffect } from "react";
import {
  Plane,
  BusFront,
  TrainFront,
  ShipWheel,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RouteCard = ({ icon: Icon, city1, city2, type, time }) => {
  // Dynamic styling based on transport type using CSS variables
  const getThemeClass = (type) => {
    switch (type) {
      case "plane":
        return "text-(--route-plane) bg-(--route-plane)/10 border-(--route-plane)/20 hover:border-(--route-plane)";
      case "bus":
        return "text-(--route-bus) bg-(--route-bus)/10 border-(--route-bus)/20 hover:border-(--route-bus)";
      case "train":
        return "text-(--route-train) bg-(--route-train)/10 border-(--route-train)/20 hover:border-(--route-train)";
      case "ship":
        return "text-(--route-ship) bg-(--route-ship)/10 border-(--route-ship)/20 hover:border-(--route-ship)";
      default:
        return "text-(--text-main)";
    }
  };

  // Specific text color helper for the arrow/icons
  const getTextColor = (type) => {
    switch (type) {
      case "plane":
        return "text-(--route-plane)";
      case "bus":
        return "text-(--route-bus)";
      case "train":
        return "text-(--route-train)";
      case "ship":
        return "text-(--route-ship)";
      default:
        return "text-(--text-main)";
    }
  };

  const themeClass = getThemeClass(type);
  const textColor = getTextColor(type);

  return (
    <div
      className={`
        group relative w-full
        bg-(--bg-card) 
        rounded-3xl
        border border-(--border-card)
        p-6 cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-2 
        hover:shadow-xl hover:shadow-(--shadow-color)/5
        overflow-hidden
        h-full
      `}
    >
      {/* Background Decorative Blob (Subtle) */}
      <div
        className={`absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 ${textColor} bg-current blur-3xl`}
      />

      <div className="relative z-10 flex flex-col h-full gap-4">
        {/* Top: Header Row */}
        <div className="flex items-start justify-between">
          <div
            className={`p-3 rounded-2xl transition-colors duration-300 ${themeClass}`}
          >
            <Icon className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--bg-soft-accent) border border-(--border-card)">
            <Clock size={12} className="text-(--text-muted)" />
            <span className="text-xs font-bold text-(--text-muted) uppercase tracking-wide">
              {time}
            </span>
          </div>
        </div>

        {/* Middle: The Journey Route */}
        <div className="flex items-center justify-between gap-2 mt-2">
          {/* Origin */}
          <div className="flex flex-col items-start">
            <span className="text-xs font-medium text-(--text-muted) mb-1 uppercase tracking-wider">
              From
            </span>
            <h3 className="text-xl font-black text-(--text-main) leading-none tracking-tight">
              {city1}
            </h3>
          </div>

          {/* Connector Graphic */}
          <div className="flex-1 px-4 flex flex-col items-center">
            {/* Animated Plane/Icon moving across */}
            <div className="w-full relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-(--route-line-base) -translate-y-1/2 rounded-full"></div>
              <div
                className={`absolute top-1/2 left-0 h-0.5 bg-current -translate-y-1/2 rounded-full w-0 group-hover:w-full transition-all duration-700 ease-in-out ${textColor}`}
              ></div>
              <div
                className={`absolute top-1/2 left-0 -translate-y-1/2 transition-all duration-700 ease-in-out group-hover:left-full group-hover:-translate-x-full ${textColor}`}
              >
                <div className="w-2 h-2 rounded-full bg-current shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-medium text-(--text-muted) mb-1 uppercase tracking-wider">
              To
            </span>
            <h3
              className={`text-xl font-black leading-none tracking-tight ${textColor}`}
            >
              {city2}
            </h3>
          </div>
        </div>

        {/* Bottom: Action Footer */}
        <div className="pt-5 border-t border-(--border-card) flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-xs font-medium text-(--text-muted)">
            <MapPin size={14} className={textColor} />
            <span>Daily Service</span>
          </div>
          <div
            className={`flex items-center gap-2 text-sm font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${textColor}`}
          >
            <span>Book Seat</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularRoutes = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const routes = [
    {
      city1: "Dhaka",
      city2: "Rajshahi",
      icon: Plane,
      type: "plane",
      time: "45 min",
    },
    {
      city1: "Rangpur",
      city2: "Dhaka",
      icon: BusFront,
      type: "bus",
      time: "6 hrs",
    },
    {
      city1: "Sylhet",
      city2: "Chittagong",
      icon: TrainFront,
      type: "train",
      time: "5 hrs",
    },
    {
      city1: "Dhaka",
      city2: "Barishal",
      icon: ShipWheel,
      type: "ship",
      time: "Overnight",
    },
  ];

  // --- SITUATIONAL ANIMATION: STAGGERED 3D RISE ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // We animate ALL cards, but use 'stagger' to delay them individually
      gsap.fromTo(
        cardsRef.current,
        {
          y: 100, // Starts further down
          opacity: 0,
          rotationX: -45, // Tilted BACKWARDS (like a flip clock)
          transformOrigin: "top center", // Pivot point
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0, // Flatten out
          scale: 1,
          ease: "power2.out",

          // The Stagger Effect:
          // Cards will appear one by one (0.1s delay between each)
          stagger: 0.2,

          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // Your requirement
            end: "center center", // Your requirement
            scrub: 1, // Smooth connection
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full py-20 bg-(--bg-soft-accent) text-(--text-main) transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
              Popular{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
                Destinations
              </span>
            </h2>
            <p className="text-(--text-muted) text-lg font-medium leading-relaxed">
              Explore our most traveled routes. Whether by air, road, rail, or
              river — we get you there in comfort.
            </p>
          </div>

          {/* View All Button */}
          <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-bold border border-(--border-card) bg-(--bg-card) hover:bg-(--bg-badge) hover:border-(--grad-start) transition-all duration-300 shadow-sm">
            <span>View All Routes</span>
            <ArrowRight size={16} className="text-(--grad-start)" />
          </button>
        </div>

        {/* Grid Layout - Added REF here */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {routes.map((route, index) => (
            // WRAPPER DIV for Animation Ref
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="perspective-1000" // Helps with 3D rotation
            >
              <RouteCard
                icon={route.icon}
                city1={route.city1}
                city2={route.city2}
                type={route.type}
                time={route.time}
              />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 md:hidden">
          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-(--bg-card) border border-(--border-card) text-(--text-main)">
            View All Routes <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularRoutes;
