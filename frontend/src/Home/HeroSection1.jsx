import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '/images/Untitled design.png'; // Adjust the path to your image file
import { motion } from 'framer-motion';


function HeroSection1() {
  return (
    <div className="hero bg-white-200 min-h-screen rounded-lg shadow-0xl">
  <div className="hero-content flex-col lg:flex-row">
    <motion.img
      src="/images/Untitled design.png"
      className="max-w-2xl rounded-lg shadow-0xl"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h1 className="text-7xl font-bold">Welcome To</h1>
      <h1 className="text-5xl font-bold">Ashan Auto Services</h1>
      <p className="py-6">
      Leading automotive service centre situated in Hanwella.
      </p>
      <motion.button
        className="btn btn-primary"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Get Started
      </motion.button>
    </motion.div>
  </div>
</div>
  );
}

export default HeroSection1;
