
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TriangleAlert } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionTwelveProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

const PAIN_POINTS = [
  {
    text: "Se Você passa horas criando, mas sempre bate aquela dúvida: 'será que eu to indo pelo caminho certo?'"
  },
  {
    text: "Abre seu portfólio e sente aquele vazio. 'O que eu coloco aqui pra alguém finalmente me enxergar?' Não é falta de talento. É falta de direção."
  },
  {
    text: "Você vê outros designers voando e pensa: 'Cara, eles estão muito à frente... será que um dia eu chego lá?' Mas a real é: eles só aprenderam o que ninguém te ensinou ainda. Como vender o que sabem"
  },
  {
    text: "Você pula de tutorial em tutorial, mas no fim percebe que ninguém mostra o que o mercado realmente quer. Aprende ferramenta, mas não aprende a pensar como um designer que lucra."
  }
];

export const SectionTwelve: React.FC<SectionTwelveProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Typewriter State
  const [typedText, setTypedText] = useState("");
  const fullText = "FIQUE TRANQUILO";
  const hasStartedTyping = useRef(false);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 70%",
          }
        }
      );

      // 2. Grid Stagger Animation
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0, 
                opacity: 1, 
                scale: 1,
                duration: 0.8, 
                stagger: 0.15,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: gridRef.current,
                    scroller: scrollerRef.current,
                    start: "top 65%",
                }
            }
        );
      }

      // 3. Footer Text Animation (First Line)
      gsap.fromTo(footerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current, 
            scroller: scrollerRef.current,
            start: "bottom 85%",
          }
        }
      );

      // 4. "FIQUE TRANQUILO" Typewriter Trigger
      ScrollTrigger.create({
        trigger: footerRef.current,
        scroller: scrollerRef.current,
        start: "top 80%",
        onEnter: () => {
            if (!hasStartedTyping.current) {
                hasStartedTyping.current = true;
                let i = 0;
                // Clear previous text just in case
                setTypedText("");
                
                const interval = setInterval(() => {
                    setTypedText(fullText.substring(0, i + 1));
                    i++;
                    if (i === fullText.length) {
                        clearInterval(interval);
                    }
                }, 100); // 100ms per character
            }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-4 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5"
    >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,203,217,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
            
            {/* Header */}
            <h2 
                ref={headerRef}
                className="text-white font-sans font-bold text-xl md:text-3xl tracking-[0.2em] uppercase mb-16 md:mb-20 text-center drop-shadow-md"
            >
                AGORA PRESTE ATENÇÃO:
            </h2>

            {/* Cards Grid */}
            <div 
                ref={gridRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-20"
            >
                {PAIN_POINTS.map((item, i) => (
                    <PainPointCard key={i} text={item.text} />
                ))}
            </div>

            {/* Footer Text */}
            <div ref={footerRef} className="text-center px-4 flex flex-col gap-4 items-center">
                <h3 className="text-xl md:text-3xl font-sans font-medium leading-tight text-white/80">
                    SE ALGUMA DESSA COISAS BATEU EM VOCÊ...
                </h3>
                
                {/* TYPEWRITER ANIMATION TARGET */}
                <h2 
                    className="text-3xl md:text-5xl font-sans font-black leading-tight tracking-wide bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent min-h-[1.2em]"
                >
                    {typedText}
                    <span className="animate-pulse text-[#00CBD9] ml-1">|</span>
                </h2>
            </div>

        </div>
    </section>
  );
};

const PainPointCard: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="group relative h-full min-h-[220px] rounded-2xl transition-all duration-300 hover:-translate-y-2">
        
        {/* 
           Gradient Border Trick: 
           Outer container has padding-[1px] and the gradient background.
        */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-[#00CBD9]/40 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Card Content */}
        {/* Background: Dark Deep Blue (#060e18) */}
        <div className="relative h-full bg-[#060e18] rounded-[15px] p-8 md:p-10 flex flex-col gap-6 overflow-hidden">
            
            {/* 
                Bottom Gradient Line
                From Neon Cyan (#00CBD9) to Dark Blue/Black (#050b14)
            */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00CBD9] to-[#050b14] shadow-[0_0_25px_rgba(0,203,217,0.8)] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Top Light Wash (Hover) */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#00CBD9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-[#00CBD9]/10 border border-[#00CBD9]/20 flex items-center justify-center group-hover:bg-[#00CBD9]/20 group-hover:border-[#00CBD9]/50 group-hover:shadow-[0_0_20px_rgba(0,203,217,0.4)] transition-all duration-300 relative overflow-hidden">
                {/* Scanline effect inside icon box */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,203,217,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                
                <TriangleAlert className="text-[#00CBD9] w-7 h-7 relative z-10" strokeWidth={2.5} />
            </div>

            {/* Text */}
            <p className="text-[#E5E5E5] font-sans text-lg leading-relaxed group-hover:text-white transition-colors duration-300 tracking-wide font-medium">
                {text}
            </p>
        </div>
    </div>
  );
};
