
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Cpu, PlugZap, Activity } from 'lucide-react';

const steps = [
  { 
    id: 1, 
    title: "Discovery", 
    description: "10–15 min call to understand your goals.", 
    icon: PhoneCall,
  },
  { 
    id: 2, 
    title: "Prototype", 
    description: "Test your custom AI voice agent & call logs.", 
    icon: Cpu,
  },
  { 
    id: 3, 
    title: "Integrate", 
    description: "Connect CRM, calendar, IVR, & refine prompts.", 
    icon: PlugZap,
  },
  { 
    id: 4, 
    title: "Go Live", 
    description: "Full operation with continuous monitoring.", 
    icon: Activity,
  },
];

const Process: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative perspective-container">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-bold text-brand-dark mb-4"
          >
             Clear. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500">Fast. Accountable.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 text-lg"
          >
            Go live in 4 simple steps.
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] w-[80%] h-[2px] bg-gray-100 transform translate-z-0" />
          <motion.div 
            className="hidden lg:block absolute top-12 left-[10%] h-[2px] bg-brand-purple"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-150px" }}
            style={{ originX: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 preserve-3d">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40, rotateY: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center group preserve-3d"
              >
                {/* Icon Node */}
                <div 
                    className="relative z-10 w-24 h-24 rounded-full bg-white border-4 border-white shadow-2xl flex items-center justify-center mb-8 group-hover:scale-125 transition-all duration-500"
                    style={{ transform: "translateZ(30px)" }}
                >
                   <div className={`w-full h-full rounded-full bg-brand-purple/5 flex items-center justify-center border border-brand-purple/20 group-hover:bg-brand-purple group-hover:text-white transition-all`}>
                     <step.icon className={`text-brand-purple group-hover:text-white transition-colors`} size={32} />
                   </div>
                </div>

                <div 
                    className="p-6 bg-white border border-gray-100 rounded-2xl w-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[160px] flex flex-col justify-center"
                    style={{ transform: "translateZ(10px)" }}
                >
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
