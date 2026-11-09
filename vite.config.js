import { createHash } from "node:crypto";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { assistant } from "./src/data.js";

/* Adds a Content-Security-Policy to the built page (not to the dev server, whose hot reload
   needs inline scripts). Inline scripts are allowed only by their SHA-256 hash, so an injected
   <script> cannot run. Google's translate scripts are allowed so the translated copy of the
   site on *.translate.goog keeps working. */
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
        const google = "https://translate.googleapis.com https://translate.google.com https://www.gstatic.com";
        const policy = [
          "default-src 'self'",
          `script-src 'self' ${hashes.join(" ")} ${google}`,
          `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ${google}`,
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https:",
          `connect-src 'self' ${new URL(assistant.endpoint).origin} ${google}`,
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'none'",
          "upgrade-insecure-requests",
        ].join("; ");
        return html.replace("<head>", `<head>\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />\n    <meta name="referrer" content="strict-origin-when-cross-origin" />`);
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
