import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ali Khan",
      route: "Dhaka → Chittagong",
      quote: "Booking tickets was fast and easy. Loved the platform!",
      image: "https://i.pravatar.cc/150?u=ali", // Placeholder image
    },
    {
      id: 2,
      name: "Fatima Rahman",
      route: "Sylhet → Dhaka",
      quote: "The bus tracking feature was a lifesaver. Highly recommended!",
      image: "https://i.pravatar.cc/150?u=fatima",
    },
    {
      id: 3,
      name: "Tanvir Hasan",
      route: "Khulna → Jessore",
      quote: "Great prices and very comfortable seat selection process.",
      image: "https://i.pravatar.cc/150?u=tanvir",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Discover why thousands of travelers trust TicketZone for their journeys.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className=" shadow-sm rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 border "
            >
              {/* User Photo */}
              <div className="avatar mb-4">
                <div className="w-16 h-16 rounded-full ring-2 ring-offset-2 ">
                  <img src={item.image} alt={item.name} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-sm  font-medium mb-3">
                {item.route}
              </p>
              
              <blockquote className="italic">
                "{item.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
