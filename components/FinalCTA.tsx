
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, MessageCircle, Globe, Shield, Zap, Bell, CheckCircle } from 'lucide-react';

const icons = [Phone, Calendar, MessageCircle, Globe, Shield, Zap, Bell, CheckCircle];

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
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
       </div>

       {/* Rainbow Curve Animation Background */}
       {/* Removed opacity-0 wrapper to let CSS animation handle visibility naturally */}
       <div className="absolute top-1/2 left-0 w-full h-[300px] -translate-y-1/2 pointer-events-none opacity-40 z-0">
           {icons.map((Icon, index) => {
             const delay = (14 / icons.length) * index * -1;
             return (
               <div 
                  key={index} 
                  className="absolute top-0 left-0 animate-rainbow-x will-change-transform"
                  style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
               >
                 <div 
                    className="animate-rainbow-y will-change-transform flex flex-col items-center"
                    style={{ animationDelay: `${delay}s` }}
                 >
                   <div className="w-14 h-14 bg-white rounded-2xl shadow-lg border border-brand-purple/10 flex items-center justify-center text-brand-purple transform rotate-12">
                     <Icon size={24} />
                   </div>
                 </div>
               </div>
             );
           })}
       </div>

       <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-bold text-brand-dark leading-tight mb-8 tracking-tight"
            >
              Turn every call into a patient. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500">Automate your day.</span>
            </motion.h2>
            
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
               className="text-xl md:text-2xl text-gray-500 mb-12 font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Reduce no-shows, increase bookings, and give your team their time back.
            </motion.p>
            
            <motion.button
              onClick={openBookingLink}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="px-12 py-5 bg-gradient-to-r from-brand-purple to-violet-600 text-white text-xl font-bold rounded-full hover:shadow-2xl hover:shadow-purple-500/30 transition-all transform z-20"
            >
              Request a Demo
            </motion.button>
       </div>
    </section>
  );
};

export default FinalCTA;
