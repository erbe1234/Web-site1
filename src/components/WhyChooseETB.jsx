
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Shield, Users, ArrowUpRight } from 'lucide-react';

const WhyChooseETB = () => {
  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Architectures designed for speed, low latency, and optimal resource utilization.',
      color: 'text-[#00d9ff]'
    },
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'Implementing robust security protocols and best practices from day one.',
      color: 'text-[#7c3aed]'
    },
    {
      icon: Target,
      title: 'Precision Engineering',
      description: 'Clean, maintainable code that perfectly aligns with your business objectives.',
      color: 'text-[#ff1493]'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Experiences crafted to engage, convert, and retain your core audience.',
      color: 'text-[#00d9ff]'
    }
  ];

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '40+', label: 'Projects Shipped' },
    { value: '100%', label: 'Client Satisfaction' }
  ];

  return (
    <section className="py-24 relative bg-secondary border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h2 className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">The ETB Advantage</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Engineering <br/> Excellence
              </h3>
            </div>
            
            <p className="text-foreground/80 text-lg leading-relaxed">
              I don't just write code; I engineer scalable digital solutions. By combining deep technical expertise with strategic business insight, I deliver platforms that perform under pressure and adapt to future demands.
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-foreground/60 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="glass p-8 rounded-3xl relative group overflow-hidden hover:bg-white/[0.03] transition-colors"
                >
                  <div className="absolute top-4 right-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-white/20">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                  
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyChooseETB;
