import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { Link } from "react-router";

const Advertisement = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["AdvertisementTickets"],
    queryFn: async () => {
      let url = `/ticket?isAdvertised=true`;

      const { data } = await axiosSecure.get(url);
      return data;
    },
    keepPreviousData: true,
  });

  const allTickets = data?.tickets || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <SwappingDotLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-10">Failed to load tickets</p>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      <h1
        className="
  text-3xl sm:text-4xl lg:text-5xl 
  font-extrabold text-center mb-12 
  bg-clip-text text-transparent 
  bg-linear-to-r from-amber-400 to-orange-500 
  tracking-tight
"
      >
        Advertisement Tickets
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {allTickets.map((ticket) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(ticket.price);

          return (
            <div
              key={ticket._id}
              className={`
                rounded-lg
                shadow-xl 
                p-4 
                overflow-hidden
                transform hover:scale-[1.02]
                transition duration-300 ease-in-out                
                bg-base-200
                border border-base-300
              `}
            >
              {/* Top section */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src={ticket.photo}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

                <h2 className="absolute bottom-0 w-full p-3 text-xl font-bold text-white drop-shadow-md">
                  {ticket.title}
                </h2>
              </div>

              {/* Body */}
              <div className="pt-4 space-y-4">
                {/* Price */}
                <div className="flex justify-between items-center pb-2 border-b border-base-300">
                  <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                    Price (Per Unit)
                  </p>
                  <span className="text-2xl font-bold text-warning">
                    {formattedPrice}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-base-content/80">Available:</span>
                  <span className="text-warning font-bold">
                    {ticket.quantity}
                  </span>
                </div>

                {/* Transport */}
                <div className="flex justify-between items-center text-sm font-medium text-base-content py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">
                      {ticket.transportType === "Train" && "🚆"}
                      {ticket.transportType === "Bus" && "🚌"}
                      {ticket.transportType === "Flight" && "✈️"}
                      {ticket.transportType === "Ship" && "🚢"}
                      {!["Train", "Bus", "Flight", "Ship"].includes(
                        ticket.transportType
                      ) && "🛺"}
                    </span>
                    <span>{ticket.transportType}</span>
                  </div>

                  <div className="px-2 py-1 bg-warning/20 text-warning rounded-lg font-semibold">
                    📅{" "}
                    {new Date(ticket.departure).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* Perks */}
                <div className="flex flex-col">
                  <h3 className="text-xs font-semibold uppercase text-warning mb-4">
                    ✨ Perks
                  </h3>
                  <ul className="flex flex-wrap gap-2 text-sm text-base-content">
                    {ticket.perks.map((perk, i) => (
                      <li key={i} className="bg-base-300 px-2 py-1 rounded-lg">
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button */}
              <Link to={`/all-tickets/${ticket._id}`}>
                <button
                  className={`
  mt-5 w-full py-3 text-lg font-bold
  btn border-none
  bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white
  shadow-lg shadow-yellow-400/20
  transition duration-200
`}
                >
                  See Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Advertisement;
