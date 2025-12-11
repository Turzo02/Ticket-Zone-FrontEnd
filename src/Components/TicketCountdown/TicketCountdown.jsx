import React from 'react';
import Countdown from "react-countdown";
import PropTypes from 'prop-types';

const TicketCountdown = ({ departure, onCountdownComplete }) => {
    // Safety check for departure date
    if (!departure) return <span className="text-gray-400">No date provided</span>;

    const departureDate = new Date(departure);

    // Renderer callback: ONLY returns JSX, does NOT trigger side effects
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
        <div className="text-gray-600 font-medium flex items-center gap-1">
            <span className="text-gray-700 font-semibold">Countdown:</span>
            <Countdown
                date={departureDate}
                renderer={renderer}
                // Use onComplete prop to safely update parent state
                onComplete={() => {
                    if (onCountdownComplete) {
                        onCountdownComplete(true);
                    }
                }}
            />
        </div>
    );
};

TicketCountdown.propTypes = {
    departure: PropTypes.string.isRequired,
    onCountdownComplete: PropTypes.func,
};

export default TicketCountdown;