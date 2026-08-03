
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code, Server, Cloud, Database, Wrench, Zap, Shield, Sparkles } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SkillCard from '@/components/SkillCard.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const SkillsPage = () => {
  const { t } = useLanguage();

  const skills = [
    { name: 'React & Next.js', category: t('skills.categories.frontend'), level: 92 },
    { name: 'TypeScript', category: t('skills.categories.frontend'), level: 87 },
    { name: 'Tailwind CSS', category: t('skills.categories.frontend'), level: 94 },
    { name: 'HTML5 & Semantic Web', category: t('skills.categories.frontend'), level: 95 },
    { name: 'Node.js & Express', category: t('skills.categories.backend'), level: 89 },
    { name: 'JSON & Node.js Workflows', category: t('skills.categories.backend'), level: 88 },
    { name: 'Java Programming', category: t('skills.categories.backend'), level: 84 },
    { name: 'Python & Django', category: t('skills.categories.backend'), level: 83 },
    { name: 'Python Automation & Scripting', category: t('skills.categories.backend'), level: 86 },
    { name: 'REST & GraphQL APIs', category: t('skills.categories.backend'), level: 91 },
    { name: 'AWS & Azure', category: t('skills.categories.devops'), level: 86 },
    { name: 'Hostinger Hosting & Deployment', category: t('skills.categories.devops'), level: 87 },
    { name: 'Docker & Kubernetes', category: t('skills.categories.devops'), level: 81 },
    { name: 'CI/CD Pipelines', category: t('skills.categories.devops'), level: 88 },
    { name: 'PostgreSQL & MongoDB', category: t('skills.categories.database'), level: 90 },
    { name: 'Redis & Elasticsearch', category: t('skills.categories.database'), level: 79 },
    { name: 'Git & GitHub Version Control', category: t('skills.categories.tools'), level: 95 }
  ];

  const services = [
    {
      icon: Code,
      title: t('skills.services.webDev.title'),
      description: t('skills.services.webDev.description')
    },
    {
      icon: Cloud,
      title: t('skills.services.cloudSolutions.title'),
      description: t('skills.services.cloudSolutions.description')
    },
    {
      icon: Sparkles,
      title: t('skills.services.consulting.title'),
      description: t('skills.services.consulting.description')
    },
    {
      icon: Shield,
      title: t('skills.services.maintenance.title'),
      description: t('skills.services.maintenance.description')
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`${t('nav.skills')} - ETB`}</title>
        <meta
          name="description"
          content="Explore Erline Beutcha Toumi's technical skills and services in web development, cloud solutions, and IT consulting."
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
                {t('skills.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('skills.subtitle')}
              </p>
            </motion.div>

            <div className="mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <SkillCard
                    key={index}
                    name={skill.name}
                    category={skill.category}
                    level={skill.level}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-semibold mb-8 text-center">
                {t('skills.services.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SkillsPage;
