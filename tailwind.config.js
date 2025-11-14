/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // <-- Diperbaiki: 'srcF' menjadi 'src'
  ],
  theme: {
    extend: {
      // Ini adalah bagian kustom untuk style brutalist
      boxShadow: {
        brutalist: "6px 6px 0px #000",
        "brutalist-hover": "8px 8px 0px #000",
      },
    },
  },
  plugins: [],
};
