import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { SiGithub, SiLinkedin } from './SocialIcons';
import { SOCIAL_LINKS } from '../../data';
import MagneticButton from '../ui/MagneticButton';

export default function Contact() {
  const words = "Let's build something extraordinary together.".split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } },
  };

  return (
    <section id="contact" className="section-padding overflow-hidden bg-bg-elevated rounded-t-[3rem] mt-24">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-12 h-[2px] bg-accent" />
            <span className="text-sm font-medium text-accent tracking-widest uppercase">
              Get in Touch //
            </span>
            <div className="w-12 h-[2px] bg-accent" />
          </motion.div>

          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-text-primary tracking-tight leading-[1.1] mb-16"
          >
            {words.map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block mr-4">
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <MagneticButton>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="group relative inline-flex items-center justify-center gap-6 border border-border px-10 py-6 rounded-full overflow-hidden transition-colors hover:border-accent/0"
              >
                <span className="relative z-10 font-display text-xl sm:text-2xl font-medium tracking-wide text-text-primary group-hover:text-bg transition-colors duration-500">
                  {SOCIAL_LINKS.email}
                </span>
                <div className="relative z-10 flex items-center justify-center transition-colors duration-500">
                  <ArrowUpRight size={28} className="text-text-secondary group-hover:text-bg group-hover:rotate-45 transition-all duration-500" />
                </div>
                <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-32 w-full"
          >
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="flex flex-col items-center gap-4 p-8 bg-surface rounded-3xl border border-border hover:border-accent hover:bg-bg-card transition-all duration-300"
            >
              <Mail size={32} className="text-text-muted" />
              <span className="text-text-primary font-medium">Email</span>
            </a>
            
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-surface rounded-3xl border border-border hover:border-accent hover:bg-bg-card transition-all duration-300"
            >
              <SiGithub size={32} className="text-text-muted" />
              <span className="text-text-primary font-medium">GitHub</span>
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-surface rounded-3xl border border-border hover:border-accent hover:bg-bg-card transition-all duration-300"
            >
              <SiLinkedin size={32} className="text-text-muted" />
              <span className="text-text-primary font-medium">LinkedIn</span>
            </a>

            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-surface rounded-3xl border border-border hover:border-accent hover:bg-bg-card transition-all duration-300"
            >
              <span className="text-3xl font-display font-bold text-text-muted">𝕏</span>
              <span className="text-text-primary font-medium">Twitter</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
