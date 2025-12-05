
import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA: React.FC = () => {
  const openBookingLink = () => {
    window.open('https://cal.com/ayaz-abbas-hitit.agency/out-bound-warm-leads-appointments', '_blank');
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-gray/30 to-white opacity-60" />
       
       {/* Decorative Blobs */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent-orange/5 rounded-full blur-3xl" />
       </div>

       <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold text-brand-dark leading-tight mb-8 tracking-tight"
            >
              Turn every call into a patient. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-accent-blue">Automate your day.</span>
            </motion.h2>
            
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-xl md:text-2xl text-gray-500 mb-12 font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Reduce no-shows, increase bookings, and give your team their time back.
            </motion.p>
            
            <motion.button
              onClick={openBookingLink}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.4 }}
              className="px-12 py-5 bg-gradient-to-r from-accent-orange to-accent-red text-white text-xl font-bold rounded-full hover:shadow-2xl hover:shadow-orange-500/30 transition-all transform"
            >
              Request a Demo
            </motion.button>
       </div>
    </section>
  );
};

export default FinalCTA;