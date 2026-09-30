import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { PROFILE_DATA } from '../../data';

export default function About() {
  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="container px-4 sm:px-6">
        <SectionHeading number="00" title="About" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-surface border border-border relative">
              <img
                src={PROFILE_DATA.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent opacity-80" />
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-6 text-base md:text-lg text-text-secondary leading-relaxed font-light">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="text-text-primary font-medium">Hello.</span> I'm a frontend developer
                passionate about creating interactive, accessible, and high-performance web applications.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                I specialize in React, TypeScript, and modern styling solutions. My focus is always on
                building scalable front-end architectures while delivering exceptional user experiences through fluid motion and thoughtful UI design.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                When I'm not coding, you can find me exploring new web technologies, contributing to
                open-source, or experimenting with creative coding and 3D web experiences.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mt-12 flex flex-col sm:flex-row gap-8"
            >
              <div className="flex flex-col gap-2">
                <span className="text-text-muted text-sm uppercase tracking-widest font-medium">Location</span>
                <span className="text-text-primary text-lg">{PROFILE_DATA.location}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-text-muted text-sm uppercase tracking-widest font-medium">Experience</span>
                <span className="text-text-primary text-lg">3+ Years</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
