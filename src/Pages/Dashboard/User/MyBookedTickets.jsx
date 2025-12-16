import React from "react";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import useAuth from "../../../Hooks/useAuth";
import TicketCard from "./TicketCard/TicketCard";

const MyBookedTickets = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const {
        data: userBookings = [], 
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["UserBookings", user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/bookings/${user?.email}`);
            return data;
        },
    });

    if (isLoading || loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <SwappingDotLoader />
            </div>
        );
    }

    if (isError) {
        return <p className="text-red-500">Failed to load tickets</p>;
    }

    return (
        <section className="space-y-6">
           <div className="text-center py-8 mb-12 md:py-8  bg-base-200 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
         My Booked Tickets
        </h1>
      </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
                {userBookings?.length > 0 ? (
                    userBookings.map((ticket) => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                    ))
                ) : (
                    <p className="text-slate-600 dark:text-slate-300 col-span-full">
                        You have no booked tickets yet.
                    </p>
                )}
            </div>
        </section>
    );
};

export default MyBookedTickets;