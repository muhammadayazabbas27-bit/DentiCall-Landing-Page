
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type } from "@google/genai";
import { Play, Mic, MicOff, Phone, Calendar, MessageCircle, Clock, CheckCircle, Mail, Database, Shield, Zap, FileText, Users, Globe, User, AlertCircle } from 'lucide-react';
import Orb from './Orb';

// --- Audio Helper Functions (No changes) ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): { data: string; mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- Tools (No changes) ---
const checkAvailabilityTool: FunctionDeclaration = {
  name: 'check_availability',
  description: 'Checks for available appointment slots for a discovery call based on the preferred date and time.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      preferred_date_time: { type: Type.STRING, description: "The preferred date and time for the call." },
    },
    required: ['preferred_date_time'],
  },
};

const bookCallTool: FunctionDeclaration = {
  name: 'book_call',
  description: 'Books a discovery call with the provided client details.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      client_name: { type: Type.STRING, description: "Full name of the client." },
      email_address: { type: Type.STRING, description: "Work email address." },
      preferred_date_time: { type: Type.STRING, description: "Confirmed date and time for the call (ISO format with offset)." },
      contact_number: { type: Type.STRING, description: "Contact number with country code." },
      clinic_name: { type: Type.STRING, description: "Name of the dental clinic." },
      clinic_location: { type: Type.STRING, description: "Location of the clinic." },
      additional_notes: { type: Type.STRING, description: "Any additional information provided by the client." },
    },
    required: ['client_name', 'email_address', 'preferred_date_time', 'contact_number', 'clinic_name', 'clinic_location'],
  },
};

const WEBHOOK_URL = 'https://hook.eu2.make.com/apatwf54zqt8lvxpdh482fn4bpwuy8of';

