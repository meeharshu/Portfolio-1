import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { SKILL_CATEGORIES } from '../../data';
import type { SkillDetail } from '../../types';

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<SkillDetail | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollWidth, setScrollWidth] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Flatten all skills from categories
  const allSkills = SKILL_CATEGORIES.flatMap(category => category.skills);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (activeSkill) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeSkill]);

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        setScrollWidth(scrollRef.current.scrollWidth - window.innerWidth + 40); // 40px for some extra padding
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [allSkills]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);

  return (
    <section id="skills" className="relative bg-bg">
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="turbulent-displace">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
          </filter>
          <filter id="container-glass" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise">
              <animate attributeName="baseFrequency" dur="12s" values="0.008 0.008; 0.014 0.012; 0.008 0.008" repeatCount="indefinite" />
            </feTurbulence>
            <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
            <feDisplacementMap in="SourceGraphic" in2="blur" scale="35" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="btn-glass" primitiveUnits="objectBoundingBox">
            <feImage href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAF6ESURBVHgB7b1ZsB3HeSb4ZZ1zV+wEQCykAJIASHERQNBaKRKySMkxYYVly+6x3fNgR0e4rZn2vIw7RnbMONrd0X5wKMLTT+7psf0w7ocZWz22pZ5Wz0xL1EaJ1M5NJEWR1EKJhECBK0gAF/ee+icr1//PzKpT595zsZE/ULeycquqrP+rf8uso/7lHxPhTZoqqZmzUBteRbXzOQz2fB/Y9CKgjzG7pLezoGZTI5CuR3NNugYNRjZPtyeqQKOh3g9AS/OglVnQ8rzJgz7GaAY4vQnqhT2onn8LqpevRPXSlVArM3iTpktDvEmrpmr2DIZXP43hjp+g2nISatNLGOz6AdSWFxyzE2r+lwj2beTfSQSfowuTzpUu0dsi7B52X7s9qSav0seuXj3UQNkF9eJuvd+BwavbMfzZ1Zh55sY3gbMGehMgE5AansP8wQcxc+WPMbv/UQz3/ABULTMY6H0DAqoNwzc5aNLk0g2bGxx4mESg8Hx9JvdfuVIV8pWye5OnKn1chfRo62nQth860Nj8RgoNjx/E7A9vxtxz12H2xzegWlrEm9SP3gRIBw0WX8W8VpFmdv8AC4cewGD7s3rEliwUSEsIvWFUm71hdrJAaQBCRnN1gDFlbjMM7qAhtNuSpuuAoSJATDXl8yqzV0aiVCFPub3NG2B596NY2vM4Xm3y6hnMHr8Ocz+6GfM/uR6zJ/ZjcHoz3qQyvQmQhKq5M9h48NvYePN9mN39NNT8a5onRxoQDggOEDAA8WkPDAsKDwZyilEAB1IVCxEklOSrCA4VShQrruyxstLEgIKBxuZVRrKQBolyew17DZZHcWbv40bK4NwGzB8/gE0Pvh+Lz9yEwZmNeJMivQkQNKrTMhavehJbDn8BGw5+S/PQWc3mKxYQKxEIDVBs2gODwjG8BHHAIA+IAAySWIA4QC5BVLJTosiqXSpIEASpwfOsFPFAUU6iWCkzMOl6cA6n3/IAXnvLw9WWcDi00ex5ZFj2KAljKIKb3R6QwNkYc/T2HLj/dj81vtQLbziVCcNjNGK5kC9r7XkcKCwEoMsUIjZGkZ6eGAgSAqb5JIEiLYGJyprVw2p8CfLU/5AWYPdF1r1SjkQeVAoBhAJFg8UpYaoq3M4df29ePX6+7Rk2Yit3zmGrY+9FwsnrsEbld5wABnMnsb2W+/BFUfuwXDTSac+jQwoiFYcEFZQ16OoPlHtDHAnLYgYSLiEoACUoF41woUDRJADRxdASiBhRrvRqGJFK1kqDx8PDgsiq5ZxqaIiUCoLkiZNagakHRIvHP1POHn0/8HMy3uw9fH3YscDH8Dw7BtLBXvDAGRu0wsaGJ/Fjrd9DmrulJEU9WhkJUZtwdEAItgaDiC1N7gzA9xJB26Ep94obncQ91o5alWvPEk1S+R74IyQ2SsYeZVLJSqXkyRO/QoAqawkqdQyarM/p6WJdhs3UkVv5zb/CD9997P42eHP4IrH78RODZTZUzvwRqDLHiCzm09iz7s+ha0Hvq4N8AYYmglW9FZbNQrkgWDBAAeMTFokgBDSg6KNIfZwoAi4ISEwIizaAaKSUosLDpwoOYIL2LmISQAjAiaqYc7jpfeV3monSWz+IKhgyoBlBqO5FZw4+h9x8q33Ysv3fw57vvkhzOnYy+VMly1ANux4Bnve8Z+w9dD9zrjWoBjpmEW97FQpq0bVDhxGnarJgMSoU7WLbdR1GRCJMY7UC0Uk95Dl1J5wFEGgsh64wa7CjoJlEkECFY35EmBUZb1hVu1a0UDQhnsDmMoBxkgUnafjPY0KpqoZrMwt4+RNn8HzN30eVzz5Hlz19Q9j4YWrcTnSZQeQTTqSffV7/gM2Xf0d/dytpGjA4YHh1SkPDguM2hnolNkYqWeKOBhIqlJSvWLpUCclai9qSGUJVqZkRZWmFaunovqlomvY5NXcgFdm2ouRKiObF4CipYiVJsvOVpkxYHnh4Jdw8uB92PzMEez/ym9gw8l9uJzosgHIzPwp7L/9E9j51i/ph7xkgFAzYNQeFCY/McBTMCTAQBLHyFUqnm9JqFYCNAA/oI57kuqVdPPyhJceMTsFh62bebtCeR0AUumtDmkNjroBykintdStGmDYfW2kzbJOz+j0DF65+lt48Dcfwu6HfwFXP/CLmLtMbJRLHiCqGmH3jV/C/nd/AoO5ly0otCplbA0DimWrRnl1ykiQCIyaSYvaxTMiSKTksBhhVkQqQQBhjNNYIzw0aLm58KfYR5iKojyYUknCgeJVLkRgNKCpnKqlQSIDjFGyhDhKVRvQQAMG1Yox4JXeK9VIlUaizOL4Lf8vXrj2W7jqgQ/hqkc+aC/uEqZLGiCbd30fB+/4a2y48imtIDU2xjkHiGUnKVaExGjsCik13HFNnUZ4kB7RHSVVrbDjKlU8DvCZYOK0QruMUcob5hRrK163OU7LuOoVgWJVLMXAYSWKB0/jKjZ2SgOQ2sdQapPnpUoToa80UNC8fDRIlhaO4+n3/jWO3/BlXP+l38bmEwdwqZK6FKe7z214Ede+/VPYdeM9+qGuGDVqRA04zjlALAdgWMnBJUYtJEYDmhpJDMOlnXmelwGZp4qYOhXLEctZHsDLmMRhmz1WST2Xr/wxK2d5sU6cBRyOeVujTqmQjnVYfuVmDBtbxMZQ+L6uBsZGadzCZtOSpDZq16ze602/g/c8fjeu+/qvYfbMpTfn65KSII06tfeGe3HgXX+j1alXDSAacJi9sTe8Eb5svVDEp4Y4iVF726IWqhRQ8k4B0f4AkwBcLZJlhA7VauJ3Uak+V6OYlIDXpIipWoQgizLDnRDjI5DeLu8ybtQpfc1GqtRWvaorOXWlaqRyo3I1Uqfym13bYtWvWTz31v+C5/d/A9d++1dx9aN3XVJTWC4ZgMzoCPhN7/tL7Lj2GwYAo5UlLQGcSiXUqZUgNcxW+ykiTGqA2RjCGG/OJG2OkAaTHi4dKHXlknzjS0CtnixbUzwIbl0HThVr2YJgmURQhLSry+wU8q7foJJRjMD7vjxQfOzEAaZqVDoXYG1eZFU1MjEluP3y3Ek8cfv/jpd3Ponrv/aPMXd6Ky4FuiQAsm3Xk7jl5/83HQ1/Tj+DBhSNl+pcbmsEYDjJUdfMIGcuXC4tKFejwMAS9zkgUtC0unKnAI4iKSSeLnc+FVeSWIkQ07wtr9+AQXEJE8ASgeKPiXm9VD1w0fja2CiVshLEDvL+2RlvslKldmowV9Xb2uKqYtGv6vSsqs17f525V3DHz/8v2LnrUex4fgvOL51XgGzY8DTu3P0p/fD/A9Y1q0d604Bi1KpGBwF/rGOHWjBw/1bF2h7eHqma2VjM3nCbiWJ2Rq1G6bFvX4y4t00EEOwN5NUmZpI3BjhUqA07d0fF7e3U9VbVcjc05dQt2w6wA95ZHz4Wotl+vVax3LwubrD72Ijv4q12Qv3aFf1aT5r1qUq3PP1OXPvO/4itT+/D+aTzCpBt276Pe3/xS9jx9E+ct0qDQ2pW9M4728O7bb2kYFekb5Q3v17lEqNZc6eIqVpB4vB14K81w/gG8XQ9H8XqF0w8rI5Uu608W53bKdV7mK2V5ZlU1+2ZqvU3N6t7vP1K4bU9vErFv9pYk60j9Yw+h8F92+7F3W9/E268953Y99re803nFSCzc9vw5Q/9I/zzO57VwJjqx5eZp972CG0Nn+hN47aIdZca22N5oFk5j69sU+G9Vl6q+P7xec6v7Z4KxYg00d/C5Ocl+SwhkY5y2sW2d32p7P7x5b19G+uS9G4sFv/1e2r8j4N71w/dtn5U/u3Xv36d1bB/1/BqfHn7N/CN35nD+9/7v2P38xs/r/35y0DnHSAzu5/E73/pP2N45m+1xLA1o14N1a4vB81v55P4P8JkFCR3tZ6pY7r1XFwEUPj0dkm7Vl22r6j7jL9Z2nZl7kL35d799VbV/H564FpBqFh2o1e93tW9/lU2+bV2Vrf/7D52y841G7r+h0kXBCDbt/8Av3Xnv8bmzX+p2RhG3bI1+x083gQx3wLqF9f0gM1WjVq54sU+3b6xUeWqfN0V1V8qKuv96rP/3vL96j4g5g06q1vJb231/a020U+x/n8d1f2r1734/2/9j6s/5n5e6YIA5M5bfxv/5b736kH+f9ZshD5Nwh0aD4iW7f7Q6/t7Fm6Qd1k3E2wUvU840+1fB91sWbX04pL7+67U3vU3r7n/830vGkBWlE4+9gTuuPM/4cQjv2bM8rDqf67A2R3+U53O/nC7p2Y/KkWZ2hW3jXm4856f6bV233mQ1e8z7f7/j+r/0q5L+v31q14UgGzb9mPceutHMDu3E0M93b9YVz41xL9w7u0Qb7L7Sfn9JvY9m43xN+L/L/b9Vl716j+4X8r31/61LwhAdux4HPf94gex9fhTGpzc81V5m8R/m8PZII4qV6/c7j9XF95/j5l1/c//V5X/v1z/7zN6UQCyY8eTuPvuT+Jnr/4W5vW0yVml3uB23t4A4xJ21vW3f/1fWf31/97mRQHIvn2fwZ23/g62nf4BZs3g71/NqFv831vX7f5b4f6vrf76176uK/0a2n79F/H9u/4PXD1/D2Z0E8i5dhnkvdnsv+K1u9n/vVj/f/H7X6t2/8H9YqHLLkFu3PFT3HbzBzB39u81/1x0/v+9/g/u8qI3ATIBnZ55CV84/AG8ev0ncUX1V5gNn8aL8k39/7r+D+4XjS4bgKzUj+GB6/8Y247+jH53d9eA7508u/m/tv7/X/8H97nRmgCyuLCCk8Nn8eL238PVn7kXV7z8H875N6k3+b8b/wf3S0brApDNm/fhp9ffj6P7/gRX7vw1rW61vxv9JvUm/zfj/uDuG60LQHbsegZf/q8/i4f/r/+Jqw78r/884H+f3eRN6m/w839wb3T6P8Vn1+Jom8b1AAAAAElFTkSuQmCC" x="0" y="0" width="1" height="1" result="map" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
            <feDisplacementMap id="disp" in="blur" in2="map" scale="0.3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      {/* 
        This div is the scroll area. It needs to be tall enough to allow scrolling.
        We'll use 400vh to give a smooth, long scroll experience.
      */}
      <div ref={targetRef} className="h-[400vh] relative">
        <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden py-20">
          
          <div className="container px-4 sm:px-6 w-full shrink-0">
            <SectionHeading number="02" title="Skills" />
          </div>

          <motion.div ref={scrollRef} style={{ x }} className="flex gap-6 md:gap-10 px-4 sm:px-6 md:px-12 items-stretch mt-12 md:mt-24 w-max">
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card-container-electric card-electric-skills shrink-0 w-[290px] sm:w-[320px] md:w-[380px] h-[410px] md:h-[450px] text-left outline-none cursor-pointer group transition-all duration-500 hover:-translate-y-2 flex flex-col"
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
                onFocus={() => setActiveSkill(skill)}
                onBlur={() => setActiveSkill(null)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveSkill(skill);
                  }
                }}
              >
                <div className="inner-container-electric">
                  <div className="border-outer-electric">
                    <div className="main-card-electric liquid-glass-container p-6 md:p-8 flex flex-col justify-between h-full">
                      {/* Flowing animated liquid glass reflection */}
                      <div className="liquid-glass-flow" />

                      {/* Content layer positioned on top: completely crisp and unwarped */}
                      <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex flex-col gap-3 min-h-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-display tracking-widest text-[#00F0FF] uppercase font-semibold">
                              {skill.category}
                            </span>
                            <span className="text-xs font-semibold text-bg px-2.5 py-0.5 bg-text-primary rounded-full shrink-0">
                              {skill.proficiency}
                            </span>
                          </div>
                          <h4 className="text-2xl md:text-3xl font-display font-bold text-text-primary group-hover:text-[#00F0FF] transition-colors duration-300 leading-tight">
                            {skill.name}
                          </h4>
                          <p className="text-text-secondary leading-relaxed text-sm md:text-base line-clamp-4">
                            {skill.description}
                          </p>
                        </div>

                        {/* Liquid Glass Pill Button */}
                        <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/5">
                          <span className="text-xs text-text-muted font-mono tracking-wider">
                            {String(index + 1).padStart(2, '0')} // SKILL
                          </span>
                          <button
                            type="button"
                            className="glassBtn"
                            aria-label={`View ${skill.name} details`}
                          >
                            <LucideIcons.ArrowUpRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="glow-layer-1-electric" />
                <div className="glow-layer-2-electric" />
                <div className="background-glow-electric" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Popover (Desktop) for Application POV */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed pointer-events-none z-[100] hidden md:flex flex-col gap-2 w-72 bg-bg-elevated border border-border p-5 rounded-xl shadow-2xl"
            style={{
              left: Math.min(mousePos.x + 20, typeof window !== 'undefined' ? window.innerWidth - 300 : 0),
              top: Math.min(mousePos.y + 20, typeof window !== 'undefined' ? window.innerHeight - 150 : 0),
            }}
          >
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="text-[#00F0FF] font-medium block mb-2 text-sm">My POV / Application</span> 
              {activeSkill.application}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Popover Overlay */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[100] md:hidden bg-bg-elevated border-t border-border p-6 rounded-t-3xl shadow-2xl"
          >
            <button 
              onClick={() => setActiveSkill(null)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary bg-surface rounded-full"
            >
              <LucideIcons.X size={16} />
            </button>
            <div className="mt-4">
              <span className="text-[#00F0FF] font-medium block mb-2 text-sm uppercase tracking-widest">My POV / Application</span> 
              <p className="text-sm text-text-secondary leading-relaxed bg-surface/50 p-4 rounded-xl">
                {activeSkill.application}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
