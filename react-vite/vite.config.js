import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// // https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
    visualizer({
      filename: './dist/stats.html',
      open: true,
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "./dist/stats.html",
          open: true,
        }),
      ],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'redux-vendor': ['redux', 'react-redux'],
          'date-utils': ['date-fns'],
          'react-icons': ['react-icons/fa6'],
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
}));
// export default defineConfig({
//   plugins: [
//     react(),
//     eslintPlugin({
//       lintOnStart: true,
//       failOnError: process.env.NODE_ENV === "production",
//     }),
//   ],
//   build: {
//     rollupOptions: {
//       plugins: [
//         visualizer({
//           filename: './dist/stats.html',
//           open: true,
//         }),
//       ],
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom', 'react-icons'],
//         },
//       },
//     },
//   },
//   server: {
//     open: true,
//     proxy: {
//       "/api": "http://127.0.0.1:8000",
//     },
//   },
// });

// export default defineConfig({
//   plugins: [
//     react(),
//     eslintPlugin({
//       lintOnStart: true,
//       failOnError: process.env.NODE_ENV === "production",
//     }),
//   ],
//   build: {
//     rollupOptions: {
//       plugins: [
//         visualizer({
//           filename: './dist/stats.html',
//           open: true,
//         }),
//       ],
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'],
//         },
//       },
//     },
//   },
//   server: {
//     open: true,
//     proxy: {
//       "/api": "http://127.0.0.1:8000",
//     },
//   },
// });
