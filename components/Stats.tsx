
import React from 'react';
import { motion } from 'framer-motion';

const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-6">
         <div className="text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
             Real data from <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-accent-blue">industry</span>
           </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           {[
             { val: "50%", label: "Missed Calls", desc: "Average monthly missed opportunities", color: "text-accent-red" },
             { val: "30%", label: "No-Show Rate", desc: "Industry average without automation", color: "text-accent-orange" },
             { val: "24/7", label: "Availability", desc: "Instant response time with AI", color: "text-brand-purple" }
           ].map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="text-center p-8 bg-brand-gray/50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300"
             >
                <div className={`text-6xl font-bold mb-4 ${stat.color}`}>{stat.val}</div>
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