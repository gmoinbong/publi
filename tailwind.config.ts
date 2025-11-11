import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/*.html',
  ],
  // Ensure all classes are included in production
  safelist: [],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

