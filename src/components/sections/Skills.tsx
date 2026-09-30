import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../data';
import SectionHeading from '../ui/SectionHeading';
import * as LucideIcons from 'lucide-react';

export default function Skills() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Translates the container horizontally based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section id="skills" ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-bg">
        
        {/* Fixed Header within the sticky container */}
        <div className="absolute top-24 md:top-32 left-0 w-full px-4 sm:px-6 container mx-auto right-0 z-10 pointer-events-none">
          <SectionHeading number="02" title="Expertise" />
        </div>

        {/* Horizontally scrolling content */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 md:gap-16 px-4 sm:px-6 lg:px-[10vw] mt-24 md:mt-32 w-max items-center"
        >
          {SKILL_CATEGORIES.map((category, idx) => {
            const iconName = category.icon.charAt(0).toUpperCase() + category.icon.slice(1);
            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Terminal;
            
            return (
              <div
                key={category.title}
                className="group flex flex-col gap-8 w-[85vw] sm:w-[60vw] md:w-[450px] shrink-0 bg-surface/30 p-8 md:p-12 rounded-[2rem] border border-border backdrop-blur-md hover:bg-surface/60 transition-colors duration-500 hover:border-accent/30"
              >
                <div className="w-16 h-[2px] bg-border group-hover:bg-accent transition-colors duration-500" />
                
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-bg border border-border flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent/30 transition-all duration-500">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
                    {category.title}
                  </h3>
                </div>
                
                <ul className="flex flex-col gap-2 mt-4">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center justify-between py-4 border-b border-border/50 last:border-0"
                    >
                      <span className="text-text-secondary text-lg md:text-xl font-medium group-hover:text-text-primary transition-colors duration-300">
                        {skill}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent transition-colors duration-300" />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          
          {/* Spacer at the end so the last item isn't flush against the screen edge */}
          <div className="w-[10vw] md:w-[20vw] shrink-0" />
        </motion.div>
        
        {/* Progress bar for horizontal scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-border rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}
