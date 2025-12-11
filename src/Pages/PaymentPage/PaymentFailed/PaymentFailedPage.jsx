import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CreditCard, RefreshCcw } from 'lucide-react'; 

const PaymentFailedPage = () => {

    const variants = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
                duration: 0.5, 
                ease: "easeOut",
                staggerChildren: 0.1 
            }
        },
    };

    const item = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 }
    };
    
    const shakeAnimation = {
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.6 }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <motion.div
                className="bg-white p-8 md:p-10 rounded-xl shadow-2xl text-center max-w-md w-full border-t-4 border-red-500"
                variants={variants}
                initial="initial"
                animate="animate"
            >
                <motion.div variants={item} className="mx-auto mb-6">
                    <motion.div
                        className="w-20 h-20 mx-auto text-red-500"
                        initial={{ rotate: 10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
                    >
                         <XCircle className="w-full h-full" strokeWidth={1.5} />
                    </motion.div>
                </motion.div>

                <motion.h1 
                    className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2"
                    variants={item}
                    animate={shakeAnimation}
                >
                    Booking Failed
                </motion.h1>

                <motion.p 
                    className="text-md text-gray-600 mb-8"
                    variants={item}
                >
                    We couldn't process your payment. Your ticket was not booked. Please try again or use a different method.
                </motion.p>
                
                {/* বাটন */}
                <motion.div variants={item} className="space-y-3">
                    <motion.a 
                        href="/dashboard/my-booked-tickets" 
                        className="w-full inline-flex items-center justify-center px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <CreditCard className="w-5 h-5 mr-2" /> Try Again
                    </motion.a>
                    
                    <motion.a 
                        href="/all-tickets"
                        className="w-full inline-block text-sm text-gray-600 hover:text-red-700 transition duration-300"
                        whileHover={{ scale: 1.02 }}
                    >
                        Start a New Search
                    </motion.a>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PaymentFailedPage;