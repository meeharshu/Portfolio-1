import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { SKILL_CATEGORIES } from '../../data';
import * as LucideIcons from 'lucide-react';

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-bg" ref={containerRef}>
      <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
        <SectionHeading number="02" title="Skills" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16 md:space-y-24 mt-16 md:mt-24"
        >
          {SKILL_CATEGORIES.map((category) => (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12" key={category.title}>
              <div className="md:col-span-5">
                <motion.p 
                  variants={itemVariants} 
                  className="text-4xl md:text-5xl font-display font-bold leading-tight text-text-muted uppercase"
                >
                  {category.title}
                </motion.p>
              </div>

              <div className="md:col-span-7 flex gap-x-8 gap-y-6 flex-wrap">
                {category.skills.map((skill) => (
                  <motion.div
                    variants={itemVariants}
                    className="flex gap-3 items-center"
                    key={skill.name}
                  >
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-surface/50 border border-white/5 flex items-center justify-center text-accent">
                        <LucideIcons.Check size={18} />
                      </div>
                    )}
                    <span className="text-xl md:text-2xl font-medium text-text-primary">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

