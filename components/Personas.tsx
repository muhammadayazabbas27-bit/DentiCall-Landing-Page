
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { User, TrendingUp, Globe } from 'lucide-react';

const personas = [
  { 
    icon: User, 
    title: "Solo Dentists", 
    desc: "Automate reception without hiring extra staff.", 
  },
  { 
    icon: TrendingUp, 
    title: "Growing Clinics", 
    desc: "Handle high call volumes efficiently.", 
  },
  { 
    icon: Globe, 
    title: "Multi-Location", 
    desc: "Centralized control for all branches.", 
  },
];

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ clientX, clientY }: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = clientX - rect.left - rect.width / 2;
    const yPos = clientY - rect.top - rect.height / 2;
    x.set(xPos);
    y.set(yPos);
  }

  function onMouseLeave() {
    setHover(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onMouseLeave}
      style={{
        rotateY: useTransform(mouseX, [-200, 200], [-15, 15]),
        rotateX: useTransform(mouseY, [-200, 200], [15, -15]),
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-200 ease-out ${className} ${hover ? 'z-50' : 'z-0'}`}
    >
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

const Personas: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white perspective-container overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-bold text-brand-dark mb-4 tracking-tight"
          >
            Built for <span className="text-brand-purple">everyone</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 max-w-2xl mx-auto"
          >
            Scalable infrastructure that fits perfectly for any size practice.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {personas.map((p, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ 
                 delay: i * 0.15, 
                 duration: 0.8, 
                 ease: [0.22, 1, 0.36, 1] 
               }}
               className="perspective-container"
             >
               <TiltCard className="h-full bg-brand-gray rounded-3xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-brand-purple/20 group">
                 <div style={{ transform: "translateZ(50px)" }} className={`w-14 h-14 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-6 group-hover:bg-brand-purple group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                   <p.icon size={28} />
                 </div>
                 <h3 style={{ transform: "translateZ(30px)" }} className="text-xl font-bold text-brand-dark mb-2">{p.title}</h3>
                 <p style={{ transform: "translateZ(20px)" }} className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
               </TiltCard>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Personas;
