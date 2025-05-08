// https://vite.dev/guide/
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer';
// to import svg as react component
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
// https://vitest.dev/config/
export default defineConfig({
  define: {
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    reportCompressedSize: true,
    // commonjsOptions: {
    //   esmExternals: true,
    //   transformMixedEsModules: true
    // }
  },
  // server: {
  //   port: 3001,
  //   host: 'localhost',
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      emitFile: true,
      filename: 'stats-report.html',
    }),
    svgr(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
  },
});
