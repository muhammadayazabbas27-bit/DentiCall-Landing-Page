
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Activity } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark pt-20 pb-10 relative overflow-hidden text-white">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-8"
        >
            <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-purple/20">
                <Activity size={20} />
            </div>
            <h2 className="text-2xl font-heading font-bold text-white tracking-tight">
              Denti<span className="text-brand-purple">Call</span>
            </h2>
        </motion.div>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md mb-8 font-sans font-light text-slate-300 leading-relaxed"
        >
          The world's most advanced AI voice system for dental clinics. <br/>Automating care, 24/7.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex space-x-6 mb-12"
        >
          {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
            <a key={i} href="#" className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110">
              <Icon size={20} />
            </a>
          ))}
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 font-sans"
        >
          <p>&copy; {new Date().getFullYear()} DentiCall AI Inc.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <span className="text-slate-600">|</span>
             <span className="hover:text-slate-300 cursor-pointer transition-colors">Made for the Future</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
