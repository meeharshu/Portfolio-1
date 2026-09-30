import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { SiGithub } from './SocialIcons';
import { PROJECTS } from '../../data';
import SectionHeading from '../ui/SectionHeading';
import type { Project } from '../../types';

// ── Project Card ───────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col md:flex-row gap-8 lg:gap-12 bg-bg-card p-6 lg:p-8 rounded-[2rem] border border-border hover:border-accent/50 transition-colors duration-500 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Hover Effect */}
      <motion.div 
        className="absolute inset-0 bg-accent-glow pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Media Column */}
      <div className="w-full md:w-5/12 lg:w-1/2 rounded-2xl overflow-hidden relative">
        <motion.div 
          className="aspect-[4/3] w-full bg-surface"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-text-muted">
              <span className="font-display text-2xl font-bold opacity-30">
                {project.title.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Content Column */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-center py-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium tracking-wide rounded-full border border-border text-text-secondary bg-surface"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-3xl lg:text-4xl font-display font-bold text-text-primary mb-4 flex items-center gap-4">
          {project.title}
          <motion.span
            animate={{ x: isHovered ? 5 : 0, y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" size={28} />
          </motion.span>
        </h3>
        
        <p className="text-text-secondary text-base md:text-lg mb-8 max-w-xl leading-relaxed">
          {project.description}
        </p>

        <div className="flex items-center gap-6 mt-auto pt-4 border-t border-border">
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-300 font-medium"
            >
              <SiGithub size={20} />
              <span>Source</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-300 font-medium"
            >
              <ExternalLink size={20} />
              <span>Live Site</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Work Section ───────────────────────────────────────────────────────
export default function Work() {
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="work" className="section-padding">
      <div className="container px-4 sm:px-6">
        <SectionHeading number="01" title="Selected Works" />

        <div className="flex flex-col gap-12 mt-16 lg:mt-24">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-32">
            <h3 className="text-2xl font-display font-bold text-text-primary mb-12">
              Other Explorations
            </h3>
            <div className="flex flex-col border-t border-border mt-8">
              {others.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.liveUrl || project.sourceUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-border hover:bg-surface/30 transition-colors px-4 -mx-4 rounded-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 lg:gap-24">
                    <span className="text-text-muted text-sm font-medium w-12">{project.year}</span>
                    <h4 className="text-2xl md:text-3xl font-display font-bold text-text-primary group-hover:text-accent transition-colors">
                      {project.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 md:mt-0 w-full md:w-auto md:flex-1 md:justify-end gap-8">
                    <div className="flex flex-wrap gap-2 md:gap-4 justify-start md:justify-end max-w-sm">
                      {project.technologies.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-sm font-medium text-text-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="hidden sm:flex w-12 h-12 shrink-0 rounded-full border border-border items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300 group-hover:scale-110">
                      <ArrowUpRight size={20} className="text-text-secondary group-hover:text-bg transition-colors" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
