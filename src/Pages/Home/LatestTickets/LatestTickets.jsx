import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import {
  Train,
  Bus,
  Plane,
  Ship,
  Car,
  Calendar,
  Sparkles,
  Ticket,
} from "lucide-react";

const LatestTickets = () => {
  const axiosSecure = useAxiosSecure();
  const displayLimit = 6;

  const {
    data: tickets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        "/ticket?page=1&limit=6&status=accepted"
      );
      const ticketArray = data.tickets;
      const sortedTickets = ticketArray.sort((a, b) => {
        const dateA = new Date(a.departure);
        const dateB = new Date(b.departure);
        return dateA - dateB;
      });
      return sortedTickets.slice(0, displayLimit);
    },
  });

  // Icon Selector Logic (Same as Exclusive Deals)
  const getTransportIcon = (type) => {
    switch (type) {
      case "Train": return <Train size={18} />;
      case "Bus": return <Bus size={18} />;
      case "Flight": return <Plane size={18} />;
      case "Ship": return <Ship size={18} />;
      default: return <Car size={18} />;
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40 bg-(--bg-page)">
        <p className="text-red-500 font-medium">Failed to load tickets.</p>
      </div>
    );
  }

  return (
    <section className="w-full py-20 bg-(--bg-page) transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) via-(--grad-end) to-(--grad-start) animate-gradient-x pb-2">
            Latest Tickets
          </h1>
          <p className="mt-4 text-(--text-muted) font-medium tracking-widest uppercase text-sm">
            Freshly Added • Book Now
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <SwappingDotLoader />
          </div>
        ) : (
          <div>
            {tickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 px-4 rounded-3xl border border-dashed border-(--border-card) bg-(--bg-card)/50 backdrop-blur-sm">
                <div className="p-4 bg-(--bg-badge) rounded-full mb-4 shadow-inner">
                  <Ticket size={40} className="text-(--text-muted)" />
                </div>
                <h3 className="text-xl font-medium text-(--text-muted) tracking-wide">
                  No Latest Tickets Found
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {tickets.map((ticket) => {
                  const formattedPrice = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(ticket.price);

                  return (
                    <div
                      key={ticket._id}
                      className="
                        group relative flex flex-col justify-between overflow-hidden rounded-2xl
                        bg-(--bg-card) border border-(--border-card)
                        hover:border-(--border-hover)
                        shadow-[0_8px_30px_rgb(var(--shadow-color)/0.1)] 
                        hover:shadow-[0_20px_40px_rgb(var(--shadow-color)/0.2)]
                        hover:-translate-y-2
                        transition-all duration-500 ease-out
                      "
                    >
                      <div>
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={ticket.photo}
                            alt={ticket.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            loading="lazy"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                          
                          {/* Title Badge */}
                          <div className="absolute bottom-3 left-4 right-4">
                             <h2 className="text-lg font-bold text-white leading-tight drop-shadow-md line-clamp-1">
                              {ticket.title}
                            </h2>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 space-y-4 relative z-10">
                          {/* Price Row */}
                          <div className="flex justify-between items-center pb-3 border-b border-(--border-card)">
                            <div className="flex flex-col">
                              <p className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest mb-0.5">
                                Price
                              </p>
                              <span className="text-2xl font-black text-(--text-main) tracking-tight">
                                {formattedPrice}
                              </span>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-bold text-(--text-muted) uppercase tracking-widest mb-0.5">
                                Left
                              </p>
                              <span className={`text-sm font-bold ${ticket.quantity < 5 ? 'text-red-500' : 'text-emerald-500'}`}>
                                {ticket.quantity} Seats
                              </span>
                            </div>
                          </div>

                          {/* Info Grid */}
                          <div className="grid grid-cols-2 gap-2">
                            {/* Transport */}
                            <div className=" rounded-lg p-2 flex items-center gap-2 border border-(--border-card) group-hover:border-(--border-hover) transition-colors">
                              <span className="p-1.5 rounded-md bg-(--bg-card) shadow-sm text-(--grad-start)">
                                {getTransportIcon(ticket.transportType)}
                              </span>
                              <span className="text-xs font-semibold text-(--text-main)">
                                {ticket.transportType}
                              </span>
                            </div>
                            
                            {/* Date */}
                            <div className=" rounded-lg p-2 flex items-center gap-2 border border-(--border-card) group-hover:border-(--border-hover) transition-colors">
                              <span className="p-1.5 rounded-md bg-(--bg-card) shadow-sm text-(--grad-start)">
                                <Calendar size={14} />
                              </span>
                              <span className="text-xs font-semibold text-(--text-main)">
                                {new Date(ticket.departure).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Perks Section */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2.5">
                              <Sparkles size={12} className="text-(--grad-end)" />
                              <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-wider">
                                Included Perks
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {ticket.perks.slice(0, 3).map((perk, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] font-semibold text-(--text-muted) bg-(--bg-badge) border border-(--border-card) px-2.5 py-1 rounded-full whitespace-nowrap"
                                >
                                  {perk}
                                </span>
                              ))}
                              {ticket.perks.length > 3 && (
                                <span className="text-[10px] font-medium text-(--text-muted) px-1 py-1">
                                  +{ticket.perks.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="p-5 pt-0 mt-auto">
                        <Link to={`/all-tickets/${ticket._id}`} className="block w-full">
                          <button className="relative w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide overflow-hidden group/btn text-(--text-inv) shadow-lg shadow-(--grad-start)/20 transition-all duration-300 hover:shadow-(--grad-start)/40">
                            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-(--grad-start) to-(--grad-end) group-hover/btn:scale-[1.02] transition-transform duration-300"></span>
                            <span className="relative flex items-center justify-center gap-2">
                              View Details
                              <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTickets;
