import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { type Plugin, defineConfig } from "vite";
import sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyIndexTo404(),
    sitemap({
      hostname: "https://libresplit.org",
      dynamicRoutes: ["/converter"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});

// Home spun plugin for copying index.html to 404.html at build time.
// This makes SPA routing work on GitHub pages.
function copyIndexTo404(): Plugin {
  return {
    name: "copy-index-to-404",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(distDir, "index.html");
      const notFoundPath = path.join(distDir, "404.html");

      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
        console.log("Copied index.html → 404.html for SPA fallback");
      } else {
        console.warn("⚠️ index.html not found in dist directory");
      }
    },
  };
}
