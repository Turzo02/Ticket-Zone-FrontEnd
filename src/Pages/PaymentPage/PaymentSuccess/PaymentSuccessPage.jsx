import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Plane } from "lucide-react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";

const PaymentSuccessPage = () => {
  const variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) =>{
            if(res.data.modifiedCount > 0){
                console.log("payment success");
            }
        })
        
    }
  }, [sessionId, axiosSecure]);
 console.log(sessionId)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-2xl text-center max-w-md w-full border-t-4 border-green-500"
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={item} className="mx-auto mb-6">
          <motion.div
            className="w-20 h-20 mx-auto text-green-500"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
          >
            <CheckCircle className="w-full h-full" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2"
          variants={item}
        >
          Ticket Booked Successfully!
        </motion.h1>

        <motion.p className="text-md text-gray-600 mb-6" variants={item}>
          Your e-ticket has been confirmed. You will receive the details via
          email shortly.
        </motion.p>

        {/* বাটন */}
        <motion.div variants={item} className="space-y-3">
          <motion.a
            href="/dashboard/transaction-history"
            className="w-full inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plane className="w-5 h-5 mr-2" /> View My Tickets
          </motion.a>
          <motion.a
            href="/all-tickets"
            className="w-full inline-block text-sm text-green-600 hover:text-green-700 transition duration-300"
            whileHover={{ scale: 1.02 }}
          >
            Search for More Journeys
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
