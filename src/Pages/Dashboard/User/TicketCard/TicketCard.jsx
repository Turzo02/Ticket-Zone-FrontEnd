import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import TicketCountdown from "../../../../Components/TicketCountdown/TicketCountdown";
import useAxiosSecure from "../../../../Hooks/useAxiousSecure";

const TicketCard = ({ ticket }) => {
  const [isDeparted, setIsDeparted] = useState(false);
  const axiosSecure = useAxiosSecure();

  const isTicketAccepted = ticket.status === "accepted";
  const isPurchasable = isTicketAccepted && !isDeparted;

  const handleDepartureComplete = useCallback((completedStatus) => {
    setIsDeparted(completedStatus);
  }, []);


  const buttonClasses = `btn w-full mt-2 text-lg font-bold transition-all ${
    isPurchasable
      ? "btn-primary text-primary-content shadow-lg shadow-primary/40 hover:shadow-xl"
      : "btn-disabled bg-base-300 text-base-content/60 shadow-none cursor-not-allowed"
  }`;
  
  // Paid Button: Success color, disabled state
  const paidButtonClasses =
    "btn w-full mt-2 text-lg font-bold btn-success btn-outline cursor-default shadow-md";

  // Safe date formatting
  const formattedDeparture = ticket.departure
    ? new Date(ticket.departure).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date N/A";

  const handlePayment = async (id) => {
    const ticketInfo = {
      totalPrice: ticket.totalPrice,
      title: ticket.title,
      userEmail: ticket.userEmail,
      id: id,
      ticketId: ticket.ticketId,
      bookingQuantity: ticket.bookingQuantity,
      quantity: ticket.quantity,
    };

    // Assuming axiosSecure is configured correctly for this endpoint
    const res = await axiosSecure.post("/payment-checkout-session", ticketInfo);
    window.location.href = res.data.url;
  };
  
  // Status Badge Logic
const getTicketStatusBadge = (status) => {
  switch (status) {
    case "accepted":
      return "bg-gradient-to-r from-green-400 to-green-700 text-white ";
    case "pending":
      return "bg-gradient-to-r from-orange-400  to-orange-700 text-white ";
    case "rejected":
      return "bg-gradient-to-r from-red-700  to-rose-600 text-white ";
    default:
      return "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-none";
  }
};


const getPaymentStatusBadge = (status) => {
  if (status === "paid") {
    return "bg-gradient-to-r from-green-400  to-green-700 text-white ";
  }
  return "bg-gradient-to-r from-amber-500 to-orange-500 text-white ";
};


  return (
    <div className="flex flex-col rounded-2xl border border-base-300 shadow-xl overflow-hidden bg-base-200 text-base-content">
      <img
        className="h-40 w-full object-cover"
        src={ticket.photo}
        alt={ticket.title || "Ticket Image"}
      />
      <div className="flex flex-1 flex-col p-4">
        <h4 className="text-xl font-extrabold text-base-content mb-3">
          {ticket.title}
        </h4>
        <div className=" space-y-4 text-sm">
          {/* Total Price */}
          <div className="flex justify-between items-center border-b border-base-300">
            <span className="text-base-content/80 font-medium">
              Total Price:
            </span>
            <span className="text-xl font-extrabold text-success">
              ${ticket.totalPrice}
            </span>
          </div>

          {/* Departure Time */}
          <div className="font-medium">
            <div className="py-2 bg-primary/10 text-primary rounded-lg font-bold flex flex-wrap items-center justify-center gap-2">
              <span className="text-base-content/90">Departure :</span>
              <span className="text-sm">{formattedDeparture}</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="font-medium">
            <TicketCountdown
              departure={ticket.departure}
              onCountdownComplete={handleDepartureComplete}
            />
          </div>

          {/* Ticket Status */}
          <div className="flex justify-between items-center border-t border-base-300">
            <span className="text-base-content/80">
              Ticket Status:
            </span>
            <span
              className={`badge badge-lg font-semibold ${getTicketStatusBadge(ticket.status)}`}
            >
              {ticket.status}
            </span>
          </div>

          {/* Payment Status */}
          <div className="flex justify-between items-center">
            <span className="text-base-content/80">
              Payment Status:
            </span>
            <span
              className={`badge badge-lg font-semibold ${getPaymentStatusBadge(ticket.paymentStatus)}`}
            >
              {ticket.paymentStatus || "unpaid"}
            </span>
          </div>
        </div>

        {/* Action Button Area */}
        <div>
          {ticket.paymentStatus === "paid" ? (
            <button className={paidButtonClasses}>
              Ticket Purchased !
            </button>
          ) : isPurchasable ? (
            <button 
              onClick={() => handlePayment(ticket._id)} 
              className={buttonClasses}
            >
              Buy Ticket Now
            </button>
          ) : (
            <button disabled className={buttonClasses}>
              {ticket.status === "pending" ? "Waiting for Approval" :
               isDeparted ? "Already Departed" : 
               "Not Available"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

TicketCard.propTypes = {
  ticket: PropTypes.object.isRequired,
};

export default TicketCard;