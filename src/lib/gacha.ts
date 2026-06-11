/*
 * ガチャ抽選ロジック（spec §6）。純粋関数として書き、UI から切り離す。
 * - commit-then-animate：performGacha が「次のセーブ」を返す → UI は先に保存してから演出する。
 * - 天井：N が5連続→次は R 以上確定／累計40回で UR 未所持→次は UR 確定。
 * - ダブり→ホシのかけら変換。リトライ時は呼び出し側が difficulty を1段階降格して渡す。
 */
import type { Difficulty, MonsterDef, Rarity, SaveData } from '../types'
import { MONSTERS } from '../data/monsters'
import {
  DIFFICULTY_DEMOTE,
  PITY_NO_RARE_STREAK,
  PITY_UR_THRESHOLD,
  RARITY_TABLE,
  SHARD_BY_RARITY,
  SHARD_EGG_COST,
  SHARD_EGG_UR_RATE,
} from './constants'
import { weekStr } from './dateUtil'

export interface GachaResult {
  monster: MonsterDef
  rarity: Rarity
  isNew: boolean
  /** ダブり時に得たかけら（新規なら0） */
  shardGain: number
  /** 天井が発動したか（演出/表示用） */
  pityTriggered: boolean
}

const RARITY_ORDER: Rarity[] = ['N', 'R', 'SR', 'UR']

/** 確率表から1つ引く（rng は 0..1） */
function pickByWeights(weights: Record<Rarity, number>, rng: () => number): Rarity {
  const total = RARITY_ORDER.reduce((s, r) => s + weights[r], 0)
  let x = rng() * total
  for (const r of RARITY_ORDER) {
    x -= weights[r]
    if (x < 0) return r
  }
  return 'N'
}

function urOwned(save: SaveData, monsters: MonsterDef[]): boolean {
  const urIds = new Set(monsters.filter((m) => m.rarity === 'UR').map((m) => m.id))
  return save.monsters.some((o) => o.count > 0 && urIds.has(o.monsterId))
}

/** レア度を抽選（天井込み） */
export function rollRarity(
  save: SaveData,
  difficulty: Difficulty,
  monsters: MonsterDef[],
  rng: () => number
): { rarity: Rarity; pity: boolean } {
  // UR 天井：UR 未所持で累計が閾値に達していたら UR 確定
  if (!urOwned(save, monsters) && save.pityCounters.totalSinceUR >= PITY_UR_THRESHOLD) {
    return { rarity: 'UR', pity: true }
  }

  const table = RARITY_TABLE[difficulty]
  let rarity = pickByWeights(table, rng)

  // N 連続天井：5連続で N を引いたら R 以上に振り直す
  if (rarity === 'N' && save.pityCounters.noRareStreak >= PITY_NO_RARE_STREAK) {
    rarity = pickByWeights({ N: 0, R: table.R, SR: table.SR, UR: table.UR }, rng)
    return { rarity, pity: true }
  }
  return { rarity, pity: false }
}

/** そのレア度のモンスターから1体選ぶ（未所持を優先して図鑑が進む手触りにする） */
export function pickMonster(
  rarity: Rarity,
  save: SaveData,
  monsters: MonsterDef[],
  rng: () => number
): MonsterDef {
  const pool = monsters.filter((m) => m.rarity === rarity)
  // フォールバック：万一そのレア度の定義が無ければ全体から
  const candidates = pool.length > 0 ? pool : monsters
  const ownedIds = new Set(save.monsters.filter((o) => o.count > 0).map((o) => o.monsterId))
  const fresh = candidates.filter((m) => !ownedIds.has(m.id))
  // 7割で未所持を優先、3割は通常抽選（ダブり→かけらの楽しみも残す）
  const target = fresh.length > 0 && rng() < 0.7 ? fresh : candidates
  return target[Math.floor(rng() * target.length)]
}

/**
 * ガチャを1回実行。result（演出用）と nextSave（先に保存する確定状態）を返す。
 * UI は nextSave を保存してから result で演出する（commit-then-animate）。
 */
