import type { Milestone, Project } from '@/data/portfolio';

interface DetailPanelProps {
  project?: Project;
  milestone?: Milestone;
  onClose: () => void;
}

export function DetailPanel({ project, milestone, onClose }: DetailPanelProps) {
  if (!project && !milestone) return null;
  return (
    <aside className="pointer-events-auto fixed inset-x-4 bottom-4 z-30 max-h-[70vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#171b18]/90 p-5 shadow-panel backdrop-blur-2xl sm:inset-x-auto sm:bottom-8 sm:right-8 sm:w-[390px] sm:p-7" aria-label="Selected detail">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal">{project ? `${project.index} / case study` : `${milestone?.year} / milestone`}</p>
          <h2 className="mt-2 font-display text-4xl leading-none text-paper">{project?.name ?? milestone?.title}</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="Close detail panel" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-paper/60 transition-colors hover:border-signal hover:text-signal">×</button>
      </div>
      {project?.imageUrl && <img src={project.imageUrl} alt={`${project.name} project preview`} className="mt-5 h-40 w-full rounded-xl object-cover opacity-80" />}
      <p className="mt-5 text-sm leading-6 text-paper/65">{project?.description ?? milestone?.detail}</p>
      {project && <>
        <div className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-4">
          <div><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/35">Problem</p><p className="mt-2 text-xs leading-5 text-paper/65">{project.problem}</p></div>
          <div><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/35">Approach</p><p className="mt-2 text-xs leading-5 text-paper/65">{project.solution}</p></div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/55">{item}</span>)}</div>
        <div className="mt-6 flex flex-wrap gap-4">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal hover:text-paper">Live project <span aria-hidden="true">↗</span></a>}
          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/55 hover:text-paper">GitHub <span aria-hidden="true">↗</span></a>}
        </div>
      </>}
      {milestone?.project && <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">Related: <span className="text-signal">{milestone.project}</span></p>}
    </aside>
  );
}
