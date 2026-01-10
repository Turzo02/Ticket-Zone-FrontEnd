import React from "react";
import { Link } from "react-router";
const StartJourney = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <div
        className="
      relative overflow-hidden
      rounded-2xl
      bg-primary
      border border-transparent
    "
      >
        {/* Content */}
        <div className="relative z-10 text-center px-6 sm:px-12 py-12">
          <h1 className="font-extrabold tracking-tight text-2xl sm:text-4xl lg:text-5xl text-white">
            Ready To Start Your Journey?
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/90">
            Join thousands of travelers who use TravelBooker to find the best
            prices and routes for their next adventure. Start planning your next
            trip today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/all-tickets"
              className="
            btn
            w-[200px]
            bg-base-200
            text-primary
            hover:bg-base-200
            border-none
            font-semibold
          "
            >
              Create Account
            </Link>

            <Link to="/">
              <button
                className="
  btn
  w-[200px]
  bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700
  border-none
  text-white
  font-semibold
"
              >
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartJourney;
