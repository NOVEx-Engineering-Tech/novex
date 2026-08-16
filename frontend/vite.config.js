import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
        host: "0.0.0.0",
        port: 3000
    },
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#app': path.resolve(__dirname, './src/app'),
      '#lib': path.resolve(__dirname, './src/lib'),
      '#utils': path.resolve(__dirname, './src/utils'),
      '#components': path.resolve(__dirname, './src/components'),
    },
  },
})
