import React from "react";
import { Link } from "react-router";
import {
  Search,
  MousePointerClick,
  UserCheck,
  CreditCard,
  Ticket,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const Guideline = () => {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: "Find Your Route",
      desc: "Enter your departure city, destination, and travel date on the home page or 'All Tickets' section.",
    },
    {
      id: 2,
      icon: MousePointerClick,
      title: "Select Your Ticket",
      desc: "Browse available options. Use filters to sort by Bus, Train, Flight, or Price to find the perfect match.",
    },
    {
      id: 3,
      icon: UserCheck,
      title: "Confirm Details",
      desc: "Click 'See Details' to view perks and seat availability. Select the number of seats you need.",
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Secure Payment",
      desc: "Proceed to booking. Enter your payment details securely via Stripe or our other verified gateways.",
    },
    {
      id: 5,
      icon: Ticket,
      title: "Get Your Ticket",
      desc: "Instant confirmation! Your digital ticket will be emailed to you and available in your Dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-(--bg-soft-accent) text-(--text-main) transition-colors duration-300 py-16 relative">

              {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
           <div className="absolute top-20 left-10 w-72 h-72 bg-(--grad-start) rounded-full opacity-10 blur-[100px]" />
           <div className="absolute top-40 right-10 w-96 h-96 bg-(--grad-end) rounded-full opacity-10 blur-[100px]" />
        </div>
      {/* --- Header --- */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-(--bg-card) border border-(--border-card) shadow-sm">
          <Lightbulb size={24} className="text-(--grad-start)" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          How to Use {" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            TicketZone
          </span>
        </h1>
        <p className="text-lg text-(--text-muted) max-w-2xl mx-auto">
          Booking your next adventure is simple. Follow these 5 easy steps to
          secure your seat in minutes.
        </p>
      </div>

      {/* --- Steps Grid --- */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-linear-to-r from-(--grad-start) to-(--grad-end) opacity-20 -z-10 rounded-full"></div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="
                group relative flex flex-col items-center text-center 
                p-8 rounded-3xl 
                bg-(--bg-card) border border-(--border-card)
                hover:border-(--grad-start)/50
                shadow-lg shadow-black/5 hover:shadow-(--grad-start)/10
                transition-all duration-300 hover:-translate-y-2
              "
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-(--grad-start) text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-(--bg-page)">
                {step.id}
              </div>

              {/* Icon */}
              <div className="mb-6 p-4 rounded-2xl bg-(--bg-soft-accent) text-(--grad-start) group-hover:scale-110 transition-transform duration-300">
                <step.icon size={32} strokeWidth={1.5} />
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-(--text-main) mb-3">
                {step.title}
              </h3>
              <p className="text-sm font-medium text-(--text-muted) leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}

          {/* Final Call to Action Card */}
          <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-linear-to-br from-(--grad-start) to-(--grad-end) text-white text-center shadow-xl transform md:scale-[1.02]">
            <h3 className="text-2xl font-black mb-2">Ready to go?</h3>
            <p className="text-white/90 mb-6 font-medium text-sm">
              Your next destination awaits.
            </p>
            <Link to="/all-tickets">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-(--grad-start) font-bold hover:bg-opacity-90 transition-all shadow-lg active:scale-95 cursor-pointer">
                Start Booking <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* --- Help Section --- */}
      <div className="max-w-3xl mx-auto px-6 mt-20">
        <div className="p-8 rounded-3xl bg-(--bg-soft-accent) border border-(--border-card) flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="shrink-0 p-3 bg-(--bg-card) rounded-full shadow-sm text-(--grad-end)">
            <UserCheck size={28} />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-(--text-main) mb-1">
              Need help booking?
            </h4>
            <p className="text-sm text-(--text-muted)">
              Our support team is available 24/7 to assist you with any issues
              during the process.
            </p>
          </div>
          <div>
            <a href="mailto:turzoyt198650@gmail.com">
              <button className="px-5 py-2.5 rounded-xl font-bold border border-(--border-card) bg-(--bg-card) text-(--text-main) hover:border-(--grad-start) transition-colors text-sm cursor-pointer">
                Contact Support
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guideline;
