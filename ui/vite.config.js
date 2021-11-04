import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      eslintOptions: {
        overrideConfigFile: path.resolve(__dirname, "../.eslintrc.json"),
        cacheLocation: path.resolve(__dirname, "../.eslintcache")
      }
    })
  ],
  resolve: {
    alias: [{ find: "/@", replacement: path.resolve(__dirname, "src") }]
  }
});
