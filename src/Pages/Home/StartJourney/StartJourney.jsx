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
      dark:bg-base-200
      dark:backdrop-blur-md
      border border-transparent dark:border-base-300
    "
  >
    {/* Content */}
    <div className="relative z-10 text-center px-6 sm:px-12 py-12">
      <h1 className="font-extrabold tracking-tight text-2xl sm:text-4xl lg:text-5xl text-white dark:text-base-content">
        Ready To Start Your Journey?
      </h1>

      <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/90 dark:text-base-content/70">
        Join thousands of travelers who use TravelBooker to find the best
        prices and routes for their next adventure. Start planning your next
        trip today.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link
          to="/register"
          className="
            btn
            w-[200px]
            bg-base-100
            text-primary
            hover:bg-base-200
            border-none
            font-semibold
          "
        >
          Create Account
        </Link>

        <button
          className="
            btn
            w-[200px]
            bg-primary/90
            hover:bg-primary
            border border-white/20
            text-white
            font-semibold
          "
        >
          Contact Support
        </button>
      </div>
    </div>

  </div>
</div>

  );
};

export default StartJourney;
