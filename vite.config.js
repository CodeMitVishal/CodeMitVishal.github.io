import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is served from the root of https://codemitvishal.github.io/
// (repo CodeMitVishal/CodeMitVishal.github.io). Deploy with: npm run deploy
export default defineConfig({
  plugins: [react()],
  base: "/",
});
