import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
// require('dotenv').config()

// https://vitejs.dev/config/
// export default defineConfig({
//   // define:{
//   //   "global": 'globalThis',
//   // },
//   css:{
//     postcss:{
//       plugins: [tailwindcss, autoprefixer,]
//     }
//   },
//   plugins: [react()],
// })

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: {
      'process.env': env,
    },
    css:{
      postcss:{
        plugins: [tailwindcss, autoprefixer,]
      }
    },
    plugins: [react()],
    server:{
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    }
  }
})
