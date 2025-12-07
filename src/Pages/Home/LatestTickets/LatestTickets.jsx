import React from "react";

const tickets = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80",
    title: "Sundarban Adventure Tour",
    price: 129.5,
    quantity: 22,
    transport: "AC Tourist Boat",
    perks: ["Lunch Included", "Wildlife Guide", "River Cruise"],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    title: "Cox’s Bazar Premium Bus",
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * LatestTickets
 * 
 * A component that renders a list of latest tickets,
 * each with its own card and details.
 * 
 * @returns {React.ReactElement} The JSX element representing the LatestTickets component.
 * 
 * @example
 * <LatestTickets />
 */
/*******  1b3cfa0a-a5fc-4774-be81-6b22d03b10c1  *******/    price: 18.99,
    quantity: 9,
    transport: "Volvo AC Bus",
    perks: ["WiFi", "Snacks", "Extra Legroom"],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    title: "Saint Martin Cruise",
    price: 49.99,
    quantity: 16,
    transport: "Luxury Sea Cruise",
    perks: ["Buffet Lunch", "Deck Access", "Live Music"],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1521106581851-f48c707a43ef?w=600&q=80",
    title: "Dhaka City Helicopter Tour",
    price: 199.0,
    quantity: 4,
    transport: "Private Helicopter",
    perks: ["Aerial View", "Photo Session", "VIP Lounge Access"],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80",
    title: "Rangamati Boat Ride",
    price: 15.0,
    quantity: 30,
    transport: "Traditional Boat",
    perks: ["Life Jacket", "Hill View", "Free Water Bottle"],
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1500043203572-9c37f3a808c3?w=600&q=80",
    title: "Sylhet Express Train",
    price: 12.75,
    quantity: 40,
    transport: "Intercity Train (AC)",
    perks: ["Comfort Seat", "Clean Cabin", "Fast Route"],
  },
];

const AdvertisementTickets = () => {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Advertisement Tickets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(ticket.price);

          return (
            <div
              key={index}
              className="
                bg-white
                rounded-xl
                shadow-xl
                overflow-hidden
                hover:scale-[1.03]
                transition
                duration-300
                p-4
              "
            >
              {/* Header */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src={ticket.imageSrc}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <h2 className="absolute bottom-2 left-3 right-3 text-white text-2xl font-extrabold drop-shadow-xl">
                  {ticket.title}
                </h2>
              </div>

              {/* Body */}
              <div className="pt-4 space-y-4">
                {/* Price */}
                <div className="flex justify-between border-b pb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Price (Per Unit)
                  </p>
                  <span className="text-3xl font-bold bg-linear-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
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
                    {ticket.perks.map((perk, i) => (
                      <li key={i}>{perk}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => alert(`Showing details for ${ticket.title}`)}
                className="
                  w-full mt-5 py-3 text-lg font-bold text-white rounded-lg
                  bg-linear-to-r from-pink-600 to-red-700
                  hover:from-pink-700 hover:to-red-800
                  shadow-lg shadow-pink-500/40
                  transition
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

export default AdvertisementTickets;
