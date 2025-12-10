import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";

const RequestedTickets = () => {

  const handleAccept = (id) => {
  console.log(id)
};

  const handleReject = (id) => {
console.log(id)  
};


  //accurate data

    const axiosSecure = useAxiosSecure();

  const {
    data: allBookingsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["All BOokings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings`);
      return data;
    },
  });

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
  console.log(allBookingsData);



  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-10">
        Requested Bookings
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-2xl border border-purple-200 bg-white">
        <table className="w-full table-auto">
          <thead className="bg-linear-to-r from-purple-600 to-pink-500 text-white">
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

              return (
                <tr
                  key={req._id}
                  className="border-b hover:bg-purple-50 transition"
                >

                  <td className="p-4 text-gray-600">{req.userEmail}</td>

                  <td className="p-4 font-semibold text-gray-700">
                    {req.title}
                  </td>

                  <td className="p-4 text-center text-lg text-purple-700 font-bold">
                    {req.bookingQuantity}
                  </td>

                  <td className="p-4 text-center text-lg font-bold text-green-600">
                    ${req.totalPrice}
                  </td>

                  <td className="p-4 flex justify-center gap-3">
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
