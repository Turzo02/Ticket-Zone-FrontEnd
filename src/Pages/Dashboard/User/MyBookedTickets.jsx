import React from "react";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import useAuth from "../../../Hooks/useAuth";
import TicketCountdown from "../../../Components/TicketCountdown/TicketCountdown";

const MyBookedTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: userBokings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["UserBookings", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/${user?.email}`);
      return data;
    },
  });
  console.log(userBokings);

if (isLoading || loading) {
  return (
    <div className="flex justify-center items-center h-32">
      <SwappingDotLoader />
    </div>
  );
}
  if (isError) {
    return <p className="text-red-500">Failed to load tickets</p>;
  }

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
        My Booked Tickets
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
        {userBokings.map((ticket, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-xl border border-gray-200 shadow-sm dark:border-gray-800 dark:bg-card-dark overflow-hidden"
          >
            <img
              className="h-40 w-full object-cover"
              src="https://images.unsplash.com/photo-1501706362039-c06b2d715385?w=700&h=500&auto=format"
              alt={ticket.title}
            />
            <div className="flex flex-1 flex-col p-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {ticket.title}
              </h4>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">
                    Total Price:
                  </span>
                  <span className="font-semibold"> ${ticket.totalPrice}</span>
                </div>
                {/* Departure */}
                <div className="text-gray-600 font-medium">
                  <div className="px-2 py-1 bg-indigo-300 text-indigo-800 rounded-lg font-semibold flex items-center justify-between ">
                    <span className="text-gray-700">Departure:</span>{" "}
                    {new Date(ticket.departure).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">
                    Status:
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      ticket.status === "accepted"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : ticket.status === "pending"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>

              {/* timer */}

              {/* Countdown */}
              <div className="text-gray-600 font-medium">
                <TicketCountdown departure={ticket.departure} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyBookedTickets;
