// ── Project Types ──────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
  year: string;
  color?: string;
}

// ── Skill Types ───────────────────────────────────────────────────────
export interface SkillDetail {
  name: string;
  category: string;
  description: string;
  application: string;
  proficiency: 'Learning' | 'Confident' | 'Familiar';
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: SkillDetail[];
}

// ── Journey Types ─────────────────────────────────────────────────────
export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  description: string;
  type: 'milestone' | 'project' | 'learning' | 'goal';
  tags?: string[];
}

// ── Navigation Types ──────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}
