import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // devServer: {
  //   // 프록시 설정
  //   proxy: {
  //       // 프록시 요청을 보낼 api의 시작 부분
  //       '/api': {
  //           // 프록시 요청을 보낼 서버의 주소
  //           target: 'http//211.253.30.157:8090'
  //         }
  //     }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '/assets/': fileURLToPath(new URL('/src/assets/', import.meta.url)),
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "src/assets/scss/style.scss";
        `,
      },
    },
  },
})
