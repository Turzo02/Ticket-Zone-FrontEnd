import React from "react";
import { motion } from "framer-motion";

const SwappingDotLoader = () => {
  const circles = Array.from({ length: 3 });

  return (
    <div className="flex justify-center items-center min-h-screen space-x-4">
      {circles.map((_, i) => (
        <motion.div
          key={i}
          className="w-5 h-5 bg-blue-500 rounded-full"
          animate={{ scale: [0, 1, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default SwappingDotLoader;
