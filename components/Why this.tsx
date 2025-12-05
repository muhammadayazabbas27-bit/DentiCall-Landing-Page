import React from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, UserX, HeartCrack, CalendarX } from 'lucide-react';

const pains = [
  { icon: PhoneOff, title: "Missed Calls", desc: "Clinics miss 30–50% of inbound calls every month." },
  { icon: UserX, title: "High No-Show Rate", desc: "30% average no-show rate eats into revenue." },
  { icon: HeartCrack, title: "Trust Gap", desc: "Lack of pre-appointment follow-up reduces patient confidence." },
  { icon: CalendarX, title: "Scheduling Gaps", desc: "Missed calls + no-shows disrupt daily schedules." },
];

const PainPoints: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-slate-50/50 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
             <h2 className="text-3xl md:text-5xl font-light text-deep-navy mb-4">
                The real reasons clinics <span className="text-red-500 font-medium">lose revenue</span>
             </h2>
             <p className="text-slate-500">Silent profit killers impacting your practice every month</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pains.map((p, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.15, ease: "easeOut" }}
                 whileHover={{ scale: 1.02 }}
                 className="bg-metallic-gray border border-slate-200 p-8 rounded-2xl hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 group"
               >
                 <div className="mb-6 text-slate-400 group-hover:text-red-500 transition-colors">
                   <p.icon size={36} />
                 </div>
                 <h3 className="text-lg font-medium text-deep-navy mb-3">{p.title}</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
               </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default PainPoints;