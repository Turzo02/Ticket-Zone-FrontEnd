import React from "react";
import {
  Plane,
  BusFront,
  TrainFront,
  ShipWheel,
  ArrowRight,
  MapPin,
  Link,
} from "lucide-react";

const RouteCard = ({ icon: Icon, city1, city2, themeColor }) => {
  // Mapping theme colors to Tailwind classes dynamically
  const colorMap = {
    indigo: {
      bg: "bg-indigo-50 ",
      border:
        "group-hover:border-indigo-200 ",
      text: "text-indigo-600 ",
      glow: "group-hover:shadow-indigo-500/20",
      gradient: "from-indigo-500 to-purple-600",
    },
    orange: {
      bg: "bg-orange-50 ",
      border:
        "group-hover:border-orange-200 ",
      text: "text-orange-600 ",
      glow: "group-hover:shadow-orange-500/20",
      gradient: "from-orange-500 to-red-500",
    },
    purple: {
      bg: "bg-purple-50 ",
      border:
        "group-hover:border-purple-200 ",
      text: "text-purple-600 ",
      glow: "group-hover:shadow-purple-500/20",
      gradient: "from-purple-500 to-pink-500",
    },
    teal: {
      bg: "bg-teal-50 ",
      border: "group-hover:border-teal-200 ",
      text: "text-teal-600 ",
      glow: "group-hover:shadow-teal-500/20",
      gradient: "from-teal-400 to-emerald-500",
    },
  };

  const theme = colorMap[themeColor] || colorMap.indigo;

  return (
    <div
      className={`
        group relative w-full
        bg-base-100 
        rounded-2xl
        border border-base-200 
        ${theme.border}
        p-5 cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl ${theme.glow}
        overflow-hidden
      `}
    >
      {/* Background Decorative Blob */}
      <div
        className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 bg-linear-to-br ${theme.gradient}`}
      />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        {/* Top: Icon and Route Label */}
        <div className="flex items-center justify-between">
          <div className={`p-2.5 rounded-xl ${theme.bg} ${theme.text}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-base-content/40 bg-base-200/50 px-2 py-1 rounded-md">
            Direct
          </span>
        </div>

        {/* Middle: The Journey Visual */}
        <div className="flex items-center justify-between gap-3">
          {/* Origin */}
          <div className="flex flex-col items-start">
            <span className="text-xs text-base-content/50 mb-0.5">From</span>
            <h3 className="text-lg font-bold text-base-content leading-tight">
              {city1}
            </h3>
          </div>

          {/* Connector Line */}
          <div className="flex-1 flex flex-col items-center px-2">
            <div className="relative w-full h-0.5 bg-base-300 rounded-full overflow-hidden">
              {/* Moving Gradient Line on Hover */}
              <div
                className={`absolute inset-0 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-linear-to-r ${theme.gradient} opacity-50`}
              />
            </div>
          </div>

          {/* Destination */}
          <div className="flex flex-col items-end text-right">
            <span className="text-xs text-base-content/50 mb-0.5">To</span>
            <h3 className={`text-lg font-bold ${theme.text} leading-tight`}>
              {city2}
            </h3>
          </div>
        </div>

        {/* Bottom: Action / Footer */}
        <div className="pt-4 border-t border-base-200  flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-base-content/60">
            <MapPin size={14} />
            <span>Popular Choice</span>
          </div>

            <div
              className={`flex items-center gap-1 text-sm font-semibold ${theme.text} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}
            >
              Book Now <ArrowRight size={16} />
            </div>
        </div>
      </div>
    </div>
  );
};

const PopularRoutes = () => {
  const routes = [
    {
      city1: "Dhaka",
      city2: "Rajshahi",
      icon: Plane,
      themeColor: "indigo",
    },
    {
      city1: "Rangpur",
      city2: "Dhaka",
      icon: BusFront,
      themeColor: "orange",
    },
    {
      city1: "Bogura",
      city2: "Shylet",
      icon: TrainFront,
      themeColor: "purple",
    },
    {
      city1: "Dhaka",
      city2: "Barishal",
      icon: ShipWheel,
      themeColor: "teal",
    },
  ];

  return (
    <div className="w-full min-h-[50vh] flex flex-col justify-center bg-base-100 py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-base-content mb-2">
              Popular <span className="text-primary">Routes</span>
            </h2>
            <p className="text-base-content/60 text-lg">
              Discover the most traveled paths across Bangladesh this month.
            </p>
          </div>

        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <RouteCard
              key={index}
              icon={route.icon}
              city1={route.city1}
              city2={route.city2}
              themeColor={route.themeColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularRoutes;
