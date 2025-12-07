import React from "react";
import stripeImg from "/stripe.png";
import logo from "/favicon.png";
import { Link } from "react-router";

const Footer = () => {
  //Footer Added
  return (
    <div>
      <footer className="glass mt-10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1 - Logo + Description */}
          <div>
            <Link to="/" className="text-2xl font-semibold flex items-center justify-start gap-2">   <span> <img className="w-9" src={logo} alt="" /></span>
            Ticket Zone</Link>
            <p className="mt-3">
              Book bus, train, launch & flight tickets easily.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="">
                  All Tickets
                </a>
              </li>
              <li>
                <a href="/" className="">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/" className="">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className=" text-lg font-semibold mb-3">
              Contact Info
            </h3>
            <ul className="space-y-2">
              <li>Email: support@ticketzone.com</li>
              <li>Phone: +880 1234-567890</li>
              <li>
                Facebook:{" "}
                <a href="#" className="">
                  TicketZone/BD
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Payment Methods
            </h3>
            <img
              src={stripeImg}
              alt="Stripe Payment"
              className="w-32"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 text-center text-sm">
          © 2025 TicketBari. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
