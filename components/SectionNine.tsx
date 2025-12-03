
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket } from 'lucide-react';
import { ASSETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionNineProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionNine: React.FC<SectionNineProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const frontCertRef = useRef<HTMLDivElement>(null);
  const backCertRef = useRef<HTMLDivElement>(null);

  // Typewriter State
  const [displayText, setDisplayText] = useState("");
  const names = ["{NOME_ALUNO}", "Anderson Ramon", "Maria Silva", "João Souza", "Seu Nome Aqui"];
  const [nameIndex, setNameIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- Typewriter Effect Logic ---
  useEffect(() => {
    const currentName = names[nameIndex];
    const typingSpeed = isDeleting ? 50 : 100; // Delete faster than type
    const pauseEnd = 2000; // Wait at end of word

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        if (charIndex < currentName.length) {
          setDisplayText((prev) => currentName.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          // Finished typing word
          setTimeout(() => setIsDeleting(true), pauseEnd);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setDisplayText((prev) => currentName.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          // Finished deleting word
          setIsDeleting(false);
          setNameIndex((prev) => (prev + 1) % names.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, nameIndex, names]);

  // --- Scroll Animations (Entrance) ---
  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate Text Column (Right)
      gsap.fromTo(rightColRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 70%",
          }
        }
      );

      // Animate Certificates (Left)
      gsap.fromTo(leftColRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  // --- Parallax Effect (Mouse Move) ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return; // Disable on mobile

    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = (clientX - centerX) / 30; // Sensitivity
    const moveY = (clientY - centerY) / 30;

    // Front layer moves faster (closer)
    gsap.to(frontCertRef.current, {
      x: moveX * 1.5,
      y: moveY * 1.5,
      rotationY: moveX * 0.1,
      rotationX: -moveY * 0.1,
      duration: 0.5,
      ease: "power2.out"
    });

    // Back layer moves slower (farther)
    gsap.to(backCertRef.current, {
      x: -moveX, // Invert for depth contrast
      y: -moveY,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[auto] md:min-h-[90vh] py-16 md:py-24 px-4 bg-[#000000] overflow-hidden flex items-center justify-center border-t border-white/5"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00CBD9] opacity-5 blur-[100px] md:blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN: CERTIFICATE MOCKUPS */}
        <div ref={leftColRef} className="relative w-full h-[260px] md:h-[500px] flex items-center justify-center perspective-1000 mb-4 md:mb-0">
          
          {/* Back Certificate (Ghost) */}
          <div 
            ref={backCertRef}
            className="absolute w-[85%] max-w-[500px] aspect-[1.4/1] bg-gradient-to-br from-gray-800 to-black rounded-lg border border-white/10 shadow-2xl opacity-60 blur-[1px] -translate-x-4 md:-translate-x-8 -translate-y-2 md:-translate-y-4 -rotate-3 z-0"
          >
             <div className="absolute inset-4 border border-white/5 opacity-50"></div>
          </div>

          {/* Front Certificate (Hero) */}
          <div 
            ref={frontCertRef}
            className="absolute w-[92%] md:w-[90%] max-w-[550px] aspect-[1.4/1] bg-[#050505] rounded-lg border border-[#00CBD9]/50 shadow-[0_0_30px_rgba(0,203,217,0.1)] md:shadow-[0_0_50px_rgba(0,203,217,0.15)] z-10 flex flex-col items-center justify-center relative overflow-hidden group"
          >
             {/* Certificate Frame */}
             <div className="absolute inset-1 md:inset-2 border-2 border-double border-[#00CBD9]/20"></div>
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,203,217,0.03)_0%,transparent_70%)]"></div>

             {/* Certificate Content Simulation */}
             <div className="text-center space-y-2 md:space-y-4 w-full px-4 md:px-12 relative z-20 flex flex-col items-center">
                <h3 className="font-sans font-bold text-[10px] md:text-xl text-white/40 tracking-[0.2em] md:tracking-[0.3em] uppercase mt-2">Design Hack</h3>
                <h1 className="font-serif text-2xl md:text-5xl text-white font-bold tracking-wide">CERTIFICADO</h1>
                <p className="text-[#00CBD9] text-[10px] md:text-sm tracking-widest uppercase mb-2 md:mb-6">De Conclusão</p>

                {/* TYPING NAME AREA */}
                <div className="relative py-1 md:py-2 border-b border-white/20 w-[85%] md:w-3/4 mx-auto min-h-[30px] md:min-h-[50px] flex items-end justify-center">
                    <span className="font-serif text-sm md:text-3xl text-white font-medium italic whitespace-nowrap">
                        {displayText}
                        <span className="animate-pulse ml-1 text-[#00CBD9]">|</span>
                    </span>
                </div>

                <div className="pt-2 md:pt-4 flex justify-between items-end w-[90%] md:w-3/4 mx-auto opacity-60 text-[8px] md:text-xs text-white">
                    <div className="text-center">
                        <div className="w-16 md:w-24 h-[1px] bg-white/50 mb-1"></div>
                        <p>Instrutor</p>
                    </div>
                    <div className="h-8 w-8 md:h-12 md:w-12 rounded-full border border-white/30 flex items-center justify-center">
                        <div className="w-5 h-5 md:w-8 md:h-8 rounded-full border border-[#00CBD9]/30"></div>
                    </div>
                    <div className="text-center">
                        <div className="w-16 md:w-24 h-[1px] bg-white/50 mb-1"></div>
                        <p>Data</p>
                    </div>
                </div>
             </div>

             {/* Shine Effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] animate-shimmer-sweep pointer-events-none opacity-50 md:opacity-100"></div>
          </div>
        </div>

        {/* RIGHT COLUMN: TEXT CONTENT */}
        <div ref={rightColRef} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 md:space-y-6 px-2">
            <h2 className="text-3xl md:text-6xl font-black text-white font-sans uppercase leading-none">
                Certificado <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Valorizado</span>
            </h2>
            
            <h3 className="text-lg md:text-2xl font-medium text-[#00CBD9] tracking-wide">
                Acrescente no seu currículo.
            </h3>
            
            <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Ao final do curso, você solicita e recebe um certificado digital, 
                <span className="text-white font-bold"> exclusivo </span> 
                para quem completar todas as aulas do curso.
            </p>

            <div className="pt-6 w-full md:w-auto">
                 <button className="w-full md:w-auto group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-bold text-sm md:text-lg px-8 py-4 md:px-10 md:py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_0_30px_rgba(0,203,217,0.3)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-3">
                     <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                     <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                 </button>
            </div>
        </div>

      </div>
    </section>
  );
};
