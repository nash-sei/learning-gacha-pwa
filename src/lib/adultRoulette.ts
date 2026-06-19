/*
 * 大人モード ルーレットの抽選ロジック（子供のガチャとは完全に独立）
 * - 子供の gacha.ts / SaveData / pityCounters には一切触らない（壊し役レビューの指摘②③対策）。
 * - 初級ルーレットの「モンスター枠」で使う：normal のレア度確率で N〜UR を引き、
 *   大人専用ずかん（zukan: monsterId[]）の未所持を優先して1体選ぶ。天井（pity）は無し。
 */
import type { MonsterDef, Rarity } from '../types'
import { MONSTERS } from '../data/monsters'
import { RARITY_TABLE } from './constants'

const RARITY_ORDER: Rarity[] = ['N', 'R', 'SR', 'UR']

/** normal の確率表からレア度を1つ引く（天井なし・rng は 0..1） */
function pickRarity(rng: () => number): Rarity {
  const table = RARITY_TABLE.normal
  const total = RARITY_ORDER.reduce((s, r) => s + table[r], 0)
  let x = rng() * total
  for (const r of RARITY_ORDER) {
    x -= table[r]
    if (x < 0) return r
  }
  return 'N'
}

export interface AdultMonsterResult {
  monster: MonsterDef
  rarity: Rarity
  /** 大人専用ずかんで初めて手に入れたか（重複ならfalse） */
  isNew: boolean
}

/**
 * 初級ルーレットのモンスター当選：レア度を引き、そのレア度の通常モンスター
 *（DANGER限定は除外）から未所持優先で1体選ぶ。zukan は取得済み monsterId の配列。
 */
export function rollAdultMonster(
  zukan: string[],
  rng: () => number = Math.random,
  monsters: MonsterDef[] = MONSTERS
): AdultMonsterResult {
  const rarity = pickRarity(rng)
  const pool = monsters.filter((m) => m.rarity === rarity && !m.isDanger)
  const candidates = pool.length > 0 ? pool : monsters.filter((m) => !m.isDanger)
  const owned = new Set(zukan)
  const fresh = candidates.filter((m) => !owned.has(m.id))
  // 7割で未所持を優先（ずかんが進む手触り）、3割は全体から
  const target = fresh.length > 0 && rng() < 0.7 ? fresh : candidates
  const monster = target[Math.floor(rng() * target.length)]
  return { monster, rarity, isNew: !owned.has(monster.id) }
}
