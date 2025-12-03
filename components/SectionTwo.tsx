
import React, { forwardRef, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { useGSAP } from '@gsap/react';
import { Rocket, Star, Pencil, CheckCircle, Star as StarIcon, Brain, Check, Users, Flame, CheckCheck } from 'lucide-react';
import { ASSETS } from '../constants';
import { SectionSeven } from './SectionSeven';
import { SectionEight } from './SectionEight';
import { SectionNine } from './SectionNine';
import { SectionTen } from './SectionTen';
import { SectionEleven } from './SectionEleven';
import { SectionTwelve } from './SectionTwelve';

interface SectionTwoProps {
  isActive: boolean; // Prop to trigger entry animations
}

// Using forwardRef to allow parent to control basic transform/opacity for the zoom effect
export const SectionTwo = forwardRef<HTMLDivElement, SectionTwoProps>(({ isActive }, ref) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Section 2 Refs
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  // Section 4 Refs
  const problemSectionRef = useRef<HTMLDivElement>(null);
  const devicesImageRef = useRef<HTMLImageElement>(null);

  // Section 5 Refs
  const instructorSectionRef = useRef<HTMLDivElement>(null);
  const mentorPortraitRef = useRef<HTMLImageElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);

  // Section 6 Refs
  const differentialsRef = useRef<HTMLDivElement>(null);
  const diffCardsRef = useRef<HTMLDivElement>(null);

  const [isScrollReady, setIsScrollReady] = useState(false);

  // MOMENTUM SCROLL KILLER & SCROLLTRIGGER REFRESH
  useLayoutEffect(() => {
    if (isActive) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      const timer = setTimeout(() => {
        setIsScrollReady(true);
        // CRITICAL: Refresh ScrollTrigger so inner sections know the container is now active/sized
        ScrollTrigger.refresh();
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsScrollReady(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [isActive]);

  // Animations
  useGSAP(() => {
    if (isActive) {
      // SECTION 2 ENTRY ANIMATIONS
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(marqueeRef.current, 
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(headlineRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.6"
      )
      .fromTo(cardsRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
        "-=0.2"
      )
      .fromTo(ctaRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        "-=0.2"
      )
      .fromTo(trustRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );

      const mm = gsap.matchMedia();

      // SECTION 4 SCROLL ANIMATION (PROFESSIONAL ZOOM & FOCUS)
      if (devicesImageRef.current && problemSectionRef.current && scrollContainerRef.current) {
        // DESKTOP ANIMATION (Dramatic Zoom & Focus Pull)
        mm.add("(min-width: 768px)", () => {
            gsap.fromTo(devicesImageRef.current,
              { 
                scale: 0.5, 
                opacity: 0, 
                y: 150, 
                filter: "blur(15px)" 
              },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                filter: "blur(0px)", 
                ease: "power3.out", 
                scrollTrigger: {
                  trigger: problemSectionRef.current,
                  scroller: scrollContainerRef.current, // Explicit scroller
                  start: "top 65%", 
                  end: "center center",
                  scrub: 2, 
                }
              }
            );
        });

        // MOBILE ANIMATION
        mm.add("(max-width: 767px)", () => {
            gsap.fromTo(devicesImageRef.current,
              { 
                scale: 0.65, 
                opacity: 0, 
                y: 80, 
                filter: "blur(8px)" 
              },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                ease: "power2.out",
                scrollTrigger: {
                  trigger: problemSectionRef.current,
                  scroller: scrollContainerRef.current, // Explicit scroller
                  start: "top 75%", 
                  end: "center center",
                  scrub: 1.5, 
                }
              }
            );
        });
      }

      // SECTION 5 SCROLL ANIMATION (MENTOR ZOOM & PILLS)
      if (instructorSectionRef.current && mentorPortraitRef.current && pillsContainerRef.current && scrollContainerRef.current) {
        
        // 1. Cinematic Mentor Zoom
        gsap.fromTo(mentorPortraitRef.current,
          {
            scale: 0.55,
            opacity: 0.2,
            filter: 'blur(12px)',
            y: 100,
            rotation: 2,
            boxShadow: '0 0 0px rgba(0, 203, 217, 0)'
          },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            rotation: 0,
            boxShadow: '0 0 40px rgba(0, 203, 217, 0.4)', // Glow activation
            ease: "power4.out",
            scrollTrigger: {
              trigger: instructorSectionRef.current,
              scroller: scrollContainerRef.current, // Explicit scroller
              start: "top 80%",
              end: "center 35%",
              scrub: 2.5, // Ultra smooth
            }
          }
        );

        // 2. Pills Stagger (Achievements Unlocked)
        gsap.fromTo(pillsContainerRef.current.children,
          {
            y: 50,
            opacity: 0,
            scale: 0.85,
            filter: 'blur(6px)',
            rotateX: -10
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            rotateX: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: pillsContainerRef.current,
              scroller: scrollContainerRef.current, // Explicit scroller
              start: "top 65%",
            }
          }
        );
      }

      // SECTION 6 SCROLL ANIMATION (DIFFERENTIALS)
      if (differentialsRef.current && diffCardsRef.current && scrollContainerRef.current) {
        gsap.fromTo(diffCardsRef.current.children,
            {
                y: 60,
                opacity: 0,
                scale: 0.9,
                rotateX: -15,
                filter: 'blur(8px)'
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                rotateX: 0,
                filter: 'blur(0px)',
                stagger: 0.18,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: differentialsRef.current,
                    scroller: scrollContainerRef.current, // Explicit scroller
                    start: "top 70%",
                }
            }
        );
      }

    }
  }, { scope: scrollContainerRef, dependencies: [isActive] });

  return (
    <div 
      ref={ref} 
      className="section-two absolute inset-0 w-full h-full overflow-hidden bg-[#05121d]"
    >
      <div 
        ref={scrollContainerRef}
        className={`
            w-full h-full 
            scrollbar-hide touch-pan-y 
            bg-black
            relative overscroll-none
            ${isActive && isScrollReady ? 'overflow-y-auto pointer-events-auto' : 'overflow-hidden pointer-events-none'}
        `}
      >
        {/* Background Overlay - Blue Fog Gradient */}
        <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(0,203,217,0.12)_0%,_rgba(0,203,217,0.02)_60%,_transparent_100%)] mix-blend-screen pointer-events-none z-0" />

        {/* Marquee Bar */}
        <div ref={marqueeRef} className="absolute top-0 left-0 w-full bg-cyan-neon/10 border-b border-cyan-neon/20 z-20 overflow-hidden py-2 opacity-0">
            <div className="animate-marquee whitespace-nowrap flex">
                <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-cyan-neon uppercase px-4">
                    Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional •
                </span>
                <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-cyan-neon uppercase px-4">
                    Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional  •  Vagas Limitadas com Valor Promocional •
                </span>
            </div>
        </div>

        {/* ==========================================
            SECTION 2: HERO / OFFER
           ========================================== */}
        <div className="relative w-full min-h-[100dvh] flex flex-col items-center">
            <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-14 md:pt-28 pb-20 flex flex-col items-center text-center flex-grow justify-center">
                
                <div ref={headlineRef} className="opacity-0 flex flex-col items-center mb-2 mt-8 md:mb-6 md:mt-4 shrink-0">
                <img src={ASSETS.HEADLINE_IMAGE} alt="Design Hack" className="h-10 md:h-16 lg:h-20 mb-2 md:mb-4 object-contain" />
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-1 font-sans">
                    Domine o Design <br className="md:hidden"/>
                    em <span className="bg-gradient-to-r from-primary-main via-primary-light to-primary-dark bg-clip-text text-transparent">menos de 7 dias!</span>
                </h1>
                </div>

                <h2 ref={subRef} className="opacity-0 text-sm md:text-xl text-gray-300 font-medium mb-4 md:mb-12 max-w-2xl shrink-0 font-sans">
                Isso vai fazer sua vida <span className="text-yellow-gold font-bold">mais fácil</span> e com <span className="text-yellow-gold font-bold">mais dinheiro</span>
                </h2>

                <div ref={cardsRef} className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 mb-8 md:mb-12 shrink-0">
                    <BenefitCard 
                    icon={<Star className="w-5 h-5 md:w-8 md:h-8 text-magenta-neon" />}
                    text="Mesmo sem ter experiência"
                    />
                    <BenefitCard 
                    icon={<Pencil className="w-5 h-5 md:w-8 md:h-8 text-cyan-neon" />}
                    text="Mesmo sem saber desenhar"
                    />
                    <BenefitCard 
                    icon={<CheckCircle className="w-5 h-5 md:w-8 md:h-8 text-yellow-gold" />}
                    text="Mesmo sem investir muito"
                    />
                </div>

                <button 
                    ref={ctaRef}
                    className="opacity-0 group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-bold text-base md:text-base lg:text-lg px-8 py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_0_20px_rgba(0,203,217,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,203,217,0.6)] transition-all duration-300 mb-6 md:mb-0 shrink-0 font-sans uppercase tracking-wider"
                >
                    <div className="absolute inset-0 bg-shimmer w-[200%] animate-shimmer-sweep"></div>
                    <span className="relative z-10 flex items-center gap-2 md:gap-3">
                    QUERO SUBIR DE NÍVEL AGORA <Rocket className="w-6 h-6 md:w-5 md:h-5" />
                    </span>
                </button>

                <div ref={trustRef} className="opacity-0 flex flex-col items-center gap-1 md:gap-2 shrink-0 mt-4 md:mt-0">
                    <div className="flex gap-1 text-yellow-gold">
                        {[...Array(5)].map((_, i) => <StarIcon key={i} fill="#FFD700" className="w-4 h-4 md:w-5 md:h-5" />)}
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 max-w-md font-sans">
                        Técnicas comprovadas usadas pelos melhores profissionais do mercado
                    </p>
                </div>
            </div>
            
        </div>


        {/* ==========================================
            SECTION 3: SECRETS / IMPACT
           ========================================== */}
        <div className="relative w-full py-24 md:py-36 px-4 flex flex-col items-center text-center bg-black overflow-hidden">
            <div className="absolute inset-0 w-full h-full z-0">
                <img 
                    src={ASSETS.MENTOR_IMAGE} 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#05121d] via-black/30 to-[#05121d]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-12">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-sans font-normal leading-snug md:leading-tight text-white drop-shadow-lg">
                    Aprenda meus segredos para criar projetos <br className="hidden lg:block" />
                    <span className="bg-gradient-to-r from-[#00CBD9] via-[#AEECF1] to-[#00A0B0] bg-clip-text text-transparent">
                        10x mais poderosos
                    </span>,
                    focado em comunicar emoções, influenciar decisões e fazer com que 
                    <span className="bg-gradient-to-r from-[#00CBD9] via-[#AEECF1] to-[#00A0B0] bg-clip-text text-transparent ml-2 mr-2">
                        VOCÊ
                    </span>
                    se torne 
                    <span className="bg-gradient-to-r from-[#00CBD9] via-[#AEECF1] to-[#00A0B0] bg-clip-text text-transparent ml-2">
                        ÚNICO
                    </span> no Mercado.
                </h3>
            </div>
        </div>

        {/* ==========================================
            SECTION 4: MARKET PROBLEM
           ========================================== */}
        <div ref={problemSectionRef} className="relative w-full py-16 md:py-32 px-4 bg-transparent overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-12 lg:gap-20 items-center">
                
                <div className="order-2 lg:order-1 flex flex-col gap-6 md:gap-8 text-left">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-white font-sans">
                        Um dos maiores problemas do Mercado são os <span className="text-[#00CBD9] drop-shadow-[0_0_8px_rgba(0,203,217,0.3)]">designers desqualificados</span>
                    </h2>

                    <p className="text-[clamp(16px,1.8vw,20px)] leading-[1.6] text-[#B4B4B4] font-sans">
                        O mercado do Design (em todas as suas áreas) tem uma demanda gigante, 
                        mas faltam profissionais qualificados para fechar projetos <span className="bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent font-medium">ou conseguir empregos que realmente pagam bem.</span>
                    </p>

                    <p className="text-[clamp(16px,1.8vw,20px)] leading-[1.6] text-[#B4B4B4] font-sans">
                        É para solucionar esse problema de uma vez por todas que criei a <span className="text-white font-bold">Design Hack</span>. 
                        Agora você pode dominar a lógica por trás da estética, comandar projetos, 
                        ser reconhecido <span className="bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent font-medium">pela sua inteligência criativa e cobrar 10x mais caro por isso</span>
                         — não por sorte, mas por valor percebido.
                    </p>

                    <div className="mt-4 md:mt-6">
                        <button className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-bold text-base md:text-base lg:text-lg px-8 py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_0_20px_rgba(0,203,217,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider w-full md:w-auto font-sans">
                             <div className="absolute inset-0 bg-shimmer w-[200%] animate-shimmer-sweep"></div>
                             <span className="relative z-10 flex items-center justify-center gap-3">
                                <Rocket className="w-6 h-6 md:w-5 md:h-5" /> QUERO RESOLVER ESSE PROBLEMA AGORA
                             </span>
                        </button>
                    </div>
                </div>

                <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end w-full mb-2 md:mb-8 lg:mb-0 lg:mt-0">
                    <div className="relative w-full max-w-[300px] md:max-w-[400px] lg:max-w-[600px]">
                        <img 
                            ref={devicesImageRef}
                            src={ASSETS.DEVICES_IMAGE} 
                            alt="Design Hack Platform on Devices" 
                            className="w-full h-auto object-contain drop-shadow-2xl"
                            style={{ willChange: 'transform, opacity, filter' }}
                        />
                    </div>
                </div>

            </div>
        </div>

        {/* ==========================================
            SECTION 5: INSTRUCTOR & AUTHORITY
           ========================================== */}
        <div ref={instructorSectionRef} className="relative w-full py-16 md:py-32 px-4 bg-[#0A0A0A] overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
                
                {/* 1. Intro Text */}
                <div className="flex flex-col items-center text-center mb-10 md:mb-16">
                    <p className="text-[clamp(16px,1.8vw,22px)] text-[#B4B4B4] mb-4 font-sans">
                        Talvez você ainda <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">não me conheça...</span>
                    </p>
                    <h2 className="text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.25] font-sans">
                        <span className="text-white block md:inline">Prazer, meu nome é</span>{' '}
                        <span className="bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent block md:inline">
                            Anderson Ramon Meisterlin
                        </span>
                    </h2>
                </div>

                {/* 2. Content Grid (Hero Image & Credentials) */}
                <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-10 items-center mb-24">
                    
                    {/* Left: Mentor Hero Image */}
                    <div className="flex justify-center lg:justify-end order-1">
                        <div className="relative w-full max-w-[300px] md:max-w-[360px] lg:max-w-[380px]">
                            <img 
                                ref={mentorPortraitRef}
                                src={ASSETS.MENTOR_PORTRAIT}
                                alt="Anderson Ramon Meisterlin"
                                className="w-full h-auto rounded-[24px] border-[3px] border-[#00CBD9]/50 object-cover"
                                style={{ willChange: 'transform, opacity, filter, box-shadow' }}
                            />
                        </div>
                    </div>

                    {/* Right: Credentials Pills */}
                    <div ref={pillsContainerRef} className="flex flex-col gap-3 md:gap-3 w-full order-2">
                        <CredentialPill text="Designer da Topper Brasil especializado em Footwear" />
                        <CredentialPill text="Mais de 10 anos na indústria." />
                        <CredentialPill text="Mais de 150 mil investidos em conhecimento e formação." />
                        <CredentialPill text="Entre os 32 Melhores Designers do Mundo na categoria apparel em 2019." />
                        <CredentialPill text="Diversos Prêmios de Design ao longo da carreira." />
                        <CredentialPill text="Skin the Game, tudo o que ensino eu vivo no dia a dia." />
                    </div>

                </div>

                {/* 3. Brand Carousel (FULL WIDTH / INFINITE BORDER) */}
                <div className="flex flex-col items-center w-full mt-0 mb-10">
                    <h3 className="text-center font-bold uppercase tracking-wider mb-8 md:mb-10 text-[20px]" style={{ letterSpacing: '2px', color: '#FFFFFF' }}>
                        Marcas que Já Colaborei
                    </h3>

                    {/* Full Screen Breakout Container */}
                    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden h-[100px] md:h-[120px] flex items-center">
                         
                         {/* Left Gradient Mask - Matched to #0A0A0A (Section BG) */}
                         <div 
                            className="absolute left-0 top-0 h-full w-[150px] md:w-[250px] pointer-events-none z-10"
                            style={{ background: 'linear-gradient(to right, #0A0A0A 0%, #0A0A0A 15%, rgba(10, 10, 10, 0.8) 30%, transparent 100%)' }}
                         />
                         
                         {/* Infinite Track */}
                         <div className="flex gap-[60px] md:gap-[80px] animate-brand-scroll w-max hover:[animation-play-state:paused]">
                            {/* Group 1 */}
                            <div className="flex items-center gap-[60px] md:gap-[80px] flex-shrink-0 px-[30px]">
                                {ASSETS.BRAND_LOGOS.map((logo, index) => (
                                    <img 
                                        key={`brand-1-${index}`}
                                        src={logo} 
                                        alt={`Brand ${index}`}
                                        className="brand-logo h-[40px] md:h-[65px] w-auto max-w-[130px] md:max-w-[180px] flex-shrink-0 opacity-65 transition-all duration-600"
                                        style={{ 
                                            filter: 'grayscale(1) invert(1) contrast(3) brightness(2)', 
                                            mixBlendMode: 'screen',
                                            backgroundColor: 'transparent' 
                                        }}
                                    />
                                ))}
                            </div>
                            {/* Group 2 (Duplicated for Loop) */}
                            <div className="flex items-center gap-[60px] md:gap-[80px] flex-shrink-0 px-[30px]" aria-hidden="true">
                                {ASSETS.BRAND_LOGOS.map((logo, index) => (
                                    <img 
                                        key={`brand-2-${index}`}
                                        src={logo} 
                                        alt={`Brand ${index}`}
                                        className="brand-logo h-[40px] md:h-[65px] w-auto max-w-[130px] md:max-w-[180px] flex-shrink-0 opacity-65 transition-all duration-600"
                                        style={{ 
                                            filter: 'grayscale(1) invert(1) contrast(3) brightness(2)', 
                                            mixBlendMode: 'screen',
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                ))}
                            </div>
                         </div>

                         {/* Right Gradient Mask - Matched to #0A0A0A (Section BG) */}
                         <div 
                            className="absolute right-0 top-0 h-full w-[150px] md:w-[250px] pointer-events-none z-10"
                            style={{ background: 'linear-gradient(to left, #0A0A0A 0%, #0A0A0A 15%, rgba(10, 10, 10, 0.8) 30%, transparent 100%)' }}
                         />
                    </div>
                </div>

            </div>
        </div>

        {/* ==========================================
            SECTION 6: COURSE DIFFERENTIALS
           ========================================== */}
        <div ref={differentialsRef} className="relative w-full py-20 md:py-32 px-4 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
             <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center">
                
                {/* 1. Headline */}
                <h3 className="text-center text-[clamp(32px,5vw,56px)] leading-[1.3] mb-12 md:mb-16 font-sans max-w-5xl mx-auto">
                    <span className="text-white font-normal block md:inline">E este curso é</span>{' '}
                    <span className="bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent font-bold block md:inline">
                        diferente de tudo que você já viu!
                    </span>
                </h3>

                {/* 2. Cards Grid */}
                <div ref={diffCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
                    <DifferentialCard 
                        icon={<Brain className="w-12 h-12 md:w-14 md:h-14 text-[#00CBD9]" />}
                        title="TEORIA COLOCADA EM PRÁTICA"
                        desc="Fácil de entender. Didática com passo a passo usando apenas ferramentas"
                        highlight="GRATUITAS"
                    />
                    <DifferentialCard 
                        icon={<CheckCheck className="w-12 h-12 md:w-14 md:h-14 text-[#00CBD9]" />}
                        title="TUDO O QUE EU SEI RÁPIDO E EFICIENTE"
                        desc="Conteúdos que já investi mais de"
                        highlight="150mil e levei mais de 10 anos para descobrir. Você acessa agora com um clique."
                    />
                    <DifferentialCard 
                        icon={<Users className="w-12 h-12 md:w-14 md:h-14 text-[#00CBD9]" />}
                        title="ÁREA DE MEMBROS EXCLUSIVA"
                        desc="Vou pegar na sua mão. Você não precisa passar anos numa sala de aula, nem se endividar com"
                        highlight="mensalidades absurdas."
                    />
                    <DifferentialCard 
                        icon={<Flame className="w-12 h-12 md:w-14 md:h-14 text-[#00CBD9]" />}
                        title="ALTA DEMANDA"
                        desc="As empresas e clientes estão"
                        highlight="desesperados por designers profissionais de qualidade."
                    />
                </div>

                {/* 3. CTA Button */}
                <div className="mt-12 md:mt-16">
                     <button className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-bold text-[clamp(16px,1.8vw,18px)] px-12 py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_0_30px_rgba(0,203,217,0.3)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans">
                         <div className="absolute inset-0 bg-shimmer w-[200%] animate-shimmer-sweep"></div>
                         <span className="relative z-10 flex items-center justify-center gap-3">
                            <Rocket className="w-6 h-6" /> QUERO SUBIR DE NÍVEL AGORA
                         </span>
                     </button>
                </div>

             </div>
        </div>

        {/* ==========================================
            SECTION 7: PROGRAM CONTENT (CAROUSEL)
           ========================================== */}
        <SectionSeven scrollerRef={scrollContainerRef} />

        {/* ==========================================
            SECTION 8: BONUS GUESTS (GOLD)
           ========================================== */}
        <SectionEight scrollerRef={scrollContainerRef} />

        {/* ==========================================
            SECTION 9: CERTIFICATE
           ========================================== */}
        <SectionNine scrollerRef={scrollContainerRef} />

        {/* ==========================================
            SECTION 10: PORTFOLIO
           ========================================== */}
        <SectionTen scrollerRef={scrollContainerRef} />

        {/* ==========================================
            SECTION 11: UNIVERSE
           ========================================== */}
        <SectionEleven scrollerRef={scrollContainerRef} />
        
        {/* ==========================================
            SECTION 12: PAIN POINTS (NEW)
           ========================================== */}
        <SectionTwelve scrollerRef={scrollContainerRef} />

      </div>
      
      {/* Specific Styles for Brand Logo Hover (Scoped) */}
      <style>{`
        .brand-logo:hover {
            opacity: 1 !important;
            filter: grayscale(1) invert(1) contrast(3) brightness(2) drop-shadow(0 0 5px rgba(0, 217, 255, 0.8)) !important;
            transform: scale(1.12);
        }
      `}</style>
    </div>
  );
});

// Helper Component for Cards
const BenefitCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="group opacity-0 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 md:p-8 flex flex-col items-center gap-2 md:gap-4 hover:border-cyan-neon hover:shadow-[0_4px_16px_rgba(0,203,217,0.25)] hover:scale-105 transition-all duration-300 font-sans">
        <div className="p-2 md:p-4 bg-white/5 rounded-full group-hover:rotate-[360deg] transition-transform duration-500">
            {icon}
        </div>
        <p className="text-sm md:text-lg font-bold text-white">{text}</p>
    </div>
);

