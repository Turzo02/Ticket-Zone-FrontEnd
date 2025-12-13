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
// New DaisyUI-styled component
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-base-content">
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
              className={`
                bg-base-200 
                shadow-xl 
                overflow-hidden 
                hover:scale-[1.02] 
                transition 
                duration-300 
                p-4 
                rounded-lg
              `}
            >
              {/* Header */}
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Data_User_006"
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <h2 className="absolute bottom-2 left-3 right-3 text-white  text-2xl font-extrabold drop-shadow-xl">
                  {ticket.title}
                </h2>
              </div>

              {/* Body */}
              <div className="pt-4 space-y-4">
                {/* Price */}
                <div className="flex justify-between border-b border-base-300 pb-2">
                  <p className="text-xs font-semibold text-base-content/60 uppercase">
                    Price (Per Unit)
                  </p>
                  <span className="text-3xl font-bold text-error">
                    {formattedPrice}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex justify-between text-sm font-medium text-base-content">
                  <span className="text-base-content/80">Available:</span>
                  <span className="text-primary font-bold">
                    {ticket.quantity}
                  </span>
                </div>

                {/* Transport */}
                <div className="flex justify-between items-center text-sm font-medium text-base-content py-2 rounded-lg ">
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

                  <div className="px-2 py-1 bg-primary/10  rounded-lg font-semibold text-right whitespace-nowrap">
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
                  <h3 className="text-xs font-semibold uppercase text-primary mb-1">
                    ✨ Perks
                  </h3>
                  <ul className="flex flex-wrap gap-2 text-sm text-base-content overflow-x-auto whitespace-nowrap">
                    {ticket.perks.map((perk, i) => (
                      <li
                        key={i}
                        className="bg-base-300 px-2 py-1 rounded-lg shrink-0"
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
                  // Primary button from DaisyUI
                  className={`
                    w-full mt-4 cursor-pointer py-3 text-lg font-bold 
                    btn btn-primary 
                    hover:bg-primary-focus
                    shadow-lg
                  `}
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
