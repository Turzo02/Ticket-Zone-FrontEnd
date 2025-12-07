import React from "react";

const tickets = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=700&h=500&auto=format",
    title: "City Express Bus Ticket",
    price: 25.5,
    quantity: 30,
    transport: "AC Bus",
    perks: ["Free WiFi", "Comfort Seat", "Water Bottle"],
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1501706362039-c06b2d715385?w=700&h=500&auto=format",
    title: "Bangladesh Railway Ticket",
    price: 18,
    quantity: 50,
    transport: "Train (Sofa Seat)",
    perks: ["Charging Port", "Clean Cabin", "Panoramic View"],
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=700&h=500&auto=format",
    title: "Domestic Flight Ticket",
    price: 129,
    quantity: 12,
    transport: "Airplane",
    perks: ["Snacks", "Priority Boarding", "Window View"],
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=700&h=500&auto=format",
    title: "Luxury Launch Cabin",
    price: 65,
    quantity: 8,
    transport: "Launch",
    perks: ["AC Cabin", "Buffet Dinner", "Rooftop View"],
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=700&h=500&auto=format",
    title: "Tourist Microbus Service",
    price: 40,
    quantity: 20,
    transport: "Microbus",
    perks: ["Comfort Ride", "Music System", "AC"],
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&h=500&auto=format",
    title: "Hill Track Tour Jeep",
    price: 55,
    quantity: 10,
    transport: "Jeep",
    perks: ["Off-Road", "Open Roof", "Guide Included"],
  },
];

const Advertisement = () => {
  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">
        Advertisement Tickets
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(ticket.price);

          return (
            <div
              key={ticket.id}
              className="
                bg-white rounded-xl shadow-xl 
                p-4 overflow-hidden
                transform hover:scale-[1.02]
                transition duration-300 ease-in-out
              "
            >
              {/* Top section */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

                <h2 className="absolute bottom-0 w-full p-3 text-xl font-bold text-white drop-shadow-md">
                  {ticket.title}
                </h2>
              </div>

              {/* Body */}
              <div className="pt-4 space-y-4">

                {/* Price */}
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Price (Per Unit)
                  </p>
                  <span className="text-2xl font-bold bg-linear-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
                    {formattedPrice}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Available:</span>
                  <span className="text-purple-700 font-bold">
                    {ticket.quantity}
                  </span>
                </div>

                {/* Transport */}
                <div className="flex items-center text-sm font-semibold text-gray-700">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                  {ticket.transport}
                </div>

                {/* Perks */}
                <div>
                  <h3 className="text-xs font-semibold uppercase text-purple-600 mb-1">
                    ✨ Perks
                  </h3>
                  <ul className="text-sm space-y-1 list-disc pl-5 text-gray-600">
                    {ticket.perks.map((perk, index) => (
                      <li key={index}>{perk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button */}
              <button
                className="
                  mt-5 w-full py-3 text-lg font-bold uppercase
                  rounded-lg 
                  bg-linear-to-r from-pink-600 to-red-700
                  text-white shadow-lg shadow-pink-500/40
                  transition duration-200
                  hover:from-pink-700 hover:to-red-800
                  focus:outline-none focus:ring-4 focus:ring-pink-300
                "
              >
                See Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Advertisement
