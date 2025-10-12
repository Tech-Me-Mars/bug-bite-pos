// vite.web.config.js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  // โหลด .env, .env.web, .env.production ตาม mode
  const env = loadEnv(mode, process.cwd(), '') // ไม่กรอง prefix เพื่อเผื่อกรณีใช้ URL_API ตรง ๆ

  // สร้างออบเจ็กต์ที่จะถูกอินไลน์เป็น process.env ตอน build
  const ENV = {
    URL_API: env.VITE_URL_API || env.URL_API || '',
    PRINTER: env.VITE_PRINTER || env.PRINTER || '',
    MQTT_URL: env.VITE_MQTT_URL || env.MQTT_URL || '',
    MQTT_USER: {
      MQTT_AUTH_USERNAME: env.VITE_MQTT_AUTH_USERNAME || env.MQTT_AUTH_USERNAME || '',
      MQTT_AUTH_PASSWORD: env.VITE_MQTT_AUTH_PASSWORD || env.MQTT_AUTH_PASSWORD || ''
    }
  }

  return {
    root: path.resolve(__dirname, 'src/renderer'),
    plugins: [vue()],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/renderer/src'),
        '@renderer': path.resolve(__dirname, 'src/renderer/src')
      }
    },
    define: {
      // ทำให้โค้ด front ใช้ `process.env.URL_API` ได้เหมือนเดิม
      'process.env': ENV
    },
    server: { port: 5174, strictPort: true },
    build: { outDir: path.resolve(__dirname, 'dist-web'), emptyOutDir: true }
  }
})