// Helper Component for Credential Pills
const CredentialPill = ({ text }: { text: string }) => (
    <div className="group relative flex items-start p-4 md:px-5 md:py-4 bg-[#05080A] border-l-2 border-[#00CBD9]/60 rounded-r-xl shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:bg-[#0A0E12] transition-all duration-300 w-full overflow-hidden">
        {/* Subtle Cyber Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00CBD9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <Check className="w-5 h-5 text-[#00CBD9] mr-3 shrink-0 mt-0.5 relative z-10" />
        <p className="text-gray-200 text-sm font-medium leading-relaxed font-sans relative z-10 group-hover:text-white transition-colors">
            {text}
        </p>
    </div>
);

// SUPER PROFESSIONAL GRADIENT CARD REDESIGN
const DifferentialCard = ({ icon, title, desc, highlight }: { icon: React.ReactNode, title: string, desc: string, highlight?: string }) => (
    // Outer Gradient Border Wrapper
    <div className="group relative h-full min-h-[300px] rounded-[24px] p-[1.5px] bg-gradient-to-br from-[#00CBD9]/30 to-[#AEECF1]/30 hover:from-[#00CBD9] hover:to-[#AEECF1] transition-all duration-500 shadow-none">
        
        {/* Inner Content Wrapper - Solid Dark Blue Background */}
        <div className="relative h-full w-full rounded-[22px] bg-[#050B14] flex flex-col items-center text-center p-6 md:p-8 overflow-hidden">
            
            {/* Top Ambient Light Effect (Hover Only) */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#00CBD9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="mb-5 relative z-10 group-hover:-translate-y-1 transition-transform duration-300">
                {icon}
            </div>
            
            <h3 className="relative z-10 text-white font-bold text-[clamp(16px,1.8vw,20px)] uppercase tracking-wide mb-3">
                {title}
            </h3>
            
            <p className="relative z-10 text-[#B4B4B4] font-normal text-[clamp(14px,1.5vw,16px)] leading-[1.6]">
                {desc} {highlight && <span className="bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent font-bold">{highlight}</span>}
            </p>
        </div>
    </div>
);
