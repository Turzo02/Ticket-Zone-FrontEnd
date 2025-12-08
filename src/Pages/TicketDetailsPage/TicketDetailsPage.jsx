import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../Components/Loading/SwappingDotLoader";
import TicketCountdown from "../../Components/TicketCountdown/TicketCountdown";
const TicketDetailsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  

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

  if (isLoading) return <SwappingDotLoader></SwappingDotLoader>;
  if (isError) return <p className="text-red-600">Error loading ticket</p>;

  console.log(ticket);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header Image */}
      <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-6 shadow-lg">
        <img
          src="https://api.dicebear.com/7.x/notionists/svg?seed=Static_User_001"
          alt="Ticket Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
        <h1 className="absolute bottom-4 left-6 text-white text-3xl sm:text-4xl font-extrabold drop-shadow-lg">
          Amazing Concert Ticket
        </h1>
      </div>

      {/* Ticket Details */}
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-gray-700 font-semibold">
            <span className="text-gray-500">From:</span> New York{" "}
            <span className="mx-2">→</span>
            <span className="text-gray-500">To:</span> Los Angeles
          </div>
          <div className="text-gray-700 font-semibold">Flight</div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Price:</span>
          <span className="text-purple-700 font-bold">$299</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Available:</span>
          <span className="text-purple-700 font-bold">42</span>
        </div>

        <div className="text-gray-600 font-medium">
          <div className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-semibold flex gap-4 whitespace-nowrap">
            📅 <span className="text-gray-700 font-semibold">Departure:</span>{" "}
            {new Date(ticket.departure).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <div className="text-gray-600 font-medium">
          <span className="text-red-600 font-bold">
            {" "}
            <TicketCountdown departure={ticket.departure} />
          </span>
        </div>

        <div>
          <h3 className="text-purple-600 font-semibold uppercase mb-2">
            ✨ Perks
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Free Wi-Fi</li>
            <li>Complimentary Snacks</li>
            <li>Priority Boarding</li>
          </ul>
        </div>

        {/* Book Now Button */}
        <button
          className="w-full mt-4 py-3 text-lg font-bold text-white rounded-lg
        bg-linear-to-r from-pink-600 to-red-700
        hover:from-pink-700 hover:to-red-800
        shadow-lg shadow-pink-500/40 transition duration-200 cursor-pointer"
        >
          Book Now
        </button>
      </div>
      {/* Booking Modal */}
      {/* {modalOpen && (
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
      )} */}
    </div>
  );
};

export default TicketDetailsPage;
