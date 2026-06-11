
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const PortfolioPage = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('portfolio.projects.ecommerce.title'),
      description: t('portfolio.projects.ecommerce.description'),
      image: null,
      link: '#'
    },
    {
      title: t('portfolio.projects.dashboard.title'),
      description: t('portfolio.projects.dashboard.description'),
      image: null,
      link: '#'
    },
    {
      title: t('portfolio.projects.mobile.title'),
      description: t('portfolio.projects.mobile.description'),
      image: null,
      link: '#'
    },
    {
      title: t('portfolio.projects.api.title'),
      description: t('portfolio.projects.api.description'),
      image: null,
      link: '#'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`${t('nav.portfolio')} - ETB`}</title>
        <meta
          name="description"
          content="Explore Erline Beutcha Toumi's portfolio of web development, cloud solutions, and IT projects."
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
                {t('portfolio.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('portfolio.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 text-center"
            >
              <div className="bg-muted rounded-2xl p-8 md:p-12">
                <h2 className="text-2xl font-semibold mb-4">More projects coming soon</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  I am constantly working on new and exciting projects. Check back regularly to see the latest additions to my portfolio.
                </p>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage;
