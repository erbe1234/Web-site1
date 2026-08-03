
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ title, description, image, link, index = 0 }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative h-48 bg-muted overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center circuit-pattern">
            <div className="text-6xl font-bold text-primary/20">ETB</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <Button
          variant="outline"
          size="sm"
          className="group/btn transition-all duration-200"
          onClick={() => {
            if (!link) return;
            // If link is an internal route, use react-router navigation
            if (typeof link === 'string' && link.startsWith('/')) {
              navigate(link);
            } else {
              window.open(link, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          <span>View project</span>
          <ExternalLink className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
