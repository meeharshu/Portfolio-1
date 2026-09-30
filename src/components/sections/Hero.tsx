import { useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { PROFILE_DATA } from '../../data';

const HeroScene = lazy(() => import('../three/HeroScene'));

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut" as any,
      },
    }),
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-border animate-pulse" />
            </div>
          }
        >
          <HeroScene />
        </Suspense>
      </div>

      <div className="container relative z-10 w-full h-full flex flex-col justify-center px-4 sm:px-6">
        <motion.div 
          style={{ y: y1, opacity }}
          className="flex flex-col gap-6 w-full max-w-5xl mx-auto"
        >
          <motion.div 
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-[2px] bg-accent" />
            <span className="text-accent uppercase tracking-widest text-sm font-medium">
              Portfolio {new Date().getFullYear()}
            </span>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tighter text-text-primary">
            <motion.span 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="block"
            >
              Creative
            </motion.span>
            <motion.span 
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-muted"
            >
              Engineer
            </motion.span>
          </h1>

          <motion.div 
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
          >
            <p className="text-xl md:text-2xl text-text-secondary max-w-md font-light leading-relaxed">
              Hello, I'm {PROFILE_DATA.name}. Bridging the gap between design and robust engineering.
            </p>
            
            <div className="flex items-center md:justify-end gap-6">
              <MagneticButton>
                <a 
                  href="#work" 
                  className="flex items-center gap-2 px-8 py-4 bg-accent text-bg font-medium rounded-full hover:bg-white transition-colors duration-300"
                >
                  Explore Work <ArrowDownRight size={18} />
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs uppercase tracking-widest text-text-muted font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <motion.div 
            animate={{ 
              y: ["-100%", "100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 left-0 w-full h-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
