
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const AboutPage = () => {
  const { t } = useLanguage();

  const timeline = [
    { year: '2025', title: 'Started IT in 2025', description: 'Began exploring software development and cloud technologies' },
    { year: '2026', title: 'First major project', description: 'Delivered a full-stack web application for a local business' },
    { year: '2027', title: 'Cloud certification', description: 'Achieved professional cloud architecture certification' },
    { year: '2028', title: 'Freelance success', description: 'Built a portfolio of successful client projects' },
    { year: '2029', title: 'Continuous growth', description: 'Expanding expertise and helping businesses transform digitally' }
  ];

  return (
    <>
      <Helmet>
        <title>{`${t('nav.about')} - ETB`}</title>
        <meta
          name="description"
          content="Learn about Erline Beutcha Toumi's professional journey, values, and vision in IT and software development."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em' }}>
                {t('about.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('about.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1670299745460-50e87692474b"
                    alt="Erline Beutcha Toumi - Young Black African woman with tech-focused professional appearance, IT student portrait"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/40 to-transparent"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                    {t('about.intro').split('.')[0]}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.intro')}
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {t('about.journey.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.journey.content')}
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {t('about.values.title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.values.content')}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 mb-20 relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/20" />
              <blockquote className="relative z-10">
                <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-4">
                  {t('about.quote')}
                </p>
                <footer className="text-muted-foreground font-medium">
                  — Erline Beutcha Toumi
                </footer>
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-semibold mb-8 text-center">Professional timeline</h2>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="relative flex gap-6 items-start"
                    >
                      <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-xl bg-primary text-primary-foreground items-center justify-center font-bold text-sm">
                        {item.year}
                      </div>
                      <div className="flex-1 bg-card rounded-2xl p-6 border border-border">
                        <div className="md:hidden text-sm font-bold text-primary mb-2">{item.year}</div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
