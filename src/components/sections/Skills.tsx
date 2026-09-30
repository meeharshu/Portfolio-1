import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../data';
import SectionHeading from '../ui/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="section-padding overflow-hidden">
      <div className="container px-4 sm:px-6">
        <SectionHeading number="02" title="Expertise" />

        <div className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {SKILL_CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <div className="w-12 h-[2px] bg-border" />
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary">
                  {category.title}
                </h3>
                
                <ul className="flex flex-col gap-4 mt-2">
                  {category.skills.map((skill, i) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + i * 0.05 }}
                      className="group flex items-center justify-between"
                    >
                      <span className="text-text-secondary text-base md:text-lg group-hover:text-accent transition-colors duration-300">
                        {skill}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
