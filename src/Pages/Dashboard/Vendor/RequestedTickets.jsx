import React from "react";
import { Ban, CheckCircle, XCircle } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import Swal from "sweetalert2";

const RequestedTickets = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allBookingsData = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["AllBookings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings`);
      return data;
    },
  });

  // Accept Booking

  const handleAccept = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Acceptance?",
      text: "Are you sure you want to ACCEPT this booking request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#38a169",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/bookings/${id}`, {
          status: "accepted",
        });
        refetch();

        Swal.fire({
          title: "Accepted!",
          text: "The booking has been successfully accepted.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Failed!",
          text: "Could not accept the booking. Please try again.",
          icon: "error",
        });
        console.error("Accept error:", error);
      }
    }
  };

  // Reject Booking
  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Rejection?",
      text: "Are you sure you want to REJECT this booking request? This action is final.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e53e3e", // Red for Reject
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/bookings/${id}`, {
          status: "rejected",
        });
        refetch();

        Swal.fire({
          title: "Rejected!",
          text: "The booking has been successfully rejected.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Failed!",
          text: "Could not reject the booking. Please try again.",
          icon: "error",
        });
        console.error("Reject error:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32 bg-(--sidebar-bg)">
        <SwappingDotLoader></SwappingDotLoader>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 bg-(--bg-soft-accent)">Failed to load tickets</p>;
  }

  return (
    <div className="min-h-screen bg-(--bg-soft-accent) text-(--text-main) p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8 relative">
                {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
           <div className="absolute top-20 left-10 w-72 h-72 bg-(--grad-start) rounded-full opacity-10 blur-[100px]" />
           <div className="absolute top-40 right-10 w-96 h-96 bg-(--grad-end) rounded-full opacity-10 blur-[100px]" />
        </div>

        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            Booking Requests
          </h1>
          <p className="text-(--text-muted) font-medium text-sm">
            Approve or reject customer booking attempts.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="rounded-4xl border border-(--border-card) bg-(--bg-card) shadow-xl shadow-black/5 overflow-hidden">
          
          {/* --- Desktop Table View --- */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-(--bg-soft-accent) border-b border-(--border-card)">
                  <th className="p-5 text-xs font-extrabold uppercase text-(--text-muted) tracking-widest w-[40%]">Request Details</th>
                  <th className="p-5 text-xs font-extrabold uppercase text-(--text-muted) tracking-widest text-center">Qty</th>
                  <th className="p-5 text-xs font-extrabold uppercase text-(--text-muted) tracking-widest text-right">Total</th>
                  <th className="p-5 text-xs font-extrabold uppercase text-(--text-muted) tracking-widest text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-card)">
                {allBookingsData.map((req) => (
                  <tr key={req._id} className="group hover:bg-(--bg-soft-accent)/50 transition-colors">
                    
                    {/* COMBINED COLUMN: Ticket + Email */}
                    <td className="p-5">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-(--text-main) text-sm line-clamp-1">
                          {req.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-(--grad-start)"></span>
                          <span className="text-xs font-mono font-bold text-(--text-muted) opacity-80">
                            {req.userEmail}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="p-5 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-(--bg-soft-accent) text-sm font-black text-(--text-main) border border-(--border-card)">
                        {req.bookingQuantity}
                      </span>
                    </td>

                    {/* Total Price (Money Gradient) */}
                    <td className="p-5 text-right">
                      <span className="font-black text-lg text-transparent bg-clip-text bg-linear-to-r from-(--grad-money-start) to-(--grad-money-end)">
                        ${req.totalPrice}
                      </span>
                    </td>

                    {/* Actions / Status */}
                    <td className="p-5 text-center">
                      {req.status === "pending" ? (
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleAccept(req._id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-(--success-bg) text-(--success-text) border border-(--success-text)/20 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 transition-all text-[10px] font-black uppercase tracking-wider"
                          >
                            <CheckCircle size={14} strokeWidth={3} /> Accept
                          </button>
                          <button
                            onClick={() => handleReject(req._id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-(--color-error-bg) text-(--color-error-text) border border-(--color-error-border) hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 transition-all text-[10px] font-black uppercase tracking-wider"
                          >
                            <Ban size={14} strokeWidth={3} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className={`
                          inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border
                          ${req.status === "accepted"
                            ? "bg-(--success-bg) text-(--success-text) border-(--success-text)/20"
                            : "bg-(--color-error-bg) text-(--color-error-text) border-(--color-error-border)"
                          }
                        `}>
                          {req.status === "accepted" ? <CheckCircle size={12}/> : <Ban size={12}/>}
                          {req.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {allBookingsData.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-12 text-center">
                      <div className="inline-block p-4 rounded-full bg-(--bg-soft-accent) mb-3">
                        <CheckCircle size={24} className="text-(--text-muted) opacity-50"/>
                      </div>
                      <p className="text-(--text-muted) font-bold text-sm">No pending requests found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- Mobile Card View --- */}
          <div className="md:hidden p-4 space-y-4 bg-(--bg-soft-accent)">
            {allBookingsData.length > 0 ? (
              allBookingsData.map((req) => (
                <div key={req._id} className="relative overflow-hidden p-5 rounded-3xl bg-(--bg-card) border border-(--border-card) shadow-sm">
                  
                  {/* Decorative Status Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 
                    ${req.status === 'pending' ? 'bg-(--color-warn-bg)' 
                    : req.status === 'accepted' ? 'bg-(--success-bg)' 
                    : 'bg-(--color-error-bg)'}`} 
                  />

                  {/* Top Row: Title + Status */}
                  <div className="flex justify-between items-start gap-3 pl-3 mb-3">
                    <div>
                      <h3 className="font-black text-(--text-main) text-sm line-clamp-2">{req.title}</h3>
                      <p className="text-[10px] font-mono font-bold text-(--text-muted) mt-1 opacity-80">{req.userEmail}</p>
                    </div>
                    <span className={`
                      shrink-0 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider
                      ${req.status === "pending" ? "bg-(--color-warn-bg) text-(--color-warn-text)" : 
                        req.status === "accepted" ? "bg-(--success-bg) text-(--success-text)" :
                        "bg-(--color-error-bg) text-(--color-error-text)"}
                    `}>
                      {req.status}
                    </span>
                  </div>

                  {/* Middle Row: Stats */}
                  <div className="flex items-center justify-between pl-3 py-3 border-t border-b border-(--border-card) mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-(--text-muted) uppercase">Quantity</span>
                      <span className="text-sm font-black text-(--text-main)">x{req.bookingQuantity}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-(--text-muted) uppercase">Total</span>
                      <span className="text-lg font-black text-transparent bg-clip-text bg-linear-to-r from-(--grad-money-start) to-(--grad-money-end)">
                        ${req.totalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Actions */}
                  {req.status === "pending" && (
                    <div className="grid grid-cols-2 gap-3 pl-3">
                      <button
                        onClick={() => handleReject(req._id)}
                        className="w-full py-2.5 rounded-xl font-bold text-xs uppercase bg-(--color-error-bg) text-(--color-error-text) border border-(--color-error-border) active:scale-95 transition-transform"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAccept(req._id)}
                        className="w-full py-2.5 rounded-xl font-bold text-xs uppercase bg-(--success-bg) text-(--success-text) border border-(--success-text)/20 active:scale-95 transition-transform"
                      >
                        Accept
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-(--bg-card) rounded-2xl border border-dashed border-(--border-card)">
                <p className="text-(--text-muted) font-bold text-sm">No requests found.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );

};

export default RequestedTickets;
