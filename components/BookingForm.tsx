
import React from 'react';
import { motion } from 'framer-motion';

const BookingForm: React.FC = () => {
  const openBookingLink = () => {
    window.open('https://cal.com/ayaz-abbas-hitit.agency/out-bound-warm-leads-appointments', '_blank');
  };

  return (
    <motion.form 
      className="bg-white border border-accent p-8 rounded-2xl w-full max-w-md shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-xl font-heading font-bold text-text-main mb-6 tracking-tight">
        Get Started <span className="text-primary">Today</span>
      </h3>
      
      <div className="space-y-4 font-sans">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="First Name" 
            className="w-full bg-bg-main border border-slate-200 rounded-lg px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            className="w-full bg-bg-main border border-slate-200 rounded-lg px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
          />
        </div>
        
        <input 
          type="tel" 
          placeholder="Phone Number" 
          className="w-full bg-bg-main border border-slate-200 rounded-lg px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
        />
        
        <input 
          type="email" 
          placeholder="Work Email" 
          className="w-full bg-bg-main border border-slate-200 rounded-lg px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400"
        />
        
        <textarea 
          placeholder="Anything we should know?" 
          rows={3}
          className="w-full bg-bg-main border border-slate-200 rounded-lg px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-400 resize-none"
        />

        <motion.button
          onClick={openBookingLink}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full bg-btn-primary text-white font-heading font-semibold tracking-wide py-3 rounded-lg shadow-md hover:bg-btn-hover transition-all"
        >
          Book 15-min Intro
        </motion.button>
      </div>
    </motion.form>
  );
};

export default BookingForm;