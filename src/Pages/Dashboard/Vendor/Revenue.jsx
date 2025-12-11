import React, { useMemo } from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Pie Chart এর জন্য কালার প্লেট
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Revenue = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: revenueData = [], 
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["Paid REVENUE"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/bookings/revenue/paid`);
            return data;
        },
    });

    const { totalRevenue, totalTicketsSold, totalTicketsAdded, chartData, pieChartData } = useMemo(() => {
        let totalRev = 0;
        let ticketsSold = 0;
        let ticketsAdded = 0; 
        revenueData.forEach(rev => {
            totalRev += rev.totalPrice || 0;
            ticketsSold += rev.bookingQuantity || 0;
            ticketsAdded += rev.quantity || 0;
        });

        const barChartData = [
            { name: 'Total Sold', value: ticketsSold },
            { name: 'Total Added', value: ticketsAdded },
        ];
        
        const revenuePie = [
            { name: 'Total Revenue', value: totalRev },
        ];

        return {
            totalRevenue: totalRev,
            totalTicketsSold: ticketsSold,
            totalTicketsAdded: ticketsAdded,
            chartData: barChartData,
            pieChartData: revenuePie,
        };
    }, [revenueData]);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-32">
                <SwappingDotLoader />
            </div>
        );
    }

    if (isError) {
        return <p className="text-red-500 text-center py-4">Failed to load revenue data.</p>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-extrabold text-indigo-900 mb-8 border-b-2 pb-2">📊 Revenue Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <MetricCard title="Total Revenue" value={`৳${totalRevenue.toLocaleString()}`} color="bg-green-600" />
                <MetricCard title="Total Tickets Sold" value={totalTicketsSold.toLocaleString()} color="bg-blue-600" />
                <MetricCard title="Total Tickets Added" value={totalTicketsAdded.toLocaleString()} color="bg-yellow-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Tickets Sold vs. Added</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="name" stroke="#333" />
                            <YAxis allowDecimals={false} stroke="#333" />
                            <Tooltip formatter={(value) => value.toLocaleString()} />
                            <Bar dataKey="value" name="Tickets" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Revenue Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `৳${value.toLocaleString()}`} />
                            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, color }) => (
    <div className={`p-5 rounded-lg text-white shadow-xl ${color}`}>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <h2 className="text-4xl font-extrabold mt-1">{value}</h2>
    </div>
);

export default Revenue;