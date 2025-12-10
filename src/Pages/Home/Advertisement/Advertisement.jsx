import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";


const Advertisement = () => {
  const axiosSecure = useAxiosSecure();

    const {
    data ,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["AdvertisementTickets"],
    queryFn: async () => {
      let url = `/ticket?isAdvertised=true`

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
    return <p className="text-red-500 text-center mt-10">Failed to load tickets</p>;
  }


  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
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
   className="
        rounded-xl shadow-2xl 
        p-4 overflow-hidden
        transform hover:scale-[1.02]
        transition duration-300 ease-in-out
        
        bg-linear-to-br 
        from-yellow-100 
        via-[#fff4d1] 
        to-yellow-300
        border border-yellow-400
    "
            >
              {/* Top section */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1501706362039-c06b2d715385?w=700&h=500&auto=format"
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
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Price (Per Unit)
                  </p>
                  <span className="text-2xl font-bold bg-linear-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
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

      <div className="flex justify-between items-center text-sm font-medium text-gray-700 py-2 sm:py-3 rounded-lg">
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

                    <div className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-semibold">
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

                  <div className="flex flex-col">
                    <h3 className="text-xs font-semibold uppercase text-purple-600 mb-4">
                      ✨ Perks
                    </h3>
                    <ul className="flex flex-wrap gap-2 text-sm text-gray-600">
                      {ticket.perks.map((perk, i) => (
                        <li key={i} className="bg-gray-100 px-2 py-1 rounded-full">
                          {perk}
                        </li>
                      ))}
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
          );
        })}
      </div>
    </div>
  );
};

export default Advertisement
