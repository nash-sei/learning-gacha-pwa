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
        // 憲法（spec §1-2 / §12）：画像・音・動画を含む全アセットをオフラインキャッシュ対象にする。
        // v1 は既定値のままで 7 ファイルのみキャッシュ → モンスター画像が機内モード圏外だった。
        // mp4/webm を追加（DANGER接近動画 public/danger/danger-intro.mp4 をオフラインでも再生するため）。
        globPatterns: ['**/*.{js,css,html,svg,png,webp,jpg,jpeg,ico,mp3,ogg,wav,mp4,webm,json,woff,woff2}'],
        // モンスター画像・音・動画をまとめてキャッシュできるよう上限を引き上げる（既定 2MB）。
        // 6MB → 14MB：ガチャ導入の女神動画 public/gacha/megami_kling_v2.mp4（約12.9MB）も
        // オフライン保存できるようにする（DANGER動画と同じ扱い）。
        maximumFileSizeToCacheInBytes: 14 * 1024 * 1024,
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
