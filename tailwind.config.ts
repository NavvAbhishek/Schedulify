import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink': '#F72585',
        'purple': '#7209B7',
        'dark-blue': '#3A0CA3',
        'blue': '#4361EE',
        'light-blue': '#4CC9F0',
  },
    },
  },
  plugins: [],
};
export default config;
