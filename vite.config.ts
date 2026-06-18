import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'],
      workbox: {
        // 憲法（spec §1-2 / §12）：画像・音を含む全アセットをオフラインキャッシュ対象にする。
        // v1 は既定値のままで 7 ファイルのみキャッシュ → モンスター画像が機内モード圏外だった。
        globPatterns: ['**/*.{js,css,html,svg,png,webp,jpg,jpeg,ico,mp3,ogg,wav,json,woff,woff2}'],
        // モンスター画像・音をまとめてキャッシュできるよう上限を引き上げる（既定 2MB）。
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'ガクモン',
        short_name: 'ガクモン',
        description: 'べんきょうが、モンスターのせかいを育てる学習アプリ',
        lang: 'ja',
        dir: 'ltr',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#fff8ed',
        theme_color: '#5b8def',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
