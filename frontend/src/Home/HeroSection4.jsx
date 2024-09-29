import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


function HeroSection4() {
  return (
    <div className="hero bg-white min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <motion.img
      src="/images/roadside.jpg"
      className="max-w-2xl rounded-lg shadow-0xl"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
     <div className="text-right">
  <h1 className="text-5xl font-bold">Need a help!</h1>
  <h1 className="text-4xl font-bold">Contact our breakdown service</h1>
  <p className="py-6">
    Leading automotive service centre situated in Hanwella.
  </p>
</div>

<div><Link to={"/breakdownRequests/create"}>
          <a href=""
            title=""
            className="items-center justify-center hidden px-4 py-3 ml-30 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md lg:inline-flex hover:bg-red-700 focus:bg-red-700"
            role="button">
          
            Book Now 
            </a>
            </Link>
          </div>

    </motion.div>
  </div>
</div>

  );
}

export default HeroSection4;
