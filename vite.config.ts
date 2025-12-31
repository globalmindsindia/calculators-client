import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/store_user_details': 'http://localhost:5000',
      '/calculate_custom_package': 'http://localhost:5000',
      '/store_download_request': 'http://localhost:5000',
      '/download_package_details': 'http://localhost:5000',
      '/download_pdf': 'http://localhost:5000'
    }
  }
})
