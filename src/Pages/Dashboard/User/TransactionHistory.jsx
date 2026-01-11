import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import {
  Receipt,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

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

  // Calculate Stats
  const totalSpent = bookings.reduce(
    (acc, curr) => acc + (curr.totalPrice || 0),
    0
  );
  const successCount = bookings.filter((b) => b.paymentStatus).length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 w-full bg-(--bg-card) rounded-3xl border border-(--border-card)">
        <SwappingDotLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center bg-red-50 border border-red-100 rounded-2xl text-red-600 dark:bg-red-900/10 dark:border-red-900/30">
        <p className="font-bold">Failed to load transaction history.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 1. Header & Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Title Block */}
        <div className="md:col-span-3 pb-4">
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            My Wallet & History
          </h1>
          <p className="text-(--text-muted) font-medium mt-2">
            Track your payments and ticket statuses in real-time.
          </p>
        </div>

        {/* Stat Card: Total Spent */}
        <div className="relative overflow-hidden p-6 rounded-3xl bg-(--bg-card) border border-(--border-card) shadow-xl shadow-(--grad-start)/5 group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={80} className="text-(--grad-start)" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-1">
              Total Cost
            </p>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-(--grad-money-start) to-(--grad-money-end)">
              $
              {totalSpent.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>

        {/* Stat Card: Successful Orders */}
        <div className="relative overflow-hidden p-6 rounded-3xl bg-(--bg-card) border border-(--border-card) shadow-xl shadow-(--grad-start)/5 group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 size={80} className="text-(--grad-money-start)" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-(--text-muted) mb-1">
              Successful Orders
            </p>
            <h2 className="text-3xl font-black text-(--text-main)">
              {successCount}{" "}
              <span className="text-lg text-(--text-muted) font-medium">
                / {bookings.length}
              </span>
            </h2>
          </div>
        </div>

        {/* Stat Card: Last Activity */}
        <div className="relative overflow-hidden p-6 rounded-3xl bg-linear-to-br from-(--grad-start) to-(--grad-end) text-white shadow-xl shadow-(--grad-start)/20">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1">
              Latest Activity
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black">
                {bookings.length > 0 ? bookings[0].title.split(" ")[0] : "None"}
              </span>
              <ArrowUpRight className="text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Desktop View (Premium Table) */}
      <div className="hidden md:block rounded-3xl border border-(--border-card) bg-(--bg-card) overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-(--surface-highlight) border-b border-(--border-card)">
                <th className="px-8 py-5 text-[10px] font-extrabold uppercase text-(--text-muted) tracking-widest">
                  Transaction ID
                </th>
                <th className="px-8 py-5 text-[10px] font-extrabold uppercase text-(--text-muted) tracking-widest">
                  Details
                </th>
                <th className="px-8 py-5 text-[10px] font-extrabold uppercase text-(--text-muted) tracking-widest text-right">
                  Amount
                </th>
                <th className="px-8 py-5 text-[10px] font-extrabold uppercase text-(--text-muted) tracking-widest text-center">
                  Status
                </th>
                <th className="px-8 py-5 text-[10px] font-extrabold uppercase text-(--text-muted) tracking-widest text-right">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-card)">
              {bookings.map((tx) => (
                <tr
                  key={tx._id}
                  className="group hover:bg-(--surface-highlight) transition-colors duration-200"
                >
                  {/* ID */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-(--bg-soft-accent) text-(--grad-start) group-hover:bg-white group-hover:shadow-sm transition-all">
                        <Receipt size={16} />
                      </div>
                      <span className="font-mono text-xs font-bold text-(--text-muted) opacity-70 group-hover:opacity-100 transition-opacity">
                        {tx.transactionId
                          ? `#${tx.transactionId.slice(-6)}`
                          : "---"}
                      </span>
                    </div>
                  </td>

                  {/* Title */}
                  <td className="px-8 py-6">
                    <p className="font-bold text-(--text-main) text-sm line-clamp-1">
                      {tx.title}
                    </p>
                    <p className="text-xs text-(--text-muted) mt-0.5">
                      Ticket Purchase
                    </p>
                  </td>

                  {/* Amount (Gradient Text) */}
                  <td className="px-8 py-6 text-right">
                    <span className="font-black text-lg text-transparent bg-clip-text bg-linear-to-r from-(--grad-money-start) to-(--grad-money-end)">
                      ${tx.totalPrice}
                    </span>
                  </td>

                  {/* Status Badge (Glow) */}
                  <td className="px-8 py-6 text-center">
                    {tx.paymentStatus ? (
                      // PAID STATUS (Clean Emerald Glass)
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Completed
                      </span>
                    ) : (
                      // PENDING STATUS (Subtle Amber Glass)
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        Processing
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="px-8 py-6 text-right text-xs font-bold text-(--text-muted)">
                    {tx.paidAt ? (
                      <>
                        <div className="text-(--text-main)">
                          {new Date(tx.paidAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-[10px] opacity-60">
                          {new Date(tx.paidAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </>
                    ) : (
                      <span className="italic opacity-50">Processing...</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="p-16 flex flex-col items-center justify-center text-center opacity-60">
              <Receipt size={48} className="text-(--text-muted) mb-4" />
              <h3 className="text-lg font-bold text-(--text-main)">
                No Transactions Yet
              </h3>
              <p className="text-sm text-(--text-muted)">
                Your purchase history will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Mobile View (Gradient Cards) */}
      <div className="md:hidden space-y-4">
        {bookings.map((tx) => (
          <div
            key={tx._id}
            className="relative overflow-hidden p-5 rounded-2xl bg-(--bg-card) border border-(--border-card) shadow-lg space-y-4"
          >
            {/* Status Strip */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                tx.paymentStatus
                  ? "bg-(--grad-money-start)"
                  : "bg-(--grad-wait-start)"
              }`}
            ></div>

            {/* Row 1: Header */}
            <div className="flex justify-between items-start gap-4 pl-2">
              <div>
                <h3 className="font-bold text-(--text-main) text-sm line-clamp-1">
                  {tx.title}
                </h3>
                <p className="text-[10px] font-mono text-(--text-muted) mt-1 opacity-70">
                  ID: {tx.transactionId || "N/A"}
                </p>
              </div>
              <span className="font-black text-xl text-transparent bg-clip-text bg-linear-to-r from-(--grad-money-start) to-(--grad-money-end)">
                ${tx.totalPrice}
              </span>
            </div>

            {/* Row 2: Footer */}
            <div className="flex justify-between items-center pl-2 pt-2 border-t border-(--border-card)">
              <span
                className={`
                 text-[10px] font-black uppercase tracking-wider flex items-center gap-1
                 ${
                   tx.paymentStatus ? "text-(--success-text)" : "text-amber-500"
                 }
               `}
              >
                {tx.paymentStatus ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <Clock size={14} />
                )}
                {tx.paymentStatus ? "Paid Successfully" : "Pending Payment"}
              </span>
              <span className="text-xs font-bold text-(--text-muted)">
                {tx.paidAt ? new Date(tx.paidAt).toLocaleDateString() : "---"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
