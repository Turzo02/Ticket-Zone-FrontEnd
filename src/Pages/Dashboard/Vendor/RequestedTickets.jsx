import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";

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
    await axiosSecure.patch(`/bookings/${id}`, {
      status: "accepted",
    });
    refetch(); 
};

// Reject Booking
const handleReject = async (id) => {

    await axiosSecure.patch(`/bookings/${id}`, {
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
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-10">
        Requested Bookings
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-2xl border border-purple-200 ">
        <table className="w-full table-auto">
          <thead className="bg-linear-to-r from-purple-600 to-pink-500 text-white">
            <tr>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Ticket Title</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">Total Price</th>
              <th className="p-4 text-center">Actions</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {allBookingsData.map((req) => {

              return (
                <tr
                  key={req._id}
                  className="border-b  transition"
                >

                  <td className="p-4 ">{req.userEmail}</td>

                  <td className="py-4 font-semibold ">
                    {req.title}
                  </td>

                  <td className="py-4 text-center text-lg text-purple-700 font-bold">
                    {req.bookingQuantity}
                  </td>

                  <td className="py-4 text-center text-lg font-bold text-green-600">
                    ${req.totalPrice}
                  </td>

                  <td className="py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg shadow-md transition"
                    >
                      <CheckCircle size={18} /> Accept 
                      
                    </button>

                    <button
                      onClick={() => handleReject(req._id)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg shadow-md transition"
                    >
                      <XCircle size={18} /> Reject
                    </button>
                  </td>
                    <td className="p-4 text-center text-lg font-bold ">
                    {req.status.toUpperCase()}
                  </td>
                  
                </tr>
              );
            })}

            {allBookingsData.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-lg text-gray-500 font-medium"
                >
                  No pending booking requests 🎉
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedTickets;
