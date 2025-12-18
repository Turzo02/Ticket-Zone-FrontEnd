import React from "react";
import logo from "/favicon.png";
import { Link } from "react-router";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

const Footer = () => {
  //Footer Added
  return (
    <div>
      <footer className="mt-16 bg-base-200 text-base-content">
        <div
          className="
      max-w-7xl mx-auto
      px-6 py-12
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
      gap-10
    "
        >
          {/* Column 1 - Logo + Description */}
          <div className="space-y-3">
            <Link
              to="/"
              className="flex items-center gap-3 group transition-all duration-300 ease-in-out hover:opacity-80"
            >
              <div className="relative">
                <img
                  className="relative w-10 h-10 object-contain transform group-hover:scale-105 transition-transform duration-300"
                  src={logo}
                  alt="Ticket Zone Logo"
                />
              </div>

              {/* Text Logo with Dual Weights */}
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none flex items-center gap-1">
                  <span className="text-base-content">TICKET</span>
                  <span className="text-info italic   scale-110">ZONE</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Book bus, train, ship & flight tickets easily with secure payments
              and real-time availability.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              {["Home", "All Tickets", "Contact Us", "About"].map((item) => (
                <li key={item}>
                  <a
                    href="/"
                    className="
                text-base-content/70
                hover:text-primary
                transition-colors
              "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>

            <ul className="space-y-2 text-sm text-base-content/70">
              <li>Email: support@ticketzone.com</li>
              <li>Phone: +880 1234-567890</li>
              <li>
                Facebook:{" "}
                <a
                  href="#"
                  className="
              hover:text-primary
              transition-colors
            "
                >
                  TicketZone/BD
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Payment Methods ) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content/90">
              Payment Methods
            </h3>

            <div className="flex flex-col gap-3">
              {/* Minimal Stripe Badge */}
              <div className="flex items-center gap-2 group cursor-default">
                <div className="bg-[#635BFF] text-white p-1 rounded-md shadow-sm">
                  <CreditCard size={16} strokeWidth={2.5} />
                </div>
                <span className="font-bold italic text-lg tracking-tighter text-[#635BFF]">
                  stripe
                </span>
                <div className="flex items-center gap-1 ml-1 px-2 py-0.5 bg-base-content/5 text-base-content/60 rounded-full border border-base-content/10 group-hover:border-base-content/20 transition-colors">
                  <Lock size={10} strokeWidth={3} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    Secure
                  </span>
                </div>
              </div>

              {/* Simple Card Icons Row */}
              <div className="flex items-center gap-2 px-">
                <div className="h-4 w-7 bg-base-content/10 rounded-sm border border-base-content/5 flex items-center justify-center text-[7px] font-black opacity-60">
                  VISA
                </div>
                <div className="h-4 w-7 bg-base-content/10 rounded-sm border border-base-content/5 flex items-center justify-center text-[7px] font-black opacity-60">
                  MC
                </div>
                <div className="h-4 w-7 bg-base-content/10 rounded-sm border border-base-content/5 flex items-center justify-center text-[7px] font-black opacity-60">
                  AMEX
                </div>
              </div>

              <p className="text-[10px] text-base-content/40 max-w-[200px] leading-tight">
                Guaranteed safe & secure checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
      border-t border-base-300
      py-4
      text-center
      text-xs
      text-base-content/60
    "
        >
          © 2025 TicketZone. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
