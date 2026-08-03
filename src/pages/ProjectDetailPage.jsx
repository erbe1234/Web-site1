import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/contexts/LanguageContext.jsx';
import { Button } from '@/components/ui/button';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { t } = useLanguage();

  const projectMap = {
    webapps: {
      title: t('portfolio.projects.webapps.title'),
      description: t('portfolio.projects.webapps.description')
    },
    websites: {
      title: t('portfolio.projects.websites.title'),
      description: t('portfolio.projects.websites.description')
    },
    game2048: {
      title: t('portfolio.projects.game2048.title'),
      description: t('portfolio.projects.game2048.description')
    },
    viergwinn: {
      title: t('portfolio.projects.viergwinn.title'),
      description: t('portfolio.projects.viergwinn.description')
    },
    game90grad: {
      title: t('portfolio.projects.game90grad.title'),
      description: t('portfolio.projects.game90grad.description')
    },
    pingpong: {
      title: t('portfolio.projects.pingpong.title'),
      description: t('portfolio.projects.pingpong.description')
    }
  };

  const project = projectMap[slug] || { title: t('portfolio.title'), description: 'Project not found.' };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-muted-foreground mb-6">{project.description}</p>

            <div className="flex items-center gap-3">
              <Link to="/portfolio">
                <Button variant="ghost">Back to portfolio</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
