import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // Proxy Materials Project API to avoid CORS in the browser during development
      '/mp': {
        target: 'https://api.materialsproject.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/mp/, ''),
      },
    },
  },
});
