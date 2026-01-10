import React from 'react';

const PlatformStatistics = () => {
  const stats = [
    {
      id: 1,
      value: "25k+",
      label: "Tickets Booked",
    },
    {
      id: 2,
      value: "1k+",
      label: "Routes Covered",
    },
    {
      id: 3,
      value: "500+",
      label: "Operators",
    },
    {
      id: 4,
      value: "98%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="p-6 rounded-2xl transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold  mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium  uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStatistics;
