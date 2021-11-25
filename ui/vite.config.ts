import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: [
      { find: "/@", replacement: path.resolve(__dirname, "src") },
      { find: "/#", replacement: path.resolve(__dirname, "src/components") }
    ]
  },
  build: {
    outDir: path.resolve(__dirname, "../dist/public")
  }
});
