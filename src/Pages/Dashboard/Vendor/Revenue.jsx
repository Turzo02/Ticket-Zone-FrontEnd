import React, { useMemo } from "react";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useQuery } from "@tanstack/react-query";
import SwappingDotLoader from "../../../Components/Loading/SwappingDotLoader";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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

  const {
    totalRevenue,
    totalTicketsSold,
    totalTicketsAdded,
    chartData,
    pieChartData,
  } = useMemo(() => {
    let totalRev = 0;
    let ticketsSold = 0;
    let ticketsAdded = 0;
    revenueData.forEach((rev) => {
      totalRev += rev.totalPrice || 0;
      ticketsSold += rev.bookingQuantity || 0;
      ticketsAdded += rev.quantity || 0;
    });

    const barChartData = [
      { name: "Total Sold", value: ticketsSold },
      { name: "Total Added", value: ticketsAdded },
    ];

    const revenuePie = [{ name: "Total Revenue", value: totalRev }];

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
    return (
      <p className="text-red-500 text-center py-4">
        Failed to load revenue data.
      </p>
    );
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen text-base-content">
      <h2 className="text-3xl font-extrabold text-primary mb-8 border-b-2 border-base-300 pb-2">
         Revenue Overview
      </h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          color="bg-success shadow-success/30"
        />
        <MetricCard
          title="Total Tickets Sold"
          value={totalTicketsSold.toLocaleString()}
          color="bg-info shadow-info/30"
        />
        <MetricCard
          title="Total Tickets Added"
          value={totalTicketsAdded.toLocaleString()}
          color="bg-warning shadow-warning/30"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-base-200 p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold text-base-content mb-4">
            Tickets Sold vs. Added
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--fallback-b3, oklch(84.45% 0.01 228.69 / 1))"
              />
              <XAxis
                dataKey="name"
                stroke="var(--fallback-bc, oklch(38.07% 0.01 228.69 / 1))"
              />
              <YAxis
                allowDecimals={false}
                stroke="var(--fallback-bc, oklch(38.07% 0.01 228.69 / 1))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--fallback-b1, oklch(98% 0 0))",
                  borderColor:
                    "var(--fallback-bc, oklch(38.07% 0.01 228.69 / 1))",
                  color: "var(--fallback-bc, oklch(38.07% 0.01 228.69 / 1))",
                }}
                formatter={(value) => value.toLocaleString()}
              />
              <Bar dataKey="value" name="Tickets" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-base-200 p-6 rounded-lg shadow-xl flex flex-col items-center">
          <h3 className="text-xl font-semibold text-base-content mb-4">
            Revenue Distribution
          </h3>
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
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--fallback-b1, oklch(98% 0 0))",
                  borderColor:
                    "var(--fallback-bc, oklch(38.07% 0.01 228.69 / 1))",
                  color: "var(--fallback-bc, oklch(38.07% 0.01 228.69 / 1))",
                }}
                formatter={(value) => `৳${value.toLocaleString()}`}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  color: "var(--fallback-bc, oklch(38.07% 0.01 228.69 / 1))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, color }) => (
    <div className={`p-6 rounded-lg text-white shadow-xl ${color}`}>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <h2 className="text-4xl font-extrabold mt-1">{value}</h2>
    </div>
);
export default Revenue;
