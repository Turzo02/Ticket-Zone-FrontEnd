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
  console.log(bookings);

  return (
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-6">
    Transaction History
  </h3>

  {/* --- Desktop/Tablet View (Standard Table) --- */}
  <div className="hidden md:block mt-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden bg-white dark:bg-gray-800">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
              Ticket Title
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
              Amount
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
              Payment Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {bookings.map((tx) => (
            <tr
              key={tx._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150 ease-in-out"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                {tx.transactionId ? tx.transactionId : "No Transaction ID available"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                {tx.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-600 dark:text-green-400">
                ${tx.totalPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <span
                  className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                    tx.paymentStatus
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                      : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                  }`}
                >
                  {tx.paymentStatus ? "Paid" : "Pending"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                {tx.paidAt
                  ? new Date(tx.paidAt).toLocaleTimeString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "N/A"}
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
        className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md bg-white dark:bg-gray-800"
      >
        {/* Row 1: Title and Amount */}
        <div className="flex justify-between items-start mb-2">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            {tx.title}
          </p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            ${tx.totalPrice}
          </p>
        </div>

        {/* Row 2: Status and Date */}
        <div className="flex justify-between items-center mb-2">
          <span
            className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
              tx.paymentStatus
                ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
            }`}
          >
            {tx.paymentStatus ? "Paid" : "Pending"}
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400">
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
        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Transaction ID
          </p>
          <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
            {tx.transactionId ? tx.transactionId : "No ID available"}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>
  );
};

export default TransactionHistory;
