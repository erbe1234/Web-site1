
import React from 'react';
import { motion } from 'framer-motion';

const SocialLink = ({ href, icon: Icon, label, color = '#0066FF' }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted hover:bg-primary/10 transition-all duration-200"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5" style={{ color }} />
    </motion.a>
  );
};

export default SocialLink;
