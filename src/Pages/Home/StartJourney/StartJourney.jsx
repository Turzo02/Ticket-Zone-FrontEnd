import React from "react";
import { Link } from "react-router";
const StartJourney = () => {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="bg-[#2563eb] text-white">
        <div className="text-center pt-8
        ">
          <h1 className="font-bold text-2xl sm:text-4xl lg:text-5xl">Ready To Start Your Journey?</h1>
          <p className="font-sm pt-4">
            Join thousands of travelers who use TravelBooker to find the best
            prices and routes for their next adventure. Start planning your next
            trip today.
          </p>
        </div>
        <div className="flex justify-center items-center py-8 gap-6">
          <Link to="/register" className="  border-none btn btn-active bg-base-100 text-[#2563eb] w-[200px] ">Create Account</Link>
          <button className= "  w-[200px] border-none btn btn-active bg-[#1d4ed8]">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default StartJourney;
