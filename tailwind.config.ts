import type { Config } from 'tailwindcss';
import { animationDurations, colors } from './config';

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
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        maskIn: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(.3) translateY(100%) rotate(-20deg)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.02) translateY(0px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0) rotate(0)',
          },
        },
      },
      animation: {
        fadeIn: `fadeIn ${animationDurations.banner}ms ease-in-out`,
        fadeOut: `fadeIn ${animationDurations.banner}ms ease-in-out reverse backwards`,
        maskIn: `maskIn ${animationDurations.default}ms ease-out backwards`,
        heartbeat: `heartbeat 200ms ease-in`,
        bounceIn: `bounceIn 900ms ease forwards`,
      },
      screens: {
        xs: '420px', // => @media (min-width: 420px) { ... }
      },
    },
  },
  plugins: [],
  screens: {
    touch: { raw: 'hover: none' },
    hover: { raw: 'hover: hover' },
  },
};
export default config;
