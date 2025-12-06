
import React from 'react';
import { motion } from 'framer-motion';

interface OrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  active?: boolean;
  volume?: number;
}

const Orb: React.FC<OrbProps> = ({ className = '', size = 'lg', active = false, volume = 0 }) => {
  // Base size configuration
  let baseSize = 300;
  if (size === 'sm') baseSize = 100;
  if (size === 'xl') baseSize = 400;

  // Sensitivity of the bubble to sound
  const volumeScale = Math.min(volume, 1.2); 
  
  return (
    <div className={`relative flex items-center justify-center pointer-events-none perspective-container ${className}`}>
      
      {/* 
        MAIN BUBBLE BLOB - 3D SPHERICAL ENHANCEMENTS
      */}
      <motion.div
        className="relative z-0 backdrop-blur-3xl opacity-40 preserve-3d"
        style={{ 
          width: baseSize, 
          height: baseSize,
          // 3D Gradient for Sphere Effect
          background: 'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.8) 0%, rgba(124, 58, 237, 0.4) 40%, rgba(76, 29, 149, 0.1) 80%)',
          boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.2), inset 20px 20px 60px rgba(255,255,255,0.2)'
        }}
        animate={{
          // When active: Scale up to cover background (approx 4x-5x), plus add volume kick
          scale: active ? 4.5 + (volumeScale * 0.5) : 1,
          rotate: active ? [0, 360] : [0, 360],
          
          // The "Bubble" Morphing Effect
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%"
          ]
        }}
        transition={{
          scale: { duration: 0.2, type: "spring", stiffness: 100, damping: 20 }, 
          rotate: { duration: active ? 20 : 10, repeat: Infinity, ease: "linear" }, 
          borderRadius: { 
            duration: active ? 4 : 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatType: "mirror" 
          }
        }}
      >
        {/* Specular Highlight for 3D Gloss */}
        <div className="absolute top-[15%] left-[15%] w-[25%] h-[15%] bg-white/60 rounded-full blur-xl transform -rotate-45 mix-blend-overlay" />
        
        {/* Inner Glare/Reflection */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-[inherit] blur-sm mix-blend-overlay" />
      </motion.div>

      {/* 
        SECONDARY OUTER GLOW 
      */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/30 blur-[80px]"
        style={{ transform: 'translateZ(-50px)' }} // Push back in 3D space
        animate={{
          width: active ? baseSize * 6 : baseSize * 1.5,
          height: active ? baseSize * 6 : baseSize * 1.5,
          opacity: active ? 0.3 + (volumeScale * 0.2) : 0.2
        }}
        transition={{ duration: 0.5 }}
      />

      {/* 
        ORBITAL RINGS - 3D Gyroscope Feel
      */}
      <motion.div
        className="absolute inset-0 border border-brand-purple/30 rounded-full preserve-3d"
        animate={{ 
          scale: active ? 3 : 1.4, 
          opacity: active ? 0 : 1, 
          rotateX: [60, 70, 60], // 3D Tilt
          rotateZ: [0, 360]
        }}
        transition={{ 
          rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
          rotateZ: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        style={{ width: baseSize, height: baseSize, position: 'absolute', top: 0, left: 0 }} 
      />
      
      <motion.div
        className="absolute inset-0 border border-violet-400/20 rounded-full preserve-3d"
        animate={{ 
          scale: active ? 3.5 : 1.8, 
          opacity: active ? 0 : 0.5, 
          rotateX: [70, 60, 70], // Counter 3D Tilt
          rotateZ: [360, 0] 
        }}
        transition={{ 
          rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
          rotateZ: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
        style={{ width: baseSize, height: baseSize, position: 'absolute', top: 0, left: 0 }} 
      />

    </div>
  );
};

export default Orb;
