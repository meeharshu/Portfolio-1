import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f2efe8',
        paper: '#171717',
        moss: '#68645e',
        signal: '#d45d3f',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        panel: '8px 8px 0 rgba(23, 23, 23, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
