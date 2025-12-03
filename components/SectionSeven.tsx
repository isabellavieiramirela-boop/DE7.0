
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Layers, PlayCircle, Package } from 'lucide-react';
import { MODULES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionSevenProps {
    scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionSeven: React.FC<SectionSevenProps> = ({ scrollerRef }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Constants
  const TOTAL_SLIDES = MODULES.length;
  
  // Navigation Handlers
  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % TOTAL_SLIDES);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Autoplay Logic
  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(goNext, 4500);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };

    startAutoplay();

    // Stop on hover
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('mouseenter', stopAutoplay);
      el.addEventListener('mouseleave', startAutoplay);
    }

    return () => {
      stopAutoplay();
      if (el) {
        el.removeEventListener('mouseenter', stopAutoplay);
        el.removeEventListener('mouseleave', startAutoplay);
      }
    };
  }, [TOTAL_SLIDES]);

  // Entrance Animation
  useEffect(() => {
    // Only set up animation if scroller is available
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
        gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scroller: scrollerRef.current, // Use explicit scroller
                    start: "top 70%",
                }
            }
        );

        gsap.fromTo(sliderRef.current,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scroller: scrollerRef.current, // Use explicit scroller
                    start: "top 60%",
                }
            }
        );
    }, containerRef);
    return () => ctx.revert();
  }, [scrollerRef]);

  // Determine card style based on distance from active index
  const getCardStyle = (index: number) => {
    // Calculate distance handling circular wrap
    let dist = (index - activeIndex + TOTAL_SLIDES) % TOTAL_SLIDES;
    if (dist > TOTAL_SLIDES / 2) dist -= TOTAL_SLIDES;
    
    // We only show roughly 5 cards (-2 to +2)
    const isVisible = Math.abs(dist) <= 2;
    
    if (!isVisible) return { display: 'none' };

    let zIndex = 10 - Math.abs(dist);
    let scale = 1 - Math.abs(dist) * 0.15; // 1, 0.85, 0.7
    let opacity = 1 - Math.abs(dist) * 0.3; // 1, 0.7, 0.4
    let xOffset = dist * 55; // Percentage offset
    let brightness = 1 - Math.abs(dist) * 0.3;

    // Mobile adjustments
    if (window.innerWidth < 768) {
        xOffset = dist * 85; 
        scale = 1 - Math.abs(dist) * 0.2;
    }

    return {
        display: 'block',
        zIndex: zIndex,
        transform: `translateX(${xOffset}%) scale(${scale})`,
        opacity: opacity,
        filter: `brightness(${brightness})`,
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };
  };

  return (
    <div ref={containerRef} className="relative w-full py-24 md:py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center">
        
        {/* Title */}
        <h2 ref={titleRef} className="text-[clamp(32px,5vw,56px)] font-bold text-center mb-16 font-sans leading-tight opacity-0">
            <span className="text-white">MAPA DOS </span>
            <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">MÓDULOS</span>
            <p className="text-base md:text-xl font-normal text-gray-400 mt-2 tracking-wide">
                Visualize rapidamente todos os módulos e conteúdos da formação
            </p>
        </h2>

        {/* Carousel Container */}
        <div ref={sliderRef} className="relative w-full max-w-6xl h-[400px] md:h-[600px] flex justify-center items-center opacity-0 perspective-1000">
            
            {/* Cards */}
            <div className="relative w-[300px] md:w-[480px] h-full flex justify-center items-center">
                {MODULES.map((mod, i) => (
                    <div 
                        key={i}
                        className="absolute top-0 left-0 w-full h-full rounded-3xl border-2 border-[#00CBD9]/50 shadow-[0_0_40px_rgba(0,203,217,0.3)] overflow-hidden bg-[#050505]"
                        style={getCardStyle(i)}
                    >
                        <img 
                            src={mod.image} 
                            alt={mod.title}
                            className="w-full h-full object-cover" 
                        />
                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-12">
                            <h3 className="text-white font-bold text-lg md:text-2xl">{mod.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls (Desktop) */}
            <button 
                onClick={goPrev}
                className="absolute left-4 md:left-10 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#00CBD9]/40 bg-[#00CBD9]/10 backdrop-blur-md flex items-center justify-center text-[#00CBD9] hover:bg-[#00CBD9] hover:text-black transition-all hover:shadow-[0_0_20px_rgba(0,203,217,0.5)]"
            >
                <ChevronLeft size={28} />
            </button>
            <button 
                onClick={goNext}
                className="absolute right-4 md:right-10 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#00CBD9]/40 bg-[#00CBD9]/10 backdrop-blur-md flex items-center justify-center text-[#00CBD9] hover:bg-[#00CBD9] hover:text-black transition-all hover:shadow-[0_0_20px_rgba(0,203,217,0.5)]"
            >
                <ChevronRight size={28} />
            </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 md:gap-3 mt-8 md:mt-12 z-10">
            {MODULES.map((_, i) => (
                <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                        i === activeIndex 
                        ? 'w-8 md:w-12 bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] shadow-[0_0_10px_rgba(0,203,217,0.5)]' 
                        : 'w-2 md:w-3 bg-white/20 hover:bg-white/40'
                    }`}
                />
            ))}
        </div>

        {/* Stats Section (Added based on request) */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-16 md:mt-20 z-10">
            <StatPill icon={<Layers size={20} />} text="10 Módulos" />
            <StatPill icon={<PlayCircle size={20} />} text="+ 100 horas aula" />
            <StatPill icon={<Package size={20} />} text="10 cursos em 1" />
        </div>

    </div>
  );
};

// Stat Pill Component (Styled like the request image: Neon Cyan Border, Dark BG)
const StatPill = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-[#00CBD9] bg-[#05121d] shadow-[0_0_15px_rgba(0,203,217,0.15)] min-w-[220px] justify-center hover:shadow-[0_0_25px_rgba(0,203,217,0.3)] transition-all duration-300">
        <div className="text-[#00CBD9]">
            {icon}
        </div>
        <span className="text-white font-bold text-lg font-sans tracking-wide">
            {text}
        </span>
    </div>
);
