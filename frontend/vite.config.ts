import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_URI = process.env.NODE_ENV === 'production'
    ? ''    // in prod
    : 'http://localhost:8000' // in dev

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
        proxy: {
        '/api': {
            target: API_URI,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
        }
    }
})
