import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-kr)', 'var(--font-roboto)', 'sans-serif'],
      },
      colors: {
        'dark-purple': '#311B92',
        'header-footer-purple': '#4A148C',
        'lighter-purple': '#7B1FA2',
        'accent-orange': '#FB8C00',
      },
      backgroundImage: theme => ({
        'header-footer-gradient': 'linear-gradient(135deg, #4A148C, #7B1FA2)',
        'content-gradient': 'linear-gradient(135deg, #311B92, #4A148C)',
      }),
    },
  },
  plugins: [],
};
export default config;
