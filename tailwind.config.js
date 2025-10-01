// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightgreen: "#d0f0c0",
        beige: {
          100: "#f5f5dc",
        },
      },
      boxShadow: {
        "pulse-green": "0 0 10px 5px rgba(34,197,94,0.3)",
        "pulse-green-strong": "0 0 15px 8px rgba(34,197,94,0.5)",
      },
      animation: {
        "pulse-slow": "pulseSlow 3s ease-in-out infinite",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(34,197,94,0.7)" },
          "50%": { transform: "scale(1.05)", boxShadow: "0 0 10px 5px rgba(34,197,94,0.3)" },
        },
      },
    },
  },
  plugins: [],
};
