import React from "react";
import { NavLink } from "react-router";
import { Map, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-(--bg-soft-accent) transition-colors duration-300">
      
      <title>Page Not Found | TicketZone</title>



      {/* --- Main Content --- */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center">
        
   
        {/* 404 Typography */}
        <h1 className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-(--grad-start) to-(--grad-end) drop-shadow-sm mb-2 opacity-90">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-(--text-main) mb-4">
          Lost in TicketZone?
        </h2>
        
        <p className="text-lg text-(--text-muted) max-w-md mx-auto leading-relaxed mb-10">
          The destination you are looking for doesn't exist or has been moved to a new route. Let's get you back on track.
        </p>

        {/* Action Button */}
        <NavLink 
          to="/" 
          className="group relative px-8 py-4 rounded-xl font-bold text-lg text-white shadow-xl shadow-(--grad-start)/30 hover:shadow-(--grad-start)/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          {/* Gradient Background */}
          <span className="absolute inset-0 w-full h-full bg-linear-to-r from-(--grad-start) to-(--grad-end) group-hover:scale-105 transition-transform duration-300"></span>
          
          {/* Content */}
          <span className="relative flex items-center gap-3">
            <Home size={20} />
            <span>Return Home</span>
          </span>
        </NavLink>



      </div>
    </div>
  );
};

export default NotFound;
