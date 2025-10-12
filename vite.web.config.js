// vite.web.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  // โครงสร้างมาตรฐานของ electron-vite คือมี renderer อยู่ใน src/renderer
  // ถ้าโปรเจกต์คุณมี index.html อยู่ที่ src/renderer ให้ใช้ root นี้
  // (ถ้า index.html อยู่ที่อื่น เปลี่ยน root ให้ตรงตำแหน่งไฟล์นั้น)
  root: path.resolve(__dirname, 'src/renderer'),
  plugins: [vue()],
  base: './', // ใช้ relative path เพื่อเปิดจากโฮสติ้ง/static ได้
  resolve: {
    alias: {
      // ส่วนใหญ่โปรเจกต์ electron-vite อ้าง import จาก @ หรือ @renderer
      '@': path.resolve(__dirname, 'src/renderer/src'),
      '@renderer': path.resolve(__dirname, 'src/renderer/src')
    }
  },
  server: {
    port: 5174,        // กันชนไม่ให้ชนกับพอร์ต dev อื่น ๆ
    strictPort: true
  },
  build: {
    outDir: path.resolve(__dirname, 'dist-web'), // แยกออกจาก dist/out เดิมของ Electron
    emptyOutDir: true
  }
})
