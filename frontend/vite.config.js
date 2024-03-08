import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://vercel.com/rudras-projects-27a9092e/mern-stack-student-teacher-booking-appointment',
    },
    host: true,
  }
})