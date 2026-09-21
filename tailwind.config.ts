import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111312',
        paper: '#e9ece5',
        moss: '#66745d',
        signal: '#d8ff73',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        panel: '0 24px 80px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
};

export default config;
