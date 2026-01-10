import React from "react";
import logo from "/favicon.png";
import { Link } from "react-router";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  Facebook,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  const footerLinkClass = `    text-(--text-muted)
                      hover:text-(--grad-start)
                      hover:translate-x-1
                      transition-all duration-200 block
                    `;
  return (
    <div className="w-full">
      {/* 
        Background: Uses --bg-stats for a distinct footer strip color 
        Text: Uses --text-muted for general text, --text-main for headings
      */}
      <footer className="bg-(--bg-stats) text-(--text-main) border-t border-(--stats-border) transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1 - Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                {/* Logo with slight hover rotation */}
                <img
                  className="relative w-10 h-10 object-contain transform group-hover:rotate-12 transition-transform duration-300"
                  src={logo}
                  alt="Ticket Zone Logo"
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
            </Link>

            <p className="text-sm text-(--text-muted) leading-relaxed">
              Book bus, train, ship & flight tickets easily with secure payments
              and real-time availability.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-(--text-main)">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link to="/about-us" className={footerLinkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className={footerLinkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className={footerLinkClass}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/guideline" className={footerLinkClass}>
                 Guidlines
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-(--text-main)">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm font-medium text-(--text-muted)">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-(--grad-start)" />
                <span>support@ticketzone.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-(--grad-start)" />
                <span>+880 1234-567890</span>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/SyeDTurz0"
                  className="flex items-center gap-2 hover:text-(--grad-start) transition-colors"
                >
                  <Facebook size={16} className="text-(--grad-start)" />
                  <span>TicketZone/BD</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Payment Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-(--text-main)">
              Payment Methods
            </h3>
            <div className="flex flex-col gap-3">
              {/* Stripe Badge - Themed */}
              <div className="flex items-center gap-2 group cursor-default">
                {/* Icon Box */}
                <div className="bg-(--bg-card) border border-(--border-card) p-1.5 rounded-md shadow-sm text-(--grad-start)">
                  <CreditCard size={20} strokeWidth={2} />
                </div>

                {/* Stripe Text - Uses Gradient to match theme */}
                <span className="font-bold italic text-lg tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
                  stripe
                </span>

                {/* Secure Badge */}
                <div className="flex items-center gap-1 ml-1 px-2 py-0.5 bg-(--bg-badge) text-(--text-muted) rounded-full border border-(--border-card) group-hover:border-(--grad-start) transition-colors">
                  <Lock size={10} strokeWidth={3} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">
                    Secure
                  </span>
                </div>
              </div>

              {/* Card Icons Row */}
              <div className="flex items-center gap-2">
                {["VISA", "MC", "AMEX"].map((card) => (
                  <div
                    key={card}
                    className="h-5 px-2 bg-(--bg-card) rounded-sm border border-(--border-card) flex items-center justify-center text-[8px] font-black text-(--text-muted) opacity-80"
                  >
                    {card}
                  </div>
                ))}
              </div>

              <p className="flex items-center gap-1.5 text-[10px] text-(--text-muted) opacity-80">
                <ShieldCheck size={12} className="text-(--success-text)" />
                <span>Guaranteed safe & secure checkout.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-(--stats-border) py-6 text-center text-xs font-semibold text-(--text-muted)">
          © 2025 TicketZone. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
