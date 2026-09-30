import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border py-8" role="contentinfo">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="font-display text-sm font-bold tracking-tight text-text-primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            HARSHU<span className="text-accent">.</span>
          </a>
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} — Designed & built with care.
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-xs text-text-muted hover:text-accent transition-colors duration-300"
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <ArrowUp
            size={14}
            className="group-hover:-translate-y-0.5 transition-transform duration-300"
          />
        </button>
      </div>
    </footer>
  );
}
