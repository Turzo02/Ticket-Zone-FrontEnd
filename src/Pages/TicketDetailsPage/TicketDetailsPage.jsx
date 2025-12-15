import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
import TicketCountdown from "../../Components/TicketCountdown/TicketCountdown";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
const TicketDetailsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data: ticket,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ticket/${id}`);
      return res.data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBookingSubmit = (data) => {
    const quantity = Number(data.quantity);
    const price = Number(ticket.price);
    const bookingData = {
      ticketId: id,
      userEmail: user?.email,
      title: ticket.title,
      bookingQuantity: quantity,
      quantity: ticket.quantity,
      totalPrice: quantity * price,
      status: "pending",
      departure: ticket.departure,
    };

    // post the data to database
    axiosSecure
      .post("/bookings", bookingData)
      .then((res) => {
        console.log("after post data", res.data);
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Ticket Added!",
          text: "Your ticket purchase has been successfully posted",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while booking your ticket!",
          confirmButtonText: "OK",
        });
      });
    setModalOpen(false);
  };

  if (isLoading) return <SwappingDotLoader></SwappingDotLoader>;
  if (isError) return <p className="text-red-600">Error loading ticket</p>;
  console.log(ticket.quantity);
  return (
    // DaisyUI-styled Ticket Details Page
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
<div className="text-left py-6 px-4 border-b border-base-300 space-y-2">
  <h1 className="
    text-3xl md:text-4xl 
    font-extrabold 
    bg-clip-text text-transparent 
    bg-linear-to-r from-violet-600 to-fuchsia-500
    tracking-tight
  ">
    Ticket Details
  </h1>
  <p className="text-base text-base-content/70">
    View all specific information regarding your selected ticket.
  </p>
</div>
      {/* Header Image */}
      <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-6 shadow-xl shadow-base-300/50">
        <img
          src="https://api.dicebear.com/7.x/notionists/svg?seed=Static_User_001"
          alt="Ticket Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
        <h1 className="absolute bottom-4 left-6 text-base-content text-3xl sm:text-4xl font-extrabold drop-shadow-lg">
          {ticket.title}
        </h1>
      </div>

      {/* Ticket Details Card */}
      <div className="bg-base-200 rounded-lg shadow-lg p-6 space-y-4 text-base-content">
        <div className="flex flex-wrap justify-between items-center">
          <div className="font-semibold">
            <span className="text-base-content/60">From:</span> {ticket.from}
            <span className="mx-2 text-primary">→</span>
            <span className="text-base-content/60">To:</span> {ticket.to}
          </div>
          <div className="font-semibold badge badge-outline badge-primary">
            {ticket.transportType}
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center border-t border-base-300 pt-4">
          <span className="font-medium">Price:</span>
          <span className="text-info text-2xl font-bold">${ticket.price}</span>
        </div>

        {/* Available Quantity */}
        <div className="flex justify-between items-center">
          <span className=" font-medium">Available:</span>
          <span className="text-info text-2xl font-bold">
            {ticket.quantity}
          </span>
        </div>

        <div className="px-2 py-1 flex items-center gap-6 bg-primary/10  rounded-lg font-semibold text-right whitespace-nowrap">
          📅 <span className="text-base-content/80">Departure:</span>{" "}
          {new Date(ticket.departure).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        {/* Countdown */}
        <div className="font-medium pt-2">
          <span className="text-base-content/80"></span>{" "}
          <TicketCountdown departure={ticket.departure} />
        </div>

        {/* Perks */}
        <div className="flex flex-col pt-4">
          <h3 className="text-xs font-semibold uppercase text-info mb-2">
            ✨ Perks
          </h3>
          <ul className="flex flex-wrap gap-2 text-sm text-base-content/90 overflow-x-auto whitespace-nowrap">
            {ticket.perks.map((perk, i) => (
              <li
                key={i}
                className="badge badge-lg bg-base-300 px-3 py-1 rounded-lg shrink-0"
              >
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Book Now Button */}
        <button
          disabled={ticket.quantity === 0}
          onClick={() => setModalOpen(true)}
          className={`
  w-full mt-4 py-3 text-lg font-bold
  btn rounded lg
  shadow-lg
  ${
    ticket.quantity === 0
      ? "btn-disabled bg-base-300 text-base-content/50 cursor-not-allowed"
      : "bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-none text-white shadow-lg shadow-purple-500/30"
  }
`}
        >
          {ticket.quantity === 0 ? "Sold Out" : "Book Now"}
        </button>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="card bg-base-100 rounded-lg shadow-2xl w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 btn btn-ghost btn-sm text-base-content/60"
            >
              &times;
            </button>

            <h2 className="text-2xl font-extrabold mb-4 text-base-content">
              Book Tickets
            </h2>

            <form
              onSubmit={handleSubmit(handleBookingSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block font-medium mb-1 text-base-content">
                  Quantity
                </label>

                <input
                  type="number"
                  defaultValue={1}
                  className="input input-bordered w-full focus:input-primary"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: {
                      value: 1,
                      message: "Minimum 1 ticket required",
                    },
                    max: {
                      value: ticket.quantity,
                      message: `Maximum ${ticket.quantity} tickets available`,
                    },
                  })}
                />

                {errors.quantity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                // Using Success for a confirmation button
                className="btn w-full py-3 text-lg font-bold border-none text-white bg-linear-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 shadow-lg shadow-green-500/40"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetailsPage;
