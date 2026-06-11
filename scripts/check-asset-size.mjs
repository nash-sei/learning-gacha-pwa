#!/usr/bin/env node
/**
 * アセット容量検査スクリプト（spec §7 / §14）
 *
 * 使い方:
 *   node scripts/check-asset-size.mjs [検査ディレクトリ...]
 *   例) node scripts/check-asset-size.mjs public
 *       node scripts/check-asset-size.mjs dist
 *   省略時: dist/ があれば dist/、なければ public/ を検査
 *
 * しきい値（超過すると exit code 1 → ビルド失敗にできる）:
 *   - モンスター画像1枚（monsters/ 配下）: 80KB 以下（spec §7）
 *   - アセット合計（png/webp/jpg/jpeg/svg/mp3）: 10MB 以下（spec §14）
 *
 * 依存: node:fs / node:path のみ（外部パッケージなし）
 */
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join, extname, resolve, relative, sep } from 'node:path'
import process from 'node:process'

const MONSTER_MAX_BYTES = 80 * 1024 // 1体 80KB（spec §7）
const TOTAL_MAX_BYTES = 10 * 1024 * 1024 // 合計 10MB（spec §14）
const ASSET_EXTS = new Set(['.png', '.webp', '.jpg', '.jpeg', '.svg', '.mp3'])
const SKIP_DIRS = new Set(['node_modules', '.git'])

/** ディレクトリを再帰走査して対象拡張子のファイル一覧を返す */
function collectAssets(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) collectAssets(full, files)
    } else if (entry.isFile() && ASSET_EXTS.has(extname(entry.name).toLowerCase())) {
      files.push({ path: full, size: statSync(full).size })
    }
  }
  return files
}

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)}MB`
  return `${(bytes / 1024).toFixed(1)}KB`
}

/** パスがどのグループに属するか（monsters / scenes / 音 / その他） */
function groupOf(file) {
  const parts = file.path.split(sep)
  if (parts.includes('monsters')) return 'monsters'
  if (parts.includes('scenes')) return 'scenes'
  if (extname(file.path).toLowerCase() === '.mp3') return 'audio'
  return 'other'
}

// ---- 検査対象の決定 ----
const args = process.argv.slice(2)
let targets = args.length > 0 ? args : [existsSync('dist') ? 'dist' : 'public']
targets = targets.map((t) => resolve(t))

const missing = targets.filter((t) => !existsSync(t))
if (missing.length > 0) {
  console.error(`❌ 検査ディレクトリが見つかりません: ${missing.join(', ')}`)
  process.exit(1)
}

// ---- 収集（複数ターゲット間の重複は除外） ----
const seen = new Set()
const files = []
for (const t of targets) {
  for (const f of collectAssets(t)) {
    if (!seen.has(f.path)) {
      seen.add(f.path)
      files.push(f)
    }
  }
}

const total = files.reduce((sum, f) => sum + f.size, 0)
const groups = { monsters: [], scenes: [], audio: [], other: [] }
for (const f of files) groups[groupOf(f)].push(f)

// ---- 判定 ----
const violations = []
for (const f of groups.monsters) {
  if (f.size > MONSTER_MAX_BYTES) {
    violations.push(
      `モンスター画像が1体${fmt(MONSTER_MAX_BYTES)}を超過: ${relative(process.cwd(), f.path)} = ${fmt(f.size)}`,
    )
  }
}
if (total > TOTAL_MAX_BYTES) {
  violations.push(`アセット合計が${fmt(TOTAL_MAX_BYTES)}を超過: 合計 ${fmt(total)}`)
}

// ---- 日本語サマリ出力 ----
const groupLabel = {
  monsters: 'モンスター画像',
  scenes: '場面ライブラリ',
  audio: '音声(mp3)',
  other: 'その他アセット',
}
console.log('===== アセット容量検査（spec §7 / §14）=====')
console.log(`検査対象: ${targets.map((t) => relative(process.cwd(), t) || '.').join(', ')}`)
for (const key of ['monsters', 'scenes', 'audio', 'other']) {
  const g = groups[key]
  const sub = g.reduce((s, f) => s + f.size, 0)
  console.log(`  ${groupLabel[key]}: ${g.length}ファイル / ${fmt(sub)}`)
}
console.log(`  合計: ${files.length}ファイル / ${fmt(total)}（上限 ${fmt(TOTAL_MAX_BYTES)}）`)

const biggest = [...files].sort((a, b) => b.size - a.size).slice(0, 5)
if (biggest.length > 0) {
  console.log('  大きいファイル上位:')
  for (const f of biggest) {
    console.log(`    ${fmt(f.size).padStart(9)}  ${relative(process.cwd(), f.path)}`)
  }
}

if (violations.length > 0) {
  console.error('\n❌ 容量超過があります（ビルド失敗）:')
  for (const v of violations) console.error(`  - ${v}`)
  process.exit(1)
}
console.log('\n✅ 容量チェックOK（しきい値内）')
