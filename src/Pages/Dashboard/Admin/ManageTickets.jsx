import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { CheckCheck } from "lucide-react";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ManageTickets", page],
    queryFn: async () => {
      let url = `/ticket?page=${page}&limit=${limit}`;
      const { data } = await axiosSecure.get(url);
      return data;
    },
    keepPreviousData: true,
  });

  const allTickets = data?.tickets || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);


// Accept Booking
const handleAccept = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to accept this ticket?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, accept it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/ticket/${id}`, {
          status: "accepted",
        });
        refetch();
        Swal.fire("Accepted!", "The ticket has been accepted.", "success");
      } catch (error) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  });
};

// Reject Booking
const handleReject = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, reject it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/ticket/${id}`, {
          status: "rejected",
        });
        refetch();
        Swal.fire("Rejected!", "The ticket has been rejected.", "success");
      } catch (error) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  });
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
    <div>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto bg-base-200 text-base-content">
        <div className="text-center py-8 mb-12 md:py-8  bg-base-200 rounded-xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
            Manage Tickets
          </h1>
        </div>

        {/* Table Container */}
        <div className="shadow-lg rounded-2xl border border-base-200 bg-base-200 overflow-hidden">
          {/* Standard Table for Desktop/Tablet */}
          <div className="hidden sm:block overflow-x-auto">
            {/* Table starts */}
            <table className="table w-full text-left">
              {/* Table Header */}
              <thead className=" uppercase text-sm bg-base-200 text-base-content">
                <tr>
                  <th className="p-4">Ticket Title</th>
                  <th className="p-4">Vendor Info</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {allTickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="border-b border-base-200 hover:bg-base-200/50 transition"
                  >
                    <td className="p-4 font-semibold text-base-content">
                      {ticket.title}
                    </td>
                    <td className="p-4 text-base-content/80">
                      {ticket.vendorName} <br />{" "}
                      <span className="text-xs text-base-content/50">
                        {ticket.vendorEmail}
                      </span>
                    </td>
                    <td className="p-4">
                      {/* Status Badge */}
                      {ticket.status === "pending" ? (
                        <span className="badge badge-warning badge-outline text-xs px-3 py-1.5">
                          Pending
                        </span>
                      ) : ticket.status === "accepted" ? (
                        <span className="badge badge-success badge-outline text-xs px-3 py-1.5">
                          Accepted
                        </span>
                      ) : (
                        <span className="badge badge-error badge-outline text-xs px-3 py-1.5">
                          Rejected 
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      {/* Action Buttons */}
                      <div className="flex justify-center gap-3">
                        {ticket.status === "pending" ? (
                          <div className="flex gap-4 justify-center items-center ">
                            <button
                              onClick={() => handleAccept(ticket._id)}
                              title="Approve"
                              className="
                          btn btn-sm text-white border-none transition 
                          bg-linear-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600
                          shadow-md shadow-green-500/40
                        "
                            >
                              ✓
                            </button>
                            {/* Reject Button (Error) */}
                            <button
                              onClick={() => handleReject(ticket._id)}
                              title="Reject"
                              className="
                          btn btn-sm text-white border-none transition 
                          bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700
                          shadow-md shadow-red-500/40
                        "
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm font-medium text-success">
                            <CheckCheck />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Table ends */}
          </div>

          {/* Mobile Card View  */}
          <div className="block sm:hidden divide-y divide-base-200">
            {allTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="p-4 hover:bg-base-200/50 transition"
              >
                {/* Ticket Title */}
                <div className="text-lg font-bold text-base-content mb-2">
                  {ticket.title}
                </div>

                {/* Vendor Info Section */}
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-semibold text-info/90">
                    Vendor Info:
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-base-content">
                      {ticket.vendorName}
                    </div>
                    <div className="text-xs text-base-content/50">
                      {ticket.vendorEmail}
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm font-semibold text-info/90">
                    Status:
                  </div>
                  {/* Status Badge */}
                  {ticket.status === "pending" ? (
                    <span className="badge badge-warning badge-outline text-xs px-3 py-1.5">
                      Pending
                    </span>
                  ) : ticket.status === "accepted" ? (
                    <span className="badge badge-success badge-outline text-xs px-3 py-1.5">
                      Accepted
                    </span>
                  ) : (
                    <span className="badge badge-error badge-outline text-xs px-3 py-1.5">
                      Rejected
                    </span>
                  )}
                </div>

                {/* Action Buttons  */}
                <div className="border-t border-base-200 pt-3 flex justify-center">
                  {ticket.status === "pending" ? (
                    <div className="flex gap-4 justify-center items-center w-full">
                      <button
                        onClick={() => handleAccept(ticket._id)}
                        title="Approve"
                        className="
                    btn btn-sm flex-1 text-white border-none transition 
                    bg-linear-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600
                    shadow-md shadow-green-500/40
                  "
                      >
                        Approve ✓
                      </button>
                      {/* Reject Button (Error) */}
                      <button
                        onClick={() => handleReject(ticket._id)}
                        title="Reject"
                        className="
                    btn btn-sm flex-1 text-white border-none transition 
                    bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700
                    shadow-md shadow-red-500/40
                  "
                      >
                        Reject ✕
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-success flex items-center justify-center gap-2">
                      <CheckCheck />
                      <span className="ml-2">Action Completed</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAGINATION BAR */}
        <div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2 sm:gap-3 flex-wrap">
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
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="btn btn-sm btn-ghost bg-base-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTickets;
