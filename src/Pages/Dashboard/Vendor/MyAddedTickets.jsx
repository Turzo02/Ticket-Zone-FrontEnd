import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { ArrowUpDown, Filter, MoveRight, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const MyAddedTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  ///ticket/vendor/:vendorEmail

  const {
    data: tickets = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["MyAddedTickets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/ticket/vendor/${user.email}`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this ticket. Once deleted, it cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/ticket/${id}`);
        refetch();

        Swal.fire({
          title: "Deleted!",
          text: "Your ticket has been successfully deleted, along with all associated bookings.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Failed!",
          text: "An error occurred while deleting the ticket.",
          icon: "error",
        });
        console.error("Delete error:", error);
      }
    }
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
    <div className="min-h-screen bg-(--bg-soft-accent) text-(--text-main) p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            My Added Tickets
          </h1>
          <p className="text-(--text-muted) font-medium text-sm">
            Manage your inventory and update route details.
          </p>
        </div>

        {/* --- Ticket Grid --- */}
        {tickets.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-24 rounded-[2.5rem] bg-(--bg-card) border border-dashed border-(--border-card)">
            <div className="p-6 rounded-full bg-(--bg-soft-accent) mb-4">
              {/* Placeholder Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-(--text-muted) opacity-50"
              >
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-(--text-main) opacity-80">
              No tickets found
            </h3>
            <p className="text-(--text-muted) text-sm font-medium mt-2">
              Start by adding a new trip to your dashboard.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => {
              const formattedPrice = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(ticket.price);

              return (
                <div
                  key={ticket._id}
                  className="group relative flex flex-col rounded-4xl bg-(--bg-card) border border-(--border-card) shadow-sm hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* 1. Card Header (Image) */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={ticket.photo}
                      alt={ticket.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Status Badge (Glassy) */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`
                        px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 shadow-lg
                        ${
                          ticket.status === "pending"
                            ? "bg-amber-500/80 text-white"
                            : ticket.status === "accepted"
                            ? "bg-emerald-500/80 text-white"
                            : "bg-red-500/80 text-white"
                        }
                      `}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="absolute bottom-4 left-5 right-5 text-white text-lg font-black leading-tight line-clamp-1 drop-shadow-md">
                      {ticket.title}
                    </h2>
                  </div>

                  {/* 2. Card Body */}
                  <div className="p-5 flex-1 flex flex-col space-y-4">
                    {/* Route Info */}
                    <div className="flex items-center justify-between text-sm font-bold text-(--text-main)">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-(--grad-start)"></span>
                        <span className="truncate max-w-20">{ticket.from}</span>
                      </div>
                      {/* Arrow Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-(--text-muted)"
                      >
                        <path d="M18 8L22 12L18 16" />
                        <path d="M2 12H22" />
                      </svg>
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-20 text-right">
                          {ticket.to}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-(--grad-end)"></span>
                      </div>
                    </div>

                    {/* Transport Type */}
                    <div className="flex items-center gap-2 text-xs font-bold text-(--text-muted) uppercase tracking-wide">
                      {ticket.icon}
                      <span>{ticket.transport}</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-(--bg-soft-accent) border border-(--border-card)">
                      <div>
                        <p className="text-[10px] font-bold text-(--text-muted) uppercase">
                          Price
                        </p>
                        <p className="text-lg font-black text-transparent bg-clip-text bg-linear-to-r from-(--grad-money-start) to-(--grad-money-end)">
                          {formattedPrice}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-(--text-muted) uppercase">
                          Available
                        </p>
                        <p className="text-lg font-black text-(--text-main)">
                          {ticket.quantity}
                        </p>
                      </div>
                    </div>

                    {/* 3. Actions Footer */}
                    <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
                      {/* Update / Rejected Status */}
                      {ticket.status === "rejected" ? (
                        <button
                          disabled
                          className="col-span-2 w-full py-3 rounded-xl font-bold text-xs uppercase bg-(--bg-soft-accent) text-red-500 opacity-70 cursor-not-allowed border border-red-200 dark:border-red-900/30"
                        >
                          Rejected (Read Only)
                        </button>
                      ) : (
                        <Link
                          to={`/dashboard/update-ticket-details/${ticket._id}`}
                          className="w-full py-3 rounded-xl font-bold text-xs uppercase text-white bg-linear-to-r from-(--grad-start) to-(--grad-end) shadow-lg shadow-(--grad-start)/30 hover:opacity-90 flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                          Update
                        </Link>
                      )}

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(ticket._id)}
                        disabled={ticket.status === "rejected"}
                        className={`
                          w-full py-3 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all
                          ${
                            ticket.status === "rejected"
                              ? "hidden" // Hides delete if rejected to match original disabled logic flow visually
                              : " text-white border-none transition  bg-linear-to-r from-red-700 via-red-600 to-rose-600 hover:from-red-800 hover:to-rose-700 shadow-md shadow-red-700/50"
                          }
                        `}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedTickets;
