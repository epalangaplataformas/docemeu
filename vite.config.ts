import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,jpg,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.run\.app\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            urlPattern: /^http:\/\/localhost:2003\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache-local',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 },
            },
          },
        ],
      },
      manifest: {
        name: 'Doce Meu',
        short_name: 'Doce Meu',
        description: 'Confeitaria Portuguesa',
        theme_color: '#0a4d3b',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: '/192x192.jpg', sizes: '192x192', type: 'image/jpeg' },
          { src: '/512x512.jpg', sizes: '512x512', type: 'image/jpeg' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/v1': {
        target: 'http://localhost:2003',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // manualChunks transformado em função
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separa pacotes do Radix UI em um chunk 'ui'
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            // Separa React e dependências core em um chunk 'vendor'
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router')
            ) {
              return 'vendor';
            }
          }
        },
      },
    },
  },
})
