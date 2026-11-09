import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is served from https://codemitvishal.github.io/VishalPortfolio-React/
export default defineConfig({
  plugins: [react()],
  base: "/VishalPortfolio-React/",
});
