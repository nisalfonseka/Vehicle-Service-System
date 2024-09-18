/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes:[
      { mytheme: {
          
      "primary": "#dc2626",
                
      "secondary": "#dc2626",
                
      "accent": "#dc2626",
                
      "neutral": "#ff00ff",
                
      "base-100": "#ffffff",
                
      "info": "#2563eb",
                
      "success": "#22c55e",
                
      "warning": "#f87171",
                
      "error": "#ff0000",
                },},],
  }
}