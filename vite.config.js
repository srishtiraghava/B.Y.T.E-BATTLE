// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'           // ← add this

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),              // needed for Tailwind v4
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),   // ← this makes @ work at runtime
    },
  },
})