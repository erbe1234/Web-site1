
import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  };

  return (
    <motion.div
      className={`${sizes[size]} ${className} relative flex items-center justify-center font-bold`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] via-[#7C3AED] to-[#FF1493] rounded-xl opacity-20 blur-sm"></div>
      <div className="relative z-10 flex items-center justify-center w-full h-full bg-gradient-to-br from-[#001F3F] to-[#0066FF] rounded-xl border-2 border-[#0066FF]/30">
        <span className="gradient-text font-extrabold tracking-tight">ETB</span>
      </div>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF1493] rounded-full animate-pulse"></div>
      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </motion.div>
  );
};

export default Logo;
