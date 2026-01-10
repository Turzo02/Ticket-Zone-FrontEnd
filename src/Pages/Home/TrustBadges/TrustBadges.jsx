import React from 'react';
import { ShieldCheck, UserCheck, CheckCircle, Headphones } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      id: 1,
      icon: <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />,
      title: "Secure Payments",
      description: "100% protected transactions"
    },
    {
      id: 2,
      icon: <UserCheck className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />,
      title: "Verified Operators",
      description: "Trusted partners only"
    },
    {
      id: 3,
      icon: <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />,
      title: "Instant Confirmation",
      description: "Tickets sent immediately"
    },
    {
      id: 4,
      icon: <Headphones className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />,
      title: "24/7 Support",
      description: "Always here to help"
    }
  ];

  return (
    <section className="w-full py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Optional, purely for accessibility/structure) */}
        <h2 className="sr-only">Why Choose TicketZone?</h2>

        {/* Badge Grid: 2x2 on Mobile, 4x1 on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {badges.map((badge) => (
            <div 
              key={badge.id} 
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Wrapper with subtle hover animation */}
              <div className="mb-4 p-3 rounded-full  group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              
              {/* Text Content */}
              <h3 className="text-base md:text-lg font-semibold  mb-1">
                {badge.title}
              </h3>
              <p className="text-sm">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
