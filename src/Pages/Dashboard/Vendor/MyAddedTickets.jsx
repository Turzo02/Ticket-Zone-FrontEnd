import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { ArrowUpDown, Filter, MoveRight } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const MyAddedTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  ///ticket/vendor/:vendorEmail

  const {
    data: tickets = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["MyAddedTickets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/ticket/vendor/${user.email}`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this ticket. Once deleted, it cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/ticket/${id}`);
        refetch();

        Swal.fire({
          title: "Deleted!",
          text: "Your ticket has been successfully deleted, along with all associated bookings.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Failed!",
          text: "An error occurred while deleting the ticket.",
          icon: "error",
        });
        console.error("Delete error:", error);
      }
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
    <div className="sm:p-8 max-w-7xl mx-auto bg-(--bg-soft-accent)">
        {/* Header */}
        <div className="text-center pb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
            My Added Tickets
          </h1>
        </div>
      {/* Controls Container */}

      {/* Ticket Grid */}
      {tickets.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg border border-dashed border-base-200">
          <h3 className="text-2xl font-bold text-base-content/50">
            No tickets found
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map((ticket) => {
            const formattedPrice = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(ticket.price);

            return (
              <div
                key={ticket._id}
                className="bg-base-200 rounded-lg shadow-xl overflow-hidden hover:scale-[1.03] transition duration-300 p-4"
              >
                {/* Header */}
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img
                    src={ticket.photo}
                    alt={ticket.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Using gradient utility for overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                  <h2 className="absolute bottom-2 left-3 right-3 text-white text-xl font-extrabold truncate">
                    {ticket.title}
                  </h2>
                </div>

                {/* Body */}
                <div className="pt-4 space-y-3 ">
                  <div className="flex items-center text-sm font-semibold space-x-2">
                    <div className="flex w-full justify-between items-center">
                      <div className="flex items-center space-x-1">
                        {/* Start Point */}
                        <span className="w-3 h-3 rounded-full bg-success"></span>
                        <span className="max-w-25 text-base-content font-bold text-md">
                          {ticket.from}
                        </span>
                      </div>

                      <MoveRight className="text-base-content/80" />

                      <div className="flex items-center space-x-1">
                        <span className="text-base-content font-bold text-md">
                          {ticket.to}
                        </span>
                        <span className="w-3 h-3 rounded-full bg-error"></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm font-semibold text-base-content/80">
                    {ticket.icon}
                    {ticket.transport}
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-base-content/80">Price:</span>
                    <span className="text-accent font-bold">
                      {formattedPrice}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-base-content/80">Available:</span>
                    <span className="text-info font-bold">
                      {ticket.quantity}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-xs font-semibold uppercase text-base-content mb-4">
                      Status :{" "}
                      {ticket.status === "pending" ? (
                        <span className="text-warning badge badge-outline badge-warning ml-2">
                          Pending
                        </span>
                      ) : ticket.status === "accepted" ? (
                        <span className="text-success badge badge-outline badge-success ml-2">
                          Approved
                        </span>
                      ) : (
                        <span className="text-error badge badge-outline badge-error ml-2">
                          Rejected
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                {/* Action Buttons */}
                {ticket.status === "rejected" ? (
                  <button
                    className="
    btn btn-block btn-lg text-white border-none transition
    bg-linear-to-r from-red-700 via-red-600 to-rose-600
    shadow-lg shadow-red-700/50
    flex items-center gap-2
    
    cursor-not opacity-50!
  "
                    disabled
                  >
                    Rejected
                  </button>
                ) : (
                  <Link
                    to={`/dashboard/update-ticket-details/${ticket._id}`}
                    className="
                btn btn-block btn-lg text-white border-none transition
                    bg-linear-to-r from-emerald-400 via-green-500 to-green-700
                    hover:from-emerald-500 hover:to-green-800
                    shadow-lg shadow-green-600/40
                    flex items-center gap-2
    "
                  >
                    Update
                  </Link>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(ticket._id)}
                  disabled={ticket.status === "rejected"}
                  className={`
    w-full mt-4 text-lg font-bold block transition duration-300 border-none
    ${
      ticket.status === "rejected"
        ? "btn btn-disabled bg-base-200 text-base-content/70 shadow-none cursor-not-allowed"
        : "btn btn-block btn-lg text-white border-none transition  bg-linear-to-r from-red-700 via-red-600 to-rose-600 hover:from-red-800 hover:to-rose-700 shadow-lg shadow-red-700/50 flex items-center gap-2"
    }
  `}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
