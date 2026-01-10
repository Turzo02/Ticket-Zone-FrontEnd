import React from 'react';
import { 
  Lock, 
  Eye, 
  Database, 
  Cookie, 
  ShieldAlert, 
  Mail,
  FileCheck,
  MailCheck
} from 'lucide-react';

const Privacy = () => {
  
  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      icon: Database,
      content: "We collect information you provide directly to us when creating an account or booking a ticket. This includes your name, email address, phone number, and payment information. We also automatically collect usage data like your IP address and browser type to improve our service."
    },
    {
      id: "usage",
      title: "2. How We Use Your Data",
      icon: Eye,
      content: "Your data is used to process transactions, send booking confirmations, and provide customer support. We may also use your email to send important updates or promotional offers, which you can opt-out of at any time. We do not sell your personal data to third parties."
    },
    {
      id: "cookies",
      title: "3. Cookies & Tracking",
      icon: Cookie,
      content: "We use cookies to personalize your experience and analyze site traffic. Essential cookies are required for the booking process, while analytics cookies help us understand how you use our site. You can control your cookie preferences through your browser settings."
    },
    {
      id: "security",
      title: "4. Data Security",
      icon: ShieldAlert,
      content: "We implement industry-standard security measures, including SSL encryption, to protect your personal information. While we strive to use commercially acceptable means to protect your data, no method of transmission over the Internet is 100% secure."
    }
  ];

  return (
    <div className="min-h-screen bg-(--bg-soft-accent) text-(--text-main) transition-colors duration-300 py-12">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-(--bg-card) border border-(--border-card) shadow-sm">
          <Lock size={12} className="text-(--grad-start)" />
          <span className="text-xs font-bold text-(--text-muted) uppercase tracking-widest">
            Your Data Safety
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
          Privacy <span className="text-transparent bg-clip-text bg-linear-to-r from-(--grad-start) to-(--grad-end)">Policy</span>
        </h1>
        <p className="text-lg text-(--text-muted) max-w-2xl mx-auto">
          We are committed to protecting your personal information and your right to privacy.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-(--bg-card) border border-(--border-card) rounded-3xl shadow-xl overflow-hidden">
          
          {/* Status Bar */}
          <div className="flex items-center gap-3 p-6 border-b border-(--border-card) bg-(--bg-soft-accent)">
            <div className="w-2 h-2 rounded-full bg-(--success-text) animate-pulse"></div>
            <span className="text-sm font-bold text-(--text-main)">
              Last Updated: January 10, 2026
            </span>
          </div>

          {/* Content Body */}
          <div className="p-8 sm:p-12 space-y-12">
            
            {/* Introduction */}
            <div className="text-(--text-main) leading-relaxed text-lg border-l-4 border-(--grad-start) pl-6">
              <p>
                At TicketZone, we value your trust. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully.
              </p>
            </div>

            {/* Dynamic Sections */}
            <div className="grid gap-10">
              {sections.map((section) => (
                <div key={section.id} className="group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-(--bg-soft-accent) text-(--grad-start) group-hover:bg-(--grad-start) group-hover:text-white transition-colors duration-300">
                      <section.icon size={22} strokeWidth={2} />
                    </div>
                    <h2 className="text-xl font-bold text-(--text-main)">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-(--text-muted) leading-7 pl-13">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary Box */}
            <div className="mt-8 p-6 rounded-2xl bg-(--bg-soft-accent) border border-(--border-card) flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="p-3 bg-(--bg-card) rounded-full shadow-sm text-(--grad-start)">
                <FileCheck size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-(--text-main) mb-1">Your Rights</h3>
                <p className="text-sm text-(--text-muted) leading-relaxed">
                  You have the right to access, update, or delete your personal information at any time. Contact us if you wish to exercise these rights regarding your TicketZone account.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Footer */}
        <div className="mt-12 text-center">
          <p className="text-(--text-muted) mb-4 font-medium">
            Concerns about your data?
          </p>
                 <a href="mailto:turzoyt198650@gmail.com">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-(--grad-start) text-white font-bold hover:shadow-lg hover:shadow-(--grad-start)/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
              Email Our Privacy Officer
            </button>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
