import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: '.', // Current dir (Admin) is the root
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'components'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})