export function performGacha(
  save: SaveData,
  difficulty: Difficulty,
  monsters: MonsterDef[] = MONSTERS,
  rng: () => number = Math.random
): { result: GachaResult; nextSave: SaveData } {
  const { rarity, pity } = rollRarity(save, difficulty, monsters, rng)
  const monster = pickMonster(rarity, save, monsters, rng)

  const existing = save.monsters.find((o) => o.monsterId === monster.id)
  const isNew = !existing || existing.count === 0
  const shardGain = isNew ? 0 : SHARD_BY_RARITY[rarity]

  // monsters 配列を更新
  let nextMonsters
  if (existing) {
    nextMonsters = save.monsters.map((o) =>
      o.monsterId === monster.id ? { ...o, count: o.count + 1 } : o
    )
  } else {
    nextMonsters = [
      ...save.monsters,
      { monsterId: monster.id, count: 1, xp: 0, level: 1, stage: 1 },
    ]
  }

  // 天井カウンタ更新
  const noRareStreak = rarity === 'N' ? save.pityCounters.noRareStreak + 1 : 0
  const totalSinceUR = rarity === 'UR' ? 0 : save.pityCounters.totalSinceUR + 1

  const nextSave: SaveData = {
    ...save,
    monsters: nextMonsters,
    shards: save.shards + shardGain,
    dailyGachaCount: save.dailyGachaCount + 1,
    pityCounters: { noRareStreak, totalSinceUR },
  }

  return {
    result: { monster, rarity, isNew, shardGain, pityTriggered: pity },
    nextSave,
  }
}

/** リトライ時のレア率降格（spec §5-1） */
export function demote(difficulty: Difficulty): Difficulty {
  return DIFFICULTY_DEMOTE[difficulty]
}

/**
 * かけらタマゴ（spec §8）：ホシのかけら SHARD_EGG_COST 個で「SR以上 確定」のタマゴを1回ひく。
 * - レア度は UR=SHARD_EGG_UR_RATE（既定 20%）／残りは SR。モンスターは未所持優先（pickMonster 流用）。
 * - かけらを SHARD_EGG_COST 消費し、ダブりなら SHARD_BY_RARITY 分だけ戻る。
 * - shardEggLastUsedWeek に今週（weekStr）をセット＝週1回制限。週判定だけ現在時刻に依存する
 *   （週1ロックの性質上ここで確定させる。残りは rng 注入で決定的）。
 * - デイリーガチャとは別物：dailyGachaCount・coins・treeCoins・monthly は一切変えない。
 * - 天井カウンタ：UR入手→totalSinceUR=0／SR→+1。N以外を引いたので noRareStreak=0。
 * - 呼び出し側ガード（shards >= SHARD_EGG_COST かつ今週未使用）は UI が行う。
 * UI は nextSave を保存してから result で演出する（commit-then-animate）。
 */
export function performShardEgg(
  save: SaveData,
  monsters: MonsterDef[] = MONSTERS,
  rng: () => number = Math.random
): { result: GachaResult; nextSave: SaveData } {
  // SR以上確定：UR か SR の2択
  const rarity: Rarity = rng() < SHARD_EGG_UR_RATE ? 'UR' : 'SR'
  const monster = pickMonster(rarity, save, monsters, rng)

  const existing = save.monsters.find((o) => o.monsterId === monster.id)
  const isNew = !existing || existing.count === 0
  const shardGain = isNew ? 0 : SHARD_BY_RARITY[rarity]

  // monsters 配列を更新（performGacha と同じ手順）
  let nextMonsters
  if (existing) {
    nextMonsters = save.monsters.map((o) =>
      o.monsterId === monster.id ? { ...o, count: o.count + 1 } : o
    )
  } else {
    nextMonsters = [
      ...save.monsters,
      { monsterId: monster.id, count: 1, xp: 0, level: 1, stage: 1 },
    ]
  }

  const totalSinceUR = rarity === 'UR' ? 0 : save.pityCounters.totalSinceUR + 1

  const nextSave: SaveData = {
    ...save,
    monsters: nextMonsters,
    shards: save.shards - SHARD_EGG_COST + shardGain,
    shardEggLastUsedWeek: weekStr(),
    pityCounters: { noRareStreak: 0, totalSinceUR },
  }

  return {
    result: { monster, rarity, isNew, shardGain, pityTriggered: false },
    nextSave,
  }
}
