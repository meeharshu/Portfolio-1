export type SpatialSection = 'home' | 'explore' | 'projects' | 'experience' | 'timeline' | 'skills' | 'about' | 'lab' | 'contact';

export interface Project {
  id: string;
  index: string;
  name: string;
  type: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  year: string;
  accent: string;
  href: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Milestone {
  year: string;
  title: string;
  detail: string;
  project?: string;
}

export interface Skill {
  name: string;
  category: string;
  related: string[];
  x: string;
  y: string;
  accent: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
  stack: string[];
}

export const projects: Project[] = [
  {
    id: 'pathfy',
    index: '01',
    name: 'Pathfy',
    type: 'Guided productivity',
    description: 'A calm operating system for turning ambiguous goals into visible, repeatable progress.',
    problem: 'Most productivity tools reward collecting tasks rather than finishing meaningful work.',
    solution: 'Pathfy combines small daily rituals with an adaptive plan that keeps the next action obvious.',
    stack: ['Next.js', 'TypeScript', 'Supabase'],
    year: '2026',
    accent: '#d8ff73',
    href: '#projects',
    imageUrl: 'https://picsum.photos/seed/pathfy/1000/800',
    liveUrl: 'https://www.pathfy.online/',
  },
  {
    id: 'caresense',
    index: '02',
    name: 'CareSense AI',
    type: 'Clinical intelligence',
    description: 'A clear, human layer over complex health signals for faster, more confident decisions.',
    problem: 'Important context gets buried when data arrives faster than people can interpret it.',
    solution: 'CareSense makes patterns legible with explainable summaries and a focused decision surface.',
    stack: ['React', 'Python', 'Machine learning'],
    year: '2025',
    accent: '#ff8b67',
    href: '#projects',
    imageUrl: 'https://picsum.photos/seed/caresenseai/1000/800',
    liveUrl: 'https://care-sense-ai-gamma.vercel.app/',
  },
  {
    id: 'blusdesk',
    index: '03',
    name: 'Blusdesk',
    type: 'Operations workspace',
    description: 'A quiet control room for teams that need to see what matters without losing the human signal.',
    problem: 'Operational dashboards become noisy when every metric competes for attention.',
    solution: 'Blusdesk gives each signal a place, a priority, and a clear route to action.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    year: '2024',
    accent: '#8ac6ff',
    href: '#projects',
    imageUrl: 'https://image2url.com/images/1764685453042-f20000d4-ea19-4505-8875-b347712f57f2.png',
    liveUrl: 'https://blusdesk.vercel.app/',
    repoUrl: 'https://github.com/meeharshu8685-dot/blusdesk',
  },
  {
    id: 'mediguardia',
    index: '04',
    name: 'MediGuardia',
    type: 'Medical assistant',
    description: 'An AI-powered symptom checker and profile space designed to make health guidance easier to approach.',
    problem: 'People often need a calm first layer of context before they can make a confident healthcare decision.',
    solution: 'MediGuardia turns a complicated first question into a structured, explainable conversation.',
    stack: ['Next.js', 'Gemini AI', 'Vercel'],
    year: '2024',
    accent: '#d9a7ff',
    href: '#projects',
    imageUrl: 'https://picsum.photos/seed/mediguardia/1000/800',
    liveUrl: 'https://mediguardia.vercel.app/#',
  },
  {
    id: 'notesnest',
    index: '05',
    name: 'NotesNest',
    type: 'Learning hub',
    description: 'A focused home for college notes and resources, with direct links into the tools students already use.',
    problem: 'Useful learning material gets scattered across drives, chats, and half-remembered links.',
    solution: 'NotesNest gives resources a visual structure and a low-friction route back to the source.',
    stack: ['React', 'Google Drive', 'Frontend'],
    year: '2024',
    accent: '#f6d06f',
    href: '#projects',
    imageUrl: 'https://image2url.com/images/1764684752802-3d042f62-84c1-4c21-881e-cd040f22d7b2.png',
    liveUrl: 'https://notes-nest-weld.vercel.app/',
    repoUrl: 'https://github.com/meeharshu8685-dot/notes-nest',
  },
  {
    id: 'innerdecode',
    index: '06',
    name: 'Innerdecode',
    type: 'Choice-based tool',
    description: 'A simple decision system that maps a user problem toward a useful, immediate next step.',
    problem: 'When a problem feels vague, even a good solution can be hard to find.',
    solution: 'Innerdecode uses a short sequence of choices to turn uncertainty into an actionable direction.',
    stack: ['React', 'Interaction design', 'Frontend'],
    year: '2023',
    accent: '#9bd5a5',
    href: '#projects',
    imageUrl: 'https://image2url.com/images/1764684385535-69a3487a-f134-4d1a-a6d5-f9e6ecd05fe8.png',
    liveUrl: 'https://innerdecode.vercel.app/',
  },
];

export const milestones: Milestone[] = [
  { year: '2023', title: 'The first spark', detail: 'Started building small interfaces and learned that code could be a medium for thought.' },
  { year: '2024', title: 'Systems over screens', detail: 'Moved from isolated pages to tools that help people make sense of work.', project: 'Blusdesk' },
  { year: '2025', title: 'Human-centered AI', detail: 'Explored how machine intelligence can clarify decisions without replacing judgment.', project: 'CareSense AI' },
  { year: '2026', title: 'Make the path visible', detail: 'Building products that turn curiosity into momentum.', project: 'Pathfy' },
];

export const skills: Skill[] = [
  { name: 'TypeScript', category: 'Systems', related: ['Next.js', 'React'], x: '8%', y: '50%', accent: '#8ac6ff' },
  { name: 'React', category: 'Interfaces', related: ['TypeScript', 'R3F'], x: '28%', y: '24%', accent: '#d8ff73' },
  { name: 'Next.js', category: 'Products', related: ['React', 'Supabase'], x: '52%', y: '43%', accent: '#ff8b67' },
  { name: 'Python', category: 'Intelligence', related: ['ML', 'Data'], x: '72%', y: '18%', accent: '#d9a7ff' },
  { name: 'Three.js', category: 'Spatial', related: ['R3F', 'GSAP'], x: '78%', y: '68%', accent: '#8ac6ff' },
  { name: 'AI / ML', category: 'Exploration', related: ['Python', 'Data'], x: '43%', y: '78%', accent: '#d8ff73' },
];

export const experience: Experience[] = [
  {
    role: 'Computer Science Student & Independent Builder',
    company: 'BITS Pilani',
    period: '2024 - Present',
    points: [
      'Building practical products across AI, machine learning, data science, and modern frontend systems.',
      'Turning coursework and curiosity into shipped experiments, interfaces, and useful tools.',
      'Learning C and Python while deepening my understanding of how software works beneath the interface.',
    ],
    stack: ['Python', 'C', 'React', 'AI / ML', 'GitHub'],
  },
  {
    role: 'Frontend Developer & Project Builder',
    company: 'Independent projects',
    period: '2023 - Present',
    points: [
      'Designed and shipped portfolio, education, health, productivity, and customer-support experiences.',
      'Worked across the full product loop: idea, interface, implementation, iteration, and deployment.',
      'Explored how calm visual systems can make complex information easier to understand.',
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind', 'Vercel'],
  },
];

export const navItems: { label: string; section: SpatialSection }[] = [
  { label: 'Home', section: 'home' },
  { label: 'Tech Stack', section: 'skills' },
  { label: 'Experience', section: 'experience' },
  { label: 'Projects', section: 'projects' },
  { label: 'Contact', section: 'contact' },
];
