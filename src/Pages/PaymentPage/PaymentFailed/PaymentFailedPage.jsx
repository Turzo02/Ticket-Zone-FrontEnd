import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { 
  X, 
  RotateCcw, 
  ShieldAlert, 
  HelpCircle, 
  ArrowLeft 
} from "lucide-react";

const PaymentFailedPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-(--bg-soft-accent) text-(--text-main) p-4 relative overflow-hidden">
      
      {/* 1. Ambient Background (Red/Orange Gradient Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="relative w-full max-w-lg"
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-(--bg-card) border border-(--border-card) shadow-2xl shadow-red-900/10 p-8 md:p-12 text-center">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-red-500 via-orange-500 to-red-500"></div>

          {/* 2. Animated Icon Wrapper */}
          <div className="relative mx-auto w-24 h-24 mb-8 flex items-center justify-center">
            {/* Outer Rotating Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-red-500/30"
            />
            {/* Inner Circle */}
            <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center shadow-inner">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <X size={40} className="text-red-500 drop-shadow-md" strokeWidth={3} />
              </motion.div>
            </div>
          </div>

          {/* 3. Text Content */}
          <div className="space-y-3 mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-(--text-main) tracking-tight">
              Payment Failed
            </h1>
            <p className="text-(--text-muted) font-medium text-base leading-relaxed max-w-sm mx-auto">
              We couldn't process your transaction. <br/>
              Your card has <span className="text-red-500 font-bold">not</span> been charged.
            </p>
          </div>

          {/* 4. Error Details Box */}
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-4 mb-8 flex items-start gap-3 text-left">
            <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">
                Possible Reasons
              </p>
              <p className="text-sm text-(--text-main) opacity-80">
                Insufficient funds, incorrect CVV, or bank declined the transaction.
              </p>
            </div>
          </div>

          {/* 5. Action Buttons */}
          <div className="space-y-3">
            <Link to="/dashboard/my-booked-tickets" className="block">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-bold text-white text-base bg-linear-to-r from-red-600 to-orange-600 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <RotateCcw size={18} /> Retry Payment
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </motion.button>
            </Link>

          </div>

          {/* Footer Link */}
          <div className="mt-8">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-(--text-muted) hover:text-(--text-main) transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailedPage;
