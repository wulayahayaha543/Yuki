import { useEffect, useRef } from 'react';

interface CanvasParticlesProps {
  mode: 'chinese' | 'western';
}

export function CanvasParticles({ mode }: CanvasParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    // Chinese Scene: Peach blossoms and fireflies
    const initChinese = () => {
      particles = [];
      // Peach blossoms
      for (let i = 0; i < 40; i++) {
        particles.push({
          type: 'blossom',
          x: Math.random() * width,
          y: Math.random() * height - height,
          size: Math.random() * 6 + 4,
          speedY: Math.random() * 1 + 0.5,
          speedX: Math.random() * 2 - 1,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * 0.5 + 0.3,
          color: `rgba(255, 183, 197, ${Math.random() * 0.5 + 0.3})`, // Pinkish
        });
      }
      // Fireflies
      for (let i = 0; i < 30; i++) {
        particles.push({
          type: 'firefly',
          x: Math.random() * width,
          y: height - Math.random() * (height / 3), // Bottom third
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          baseOpacity: Math.random() * 0.5 + 0.2,
          opacity: 0,
          pulseSpeed: Math.random() * 0.05 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Western Scene: Golden dust and stars
    const initWestern = () => {
      particles = [];
      // Golden dust
      for (let i = 0; i < 80; i++) {
        particles.push({
          type: 'dust',
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 0.5,
          speedY: -Math.random() * 0.5 - 0.1,
          speedX: (Math.random() - 0.5) * 0.2,
          baseOpacity: Math.random() * 0.4 + 0.1,
          opacity: 0,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      // Stars
      for (let i = 0; i < 15; i++) {
        particles.push({
          type: 'star',
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          opacity: 0,
          pulseSpeed: Math.random() * 0.05 + 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    if (mode === 'chinese') {
      initChinese();
    } else {
      initWestern();
    }

    const drawChinese = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        if (p.type === 'blossom') {
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5; // Bezier-like sway
          p.angle += p.spin;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          // Draw a simple petal shape
          ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'firefly') {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulsePhase += p.pulseSpeed;
          p.opacity = p.baseOpacity + Math.sin(p.pulsePhase) * 0.3;

          if (p.opacity < 0) p.opacity = 0;

          if (p.x < 0 || p.x > width) p.speedX *= -1;
          if (p.y < height * 0.5 || p.y > height) p.speedY *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 230, 150, ${p.opacity})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 230, 150, 0.8)';
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });
    };

    const drawWestern = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        if (p.type === 'dust') {
          p.y += p.speedY;
          p.x += p.speedX;
          p.pulsePhase += p.pulseSpeed;
          p.opacity = p.baseOpacity + Math.sin(p.pulsePhase) * 0.2;
          if (p.opacity < 0) p.opacity = 0;

          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
          ctx.fill();
        } else if (p.type === 'star') {
          p.pulsePhase += p.pulseSpeed;
          p.opacity = Math.sin(p.pulsePhase);
          if (p.opacity < 0) p.opacity = 0;

          if (p.opacity > 0) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 3);
            ctx.lineTo(p.size * 0.5, -p.size * 0.5);
            ctx.lineTo(p.size * 3, 0);
            ctx.lineTo(p.size * 0.5, p.size * 0.5);
            ctx.lineTo(0, p.size * 3);
            ctx.lineTo(-p.size * 0.5, p.size * 0.5);
            ctx.lineTo(-p.size * 3, 0);
            ctx.lineTo(-p.size * 0.5, -p.size * 0.5);
            ctx.closePath();
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
            ctx.restore();
          }
        }
      });
    };

    const render = () => {
      if (mode === 'chinese') {
        drawChinese();
      } else {
        drawWestern();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
