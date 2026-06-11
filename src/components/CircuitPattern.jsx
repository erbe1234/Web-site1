
import React from 'react';
import { motion } from 'framer-motion';

const CircuitPattern = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 0 50 L 20 50 L 30 30 L 70 30 L 80 50 L 100 50" fill="none" stroke="#00d9ff" strokeWidth="1" />
            <path d="M 30 30 L 30 0" fill="none" stroke="#00d9ff" strokeWidth="1" />
            <path d="M 70 30 L 70 0" fill="none" stroke="#7c3aed" strokeWidth="1" />
            <circle cx="20" cy="50" r="2" fill="#00d9ff" />
            <circle cx="80" cy="50" r="2" fill="#7c3aed" />
            <circle cx="30" cy="30" r="2" fill="#00d9ff" />
            <circle cx="70" cy="30" r="2" fill="#7c3aed" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      
      {/* Animated active lines over the pattern */}
      <svg className="absolute inset-0 w-full h-full">
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1="0"
            y1={`${20 * i + 10}%`}
            x2="100%"
            y2={`${20 * i + 10}%`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0, 0.5, 0],
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d9ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00d9ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CircuitPattern;
