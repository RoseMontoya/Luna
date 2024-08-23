import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
// import visualizer from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
    // visualizer({ open: true })
  ],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         vendor: ['react', 'react-dom'], // Split out third-party libraries into a separate chunk
  //       },
  //     },
  //   },
  // },
  server: {
    open: true,
    proxy: {
      "/api": "http://127.0.0.1:8000",
    },
  },
}));
