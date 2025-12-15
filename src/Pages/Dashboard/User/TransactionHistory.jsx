import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["User Bookings"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/${user.email}`);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-base-100 text-base-content">
      <div className="text-center py-8 mb-12 md:py-8  bg-base-200 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
          Transaction History
        </h1>
      </div>

      {/* --- Desktop/Tablet View (Standard Table) --- */}
      <div className="hidden md:block mt-4 rounded-lg border border-base-300 shadow-xl overflow-hidden bg-base-200">
        <div className="overflow-x-auto">
          {/* Using DaisyUI table class */}
          <table className="table min-w-full">
            {/* Table Header: Using base-300 for a slight background lift */}
            <thead className="bg-base-300">
              <tr>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-base-content/80">
                  Transaction ID
                </th>
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-base-content/80">
                  Ticket Title
                </th>
                <th className="p-4 text-right text-xs font-semibold uppercase tracking-wider text-base-content/80">
                  Amount
                </th>
                <th className="p-4 text-right text-xs font-semibold uppercase tracking-wider text-base-content/80">
                  Status
                </th>
                <th className="p-4 text-right text-xs font-semibold uppercase tracking-wider text-base-content/80">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody className="">
              {bookings.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b border-base-300 hover:bg-base-300/50 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-base-content/60">
                    {tx.transactionId ? (
                      tx.transactionId
                    ) : (
                      <span className="text-base-content/40">
                        Not available
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-base-content">
                    {tx.title}
                  </td>
                  {/* Amount - Using semantic success color */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-success">
                    ${tx.totalPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    {/* Status - Using gradient badge classes */}
                    <span
                      className={`
      text-sm px-3 py-1.5 font-bold border-none rounded-md text-white shadow-md
      ${
        tx.paymentStatus
          ? "bg-linear-to-r from-emerald-400  to-green-700"
          : "bg-linear-to-r from-yellow-500  to-yellow-600"
      }
    `}
                    >
                      {tx.paymentStatus ? "Paid" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-base-content/60">
                    {tx.paidAt ? (
                      new Date(tx.paidAt).toLocaleTimeString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    ) : (
                      <span className="text-base-content/40 font-mono">
                        Not available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Mobile View (Card Layout) --- */}
      <div className="md:hidden mt-4 space-y-4">
        {bookings.map((tx) => (
          <div
            key={tx._id}
            className="p-4 border border-base-300 rounded-lg shadow-lg bg-base-200"
          >
            {/* Row 1: Title and Amount */}
            <div className="flex justify-between items-start mb-2">
              <p className="text-base font-bold text-base-content">
                {tx.title}
              </p>
              {/* Amount - Using semantic success color */}
              <p className="text-lg font-bold text-success">${tx.totalPrice}</p>
            </div>

            {/* Row 2: Status and Date */}
            <div className="flex justify-between items-center mb-2">
              {/* Status - Using semantic badge classes */}
              <span
                className={`
      text-sm px-3 py-1.5 font-bold border-none rounded-md text-white shadow-md
      ${
        tx.paymentStatus
          ? "bg-linear-to-r from-emerald-400  to-green-700"
          : "bg-linear-to-r from-amber-500  to-orange-500"
      }
    `}
              >
                {tx.paymentStatus ? "Paid" : "Pending"}
              </span>

              <p className="text-xs text-base-content/60">
                {tx.paidAt
                  ? new Date(tx.paidAt).toLocaleTimeString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            {/* Row 3: Transaction ID */}
            <div className="pt-2 border-t border-base-300 flex justify-between items-center">
              <p className="text-xs font-medium text-base-content/60">
                Transaction ID
              </p>
              <p className="text-sm font-mono text-base-content break-all">
                {tx.transactionId ? (
                  tx.transactionId
                ) : (
                  <span className="text-base-content/40">Not available</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
