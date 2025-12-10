import React, { useState } from "react";
import { Train, Plane, Bus } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";

const AdvertiseTicketsStatic = () => {
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
    queryKey: ["latestTickets", page],
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

    if (
      newAdvertiseState === true &&
      currentlyAdvertisedCount >= maxAdvertisedLimit
    ) {
      alert(
        `You can only advertise a maximum of ${maxAdvertisedLimit} tickets globally. Please remove an existing advertised ticket first.`
      );

      return;
    }

    try {
      await axiosSecure.patch(`/ticket/${ticket._id}`, {
        isAdvertised: newAdvertiseState,
      });

      refetchTickets();
      refetchCount();
    } catch (error) {
      alert("Failed to update advertisement status. Please try again.");
      console.error(error);
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
    <div className="p-4 sm:p-8 max-w-4xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-indigo-700 sm:text-4xl">
        📢 Advertise Ticket Status 
      </h1>
      <p className="text-md font-bold text-center text-black-700 my-4 ">    You can only advertise a maximum of ${maxAdvertisedLimit} tickets globally</p>

      <div className="shadow-xl rounded-xl border border-indigo-300 bg-white overflow-hidden">
        <table className="w-full table-auto text-left">
          <thead className="bg-indigo-600 text-white uppercase text-sm">
            <tr>
              <th className="p-4">Ticket Title</th>
              <th className="p-4">From - To</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Advertise (Toggle)</th>
            </tr>
          </thead>
          <tbody>
            {allTickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-indigo-50 transition"
              >
                <td className="p-4 font-semibold text-gray-800">
                  {ticket.title}
                </td>
                <td className="p-4 text-gray-600">
                  {ticket.from} ➡️ {ticket.to}
                </td>
                <td className="p-4 text-gray-600">{ticket.departure}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleAdvertise(ticket)}
                    className={`btn  ${
                      ticket.isAdvertised ? "btn-success" : "btn-secondary"
                    }`}
                  >
                    {ticket.isAdvertised ? "Remove Ad" : "Advertise Now"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
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
                  page === i + 1 ? "bg-purple-600 text-white" : "bg-green-500 "
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertiseTicketsStatic;
