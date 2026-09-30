import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionHeadingProps {
  title?: string;
  number?: string;
  children?: ReactNode;
}

export default function SectionHeading({ title, number, children }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/50">
      <div className="flex flex-col gap-4">
        {number && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <span className="text-sm font-medium text-accent tracking-widest uppercase">
              {number} //
            </span>
          </motion.div>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary tracking-tight"
        >
          {title || children}
        </motion.h2>
      </div>
    </div>
  );
}
