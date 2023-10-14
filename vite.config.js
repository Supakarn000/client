import { defineConfig } from 'vite'
import dns from 'dns'
import react from '@vitejs/plugin-react-swc'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000
  }
})