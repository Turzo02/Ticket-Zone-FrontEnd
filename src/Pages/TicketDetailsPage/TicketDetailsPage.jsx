import React, { useState, useEffect } from "react";

const ticketData = {
  id: 1,
  image:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",
  title: "Sundarban Adventure Tour",
  from: "Khulna",
  to: "Sundarban",
  transport: "AC Tourist Boat",
  price: 129.5,
  quantity: 22,
  perks: ["Lunch Included", "Wildlife Guide", "River Cruise"],
  departure: "2025-12-12T08:30",
};
  const departureDate = new Date(ticketData.departure);

const TicketDetailsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [countdown, setCountdown] = useState("");


  // Countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = departureDate - now;
      if (diff <= 0) {
        setCountdown("Departed");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(ticketData.price);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(
      `Successfully booked ${selectedQuantity} ticket(s) for ${ticketData.title}!`
    );
    setModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      {/* Header Image */}
      <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-6 shadow-lg">
        <img
          src={ticketData.image}
          alt={ticketData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
        <h1 className="absolute bottom-4 left-6 text-white text-3xl sm:text-4xl font-extrabold drop-shadow-lg">
          {ticketData.title}
        </h1>
      </div>

      {/* Ticket Details */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-gray-700 font-semibold">
            <span className="text-gray-500">From:</span> {ticketData.from}{" "}
            <span className="mx-2">→</span>
            <span className="text-gray-500">To:</span> {ticketData.to}
          </div>
          <div className="text-gray-700 font-semibold">{ticketData.transport}</div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Price:</span>
          <span className="text-purple-700 font-bold">{formattedPrice}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Available:</span>
          <span className="text-purple-700 font-bold">{ticketData.quantity}</span>
        </div>

        <div className="text-gray-600 font-medium">
          <span className="text-gray-700 font-semibold">Departure:</span>{" "}
          {departureDate.toLocaleDateString()} {departureDate.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
        </div>

        <div className="text-gray-600 font-medium">
          <span className="text-gray-700 font-semibold">Countdown:</span>{" "}
          <span className="text-red-600 font-bold">{countdown}</span>
        </div>

        <div>
          <h3 className="text-purple-600 font-semibold uppercase mb-2">✨ Perks</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {ticketData.perks.map((perk, idx) => (
              <li key={idx}>{perk}</li>
            ))}
          </ul>
        </div>

        {/* Book Now Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-full mt-4 py-3 text-lg font-bold text-white rounded-lg
            bg-linear-to-r from-pink-600 to-red-700
            hover:from-pink-700 hover:to-red-800
            shadow-lg shadow-pink-500/40 transition duration-200"
        >
          Book Now
        </button>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="glass rounded-xl shadow-lg w-11/12 max-w-md p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-extrabold mb-4">Book Tickets</h2>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block  font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max={ticketData.quantity}
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 text-lg font-bold  rounded-lg
                  bg-linear-to-r from-green-500 to-teal-600
                  hover:from-green-600 hover:to-teal-700
                  shadow-lg shadow-green-400/40 transition duration-200"
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
