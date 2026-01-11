import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Plane, Ticket, ArrowRight, Copy } from "lucide-react";
import { useSearchParams, Link } from "react-router"; // Use Link for SPA navigation
import useAxiosSecure from "../../../Hooks/useAxiousSecure";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");

  // Logic: Verify Payment
  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            // Optional: Add toast or tracking here
          }
        })
        .catch((err) => console.error("Payment Confirmation Error", err));
    }
  }, [sessionId, axiosSecure]);

  // Animation Variants
  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
    },
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-(--bg-page) text-(--text-main) p-4 relative overflow-hidden">
      
      {/* 1. Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-(--success-bg) rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      <motion.div
        className="relative w-full max-w-md"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-(--bg-card) border border-(--border-card) shadow-2xl shadow-emerald-900/5">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-400 to-teal-500"></div>

          <div className="p-8 md:p-10 text-center">
            
            {/* 2. Animated Success Icon */}
            <motion.div variants={itemVariants} className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-(--success-bg) flex items-center justify-center shadow-lg shadow-emerald-500/20 z-10 relative"
              >
                <Check size={40} className="text-(--success-text)" strokeWidth={4} />
              </motion.div>
              {/* Pulse Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-(--success-text) opacity-20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border border-(--success-text) opacity-40 scale-125"></div>
            </motion.div>

            {/* 3. Text Content */}
            <motion.h1 
              variants={itemVariants} 
              className="text-3xl font-black text-(--text-main) tracking-tight mb-2"
            >
              Ticket Confirmed!
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="text-(--text-muted) font-medium text-sm mb-8"
            >
              Your payment was successful. <br/> We've sent the details to your email.
            </motion.p>

            {/* 4. Digital Receipt Box */}
            <motion.div 
              variants={itemVariants} 
              className="bg-(--bg-soft-accent) rounded-3xl p-5 mb-8 border border-(--border-card) relative"
            >
               {/* Ticket Cutout Visuals */}
               <div className="absolute top-1/2 -left-3 w-6 h-6 bg-(--bg-card) rounded-full border-r border-(--border-card)"></div>
               <div className="absolute top-1/2 -right-3 w-6 h-6 bg-(--bg-card) rounded-full border-l border-(--border-card)"></div>

               <p className="text-[10px] font-bold uppercase tracking-widest text-(--text-muted) mb-2">Transaction ID</p>
               
               <div className="flex items-center justify-center gap-2">
                 <code className="text-lg font-mono font-bold text-(--text-main)">
                    {sessionId ? sessionId.slice(-12).toUpperCase() : "PROCESSING..."}
                 </code>
                 {sessionId && <Copy size={14} className="text-(--text-muted)" />}
               </div>
               
               <div className="my-4 border-b border-dashed border-(--border-card)/50"></div>

               <div className="flex justify-between text-sm font-bold text-(--text-muted)">
                  <span>Status</span>
                  <span className="text-(--success-text)">Paid Successfully</span>
               </div>
            </motion.div>

            {/* 5. Action Buttons */}
            <motion.div variants={itemVariants} className="space-y-3">
              <Link to="/dashboard/transaction-history" className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full py-4 rounded-2xl font-bold text-(--text-inv) shadow-lg shadow-(--grad-start)/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-(--grad-start) to-(--grad-end)"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    <Ticket size={18} /> View My Tickets
                  </span>
                </motion.button>
              </Link>

              <Link to="/all-tickets" className="block">
                 <button className="w-full py-4 rounded-2xl font-bold text-sm text-(--text-main) bg-(--bg-page) border border-(--border-card) hover:bg-(--bg-soft-accent) transition-colors flex items-center justify-center gap-2">
                    <Plane size={16} className="text-(--grad-start)" /> Book Another Trip
                 </button>
              </Link>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
