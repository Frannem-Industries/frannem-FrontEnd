import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 mt-[-100px]">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-9xl font-bold text-primary-blue"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 10,
            delay: 0.2
          }}
        >
          404
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4 mb-6">
            Oops! Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="inline-block bg-primary-blue text-white font-medium py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Animated elements */}
      <div className="relative w-full max-w-lg mt-12">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: 0
            }}
            animate={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 2
            }}
          >
            <div 
              className="h-2 w-2 md:h-3 md:w-3 rounded-full"
              style={{ 
                backgroundColor: index % 2 === 0 ? '#3B82F6' : '#93C5FD',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
