import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_URI = "http://backend:8000"

// const API_URI = process.env.NODE_ENV === 'production'
//     ? 'http://backend:8000'    // in prod
//     : 'http://localhost:8000' // in dev

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
            '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
        },
    },
    server: {
        proxy: {
        '/api': {
            target: API_URI,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            configure: (proxy, _options) => {
                proxy.on('error', (err, _req, _res) => {
                    console.log('PROXY ERROR:', err);
                });
                proxy.on('proxyReq', (proxyReq, req, _res) => {
                    console.log('PROXYING REQUEST:', req.method, req.url, 'TO:', proxyReq.host + proxyReq.path);
                    // You can log headers here if needed: console.log('Headers:', proxyReq.getHeaders());
                });
                proxy.on('proxyRes', (proxyRes, req, _res) => {
                    console.log('PROXY RESPONSE FROM:', proxyRes.statusCode, req.url);
                });
            },
        }
        }
    }
})
