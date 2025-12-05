
import React from 'react';
import { motion } from 'framer-motion';
import { User, TrendingUp, Globe } from 'lucide-react';

const personas = [
  { 
    icon: User, 
    title: "Solo Dentists", 
    desc: "Automate reception without hiring extra staff.", 
    color: "text-brand-purple", 
    bg: "bg-brand-purple/10" 
  },
  { 
    icon: TrendingUp, 
    title: "Growing Clinics", 
    desc: "Handle high call volumes efficiently.", 
    color: "text-accent-green", 
    bg: "bg-accent-green/10" 
  },
  { 
    icon: Globe, 
    title: "Multi-Location", 
    desc: "Centralized control for all branches.", 
    color: "text-accent-blue", 
    bg: "bg-accent-blue/10" 
  },
];

const Personas: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
            Built for <span className="text-brand-purple">everyone</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Scalable infrastructure that fits perfectly for any size practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {personas.map((p, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.2 }}
               whileHover={{ y: -5 }}
               className="bg-brand-gray rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
             >
               <div className={`w-14 h-14 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                 <p.icon size={28} />
               </div>
               <h3 className="text-xl font-bold text-brand-dark mb-2">{p.title}</h3>
               <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Personas;