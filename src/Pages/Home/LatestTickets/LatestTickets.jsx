import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { Link } from "react-router";

const LatestTickets = () => {
  const axiosSecure = useAxiosSecure();
  const displayLimit = 6;
  const {
    data: tickets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/ticket?limit=10000");
      const ticketArray = data.tickets;
      const sortedTickets = ticketArray.sort((a, b) => {
        const dateA = new Date(a.departure);
        const dateB = new Date(b.departure);
        return dateA - dateB;
      });
      return sortedTickets.slice(0, displayLimit);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <SwappingDotLoader></SwappingDotLoader>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load tickets</p>;
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Latest Tickets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_006"
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
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 py-2 sm:py-3  rounded-lg ">
                  {/* Left: Emoji + Transport Type */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">
                      {ticket.transportType === "Train" && "🚆"}
                      {ticket.transportType === "Bus" && "🚌"}
                      {ticket.transportType === "Flight" && "✈️"}
                      {ticket.transportType === "Ship" && "🚢"}
                      {!["Train", "Bus", "Flight", "Ship"].includes(
                        ticket.transportType
                      ) && "🛺"}
                    </span>
                    <span>{ticket.transportType}</span>
                  </div>

                  {/* Right: Departure Date */}
                  <div className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-semibold text-right whitespace-nowrap">
                    📅{" "}
                    {new Date(ticket.departure).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                {/* Perks */}
                <div className="flex flex-col">
                  <h3 className="text-xs font-semibold uppercase text-purple-600 mb-1">
                    ✨ Perks
                  </h3>
                  <ul className="flex flex-wrap gap-2 text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
                    {ticket.perks.map((perk, i) => (
                      <li
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded-full shrink-0"
                      >
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Button */}
              <Link to={`/all-tickets/${ticket._id}`}>
                <button
                  className="
                   w-full mt-4 cursor-pointer py-3 text-lg font-bold text-white rounded-lg
                   bg-linear-to-r from-pink-600 to-red-700
                   hover:from-pink-700 hover:to-red-800
                   shadow-lg shadow-pink-500/40
                   transition duration-200
                 "
                >
                  See Details
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestTickets;
