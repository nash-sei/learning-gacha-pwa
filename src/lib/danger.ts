/*
 * DANGER討伐イベントのドメインロジック（追加機能1-C）
 * - 専用モンスターの母集団＝isDanger のみ（通常ガチャとは別・未所持を優先）
 * - 討伐成功の報酬付与：モンスターをコレクションに追加＋現金200円を別枠履歴に記録
 * - モンスター付与は performGacha と同じ作法（新規=count1／ダブり=count+1＋かけら変換）
 * - 純粋関数。UI は nextSave を保存してから演出する（commit-then-animate）。
 */
import type { DangerAward, MonsterDef, SaveData } from '../types'
import { MONSTERS } from '../data/monsters'
import { SHARD_BY_RARITY } from './constants'

/** DANGER限定モンスターの母集団（isDanger のみ） */
export function dangerMonsters(monsters: MonsterDef[] = MONSTERS): MonsterDef[] {
  return monsters.filter((m) => m.isDanger)
}

/** DANGER限定から1体選ぶ（未所持を優先＝図鑑が進む手触り）。1体も無ければ null */
export function pickDangerMonster(
  save: SaveData,
  monsters: MonsterDef[] = MONSTERS,
  rng: () => number = Math.random
): MonsterDef | null {
  const pool = dangerMonsters(monsters)
  if (pool.length === 0) return null
  const ownedIds = new Set(save.monsters.filter((o) => o.count > 0).map((o) => o.monsterId))
  const fresh = pool.filter((m) => !ownedIds.has(m.id))
  const target = fresh.length > 0 ? fresh : pool
  return target[Math.floor(rng() * target.length)]
}

export interface DangerAwardResult {
  nextSave: SaveData
  /** 図鑑初登場か（演出の NEW 表示用） */
  isNew: boolean
  /** ダブり時に得たかけら（新規なら0） */
  shardGain: number
}

/**
 * 討伐成功の報酬を確定する。
 * - monster: pickDangerMonster で選んだ DANGER 限定モンスター（null ならモンスター付与なし＝現金のみ）
 * - now/rng は決定的テストのため注入可（既定は実時刻・乱数）
 */
export function awardDanger(
  save: SaveData,
  monster: MonsterDef | null,
  now: number = Date.now(),
  rng: () => number = Math.random
): DangerAwardResult {
  let nextMonsters = save.monsters
  let isNew = false
  let shardGain = 0

  if (monster) {
    const existing = save.monsters.find((o) => o.monsterId === monster.id)
    isNew = !existing || existing.count === 0
    shardGain = isNew ? 0 : SHARD_BY_RARITY[monster.rarity]
    nextMonsters = existing
      ? save.monsters.map((o) =>
          o.monsterId === monster.id ? { ...o, count: o.count + 1 } : o
        )
      : [...save.monsters, { monsterId: monster.id, count: 1, xp: 0, level: 1, stage: 1 }]
  }

  const award: DangerAward = {
    id: `danger-${now}-${Math.floor(rng() * 1e6).toString(36)}`,
    awardedAt: new Date(now).toISOString(),
    monsterId: monster?.id ?? '',
    received: false,
  }

  const nextSave: SaveData = {
    ...save,
    monsters: nextMonsters,
    shards: save.shards + shardGain,
    dangerYenAwarded: [...save.dangerYenAwarded, award],
  }
  return { nextSave, isNew, shardGain }
}
