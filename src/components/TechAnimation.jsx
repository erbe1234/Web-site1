
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TechAnimation = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2
    }));
    setParticles(newParticles);
  }, []);

  const codeSnippets = [
    '{ code }',
    '</>',
    '( )',
    '[ ]',
    '=> { }',
    'fn()',
    '0x',
    '##'
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div className="circuit-pattern absolute inset-0"></div>
      
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-[#0066FF] to-[#7C3AED]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      {codeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20 font-mono text-sm font-semibold"
          style={{
            left: `${(index * 12) % 90}%`,
            top: `${(index * 15) % 80}%`
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.3,
            ease: 'easeInOut'
          }}
        >
          {snippet}
        </motion.div>
      ))}

      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF1493" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${i * 20}%`}
            y1="0%"
            x2={`${i * 20 + 10}%`}
            y2="100%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'linear'
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default TechAnimation;
