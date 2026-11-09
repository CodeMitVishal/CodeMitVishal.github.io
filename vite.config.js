import { createHash } from "node:crypto";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { assistant } from "./src/data.js";

/* Adds a Content-Security-Policy to the built page (not to the dev server, whose hot reload
   needs inline scripts). Inline scripts are allowed only by their SHA-256 hash, so an injected
   <script> cannot run.
   The policy is switched on by a tiny first script, and not on Google's translated copy of the
   site (*.translate.goog): Google's proxy injects its own changing inline scripts and frames,
   which no strict policy can allow. That copy is Google's page on Google's domain anyway. */
function contentSecurityPolicy() {
  return {
    name: "content-security-policy",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const hashes = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)]
          // browsers hash the script after turning CRLF line ends into LF
          .map(([, code]) => code.split("\r\n").join("\n"))
          .map((code) => `'sha256-${createHash("sha256").update(code).digest("base64")}'`);
        const policy = [
          "default-src 'self'",
          `script-src 'self' ${hashes.join(" ")}`,
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https:",
          `connect-src 'self' ${new URL(assistant.endpoint).origin}`,
          "frame-src 'none'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'none'",
          "upgrade-insecure-requests",
        ].join("; ");
        const enable = `if(!/\\.translate\\.goog$/.test(location.hostname)){var m=document.createElement("meta");` +
          `m.httpEquiv="Content-Security-Policy";m.content=${JSON.stringify(policy)};document.head.prepend(m)}`;
        return html.replace("<head>", `<head>\n    <script>${enable}</script>\n    <meta name="referrer" content="strict-origin-when-cross-origin" />`);
      },
    },
  };
}

// The site is served from the root of https://codemitvishal.github.io/
// (repo CodeMitVishal/CodeMitVishal.github.io). Deploy with: npm run deploy
export default defineConfig({
  plugins: [react(), contentSecurityPolicy()],
  base: "/",
});
