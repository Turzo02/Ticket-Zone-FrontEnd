import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  AlertCircle, 
  HelpCircle, 
  Check, 
  Download, 
  MailCheck,
  Mail
} from 'lucide-react';

const TermsCondition = () => {
  
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: FileText,
      content: "Welcome to TicketZone. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. These terms apply to all visitors, users, and others who access or use the Service."
    },
    {
      id: "bookings",
      title: "2. Booking & Payments",
      icon: CreditCard,
      content: "All tickets are subject to availability. Prices are dynamic and may change based on demand and timing. Full payment must be made at the time of booking to secure your seat. We accept major credit cards, mobile banking, and other secure payment methods listed on our checkout page."
    },
    {
      id: "cancellations",
      title: "3. Cancellations & Refunds",
      icon: AlertCircle,
      content: "Cancellations made 24 hours prior to departure are eligible for a partial refund, subject to a 10% processing fee. Cancellations made within 24 hours of departure are non-refundable. Refunds will be processed to the original payment method within 5-7 business days."
    },
    {
      id: "conduct",
      title: "4. User Conduct",
      icon: ShieldCheck,
      content: "You agree not to use the Service for any unlawful purpose. You must provide accurate and complete information during the booking process. Any fraudulent activity or misuse of the platform may result in immediate account suspension and legal action."
    }
  ];

  return (
    <div className="min-h-screen bg-(--bg-soft-accent) text-(--text-main) transition-colors duration-300 py-12">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--bg-card) border border-(--border-card) shadow-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--grad-start) opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-(--grad-start)"></span>
            </span>
            <span className="text-xs font-bold text-(--text-muted) uppercase tracking-widest">
              Legal Information
            </span>
          </div>
          
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Terms & <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">Conditions</span>
        </h1>
        <p className="text-lg text-(--text-muted)">
          Last updated: January 10, 2026
        </p>
      </div>

      {/* Main Content Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-(--bg-card) border border-(--border-card) rounded-3xl shadow-xl overflow-hidden">
          
          {/* Document Toolbar */}
          <div className="flex justify-between items-center p-6 border-b border-(--border-card) bg-(--bg-soft-accent)">
            <span className="text-sm font-bold text-(--text-muted) uppercase tracking-wider">
              TicketZone User Agreement
            </span>
            <button className="flex items-center gap-2 text-sm font-bold text-(--grad-start) hover:text-(--text-main) transition-colors">
              <span className="hidden sm:inline">Document</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-8 sm:p-12 space-y-12">
            
            {/* Preamble */}
            <div className="text-(--text-main) leading-relaxed text-lg text-justify">
              <p>
                Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the TicketZone website and mobile application (the "Service") operated by TicketZone ("us", "we", or "our").
              </p>
            </div>

            {/* Dynamic Sections */}
            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.id} className="relative pl-0 sm:pl-8 group">
                  {/* Decorative Line */}
                  <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-0.5 bg-(--border-card) group-hover:bg-(--grad-start) transition-colors duration-300"></div>
                  
                  <h2 className="text-2xl font-bold text-(--text-main) mb-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-(--bg-soft-accent) text-(--grad-start)">
                      <section.icon size={20} />
                    </div>
                    {section.title}
                  </h2>
                  <p className="text-(--text-muted) leading-7 text-justify">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Acceptance Box */}
            <div className="mt-12 p-6 rounded-2xl bg-(--bg-soft-accent) border border-(--border-card) flex items-start gap-4">
              <div className="shrink-0 mt-1">
                <Check size={24} className="text-(--success-text)" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-(--text-main) mb-1">Agreement</h3>
                <p className="text-sm text-(--text-muted)">
                  By creating an account or booking a ticket, you acknowledge that you have read and understood these agreements and accept all terms.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Contact */}
        <div className="mt-12 text-center">
          <p className="text-(--text-muted) mb-4">
            Have questions about our terms?
          </p>
                 <a href="mailto:turzoyt198650@gmail.com">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-(--grad-start) text-white font-bold hover:shadow-lg hover:shadow-(--grad-start)/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              Contact Legal Support
            </button>
          </a>

        </div>

      </div>
    </div>
  );
};

export default TermsCondition;
