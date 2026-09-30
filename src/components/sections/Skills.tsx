import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const ALL_SKILLS = [
  // Core/Primary
  { name: 'React', description: 'The foundation of my complex interactive UIs.' },
  { name: 'TypeScript', description: 'My safety net for scalable and bug-free logic.' },
  { name: 'Next.js', description: 'My preferred framework for production-grade React apps.' },
  { name: 'Three.js', description: 'Where I turn math and logic into interactive 3D art.' },
  { name: 'WebGL / GLSL', description: 'Writing custom shaders for ultimate visual control.' },
  { name: 'GSAP', description: 'The absolute best tool for high-performance complex timelines.' },
  { name: 'Framer Motion', description: 'My favorite for fluid, physics-based React micro-interactions.' },
  // Languages & Frameworks
  { name: 'JavaScript', description: 'The core language I bend to my will every single day.' },
  { name: 'Tailwind CSS', description: 'Rapid, systemic styling without the CSS bloat.' },
  { name: 'CSS Animations', description: 'Using native CSS for lightweight, butter-smooth motion.' },
  { name: 'Svelte', description: 'Exploring its compiler-first approach to reactivity.' },
  { name: 'Vue.js', description: 'Appreciating its incredibly clean, progressive ecosystem.' },
  // Fundamentals
  { name: 'HTML5', description: 'Semantic, accessible structures are my baseline.' },
  { name: 'CSS3', description: 'Pushing modern layout capabilities to their absolute limits.' },
  { name: 'SCSS / Sass', description: 'Organizing massive stylesheets with programmatic power.' },
  // Design
  { name: 'Figma', description: 'Where all my ideas are born and prototyped before coding.' },
  { name: 'UI/UX Principles', description: 'Focusing on user psychology and friction-less flows.' },
  { name: 'Design Systems', description: 'Building scalable, token-based visual languages.' },
  { name: 'Accessibility (a11y)', description: 'Ensuring my work can be experienced by absolutely everyone.' },
  // Tooling
  { name: 'Vite', description: 'My insanely fast, modern build tool of choice.' },
  { name: 'Webpack', description: 'Understanding the deep mechanics of legacy and modern bundling.' },
  { name: 'Docker', description: 'Containerizing environments for zero-friction deployments.' },
  { name: 'CI/CD', description: 'Automating testing and delivery for rapid iteration.' },
  { name: 'Git & GitHub', description: 'My source of truth and collaborative backbone.' },
  { name: 'Vercel', description: 'The perfect edge network for hosting my frontend experiments.' },
  { name: 'Netlify', description: 'Reliable, fast, and simple deployment automation.' }
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
          className="flex flex-col gap-10 md:gap-16 px-4 sm:px-6 lg:px-[10vw] mt-16 w-max"
        >
          {/* Row 1 */}
          <div className="flex gap-10 md:gap-16">
            {ROW_1.map((skill) => (
              <SkillChip key={skill.name} skill={skill} />
            ))}
          </div>
          
          {/* Row 2 (Staggered) */}
          <div className="flex gap-10 md:gap-16 ml-32 md:ml-64">
            {ROW_2.map((skill) => (
              <SkillChip key={skill.name} skill={skill} />
            ))}
          </div>
          
          {/* Row 3 (Staggered) */}
          <div className="flex gap-10 md:gap-16 ml-16 md:ml-32">
            {ROW_3.map((skill) => (
              <SkillChip key={skill.name} skill={skill} />
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

function SkillChip({ skill }: { skill: { name: string; description: string } }) {
  return (
    <motion.div 
      className="group flex flex-col justify-center px-8 py-5 md:px-12 md:py-8 bg-surface/30 border border-border rounded-full hover:bg-accent hover:border-accent transition-colors duration-500 backdrop-blur-md cursor-default shrink-0 overflow-hidden"
      layout
      transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }}
    >
      <motion.div layout="position" className="flex items-center gap-4">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent group-hover:bg-bg transition-colors duration-500 shrink-0" />
        <span className="text-3xl md:text-5xl font-display font-bold text-text-primary group-hover:text-bg transition-colors duration-500 whitespace-nowrap">
          {skill.name}
        </span>
      </motion.div>
      
      <motion.div 
        className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out"
      >
        <div className="overflow-hidden">
          <p className="text-bg/80 font-medium text-lg mt-3 pr-4">
            {skill.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
