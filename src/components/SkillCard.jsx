
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Gitlab, Code2, Cpu, Database, Cloud, ServerCog } from 'lucide-react';

const getIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('github')) return <Github className="w-5 h-5 text-white" />;
  if (lower.includes('gitlab')) return <Gitlab className="w-5 h-5 text-white" />;
  if (lower.includes('java')) return <Code2 className="w-5 h-5 text-white" />;
  if (lower.includes('python')) return <Cpu className="w-5 h-5 text-white" />;
  if (lower.includes('docker') || lower.includes('kubernetes') || lower.includes('hostinger')) return <Cloud className="w-5 h-5 text-white" />;
  if (lower.includes('postgres') || lower.includes('mongo') || lower.includes('redis') || lower.includes('database')) return <Database className="w-5 h-5 text-white" />;
  return <ServerCog className="w-5 h-5 text-white" />;
};

const SkillCard = ({ name, category, level, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
            {getIcon(name)}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
        </div>
        <span className="text-sm font-medium text-primary">{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-[#0066FF] via-[#7C3AED] to-[#FF1493] rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;
