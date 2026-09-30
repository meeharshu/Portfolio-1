import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { SiGithub, SiLinkedin } from './SocialIcons';
import { SOCIAL_LINKS } from '../../data';
import GlassyButton from '../ui/GlassyButton';

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
            <GlassyButton 
              href={`mailto:${SOCIAL_LINKS.email}`}
              surfaceColor="hsl(197, 88%, 58%)"
            >
              <span className="font-display text-sm sm:text-base md:text-lg font-medium tracking-normal capitalize text-text-primary group-hover:text-bg transition-colors duration-300">
                Contact Now
              </span>
              <div className="flex items-center justify-center transition-colors duration-300">
                <ArrowUpRight size={18} className="text-text-primary group-hover:text-bg group-hover:rotate-45 transition-all duration-300" />
              </div>
            </GlassyButton>
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
              className="group flex flex-col items-center gap-4 p-8 bg-surface/40 backdrop-blur-md rounded-3xl border border-border hover:border-accent hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(0,240,255,0.3)] transition-all duration-500"
            >
              <Mail size={32} className="text-text-muted group-hover:text-accent transition-colors duration-300" />
              <span className="text-text-primary font-medium group-hover:text-accent transition-colors duration-300">Email</span>
            </a>
            
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-4 p-8 bg-surface/40 backdrop-blur-md rounded-3xl border border-border hover:border-accent hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(0,240,255,0.3)] transition-all duration-500"
            >
              <SiGithub size={32} className="text-text-muted group-hover:text-accent transition-colors duration-300" />
              <span className="text-text-primary font-medium group-hover:text-accent transition-colors duration-300">GitHub</span>
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-4 p-8 bg-surface/40 backdrop-blur-md rounded-3xl border border-border hover:border-accent hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(0,240,255,0.3)] transition-all duration-500"
            >
              <SiLinkedin size={32} className="text-text-muted group-hover:text-accent transition-colors duration-300" />
              <span className="text-text-primary font-medium group-hover:text-accent transition-colors duration-300">LinkedIn</span>
            </a>

            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center gap-4 p-8 bg-surface/40 backdrop-blur-md rounded-3xl border border-border hover:border-accent hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(0,240,255,0.3)] transition-all duration-500"
            >
              <span className="text-3xl font-display font-bold text-text-muted group-hover:text-accent transition-colors duration-300">𝕏</span>
              <span className="text-text-primary font-medium group-hover:text-accent transition-colors duration-300">Twitter</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
