import React from "react";
import stripeImg from "/stripe.png";
import logo from "/favicon.png";
import { Link } from "react-router";

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
              className="
          text-2xl font-bold
          flex items-center gap-2
          hover:text-primary
          transition-colors
        "
            >
              <img className="w-9" src={logo} alt="Ticket Zone Logo" />
              Ticket Zone
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

          {/* Column 4 - Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>

            <div
              className="
          bg-base-100
          rounded-lg
          p-4
          inline-flex
          items-center
          shadow-sm
        "
            >
              <img
                src={stripeImg}
                alt="Stripe Payment"
                className="w-32 object-contain"
              />
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
