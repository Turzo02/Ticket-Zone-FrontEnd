import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import TicketCountdown from '../../../../Components/TicketCountdown/TicketCountdown';
import { Link } from 'react-router';

const TicketCard = ({ ticket }) => {
    const [isDeparted, setIsDeparted] = useState(false);
    
    const isTicketAccepted = ticket.status === "accepted";
    const isPurchasable = isTicketAccepted && !isDeparted;

    const handleDepartureComplete = useCallback((completedStatus) => {
        setIsDeparted(completedStatus);
    }, []);

    const buttonClasses = `w-full mt-4 py-3 text-lg font-bold text-white rounded-lg text-center block transition-all ${
        isPurchasable
            ? "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-lg shadow-green-500/40"
            : "bg-gray-400 cursor-not-allowed shadow-none"
    }`;

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

    return (
        <div className="flex flex-col rounded-xl border border-gray-200 shadow-sm dark:border-gray-800 dark:bg-card-dark overflow-hidden bg-white dark:bg-gray-900">
            <img
                className="h-40 w-full object-cover"
                src="https://images.unsplash.com/photo-1501706362039-c06b2d715385?w=700&h=500&auto=format"
                alt={ticket.title || "Ticket Image"}
            />
            <div className="flex flex-1 flex-col p-4">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {ticket.title}
                </h4>
                <div className="mt-4 space-y-2 text-sm">
                    {/* Total Price */}
                    <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Total Price:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">${ticket.totalPrice}</span>
                    </div>

                    {/* Departure Time */}
                    <div className="text-gray-600 font-medium">
                        <div className="px-2 py-1 bg-indigo-300/50 text-indigo-800 rounded-lg font-semibold flex items-center justify-between">
                            <span className="text-gray-700">Departure:</span>
                            {formattedDeparture}
                        </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="text-gray-600 font-medium">
                        <TicketCountdown
                            departure={ticket.departure}
                            onCountdownComplete={handleDepartureComplete}
                        />
                    </div>

                    {/* Ticket Status */}
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">Ticket Status:</span>
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                isTicketAccepted
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : ticket.status === "pending"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                        >
                            {ticket.status}
                        </span>
                    </div>

                    {/* Payment Status */}
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">Payment Status:</span>
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                ticket.paymentStatus === "paid"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                        >
                            {ticket.paymentStatus || "unpaid"}
                        </span>
                    </div>
                </div>

                {/* Buy Ticket Button/Link Logic */}
                <div className="mt-auto">
                    {isPurchasable ? (
                        <Link to={`/payment/${ticket._id}`} className={buttonClasses}>
                            Buy Ticket
                        </Link>
                    ) : (
                        <button disabled className={buttonClasses}>
                            {isDeparted ? "Already Departed" : "Not Applicable"}
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