import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Bell } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  const benefits = [
    "Exclusive travel deals and discounts",
    "Early access to new routes",
    "Travel tips and destination guides",
    "Special member-only offers"
  ];

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-3  rounded-2xl shadow-lg">
              <Bell className="w-8 h-8 " />
            </div>
          </div>

          {/* Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold   mb-4">
            Never Miss a Deal
          </h2>
          
          <p className="text-lg  max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and be the first to know about exclusive offers, 
            new routes, and travel tips.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl shadow-sm border "
            >
              <CheckCircle className="w-5 h-5  shrink-0" />
              <span className=" font-medium">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* Signup Form */}
        <div className=" rounded-2xl shadow-xl p-8 border ">
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 " />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 border  rounded-xl focus:ring-2  focus:border-transparent  transition-all duration-200"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="px-8 py-4  disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-sm  text-center">
                Join 25,000+ subscribers. No spam, unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16  rounded-full mb-4">
                <CheckCircle className="w-8 h-8 " />
              </div>
              <h3 className="text-2xl font-bold  mb-2">
                Successfully Subscribed!
              </h3>
              <p className="t">
                Check your email for a welcome message and exclusive offers.
              </p>
            </div>
          )}
        </div>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center gap-2 text-sm ">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?user=${i + 1}`}
                  alt={`Subscriber ${i + 1}`}
                  className="w-8 h-8 rounded-full border-2"
                />
              ))}
            </div>
            <span className="ml-2">
              <strong>25,000+</strong> travelers already subscribed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
