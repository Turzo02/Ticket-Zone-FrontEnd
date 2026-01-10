import React from 'react';
import { Link } from 'react-router';
import { MoveRight, Train, Bus, Plane, Ship, Car } from 'lucide-react';

const SingleTicket = ({ ticket, index, formattedPrice }) => {

  // Helper to render icon based on transport type
  const getTransportIcon = (type) => {
    switch (type) {
      case "Train": return <Train size={18} />;
      case "Bus": return <Bus size={18} />;
      case "Flight": return <Plane size={18} />;
      case "Ship": return <Ship size={18} />;
      default: return <Car size={18} />;
    }
  };

  return (
    <div
      key={index}
      className="
        group relative flex flex-col justify-between overflow-hidden rounded-2xl
        bg-(--bg-card) 
        border border-(--border-card)
        hover:border-(--border-hover)
        shadow-md hover:shadow-xl hover:shadow-(--grad-start)/10
        hover:-translate-y-1
        transition-all duration-300 ease-out
      "
    >
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={ticket.photo}
          alt={ticket.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Title */}
        <h2 className="absolute bottom-3 left-4 right-4 text-white text-xl font-extrabold drop-shadow-md truncate">
          {ticket.title}
        </h2>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        
        {/* From -> To Location */}
        <div className="flex justify-between items-center gap-2 p-3 rounded-xl border border-(--border-card)">
          <h1 className="text-xs font-bold text-(--text-main) truncate max-w-[100px]">
            {ticket.from}
          </h1>
          <MoveRight className="w-4 h-4 text-(--text-muted) shrink-0" />
          <h1 className="text-xs font-bold text-(--text-main) truncate max-w-[100px]">
            {ticket.to}
          </h1>
        </div>

        {/* Price & Availability Row */}
        <div className="flex justify-between items-end border-b border-(--border-card) pb-3">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-(--text-muted) uppercase tracking-wider mb-0.5">
              Price
            </p>
            <span className="text-2xl font-black text-(--text-main) tracking-tight">
              {formattedPrice}
            </span>
          </div>
          
          <div className="text-right">
             <p className="text-[10px] font-bold text-(--text-muted) uppercase tracking-wider mb-0.5">
               Available
             </p>
             <span className={`text-sm font-bold ${ticket.quantity < 5 ? 'text-red-500' : 'text-(--success-text)'}`}>
               {ticket.quantity} Seats
             </span>
          </div>
        </div>

        {/* Transport Type Badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-(--border-card) w-fit">
          <span className="text-(--grad-start)">
            {getTransportIcon(ticket.transportType)}
          </span>
          <span className="text-xs font-bold text-(--text-main)">
            {ticket.transportType}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-5 pt-0 mt-auto">
        <Link to={`/all-tickets/${ticket._id}`} className="block w-full">
          <button className="relative w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide overflow-hidden group/btn text-(--text-inv) shadow-lg shadow-(--grad-start)/20 transition-all duration-300 hover:shadow-(--grad-start)/40">
            {/* Gradient Background */}
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-(--grad-start) to-(--grad-end) group-hover/btn:scale-[1.02] transition-transform duration-300"></span>
            
            {/* Button Content */}
            <span className="relative flex items-center justify-center gap-2">
              See Details
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleTicket;
