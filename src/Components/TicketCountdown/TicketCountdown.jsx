import React from 'react';
import Countdown from "react-countdown";
import PropTypes from 'prop-types';
import { Timer } from 'lucide-react';

const TicketCountdown = ({ departure, onCountdownComplete }) => {
    // text-gray-400 -> text-base-content/50
    if (!departure) return <span className="text-base-content/50">No date provided</span>;

    const departureDate = new Date(departure);

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="text-success font-bold">Already Departed</span>;
        } else {
            return (
                <span className="text-warning font-bold">
                    {days}d {hours}h {minutes}m {seconds}s
                </span>
            );
        }
    };

    return (
        <div className="text-base-content/80 font-medium flex items-center gap-1">
            <Timer className='h-5 w-5'/>
            <Countdown
                date={departureDate}
                renderer={renderer}
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