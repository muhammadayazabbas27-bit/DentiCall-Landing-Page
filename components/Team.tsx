
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-deep-navy">Visionaries</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              animate={{ y: [0, -5, 0] }} // Gentle floating
              // @ts-ignore - framer motion transition typing quirk
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: index * 0.5 
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative w-64 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Hologram Beam Effect on Hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              
              {/* Neon Particles (Simulated with simple dots) */}
              <div className="absolute bottom-4 left-1/2 w-1 h-1 bg-neon-blue rounded-full opacity-0 group-hover:animate-ping" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-neon-blue transition-colors duration-300">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-medium text-deep-navy">{member.name}</h3>
                <p className="text-sm text-slate-500 text-neon-blue/80">{member.role}</p>
              </div>

              {/* Decorative Lines */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;