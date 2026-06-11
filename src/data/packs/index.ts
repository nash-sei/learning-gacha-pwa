import type { Question } from '../../types'
import { LEGACY_QUESTIONS } from './legacy'
import { PACK_2026_06 } from './pack-2026-06'

export const BUILTIN_QUESTIONS: Question[] = [...LEGACY_QUESTIONS, ...PACK_2026_06]
export { LEGACY_QUESTIONS, PACK_2026_06 }
