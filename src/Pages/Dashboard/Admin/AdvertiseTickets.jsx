import React, { useState } from "react";
import { Train, Plane, Bus, ArrowBigRightDash } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 6;
  const maxAdvertisedLimit = 8;

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
        <LoadingSpinner></LoadingSpinner>
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
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            📢 Advertise Tickets
          </h1>
          <div className="inline-block px-4 py-2 rounded-xl bg-(--bg-card) border border-(--border-card) shadow-sm">
             <p className="text-sm font-bold text-(--text-muted)">
               Global Limit: <span className="text-(--grad-end)">{maxAdvertisedLimit} Tickets</span>
             </p>
          </div>
        </div>

        {/* 2. Main Content Container */}
        <div className="rounded-4xl border border-(--border-card) bg-(--bg-card) shadow-xl shadow-black/5 overflow-hidden">
          
          {/* --- Desktop Grid Header --- */}
          <div className="hidden md:grid grid-cols-4 gap-4 p-5 bg-(--bg-soft-accent) border-b border-(--border-card) text-xs font-extrabold uppercase text-(--text-muted) tracking-widest">
            <div className="col-span-1">Ticket Details</div>
            <div className="col-span-1">Route Info</div>
            <div className="col-span-1">Schedule</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* --- List Body --- */}
          <div className="divide-y divide-(--border-card)">
            {allTickets.map((ticket) => (
              <div 
                key={ticket._id} 
                className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 items-center group hover:bg-(--bg-soft-accent)/50 transition-colors"
              >
                
                {/* Column 1: Title */}
                <div className="md:col-span-1">
                  <span className="md:hidden text-[10px] font-bold text-(--text-muted) uppercase block mb-1">Ticket Title</span>
                  <p className="font-bold text-(--text-main) line-clamp-2">{ticket.title}</p>
                </div>

                {/* Column 2: Route */}
                <div className="md:col-span-1">
                  <span className="md:hidden text-[10px] font-bold text-(--text-muted) uppercase block mb-1">Route</span>
                  <div className="flex items-center gap-2 text-sm font-medium text-(--text-main)">
                    <span className="truncate max-w-20">{ticket.from}</span>
                    <span className="text-(--grad-start) text-4xl"> <ArrowBigRightDash /></span>
                    <span className="truncate max-w-20">{ticket.to}</span>
                  </div>
                </div>

                {/* Column 3: Date */}
                <div className="md:col-span-1">
                  <span className="md:hidden text-[10px] font-bold text-(--text-muted) uppercase block mb-1">Schedule</span>
                  <div className="flex items-center gap-2 justify-start">
                     <span className="font-bold text-sm text-(--text-main)">
                       {ticket.departure ? new Date(ticket.departure).toLocaleDateString() : "N/A"}
                     </span>
                     <span className="text-xs text-(--text-muted) font-mono">
                       {ticket.departure ? new Date(ticket.departure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}
                     </span>
                  </div>
                </div>

                {/* Column 4: Toggle Button */}
                <div className="md:col-span-1 flex justify-start md:justify-center mt-3 md:mt-0">
                  <button
                    onClick={() => handleAdvertise(ticket)}
                    className={`
                      w-full md:w-auto px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all duration-300 shadow-lg active:scale-95
                      ${
                        ticket.isAdvertised
                          ? "btn btn-block btn-lg text-white border-none transition  bg-linear-to-r from-red-700 via-red-600 to-rose-600 hover:from-red-800 hover:to-rose-700 shadow-lg shadow-red-700/50 flex items-center gap-2"
                          : "bg-linear-to-r from-(--grad-start) to-(--grad-end) text-(--text-inv) shadow-(--grad-start)/30 hover:opacity-90 border border-transparent"
                      }
                    `}
                  >
                    {ticket.isAdvertised ? "Remove Ad" : "Promote Now"}
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* 3. Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-(--bg-card) border border-(--border-card) text-(--text-main) hover:border-(--grad-start) disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Prev
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`
                  w-10 h-10 rounded-xl text-xs font-bold transition-all border
                  ${page === i + 1
                    ? "bg-linear-to-r from-(--grad-start) to-(--grad-end) text-(--text-inv) border-transparent shadow-lg shadow-(--grad-start)/30"
                    : "bg-(--bg-card) border-(--border-card) text-(--text-main) hover:border-(--grad-start)"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-(--bg-card) border border-(--border-card) text-(--text-main) hover:border-(--grad-start) disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
