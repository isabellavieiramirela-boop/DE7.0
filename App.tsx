import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { SectionOne } from './components/SectionOne';
import { SectionTwo } from './components/SectionTwo';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sec1Ref = useRef<HTMLDivElement>(null);
  const sec2Ref = useRef<HTMLDivElement>(null);
  const [isSectionTwoActive, setIsSectionTwoActive] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Add responsiveness to the matchMedia
    mm.add("(min-width: 1px)", () => {
        
        // Initial Set for Section 2
        gsap.set(sec2Ref.current, { 
            scale: 0.8, 
            autoAlpha: 0, // Opacity + visibility
            filter: "blur(4px)"
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: "top top",
                end: "+=100%", // Scroll distance equal to viewport height
                scrub: 0.5, // Slight smoothing
                pin: true,
                onLeave: () => setIsSectionTwoActive(true), // Trigger internal anims when done
                onEnterBack: () => setIsSectionTwoActive(false) // Reset if scrolling back
            }
        });

        // Synchronized Zoom Transition
        tl
        // Section 1 Exits
        .to(sec1Ref.current, {
            scale: 1.3,
            autoAlpha: 0,
            filter: "blur(12px)",
            duration: 1,
            ease: "linear"
        }, 0)
        // Section 2 Enters (Simultaneous)
        .to(sec2Ref.current, {
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "linear"
        }, 0);
    });

  }, { scope: wrapperRef });

  return (
    <div className="relative w-full bg-dark-bg">
      
      {/* 
          UPDATED: h-[100dvh] 
          Using dynamic viewport height prevents jumps when mobile address bars retract/expand.
      */}
      <div ref={wrapperRef} className="relative w-full h-[100dvh] overflow-hidden">
        
        {/* Section 1 Wrapper */}
        <div ref={sec1Ref} className="absolute inset-0 w-full h-full z-20 origin-center will-change-transform">
            <SectionOne />
        </div>

        {/* Section 2 Wrapper */}
        <div ref={sec2Ref} className="absolute inset-0 w-full h-full z-30 origin-center will-change-transform">
            {/* 
               Section 2 is passed the isActive state. 
               Its internal animations (cards staggering) will only fire 
               once the main zoom transition is complete.
            */}
            <SectionTwo ref={null} isActive={isSectionTwoActive} />
        </div>

      </div>

    </div>
  );
}

export default App;