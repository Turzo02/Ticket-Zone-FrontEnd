import React from "react";
import { NavLink } from "react-router";


const NotFound = () => {

  return (
    <div>
      {/* Not Found Page Added */}
            <title>404</title>

      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden p-4 font-display">
        {/* Background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
          
        ></div>

        {/* Main Content */}
        <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
          <div className="glassmorphic-card w-full rounded-xl p-8 text-center shadow-lg md:p-12">
            <h1 className="text-7xl font-bold md:text-8xl">404</h1>

            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
                Lost in Ticket Zone?
              </p>
              <p className="max-w-xs text-sm font-normal leading-normal text-[#9CA3AF]">
                The page you are looking for doesn't exist or has been moved.
                Let's get you back on track.
              </p>
            </div>
            <NavLink to="/"
              className="mt-8 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
            >
              <span className="truncate">Go Back Home</span>
            </NavLink>
          </div>
        </div>
      </div> 


    </div>
  );
};

export default NotFound;
