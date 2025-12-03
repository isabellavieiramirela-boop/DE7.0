import React, { useEffect, useRef } from 'react';

interface ParticlesProps {
  className?: string;
}

export const Particles: React.FC<ParticlesProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const particleCount = window.innerWidth < 768 ? 25 : 50; // Mobile optimization

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction (subtle repulsion/attraction)
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            p.x -= (dx / distance) * force * 0.5;
            p.y -= (dy / distance) * force * 0.5;
        }

        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 203, 217, ${p.alpha})`; // Cyan particles
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none ${className}`} />;
};
