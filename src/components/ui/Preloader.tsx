import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Calculate percentage using easeOutQuart
      const rawPercentage = Math.min(progress / duration, 1);
      const easePercentage = 1 - Math.pow(1 - rawPercentage, 4);
      
      setCount(Math.floor(easePercentage * 100));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400); // Wait a beat before dismissing
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg text-text-primary"
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%', 
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } // Custom Apple-style ease
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="overflow-hidden h-24 sm:h-32 flex items-center justify-center">
          <motion.h1 
            className="text-[6rem] sm:text-[8rem] font-display font-bold leading-none"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {count}%
          </motion.h1>
        </div>
        
        {/* Loading Bar */}
        <div className="w-48 sm:w-64 h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
