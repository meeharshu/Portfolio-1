import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../data';
import type { SkillDetail } from '../../types';
import SectionHeading from '../ui/SectionHeading';
import * as LucideIcons from 'lucide-react';

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update mouse position for the popover
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (activeSkill) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeSkill]);

  return (
    <section id="skills" className="section-padding relative">
      <div className="container px-4 sm:px-6">
        <SectionHeading number="02" title="Skills" />

        <div className="mt-16 lg:mt-24 flex flex-col gap-16 md:gap-24">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start"
            >
              {/* Category Header */}
              <div className="flex flex-col gap-4">
                <div className="w-8 h-[1px] bg-accent mb-2" />
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex overflow-x-auto whitespace-nowrap gap-x-4 md:gap-x-6 pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {category.skills.map((skill) => (
                  <button
                    key={skill.name}
                    className="group relative text-left outline-none shrink-0 px-6 py-4 bg-surface/30 backdrop-blur-md border border-border/50 rounded-2xl hover:bg-surface/60 hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    onMouseEnter={() => setActiveSkill(skill)}
                    onMouseLeave={() => setActiveSkill(null)}
                    onFocus={() => setActiveSkill(skill)}
                    onBlur={() => setActiveSkill(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <span className="relative z-10 text-lg md:text-xl font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300 block truncate">
                      {skill.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Popover (Desktop) */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed pointer-events-none z-[100] hidden md:flex flex-col gap-3 w-80 bg-bg-elevated border border-border p-6 rounded-lg shadow-2xl"
            style={{
              left: Math.min(mousePos.x + 20, typeof window !== 'undefined' ? window.innerWidth - 340 : 0),
              top: Math.min(mousePos.y + 20, typeof window !== 'undefined' ? window.innerHeight - 200 : 0),
            }}
          >
            <div className="flex items-center justify-between">
              <span className="label text-accent">{activeSkill.category}</span>
              <span className="text-xs font-medium text-text-muted px-2 py-1 bg-surface rounded">
                {activeSkill.proficiency}
              </span>
            </div>
            <h4 className="text-xl font-display font-bold text-text-primary break-words whitespace-normal">
              {activeSkill.name}
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed break-words whitespace-normal">
              {activeSkill.description}
            </p>
            <div className="w-full h-[1px] bg-border my-1" />
            <p className="text-xs text-text-muted break-words whitespace-normal">
              <span className="text-text-secondary">Applies to:</span> {activeSkill.application}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Popover Overlay */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[100] md:hidden bg-bg-elevated border-t border-border p-6 rounded-t-2xl shadow-2xl"
          >
            <button 
              onClick={() => setActiveSkill(null)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary"
            >
              <LucideIcons.X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-4 mt-2">
              <span className="label text-accent">{activeSkill.category}</span>
              <span className="text-xs font-medium text-bg px-2 py-1 bg-text-primary rounded">
                {activeSkill.proficiency}
              </span>
            </div>
            <h4 className="text-2xl font-display font-bold text-text-primary mb-3 break-words whitespace-normal">
              {activeSkill.name}
            </h4>
            <p className="text-base text-text-secondary leading-relaxed mb-4 break-words whitespace-normal">
              {activeSkill.description}
            </p>
            <p className="text-sm text-text-muted bg-surface p-3 rounded break-words whitespace-normal">
              <span className="text-text-secondary block mb-1 font-medium">Core Application:</span> 
              {activeSkill.application}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
