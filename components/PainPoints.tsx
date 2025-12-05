
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, UserX, Heart, CalendarX } from 'lucide-react';

const pains = [
  { icon: PhoneOff, title: "Missed Calls", desc: "Clinics miss 30–50% of calls.", color: "text-accent-red", bg: "bg-accent-red/10" },
  { icon: UserX, title: "High No-Show Rate", desc: "Average 30% no-shows.", color: "text-accent-orange", bg: "bg-accent-orange/10" },
  { icon: Heart, title: "Trust Gap", desc: "Lack of follow-up reduces trust.", color: "text-brand-purple", bg: "bg-brand-purple/10" },
  { icon: CalendarX, title: "Scheduling Gaps", desc: "Empty slots mean lost revenue.", color: "text-accent-blue", bg: "bg-accent-blue/10" },
];

const PainPoints: React.FC = () => {
  return (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
             <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
                Core <span className="text-brand-purple">Problems</span> Solved
             </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pains.map((p, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 whileHover={{ y: -5 }}
                 className="bg-brand-gray rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
               >
                 <div className={`w-14 h-14 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-6`}>
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

export default PainPoints;