import { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Globe } from 'lucide-react';
import GlassyButton from '../ui/GlassyButton';
import { PROFILE_DATA } from '../../data';

const HeroScene = lazy(() => import('../three/HeroScene'));

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Premium staggered 3D word reveal
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const wordAnim = {
    hidden: { opacity: 0, y: 80, rotateX: -60, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const fadeAnim = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1, ease: 'easeOut' as any } },
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-20"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-bg" />}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="container relative z-10 w-full h-full flex flex-col justify-center px-4 sm:px-6">
        <motion.div 
          style={{ y: y1, opacity }}
          className="flex flex-col w-full max-w-7xl mx-auto"
        >
          {/* Top Metadata */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeAnim}
            className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-8 md:mb-16 gap-6"
          >
            <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-md border border-border px-5 py-2.5 rounded-full shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="text-sm font-medium text-text-primary tracking-wide">Available for new opportunities</span>
            </div>
            
            <div className="flex items-center gap-2 text-text-muted">
              <Globe size={16} />
              <span className="text-sm tracking-wider uppercase font-medium">Remote / Worldwide</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-[12vw] md:text-[8vw] lg:text-[8.5rem] font-display font-bold leading-[0.85] tracking-tighter text-text-primary uppercase"
            style={{ perspective: "1000px" }}
          >
            <div className="overflow-hidden">
              <motion.span variants={wordAnim} className="block origin-bottom">Creative</motion.span>
            </div>
            <div className="overflow-hidden flex items-center gap-4 md:gap-8">
              <motion.div variants={fadeAnim} className="hidden md:block w-24 lg:w-40 h-[8px] lg:h-[12px] bg-accent mt-4" />
              <motion.span 
                variants={wordAnim} 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-muted to-text-primary origin-bottom"
              >
                Developer
              </motion.span>
            </div>
          </motion.h1>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeAnim}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mt-12 md:mt-24 gap-8"
          >
            <p className="text-lg md:text-xl text-text-secondary max-w-md font-light leading-relaxed">
              Hi, I'm {PROFILE_DATA.name}. I craft premium, interactive web experiences that bridge the gap between profound design and robust engineering.
            </p>
            
            <GlassyButton 
              href="#work" 
              className="mt-4 md:mt-0"
              surfaceColor="#ffffff"
            >
              <span className="font-display text-xs sm:text-sm tracking-wider uppercase font-bold text-bg">Explore Now</span>
              <div className="w-7 h-7 rounded-full bg-bg/15 text-bg flex items-center justify-center transition-colors">
                <ArrowDownRight size={14} className="group-hover:rotate-[-45deg] transition-transform duration-500" />
              </div>
            </GlassyButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <div className="w-[1px] h-20 bg-border relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "circInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
