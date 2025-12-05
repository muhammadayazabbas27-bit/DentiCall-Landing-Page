
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import Orb from './Orb';

// --- Audio Helper Functions ---

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

const Demo: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionRef = useRef<any>(null); // Store session to close it later
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopSession = () => {
    if (sessionRef.current) {
      // There isn't a direct close method on the session object returned by connect in the current SDK version 
      // typically, but we can stop sending data and close contexts.
      // If the SDK supports close, use it. Otherwise, just cleaning up client side.
      // Assuming session might have a close method or we just break the loop.
      // Checking SDK docs via system prompt, session.close() is mentioned in rules.
      try {
        sessionRef.current.close();
      } catch (e) {
        console.warn("Error closing session", e);
      }
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
    
    // Stop any playing audio
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();

    setIsActive(false);
    setStatus('idle');
  };

  const startSession = async () => {
    setStatus('connecting');
    setErrorMsg('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize Audio Contexts
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;
      
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination); // Connect to speakers

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: "You are DentiCall, a friendly, professional, and efficient AI dental receptionist. Your job is to help patients book appointments, answer common questions about dental procedures, and handle rescheduling. Keep your responses concise, warm, and clear. If asked about availability, invent plausible slots for tomorrow or next week.",
        },
        callbacks: {
          onopen: async () => {
            setStatus('active');
            setIsActive(true);
            
            // Setup Input Processing
            const source = inputCtx.createMediaStreamSource(stream);
            sourceRef.current = source;
            
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
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio) {
               const ctx = outputAudioContextRef.current;
               if (!ctx) return;

               // Sync start time
               nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
               
               const audioBuffer = await decodeAudioData(
                 decode(base64Audio),
                 ctx,
                 24000,
                 1
               );

               const source = ctx.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(outputNode);
               
               source.addEventListener('ended', () => {
                 sourcesRef.current.delete(source);
               });

               source.start(nextStartTimeRef.current);
               sourcesRef.current.add(source);
               
               nextStartTimeRef.current += audioBuffer.duration;
            }

            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
               // Stop all currently playing sources if interrupted
               sourcesRef.current.forEach(source => {
                 try { source.stop(); } catch(e) {}
               });
               sourcesRef.current.clear();
               nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            setStatus('idle');
            setIsActive(false);
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setErrorMsg("Connection error. Please try again.");
            stopSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (error) {
      console.error("Failed to start session:", error);
      setErrorMsg("Failed to access microphone or connect.");
      setStatus('idle');
    }
  };

  const handleToggle = () => {
    if (isActive) {
      stopSession();
    } else {
      startSession();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  return (
    <section className="py-32 bg-deep-navy relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-5xl font-light text-white mb-12"
        >
          Experience the <span className="text-neon-blue font-medium">Flow</span>
        </motion.h2>

        <div className="relative mb-12">
            {/* Interactive Orb Container */}
            <motion.div
              animate={isActive ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Orb size="sm" active={isActive} />
            </motion.div>

            {/* Listening Rings when Active */}
            <AnimatePresence>
              {isActive && (
                <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  <motion.div 
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-neon-blue/30"
                  />
                  <motion.div 
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    className="absolute inset-0 rounded-full border border-sky-soft/30"
                  />
                </motion.div>
              )}
            </AnimatePresence>
        </div>

        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 mb-4 bg-red-900/20 px-4 py-2 rounded-lg border border-red-500/30"
          >
            {errorMsg}
          </motion.div>
        )}

        <motion.button
          onClick={handleToggle}
          disabled={status === 'connecting'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative px-10 py-4 rounded-full font-medium tracking-wide transition-all duration-300 min-w-[200px]
            ${isActive 
              ? 'bg-red-500/10 text-red-400 border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' 
              : 'bg-transparent text-white border border-neon-blue shadow-[0_0_30px_rgba(26,140,255,0.2)] hover:bg-neon-blue hover:text-white'
            }
            ${status === 'connecting' ? 'opacity-50 cursor-wait' : ''}
          `}
        >
          {status === 'connecting' ? 'Connecting...' : isActive ? 'End Call' : 'Try Live Demo'}
          
          {/* Subtle button glow pulse when idle */}
          {!isActive && status !== 'connecting' && (
             <span className="absolute flex h-3 w-3 top-0 right-0 -mt-1 -mr-1">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
             </span>
          )}
        </motion.button>
        
        <p className="mt-6 text-slate-400 text-sm font-light">
          {isActive ? "Listening... Speak to DentiCall" : "Click to start a real-time voice conversation with our AI"}
        </p>
      </div>
    </section>
  );
};

export default Demo;