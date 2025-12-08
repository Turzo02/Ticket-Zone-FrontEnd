import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";

const LatestTickets = () => {
  const [tickets, setTickets] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/ticket")
      .then((res) => {
        // sort by departure date descending (latest first)
        const sortedTickets = res.data.sort(
          (a, b) => new Date(b.departure) - new Date(a.departure)
        );
        const latestTickets = sortedTickets.slice(0, 8);
        setTickets(latestTickets);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, [axiosSecure]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Latest Tickets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {tickets.map((ticket, index) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(ticket.price);

          return (
            <div
              key={index}
              className="
              
                bg-white
                rounded-xl
                shadow-xl
                overflow-hidden
                hover:scale-[1.03]
                transition
                duration-300
                p-4
              "
            >
              {/* Header */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_006"
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <h2 className="absolute bottom-2 left-3 right-3 text-white text-2xl font-extrabold drop-shadow-xl">
                  {ticket.title}
                </h2>
              </div>

              {/* Body */}
              <div className="pt-4 space-y-4">
                {/* Price */}
                <div className="flex justify-between border-b pb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Price (Per Unit)
                  </p>
                  <span className="text-3xl font-bold bg-linear-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                    {formattedPrice}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Available:</span>
                  <span className="text-purple-700 font-bold">
                    {ticket.quantity}
                  </span>
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
                  {ticket.transportType}
                </div>

                {/* Perks */}
                <div className="flex flex-col">
                  <h3 className="text-xs font-semibold uppercase text-purple-600 mb-1">
                    ✨ Perks
                  </h3>
                  <ul className="flex flex-wrap gap-2 text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
                    {ticket.perks.map((perk, i) => (
                      <li
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded-full shrink-0"
                      >
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button */}
              <button
                className="
                  w-full mt-5 py-3 text-lg font-bold text-white rounded-lg
                  bg-linear-to-r from-pink-600 to-red-700
                  hover:from-pink-700 hover:to-red-800
                  shadow-lg shadow-pink-500/40
                  transition
                "
              >
                See Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestTickets;
