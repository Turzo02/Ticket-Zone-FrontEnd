import React from 'react';
import { MapPin, Compass, Heart, Star } from 'lucide-react';

const TravelInspiration = () => {


  const travelTips = [
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Best Time to Visit",
      description: "October to March offers pleasant weather for most destinations"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Popular Routes",
      description: "Dhaka-Cox's Bazar, Dhaka-Sylhet, and Chittagong-Bandarban"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Travel Safe",
      description: "Book verified operators and check weather conditions before travel"
    }
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-4">
            Discover Bangladesh
          </h2>
          <p className="text-lg  max-w-2xl mx-auto">
            From pristine beaches to lush tea gardens, explore the diverse beauty of Bangladesh with our curated destinations.
          </p>
        </div>

        {/* Travel Tips Section */}
        <div className=" rounded-2xl p-8 border ">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Travel Smart Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelTips.map((tip, index) => (
              <div
                key={index}
                className="flex gap-4 p-4  rounded-xl shadow-sm"
              >
                <div className="shrink-0 w-12 h-12  rounded-lg flex items-center justify-center ">
                  {tip.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    {tip.title}
                  </h4>
                  <p className="text-sm ">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3  font-medium rounded-full transition-colors duration-200 inline-flex items-center gap-2">
            View All Destinations
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TravelInspiration;
