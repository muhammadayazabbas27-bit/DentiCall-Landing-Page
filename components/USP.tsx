
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap } from 'lucide-react';

const usps = [
  "24/7 Call Handling",
  "Multilingual Voice System",
  "Works on Phone + WhatsApp",
  "Automatic Booking Engine",
  "Smart Follow-ups & Reminders",
  "Enterprise-Level Security",
  "Integrates With Anything",
  "More Affordable Than Hiring"
];

const USP: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
         <div className="text-center mb-16">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-6"
           >
             <Zap size={12} /> Unique Advantage
           </motion.div>
           
           <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
             Not a chatbot. Not a call center.
           </h2>
           <h3 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-accent-blue tracking-tight">
             A complete AI Voice System.
           </h3>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
           {usps.map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               whileHover={{ scale: 1.03, y: -5 }}
               className="group flex items-center space-x-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-brand-purple/10 hover:border-brand-purple/30 cursor-default"
             >
               <div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
                  <CheckCircle2 size={18} className="text-brand-purple group-hover:text-white transition-colors duration-300" />
               </div>
               <span className="text-brand-dark font-medium text-sm group-hover:text-brand-purple transition-colors duration-300">{item}</span>
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
};

export default USP;