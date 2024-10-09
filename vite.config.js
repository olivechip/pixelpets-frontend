import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// Get the backend URL from environment variables
const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:3000';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { 
        target: backendUrl, // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})