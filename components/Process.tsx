
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Cpu, PlugZap, Activity } from 'lucide-react';

const steps = [
  { 
    id: 1, 
    title: "Discovery", 
    description: "10–15 min call to understand your goals.", 
    icon: PhoneCall,
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
    border: "border-brand-purple/20"
  },
  { 
    id: 2, 
    title: "Prototype", 
    description: "Test your custom AI voice agent & call logs.", 
    icon: Cpu,
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/20"
  },
  { 
    id: 3, 
    title: "Integrate", 
    description: "Connect CRM, calendar, IVR, & refine prompts.", 
    icon: PlugZap,
    color: "text-accent-orange",
    bg: "bg-accent-orange/10",
    border: "border-accent-orange/20"
  },
  { 
    id: 4, 
    title: "Go Live", 
    description: "Full operation with continuous monitoring.", 
    icon: Activity,
    color: "text-accent-green",
    bg: "bg-accent-green/10",
    border: "border-accent-green/20"
  },
];

const Process: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
             Clear. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-accent-blue">Fast. Accountable.</span>
          </h2>
          <p className="text-gray-500 text-lg">Go live in 4 simple steps.</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] w-[80%] h-[2px] bg-gray-100" />
          <motion.div 
            className="hidden lg:block absolute top-12 left-[10%] h-[2px] bg-brand-purple"
            initial={{ width: "0%" }}
            whileInView={{ width: "80%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon Node */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500">
                   <div className={`w-full h-full rounded-full ${step.bg} flex items-center justify-center border ${step.border} group-hover:border-opacity-100 transition-colors`}>
                     <step.icon className={`${step.color}`} size={32} />
                   </div>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-2xl w-full hover:shadow-xl transition-all duration-300">
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
