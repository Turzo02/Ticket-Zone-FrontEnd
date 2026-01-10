import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
import TicketCountdown from "../../Components/TicketCountdown/TicketCountdown";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { 
  MapPin, 
  Calendar, 
  Sparkles, 
  X, 
  MoveRight, 
  Tag, 
  Clock 
} from "lucide-react";

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
      from: ticket.from,
      to: ticket.to,
      photo: ticket.photo,
    };

    // Make the POST request
    axiosSecure
      .post("/bookings", bookingData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Ticket Added!",
          text: "Your ticket purchase has been successfully posted",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while booking your ticket!",
          confirmButtonText: "OK",
        });
      });
    setModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-(--bg-page)">
        <SwappingDotLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-(--bg-page)">
        <p className="text-red-500 font-bold bg-(--bg-card) px-6 py-3 rounded-xl border border-(--border-card)">
          Error loading ticket details.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--bg-page) text-(--text-main) transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Page Header */}
        <div className="text-left py-6 mb-6 border-b border-(--border-card) space-y-2">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-(--grad-start) to-(--grad-end) tracking-tight">
            Ticket Details
          </h1>
          <p className="text-base text-(--text-muted)">
            View all specific information regarding your selected ticket.
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-(--grad-start)/10">
          <img
            src={ticket.photo}
            alt="Ticket Header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
             <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                <Tag size={12} />
                {ticket.transportType}
             </div>
             <h1 className="text-white text-3xl sm:text-5xl font-black drop-shadow-xl leading-tight">
               {ticket.title}
             </h1>
          </div>
        </div>

        {/* Main Details Card */}
        <div className="bg-(--bg-card) rounded-3xl border border-(--border-card) p-6 sm:p-10 shadow-lg">
          
          {/* Route Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center  gap-3 text-lg sm:text-xl font-bold text-(--text-main)">
              <div className="flex items-center gap-2 ">
                 <MapPin className="text-(--grad-start)" size={20} />
                 <spa className="line-clamp-1">{ticket.from}</spa>
              </div>
              <MoveRight className="text-(--text-muted)" size={20} />
              <div className="flex items-center gap-2">
                 <MapPin className="text-(--grad-end)" size={20} />
                 <span className="line-clamp-1">{ticket.to}</span>
              </div>
            </div>
            
            <div className="px-4 py-2 rounded-xl bg-(--bg-soft-accent) text-(--text-main) font-bold border border-(--border-card)">
              {ticket.transportType}
            </div>
          </div>

          {/* Pricing & Availability Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-6 bg-(--bg-soft-accent) rounded-2xl border border-(--border-card)">
             
             {/* Price */}
             <div className="flex justify-between items-center pb-4 sm:pb-0 sm:border-r border-(--border-card) sm:pr-6 border-b sm:border-b-0">
                <span className="font-medium text-(--text-muted)">Price per Unit</span>
                <span className="text-3xl font-black text-(--text-main) tracking-tight">
                   ${ticket.price}
                </span>
             </div>

             {/* Quantity */}
             <div className="flex justify-between items-center sm:pl-6">
                <span className="font-medium text-(--text-muted)">Seats Available</span>
                <span className={`text-2xl font-bold ${ticket.quantity < 5 ? 'text-red-500' : 'text-(--success-text)'}`}>
                   {ticket.quantity}
                </span>
             </div>
          </div>

          {/* Timing Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
             <div className="flex items-center gap-3 px-5 py-3 bg-(--input-bg) border border-(--input-border) rounded-xl font-semibold text-(--text-main) w-full sm:w-auto">
                <Calendar className="text-(--grad-start)" size={18} />
                <span>
                   {new Date(ticket.departure).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                   })}
                </span>
             </div>
             <div className="flex items-center gap-3 px-5 py-3 bg-(--input-bg) border border-(--input-border) rounded-xl font-semibold text-(--text-main) w-full sm:w-auto">
                <Clock className="text-(--grad-start)" size={18} />
                <span>
                   {new Date(ticket.departure).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                   })}
                </span>
             </div>
             
             {/* Countdown Component Wrapper */}
             <div className="ml-auto text-(--text-muted) font-medium text-sm">
                <TicketCountdown departure={ticket.departure} />
             </div>
          </div>

          {/* Perks Section */}
          <div className="mb-10">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-(--text-muted) mb-4">
              <Sparkles size={14} className="text-(--grad-start)" />
              Included Perks
            </h3>
            <ul className="flex flex-wrap gap-2">
              {ticket.perks.map((perk, i) => (
                <li
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-(--bg-badge) text-(--text-main) border border-(--border-card)"
                >
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <button
            disabled={
              ticket.quantity === 0 || new Date(ticket.departure) < new Date()
            }
            onClick={() => setModalOpen(true)}
            className={`
              w-full py-4 text-lg font-bold rounded-xl shadow-lg transition-all duration-300
              ${
                ticket.quantity === 0 || new Date(ticket.departure) < new Date()
                  ? "bg-(--bg-soft-accent) text-(--text-muted) cursor-not-allowed"
                  : "bg-linear-to-r from-(--grad-start) to-(--grad-end) text-(--text-inv) shadow-(--grad-start)/30 hover:shadow-(--grad-start)/50 hover:scale-[1.01]"
              }
            `}
          >
            {ticket.quantity === 0 || new Date(ticket.departure) < new Date()
              ? "Booking Closed"
              : "Book Now"}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-(--bg-card) rounded-2xl shadow-2xl border border-(--border-card) p-8 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-(--bg-soft-accent) text-(--text-muted) transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-black mb-6 text-(--text-main)">
              Confirm Booking
            </h2>

            <form onSubmit={handleSubmit(handleBookingSubmit)} className="space-y-6">
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-(--text-muted) uppercase tracking-wide">
                  Number of Seats
                </label>
                <input
                  type="number"
                  defaultValue={1}
                  className="w-full px-4 py-3 rounded-xl bg-(--input-bg) border border-(--input-border) text-(--text-main) font-bold text-lg focus:ring-2 focus:ring-(--input-focus) focus:border-transparent outline-none transition-all"
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
                  <p className="text-red-500 text-sm font-medium mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Modal Action */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-lg text-(--text-inv) bg-linear-to-r from-(--grad-start) to-(--grad-end) shadow-lg shadow-(--grad-start)/20 hover:shadow-(--grad-start)/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                Confirm & Pay
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetailsPage;
