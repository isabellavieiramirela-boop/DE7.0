
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronsDown } from 'lucide-react';
import { ASSETS } from '../constants';

export const SectionOne: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial Animation Sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Logo Glitch Entry
      tl.fromTo(logoRef.current, 
        { 
            clipPath: 'inset(50% 0 50% 0)', 
            opacity: 0,
            scale: 1.2,
            filter: 'hue-rotate(90deg)' 
        },
        { 
            clipPath: 'inset(0% 0 0% 0)', 
            opacity: 1, 
            scale: 1,
            filter: 'hue-rotate(0deg)',
            duration: 1.2,
            ease: "rough({ template: power3.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })"
        }
      )
      // 2. Headline (Handled via CSS Animation mostly, but we ensure visibility)
      .fromTo(headlineRef.current,
        { opacity: 0 }, 
        { opacity: 1, duration: 0.1 }, // Fast fade in to let CSS glitch take over
        "-=0.8"
      )
      // 3. Name Fade In
      .fromTo(nameRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.4" // Overlap slightly
      )
      // 4. CTA
      .fromTo(ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      // 5. Scroll Indicator
      .fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      );

      // Pulsing Scroll Indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="section-one absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden z-10 bg-[#0A0A0A]">
      
      {/* Background Stack */}
      <div className="absolute inset-0 w-full h-full z-0">
         {/* 1. Main Image - Reduced opacity for professional blending */}
         <img 
           src={ASSETS.MENTOR_IMAGE} 
           alt="Background" 
           className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
         />
         
         {/* 2. Blue Fog Gradient Overlay (Azul Nevoa) */}
         {/* Creates a radial glow from the center, fading to dark */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,203,217,0.15)_0%,_rgba(0,203,217,0.05)_40%,_rgba(10,10,10,0.9)_90%)] mix-blend-screen pointer-events-none" />
         
         {/* 3. Subtle bottom fade to integrate with scroll */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto space-y-6 md:space-y-8">
        {/* Logo */}
        <div className="relative w-full max-w-[280px] md:max-w-[450px] lg:max-w-[550px] mb-2">
            <img 
                ref={logoRef}
                src={ASSETS.HEADLINE_IMAGE} 
                alt="Design Hack" 
                className="w-full h-auto drop-shadow-[0_0_25px_rgba(0,203,217,0.2)]"
            />
        </div>

        {/* Headline & Name Block */}
        <div className="flex flex-col items-center gap-1 md:gap-2">
            {/* Headline: O CONTEÚDO SECRETO (Magenta) | QUE NINGUÉM ME DEU (Cyan) */}
            {/* ADDED: animate-glitch-intro class */}
            <h1 
                ref={headlineRef}
                className="animate-glitch-intro text-sm md:text-lg lg:text-xl font-bold tracking-widest uppercase"
            >
                <span className="text-magenta-neon">O CONTEÚDO SECRETO</span>
                <span className="mx-2 text-white/20 hidden md:inline">|</span> 
                <span className="block md:inline mt-1 md:mt-0 text-cyan-neon">QUE NINGUÉM ME DEU</span>
            </h1>

            {/* Name: ANDERSON RAMON with Michroma Font */}
            <div ref={nameRef} className="mt-2">
                {/* UPDATED: Smaller Font Size */}
                <span className="font-michroma text-lg md:text-2xl lg:text-3xl tracking-wider text-white uppercase drop-shadow-lg leading-tight">
                    ANDERSON RAMON
                </span>
            </div>
        </div>

        {/* CTA: White, No Border, Text Only */}
        <button 
            ref={ctaRef}
            className="mt-6 text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase hover:text-cyan-neon hover:drop-shadow-[0_0_8px_rgba(0,203,217,0.8)] transition-all duration-300"
        >
            Navegue e Descubra
        </button>
      </div>

      {/* Scroll Indicator: Gradient Pill with Double Chevron */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        {/* Gradient Border Pill - Increased size and padding */}
        <div className="p-[3px] rounded-full bg-gradient-to-b from-magenta-neon to-cyan-neon shadow-[0_0_20px_rgba(0,203,217,0.4)]">
            <div className="w-9 h-16 md:w-12 md:h-20 bg-[#050505] rounded-full flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
                <ChevronsDown 
                    size={32} 
                    className="animate-pulse relative z-10" 
                    stroke="url(#gradientArrow)"
                />
            </div>
        </div>
        {/* SVG Gradient Definition for the Icon */}
        <svg width="0" height="0" className="absolute">
            <linearGradient id="gradientArrow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FC2C54" />
                <stop offset="100%" stopColor="#00CBD9" />
            </linearGradient>
        </svg>
      </div>
    </div>
  );
};
