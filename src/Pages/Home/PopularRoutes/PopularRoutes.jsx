import React from "react";
import { Plane, BusFront, TrainFront, ShipWheel } from "lucide-react";

const RouteCard = ({ icon: Icon, city1, city2, bgColor, iconColor }) => (
  <div
    className="
      group
      flex flex-col items-center justify-center gap-1
      p-6 h-full cursor-pointer
      rounded-2xl
      bg-base-200/90
      backdrop-blur-md
      border border-base-300
      shadow-sm
      hover:shadow-md hover:-translate-y-0.5
      transition-all duration-300
    "
  >
    {/* Icon Container */}
    <div
      className={`
        w-16 h-16 rounded-full
        flex items-center justify-center
        mb-3
        ${bgColor}
        dark:bg-opacity-20
        ring-1 ring-black/5 dark:ring-white/10
      `}
    >
      <Icon
        className={`
          w-8 h-8
          ${iconColor}
          dark:opacity-90
        `}
      />
    </div>

    {/* City Names */}
    <p
      className="
        text-lg font-semibold
        text-base-content
        whitespace-nowrap
      "
    >
      {city1}
    </p>

    <p
      className="
        text-sm
        text-base-content/60
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
      bgColor: "bg-indigo-100 dark:bg-indigo-500/20",
      iconColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      city1: "Rangpur",
      city2: "Dhaka",
      icon: BusFront,
      bgColor: "bg-orange-100 dark:bg-orange-500/20",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      city1: "Bogura",
      city2: "Shylet",
      icon: TrainFront,
      bgColor: "bg-purple-100 dark:bg-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      city1: "Dhaka",
      city2: "Borishal",
      icon: ShipWheel,
      bgColor: "bg-teal-100 dark:bg-teal-500/20",
      iconColor: "text-teal-600 dark:text-teal-400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-base-content">
          Popular Routes
        </h2>
        <p className="text-sm text-base-content/60">
          Traveler&apos;s favorites this month
        </p>
      </div>

      {/* Routes Grid */}
      <div
        className="
          grid gap-5
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
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
