
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIncoming, CalendarCheck, MessageCircle, Globe, Share2, Voicemail, RotateCcw, Bell } from 'lucide-react';

const features = [
  { 
    title: "24/7 Call Answering", 
    icon: PhoneIncoming, 
    color: "bg-blue-100 text-blue-600 border-blue-200" 
  },
  { 
    title: "Appointment Booking", 
    icon: CalendarCheck, 
    color: "bg-purple-100 text-purple-600 border-purple-200" 
  },
  { 
    title: "WhatsApp Automation", 
    icon: MessageCircle, 
    color: "bg-teal-100 text-teal-600 border-teal-200" 
  },
  { 
    title: "Multilingual Support", 
    icon: Globe, 
    color: "bg-indigo-100 text-indigo-600 border-indigo-200" 
  },
  { 
    title: "Social Media Bot", 
    icon: Share2, 
    color: "bg-pink-100 text-pink-600 border-pink-200" 
  },
  { 
    title: "Missed Call Capture", 
    icon: Voicemail, 
    color: "bg-red-100 text-red-600 border-red-200" 
  },
  { 
    title: "Recall & Reactivation", 
    icon: RotateCcw, 
    color: "bg-yellow-100 text-yellow-600 border-yellow-200" 
  },
  { 
    title: "Reminders", 
    icon: Bell, 
    color: "bg-violet-100 text-violet-600 border-violet-200" 
  },
];

const RobotCenter = () => {
  const colorSequence = ["#FFFFFF", "#22D3EE", "#FACC15", "#FFFFFF"];
  const glowSequence = [
    "0 0 15px rgba(255,255,255,0.8)",
    "0 0 15px rgba(34,211,238,0.8)",
    "0 0 15px rgba(250,204,21,0.8)",
    "0 0 15px rgba(255,255,255,0.8)"
  ];

  return (
    <motion.div
      className="absolute z-20 preserve-3d"
      animate={{ y: [-15, 15, -15], rotateY: [0, 10, -10, 0] }}
      transition={{ 
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <div className="relative w-36 h-36 bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#6d28d9] rounded-[2.5rem] shadow-[0_20px_50px_rgba(139,92,246,0.6)] flex items-center justify-center border border-white/20 ring-1 ring-purple-500/30 transform-style-3d">
         {/* 3D Reflection */}
         <div className="absolute top-0 left-0 w-full h-full rounded-[2.5rem] overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white via-transparent to-transparent rotate-45" />
         </div>
         {/* Face Container */}
         <div className="flex flex-col items-center justify-center gap-3 relative z-10 mt-2 preserve-3d" style={{ transform: "translateZ(20px)" }}>
            <div className="flex gap-5">
                <motion.div 
                  animate={{ 
                    scaleY: [1, 0.1, 1, 1, 1], 
                    backgroundColor: colorSequence,
                    boxShadow: glowSequence
                  }}
                  transition={{ 
                    scaleY: { duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.9, 1] },
                    backgroundColor: { duration: 6, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 6, repeat: Infinity, ease: "linear" }
                  }}
                  className="w-7 h-5 rounded-full" 
                />
                <motion.div 
                  animate={{ 
                    scaleY: [1, 0.1, 1, 1, 1], 
                    backgroundColor: colorSequence,
                    boxShadow: glowSequence
                  }}
                  transition={{ 
                    scaleY: { duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.9, 1] },
                    backgroundColor: { duration: 6, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 6, repeat: Infinity, ease: "linear" }
                  }}
                  className="w-7 h-5 rounded-full" 
                />
            </div>
            <motion.div
                className="w-10 h-4 border-b-[3px] rounded-b-full"
                animate={{ 
                    borderColor: colorSequence,
                    filter: ["drop-shadow(0 0 5px rgba(255,255,255,0.5))", "drop-shadow(0 0 5px rgba(34,211,238,0.5))", "drop-shadow(0 0 5px rgba(250,204,21,0.5))", "drop-shadow(0 0 5px rgba(255,255,255,0.5))"]
                }}
                transition={{ 
                    borderColor: { duration: 6, repeat: Infinity, ease: "linear" },
                    filter: { duration: 6, repeat: Infinity, ease: "linear" }
                }}
            />
         </div>
         <div className="absolute -left-1 w-2 h-8 bg-[#6d28d9] rounded-l-full shadow-inner" style={{ transform: "translateZ(-10px)" }} />
         <div className="absolute -right-1 w-2 h-8 bg-[#6d28d9] rounded-r-full shadow-inner" style={{ transform: "translateZ(-10px)" }} />
         <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-4 bg-brand-purple/20 blur-xl rounded-full" />
      </div>
    </motion.div>
  )
}

const Features: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden perspective-container">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-white pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-0 relative z-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
            Everything your clinic needs <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500">to operate on autopilot</span>
          </h2>
        </motion.div>
        
        {/* Mobile View: Horizontal Infinite Marquee */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="block md:hidden relative w-full overflow-hidden mt-8"
        >
             <div className="flex gap-4 animate-marquee whitespace-nowrap">
                {[...features, ...features].map((feature, index) => (
                    <div key={index} className="inline-block w-[200px] shrink-0">
                        <div className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-md border border-gray-100">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm ${feature.color.split(' ')[0]} ${feature.color.split(' ')[1]}`}>
                                <feature.icon size={20} />
                            </div>
                            <h3 className="text-sm font-bold text-brand-dark whitespace-normal">
                                {feature.title}
                            </h3>
                        </div>
                    </div>
                ))}
             </div>
        </motion.div>

        {/* Desktop View: 3D Gyroscopic Orbit Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex relative w-full h-[700px] items-center justify-center -mt-20 preserve-3d"
        >
           <RobotCenter />
           
           {/* 3D Ring Container - Tilted */}
           <div 
             className="relative w-[600px] h-[600px] rounded-full border border-gray-100/50 preserve-3d"
             style={{ transform: "rotateX(70deg) rotateZ(0deg)" }}
           >
              <motion.div 
                 className="w-full h-full preserve-3d"
                 animate={{ rotateZ: 360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                  {features.map((feature, index) => {
                    const angle = (360 / features.length) * index;
                    const radius = 280;
                    return (
                      <div 
                        key={index}
                        className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center preserve-3d"
                        style={{ 
                          transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` 
                        }}
                      >
                        {/* Counter-rotate items to keep them upright in 3D */}
                        <motion.div 
                           animate={{ rotateZ: -360 }}
                           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                           className="preserve-3d"
                        >
                            <div 
                                style={{ transform: "rotateX(-70deg)" }} // Counter tilt to face user
                                className="w-[180px] bg-white p-5 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl border hover:scale-125 transition-transform duration-300 border-gray-100 group backface-hidden"
                            >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 shadow-md border transition-all ${feature.color} card-icon-pop`}>
                                <feature.icon size={22} />
                              </div>
                              <h3 className="text-xs font-bold text-brand-dark">
                                {feature.title}
                              </h3>
                            </div>
                        </motion.div>
                      </div>
                    );
                  })}
              </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
