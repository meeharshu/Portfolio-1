'use client';

import { useEffect, useState } from 'react';
import { DetailPanel } from '@/components/ui/DetailPanel';
import { CursorFollower } from '@/components/ui/CursorFollower';
import { SiteNav } from '@/components/navigation/SiteNav';
import { MainScene } from '@/scenes/MainScene';
import { experience, milestones, projects, skills, type Experience, type Milestone, type Project, type SpatialSection } from '@/data/portfolio';

export function ExperienceShell() {
  const [activeSection, setActiveSection] = useState<SpatialSection>('home');
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>();
  const [selectedExperience, setSelectedExperience] = useState<Experience>();
  const [isLight, setIsLight] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIsIntroVisible(false), reducedMotion ? 50 : 850);
    return () => window.clearTimeout(introTimer);
  }, [reducedMotion]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.dataset.section as SpatialSection);
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: '-12% 0px -25% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = (section: SpatialSection) => {
    document.getElementById(section)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    setActiveSection(section);
  };

  const selectSection = (section: SpatialSection) => {
    navigate(section);
    if (section === 'projects') setSelectedProject(projects[0]);
  };

  const selectProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedMilestone(undefined);
    setActiveSection('projects');
  };

  return (
    <div className={`noise relative overflow-x-clip ${isLight ? 'bg-[#dfe5dc] text-ink' : 'bg-ink text-paper'}`}>
      <div className={`pointer-events-none fixed inset-0 z-[60] grid place-items-center bg-ink transition-opacity duration-700 ${isIntroVisible ? 'opacity-100' : 'opacity-0'}`} aria-hidden={!isIntroVisible}>
        <div className={`text-center transition-transform duration-700 ${isIntroVisible ? 'translate-y-0' : '-translate-y-4'}`}><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">H / 2026</p><p className="mt-4 font-display text-5xl text-paper">Enter the field.</p></div>
      </div>
      <CursorFollower />
      <SiteNav activeSection={activeSection} onNavigate={navigate} isLight={isLight} onThemeToggle={() => setIsLight((value) => !value)} />
      <MainScene activeSection={activeSection} onSelect={selectSection} reducedMotion={reducedMotion} />
      <div className="grid-fade pointer-events-none fixed inset-0 z-[1]" />
      <main className="relative z-10">
        <section id="home" data-section="home" className="flex min-h-screen items-end px-6 pb-14 pt-40 sm:px-10 lg:px-16 lg:pb-20">
          <div className="mx-auto flex w-full max-w-[1500px] items-end justify-between gap-10">
            <div className="max-w-2xl">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-signal">Harshu / developer & systems thinker</p>
              <h1 className="font-display text-[clamp(4rem,13vw,11rem)] leading-[0.78] tracking-[-0.045em] text-paper">Make the<br /><em className="text-signal">path</em> visible.</h1>
              <p className="mt-8 max-w-md text-sm leading-6 text-paper/55 sm:text-base">A spatial portfolio for thoughtful digital tools, curious experiments, and the invisible systems that help people move forward.</p>
              <button type="button" data-cursor="GO" onClick={() => navigate('explore')} className="pointer-events-auto mt-8 inline-flex items-center gap-4 rounded-full border border-signal/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-signal transition-all hover:bg-signal hover:text-ink">Enter the field <span className="text-base leading-none">↓</span></button>
            </div>
            <div className="hidden max-w-[190px] pb-2 text-right lg:block"><p className="font-mono text-[10px] uppercase leading-5 tracking-[0.18em] text-paper/35">Drag to orbit<br />Select an object<br />Scroll to travel</p></div>
          </div>
        </section>

        <section id="explore" data-section="explore" className="flex min-h-[85vh] items-end px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto grid w-full max-w-[1500px] gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">01 / orient</p><h2 className="mt-4 max-w-xl font-display text-6xl leading-[0.9] text-paper sm:text-8xl">A small world<br /><em className="text-paper/40">with room to roam.</em></h2></div><div className="border-l border-white/15 pl-6 text-sm leading-6 text-paper/55">The objects in the field are shortcuts. Hover to wake them up, click to focus the camera, or use the navigation above whenever you prefer a straight line.</div></div>
        </section>

        <section id="projects" data-section="projects" className="min-h-screen px-6 py-28 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1500px]"><div className="flex items-end justify-between border-b border-white/15 pb-6"><div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">02 / selected work</p><h2 className="mt-3 font-display text-6xl leading-none text-paper sm:text-8xl">Built with intent.</h2></div><span className="font-mono text-[10px] text-paper/35">{projects.length.toString().padStart(2, '0')} studies</span></div><div className="mt-8 grid gap-4 md:grid-cols-[1.35fr_0.65fr] md:grid-rows-2">{projects.map((project, index) => <button key={project.id} type="button" data-cursor="VIEW" onClick={() => selectProject(project)} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#151916]/90 p-6 text-left transition-colors hover:bg-[#212a22] sm:p-8 ${index === 0 ? 'min-h-[480px] md:row-span-2' : 'min-h-[230px]'}`}><div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-paper/35"><span>{project.index} / {project.type}</span><span>{project.year}</span></div><span className={`block rounded-full transition-transform duration-500 group-hover:scale-[2] ${index === 0 ? 'mt-36 h-5 w-5' : 'mt-14 h-3 w-3'}`} style={{ backgroundColor: project.accent, boxShadow: `0 0 28px ${project.accent}` }} /><h3 className={`${index === 0 ? 'mt-7 text-6xl sm:text-8xl' : 'mt-5 text-4xl'} font-display leading-none text-paper`}>{project.name}</h3><p className="mt-4 max-w-md text-sm leading-6 text-paper/45">{project.description}</p><span className="absolute bottom-7 right-7 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">Explore ↗</span></button>)}</div></div></section>

        <section id="experience" data-section="experience" className="min-h-screen px-6 py-28 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1100px]"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">03 / experience</p><div className="mt-5 flex flex-col justify-between gap-5 border-b border-white/15 pb-8 md:flex-row md:items-end"><h2 className="font-display text-7xl leading-[0.82] text-paper sm:text-9xl">Where I&apos;ve<br /><em className="text-paper/40">been building.</em></h2><p className="max-w-xs text-sm leading-6 text-paper/45">A student journey shaped by curiosity, shipped projects, and a growing taste for clear systems.</p></div><div className="divide-y divide-white/10">{experience.map((item) => <button key={item.role} type="button" onClick={() => { setSelectedExperience(item); setSelectedProject(undefined); setSelectedMilestone(undefined); }} className="group grid w-full gap-6 py-9 text-left md:grid-cols-[1fr_1.3fr_0.35fr] md:items-start"><div><h3 className="font-display text-3xl text-paper transition-colors group-hover:text-signal">{item.role}</h3><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">{item.company}</p></div><ul className="space-y-2 text-sm leading-6 text-paper/55">{item.points.map((point) => <li key={point} className="before:mr-2 before:text-signal before:content-['+']">{point}</li>)}</ul><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-paper/35 md:text-right">{item.period}</span></button>)}</div></div></section>

        <section id="timeline" data-section="timeline" className="min-h-[80vh] px-6 py-28 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1500px]"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">04 / progression</p><h2 className="mt-4 max-w-2xl font-display text-6xl leading-[0.9] text-paper sm:text-8xl">The line is<br /><em className="text-paper/40">still moving.</em></h2><div className="mt-20 grid gap-0 border-t border-white/15 md:grid-cols-4">{milestones.map((milestone) => <button key={milestone.year} type="button" onClick={() => { setSelectedMilestone(milestone); setSelectedProject(undefined); setSelectedExperience(undefined); }} className="group border-b border-white/15 py-6 text-left md:border-b-0 md:border-r md:px-6 md:first:pl-0"><span className="font-mono text-xs text-signal">{milestone.year}</span><span className="my-8 block h-2 w-2 rounded-full bg-paper transition-colors group-hover:bg-signal" /><h3 className="font-display text-3xl text-paper">{milestone.title}</h3><p className="mt-3 text-sm leading-6 text-paper/45">{milestone.detail}</p></button>)}</div></div></section>

        <section id="skills" data-section="skills" className="min-h-[85vh] px-6 py-28 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1500px]"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">04 / skill constellation</p><div className="mt-5 grid gap-10 lg:grid-cols-[0.6fr_1fr] lg:items-end"><h2 className="font-display text-7xl leading-[0.82] text-paper sm:text-9xl">The tools<br /><em className="text-paper/40">behind the work.</em></h2><div className="relative min-h-[390px] overflow-hidden rounded-2xl border border-white/10 bg-[#151916]/70"><div className="absolute inset-x-[8%] top-1/2 border-t border-dashed border-white/15" />{skills.map((skill) => <button key={skill.name} type="button" className="group absolute -translate-x-1/2 -translate-y-1/2 text-left" style={{ left: skill.x, top: skill.y }}><span className="block h-3 w-3 rounded-full transition-transform duration-300 group-hover:scale-[2]" style={{ backgroundColor: skill.accent, boxShadow: `0 0 18px ${skill.accent}` }} /><span className="absolute left-5 top-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-paper/65 transition-colors group-hover:text-paper">{skill.name}</span><span className="pointer-events-none absolute left-5 top-5 w-36 rounded bg-ink/90 p-2 text-[9px] leading-4 text-paper/45 opacity-0 transition-opacity group-hover:opacity-100">{skill.category}<br />{skill.related.join(' · ')}</span></button>)}</div></div></div></section>

        <section id="about" data-section="about" className="min-h-[85vh] px-6 py-28 sm:px-10 lg:px-16"><div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.8fr_1fr]"><div><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">05 / context</p><h2 className="mt-4 font-display text-7xl leading-[0.82] text-paper sm:text-9xl">Less noise.<br /><em className="text-paper/40">More signal.</em></h2></div><div className="max-w-xl self-end text-lg leading-8 text-paper/55"><p>I&apos;m Harshu, a computer science student who likes working at the edge between useful systems and expressive interfaces.</p><p className="mt-6">I care about the moment a complex thing becomes understandable. That usually means asking better questions, making fewer assumptions, and giving the interaction enough room to breathe.</p></div></div></section>

        <section id="lab" data-section="lab" className="min-h-[70vh] px-6 py-28 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1500px]"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">05 / lab notes</p><div className="mt-5 grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end"><h2 className="font-display text-7xl leading-[0.82] text-paper sm:text-9xl">Curiosity<br /><em className="text-paper/40">in public.</em></h2><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/10 bg-white/[0.03] p-5"><span className="font-mono text-[10px] text-signal">/ 001</span><h3 className="mt-10 font-display text-2xl text-paper">Prompt atlas</h3><p className="mt-2 text-xs leading-5 text-paper/45">Small experiments in turning language into a navigable interface.</p></div><div className="rounded-xl border border-white/10 bg-white/[0.03] p-5"><span className="font-mono text-[10px] text-signal">/ 002</span><h3 className="mt-10 font-display text-2xl text-paper">Motion studies</h3><p className="mt-2 text-xs leading-5 text-paper/45">Testing where an interface can breathe without losing its way.</p></div></div></div></div></section>

        <section id="contact" data-section="contact" className="min-h-screen px-6 py-28 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1500px] border-t border-white/15 pt-10"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">07 / open channel</p><h2 className="mt-8 max-w-5xl font-display text-7xl leading-[0.8] text-paper sm:text-9xl">Let&apos;s work<br /><em className="text-signal">together.</em></h2><div className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-start"><div className="text-sm leading-6 text-paper/50"><p>Have a product, system, or strange idea that needs a shape?</p><p className="mt-4">Contact me directly at <a className="text-signal hover:text-paper" href="mailto:meeharshu8686@gmail.com">meeharshu8686@gmail.com</a></p></div><form className="grid gap-5" onSubmit={(event) => event.preventDefault()}><div className="grid gap-5 sm:grid-cols-2"><label className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">Full name<input required name="name" placeholder="Your name" className="mt-2 w-full border-b border-white/20 bg-transparent py-3 font-sans text-sm text-paper outline-none placeholder:text-paper/25 focus:border-signal" /></label><label className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">Email address<input required type="email" name="email" placeholder="you@example.com" className="mt-2 w-full border-b border-white/20 bg-transparent py-3 font-sans text-sm text-paper outline-none placeholder:text-paper/25 focus:border-signal" /></label></div><label className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">Your message<textarea required name="message" rows={4} placeholder="Tell me about your project" className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-3 font-sans text-sm text-paper outline-none placeholder:text-paper/25 focus:border-signal" /></label><button type="submit" data-cursor="SEND" className="justify-self-start rounded-full bg-paper px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-signal">Send message ↗</button></form></div></div></section>
      </main>
      <DetailPanel project={selectedProject} milestone={selectedMilestone} onClose={() => { setSelectedProject(undefined); setSelectedMilestone(undefined); setSelectedExperience(undefined); }} />
      {selectedExperience && <aside className="pointer-events-auto fixed inset-x-4 bottom-4 z-30 rounded-2xl border border-white/15 bg-[#171b18]/95 p-6 shadow-panel backdrop-blur-2xl sm:inset-x-auto sm:right-8 sm:w-[390px]" aria-label="Experience detail"><div className="flex justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Selected experience</p><h2 className="mt-2 font-display text-3xl text-paper">{selectedExperience.role}</h2><p className="mt-1 text-xs text-paper/45">{selectedExperience.company} / {selectedExperience.period}</p></div><button type="button" aria-label="Close experience detail" onClick={() => setSelectedExperience(undefined)} className="text-paper/50 hover:text-signal">×</button></div><div className="mt-5 flex flex-wrap gap-2">{selectedExperience.stack.map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/55">{item}</span>)}</div></aside>}
      <footer className="relative z-10 border-t border-white/10 px-6 py-6 sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[1500px] justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-paper/30"><span>Harshu / 2026</span><span>Made to be explored</span></div></footer>
    </div>
  );
}
