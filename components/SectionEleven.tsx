
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket } from 'lucide-react';
import { ASSETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionElevenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionEleven: React.FC<SectionElevenProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const globeWrapperRef = useRef<HTMLDivElement>(null); // Wrapper for GSAP Scale/Rotate
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Entrance Animations
  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Text Fade Up
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 60%",
          }
        }
      );

      // 2. Globe Entrance (Fade & Blur only)
      // We separate opacity from the scroll movement to ensure it's visible smoothly
      gsap.fromTo(globeWrapperRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        {
            opacity: 1, 
            filter: 'blur(0px)', 
            duration: 1.5, 
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                scroller: scrollerRef.current,
                start: "top 70%",
            }
        }
      );

      // 3. Globe Scroll Interaction (Zoom + Rotation)
      // Increased intensity as requested
      gsap.fromTo(globeWrapperRef.current,
        { 
            scale: 0.5,     // Starts much smaller/farther
            rotation: -30,  // Stronger tilt to start
        },
        {
            scale: 1.35,    // Ends much closer (Zoom in)
            rotation: 15,   // Rotates significantly to the right
            ease: "none",   // Linear because scrub handles the smoothing
            scrollTrigger: {
                trigger: containerRef.current,
                scroller: scrollerRef.current,
                start: "top bottom", // Start when section enters viewport
                end: "bottom top",   // End when section leaves viewport
                scrub: 1,            // Slightly faster reaction
            }
        }
      );

      // 4. CTA Fade Up
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 60%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-20 md:py-32 px-4 bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center min-h-[80vh] border-t border-white/5"
    >
      {/* 
        AMBIENT NEBULA BACKGROUND 
        Created via CSS Gradients for "Lightweight" strategy
      */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
         {/* Center Top Pink/Cyan Mix */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(252,44,84,0.12)_0%,_rgba(0,203,217,0.08)_30%,_transparent_70%)] blur-[80px]" />
         
         {/* Bottom Fade to Black */}
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Typography */}
        <div ref={textRef} className="mb-12 md:mb-16 px-4">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-sans text-white leading-relaxed md:leading-relaxed">
                Os maiores <span className="font-bold">Designers</span> usam as <span className="italic font-serif">técnicas</span> ensinadas nesse curso! <br className="hidden md:block" />
                E você entrará para esse <span className="font-bold bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">universo!</span>
            </h2>
        </div>

        {/* Center Element - Holographic Globe */}
        {/* Floating Animation defined inline via <style> to keep it self-contained and lightweight */}
        <style>{`
          @keyframes float-globe {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          .animate-float-globe {
            animation: float-globe 5s ease-in-out infinite;
          }
        `}</style>
        
        <div className="relative mb-12">
            {/* 
                GSAP Wrapper: Handles Scale and Rotation on Scroll 
            */}
            <div 
                ref={globeWrapperRef} 
                className="relative w-[300px] md:w-[500px] aspect-square flex items-center justify-center will-change-transform"
            >
                {/* 
                    Inner Image: Handles CSS Floating (Bobbing up and down) 
                    Separating them prevents transform conflicts.
                */}
                <img 
                    src={ASSETS.UNIVERSE_GLOBE} 
                    alt="Universe Hologram" 
                    className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(0,203,217,0.3)] md:drop-shadow-[0_0_50px_rgba(0,203,217,0.4)] animate-float-globe"
                />
                
                {/* Ambient Back Glow (Behind Image) - PULSE REMOVED */}
                <div className="absolute inset-0 bg-[#00CBD9] opacity-10 blur-[60px] rounded-full -z-10 scale-75" />
            </div>
        </div>

        {/* CTA Button */}
        <div className="relative z-20">
            <button 
                ref={ctaRef}
                className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-bold text-sm md:text-lg px-8 py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_0_30px_rgba(0,203,217,0.3)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-3"
            >
                <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
            </button>
        </div>

      </div>

    </section>
  );
};
