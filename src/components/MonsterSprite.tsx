/*
 * モンスター画像表示（spec §7）
 * - monsterSprite(monsterId, stage) の同梱画像を <img> で表示（外部URL依存なし）
 * - silhouette=true で真っ黒シルエット（図鑑の未獲得表示。名前も '？？？' で隠す）
 */
import { getMonster, monsterSprite } from '../data/monsters'

export interface MonsterSpriteProps {
  monsterId: string
  /** 進化段階（既定 1） */
  stage?: number
  /** 表示サイズ px（正方形・既定 96） */
  size?: number
  /** 未獲得シルエット表示 */
  silhouette?: boolean
}

export default function MonsterSprite({
  monsterId,
  stage = 1,
  size = 96,
  silhouette = false,
}: MonsterSpriteProps) {
  const def = getMonster(monsterId)
  const src = monsterSprite(monsterId, stage)
  return (
    <img
      src={src}
      alt={silhouette ? '？？？' : (def?.name ?? monsterId)}
      width={size}
      height={size}
      draggable={false}
      className="select-none object-contain"
      style={silhouette ? { filter: 'brightness(0)', opacity: 0.7 } : undefined}
    />
  )
}
