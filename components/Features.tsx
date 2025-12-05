
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIncoming, CalendarCheck, MessageCircle, Globe, Share2, Voicemail, RotateCcw, Bell } from 'lucide-react';

const features = [
  { title: "24/7 Call Answering", icon: PhoneIncoming, color: "bg-brand-purple" },
  { title: "Appointment Booking", icon: CalendarCheck, color: "bg-accent-orange" },
  { title: "WhatsApp Automation", icon: MessageCircle, color: "bg-accent-green" },
  { title: "Multilingual Support", icon: Globe, color: "bg-accent-blue" },
  { title: "Social Media Bot", icon: Share2, color: "bg-accent-yellow" },
  { title: "Missed Call Capture", icon: Voicemail, color: "bg-accent-red" },
  { title: "Recall & Reactivation", icon: RotateCcw, color: "bg-brand-dark" },
  { title: "Reminders", icon: Bell, color: "bg-brand-purple" },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-brand-gray/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
            Everything your clinic needs <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-accent-blue">to operate on autopilot</span>
          </h2>
        </motion.div>

        {/* Rainbow Curve Container */}
        <div className="relative w-full h-[400px] overflow-hidden">
           {/* Fade Masks */}
           <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-gray-50/50 to-transparent z-20 pointer-events-none" />
           <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-gray-50/50 to-transparent z-20 pointer-events-none" />

           {features.map((feature, index) => {
             // Calculate delay to stagger the items evenly along the path
             // Duration is 14s, 8 items. Interval ~= 1.75s
             const delay = (14 / features.length) * index * -1;
             
             return (
               <div 
                  key={index} 
                  className="absolute top-0 animate-rainbow-x will-change-transform"
                  style={{ animationDelay: `${delay}s` }}
               >
                 {/* Inner container handles Y-axis curve */}
                 <div 
                    className="animate-rainbow-y will-change-transform flex flex-col items-center"
                    style={{ animationDelay: `${delay}s` }}
                 >
                   <div className="w-[200px] bg-white p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-lg border border-gray-100/50 hover:scale-105 transition-transform duration-300">
                     <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-3 text-white shadow-md`}>
                       <feature.icon size={24} />
                     </div>
                     <h3 className="text-sm font-bold text-brand-dark">
                       {feature.title}
                     </h3>
                   </div>
                 </div>
               </div>
             );
           })}
        </div>
      </div>
    </section>
  );
};

export default Features;