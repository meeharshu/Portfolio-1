import type { Project, SkillCategory, JourneyItem, NavLink } from '../types';

// ── Navigation ────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

// ── Projects ──────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'project-01',
    title: 'Lumina Dashboard',
    description:
      'A real-time analytics dashboard with interactive data visualizations, dark mode, and responsive design built for monitoring key business metrics.',
    category: 'Web Application',
    technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS', 'Node.js'],
    image: '/placeholder-project.svg',
    liveUrl: '#',
    sourceUrl: '#',
    featured: true,
    year: '2024',
    color: '#C8FF00',
  },
  {
    id: 'project-02',
    title: 'Motioncraft',
    description:
      'An experimental creative coding playground exploring generative art, GLSL shaders, and interactive particle systems in the browser.',
    category: 'Creative Development',
    technologies: ['Three.js', 'GLSL', 'React Three Fiber', 'TypeScript'],
    image: '/placeholder-project.svg',
    liveUrl: '#',
    sourceUrl: '#',
    featured: true,
    year: '2024',
    color: '#C8FF00',
  },
  {
    id: 'project-03',
    title: 'Zenith E-Commerce',
    description:
      'A modern e-commerce storefront with advanced filtering, cart management, and payment integration, focusing on performance and accessibility.',
    category: 'E-Commerce',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL'],
    image: '/placeholder-project.svg',
    liveUrl: '#',
    sourceUrl: '#',
    featured: true,
    year: '2023',
    color: '#C8FF00',
  },
  {
    id: 'project-04',
    title: 'Wavelength',
    description:
      'A music discovery platform with audio visualization, playlist curation, and social sharing features.',
    category: 'Web Application',
    technologies: ['React', 'Web Audio API', 'Canvas', 'Spotify API'],
    image: '/placeholder-project.svg',
    sourceUrl: '#',
    year: '2023',
    color: '#C8FF00',
  },
];

// ── Skills ────────────────────────────────────────────────────────────
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'code',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Vue.js',
      'Svelte',
    ],
  },
  {
    title: 'Styling & Animation',
    icon: 'palette',
    skills: [
      'Tailwind CSS',
      'SCSS / Sass',
      'CSS Animations',
      'GSAP',
      'Motion',
      'Three.js',
      'WebGL / GLSL',
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: 'wrench',
    skills: [
      'Git & GitHub',
      'Vite',
      'Webpack',
      'npm / pnpm',
      'Docker',
      'CI/CD',
      'Vercel',
      'Netlify',
    ],
  },
  {
    title: 'Design & Prototyping',
    icon: 'figma',
    skills: [
      'Figma',
      'Adobe XD',
      'Responsive Design',
      'UI/UX Principles',
      'Design Systems',
      'Accessibility (a11y)',
    ],
  },
];

// ── Journey ───────────────────────────────────────────────────────────
export const JOURNEY_ITEMS: JourneyItem[] = [
  {
    id: 'j-1',
    year: '2025',
    title: 'Exploring Creative Development',
    description:
      "Diving deep into Three.js, WebGL shaders, and creative coding to push the boundaries of what's possible on the web.",
    type: 'learning',
    tags: ['Three.js', 'WebGL', 'GLSL'],
  },
  {
    id: 'j-2',
    year: '2024',
    title: 'Built This Portfolio',
    description:
      'Designed and developed this portfolio as a showcase of frontend engineering, motion design, and creative development skills.',
    type: 'project',
    tags: ['React', 'GSAP', 'Three.js'],
  },
  {
    id: 'j-3',
    year: '2024',
    title: 'Advanced React & TypeScript',
    description:
      'Deepened expertise in React architecture, TypeScript patterns, performance optimization, and modern build tooling.',
    type: 'milestone',
    tags: ['React', 'TypeScript', 'Vite'],
  },
  {
    id: 'j-4',
    year: '2023',
    title: 'First Interactive Web Projects',
    description:
      'Started building interactive web applications, exploring animation libraries, and learning modern frontend frameworks.',
    type: 'project',
    tags: ['JavaScript', 'CSS', 'React'],
  },
  {
    id: 'j-5',
    year: '2023',
    title: 'Began Web Development Journey',
    description:
      'Wrote the first lines of HTML & CSS. Discovered a passion for building things on the web and creating visual experiences.',
    type: 'milestone',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'j-6',
    year: 'Next',
    title: 'Future Goals',
    description:
      'Continue exploring creative development, contribute to open source, and build products that make a meaningful impact.',
    type: 'goal',
    tags: ['Open Source', 'Creative Coding', 'Product'],
  },
];

// ── Social Links ──────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  github: 'https://github.com/meeharshu',
  linkedin: '#', // Placeholder — update with real URL
  email: 'hello@harshu.dev', // Placeholder — update with real email
  twitter: '#',
};

// ── Profile ────────────────────────────────────────────────────────
export const PROFILE_DATA = {
  name: 'Harshu',
  role: 'Frontend Developer',
  location: 'Earth',
  avatarUrl: '/placeholder-project.svg',
};
