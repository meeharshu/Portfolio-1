'use client';

import type { SpatialSection } from '@/data/portfolio';
import { navItems } from '@/data/portfolio';

interface SiteNavProps {
  activeSection: SpatialSection;
  onNavigate: (section: SpatialSection) => void;
  isLight: boolean;
  onThemeToggle: () => void;
}

export function SiteNav({ activeSection, onNavigate, isLight, onThemeToggle }: SiteNavProps) {
  return (
    <header className="pointer-events-auto fixed inset-x-0 top-0 z-30 px-5 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between rounded-full border border-white/10 bg-ink/65 px-4 py-3 shadow-panel backdrop-blur-xl sm:px-6">
        <button type="button" onClick={() => onNavigate('home')} className="group flex items-center gap-3 text-left" aria-label="Return to home">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-signal font-mono text-xs font-medium text-ink transition-transform group-hover:rotate-12">H.</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-paper/70 sm:block">Spatial portfolio</span>
        </button>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <button key={item.section} type="button" onClick={() => onNavigate(item.section)} className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${activeSection === item.section ? 'text-signal' : 'text-paper/45 hover:text-paper'}`}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35 sm:block">{isLight ? 'Day mode' : 'Night mode'}</span>
          <button type="button" onClick={onThemeToggle} aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`} className="relative h-7 w-12 rounded-full border border-white/15 bg-white/10 p-1 transition-colors hover:border-signal/70">
            <span className={`block h-5 w-5 rounded-full bg-signal shadow-[0_0_14px_rgba(216,255,115,.6)] transition-transform duration-500 ${isLight ? 'translate-x-5' : ''}`} />
          </button>
          <button type="button" onClick={() => onNavigate('contact')} className="hidden rounded-full bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-signal sm:block">Let&apos;s talk</button>
        </div>
      </div>
      <div className="mx-auto mt-3 flex max-w-[1500px] gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => <button key={item.section} type="button" onClick={() => onNavigate(item.section)} className={`shrink-0 rounded-full border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] backdrop-blur-md ${activeSection === item.section ? 'border-signal bg-signal text-ink' : 'border-white/10 bg-ink/70 text-paper/55'}`}>{item.label}</button>)}
      </div>
    </header>
  );
}
