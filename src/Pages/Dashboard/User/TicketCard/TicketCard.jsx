import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import TicketCountdown from "../../../../Components/TicketCountdown/TicketCountdown";
import useAxiosSecure from "../../../../Hooks/useAxiousSecure";
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  CreditCard,
  Ticket,
  Bus,
  Train,
  Plane,
  Ship
} from "lucide-react";

const TicketCard = ({ ticket }) => {
  const [isDeparted, setIsDeparted] = useState(false);
  const axiosSecure = useAxiosSecure();

  const isTicketAccepted = ticket.status === "accepted";
  const isPurchasable = isTicketAccepted && !isDeparted;

  const handleDepartureComplete = useCallback((completedStatus) => {
    setIsDeparted(completedStatus);
  }, []);

  // Format Data
  const departureDate = ticket.departure ? new Date(ticket.departure) : null;
  const formattedDate = departureDate
    ? departureDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    : "N/A";
  const formattedTime = departureDate
    ? departureDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    : "N/A";

  // Dynamic Icon based on content (simple heuristic)
  const getTransportIcon = () => {
    const t = ticket.transportType || "bus"; // Default fallback
    if (t.toLowerCase().includes("train")) return <Train size={20} />;
    if (t.toLowerCase().includes("flight") || t.toLowerCase().includes("plane")) return <Plane size={20} />;
    if (t.toLowerCase().includes("ship") || t.toLowerCase().includes("launch")) return <Ship size={20} />;
    return <Bus size={20} />;
  };

  const handlePayment = async (id) => {
    try {
      const ticketInfo = {
        totalPrice: ticket.totalPrice,
        title: ticket.title,
        userEmail: ticket.userEmail,
        id: id,
        ticketId: ticket.ticketId,
        bookingQuantity: ticket.bookingQuantity,
        quantity: ticket.quantity,
      };
      const res = await axiosSecure.post("/payment-checkout-session", ticketInfo);
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Payment Error", error);
    }
  };

  // --- Badge Logic (Refined) ---
  const renderStatusBadge = (status, type) => {
    let colorClass = "";
    let label = status;

    if (type === "ticket") {
      if (status === "accepted") {
        colorClass = "bg-(--success-bg) text-(--success-text)";
      } else if (status === "pending") {
        colorClass = "bg-[var(--grad-wait-start)]/10 text-[var(--grad-wait-end)]";
      } else {
        colorClass = "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400";
      }
    } else {
      // Payment
      if (status === "paid") {
        colorClass = "bg-(--success-bg) text-(--success-text)";
        label = "Paid";
      } else {
        colorClass = "bg-[var(--grad-wait-start)]/10 text-[var(--grad-wait-end)]";
        label = "Unpaid";
      }
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${colorClass}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
        {label}
      </span>
    );
  };

  return (
    <div className="group relative flex flex-col rounded-4xl border border-(--border-card) bg-(--bg-card) shadow-sm hover:shadow-2xl hover:shadow-(--grad-start)/10 hover:border-(--border-hover) transition-all duration-300 overflow-visible mt-6">
      
      {/* 1. NEW HEADER DESIGN: Floating Card Style */}
      <div className="relative h-40 w-full rounded-t-4xl overflow-hidden">
        {/* Background Image */}
        <img
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={ticket.photo}
          alt={ticket.title}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

        {/* Floating Transport Icon (Top Right) */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
          {getTransportIcon()}
        </div>
      </div>

      {/* Floating Title Card (Overlaps Image) */}
      <div className="relative px-6 -mt-12 z-10">
        <div className="p-4 rounded-2xl flex flex-col items-center justify-center bg-(--bg-card) border border-(--border-card) shadow-lg shadow-black/5">
           <h4 className="text-lg font-black text-(--text-main) line-clamp-1">
             {ticket.title}
           </h4>
           {/* Mini Status Row */}
           <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold text-(--text-muted) uppercase tracking-wider">Status:</span>
              {renderStatusBadge(ticket.status, "ticket")}
           </div>
        </div>
      </div>

      {/* 2. CARD BODY */}
      <div className="flex flex-col p-6 pt-4 space-y-6">
        
        {/* Route Visualization */}
        <div className="flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-xs font-bold text-(--text-muted) uppercase mb-1">From</span>
              <span className="text-base font-black text-(--text-main) truncate max-w-25">{ticket.from}</span>
           </div>

           {/* Animated Connector */}
           <div className="flex-1 flex flex-col items-center px-4">
              <div className="w-full h-0.5 bg-(--border-card) relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-(--bg-soft-accent) border border-(--border-card) flex items-center justify-center text-(--grad-start)">
                    <ArrowRight size={14} />
                 </div>
              </div>
              <span className="text-[10px] font-bold text-(--text-muted) mt-3">{ticket.transportType || "Direct"}</span>
           </div>

           <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-(--text-muted) uppercase mb-1">To</span>
              <span className="text-base font-black text-(--text-main) truncate max-w-25 text-right">{ticket.to}</span>
           </div>
        </div>

        {/* Info Grid (3 Columns) */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-dashed border-(--border-card)">
           {/* Date */}
           <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-(--bg-soft-accent)">
              <Calendar size={16} className="text-(--text-muted) mb-1" />
              <span className="text-xs font-bold text-(--text-main)">{formattedDate}</span>
           </div>
           {/* Time */}
           <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-(--bg-soft-accent)">
              <Clock size={16} className="text-(--text-muted) mb-1" />
              <span className="text-xs font-bold text-(--text-main)">{formattedTime}</span>
           </div>
           {/* Qty */}
           <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-(--bg-soft-accent)">
              <Ticket size={16} className="text-(--text-muted) mb-1" />
              <span className="text-xs font-bold text-(--text-main)">x{ticket.bookingQuantity}</span>
           </div>
        </div>

        {/* Price & Timer Row */}
        <div className="flex items-center justify-between">
           <div>
              <p className="text-[10px] font-bold uppercase text-(--text-muted) tracking-widest">Total</p>
              <p className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-(--grad-money-start) to-(--grad-money-end)">
                ${ticket.totalPrice}
              </p>
           </div>
           
           {/* Countdown */}
           {ticket.status !== "rejected" && (
             <div className="text-right">
                <TicketCountdown
                  departure={ticket.departure}
                  onCountdownComplete={handleDepartureComplete}
                />
             </div>
           )}
        </div>
      </div>

      {/* 3. FOOTER / BUTTON */}
      <div className="p-6 pt-0 mt-auto">
        {ticket.paymentStatus === "paid" ? (
          <div className="w-full py-4 rounded-2xl bg-(--success-bg) border border-(--success-text)/20 flex items-center justify-center gap-3">
             <div className="p-1 rounded-full bg-(--success-text) text-white">
                <ShieldCheck size={14} />
             </div>
             <div>
                <p className="text-xs font-black text-(--success-text) uppercase tracking-wider">Verified</p>
                <p className="text-[10px] font-bold text-(--success-text) opacity-80">Payment Complete</p>
             </div>
          </div>
        ) : isPurchasable ? (
          <button
            onClick={() => handlePayment(ticket._id)}
            className="group/btn relative w-full overflow-hidden rounded-2xl py-4 font-bold text-sm text-(--text-inv) shadow-lg shadow-(--grad-start)/30 transition-all duration-300 hover:shadow-(--grad-start)/50 hover:-translate-y-1 active:scale-95"
          >
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-(--grad-start) to-(--grad-end)"></div>
            <div className="relative flex items-center justify-center gap-2 cursor-pointer">
              <CreditCard size={18} />
              <span>Complete Payment</span>
            </div>
          </button>
        ) : (
          <button disabled className="w-full py-4 rounded-2xl font-bold text-sm bg-(--bg-soft-accent) text-(--text-muted) border border-(--border-card) cursor-not-allowed opacity-70 flex items-center justify-center gap-2">
            {ticket.status === "pending" ? (
              <>
                <div className="animate-spin"><Clock size={16} /></div>
                Waiting for Approval
              </>
            ) : isDeparted ? (
              <>
                <AlertCircle size={16} /> Departed
              </>
            ) : (
              "Not Available"
            )}
          </button>
        )}
      </div>

    </div>
  );
};

TicketCard.propTypes = {
  ticket: PropTypes.object.isRequired,
};

export default TicketCard;
