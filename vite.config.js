import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { 
        // target: 'http://localhost:3000', // Local server URL
        target: process.env.VITE_BACKEND_URL || 'http://localhost:3000', // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})