import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
import { MoveRight } from "lucide-react";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allTickets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/ticket");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <SwappingDotLoader></SwappingDotLoader>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load tickets</p>;
  }
  console.log(allTickets);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        All Available Tickets
      </h1>
      <div className="flex gap-6 text-3xl text-red-500 font-extrabold text-center mb-10">
        <h1>Filter tickets By Category</h1>
        <h1> Sort by price</h1>
        <h1>Search Functionality on from to </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTickets.map((ticket) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(ticket.price);

          return (
            <div
              key={ticket._id}
              className="
                bg-white rounded-xl shadow-xl overflow-hidden
                hover:scale-[1.03] transition duration-300 p-4
              "
            >
              {/* Header Image */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_009"
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <h2 className="absolute bottom-2 left-3 right-3 text-white text-xl font-extrabold drop-shadow-md">
                  {ticket.title}
                </h2>
              </div>

              {/* Body */}
              <div className="pt-4 space-y-3 ">
                {/* Route */}
                <div className="flex items-center text-sm font-semibold text-gray-700 space-x-2">
                  <div className="flex w-full justify-between items-center">
                    {/* From */}
                    <div className="flex items-center space-x-1">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="text-gray-600 font-bold text-xl">
                        {ticket.from}
                      </span>
                    </div>

                    {/* Arrow */}

                    <MoveRight />

                    {/* To */}
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-600 font-bold text-xl">
                        {ticket.to}
                      </span>
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                    </div>
                  </div>
                </div>

                {/* Transport */}
                <div className="flex items-center text-sm font-semibold text-gray-700">
                  {ticket.icon}

                  {ticket.transport}
                </div>

                {/* Price & Quantity */}
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-purple-700 font-bold">
                    {formattedPrice}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Available:</span>
                  <span className="text-purple-700 font-bold">
                    {ticket.quantity}
                  </span>
                </div>

                {/* Transport */}
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 py-2 sm:py-3  rounded-lg ">
                  {/* Left: Emoji + Transport Type */}
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

                  {/* Right: Departure Date */}
                  <div className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-semibold text-right whitespace-nowrap">
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
                  <h3 className="text-xs font-semibold uppercase text-purple-600 mb-4">
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
              <Link to={`/all-tickets/${ticket._id}`}>
                <button
                  className="
                  w-full mt-4 cursor-pointer py-3 text-lg font-bold text-white rounded-lg
                  bg-linear-to-r from-pink-600 to-red-700
                  hover:from-pink-700 hover:to-red-800
                  shadow-lg shadow-pink-500/40
                  transition duration-200
                "
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

export default AllTickets;
