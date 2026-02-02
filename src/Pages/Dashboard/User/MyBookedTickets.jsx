import React from "react";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import useAuth from "../../../Hooks/useAuth";
import TicketCard from "./TicketCard/TicketCard";
import { Ticket, CheckCircle2, Clock } from "lucide-react";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

const MyBookedTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: userBookings = [],
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

  // Calculate quick stats
  const paidCount = userBookings.filter(
    (t) => t.paymentStatus === "paid"
  ).length;
  const pendingCount = userBookings.length - paidCount;

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64 w-full bg-(--bg-card) rounded-3xl border border-(--border-card)">
       <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center bg-red-50 border border-red-100 rounded-2xl text-red-600 dark:bg-red-900/10 dark:border-red-900/30">
        <p className="font-bold">Failed to load tickets. Please try again.</p>
      </div>
    );
  }

  return (
    <section className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Page Header & Stats */}
      <div className="flex flex-col md:flex-row items-center lg:items-end justify-between gap-6 pb-6 border-b border-(--border-card)">
        <div className="text-center lg:text-start">
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            My Bookings
          </h1>
          <p className="text-(--text-muted) font-medium mt-2">
            Manage your upcoming trips and payments.
          </p>
        </div>

        {/* Mini Stats Grid */}
        {userBookings.length > 0 && (
          <div className="flex gap-3">
            <div className="px-4 py-2 rounded-xl bg-(--bg-card) border border-(--border-card) flex items-center gap-2 shadow-sm">
              <div className="p-1.5 rounded-full bg-(--success-bg) text-(--success-text)">
                <CheckCircle2 size={14} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-(--text-muted)">
                  Confirmed
                </p>
                <p className="text-lg font-black text-(--text-main) leading-none">
                  {paidCount}
                </p>
              </div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-(--bg-card) border border-(--border-card) flex items-center gap-2 shadow-sm">
              <div className="p-1.5 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-500">
                <Clock size={14} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-(--text-muted)">
                  Pending
                </p>
                <p className="text-lg font-black text-(--text-main) leading-none">
                  {pendingCount}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Tickets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {userBookings?.length > 0 ? (
          userBookings.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))
        ) : (
          // 3. Empty State Design
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-(--bg-card) border border-dashed border-(--border-card) rounded-4xl">
            <div className="p-6 rounded-full bg-(--bg-soft-accent) mb-4">
              <Ticket size={48} className="text-(--text-muted) opacity-50" />
            </div>
            <h3 className="text-2xl font-black text-(--text-main) mb-2">
              No Booked Tickets
            </h3>
            <p className="text-(--text-muted) max-w-sm mx-auto mb-6">
              You haven't booked any trips yet. Explore our routes to find your
              next destination.
            </p>
            <button className="px-6 py-3 rounded-xl font-bold text-(--text-inv) bg-linear-to-r from-(--grad-start) to-(--grad-end) shadow-lg shadow-(--grad-start)/20 hover:shadow-(--grad-start)/40 hover:-translate-y-1 transition-all">
              Browse Tickets
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBookedTickets;
