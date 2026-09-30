import { useState, useEffect, useRef, useCallback } from 'react';
import { NAV_LINKS } from '../../data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href) as HTMLElement
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Animate menu
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    let ctx: gsap.Context | undefined;
    import('gsap').then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        if (isOpen) {
          gsap.to(menu, {
            clipPath: 'inset(0 0 0 0)',
            duration: 0.6,
            ease: 'power4.inOut',
          });
          gsap.from(menu.querySelectorAll('.nav-link-mobile'), {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
            delay: 0.2,
            ease: 'power3.out',
          });
        } else {
          gsap.to(menu, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.5,
            ease: 'power4.inOut',
          });
        }
      }, menu);
    });

    return () => ctx?.revert();
  }, [isOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-[100] transition-all duration-500 rounded-full ${
          scrolled
            ? 'bg-bg/50 backdrop-blur-xl border border-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            HARSHU<span className="text-accent">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === link.href
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-px bg-accent" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-px bg-text-primary transition-all duration-300 origin-center ${
                  isOpen ? 'rotate-45 translate-y-[4px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-px bg-text-primary transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-px bg-text-primary transition-all duration-300 origin-center ${
                  isOpen ? '-rotate-45 -translate-y-[4px]' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[99] bg-bg flex flex-col items-center justify-center md:hidden"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link-mobile font-display text-3xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors duration-300"
              tabIndex={isOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
