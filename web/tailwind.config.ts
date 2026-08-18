import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8eccff',
          400: '#59b0ff',
          500: '#338bff',
          600: '#1a6bf5',
          700: '#1355e1',
          800: '#1645b6',
          900: '#183d8f',
          950: '#142757',
        },
        dark: {
          50: '#f6f6f7',
          100: '#e2e2e5',
          200: '#c4c5cb',
          300: '#9fa0a9',
          400: '#7b7c87',
          500: '#61626e',
          600: '#4d4d57',
          700: '#3f3f47',
          800: '#27272f',
          900: '#1a1a20',
          950: '#101014',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
