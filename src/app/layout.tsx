import type { Metadata } from 'next';
import { DM_Mono, Instrument_Serif, Space_Grotesk } from 'next/font/google';
import './globals.css';

const display = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-display', display: 'swap' });
const sans = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Harshu / Spatial Portfolio',
  description: 'A spatial portfolio for Harshu, a developer building thoughtful digital tools.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
