import React from "react";

const MyAddedTickets = () => {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="bg-b3">
      <h1 className="text-3xl text-center font-semibold"> My added tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {arr.map((item) => {
          return (
            <div>
              <div
                className="
    bg-b1 rounded-xl shadow-xl 
    p-4 overflow-hidden
    transform hover:scale-[1.02]
    transition duration-300 ease-in-out
  "
              >
                {/* Top section */}
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img
                    src="https://picsum.photos/600/400"
                    alt="Sample Ticket"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

                  <h2 className="absolute bottom-0 w-full p-3 text-xl font-bold text-white drop-shadow-md">
                    Sample Event Ticket
                  </h2>
                </div>

                {/* Body */}
                <div className="pt-4 space-y-4">
                  {/* Price */}
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Price (Per Unit)
                    </p>
                    <span className="text-2xl font-bold bg-linear-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
                      ৳1500
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-600">Available:</span>
                    <span className="text-purple-700 font-bold">42</span>
                  </div>

                  {/* Transport */}
                  <div className="flex items-center text-sm font-semibold text-gray-700">
                    <svg
                      className="w-5 h-5 mr-2 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                    AC Bus
                  </div>

                  {/* Perks */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase text-purple-600 mb-1">
                      ✨ Perks
                    </h3>
                    <ul className="text-sm space-y-1 list-disc pl-5 text-gray-600">
                      <li>Free Water Bottle</li>
                      <li>Premium Seat</li>
                      <li>Priority Boarding</li>
                    </ul>
                  </div>
                </div>

                {/* Button */}
                <button
                  className="
      mt-5 w-full py-3 text-lg font-bold uppercase
      rounded-lg 
      bg-linear-to-r from-pink-600 to-red-700
      text-white shadow-lg shadow-pink-500/40
      transition duration-200
      hover:from-pink-700 hover:to-red-800
      focus:outline-none focus:ring-4 focus:ring-pink-300
    "
                >
                  See Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAddedTickets;
