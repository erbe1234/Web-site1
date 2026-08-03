
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
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-xl group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ perspective: 1200 }}
                >
                  <motion.div
                    className="relative"
                    animate={{
                      scale: [1.08, 1.15, 1.08, 1.15, 1.08],
                      x: [0, -18, 0, 18, 0],
                      y: [0, -8, -3, -8, 0],
                      rotateY: [0, 10, 0, -10, 0],
                      rotateX: [0, 3, 0, 3, 0],
                    }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img
                      src="https://www.rokform.com/cdn/shop/articles/best-apps-for-student-productivity_a62407fb-87f8-4e76-8cd8-358e67585e93-4045550.webp?v=1775837088&width=1500"
                      alt="Student IT workspace with a laptop, tablet, notebooks, planner and pens on a desk"
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute right-[4%] top-[17%] hidden w-[31%] rounded-md border border-cyan-300/30 bg-[#06111f]/95 p-2 shadow-[0_0_22px_rgba(0,217,255,0.45)] sm:block"
                      animate={{ opacity: [0.82, 1, 0.82] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        transform: 'rotate(-2deg) skewX(-3deg)',
                        transformOrigin: 'center',
                      }}
                    >
                      <div className="mb-1 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-300"></span>
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                      </div>
                      <pre className="overflow-hidden whitespace-pre-wrap font-mono text-[7px] leading-tight text-cyan-100 md:text-[9px]">
{`const dream = 'IT';
const student = {
  focused: true,
  creative: true,
};

function buildFuture() {
  return dream + ' career';
}`}
                      </pre>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/45 via-transparent to-primary/10"
                    animate={{ opacity: [0.55, 0.35, 0.55, 0.35, 0.55] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-y-0 w-1/2 bg-white/20 blur-3xl"
                    animate={{
                      left: ['-45%', '15%', '95%', '15%', '-45%'],
                      opacity: [0.1, 0.22, 0.1, 0.22, 0.1],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl pointer-events-none"></div>
                </motion.div>
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
              className="bg-gradient-to-br from-[#001F3F] to-[#0a1628] rounded-2xl p-8 md:p-12 mb-20 relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-16 h-16 text-white/20" />
              <blockquote className="relative z-10">
                <p className="text-xl md:text-2xl font-bold italic text-white leading-relaxed mb-4">
                  {t('about.quote')}
                </p>
                <footer className="text-white/80 font-bold italic">
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
