
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const FeaturedProjects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: 'E-commerce Evolution',
      description: 'A high-performance full-stack marketplace with real-time inventory, secure payment processing, and dynamic analytics.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      color: 'from-primary to-blue-600',
      icon: <MonitorPlay className="w-6 h-6" />
    },
    {
      title: 'Cloud Analytics Hub',
      description: 'Distributed dashboard for monitoring server metrics across multiple cloud providers with predictive scaling alerts.',
      tags: ['Next.js', 'AWS', 'Python', 'GraphQL'],
      color: 'from-accent to-purple-800',
      icon: <MonitorPlay className="w-6 h-6" />
    }
  ];

  return (
    <section id="featured-projects" className="py-24 relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-accent/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
              {t('portfolio.subtitle')}
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">
              Featured Work
            </h3>
          </div>
          <Link to="/portfolio">
            <Button variant="outline" className="glass border-primary/30 text-primary hover:bg-primary/10 rounded-full group">
              <span>View All Projects</span>
              <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-xl" />
              
              <div className="glass-card rounded-3xl p-8 h-full flex flex-col relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Decorative top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`} />
                
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
                  {project.icon}
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-4">{project.title}</h4>
                <p className="text-foreground/70 leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                  <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-full">
                    <Github className="w-4 h-4 mr-2" />
                    Source
                  </Button>
                  <Button size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary border-0 rounded-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
