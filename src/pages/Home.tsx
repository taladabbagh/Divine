import React from 'react';
import { Link } from 'react-router-dom';
import landingImage from '../../public/image.png';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div 
      className="container mx-auto h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
       {/* Dark overlay for background image  */}
      <div className="absolute inset-0 bg-black opacity-90"></div>
      
      {/* Main content container with higher z-index */}
      <motion.div
        className="relative z-10 text-center  text-white space-y-6 p-8 bg-black bg-opacity-50 rounded-lg shadow-xl max-w-md border"
        initial={{ opacity: 0, y: -50 }} // Start off with an invisible element
        animate={{ opacity: 1, y: 0 }} // Animate to full opacity and normal position
        transition={{ duration: 1 }} // Animation duration
      >
        <motion.h1 
          className="text-4xl font-extrabold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to Divine
        </motion.h1>
        {/* <motion.p 
          className="text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
        </motion.p> */}
        
        {/* Button container */}
        <div className="flex flex-col space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link to="/register">
  <button className="vintage-button">
    Register or Log In
  </button>
</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Link to="/products">
  <button className="vintage-button">
    Shop Now as Guest
  </button>
</Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
