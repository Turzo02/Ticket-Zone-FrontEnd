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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  DollarSign, 
  Ticket, 
  Layers, 
  TrendingUp, 
  Download, 
  Activity 
} from "lucide-react";
import LoadingSpinner from "../../../Components/Loading/LoadingSpinner";

  const StatCard = ({ title, value, icon: Icon, gradient, trend }) => (
    <div className="relative overflow-hidden p-6 rounded-4xl bg-(--bg-card) border border-(--border-card) shadow-xl shadow-black/5 group">

      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2.5 rounded-xl ${gradient} text-white shadow-lg`}>
            <Icon size={20} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-(--text-muted)">
            {title}
          </span>
        </div>
        <div className="flex items-end gap-3">
          <h3 className="text-3xl font-black text-(--text-main) tracking-tight">
            {value}
          </h3>
          {trend && (
             <span className="text-xs font-bold text-(--success-text) mb-1.5 flex items-center bg-(--success-bg) px-2 py-0.5 rounded-md">
               <TrendingUp size={12} className="mr-1" /> {trend}
             </span>
          )}
        </div>
      </div>
    </div>
  );


const Revenue = () => {
  const axiosSecure = useAxiosSecure();

  // --- Data Fetching ---
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

  // --- Loading State ---
  if (isCombinedLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-(--bg-soft-accent)">
       <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  // --- Calculations ---
  const totalPrice = revenueData.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const totalSoldTicket = revenueData.reduce((acc, cur) => acc + cur.bookingQuantity, 0);
  const totalTickets = ticketData.reduce((acc, cur) => acc + cur.quantity, 0);
  const availableTickets = totalTickets - totalSoldTicket;

  // Chart Data Preparation
  const ticketPieData = [
    { name: "Sold", value: totalSoldTicket, color: "var(--chart-1)" },
    { name: "Available", value: availableTickets > 0 ? availableTickets : 0, color: "var(--chart-2)" },
  ];

  const revenueChartData = revenueData.map((item, index) => ({
    name: `Order #${index + 1}`,
    amount: item.totalPrice,
    tickets: item.bookingQuantity,
  }));

  // --- Helper: Stat Card Component ---

  return (
    <div className="min-h-screen relative bg-(--bg-soft-accent) text-(--text-main) p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
                {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
           <div className="absolute top-20 left-10 w-72 h-72 bg-(--grad-start) rounded-full opacity-10 blur-[100px]" />
           <div className="absolute top-40 right-10 w-96 h-96 bg-(--grad-end) rounded-full opacity-10 blur-[100px]" />
        </div>
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
              Analytics Dashboard
            </h1>
            <p className="text-(--text-muted) font-medium text-sm mt-2">
              Real-time overview of your sales performance and inventory.
            </p>
          </div>
        </div>

        {/* 2. Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Revenue" 
            value={`$${totalPrice.toLocaleString()}`} 
            icon={DollarSign} 
            gradient="bg-linear-to-r from-(--grad-money-start) to-(--grad-money-end)"
            trend="+12.5%"
          />
          <StatCard 
            title="Tickets Sold" 
            value={totalSoldTicket} 
            icon={Ticket} 
            gradient="bg-linear-to-r from-(--grad-start) to-(--grad-end)"
            trend="+5.2%"
          />
          <StatCard 
            title="Total Inventory" 
            value={totalTickets} 
            icon={Layers} 
            gradient="bg-linear-to-r from-orange-400 to-amber-500"
          />
        </div>

        {/* 3. Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue Chart (Bar) */}
          <div className="lg:col-span-2 p-6 rounded-[2.5rem] bg-(--bg-card) border border-(--border-card) shadow-lg ">
            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-(--bg-soft-accent) text-(--grad-start)">
                    <Activity size={20} />
                 </div>
                 <h3 className="text-xl font-black text-(--text-main)">Revenue Flow</h3>
              </div>
              <div className="text-xs font-bold text-(--text-muted) px-3 py-1 rounded-full bg-(--bg-soft-accent)">
                Last 30 Orders
              </div>
            </div>

            <div className="h-87.5 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={1} />
                      <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{fill: 'var(--chart-text)', fontSize: 10, fontWeight: 700}} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10}
                    hide // Hide labels if too many orders
                  />
                  <YAxis 
                    tick={{fill: 'var(--chart-text)', fontSize: 11, fontWeight: 700}} 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    cursor={{fill: 'var(--bg-soft-accent)', opacity: 0.5}}
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-card)', 
                      borderRadius: '16px',
                      boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                      padding: '12px 16px'
                    }}
                    itemStyle={{ color: 'var(--text-main)', fontWeight: 'bold', fontSize: '13px' }}
                    formatter={(value) => [`$${value}`, "Revenue"]}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="url(#barGradient)" 
                    radius={[6, 6, 6, 6]} 
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Inventory Chart (Pie) */}
          <div className="lg:col-span-1 p-6 rounded-[2.5rem] bg-(--bg-card) border border-(--border-card) shadow-lg flex flex-col">
            <h3 className="text-xl font-black text-(--text-main) mb-2 px-2">Inventory Status</h3>
            <p className="text-xs font-medium text-(--text-muted) mb-6 px-2">Sales vs. Available Stock</p>
            
            <div className="flex-1 min-h-62.5 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {ticketPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ 
                      backgroundColor: 'var(--bg-card)', 
                      borderColor: 'var(--border-card)', 
                      borderRadius: '12px'
                    }}
                    itemStyle={{ color: 'var(--text-main)', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-3xl font-black text-(--text-main)">
                   {Math.round((totalSoldTicket / totalTickets) * 100) || 0}%
                 </span>
                 <span className="text-[10px] font-bold uppercase text-(--text-muted) tracking-widest">Sold</span>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="mt-4 space-y-3 px-4 pb-2">
               {ticketPieData.map((item) => (
                 <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                       <span className="text-sm font-bold text-(--text-muted)">{item.name}</span>
                    </div>
                    <span className="text-sm font-black text-(--text-main)">{item.value}</span>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Revenue;
