import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
const dotenv = require('dotenv')
dotenv.config()
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    define: {
      'process.env': {
        // URL_API: "https://api-uat.mix-station.com",
        // URL_API: 'https://api.mix-station.com',
        URL_API: 'http://27.254.144.161', 
        PRINTER: process.env.PRINTER,
        MQTT_URL: 'wss://27.254.144.161:8084/mqtt',
        MQTT_USER: {
          MQTT_AUTH_USERNAME: 'client_mix_station',
          MQTT_AUTH_PASSWORD: 'mix-stati0n!$'
        }
      }
    },
    plugins: [vue()]
  }
})
