import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    // Ensure fonts are loaded before animating, with a 1.5s fallback
    if (document.fonts && document.fonts.ready) {
      timeout = setTimeout(() => setReady(true), 1500);
      document.fonts.ready.then(() => {
        clearTimeout(timeout);
        setReady(true);
      });
    } else {
      setReady(true);
    }
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const container = containerRef.current;
    const bar = barRef.current;
    if (!container || !bar) return;

    if (reducedMotion) {
      onComplete();
      return;
    }

    let ctx: gsap.Context | undefined;

    import('gsap').then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        const letters = container.querySelectorAll('.preloader__letter');
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.to(container, {
              yPercent: -100,
              duration: 0.8,
              ease: 'power4.inOut',
              onComplete,
            });
          },
        });

        tl.from(letters, {
          y: 80,
          rotateX: -90,
          opacity: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: 'power3.out',
        })
          .to(bar, {
            width: '100%',
            duration: 1.2,
            ease: 'power2.inOut',
          }, '-=0.2')
          .to(letters, {
            y: -80,
            opacity: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power3.in',
          }, '+=0.3')
          .to(bar, { opacity: 0, duration: 0.3 }, '-=0.3');
      }, container);
    });

    return () => ctx?.revert();
  }, [ready, reducedMotion, onComplete]);

  const nameChars = 'HARSHU'.split('');

  return (
    <div ref={containerRef} className="preloader" aria-hidden="true">
      <div className="preloader__text" style={{ perspective: '600px' }}>
        {nameChars.map((char, i) => (
          <span
            key={i}
            className="preloader__letter"
            style={{
              display: 'inline-block',
              color: i === nameChars.length - 1 ? 'var(--color-accent)' : undefined,
            }}
          >
            {char}
          </span>
        ))}
        <span
          className="preloader__letter"
          style={{ display: 'inline-block', color: 'var(--color-accent)' }}
        >
          .
        </span>
      </div>
      <div className="preloader__bar-track">
        <div ref={barRef} className="preloader__bar-fill" />
      </div>
    </div>
  );
}
