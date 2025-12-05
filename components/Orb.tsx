import React from 'react';
import { motion } from 'framer-motion';

interface OrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  active?: boolean;
  volume?: number;
}

const Orb: React.FC<OrbProps> = ({ className = '', size = 'lg', active = false, volume = 0 }) => {
  let sizeClass = 'w-[400px] h-[400px]';
  let coreSize = 160;

  if (size === 'sm') {
    sizeClass = 'w-[100px] h-[100px]';
    coreSize = 40;
  } else if (size === 'xl') {
    sizeClass = 'w-[800px] h-[800px]';
    coreSize = 300;
  }

  return (
    <motion.div 
      className={`relative flex items-center justify-center ${sizeClass} ${className} pointer-events-none`}
      animate={active ? "active" : "idle"}
      variants={{
        idle: { scale: 1 },
        active: { scale: 6 } // Expand massively to cover background
      }}
      transition={{ 
        duration: 1.2, 
        type: "spring", 
        stiffness: 50, 
        damping: 20 
      }}
    >
      
      {/* Outer Glow - Expands and softens */}
      <motion.div 
        className="absolute inset-0 bg-brand-purple/20 rounded-full blur-[100px]"
        variants={{
          idle: { opacity: 0.3, scale: 1 },
          active: { opacity: 0.15, scale: 1.2 + (volume * 0.2) } // React to volume
        }}
        transition={{ duration: 0.2 }} // Fast response for volume
      />

      {/* Rings - Hide when expanded to avoid sharp lines on background */}
      <motion.div 
        className="absolute w-full h-full rounded-full border border-brand-purple/10"
        animate={{ rotate: 360 }}
        variants={{
          idle: { opacity: 1, scale: 1 },
          active: { opacity: 0, scale: 1.5 } // Fade out rings
        }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 } }}
        style={{ borderTopColor: 'transparent', borderRightColor: 'rgba(139, 92, 246, 0.3)' }}
      />
      <motion.div 
        className="absolute w-[70%] h-[70%] rounded-full border border-accent-blue/20"
        animate={{ rotate: -360 }}
        variants={{
          idle: { opacity: 1, scale: 1 },
          active: { opacity: 0, scale: 1.5 } // Fade out rings
        }}
        transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 } }}
        style={{ borderBottomColor: 'transparent', borderLeftColor: 'rgba(6, 182, 212, 0.4)' }}
      />

      {/* Main Core - The Bubble */}
      <motion.div 
        className="relative rounded-full shadow-2xl bg-gradient-to-br from-brand-purple via-violet-500 to-accent-blue flex items-center justify-center overflow-hidden"
        style={{ width: coreSize, height: coreSize }}
        animate={active ? {
          scale: 1.2 + (volume * 0.2), 
          filter: "blur(20px)"
        } : "idle"}
        variants={{
          idle: { scale: 1 },
          active: { 
            scale: 1.2,
            filter: "blur(20px)" 
          } 
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="absolute inset-0 bg-white/20 blur-md" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Orb;