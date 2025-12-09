import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
import { MoveRight } from "lucide-react";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 7;

  // Fetch paginated tickets
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestTickets", page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/ticket?page=${page}&limit=${limit}`
      );
      return data; 
    },
    keepPreviousData: true, 
  });

  const allTickets = data?.tickets || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <SwappingDotLoader />
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load tickets</p>;
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        All Available Tickets
      </h1>

      {/* Ticket Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTickets.map((ticket) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(ticket.price);

          return (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-xl overflow-hidden hover:scale-[1.03] transition duration-300 p-4"
            >
              {/* Header */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_009"
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <h2 className="absolute bottom-2 left-3 right-3 text-white text-xl font-extrabold">
                  {ticket.title}
                </h2>
              </div>

              {/* Body */}
              <div className="pt-4 space-y-3 ">
                <div className="flex items-center text-sm font-semibold text-gray-700 space-x-2">
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="text-gray-600 font-bold text-xl">
                        {ticket.from}
                      </span>
                    </div>

                    <MoveRight />

                    <div className="flex items-center space-x-1">
                      <span className="text-gray-600 font-bold text-xl">
                        {ticket.to}
                      </span>
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm font-semibold text-gray-700">
                  {ticket.icon}
                  {ticket.transport}
                </div>

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

              <Link to={`/all-tickets/${ticket._id}`}>
                <button
                  className="w-full mt-4 py-3 text-lg font-bold text-white rounded-lg bg-linear-to-r from-pink-600 to-red-700 hover:from-pink-700 hover:to-red-800 shadow-lg shadow-pink-500/40"
                >
                  See Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* PAGINATION BAR */}
      <div className="flex justify-center mt-10 gap-3">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              page === i + 1
                ? "bg-purple-600"
                : "bg-green-500 "
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllTickets;
