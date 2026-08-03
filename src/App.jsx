
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from '@/contexts/LanguageContext.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import HomePage from '@/pages/HomePage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import SkillsPage from '@/pages/SkillsPage.jsx';
import PortfolioPage from '@/pages/PortfolioPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import ProjectDetailPage from '@/pages/ProjectDetailPage.jsx';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-8">Page not found</p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200"
                >
                  Back to home
                </a>
              </div>
            </div>
          } />
        </Routes>
        <Toaster />
      </Router>
    </LanguageProvider>
  );
}

export default App;
