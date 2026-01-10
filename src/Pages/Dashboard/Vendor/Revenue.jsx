import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Revenue = () => {
  const axiosSecure = useAxiosSecure();

  //  Data Fetching 
  const { data: revenueData = [], isLoading: isRevenueLoading } = useQuery({
    queryKey: ["paid-revenue-data"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/bookings/revenue/paid`);
      return data;
    },
  });

  const { data: ticketData = [], isLoading: isTicketLoading } = useQuery({
    queryKey: ["all-tickets-data"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/ticket/status/accepted");
      return data;
    },
  });

  const isCombinedLoading = isRevenueLoading || isTicketLoading;

  // Loading State 
  if (isCombinedLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SwappingDotLoader />
      </div>
    );
  }

  //  Calculations
  const totalPrice = revenueData.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const totalSoldTicket = revenueData.reduce(
    (acc, cur) => acc + cur.bookingQuantity,
    0
  );
  const totalTickets = ticketData.reduce((acc, cur) => acc + cur.quantity, 0);
  const availableTickets = totalTickets - totalSoldTicket;


  // Ticket Pie Chart Data
  const ticketPieData = [
    { name: "Tickets Sold", value: totalSoldTicket },
    { name: "Tickets Available", value: availableTickets > 0 ? availableTickets : 0 },
  ];

  // Colors for the Pie Chart
  const COLORS = ["#0088FE", "#00C49F"];

  // 2. Revenue Bar Chart Data
  // We map the revenue data to show individual transactions or groups
  const revenueChartData = revenueData.map((item, index) => ({
    name: `Order ${index + 1}`,
    amount: item.totalPrice,
    tickets: item.bookingQuantity,
  }));

  return (
    <div className="p-6 bg-base-200 min-h-screen text-base-content">
      {/* Header */}
      <div className="text-center py-8 mb-8 bg-base-200 rounded-xl shadow-md">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
          Revenue & Sales Analytics
        </h1>
      </div>

      {/* Cards (Summary) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="stat bg-base-200 shadow-md rounded-box">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-primary">${totalPrice}</div>
          <div className="stat-desc">Gross income from bookings</div>
        </div>

        <div className="stat bg-base-200 shadow-md rounded-box">
          <div className="stat-title">Total Tickets Sold</div>
          <div className="stat-value text-secondary">{totalSoldTicket}</div>
          <div className="stat-desc">From {revenueData.length} orders</div>
        </div>

        <div className="stat bg-base-200 shadow-md rounded-box">
          <div className="stat-title">Total Tickets Added</div>
          <div className="stat-value text-accent">{totalTickets}</div>
          <div className="stat-desc">Total inventory capacity</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Revenue Flow (Bar Chart) */}
        <div className="bg-base-200 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-center">Revenue per Order</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" hide /> 
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" name="Revenue Amount ($)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Ticket Status (Pie Chart) */}
        <div className="bg-base-200 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-center">Sales vs. Inventory</h2>
          <div className="h-[300px] w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ticketPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                    return (
                      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ticketPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Revenue;