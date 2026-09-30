import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const ALL_SKILLS = [
  // Core/Primary
  'React', 'TypeScript', 'Next.js', 'Three.js', 'WebGL / GLSL', 'GSAP', 'Framer Motion',
  // Languages & Frameworks
  'JavaScript', 'Tailwind CSS', 'CSS Animations', 'Svelte', 'Vue.js',
  // Fundamentals
  'HTML5', 'CSS3', 'SCSS / Sass', 
  // Design
  'Figma', 'UI/UX Principles', 'Design Systems', 'Accessibility (a11y)',
  // Tooling
  'Vite', 'Webpack', 'Docker', 'CI/CD', 'Git & GitHub', 'Vercel', 'Netlify'
];

const ROW_1 = ALL_SKILLS.slice(0, 9);
const ROW_2 = ALL_SKILLS.slice(9, 18);
const ROW_3 = ALL_SKILLS.slice(18);

export default function Skills() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Translates the container horizontally based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section id="skills" ref={targetRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-bg">
        
        {/* Fixed Header */}
        <div className="absolute top-24 md:top-32 left-0 w-full px-4 sm:px-6 container mx-auto right-0 z-10 pointer-events-none">
          <SectionHeading number="02" title="Skills" />
        </div>

        {/* Horizontally scrolling content */}
        <motion.div 
          style={{ x }} 
          className="flex flex-col gap-6 md:gap-10 px-4 sm:px-6 lg:px-[10vw] mt-16 w-max"
        >
          {/* Row 1 */}
          <div className="flex gap-6 md:gap-10">
            {ROW_1.map((skill) => (
              <SkillChip key={skill} skill={skill} />
            ))}
          </div>
          
          {/* Row 2 (Staggered) */}
          <div className="flex gap-6 md:gap-10 ml-24 md:ml-48">
            {ROW_2.map((skill) => (
              <SkillChip key={skill} skill={skill} />
            ))}
          </div>
          
          {/* Row 3 (Staggered) */}
          <div className="flex gap-6 md:gap-10 ml-12 md:ml-24">
            {ROW_3.map((skill) => (
              <SkillChip key={skill} skill={skill} />
            ))}
          </div>
        </motion.div>
        
        {/* Progress bar */}
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

function SkillChip({ skill }: { skill: string }) {
  return (
    <div className="group flex items-center gap-4 px-8 py-5 md:px-12 md:py-8 bg-surface/30 border border-border rounded-full hover:bg-accent hover:border-accent transition-all duration-500 backdrop-blur-md cursor-default shrink-0">
      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent group-hover:bg-bg transition-colors duration-500" />
      <span className="text-3xl md:text-5xl font-display font-bold text-text-primary group-hover:text-bg transition-colors duration-500 whitespace-nowrap">
        {skill}
      </span>
    </div>
  );
}
