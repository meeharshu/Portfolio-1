import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { SKILL_CATEGORIES } from '../../data';
import type { SkillDetail } from '../../types';

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollWidth, setScrollWidth] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Flatten all skills from categories
  const allSkills = SKILL_CATEGORIES.flatMap(category => category.skills);

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

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        setScrollWidth(scrollRef.current.scrollWidth - window.innerWidth + 40); // 40px for some extra padding
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [allSkills]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);

  return (
    <section id="skills" className="relative bg-bg">
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="turbulent-displace">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </svg>
      {/* 
        This div is the scroll area. It needs to be tall enough to allow scrolling.
        We'll use 400vh to give a smooth, long scroll experience.
      */}
      <div ref={targetRef} className="h-[400vh] relative">
        <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden py-20">
          
          <div className="container px-4 sm:px-6 w-full shrink-0">
            <SectionHeading number="02" title="Skills" />
          </div>

          <motion.div ref={scrollRef} style={{ x }} className="flex gap-6 md:gap-10 px-4 sm:px-6 md:px-12 items-stretch mt-12 md:mt-24 w-max">
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card-container-electric card-electric-skills shrink-0 w-[280px] md:w-[380px] h-[400px] md:h-[440px] text-left outline-none cursor-pointer group transition-all duration-500 hover:-translate-y-2 flex flex-col"
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
                onFocus={() => setActiveSkill(skill)}
                onBlur={() => setActiveSkill(null)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveSkill(skill);
                  }
                }}
              >
                <div className="inner-container-electric">
                  <div className="border-outer-electric">
                    <div className="main-card-electric p-6 md:p-8 flex flex-col justify-between h-full bg-surface/90 backdrop-blur-md">
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-xs font-display tracking-widest text-[#00F0FF] uppercase">{skill.category}</span>
                          <span className="text-xs font-medium text-bg px-2.5 py-1 bg-text-primary rounded-full">
                            {skill.proficiency}
                          </span>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-4 group-hover:text-[#00F0FF] transition-colors duration-300">
                          {skill.name}
                        </h4>
                        <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                          {skill.description}
                        </p>
                      </div>

                      <div className="relative z-10 w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-bg transition-all duration-300 self-end mt-4">
                        <LucideIcons.ArrowUpRight size={18} className="opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="glow-layer-1-electric" />
                <div className="glow-layer-2-electric" />
                <div className="background-glow-electric" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Popover (Desktop) for Application POV */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed pointer-events-none z-[100] hidden md:flex flex-col gap-2 w-72 bg-bg-elevated border border-border p-5 rounded-xl shadow-2xl"
            style={{
              left: Math.min(mousePos.x + 20, typeof window !== 'undefined' ? window.innerWidth - 300 : 0),
              top: Math.min(mousePos.y + 20, typeof window !== 'undefined' ? window.innerHeight - 150 : 0),
            }}
          >
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="text-[#00F0FF] font-medium block mb-2 text-sm">My POV / Application</span> 
              {activeSkill.application}
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
            className="fixed inset-x-0 bottom-0 z-[100] md:hidden bg-bg-elevated border-t border-border p-6 rounded-t-3xl shadow-2xl"
          >
            <button 
              onClick={() => setActiveSkill(null)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary bg-surface rounded-full"
            >
              <LucideIcons.X size={16} />
            </button>
            <div className="mt-4">
              <span className="text-[#00F0FF] font-medium block mb-2 text-sm uppercase tracking-widest">My POV / Application</span> 
              <p className="text-sm text-text-secondary leading-relaxed bg-surface/50 p-4 rounded-xl">
                {activeSkill.application}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
