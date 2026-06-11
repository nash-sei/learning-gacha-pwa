/*
 * 場面絵の図（spec §5-2 / §5-4・共通場面ライブラリの絵をID参照で表示）
 * params: { sceneId: string }
 * - 絵は「場面をつかむ」ための補助。ラベルがあれば小さく添える
 */
import { getScene, sceneAsset } from '../../data/scenes'

export default function SceneFigure({ params }: { params: Record<string, unknown> }) {
  const sceneId =
    typeof params.sceneId === 'string' && params.sceneId !== '' ? params.sceneId : null
  if (sceneId === null) {
    return (
      <div className="mx-auto my-2 w-fit rounded-xl bg-[var(--color-bg-2)] px-4 py-2 text-sm text-[var(--color-ink-soft)]">
        （ず）
      </div>
    )
  }

  const def = getScene(sceneId)
  return (
    <figure className="mx-auto my-1 w-fit max-w-[280px]">
      <div className="overflow-hidden rounded-2xl border-4 border-[var(--color-bg-2)] bg-[var(--color-surface)]">
        <img
          src={sceneAsset(sceneId)}
          alt={def?.label ?? ''}
          draggable={false}
          className="block h-auto w-full select-none"
        />
      </div>
      {def?.label != null && def.label !== '' && (
        <figcaption className="mt-1 text-center text-sm text-[var(--color-ink-soft)]">
          {def.label}
        </figcaption>
      )}
    </figure>
  )
}
