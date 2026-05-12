//import { defineConfig } from 'vite'
//import vue from '@vitejs/plugin-vue'
//export default defineConfig({
//  plugins: [vue()],
//})

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 3000, // Aumenta el límite de advertencia a 2 MB
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
