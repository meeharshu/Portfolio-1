'use client';

import { useEffect, useState } from 'react';

export function CursorFollower() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState('');

  useEffect(() => {
    const move = (event: PointerEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const enter = (event: Event) => setLabel((event.currentTarget as HTMLElement).dataset.cursor ?? '');
    const leave = () => setLabel('');
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-cursor]'));
    window.addEventListener('pointermove', move);
    targets.forEach((target) => { target.addEventListener('pointerenter', enter); target.addEventListener('pointerleave', leave); });
    return () => {
      window.removeEventListener('pointermove', move);
      targets.forEach((target) => { target.removeEventListener('pointerenter', enter); target.removeEventListener('pointerleave', leave); });
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-signal bg-ink/80 font-mono text-[9px] uppercase tracking-[0.16em] text-signal backdrop-blur-md transition-[width,height,background-color] duration-200 lg:flex ${label ? 'h-16 w-16' : 'h-3 w-3'}`} style={{ left: position.x, top: position.y }} aria-hidden="true">
      {label}
    </div>
  );
}
