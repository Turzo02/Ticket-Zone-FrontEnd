import React from "react";
import { Ticket, MapPin } from "lucide-react";
import logo from "/favicon.png";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full  relative overflow-hidden rounded-xl p-8 bg-(--bg-soft-accent)">
      {/* --- Ambient Background Glow (Sky Blue for Travel) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64  rounded-full blur-3xl animate-pulse" />

      {/* --- Text & Progress --- */}
      <div className="flex flex-col items-center z-10 space-y-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5 group transition-transform ">
          <div className="relative">
            <img
              className="w-10 h-10 object-contain drop-shadow-md group-hover:rotate-12 transition-transform duration-500"
              src={logo}
              alt="Logo"
            />
          </div>
          {/* Text Logo with Theme Gradient */}
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none flex items-center gap-1">
              <span className="text-(--text-main)">TICKET</span>
              {/* Gradient applied to ZONE matching the theme (Blue vs Green) */}
              <span className="italic scale-110 text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
                ZONE
              </span>
            </span>
          </div>
        </div>
        {/* Loading Bar Container */}
        <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
          {/* Animated Fill (The "Bus/Plane" moving across) */}
          <div className="absolute h-full w-full bg-linear-to-r from-sky-400 to-blue-600 animate-loading-bar rounded-full"></div>

          {/* Shimmer Effect overlay */}
          <div
            className="absolute inset-0 bg-white/30 animate-shimmer"
            style={{ transform: "skewX(-20deg)" }}
          ></div>
        </div>

        {/* Dynamic Loading Text */}
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest animate-pulse">
          Finding best routes...
        </p>
      </div>

      {/* --- Custom CSS for specific animations --- */}
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .animate-loading-bar {
          animation: loading 2.5s ease-in-out infinite;
          transform-origin: left;
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.05); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
