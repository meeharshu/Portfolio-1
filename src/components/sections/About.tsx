import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { PROFILE_DATA } from '../../data';

export default function About() {
  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="container px-4 sm:px-6">
        <SectionHeading number="00" title="About" />

        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Main Description Column */}
          <div className="lg:col-span-8 flex flex-col justify-start">
            <div className="space-y-8 md:space-y-10 text-xl md:text-[1.65rem] text-text-secondary leading-relaxed md:leading-normal font-light">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-text-primary"
              >
                Hello, I'm Harshu — a student and aspiring frontend developer with a passion for creating thoughtful, interactive and visually engaging web experiences.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                I'm exploring the intersection of design and technology, building my skills in modern frontend development, React, TypeScript and creative web interactions. I enjoy experimenting with new technologies, refining user experiences and turning ideas into functional digital products.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                My approach is centred on curiosity, continuous learning and attention to detail. I'm focused on writing clean, maintainable code while creating interfaces that feel intuitive, responsive and enjoyable to use.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Beyond coding, I enjoy exploring emerging web technologies, creative development and new ideas that challenge how digital experiences can be built.
              </motion.p>
            </div>
          </div>
          
          {/* Metadata Column */}
          <div className="lg:col-span-4 flex flex-col gap-10 md:gap-14 pt-4 lg:pt-2 border-t lg:border-t-0 border-border lg:border-l lg:pl-12">
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <h4 className="label text-accent">Location</h4>
              <p className="text-xl md:text-2xl text-text-primary font-medium tracking-tight">
                Gwalior, India
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <h4 className="label text-accent">Experience</h4>
              <p className="text-xl md:text-2xl text-text-primary font-medium tracking-tight leading-snug">
                Student / Aspiring<br/>Frontend Developer
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <h4 className="label text-accent">Current Focus</h4>
              <p className="text-xl md:text-2xl text-text-primary font-medium tracking-tight leading-snug">
                React · TypeScript · Interactive Web Experiences
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
