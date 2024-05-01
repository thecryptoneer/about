import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('/assets/mountain_1.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        folder: "url('/assets/images/folder_main.png')",
        folderCode: "url('/assets/folder-code-icon.png')",
        folderCode2: "url('/assets/folder-code2-icon.png')",
        folderGitHub: "url('/assets/folder-github-icon.png')",
        folderImage: "url('/assets/folder-image-icon.png')",
        textIcon: "url('/assets/text-icon.png')",
      },
      fontFamily: {
        apple: ['"San Francisco"', "ui-sans-serif", "system-ui"],
      },
      colors: {
        foreground: "rgb(var(--foreground-rgb))",
        backgroundStart: "rgb(var(--background-start-rgb))",
        backgroundEnd: "rgb(var(--background-end-rgb))",
      },
      height: {
        screenWithoutHeader: "calc(100vh - 26px)",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(-30px)" },
        },
        "spin-blade": {
          "0%, 100%": { backgroundColor: "#69717d" },
          "50%": { backgroundColor: "transparent" },
        },
      },
      animation: {
        bounce: "bounce 1.3s ease",
        "spin-blade": "spin-blade 1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
