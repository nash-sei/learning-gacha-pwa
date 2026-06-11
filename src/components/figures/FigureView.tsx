/*
 * figure の type 別振り分け（spec §5-4）
 * - 1.0 対応：tape / money / clock / shape / scene
 * - grid / numberline は 1.1 で対応予定 → 控えめなプレースホルダ表示
 * - params は型上 Record<string, unknown>。各 Figure 内で型ガードして安全に描く
 */
import type { Figure } from '../../types'
import TapeFigure from './TapeFigure'
import MoneyFigure from './MoneyFigure'
import ClockFigure from './ClockFigure'
import ShapeFigure from './ShapeFigure'
import SceneFigure from './SceneFigure'

export interface FigureViewProps {
  figure: Figure
}

export default function FigureView({ figure }: FigureViewProps) {
  const params = figure.params ?? {}
  switch (figure.type) {
    case 'tape':
      return <TapeFigure params={params} />
    case 'money':
      return <MoneyFigure params={params} />
    case 'clock':
      return <ClockFigure params={params} />
    case 'shape':
      return <ShapeFigure params={params} />
    case 'scene':
      return <SceneFigure params={params} />
    case 'grid':
    case 'numberline':
      // 1.1 で実装（spec §5-4）
      return (
        <div className="mx-auto my-2 w-fit rounded-xl bg-[var(--color-bg-2)] px-4 py-2 text-sm text-[var(--color-ink-soft)]">
          （ず）
        </div>
      )
  }
}
