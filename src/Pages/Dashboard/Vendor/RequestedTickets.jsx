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
      <div className="flex justify-center items-center h-32">
        <SwappingDotLoader></SwappingDotLoader>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load tickets</p>;
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto bg-base-100 text-base-content">
      <div className="text-center py-8 mb-12 md:py-8  bg-base-200 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
          Requested Tickets
        </h1>
      </div>

      <div className="hidden md:block overflow-x-auto shadow-xl rounded-lg border border-base-300 bg-base-200">
        <table className="table w-full">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Ticket Title</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">Total Price</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allBookingsData.map((req) => {
              const statusColor =
                req.status === "accepted"
                  ? "badge badge-success badge-outline text-xs px-3 py-1.5 "
                  : req.status === "rejected"
                  ? "badge badge-error badge-outline text-xs px-3 py-1.5"
                  : "badge badge-warning badge-outline text-xs px-3 py-1.5";

              return (
                <tr
                  key={req._id}
                  className="border-b border-base-300 hover:bg-base-300/50 transition"
                >
                  <td className="p-4 ">{req.userEmail}</td>

                  <td className="py-4 font-semibold text-base-content">
                    {req.title}
                  </td>

                  {/* Quantity */}
                  <td className="py-4 text-center text-lg font-bold text-accent">
                    {req.bookingQuantity}
                  </td>

                  {/* Total Price */}
                  <td className="py-4 text-center text-lg font-bold text-success">
                    ${req.totalPrice}
                  </td>

                  {/* Action Buttons */}
                  {req.status === "pending" ? (
                    <td className="py-4 flex justify-center gap-3">
                      <button
                        onClick={() => handleAccept(req._id)}
                        className="
                    btn btn-sm text-white border-none transition
                    bg-linear-to-r from-emerald-400 via-green-500 to-green-700
                    hover:from-emerald-500 hover:to-green-800
                    shadow-lg shadow-green-600/40
                    flex items-center gap-2
                  "
                      >
                        <CheckCircle size={18} /> Accept
                      </button>

                      <button
                        onClick={() => handleReject(req._id)}
                        className="
                    btn btn-sm text-white border-none transition
                    bg-linear-to-r from-red-700 via-red-600 to-rose-600
                    hover:from-red-800 hover:to-rose-700
                    shadow-lg shadow-red-700/50
                    flex items-center gap-2
                  "
                      >
                        <Ban size={18} /> Reject
                      </button>
                    </td>
                  ) : (
                    <td className="p-4 text-center">
                      <span
                        className={`badge ${statusColor} badge-lg font-bold`}
                      >
                        {req.status.toUpperCase()}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}

            {allBookingsData.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-lg text-base-content/60 font-medium"
                >
                  No pending booking requests 🎉
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---  Mobile List Layout --- */}
      <div className="md:hidden space-y-4">
        {allBookingsData.length > 0 ? (
          allBookingsData.map((req) => {
            const statusColor =
              req.status === "accepted"
                ? "bg-green-500 text-white "
                : req.status === "rejected"
                ? "bg-red-500 text-white"
                : "bg-yellow-500 text-black ";

            return (
              <div
                key={req._id}
                className="card bg-base-200 shadow-xl border border-base-300 transition hover:shadow-2xl"
              >
                <div className="card-body p-4">
                  {/* Header/Status */}
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="card-title text-base-content text-xl font-bold">
                      {req.title}
                    </h2>
                    <span className={`badge ${statusColor} badge-lg font-bold`}>
                      {req.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4 border-t pt-2 border-base-300">
                    <div className="font-semibold text-base-content/70">
                      Email:
                    </div>
                    <div className="truncate text-base-content font-medium text-right">
                      {req.userEmail}
                    </div>

                    <div className="font-semibold text-base-content/70">
                      Quantity:
                    </div>
                    <div className="text-right text-lg font-bold text-accent">
                      {req.bookingQuantity}
                    </div>

                    <div className="font-semibold text-base-content/70">
                      Total Price:
                    </div>
                    <div className="text-right text-lg font-bold text-success">
                      ${req.totalPrice}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {req.status === "pending" && (
                    <div className="card-actions flex-col gap-2">
                      <button
                        onClick={() => handleAccept(req._id)}
                        className="
                    btn btn-block btn-sm text-white border-none transition
                    bg-linear-to-r from-emerald-400 via-green-500 to-green-700
                    hover:from-emerald-500 hover:to-green-800
                    shadow-lg shadow-green-600/40
                    flex items-center gap-2
                  "
                      >
                        <CheckCircle size={18} /> Accept
                      </button>

                      <button
                        onClick={() => handleReject(req._id)}
                        className="
                    btn btn-block btn-sm text-white border-none transition
                    bg-linear-to-r from-red-700 via-red-600 to-rose-600
                    hover:from-red-800 hover:to-rose-700
                    shadow-lg shadow-red-700/50
                    flex items-center gap-2
                  "
                      >
                        <Ban size={18} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-6 text-center text-lg text-base-content/60 font-medium bg-base-200 rounded-lg shadow-xl">
            No pending booking requests 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestedTickets;
