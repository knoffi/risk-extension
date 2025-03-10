import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, '../shared'),
      "@src/supporting": path.resolve(__dirname, './src/supporting'),
      "@src/core": path.resolve(__dirname, './src/core'),
    },
  }
})
