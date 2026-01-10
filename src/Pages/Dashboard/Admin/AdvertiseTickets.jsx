import React, { useState } from "react";
import { Train, Plane, Bus } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import Swal from "sweetalert2";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 7;
  const maxAdvertisedLimit = 6;

  const { data: countData, refetch: refetchCount } = useQuery({
    queryKey: ["advertisedCount"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        "/ticket/dashboard/advertised-count"
      );
      return data.count;
    },
    staleTime: 5000,
  });

  const currentlyAdvertisedCount = countData ?? 0;

  const {
    data,
    isLoading,
    isError,
    refetch: refetchTickets,
  } = useQuery({
    queryKey: ["AdvertisedTickets", page],
    queryFn: async () => {
      let url = `/ticket?page=${page}&limit=${limit}&status=accepted`;
      const { data } = await axiosSecure.get(url);
      return data;
    },
    keepPreviousData: true,
  });

  const allTickets = data?.tickets || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleAdvertise = async (ticket) => {
    const newAdvertiseState = !ticket.isAdvertised;

    // 1. Check Limit with Swal Error
    if (
      newAdvertiseState === true &&
      currentlyAdvertisedCount >= maxAdvertisedLimit
    ) {
      Swal.fire({
        icon: "error",
        title: "Limit Reached",
        text: `You can only advertise a maximum of ${maxAdvertisedLimit} tickets globally. Please remove an existing advertised ticket first.`,
      });
      return;
    }

    // 2. Confirmation Dialog
    Swal.fire({
      title: newAdvertiseState
        ? "Advertise this Ticket?"
        : "Remove Advertisement?",
      text: newAdvertiseState
        ? "This ticket will be visible in the highlighted section."
        : "This ticket will be removed from the highlighted section.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: newAdvertiseState
        ? "Yes, Advertise it!"
        : "Yes, Remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(`/ticket/${ticket._id}`, {
            isAdvertised: newAdvertiseState,
          });

          if (data.modifiedCount > 0) {
            refetchTickets();
            refetchCount();

            Swal.fire({
              title: "Updated!",
              text: "The advertisement status has been updated.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to update advertisement status. Please try again.",
          });
          console.error(error);
        }
      }
    });
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
    <div className="p-4 sm:p-8 max-w-4xl mx-auto min-h-screen bg-base-200 text-base-content">
      <h1 className="text-3xl font-bold text-center text-primary sm:text-4xl"></h1>

      <div className="text-center py-8 mb-12 md:py-8  bg-base-200 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
          📢 Advertise Ticket Status
        </h1>
      </div>
      <p className="text-md font-bold text-center text-base-content/50 my-6">
        You can only advertise a maximum of {maxAdvertisedLimit} tickets
        globally
      </p>

      {/* Table/Card Container - Using DaisyUI Card/Base styles */}

      <div className="shadow-xl rounded-2xl border border-base-200 bg-base-200 overflow-hidden">
        <div className="hidden md:grid grid-cols-4 gap-4 p-4 bg-base-200 text-base-content uppercase text-sm font-bold">
          <div className="col-span-1">Ticket Title</div>

          <div className="col-span-1">From - To</div>

          <div className="col-span-1">Date & Time</div>

          <div className="col-span-1 text-center">Advertise (Toggle)</div>
        </div>

        {/* Ticket List Body */}

        <div className="divide-y divide-base-400">
          {allTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-4 
            grid grid-cols-1 md:grid-cols-4 
            gap-4 items-center
            "
            >
              {/* Column 1: Title (Always visible) */}

              <div className="font-semibold text-base-content md:col-span-1">
                <span className="md:hidden font-bold mr-2 uppercase  text-info">
                  Title :
                </span>

                {ticket.title}
              </div>

              {/* Column 2: From-To (Stacks below Title on small screens) */}

              <div className="text-base-content/80 md:col-span-1">
                <span className="md:hidden  font-bold mr-2 uppercase  text-info">
                  Route:
                </span>
                {ticket.from} <span className="text-primary">➡️</span>{" "}
                {ticket.to}
              </div>

              {/* Column 3: Date & Time (Stacks below From-To on small screens) */}

              <div className="text-base-content/80 md:col-span-1">
                <span className="md:hidden  font-bold mr-2 uppercase  text-info">
                  When:
                </span>

                {ticket.departure}
              </div>

              {/* Column 4: Toggle Button (Stacks last on small screens) */}

              <div className="md:col-span-1 flex justify-start md:justify-center mt-2 md:mt-0 ">
                <button
                  onClick={() => handleAdvertise(ticket)}
                  className={`

                btn btn-sm text-white border-none shadow-md transition-all duration-300 w-full md:w-auto

                ${
                  ticket.isAdvertised
                    ? "bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-red-500/40"
                    : "bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-amber-500/40"
                }

              `}
                >
                  {ticket.isAdvertised ? "Remove Ad" : "Advertise Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGINATION BAR */}

      <div>
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
              className="btn btn-sm btn-ghost bg-base-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertiseTickets;
