
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FloatingParticles from '@/components/FloatingParticles.jsx';
import CircuitPattern from '@/components/CircuitPattern.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const AnimatedHero = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 15 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  };

  const etbLetters = ['E', 'T', 'B'];

  const handleScrollDown = () => {
    const nextSection = document.getElementById('featured-projects');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/brand/hero-bg.jpg')",
          opacity: 0.25
        }}
      />
      
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--background))_0%,rgba(0,217,255,0.08)_50%,rgba(124,58,237,0.08)_100%)] animate-gradient-shift"
      />
      
      <CircuitPattern />
      <FloatingParticles count={60} />
      
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Greeting */}
          <motion.p variants={itemVariants} className="text-xl text-primary font-medium tracking-wide uppercase mb-4">
            {t('hero.greeting')}
          </motion.p>

          {/* Staggered 'ETB' Reveal */}
          <div className="flex justify-center items-center gap-4 overflow-hidden mb-6">
            {etbLetters.map((letter, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
                style={{ letterSpacing: '-0.04em' }}
              >
                {letter}
              </motion.span>
            ))}
            <Cpu className="w-12 h-12 text-white/90" />
          </div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white"
            style={{ letterSpacing: '-0.02em' }}
          >
            <span className="text-primary animate-pulse">BE</span>
            <span className="opacity-90">lieve in </span>
            <span className="text-accent animate-pulse" style={{ animationDelay: '0.5s' }}>YOU</span>
            <span className="opacity-90">rselve</span>
          </motion.h2>

          {/* Typed Subtitle effect */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-12">
            <p className="text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent leading-relaxed font-semibold tracking-tight drop-shadow-lg">
              {t('hero.description')}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 items-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="relative overflow-hidden group bg-primary text-primary-foreground border-none hover:bg-primary/90 h-14 px-8 rounded-full shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative font-semibold text-base">{t('hero.cta')}</span>
                <ArrowRight className="relative w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleScrollDown}
              className="h-14 px-8 rounded-full glass border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-semibold text-base"
            >
              Explore My Work
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        onClick={handleScrollDown}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/50 hover:text-primary transition-colors"
        >
          <span className="text-sm font-medium tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AnimatedHero;
