
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PauseCircle, MousePointer2, X } from 'lucide-react';
import { GUESTS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionEightProps {
    scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionEight: React.FC<SectionEightProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  
  // State for the expanded card (Zoom effect)
  const [selectedGuest, setSelectedGuest] = useState<typeof GUESTS[0] | null>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Infinite Marquee
      const duration = 40; 
      const tl = gsap.to(innerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: duration,
        repeat: -1
      });

      marqueeRef.current?.addEventListener('mouseenter', () => tl.pause());
      marqueeRef.current?.addEventListener('mouseleave', () => tl.play());

      gsap.fromTo(marqueeRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
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

  const marqueeList = [...GUESTS, ...GUESTS, ...GUESTS]; // Tripled for smoothness

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-24 md:py-32 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(255,215,0,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 flex flex-col items-center">
        
        {/* Header Section */}
        <div ref={titleRef} className="text-center mb-16 md:mb-24 opacity-0 flex flex-col items-center">
          
          {/* UPDATED: "No Módulo 09" using StatPill Design */}
          <div className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-[#00CBD9] bg-[#05121d] shadow-[0_0_15px_rgba(0,203,217,0.15)] mb-8">
            <span className="text-white font-bold text-lg font-sans tracking-wide uppercase">
                No Módulo 09
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight font-sans">
            Regularmente teremos <br className="hidden md:block"/>
            <span className="text-white">convidados especiais</span>
          </h2>
          
          <p className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent text-lg md:text-xl font-bold tracking-wide font-sans">
            Aprenda com especialistas que atuam no Mercado
          </p>
        </div>

        {/* Marquee Carousel */}
        <div ref={marqueeRef} className="w-full relative opacity-0">
           <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-20 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-20 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />

           <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing py-12"> {/* Added padding Y for shadow/hover space */}
              <div ref={innerRef} className="flex gap-8 md:gap-12 w-max px-4">
                  {marqueeList.map((guest, idx) => (
                    <GuestCard 
                        key={`${guest.name}-${idx}`} 
                        guest={guest} 
                        onClick={() => setSelectedGuest(guest)}
                    />
                  ))}
              </div>
           </div>

           <div className="flex md:hidden items-center justify-center gap-2 mt-6 text-white/30 text-xs uppercase tracking-widest">
              <MousePointer2 size={14} /> Arraste para explorar
           </div>
           
           <div className="hidden md:flex items-center justify-center gap-2 mt-8 text-white/30 text-xs uppercase tracking-widest">
              <PauseCircle size={14} /> Passe o mouse para pausar • Clique para ampliar
           </div>
        </div>

      </div>

      {/* ZOOM MODAL */}
      {selectedGuest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => setSelectedGuest(null)}
              ></div>

              {/* Zoomed Card Container */}
              <div className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[3/4] animate-in fade-in zoom-in duration-300">
                  
                  {/* METALLIC GOLD BORDER WRAPPER (Zoomed) */}
                  <div className="absolute inset-0 rounded-[32px] p-[3px] bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-[0_0_80px_rgba(255,215,0,0.4)]">
                    <div className="relative w-full h-full rounded-[29px] overflow-hidden bg-black">
                        <button 
                            onClick={() => setSelectedGuest(null)}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors border border-white/10"
                        >
                            <X size={24} />
                        </button>
                        
                        <img 
                            src={selectedGuest.image} 
                            alt={selectedGuest.name} 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-[#BF953F] via-[#BF953F]/20 to-transparent opacity-90 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center text-center">
                            <h3 className="text-black font-black text-2xl md:text-3xl uppercase tracking-wider mb-1 leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                                {selectedGuest.name}
                            </h3>
                            <p className="text-[#3a2f0b] font-bold text-sm md:text-base uppercase tracking-widest mb-4 drop-shadow-sm">
                                {selectedGuest.role}
                            </p>
                            <p className="text-black/90 font-medium text-sm leading-relaxed max-w-[90%]">
                                {selectedGuest.bio}
                            </p>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      )}

    </section>
  );
};

interface GuestCardProps {
    guest: typeof GUESTS[0];
    onClick: () => void;
}

const GuestCard: React.FC<GuestCardProps> = ({ guest, onClick }) => {
  return (
    <div 
        onClick={onClick}
        className="group relative w-[280px] md:w-[320px] h-[420px] md:h-[480px] flex-shrink-0 cursor-pointer transition-all duration-500 hover:-translate-y-4 perspective-1000"
    >
      {/* 
          ULTRA PREMIUM METALLIC GOLD BORDER 
          Constructed using a gradient background on the parent container (p-[2px] or p-[3px] acts as border width).
          The 'via-[#FCF6BA]' creates the metallic shine effect.
      */}
      <div className="absolute inset-0 rounded-[24px] p-[2px] bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] shadow-[0_0_25px_rgba(191,149,63,0.3)] group-hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-all duration-500">
        
        {/* Inner Content - Black Background to mask image corners correctly */}
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-black">
            
            {/* Image */}
            <img 
                src={guest.image} 
                alt={guest.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Premium Gold Overlays */}
            {/* 1. Multiply blend for color tinting */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700] via-[#FFD700]/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90 mix-blend-multiply" />
            
            {/* 2. Overlay blend for luminosity and shine */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700] via-transparent to-transparent opacity-50 mix-blend-overlay" />

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 pb-8 flex flex-col items-center text-center z-20">
                
                {/* Name: Black, Ultra Bold, Metallic White Shadow */}
                <h3 className="text-black font-black text-2xl uppercase tracking-wider mb-1 leading-none drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                    {guest.name}
                </h3>
                
                {/* Role: Deep Gold/Bronze */}
                <p className="text-[#3a2f0b] font-bold text-xs uppercase tracking-widest mb-2 drop-shadow-sm">
                    {guest.role}
                </p>
                
                {/* Decorative Line (Expands on hover) */}
                <div className="w-12 h-[3px] bg-black/80 mt-1 mb-1 group-hover:w-24 transition-all duration-500 rounded-full" />
            </div>
        </div>
      </div>
    </div>
  );
};
