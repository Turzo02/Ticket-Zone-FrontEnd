import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, CheckCircle, Bell, ShieldCheck } from 'lucide-react';

// GSAP Imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);
  const cardRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      
      // Reset success message after 4 seconds
      setTimeout(() => setIsSubscribed(false), 4000);
    }, 1200);
  };

  const benefits = [
    "Exclusive discounts",
    "Early access to routes",
    "Destination guides",
    "Member-only offers"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
        }
      });

      // 1. Left Content Slides In from Left
      tl.fromTo(leftContentRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 }
      )
      
      // 2. Form Card Slides In from Right (At the same time)
      .fromTo(cardRef.current,
        { x: 50, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8 },
        "<"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 overflow-hidden bg-(--bg-soft-accent) transition-colors duration-300"
    >
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10">
        
        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-center gap-4 lg:gap-12">
          
          {/* Left Side: Text & Value Prop - Ref Added */}
          <div ref={leftContentRef} className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-(--grad-start)/10 border border-(--grad-start)/20">
                <Bell size={14} className="text-(--grad-start)" />
                <span className="text-xs font-bold text-(--grad-start) uppercase tracking-widest">
                  Newsletter
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-(--text-main) tracking-tight mb-4">
               Never Miss a <br className="hidden md:block"/>
               <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
                  Great Deal
               </span>
              </h2>
              
              <p className="text-lg text-(--text-muted) font-medium mb-8 max-w-lg mx-auto md:mx-0">
               Join our community to get the best travel offers delivered straight to your inbox. No spam, just adventure.
              </p>
              
              {/* Benefits Grid (Compact) */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto md:mx-0">
               {benefits.map((benefit, index) => (
                 <div key={index} className="flex items-center gap-2">
                   <CheckCircle size={16} className="text-(--grad-start) shrink-0" />
                   <span className="text-sm font-semibold text-(--text-main)">{benefit}</span>
                 </div>
               ))}
              </div>
          </div>

          {/* Right Side: Signup Card - Ref Added */}
          <div ref={cardRef} className="w-full max-w-md">
            <div className="
              relative overflow-hidden p-8 rounded-3xl
              bg-(--bg-card) border border-(--border-card)
              shadow-xl shadow-(--grad-start)/10
            ">
              
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  
                  {/* Header inside card */}
                  <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-(--bg-soft-accent) text-(--text-main)">
                         <Mail size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-(--text-main)">Subscribe Now</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted) group-focus-within:text-(--grad-start) transition-colors" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="
                          w-full pl-12 pr-4 py-4 rounded-xl font-medium outline-none
                          bg-(--input-bg) border border-(--input-border) text-(--text-main)
                          focus:border-(--input-focus) focus:ring-2 focus:ring-(--input-focus)/20
                          transition-all duration-300 placeholder:text-(--text-muted)/70
                        "
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="
                        relative w-full py-4 rounded-xl font-bold text-white uppercase tracking-wide
                        bg-linear-to-r from-(--grad-start) to-(--grad-end)
                        shadow-lg shadow-(--grad-start)/20
                        hover:shadow-xl hover:shadow-(--grad-start)/40 hover:-translate-y-1
                        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
                        transition-all duration-300 overflow-hidden group/btn
                      "
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span>Subscribe</span>
                          <Send size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Social Proof Footer */}
                  <div className="pt-6 border-t border-(--border-card) flex items-center justify-between">
                      <div className="flex -space-x-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-(--bg-card) bg-(--bg-soft-accent) flex items-center justify-center overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-(--text-muted)">
                        Join <span className="text-(--text-main)">25k+</span> Travelers
                      </p>
                  </div>
                </form>
              ) : (
                /* Success State Animation (Handled by React + CSS Keyframes) */
                <div className="flex flex-col items-center justify-center text-center py-8 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 rounded-full bg-(--success-bg) flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle className="w-10 h-10 text-(--success-text)" />
                  </div>
                  <h3 className="text-2xl font-black text-(--text-main) mb-2">
                    Welcome Aboard!
                  </h3>
                  <p className="text-(--text-muted) font-medium">
                    You've been successfully added to our list. Watch your inbox for a welcome gift!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