const Hero: React.FC = () => {
  // --- Live API State ---
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [volume, setVolume] = useState(0);

  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Analyser Refs for Volume Visualization
  const inputAnalyserRef = useRef<AnalyserNode | null>(null);
  const outputAnalyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const openBookingLink = () => {
    window.open('https://cal.com/ayaz-abbas-hitit.agency/out-bound-warm-leads-appointments', '_blank');
  };

  const updateVolume = () => {
    let inputVol = 0;
    let outputVol = 0;

    if (inputAnalyserRef.current) {
      const dataArray = new Uint8Array(inputAnalyserRef.current.frequencyBinCount);
      inputAnalyserRef.current.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      inputVol = sum / dataArray.length;
    }

    if (outputAnalyserRef.current) {
      const dataArray = new Uint8Array(outputAnalyserRef.current.frequencyBinCount);
      outputAnalyserRef.current.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      outputVol = sum / dataArray.length;
    }

    const combinedVol = Math.min((inputVol + outputVol) / 100, 1.5); 
    setVolume(combinedVol);

    animationFrameRef.current = requestAnimationFrame(updateVolume);
  };

  const stopSession = () => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) { console.warn("Error closing session", e); }
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(source => { try { source.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsActive(false);
    setStatus('idle');
    setVolume(0);
  };

  const startSession = async () => {
    if (!process.env.API_KEY) {
      setErrorMsg("API Key missing.");
      return;
    }

    setStatus('connecting');
    setErrorMsg('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      
      const outputAnalyser = outputCtx.createAnalyser();
      outputAnalyser.fftSize = 256;
      outputAnalyserRef.current = outputAnalyser;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputAnalyser);
      outputAnalyser.connect(outputCtx.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi", weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          tools: [{ functionDeclarations: [checkAvailabilityTool, bookCallTool] }],
          systemInstruction: `Role: Sara, DentiCall booking agent. Context: AI communication for dental clinics. Task: Greet, Understand need, Collect details (Name, Number+Code, Email, Clinic Name/Loc), Check availability, Book call. Time: ${currentDate}.`,
        },
        callbacks: {
          onopen: async () => {
            setStatus('active');
            setIsActive(true);
            
            const inputAnalyser = inputCtx.createAnalyser();
            inputAnalyser.fftSize = 256;
            inputAnalyserRef.current = inputAnalyser;

            const source = inputCtx.createMediaStreamSource(stream);
            sourceRef.current = source;
            source.connect(inputAnalyser); 

            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                 session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(processor);
            processor.connect(inputCtx.destination);
            updateVolume();
          },
          onmessage: async (message: LiveServerMessage) => {
             if (message.toolCall?.functionCalls) {
                 for (const fc of message.toolCall.functionCalls) {
                     if (fc.name === 'check_availability' || fc.name === 'book_call') {
                         const args = fc.args as any;
                         let resultMessage = '';
                         const payload = { tool_name: fc.name, ...args };

                         try {
                             const response = await fetch(WEBHOOK_URL, {
                                 method: 'POST',
                                 headers: { 'Content-Type': 'application/json' },
                                 body: JSON.stringify(payload)
                             });
                             
                             if (response.ok) {
                               const data = await response.text(); 
                               resultMessage = data || 'Action successful.'; 
                             } else {
                               resultMessage = 'Failed.';
                             }
                         } catch (e) {
                             resultMessage = 'Simulated Success.';
                         }
                         sessionPromise.then((session) => {
                              session.sendToolResponse({
                                  functionResponses: { id: fc.id, name: fc.name, response: { result: resultMessage } }
                              });
                         });
                     }
                 }
             }
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio) {
                const ctx = outputAudioContextRef.current;
                if (ctx) {
                  nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                  const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
                  const source = ctx.createBufferSource();
                  source.buffer = audioBuffer;
                  source.connect(outputNode); 
                  source.addEventListener('ended', () => sourcesRef.current.delete(source));
                  source.start(nextStartTimeRef.current);
                  sourcesRef.current.add(source);
                  nextStartTimeRef.current += audioBuffer.duration;
                }
             }
             if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(source => { try { source.stop(); } catch(e) {} });
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
             }
          },
          onclose: () => { stopSession(); },
          onerror: () => { setErrorMsg("Connection Failed."); stopSession(); }
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (error) {
      setErrorMsg("Failed to start.");
      setStatus('idle');
    }
  };

  const handleToggle = () => { if (isActive) stopSession(); else startSession(); };
  useEffect(() => { return () => stopSession(); }, []);

  // --- Refined OrbitNode for 3D Perspective ---
  const OrbitNode = ({ children, delay = 0, radius = 280, duration = 30 }: any) => {
    return (
      <motion.div
        className="absolute top-1/2 left-1/2 will-change-transform preserve-3d"
        style={{ width: 0, height: 0, zIndex: 0 }}
        // RotateX creates the 3D "Saturn Ring" tilt effect
        animate={{ rotateZ: 360, rotateX: 60 }} 
        transition={{ 
          rotateZ: { duration: duration, repeat: Infinity, ease: "linear", delay: -delay },
          rotateX: { duration: 0 } // Constant tilt
        }}
      >
        <div 
          className="absolute top-0 left-0 preserve-3d"
          style={{ transform: `translate(-50%, -50%) translateY(-${radius}px)` }}
        >
          {/* Counter-rotate so icons stand upright in 3D space */}
          <motion.div
            className="will-change-transform card-3d"
            animate={{ rotateX: -60, rotateZ: -360 }}
            transition={{ 
              rotateZ: { duration: duration, repeat: Infinity, ease: "linear", delay: -delay },
              rotateX: { duration: 0 }
            }}
          >
             {children}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-[95vh] bg-white pt-24 md:pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center perspective-container">
      
      {/* Background Orbiting Orb - Expands like a bubble */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none transform-style-3d">
        <Orb size="xl" active={isActive} volume={volume} />
      </div>

      {/* Orbiting Icons Network - Fades out when bubble expands */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0 perspective-container"
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
          {/* Inner Layer */}
          <OrbitNode radius={220} duration={40} delay={0}>
             <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-brand-purple transform transition-transform hover:scale-125 card-icon-pop">
                 <Calendar size={20} />
             </div>
          </OrbitNode>
          <OrbitNode radius={220} duration={40} delay={13}>
             <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-brand-purple transform transition-transform hover:scale-125 card-icon-pop">
                 <Mail size={20} />
             </div>
          </OrbitNode>
          <OrbitNode radius={220} duration={40} delay={26}>
             <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center text-brand-purple transform transition-transform hover:scale-125 card-icon-pop">
                 <MessageCircle size={20} />
             </div>
          </OrbitNode>

          {/* Outer Layer */}
          <OrbitNode radius={350} duration={60} delay={5}>
             <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-2xl border border-gray-100 flex items-center justify-center text-brand-purple transform transition-transform hover:scale-125 card-icon-pop">
                 <Clock size={24} />
             </div>
          </OrbitNode>
          <OrbitNode radius={350} duration={60} delay={35}>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-2xl border border-gray-100 flex items-center justify-center text-brand-purple transform transition-transform hover:scale-125 card-icon-pop">
                 <Shield size={24} />
             </div>
          </OrbitNode>
      </motion.div>

      {/* Central Content - Sits on top with 3D Pop */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl preserve-3d">
        
        <motion.div
           initial={{ opacity: 0, y: 20, rotateX: 20 }}
           animate={{ opacity: 1, y: 0, rotateX: 0 }}
           transition={{ duration: 0.8 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur border border-gray-200 text-brand-dark text-xs font-bold uppercase tracking-wider mb-6 shadow-sm transform hover:translate-z-10 transition-transform"
        >
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-brand-purple'}`} />
          System Online
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-brand-dark leading-tight tracking-tight mb-6 drop-shadow-lg"
          initial={{ opacity: 0, filter: 'blur(10px)', z: -100 }}
          animate={{ opacity: 1, filter: 'blur(0px)', z: 0 }}
          transition={{ duration: 1 }}
        >
          Your Clinic’s 24/7 <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-violet-500 drop-shadow-md">AI communication System</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          DentiCall answers every call, books patients automatically, and keeps your schedule full.
        </motion.p>

        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100 shadow-lg"
            >
              <AlertCircle size={16} />
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto preserve-3d"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={openBookingLink}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-brand-purple to-violet-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/40 transition-all transform hover:scale-110 active:scale-95 hover:-translate-y-1"
          >
            Request a Demo
          </button>
          
          <button
            onClick={handleToggle}
            className={`w-full sm:w-auto px-8 py-4 bg-white/90 backdrop-blur border border-gray-200 text-brand-dark font-medium rounded-full hover:bg-gray-50 transition-all flex justify-center items-center gap-2 shadow-md hover:shadow-xl active:scale-95 hover:-translate-y-1 ${isActive ? 'border-red-200 bg-red-50 text-red-500 shadow-xl' : ''}`}
          >
            {status === 'connecting' ? 'Connecting...' : isActive ? <><MicOff size={18}/> Stop AI</> : <><Play size={18} className="text-brand-purple"/> Test AI Voice</>}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
