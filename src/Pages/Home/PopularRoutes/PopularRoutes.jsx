import React from "react";
import { Plane, BusFront, TrainFront, ShipWheel } from "lucide-react";

const RouteCard = ({ icon: Icon, city1, city2, bgColor, iconColor }) => (
  <div
    className="
    flex flex-col items-center justify-center p-6
    bg-white rounded-xl shadow-lg
    hover:shadow-xl transition-shadow duration-300
    cursor-pointer h-full
  "
  >
    {/* Icon Container with background color */}
    <div
      className={`
      w-16 h-16 rounded-full flex items-center justify-center mb-4
      ${bgColor}
    `}
    >
      <Icon className={`w-8 h-8 ${iconColor}`} />
    </div>

    {/* City Names */}
    <p
      className="
      text-lg font-semibold text-gray-800
      whitespace-nowrap
    "
    >
      {city1}
    </p>
    <p
      className="
      text-sm text-gray-500 mt-0.5
      whitespace-nowrap
    "
    >
      to {city2}
    </p>
  </div>
);

const PopularRoutes = () => {
  const routes = [
    {
      city1: "Dhaka",
      city2: "Rajshahi",
      icon: Plane,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      city1: "Rangpur",
      city2: "Dhaka",
      icon: BusFront,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      city1: "Bogura",
      city2: "shylet",
      icon: TrainFront,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      city1: "Dhaka",
      city2: "Borishal",
      icon: ShipWheel,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Popular Routes</h2>
        <p className="text-gray-500 mt-1">Traveler's favorites this month</p>
      </div>

      {/* Routes Grid - Fully Responsive */}
      <div
        className="
        grid gap-4 
        sm:grid-cols-2 
        md:grid-cols-4
      "
      >
        {routes.map((route, index) => (
          <RouteCard
            key={index}
            icon={route.icon}
            city1={route.city1}
            city2={route.city2}
            bgColor={route.bgColor}
            iconColor={route.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
