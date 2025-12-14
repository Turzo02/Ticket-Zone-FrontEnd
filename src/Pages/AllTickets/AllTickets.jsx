import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
import { MoveRight, Filter, ArrowUpDown } from "lucide-react";

const AllTickets = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const limit = 6;
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [
      "All Tickets",
      page,
      filterType,
      sortOrder,
      fromLocation,
      toLocation,
    ],
    queryFn: async () => {
      let url = `/ticket?page=${page}&limit=${limit}&status=accepted`;
      if (filterType) url += `&transport=${filterType}`;
      if (sortOrder) url += `&sort=${sortOrder}`;
      if (fromLocation) url += `&from=${fromLocation}`;
      if (toLocation) url += `&to=${toLocation}`;

      const { data } = await axiosSecure.get(url);
      return data;
    },
    keepPreviousData: true,
  });

  const allTickets = data?.tickets || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleFromChange = (e) => {
    setFromLocation(e.target.value);
    setPage(1);
  };

  const handleToChange = (e) => {
    setToLocation(e.target.value);
    setPage(1);
  };

  if (isLoading && !isFetching) {
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
    // DaisyUI-styled All Tickets Page
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-base-content">
        <h1 className="text-4xl font-extrabold text-center md:text-left">
          All Available Tickets {allTickets.length}
        </h1>

        {/* Controls Container */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Transport Filter */}
          <div className="relative group">
            <div className="flex items-center space-x-2 bg-base-100 border-2 border-base-300 rounded-lg px-4 py-2 shadow-md hover:border-primary transition-colors">
              <Filter className="w-5 h-5 text-primary" />
              <select
                value={filterType}
                onChange={handleFilterChange}
                // Use DaisyUI select component for full theme support
                className="select select-ghost bg-transparent outline-none text-base-content font-semibold cursor-pointer w-36 appearance-none h-auto min-h-0 p-0"
              >
                {/* Options inherit color, but forcing background color ensures options list works */}
                <option value="" className="bg-base-100 text-base-content">
                  All Transports
                </option>
                <option value="Bus" className="bg-base-100 text-base-content">
                  Bus
                </option>
                <option value="Train" className="bg-base-100 text-base-content">
                  Train
                </option>
                <option
                  value="Flight"
                  className="bg-base-100 text-base-content"
                >
                  Flight
                </option>
                <option value="Ship" className="bg-base-100 text-base-content">
                  Ship
                </option>
              </select>
            </div>
          </div>

          {/* Price Sort Dropdown (New) */}
          <div className="relative group">
            <div className="flex items-center space-x-2 bg-base-100 border-2 border-base-300 rounded-lg px-4 py-2 shadow-md hover:border-primary transition-colors">
              <ArrowUpDown className="w-5 h-5 text-primary" />
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="select select-ghost bg-transparent outline-none text-base-content font-semibold cursor-pointer w-36 appearance-none h-auto min-h-0 p-0"
              >

                <option value="" className="bg-base-100 text-base-content">
                  Default Sort
                </option>
                <option value="asc" className="bg-base-100 text-base-content">
                  Price: Low to High
                </option>
                <option value="desc" className="bg-base-100 text-base-content">
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>

          {/* search by location */}
          <div className="flex gap-2">
            {/* From Location Input */}
            <div className="relative group">
              <input
                type="text"
                placeholder="From (City/Station)"
                value={fromLocation}
                onChange={handleFromChange}
                // Using input-bordered for styling and focus:input-primary
                className="input input-bordered bg-base-100 focus:input-primary shadow-md outline-none text-base-content w-full sm:w-40 h-auto min-h-0 py-2 px-4"
              />
            </div>

            {/* To Location Input */}
            <div className="relative group">
              <input
                type="text"
                placeholder="To (City/Station)"
                value={toLocation}
                onChange={handleToChange}
                className="input input-bordered bg-base-100 focus:input-primary shadow-md outline-none text-base-content w-full sm:w-40 h-auto min-h-0 py-2 px-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Grid */}
      {allTickets.length === 0 ? (
        <div className="text-center py-20 bg-base-100  border border-dashed border-base-300">
          <h3 className="text-2xl font-bold text-base-content/50">
            No tickets found
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTickets.map((ticket, index) => {
            const formattedPrice = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(ticket.price);

            return (
              <div
                key={index}
                className={`
                bg-base-200 
                shadow-xl 
                overflow-hidden 
                hover:scale-[1.02] 
                transition 
                duration-300 
                p-4 
                rounded-lg
              `}
              >
                {/* Header */}
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_006"
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                  <h2 className="absolute bottom-2 left-3 right-3 text-white  text-2xl font-extrabold drop-shadow-xl">
                    {ticket.title}
                  </h2>
                </div>

                {/* Body */}
                <div className="pt-4 space-y-4">
                  {/* From -> To */}
                  <div className="flex items-center text-sm font-semibold space-x-2">
                    <div className="flex w-full justify-between items-center">
                      <div className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-success"></span>
                        <span className="text-base-content/80 font-bold text-xl">
                          {ticket.from}
                        </span>
                      </div>

                      <MoveRight className="text-primary" />

                      <div className="flex items-center space-x-1">
                        <span className="text-base-content/80 font-bold text-xl">
                          {ticket.to}
                        </span>
                        <span className="w-3 h-3 rounded-full bg-error"></span>
                      </div>
                    </div>
                  </div>
                  {/* Price */}
                  <div className="flex justify-between border-b border-base-300 pb-2">
                    <p className="text-xs font-semibold text-base-content/60 uppercase">
                      Price (Per Unit)
                    </p>
                    <span className="text-3xl font-bold text-info">
                      {formattedPrice}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-between text-sm font-medium text-base-content">
                    <span className="text-base-content/80">Available:</span>
                    <span className="text-info font-bold">
                      {ticket.quantity}
                    </span>
                  </div>

                  {/* Transport */}
                  <div className="flex justify-between items-center text-sm font-medium text-base-content py-2 rounded-lg ">
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

                    <div className="px-2 py-1 bg-primary/10  rounded-lg font-semibold text-right whitespace-nowrap">
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
                    <h3 className="text-xs font-semibold uppercase text-info mb-1">
                      ✨ Perks
                    </h3>
                    <ul className="flex flex-wrap gap-2 text-sm text-base-content overflow-x-auto whitespace-nowrap">
                      {ticket.perks.map((perk, i) => (
                        <li
                          key={i}
                          className="bg-base-300 px-2 py-1 rounded-lg shrink-0"
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
                    className={`
  w-full mt-4 py-3 text-lg font-bold btn rounded lg shadow-lg
  cursor-pointer text-white
  bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-none
  shadow-blue-500/40
`}
                  >
                    See Details
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION BAR */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="btn btn-sm btn-ghost bg-base-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${
                page === i + 1 ? "btn-primary" : "btn-success"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="btn btn-sm btn-ghost bg-base-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
