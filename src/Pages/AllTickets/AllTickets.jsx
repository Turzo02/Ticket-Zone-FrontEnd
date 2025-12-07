import React from "react";
import { MdOutlineCategory } from "react-icons/md";
// Sample ticket data
const allTickets = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",
    title: "Sundarban Adventure Tour",
    icon:"🚀",
    from: "Khulna",
    to: "Sundarban",
    transport: "AC Tourist Boat",
    price: 129.5,
    quantity: 22,
    perks: ["Lunch Included", "Wildlife Guide", "River Cruise"],
    departure: "2025-12-12T08:30",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    title: "Cox’s Bazar Premium Bus",
    icon:"🚌",
    from: "Dhaka",
    to: "Cox’s Bazar",
    transport: "Volvo AC Bus",
    price: 18.99,
    quantity: 9,
    perks: ["WiFi", "Snacks", "Extra Legroom"],
    departure: "2025-12-10T06:45",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    title: "Saint Martin Cruise",
    icon:"🚀",
    from: "Teknaf",
    to: "Saint Martin",
    transport: "Luxury Sea Cruise",
    price: 49.99,
    quantity: 16,
    perks: ["Buffet Lunch", "Deck Access", "Live Music"],
    departure: "2025-12-15T09:00",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1521106581851-f48c707a43ef?w=600&q=80",
    title: "Dhaka City Helicopter Tour",
    icon:"✈️",
    from: "Dhaka",
    to: "Dhaka Skyline",
    transport: "Private Helicopter",
    price: 199.0,
    quantity: 4,
    perks: ["Aerial View", "Photo Session", "VIP Lounge Access"],
    departure: "2025-12-18T12:00",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80",
    title: "Rangamati Boat Ride",
    icon:"🚀",
    from: "Rangamati",
    to: "Kaptai Lake",
    transport: "Traditional Boat",
    price: 15.0,
    quantity: 30,
    perks: ["Life Jacket", "Hill View", "Free Water Bottle"],
    departure: "2025-12-11T07:30",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1500043203572-9c37f3a808c3?w=600&q=80",
    title: "Sylhet Express Train",
    icon:"🚆",
    from: "Dhaka",
    to: "Sylhet",
    transport: "Intercity Train (AC)",
    price: 12.75,
    quantity: 40,
    perks: ["Comfort Seat", "Clean Cabin", "Fast Route"],
    departure: "2025-12-13T10:15",
  },
];

const AllTickets = () => {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        All Available Tickets
      </h1>
      <div className="flex gap-6 text-3xl text-red-500 font-extrabold text-center mb-10">
        <h1>Filter tickets By Category</h1>
        <h1> Sort by price</h1>
        <h1>Search Functionality on from to </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allTickets.map((ticket) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(ticket.price);

          const departureDate = new Date(ticket.departure);
          const formattedDeparture = `${departureDate.toLocaleDateString()} ${departureDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

          return (
            <div
              key={ticket.id}
              className="
                bg-white rounded-xl shadow-xl overflow-hidden
                hover:scale-[1.03] transition duration-300 p-4
              "
            >
              {/* Header Image */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <h2 className="absolute bottom-2 left-3 right-3 text-white text-xl font-extrabold drop-shadow-md">
                  {ticket.title}
                </h2>
              </div>

              {/* Body */}
              <div className="pt-4 space-y-3">
                {/* Route */}
              <div className="flex items-center text-sm font-semibold text-gray-700 space-x-2">
  {/* From */}
  <div className="flex items-center space-x-1">
    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
    <span className="text-gray-600 font-medium">{ticket.from}</span>
  </div>

  {/* Arrow */}
  <svg
    className="w-5 h-5 text-purple-500 mx-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    />
  </svg>

  {/* To */}
  <div className="flex items-center space-x-1">
    <span className="text-gray-600 font-medium">{ticket.to}</span>
    <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
  </div>
</div>


                {/* Transport */}
                <div className="flex items-center text-sm font-semibold text-gray-700">
         {ticket.icon}
             
                  {ticket.transport}
                </div>

                {/* Price & Quantity */}
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-purple-700 font-bold">{formattedPrice}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-600">Available:</span>
                  <span className="text-purple-700 font-bold">{ticket.quantity}</span>
                </div>

                {/* Departure */}
                <div className="text-sm text-gray-600 font-medium">
                  <span className="font-semibold text-gray-700">Departure:</span> {formattedDeparture}
                </div>

                {/* Perks */}
                <div>
                  <h3 className="text-xs font-semibold uppercase text-purple-600 mb-1">
                    ✨ Perks
                  </h3>
                  <ul className="text-sm space-y-1 list-disc pl-5 text-gray-600">
                    {ticket.perks.map((perk, idx) => (
                      <li key={idx}>{perk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => alert(`Showing details for ${ticket.title}`)}
                className="
                  w-full mt-4 py-3 text-lg font-bold text-white rounded-lg
                  bg-linear-to-r from-pink-600 to-red-700
                  hover:from-pink-700 hover:to-red-800
                  shadow-lg shadow-pink-500/40
                  transition duration-200
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

export default AllTickets;
