import { motion } from 'framer-motion';
import { JOURNEY_ITEMS } from '../../data';
import SectionHeading from '../ui/SectionHeading';
import type { JourneyItem } from '../../types';

const TYPE_COLORS: Record<JourneyItem['type'], string> = {
  milestone: 'bg-accent',
  project: 'bg-indigo-500',
  learning: 'bg-amber-500',
  goal: 'bg-emerald-500',
};

const TYPE_LABELS: Record<JourneyItem['type'], string> = {
  milestone: 'Milestone',
  project: 'Project',
  learning: 'Learning',
  goal: 'Goal',
};

export default function Journey() {
  return (
    <section id="journey" className="section-padding overflow-hidden">
      <div className="container px-4 sm:px-6">
        <SectionHeading number="03" title="Journey" />

        <div className="mt-20 relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border origin-top -translate-x-1/2 hidden sm:block"
          />

          <div className="flex flex-col gap-12 sm:gap-24 relative z-10">
            {JOURNEY_ITEMS.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={item.id} 
                  className={`flex flex-col sm:flex-row gap-8 sm:gap-16 w-full ${isEven ? 'sm:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 hidden sm:flex items-center justify-center w-8 h-8 mt-2 bg-bg rounded-full border border-border">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className={`w-3 h-3 rounded-full ${TYPE_COLORS[item.type]}`}
                    />
                  </div>

                  {/* Date (Desktop) */}
                  <div className={`hidden sm:flex flex-1 ${isEven ? 'justify-start' : 'justify-end'} items-start pt-3`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="font-display text-xl md:text-2xl font-bold text-text-primary whitespace-nowrap"
                    >
                      {item.year}
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 bg-surface border border-border p-6 md:p-8 rounded-3xl ml-12 sm:ml-0 relative"
                  >
                    {/* Mobile Timeline Dot & Line */}
                    <div className="sm:hidden absolute left-[-48px] top-6 w-8 h-8 bg-bg rounded-full border border-border flex items-center justify-center z-10">
                      <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[item.type]}`} />
                    </div>
                    <div className="sm:hidden absolute left-[-32px] top-0 bottom-[-48px] w-[1px] bg-border -translate-x-1/2" />

                    {/* Mobile Date */}
                    <div className="sm:hidden font-display text-xl font-bold text-text-primary mb-4">
                      {item.year}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-2 h-2 rounded-full ${TYPE_COLORS[item.type]}`} />
                      <span className="text-xs uppercase tracking-widest font-medium text-text-muted">
                        {TYPE_LABELS[item.type]}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-4">
                      {item.title}
                    </h3>
                    
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
