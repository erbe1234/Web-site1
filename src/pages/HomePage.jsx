
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AnimatedHero from '@/components/AnimatedHero.jsx';
import FeaturedProjects from '@/components/FeaturedProjects.jsx';
import WhyChooseETB from '@/components/WhyChooseETB.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const HomePage = () => {
  const { t } = useLanguage();
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Subtle parallax effect for the main container
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollToTopVisible(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>ETB - Erline Beutcha Toumi | IT Professional</title>
        <meta
          name="description"
          content="Erline Beutcha Toumi - IT professional passionate about creating innovative digital solutions. Explore my portfolio, skills, and services."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
        <Header />

        <main className="relative">
          <AnimatedHero />
          
          <motion.div style={{ y }} className="relative z-10 bg-background">
            <FeaturedProjects />
            <WhyChooseETB />
            
            {/* Quick hook for the rest of the site's original flow */}
            <section className="py-24 bg-background">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-2xl mx-auto"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">Ready to build something extraordinary?</h2>
                  <p className="text-foreground/70 mb-8">
                    Let's discuss how my technical expertise can help accelerate your business goals.
                  </p>
                  <a 
                    href="/contact" 
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Get in Touch
                  </a>
                </motion.div>
              </div>
            </section>
          </motion.div>
        </main>

        <Footer />

        <button
          onClick={scrollToTop}
          className={`scroll-to-top-btn ${scrollToTopVisible ? 'visible' : ''}`}
          aria-label="Scroll to top"
        >
          <div className="w-12 h-12 rounded-full glass border border-white/20 text-white flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.3)] hover:shadow-[0_0_25px_rgba(0,217,255,0.6)] hover:bg-white/10 transition-all duration-300 group">
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </div>
        </button>
      </div>
    </>
  );
};

export default HomePage;
