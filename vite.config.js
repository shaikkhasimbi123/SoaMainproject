import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mysqlBridgePlugin from './server/mysqlBridgePlugin.js'

// https://vitejs.dev/config/
// Config reload trigger: 2026-10-30T00:07:00
export default defineConfig({
  plugins: [react(), mysqlBridgePlugin()],
  server: {
    port: 5173,
    open: false
  }
})
