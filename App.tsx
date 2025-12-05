
import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Activity } from 'lucide-react';
import Hero from './components/Hero';
import USP from './components/USP';
import Stats from './components/Stats';
import Process from './components/Process';
import Features from './components/Features';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Personas from './components/Personas';
import PainPoints from './components/PainPoints';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeTab, setActiveTab] = useState('');

  const navItems = [
    { name: 'Our Process', id: 'process' },
    { name: 'Why Us', id: 'pain-points' },
    { name: 'See This', id: 'stats' },
  ];

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openBookingLink = () => {
    window.open('https://cal.com/ayaz-abbas-hitit.agency/out-bound-warm-leads-appointments', '_blank');
  };

  return (
    <div className="font-sans antialiased text-brand-dark bg-white selection:bg-brand-purple selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple to-accent-orange origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Header - Pill Style matching CoreShift */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 pointer-events-none">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="pointer-events-auto flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-purple/20 transition-transform group-hover:scale-105">
              <Activity size={20} />
            </div>
            <div className="font-heading font-bold text-xl tracking-tight text-brand-dark">
              DentiCall
            </div>
          </div>

          {/* Navigation Pill */}
          <div className="pointer-events-auto hidden md:block">
            <nav className="flex items-center gap-1 px-2 py-2 bg-white/90 backdrop-blur-md border border-gray-100 rounded-full shadow-lg shadow-gray-200/50">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${activeTab === item.id 
                      ? 'text-brand-dark bg-gray-100 font-semibold' 
                      : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50'
                    }
                  `}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* CTA Button - Black Pill */}
          <button 
            onClick={openBookingLink}
            className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full bg-brand-dark text-white text-sm font-semibold hover:bg-black transition-all shadow-md transform hover:-translate-y-0.5"
          >
            Request a Demo
          </button>
        </div>
      </header>

      <main>
        <div id="hero">
          <Hero />
        </div>
        <div id="personas">
          <Personas />
        </div>
        <div id="pain-points">
          <PainPoints />
        </div>
        <div id="usp">
          <USP />
        </div>
        <div id="stats">
          <Stats />
        </div>
        <div id="process">
          <Process />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="contact">
          <FinalCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;