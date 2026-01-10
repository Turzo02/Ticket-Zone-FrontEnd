import React from 'react';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';

const FinalCTA = () => {
  const features = [
    {
      icon: <Star className="w-5 h-5" />,
      text: "Best Price Guarantee"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: "Secure Booking"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "24/7 Support"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 " />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96  rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-6">
          Ready to Start Your Journey?
        </h2>
        
        <p className="text-lg md:text-xl  mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied travelers who trust TicketZone for their bus booking needs. 
          Your next adventure is just a click away.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2  font-medium"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full">
                {feature.icon}
              </div>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4  font-bold rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
            Book Your First Ticket
            <ArrowRight className="inline-block w-5 h-5 ml-2" />
          </button>
          
          <button className="px-8 py-4 bg-transparent border-2 font-bold rounded-full  0 transition-all duration-200">
            Browse Routes
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t ">
          <p className=" text-sm mb-4">
            Trusted by over 50,000+ travelers across Bangladesh
          </p>
          <div className="flex justify-center items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2  font-medium">4.8/5 Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
