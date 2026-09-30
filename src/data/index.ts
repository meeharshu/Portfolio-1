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
    title: 'Frontend Development',
    icon: 'code',
    skills: [
      {
        name: 'React',
        category: 'Frontend Framework',
        description: 'A JavaScript library for building component-based user interfaces.',
        application: 'Reusable components, state-driven UI and interactive web applications.',
        proficiency: 'Confident'
      },
      {
        name: 'TypeScript',
        category: 'Programming Language',
        description: 'A typed superset of JavaScript that helps make applications more maintainable.',
        application: 'Type-safe components, interfaces and predictable application architecture.',
        proficiency: 'Confident'
      },
      {
        name: 'JavaScript',
        category: 'Programming Language',
        description: 'A programming language used to create interactive and dynamic web experiences.',
        application: 'DOM manipulation, asynchronous operations, application logic and frontend interactions.',
        proficiency: 'Confident'
      },
      {
        name: 'HTML5',
        category: 'Markup Language',
        description: 'The standard markup language for documents designed to be displayed in a web browser.',
        application: 'Semantic document structure, accessibility and base web content.',
        proficiency: 'Confident'
      },
      {
        name: 'CSS3',
        category: 'Style Sheet Language',
        description: 'The language used for describing the presentation of a document written in HTML.',
        application: 'Layout, typography, responsive breakpoints and foundational visual design.',
        proficiency: 'Confident'
      },
      {
        name: 'Responsive Design',
        category: 'Design Approach',
        description: 'An approach to web design that makes web pages render well on a variety of devices.',
        application: 'Fluid grids, flexible images and media queries for mobile-first development.',
        proficiency: 'Confident'
      }
    ]
  },
  {
    title: 'Styling & UI',
    icon: 'palette',
    skills: [
      {
        name: 'Tailwind CSS',
        category: 'CSS Framework',
        description: 'A utility-first CSS framework packed with classes to build any design, directly in markup.',
        application: 'Rapid UI development, consistent design tokens and maintainable styling.',
        proficiency: 'Confident'
      },
      {
        name: 'CSS Animations',
        category: 'Web Technology',
        description: 'Native CSS capabilities to animate transitions from one CSS style configuration to another.',
        application: 'Lightweight hover states, infinite loops and simple UI feedback.',
        proficiency: 'Confident'
      },
      {
        name: 'UI/UX Principles',
        category: 'Design Discipline',
        description: 'Foundational concepts for creating user-centric, friction-less digital experiences.',
        application: 'User flows, visual hierarchy, spacing systems and cognitive load reduction.',
        proficiency: 'Learning'
      },
      {
        name: 'Design Systems',
        category: 'Architecture',
        description: 'A collection of reusable components guided by clear standards to build digital products.',
        application: 'Component libraries, design tokens and consistent visual languages.',
        proficiency: 'Learning'
      }
    ]
  },
  {
    title: 'Animation & Interaction',
    icon: 'sparkles',
    skills: [
      {
        name: 'GSAP',
        category: 'Animation Library',
        description: 'A JavaScript animation library for creating precise, timeline-based motion.',
        application: 'Complex timelines, staggered reveals, transitions and interactive visual experiences.',
        proficiency: 'Learning'
      },
      {
        name: 'ScrollTrigger',
        category: 'GSAP Plugin',
        description: 'A GSAP plugin that enables scroll-based animations with minimal code.',
        application: 'Pinning sections, scrub animations and viewport-triggered effects.',
        proficiency: 'Learning'
      },
      {
        name: 'Framer Motion',
        category: 'React Animation Library',
        description: 'A production-ready motion library for React that utilizes spring physics.',
        application: 'Layout animations, exit transitions, drag interactions and gesture recognition.',
        proficiency: 'Confident'
      },
      {
        name: 'Lenis',
        category: 'Smooth Scrolling',
        description: 'A lightweight smooth scroll library created by Studio Freight.',
        application: 'Buttery smooth native scrolling and scrolljacking synchronization.',
        proficiency: 'Confident'
      }
    ]
  },
  {
    title: 'Tools & Workflow',
    icon: 'wrench',
    skills: [
      {
        name: 'Git',
        category: 'Version Control',
        description: 'A distributed version control system for tracking changes in source code.',
        application: 'Branching strategies, commit history and codebase management.',
        proficiency: 'Confident'
      },
      {
        name: 'GitHub',
        category: 'Development Platform',
        description: 'A provider of Internet hosting for software development and version control.',
        application: 'Pull requests, code reviews, collaboration and actions.',
        proficiency: 'Confident'
      },
      {
        name: 'Vite',
        category: 'Build Tool',
        description: 'A next-generation frontend tooling that provides a faster and leaner development experience.',
        application: 'Lightning fast HMR, optimized builds and modern module resolution.',
        proficiency: 'Confident'
      },
      {
        name: 'Figma',
        category: 'Design Tool',
        description: 'A collaborative web application for interface design and prototyping.',
        application: 'Wireframing, UI prototyping, asset extraction and developer handoff.',
        proficiency: 'Familiar'
      }
    ]
  }
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
