import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { Check, X ,CheckCheck ,Store} from "lucide-react";
import Swal from "sweetalert2";

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
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to accept this ticket?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, accept it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/ticket/${id}`, {
          status: "accepted",
        });
        refetch();
        Swal.fire("Accepted!", "The ticket has been accepted.", "success");
      } catch (error) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  });
};

// Reject Booking
const handleReject = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, reject it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/ticket/${id}`, {
          status: "rejected",
        });
        refetch();
        Swal.fire("Rejected!", "The ticket has been rejected.", "success");
      } catch (error) {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  });
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
    <div className="min-h-screen bg-(--bg-soft-accent) text-(--text-main) p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            Manage Tickets
          </h1>
          <p className="text-(--text-muted) font-medium text-sm">
            Admin Panel • Ticket Approval System
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-4xl border border-(--border-card) bg-(--bg-card) shadow-xl shadow-black/5 overflow-hidden">
          
          {/* --- Desktop Table --- */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-(--bg-soft-accent) border-b border-(--border-card)">
                  <th className="p-5 text-xs font-extrabold uppercase text-(--text-muted) tracking-widest">Ticket Title</th>
                  <th className="p-5 text-xs font-extrabold uppercase text-(--text-muted) tracking-widest">Vendor</th>
                  <th className="p-5 text-xs font-extrabold uppercase text-(--text-muted) tracking-widest text-center">Status</th>
                  <th className="p-5 text-xs font-extrabold uppercase text-(--text-muted) tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-card)">
                {allTickets.map((ticket) => (
                  <tr key={ticket._id} className="group hover:bg-(--bg-soft-accent)/50 transition-colors">
                    {/* Title */}
                    <td className="p-5 font-bold text-(--text-main) truncate ">
                      {ticket.title}
                    </td>
                    
                    {/* Vendor */}
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-(--text-main)">{ticket.vendorName}</span>
                        <span className="text-xs text-(--text-muted) font-mono opacity-80">{ticket.vendorEmail}</span>
                      </div>
                    </td>

                    {/* Status Badge (Uses New Vars) */}
                    <td className="p-5 text-center">
                      <span className={`
                        inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border
                        ${ticket.status === "pending" 
                          ? "bg-(--color-warn-bg) text-(--color-warn-text) border-(--color-warn-border)" 
                          : ticket.status === "accepted"
                          ? "bg-(--success-bg) text-(--success-text) border-(--success-text)/20"
                          : "bg-(--color-error-bg) text-(--color-error-text) border-(--color-error-border)"
                        }
                      `}>
                        {ticket.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-5 text-center">
                      {ticket.status === "pending" ? (
                        <div className="flex justify-center gap-3">
                          {/* Approve Btn */}
                          <button
                            onClick={() => handleAccept(ticket._id)}
                            className="p-2.5 rounded-xl border transition-all duration-200 bg-(--success-bg) border-(--success-text)/20 text-(--success-text) hover:scale-110 hover:shadow-lg"
                            title="Approve"
                          >
                            <Check className="w-5 h-5" strokeWidth={3} />
                          </button>
                          
                          {/* Reject Btn */}
                          <button
                            onClick={() => handleReject(ticket._id)}
                            className="p-2.5 rounded-xl border transition-all duration-200 bg-(--color-error-bg) border-(--color-error-border) text-(--color-error-text) hover:scale-110 hover:shadow-lg"
                            title="Reject"
                          >
                            <X className="w-5 h-5" strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-(--text-muted) opacity-50 flex items-center justify-center gap-1">
                          <CheckCheck className="w-4 h-4" /> Done
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- Mobile Card View --- */}
          <div className="sm:hidden p-4 space-y-4 bg-(--bg-soft-accent)">
            {allTickets.map((ticket) => (
              <div key={ticket._id} className="p-5 rounded-3xl bg-(--bg-card) border border-(--border-card) shadow-sm space-y-4">
                
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-black text-(--text-main) text-lg line-clamp-2 leading-tight">
                    {ticket.title}
                  </h3>
                  <span className={`
                    shrink-0 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border
                    ${ticket.status === "pending" 
                      ? "bg-(--color-warn-bg) text-(--color-warn-text) border-(--color-warn-border)" 
                      : ticket.status === "accepted"
                      ? "bg-(--success-bg) text-(--success-text) border-(--success-text)/20"
                      : "bg-(--color-error-bg) text-(--color-error-text) border-(--color-error-border)"
                    }
                  `}>
                    {ticket.status}
                  </span>
                </div>

                {/* Vendor Row */}
                <div className="flex items-center gap-3 py-3 border-t border-b border-(--border-card)">
                  <div className="w-8 h-8 rounded-full bg-(--bg-soft-accent) flex items-center justify-center text-(--text-muted)">
                    <Store size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-(--text-muted) uppercase">Vendor</p>
                    <p className="font-bold text-(--text-main) text-sm">{ticket.vendorName}</p>
                  </div>
                </div>

                {/* Actions */}
                {ticket.status === "pending" ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleReject(ticket._id)}
                      className="w-full py-3 rounded-xl font-bold text-sm bg-(--color-error-bg) text-(--color-error-text) border border-(--color-error-border) active:scale-95 transition-transform"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAccept(ticket._id)}
                      className="w-full py-3 rounded-xl font-bold text-sm bg-(--success-bg) text-(--success-text) border border-(--success-text)/20 active:scale-95 transition-transform"
                    >
                      Approve
                    </button>
                  </div>
                ) : (
                  <div className="w-full py-2.5 text-center rounded-xl bg-(--bg-soft-accent) text-(--text-muted) text-xs font-bold border border-(--border-card)">
                    Action Completed
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-(--bg-card) border border-(--border-card) text-(--text-main) hover:border-(--grad-start) disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Prev
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`
                  w-10 h-10 rounded-xl text-xs font-bold transition-all border
                  ${page === i + 1
                    ? "bg-linear-to-r from-(--grad-start) to-(--grad-end) text-(--text-inv) border-transparent shadow-lg shadow-(--grad-start)/30"
                    : "bg-(--bg-card) border-(--border-card) text-(--text-main) hover:border-(--grad-start)"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-(--bg-card) border border-(--border-card) text-(--text-main) hover:border-(--grad-start) disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );

};

export default ManageTickets;
