
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = ({ count = 40 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      tx: (Math.random() - 0.5) * 200,
      ty: (Math.random() - 0.5) * 200,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? '#00d9ff' : i % 3 === 1 ? '#7c3aed' : '#ff1493'
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`
          }}
          animate={{
            x: [0, p.tx],
            y: [0, p.ty],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
