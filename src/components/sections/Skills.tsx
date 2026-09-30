import { useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { SKILL_CATEGORIES } from '../../data';
import type { SkillDetail } from '../../types';

export default function Skills() {
  // Flatten all skills from categories
  const allSkills = SKILL_CATEGORIES.flatMap(category => category.skills);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillDetail>(allSkills[0] || null);

  const filteredSkills = selectedCategory === 'All'
    ? allSkills
    : SKILL_CATEGORIES.find(c => c.title === selectedCategory)?.skills || allSkills;

  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-bg">
      {/* Subtle ambient electric cyan glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#00F0FF]/[0.025] blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container px-4 sm:px-6 max-w-6xl mx-auto">
        <SectionHeading number="02" title="Skills" />

        {/* Header Description & Category Filters */}
        <div className="mt-12 lg:mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-sm sm:text-base text-text-secondary max-w-md font-light leading-relaxed">
            A curated inventory of technologies, frameworks, and workflows I leverage to engineer performant, accessible digital products.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                selectedCategory === 'All'
                  ? 'bg-[#00F0FF] text-bg font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'bg-surface/60 text-text-muted hover:text-text-primary border border-white/5 hover:border-white/10'
              }`}
            >
              All ({allSkills.length})
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.title}
                type="button"
                onClick={() => setSelectedCategory(cat.title)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  selectedCategory === cat.title
                    ? 'bg-[#00F0FF] text-bg font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'bg-surface/60 text-text-muted hover:text-text-primary border border-white/5 hover:border-white/10'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Information Inspector Panel (No overlapping popovers) */}
        {activeSkill && (
          <motion.div 
            key={activeSkill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 mb-8 p-5 sm:p-6 rounded-2xl bg-surface/40 border border-white/10 backdrop-blur-md relative overflow-hidden"
          >
            {/* Subtle electric cyan top border sweep line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-70" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] shrink-0" />
                <h4 className="text-xl sm:text-2xl font-display font-bold text-text-primary tracking-tight">
                  {activeSkill.name}
                </h4>
                <span className="text-[11px] font-mono text-[#00F0FF] uppercase tracking-wider px-2 py-0.5 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                  {activeSkill.category}
                </span>
              </div>
              <span className="text-xs text-text-secondary px-3 py-1 rounded-full bg-surface/80 border border-border/60 self-start sm:self-auto">
                Proficiency: <strong className="text-text-primary font-semibold">{activeSkill.proficiency}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pt-3.5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                  Description
                </span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {activeSkill.description}
                </p>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#00F0FF] block mb-1">
                  My POV / Practical Application
                </span>
                <p className="text-sm text-text-primary leading-relaxed bg-[#00F0FF]/[0.03] p-3 rounded-xl border border-[#00F0FF]/15">
                  {activeSkill.application}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Two-Column Grid: Exactly 2 Skills Side by Side */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 sm:gap-4 md:gap-4.5">
          {filteredSkills.map((skill, index) => {
            const isSelected = activeSkill?.name === skill.name;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
                onClick={() => setActiveSkill(skill)}
                onMouseEnter={() => setActiveSkill(skill)}
                onFocus={() => setActiveSkill(skill)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveSkill(skill);
                  }
                }}
                className={`skill-card-compact text-left p-4 sm:p-4.5 flex items-center justify-between gap-4 cursor-pointer w-full group outline-none ${
                  isSelected ? 'is-selected' : ''
                }`}
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h5 className={`font-display text-sm sm:text-base font-semibold transition-colors duration-300 truncate ${
                      isSelected ? 'text-[#00F0FF]' : 'text-text-primary group-hover:text-[#00F0FF]'
                    }`}>
                      {skill.name}
                    </h5>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] shrink-0" />
                    )}
                  </div>
                  <span className="text-xs text-text-muted truncate">
                    {skill.category}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full transition-colors ${
                    isSelected
                      ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30'
                      : 'bg-surface text-text-muted border border-border/50 group-hover:text-text-secondary'
                  }`}>
                    {skill.proficiency}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#00F0FF] text-bg shadow-[0_0_8px_rgba(0,240,255,0.6)]'
                      : 'bg-surface/50 text-text-muted group-hover:text-[#00F0FF] group-hover:bg-[#00F0FF]/10'
                  }`}>
                    <LucideIcons.ArrowUpRight size={14} className={isSelected ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
