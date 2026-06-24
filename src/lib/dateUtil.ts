/*
 * 日付・月・週の文字列ヘルパー。
 * 端末ローカル日付で計算する（v1 は toISOString で UTC 基準だったため JST 夜に日付がずれる懸念があった）。
 */
import { FESTIVAL_DAYS } from './constants'

/** 本番（公開）のドメイン。ここでだけ ?festival テストスイッチを無効にする。 */
const PROD_HOST = 'learning-gacha-pwa.vercel.app'

/**
 * テスト用スイッチ：URLに ?festival が付いていたら曜日に関係なく祭り扱い。
 * 有効なのは「開発(dev)」または「本番ドメイン以外（Vercelプレビュー等）」だけ。
 * 本番ドメイン（PROD_HOST）では常に無効＝公開後に子どもが悪用できない。
 */
function isFestivalForced(): boolean {
  if (typeof window === 'undefined') return false
  if (!new URLSearchParams(window.location.search).has('festival')) return false
  if (import.meta.env.DEV) return true
  return window.location.hostname !== PROD_HOST
}

/** きょうがデンジャー祭り（毎週 金・土・日）か。端末ローカルの曜日で判定する。 */
export function isFestivalDay(d: Date = new Date()): boolean {
  if (isFestivalForced()) return true
  return FESTIVAL_DAYS.includes(d.getDay())
}

/** YYYY-MM-DD（端末ローカル） */
export function todayStr(d: Date = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** YYYY-MM */
export function monthStr(d: Date = new Date()): string {
  return todayStr(d).slice(0, 7)
}

/** ISO 週番号 "YYYY-Www"（かけらタマゴ週1制限に使用・週内で一定／週をまたぐと変化） */
export function weekStr(d: Date = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  // その週の木曜が属する年が ISO の年
  const dayNum = (date.getUTCDay() + 6) % 7 // 月曜=0
  date.setUTCDate(date.getUTCDate() - dayNum + 3)
  const thursday = date.getTime()
  // その年の最初の木曜
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 4))
  const yearStartDayNum = (yearStart.getUTCDay() + 6) % 7
  yearStart.setUTCDate(yearStart.getUTCDate() - yearStartDayNum + 3)
  const week = 1 + Math.round((thursday - yearStart.getTime()) / (7 * 86400000))
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

/** a が b より前の日付か（YYYY-MM-DD は辞書順比較で日付順になる） */
export function isDateBefore(a: string, b: string): boolean {
  return a < b
}
