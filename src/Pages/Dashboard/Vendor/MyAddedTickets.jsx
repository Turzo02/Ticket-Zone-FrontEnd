import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { ArrowUpDown, Filter, MoveRight } from "lucide-react";
import { Link } from "react-router";

const MyAddedTickets = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const limit = 7;

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["MyAddedTickets", page, filterType, sortOrder],
    queryFn: async () => {
      let url = `/ticket?page=${page}&limit=${limit}`;
      if (filterType) url += `&transport=${filterType}`;
      if (sortOrder) url += `&sort=${sortOrder}`;

      const { data } = await axiosSecure.get(url);
      return data;
    },
    keepPreviousData: true,
  });

  const allTickets = data?.tickets || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/ticket/${id}`);
    refetch();
  };

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
    <div className="p-4 sm:p-8 max-w-7xl mx-auto bg-base-100 text-base-content">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-extrabold text-center md:text-left text-primary">
          My Added Tickets
        </h1>

        {/* Controls Container */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Transport Filter */}
          <div className="form-control relative">
            <div className="flex items-center space-x-2 bg-base-200 border border-base-300 rounded-lg px-4 py-2 shadow-sm hover:border-primary transition-colors">
              <Filter className="w-5 h-5 text-primary" />
              <select
                value={filterType}
                onChange={handleFilterChange}
                // Use DaisyUI select class structure
                className="select select-ghost bg-transparent outline-none text-base-content font-semibold cursor-pointer w-36 p-0 h-auto min-h-0"
              >
                <option value="">All Transports</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Ship">Ship</option>
              </select>
            </div>
          </div>

          {/* Price Sort Dropdown */}
          <div className="form-control relative">
            <div className="flex items-center space-x-2 bg-base-200 border border-base-300 rounded-lg px-4 py-2 shadow-sm hover:border-primary transition-colors">
              <ArrowUpDown className="w-5 h-5 text-primary" />
              <select
                value={sortOrder}
                onChange={handleSortChange}
                // Use DaisyUI select class structure
                className="select select-ghost bg-transparent outline-none text-base-content font-semibold cursor-pointer w-36 p-0 h-auto min-h-0"
              >
                <option value="">Default Sort</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Grid */}
      {allTickets.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg border border-dashed border-base-300">
          <h3 className="text-2xl font-bold text-base-content/50">
            No tickets found
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTickets.map((ticket) => {
            const formattedPrice = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(ticket.price);

            return (
              <div
                key={ticket._id}
                className="bg-base-200 rounded-lg shadow-xl overflow-hidden hover:scale-[1.03] transition duration-300 p-4"
              >
                {/* Header */}
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_009"
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Using gradient utility for overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                  <h2 className="absolute bottom-2 left-3 right-3 text-white text-xl font-extrabold">
                    {ticket.title}
                  </h2>
                </div>

                {/* Body */}
                <div className="pt-4 space-y-3 ">
                  <div className="flex items-center text-sm font-semibold space-x-2">
                    <div className="flex w-full justify-between items-center">
                      <div className="flex items-center space-x-1">
                        {/* Start Point */}
                        <span className="w-3 h-3 rounded-full bg-success"></span>
                        <span className="text-base-content font-bold text-xl">
                          {ticket.from}
                        </span>
                      </div>

                      <MoveRight className="text-base-content/80" />

                      <div className="flex items-center space-x-1">
                        {/* Destination Point */}
                        <span className="text-base-content font-bold text-xl">
                          {ticket.to}
                        </span>
                        <span className="w-3 h-3 rounded-full bg-error"></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm font-semibold text-base-content/80">
                    {/* Assuming ticket.icon is an SVG component */}
                    {ticket.icon}
                    {ticket.transport}
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-base-content/80">Price:</span>
                    <span className="text-accent font-bold">
                      {formattedPrice}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-base-content/80">Available:</span>
                    <span className="text-info font-bold">
                      {ticket.quantity}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-xs font-semibold uppercase text-base-content mb-4">
                      Status :{" "}
                      {ticket.status === "pending" ? (
                        <span className="text-warning badge badge-outline badge-warning ml-2">
                          Pending
                        </span>
                      ) : ticket.status === "accepted" ? (
                        <span className="text-success badge badge-outline badge-success ml-2">
                          Approved
                        </span>
                      ) : (
                        <span className="text-error badge badge-outline badge-error ml-2">
                          Rejected
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                {/* Action Buttons */}
                {ticket.status === "rejected" ? (
                  <button
                    className="
    btn btn-block btn-lg text-white border-none transition
    bg-linear-to-r from-red-700 via-red-600 to-rose-600
    shadow-lg shadow-red-700/50
    flex items-center gap-2
    
    cursor-not opacity-50!
  "
                    disabled
                  >
                    Rejected
                  </button>
                ) : (
                  <Link
                    to={`/dashboard/update-ticket-details/${ticket._id}`}
                    className="
                btn btn-block btn-lg text-white border-none transition
                    bg-linear-to-r from-emerald-400 via-green-500 to-green-700
                    hover:from-emerald-500 hover:to-green-800
                    shadow-lg shadow-green-600/40
                    flex items-center gap-2
    "
                  >
                    Update
                  </Link>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(ticket._id)}
                  disabled={ticket.status === "rejected"}
                  className={`
    w-full mt-4 text-lg font-bold block transition duration-300 border-none
    ${
      ticket.status === "rejected"
        ? "btn btn-disabled bg-base-300 text-base-content/70 shadow-none cursor-not-allowed"
        : "btn btn-block btn-lg text-white border-none transition  bg-linear-to-r from-red-700 via-red-600 to-rose-600 hover:from-red-800 hover:to-rose-700 shadow-lg shadow-red-700/50 flex items-center gap-2"
    }
  `}
                >
                  Delete
                </button>
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
            className="btn btn-ghost disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn ${
                page === i + 1 ? "btn-primary" : "btn-info" // Using primary for active, info for inactive page
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="btn btn-ghost disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
