
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext.jsx';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-white hover:bg-white/20' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-[#0077b5] hover:bg-[#0077b5]/20' },
    { icon: MessageCircle, href: 'https://wa.me/', label: 'WhatsApp', color: 'hover:text-[#25d366] hover:bg-[#25d366]/20' }
  ];

  return (
    <footer className="bg-[#0f1f35] border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">ETB</span>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">Erline Toumi</span>
            </div>
            <p className="text-foreground/70 mb-8 max-w-sm">
              <span className="text-primary font-bold">BE</span>lieve in <span className="text-accent font-bold">YOU</span>rselve. Engineering resilient digital experiences for modern forward-thinking businesses.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/70 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <h4 className="text-white font-semibold mb-6 tracking-wide">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Skills', 'Portfolio', 'Contact'].map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-wide">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-foreground/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-foreground/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/50">
            {t('footer.copyright').replace('2026', currentYear.toString())}
          </p>
          <div className="flex items-center gap-2 text-sm text-foreground/50">
            <span>Designed & Built with</span>
            <span className="text-destructive animate-pulse">❤</span>
            <span>by ETB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
