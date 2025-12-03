
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import { ASSETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionTenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionTen: React.FC<SectionTenProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  // --- Slider Logic ---
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage 0-100
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleDrag(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleDrag(e.touches[0].clientX);
  };

  // Global event listeners for drag release outside component
  useEffect(() => {
    const stopDrag = () => setIsDragging(false);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, []);


  // --- Animations ---
  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
        
        // 1. Entrance Animation
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scroller: scrollerRef.current,
                    start: "top 75%"
                }
            }
        );

        // 2. Auto-Reveal (Teach the user interaction)
        const revealTl = gsap.timeline({
            scrollTrigger: {
                trigger: sliderRef.current,
                scroller: scrollerRef.current,
                start: "top 60%",
            },
            delay: 0.5
        });

        // Object allows GSAP to tween a number value which we use to update state
        const proxy = { val: 50 }; 
        revealTl.to(proxy, {
            val: 35,
            duration: 0.8,
            ease: "power2.inOut",
            onUpdate: () => setSliderPosition(proxy.val)
        })
        .to(proxy, {
            val: 50,
            duration: 0.6,
            ease: "power2.out",
            onUpdate: () => setSliderPosition(proxy.val)
        });

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);


  return (
    <section 
        ref={containerRef}
        className="relative w-full py-20 md:py-32 px-4 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5"
    >
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 z-10">
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 font-sans leading-tight">
                Você vai sair do curso com um produto <br className="hidden md:block"/>
                <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">nesse nível</span> para seu Portfólio
            </h2>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-sans">
                Vamos aprender o passo a passo do processo de criação deste produto com qualidade de 
                <span className="text-[#00CBD9] font-bold ml-1">nível internacional.</span>
            </p>
        </div>

        {/* --- MAIN INTERACTIVE SLIDER --- */}
        <div 
            ref={sliderRef}
            className="relative w-full max-w-[1000px] aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden border border-[#00CBD9]/30 shadow-[0_0_50px_rgba(0,203,217,0.15)] group cursor-col-resize select-none bg-[#050505]"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
        >
            {/* RIGHT SIDE (AFTER/RENDER) - BACKGROUND */}
            <div className="absolute inset-0 w-full h-full">
                <img 
                    src={ASSETS.PORTFOLIO.RENDER} 
                    alt="Render Final" 
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                />
                {/* PRO TIP: Noise Overlay for realism */}
                <div 
                    className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: `url(${ASSETS.NOISE_TEXTURE})` }}
                />
                
                {/* Label Render */}
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 text-white text-xs font-bold tracking-widest uppercase">
                    Render Final
                </div>
            </div>

            {/* LEFT SIDE (BEFORE/SKETCH) - CLIPPED */}
            <div 
                className="absolute inset-0 h-full bg-white overflow-hidden border-r-2 border-[#00CBD9]"
                style={{ width: `${sliderPosition}%` }}
            >
                <img 
                    src={ASSETS.PORTFOLIO.SKETCH} 
                    alt="Sketch Concept" 
                    className="absolute top-0 left-0 max-w-none h-full object-cover object-center"
                    // Important: Width must match container to align images perfectly
                    style={{ width: sliderRef.current?.getBoundingClientRect().width || '100%' }}
                    draggable={false}
                />
                 {/* Label Sketch */}
                 <div className="absolute top-6 left-6 bg-black/10 backdrop-blur-sm px-4 py-1 rounded-full border border-black/20 text-black text-xs font-bold tracking-widest uppercase">
                    Sketch
                </div>
            </div>

            {/* DRAG HANDLE */}
            <div 
                ref={handleRef}
                className="absolute top-0 bottom-0 w-1 bg-transparent z-20 flex items-center justify-center -ml-[2px]"
                style={{ left: `${sliderPosition}%` }}
            >
                {/* Visual Handle Line (Glows) */}
                <div className="absolute inset-y-0 w-[2px] bg-[#00CBD9] shadow-[0_0_15px_#00CBD9]"></div>

                {/* Knob */}
                <div className="relative z-30 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-center transform transition-transform duration-200 group-hover:scale-110 active:scale-95">
                     <GripVertical className="text-black w-5 h-5 md:w-6 md:h-6 opacity-50" />
                     {/* Arrows */}
                     <div className="absolute inset-0 flex items-center justify-between px-1 md:px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft size={14} className="text-black" />
                        <ChevronRight size={14} className="text-black" />
                     </div>
                </div>
            </div>
        </div>


        {/* --- SECONDARY SHOWCASE (CAROUSEL) --- */}
        <div ref={showcaseRef} className="mt-12 md:mt-16 w-full max-w-[1000px] flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Showcast Card (Vitrine) */}
            <div className="relative w-full md:w-[65%] aspect-[16/10] bg-[#F5F5F5] rounded-xl overflow-hidden shadow-2xl group border border-white/10">
                
                {/* Dots (Top Right) */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <div className="w-2 h-2 rounded-full bg-black/20"></div>
                    <div className="w-2 h-2 rounded-full bg-black/20"></div>
                </div>

                {/* Product Image */}
                <div className="w-full h-full flex items-center justify-center p-8">
                     <img 
                        src="https://i.postimg.cc/sx0q301J/sneaker-render.jpg" // Using render for now as requested
                        alt="Variation" 
                        className="w-[90%] h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                     />
                </div>

                {/* UI Elements (Color Palette) */}
                <div className="absolute bottom-4 left-4 flex gap-2 p-2 bg-white/50 backdrop-blur-md rounded-lg">
                    <div className="w-6 h-6 rounded bg-[#FF6B00] shadow-sm" title="Safety Orange"></div>
                    <div className="w-6 h-6 rounded bg-[#2A2A2A] shadow-sm" title="Jet Black"></div>
                    <div className="w-6 h-6 rounded bg-[#E5E5E5] shadow-sm" title="Off White"></div>
                </div>

                {/* Navigation (Overlay) */}
                <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black/5">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                        <ChevronLeft size={16} />
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black/5">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                         <ChevronRight size={16} />
                    </div>
                </div>
            </div>

            {/* Description / CTA Area - UPDATED TEXT */}
            <div className="flex-1 text-center md:text-left">
                <p className="text-white text-base md:text-2xl font-sans leading-relaxed mb-4">
                    Durante as aulas são feitos e mostrados projetos de diferentes áreas do Design. É uma <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent font-bold">verdadeira formação 360°</span>
                </p>

                <p className="text-white text-lg md:text-xl font-bold font-sans italic mb-8">
                    Você não encontra isso no Youtube, nem em nenhum lugar da Internet.
                </p>
                
                 <button className="w-full md:w-auto group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-bold text-sm px-6 py-4 rounded-xl border border-[#00CBD9]/40 shadow-[0_0_20px_rgba(0,203,217,0.2)] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,203,217,0.5)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-2">
                     <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <Rocket className="w-4 h-4" />
                     <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                 </button>
            </div>
        </div>

    </section>
  );
};
