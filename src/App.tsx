import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Work from './components/sections/Work';
import Skills from './components/sections/Skills';
import Journey from './components/sections/Journey';
import Contact from './components/sections/Contact';

export default function App() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    let lenisInstance: any;
    let raf: number;

    import('lenis').then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      });

      const animate = (time: number) => {
        lenisInstance.raf(time);
        raf = requestAnimationFrame(animate);
      };

      raf = requestAnimationFrame(animate);

      // Connect Lenis with GSAP ScrollTrigger
      import('gsap').then(({ default: gsap }) => {
        import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);
          lenisInstance.on('scroll', ScrollTrigger.update);

          gsap.ticker.add((time: number) => {
            lenisInstance.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        });
      });
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      lenisInstance?.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <div>
        <Navbar />
        <main>
          <Hero />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Work />
          <Skills />
          <div className="section-divider" />
          <Journey />
          <div className="section-divider" />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
