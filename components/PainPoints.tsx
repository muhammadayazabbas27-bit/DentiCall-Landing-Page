
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, UserX, Heart, CalendarX } from 'lucide-react';

const pains = [
  { icon: PhoneOff, title: "Missed Calls", desc: "Clinics miss 30–50% of calls." },
  { icon: UserX, title: "High No-Show Rate", desc: "Average 30% no-shows." },
  { icon: Heart, title: "Trust Gap", desc: "Lack of follow-up reduces trust." },
  { icon: CalendarX, title: "Scheduling Gaps", desc: "Empty slots mean lost revenue." },
];

const PainPoints: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white perspective-container">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
             <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
                Core <span className="text-brand-purple">Problems</span> Solved
             </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pains.map((p, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ 
                   delay: i * 0.1, 
                   duration: 0.8, 
                   ease: [0.22, 1, 0.36, 1] 
                 }}
                 // 3D Hover Lift
                 whileHover={{ y: -15, scale: 1.05, rotateX: 5, zIndex: 10 }}
                 className="bg-brand-gray rounded-3xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100 group preserve-3d"
               >
                 <div className={`w-14 h-14 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-6 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300 card-icon-pop shadow-lg`}>
                   <p.icon size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-brand-dark mb-2 card-content-pop">{p.title}</h3>
                 <p className="text-gray-500 text-sm leading-relaxed card-content-pop">{p.desc}</p>
               </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default PainPoints;
