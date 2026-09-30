import { motion } from 'framer-motion';
import { JOURNEY_ITEMS } from '../../data';
import SectionHeading from '../ui/SectionHeading';
import type { JourneyItem } from '../../types';

const TYPE_COLORS: Record<JourneyItem['type'], string> = {
  milestone: 'text-accent',
  project: 'text-text-primary',
  learning: 'text-text-muted',
  goal: 'text-text-secondary',
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

        <div className="mt-16 lg:mt-24 max-w-5xl mx-auto flex flex-col">
          {/* Header Row (Desktop only) */}
          <div className="hidden md:grid grid-cols-[120px_140px_1fr] gap-8 pb-4 border-b border-border/50 text-xs uppercase tracking-widest font-medium text-text-muted">
            <div>Year</div>
            <div>Category</div>
            <div>Detail</div>
          </div>

          <div className="flex flex-col">
            {JOURNEY_ITEMS.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border-b border-border/50 py-8 md:py-12 flex flex-col md:grid md:grid-cols-[120px_140px_1fr] gap-4 md:gap-8 items-start hover:bg-surface/30 transition-colors duration-500 px-4 md:px-0 -mx-4 md:mx-0 rounded-lg md:rounded-none"
              >
                {/* Year */}
                <div className="font-display text-xl md:text-2xl font-medium text-text-primary">
                  {item.year}
                </div>

                {/* Type Label */}
                <div className="flex items-center gap-2">
                  <span className={`text-sm uppercase tracking-widest font-medium ${TYPE_COLORS[item.type]}`}>
                    {TYPE_LABELS[item.type]}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 md:gap-4 w-full">
                  <h3 className="text-xl md:text-2xl font-display font-medium text-text-primary group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-text-muted tracking-wide">
                          # {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
