import Countdown from "react-countdown";

const TicketCountdown = ({ departure }) => {
  const departureDate = new Date(departure);

  // Custom renderer
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-green-600 font-bold">Already Departed</span>;
    } else {
      return (
        <span className="text-red-600 font-bold">
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <div className="text-gray-600 font-medium">
      <span className="text-gray-700 font-semibold">Countdown:</span>{" "}
      <Countdown date={departureDate} renderer={renderer} />
    </div>
  );
};

export default TicketCountdown;
