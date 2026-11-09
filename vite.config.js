import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Two addresses, one build setting:
//   https://codemitvishal.github.io/                        (BASE=/  -> npm run deploy:root)
//   https://codemitvishal.github.io/cloudfolio/  (default -> npm run deploy)
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE || "/cloudfolio/",
});
