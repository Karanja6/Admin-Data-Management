import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path' // ✅ Use 'node:path' for ESM-compatible path import
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename) // ✅ Manually define __dirname in ESM

export default defineConfig({
 root: __dirname, // Admin as root
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'Admin/components'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})
