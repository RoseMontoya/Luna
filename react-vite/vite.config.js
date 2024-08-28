// impo
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: process.env.NODE_ENV === "production",
    }),
    // visualizer({
    //   filename: './dist/stats.html',
    //   open: true,
    // }),
  ],
  build: {
    rollupOptions: {
      // plugins: [
      //   visualizer({
      //     filename: './dist/stats.html',
      //     open: true,
      //   }),
      // ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    open: true,
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
});
