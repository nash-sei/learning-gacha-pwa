import type { Question } from '../../types'
import { LEGACY_QUESTIONS } from './legacy'
import { PACK_2026_06 } from './pack-2026-06'
import { PACK_2026_07 } from './pack-2026-07'
import { PACK_2026_06B } from './pack-2026-06b'

export const BUILTIN_QUESTIONS: Question[] = [
  ...LEGACY_QUESTIONS,
  ...PACK_2026_06,
  ...PACK_2026_07,
  ...PACK_2026_06B,
]
export { LEGACY_QUESTIONS, PACK_2026_06, PACK_2026_07, PACK_2026_06B }
