
import React from 'react';
import { motion } from 'framer-motion';

const team = [
  { id: 1, name: "Dr. Elena R.", role: "Chief Medical Officer", image: "https://picsum.photos/200/200?random=1" },
  { id: 2, name: "James Chen", role: "AI Lead", image: "https://picsum.photos/200/200?random=2" },
  { id: 3, name: "Sarah K.", role: "Product Design", image: "https://picsum.photos/200/200?random=3" },
];

const Team: React.FC = () => {
  return (
    <section className="py-24 bg-sky-50/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-deep-navy">Visionaries</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative w-64 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-neon-blue transition-colors duration-300">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-medium text-deep-navy">{member.name}</h3>
                <p className="text-sm text-slate-500 text-neon-blue/80">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
