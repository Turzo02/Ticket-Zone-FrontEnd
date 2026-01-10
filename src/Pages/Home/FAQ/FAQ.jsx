import React, { useState, useRef, useEffect } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

// GSAP Imports
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  // Track which accordion item is open
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Refs for Animation
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const faqItemsRef = useRef([]);

  const faqs = [
    {
      id: 1,
      question: "How do I receive my ticket after booking?",
      answer:
        "Once your payment is confirmed, your e-ticket is instantly sent to your registered email address. You can also view and download it directly from your 'Dashboard' under the 'My Tickets' section.",
    },
    {
      id: 2,
      question: "Can I cancel or reschedule my trip?",
      answer:
        "Yes! Cancellations are allowed up to 24 hours before departure for a partial refund. To reschedule, simply go to your dashboard, select the ticket, and choose the 'Modify Booking' option (subject to seat availability).",
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer:
        "We support a wide range of secure payment options including Credit/Debit Cards (Visa, Mastercard, Amex), Mobile Banking (Bkash, Nagad, Rocket), and Stripe for international travelers.",
    },
    {
      id: 4,
      question: "Do I need to print my ticket?",
      answer:
        "No, printing is not required! You can simply show the digital e-ticket on your phone along with a valid ID when boarding. We are a paperless, eco-friendly platform.",
    },
    {
      id: 5,
      question: "Is there a discount for group bookings?",
      answer:
        "Absolutely! We offer special rates for bookings of more than 5 seats. Contact our support team or look for the 'Group Deal' badge on specific routes.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // --- ANIMATION: STAGGERED LIST SLIDE UP ---
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

      // 1. Header Animation
      tl.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
      
      // 2. FAQ Items Cascade Up
      .fromTo(faqItemsRef.current,
        { 
          y: 50, 
          opacity: 0,
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, // Delay between each item
          duration: 0.8,
          ease: "power2.out"
        },
        "<0.2" // Start slightly after header
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-20 bg-(--bg-soft-accent) transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        
        {/* --- Header --- */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-(--bg-card) border border-(--border-card) shadow-sm text-(--grad-start)">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-(--text-main) tracking-tight mb-4">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">
              Questions
            </span>
          </h2>
          <p className="text-lg text-(--text-muted) max-w-xl mx-auto">
            Everything you need to know about booking, traveling, and managing
            your journey with TicketZone.
          </p>
        </div>

        {/* --- Accordion Grid --- */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={faq.id}
                // Ref Assignment
                ref={(el) => (faqItemsRef.current[index] = el)}
                
                onClick={() => toggleFAQ(index)}
                className={`
                  group rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${
                    isOpen
                      ? "bg-(--bg-card) border-(--grad-start) shadow-lg shadow-(--grad-start)/5 ring-1 ring-(--grad-start)/20"
                      : "bg-(--bg-card) border-(--border-card) hover:border-(--grad-start)/50 hover:shadow-md"
                  }
                `}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between p-6">
                  <h3
                    className={`text-lg font-bold transition-colors ${
                      isOpen ? "text-(--grad-start)" : "text-(--text-main)"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  
                  {/* Icon Toggle */}
                  <div
                    className={`
                    p-2 rounded-full transition-all duration-300
                    ${
                      isOpen
                        ? "bg-(--grad-start) text-white rotate-180"
                        : "bg-(--bg-soft-accent) text-(--text-muted) group-hover:bg-(--grad-start)/10 group-hover:text-(--grad-start)"
                    }
                  `}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                {/* Answer Content (Animated Height) */}
                <div
                  className={`
                    transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="px-6 pb-6 text-(--text-muted) leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Support Link --- */}
        <div className="text-center mt-12 opacity-0 animate-fade-in" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
          <p className="text-(--text-muted) font-medium">
            Still have questions?{" "}
            <a
              href="mailto:turzoyt198650@gmail.com"
              className="text-(--grad-start) font-bold hover:underline"
            >
              Chat with our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
