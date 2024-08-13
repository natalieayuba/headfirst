import type { Config } from 'tailwindcss';
import { colors } from './config';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      fontSize: {
        'heading-lg': 'clamp(52px, 14vw, 96px)',
      },
      fontFamily: {
        'heading-lg': ['var(--font-londrina_solid)'],
      },
    },
  },
  plugins: [],
};
export default config;
