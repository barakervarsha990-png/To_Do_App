// vite.config.js
// Vite configuration for React + dev server proxy.
// Proxies /api/* requests to the Express backend on port 5000
// so you don't need to configure CORS origins in development.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
