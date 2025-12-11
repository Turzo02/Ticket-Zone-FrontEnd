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
    <section className="pt-8">
      <h3 className="text-xl font-bold font-display">Transaction History</h3>
      <div className="mt-4 rounded-xl border  shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider  ">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider  ">
                  Ticket Title
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider ">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider ">
                 Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider ">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200  dark:divide-gray-800 dark:bg-card-dark">
              {bookings.map((tx) => (
                <tr key={tx._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                   { 
                      tx.transactionId ? 
                      tx.transactionId:"No Transaction id avaible" 

                   }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold  ">
                    {tx.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${tx.totalPrice} 
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {tx.paymentStatus ? "Paid" : "Not paid"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm ">
                    {tx.paidAt
                      ? new Date(tx.paidAt).toLocaleTimeString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "Not Avaiable"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TransactionHistory;
