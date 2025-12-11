import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";

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
    await axiosSecure.patch(`/ticket/${id}`, {
      status: "accepted",
    });
    refetch();
  };

  // Reject Booking
  const handleReject = async (id) => {
    await axiosSecure.patch(`/ticket/${id}`, {
      status: "rejected",
    });
    refetch();
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
      <div className="p-4 sm:p-8 max-w-7xl mx-auto bg-gray-50">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Manage Tickets (Static Demo)
        </h2>

        <div className="shadow-lg rounded-xl border border-purple-300 bg-white overflow-hidden">
          <table className="w-full table-auto text-left">
            {/* Table Header */}
            <thead className="bg-purple-500 text-white uppercase text-sm">
              <tr>
                <th className="p-4">Ticket Title</th>
                <th className="p-4">Vendor Info</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            {allTickets.map((ticket) => (
              <tbody key={ticket._id}>
                {/* Static Data Row 1: Pending Ticket */}
                <tr className="border-b border-gray-100 hover:bg-purple-50 transition">
                  <td className="p-4 font-semibold text-gray-800">
                    {ticket.title}
                  </td>
                  <td className="p-4 text-gray-600">
                    {ticket.vendorName} <br />{" "}
                    <span className="text-xs text-gray-400">
                      {ticket.vendorEmail}
                    </span>
                  </td>

                  <td className="p-4">
                    {ticket.status === "pending" ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                        Pending
                      </span>
                    ) : ticket.status === "accepted" ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-300">
                        Accepted
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      {/*  Action Buttons */}
                      {ticket.status === "pending" ? (
                        <div className="flex gap-4 justify-center items-center ">
                          <button
                            onClick={() => handleAccept(ticket._id)}
                            title="Approve"
                            className="btn  text-white bg-green-500 hover:bg-green-600  transition shadow-md"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => handleReject(ticket._id)}
                            title="Reject"
                            className="btn text-white bg-red-500 hover:bg-red-600  transition shadow-md"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-green-600">
                          Action ✅
                        </span>
                      )}

                      {/* <div className="flex gap-4 justify-center items-center ">
                          <button
                            onClick={() => handleAccept(ticket._id)}
                            title="Approve"
                            className="btn  text-white bg-green-500 hover:bg-green-600  transition shadow-md"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => handleReject(ticket._id)}
                            title="Reject"
                            className="btn text-white bg-red-500 hover:bg-red-600  transition shadow-md"
                          >
                            ✕
                          </button>
                        </div> */}

                        
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div>
          {/* PAGINATION BAR */}
          {totalPages > 1 && (
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
                      ? "bg-purple-600 text-white"
                      : "bg-green-500 "
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
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
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
