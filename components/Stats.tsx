
import React from 'react';
import { motion } from 'framer-motion';

const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6">
         <div className="text-center mb-16">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
             className="text-4xl md:text-5xl font-bold text-brand-dark"
           >
             Real data from <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500">industry</span>
           </motion.h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           {[
             { val: "50", label: "Missed Calls", desc: "Average monthly missed opportunities" },
             { val: "30%", label: "No-Show Rate", desc: "Industry average without automation" },
             { val: "24/7", label: "Availability", desc: "Instant response time with AI" }
           ].map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
               className="text-center p-8 bg-brand-gray/50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-gray-100"
             >
                <div className={`text-6xl font-bold mb-4 text-brand-purple`}>{stat.val}</div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">{stat.label}</h3>
                <p className="text-gray-500">{stat.desc}</p>
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
};

export default Stats;
