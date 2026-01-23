import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  // Only scan index.html and src files for dependencies
  // This prevents Vite from scanning HTML files in the pages/ directory
  optimizeDeps: {
    entries: [resolve(__dirname, "index.html"), "src/**/*.{js,jsx,ts,tsx}"],
  },
  // Exclude pages directory from build
  build: {
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
  // Configure server to ignore pages directory
  server: {
    fs: {
      // Deny access to pages directory
      deny: [resolve(__dirname, "pages")],
    },
  },
  publicDir: "public",
});
