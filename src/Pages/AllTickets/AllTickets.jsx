import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
    // keepPreviousData: true,
    placeholderData: keepPreviousData,
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
      <div className="flex justify-center items-center h-screen">
        <SwappingDotLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center mt-10 font-bold">
        Failed to load tickets
      </p>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header Section - Always Visible */}
      <div className="text-center py-8 mb-12 md:py-16 px-4 space-y-4 bg-base-200 rounded-xl shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
          All Tickets
        </h1>
        <p className="text-lg md:text-xl text-base-content/80 max-w-3xl mx-auto">
          Easily manage and view all your travel bookings and reservations in
          one place.
        </p>
      </div>

      {/* Controls Container - Always Visible */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 text-base-content">
        <div className="flex flex-col lg:flex-row gap-4 w-full p-2">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Transport Filter */}
            <div className="relative group w-full sm:w-auto">
              <div className="flex items-center space-x-2 bg-base-200 border-2 border-base-200 rounded-lg px-3 py-1 shadow-sm hover:border-primary focus-within:border-primary transition-all w-full">
                <Filter className="w-5 h-5 text-primary shrink-0" />
                <select
                  value={filterType}
                  onChange={handleFilterChange}
                  className="select select-ghost select-sm bg-transparent outline-none text-base-content font-semibold cursor-pointer w-full sm:w-36 px-2"
                >
                  <option value="">All Transports</option>
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Flight">Flight</option>
                  <option value="Ship">Ship</option>
                </select>
              </div>
            </div>

            {/* Price Sort */}
            <div className="relative group w-full sm:w-auto">
              <div className="flex items-center space-x-2 bg-base-200 border-2 border-base-200 rounded-lg px-3 py-1 shadow-sm hover:border-primary focus-within:border-primary transition-all w-full">
                <ArrowUpDown className="w-5 h-5 text-primary shrink-0" />
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="select select-ghost select-sm bg-transparent outline-none text-base-content font-semibold cursor-pointer w-full sm:w-40 px-2"
                >
                  <option value="">Default Sort</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto grow">
            <input
              type="text"
              placeholder="From (City/Station)"
              value={fromLocation}
              onChange={handleFromChange}
              className="input input-bordered border-2 border-base-200 bg-base-200 focus:input-primary shadow-sm w-full transition-all"
            />
            <input
              type="text"
              placeholder="To (City/Station)"
              value={toLocation}
              onChange={handleToChange}
              className="input input-bordered border-2 border-base-200 bg-base-200 focus:input-primary shadow-sm w-full transition-all"
            />
          </div>
        </div>
      </div>

      {/* Ticket Grid Section - RELATIVE CONTAINER FOR LOADING OVERLAY */}
      <div className="relative min-h-[400px]">
        {/* Loader Overlay: Only shows when data is fetching (sorting, searching, etc.) */}
        {isFetching && (
          <div className="absolute inset-0 z-10 flex justify-center items-start pt-32 bg-base-200/40 backdrop-blur-[2px] rounded-xl transition-all">
            <div className="sticky top-1/2">
              <SwappingDotLoader />
            </div>
          </div>
        )}

        {allTickets.length === 0 && !isFetching ? (
          <div className="text-center py-20 bg-base-200 border border-dashed border-base-200 rounded-xl">
            <h3 className="text-2xl font-bold text-base-content/50">
              No tickets found
            </h3>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300 ${
              isFetching ? "opacity-30 pointer-events-none" : "opacity-100"
            }`}
          >
            {allTickets.map((ticket, index) => {
              const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(ticket.price);

              return (
                <div
                  key={index}
                  className="bg-base-200 shadow-xl overflow-hidden hover:scale-[1.02] transition duration-300 p-4 rounded-lg"
                >
                  {/* Header */}
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <img
                      src={ticket.photo}
                      alt={ticket.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                    <h2 className="absolute bottom-2 left-3 right-3 text-white text-2xl font-extrabold drop-shadow-xl truncate">
                      {ticket.title}
                    </h2>
                  </div>

                  {/* Body */}
                  <div className="pt-4 space-y-4">
                    {/* From to location */}
                    <div className="flex justify-between items-center gap-2">
                      <h1 className="truncate max-w-[200px]">
                        From: {ticket.from}
                      </h1>
                      <MoveRight className="shrink-0" />
                      <h1 className="truncate max-w-[200px]">
                        To: {ticket.to}
                      </h1>
                    </div>

                    <div className="flex justify-between items-center border-b border-base-200 pb-2">
                      <p className="text-xs font-semibold text-base-content/60 uppercase">
                        Price (Per Unit)
                      </p>
                      <span className="text-3xl font-bold text-info">
                        {formattedPrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Available:</span>
                      <span className="text-info font-bold">
                        {ticket.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium py-2">
                      <div className="flex items-center space-x-2">
                        <span>
                          {ticket.transportType === "Train"
                            ? "🚆"
                            : ticket.transportType === "Bus"
                            ? "🚌"
                            : "✈️"}
                        </span>
                        <span>{ticket.transportType}</span>
                      </div>
                    </div>
                  </div>

                  <Link to={`/all-tickets/${ticket._id}`}>
                    <button className="w-full mt-4 py-3 text-lg font-bold btn rounded-lg shadow-lg text-white bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-none">
                      See Details
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PAGINATION BAR - Outside the relative container to keep it clickable */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="btn btn-sm btn-ghost bg-base-200 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${page === i + 1 ? "btn-primary" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="btn btn-sm btn-ghost bg-base-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
