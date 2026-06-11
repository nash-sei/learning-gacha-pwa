/*
 * 音管理の小さなラッパー（spec §11）
 * - 音源ファイルは /sounds/<name>.mp3 を想定（public/sounds/ に同梱・外部通信なし）
 * - 音源が無い/読めない場合は例外を投げず、SE はオシレーター合成音にフォールバック、
 *   BGM は無音（アプリは絶対に壊さない）
 * - iOS 等の自動再生制限：初回ユーザータップで unlock()（AudioContext.resume＋プリロード開始）
 * - SE/BGM の ON/OFF は setEnabled で反映（親メニューの音設定）
 */

export type SeName =
  | 'tap'
  | 'correct'
  | 'wrong'
  | 'drumroll'
  | 'crack'
  | 'reveal-n'
  | 'reveal-r'
  | 'reveal-sr'
  | 'reveal-ur'
  | 'harvest'
  | 'partner-happy'

export type BgmName = 'home' | 'quiz'

const SE_NAMES: SeName[] = [
  'tap',
  'correct',
  'wrong',
  'drumroll',
  'crack',
  'reveal-n',
  'reveal-r',
  'reveal-sr',
  'reveal-ur',
  'harvest',
  'partner-happy',
]

const BGM_NAMES: BgmName[] = ['home', 'quiz']

const SE_VOLUME = 0.6
const BGM_VOLUME = 0.32

// ========== 合成フォールバック（音源ファイルが無いときの簡易SE・外部通信なし） ==========

interface SynthNote {
  /** 周波数 Hz */
  f: number
  /** 開始オフセット 秒 */
  t: number
  /** 長さ 秒 */
  d: number
  type?: OscillatorType
  /** ピーク音量 0..1 */
  g?: number
}

function drumrollNotes(): SynthNote[] {
  const notes: SynthNote[] = []
  for (let i = 0; i < 16; i++) {
    notes.push({ f: i % 2 === 0 ? 150 : 175, t: i * 0.07, d: 0.045, type: 'triangle', g: 0.2 })
  }
  return notes
}

function arpeggio(freqs: number[], noteDur: number, gain: number): SynthNote[] {
  return freqs.map((f, i) => ({
    f,
    t: i * noteDur,
    d: i === freqs.length - 1 ? noteDur * 2.2 : noteDur,
    type: 'triangle',
    g: gain,
  }))
}

const SYNTH_SE: Record<SeName, SynthNote[]> = {
  tap: [{ f: 880, t: 0, d: 0.06, type: 'triangle', g: 0.16 }],
  correct: [
    { f: 1046.5, t: 0, d: 0.1, type: 'triangle', g: 0.24 },
    { f: 1318.5, t: 0.1, d: 0.2, type: 'triangle', g: 0.24 },
  ],
  wrong: [
    { f: 220, t: 0, d: 0.12, type: 'square', g: 0.1 },
    { f: 164.8, t: 0.13, d: 0.22, type: 'square', g: 0.1 },
  ],
  drumroll: drumrollNotes(),
  crack: [
    { f: 620, t: 0, d: 0.04, type: 'square', g: 0.14 },
    { f: 340, t: 0.05, d: 0.05, type: 'square', g: 0.14 },
  ],
  'reveal-n': arpeggio([523.3, 659.3], 0.12, 0.2),
  'reveal-r': arpeggio([523.3, 659.3, 784], 0.11, 0.22),
  'reveal-sr': arpeggio([523.3, 659.3, 784, 1046.5], 0.1, 0.24),
  'reveal-ur': arpeggio([523.3, 659.3, 784, 1046.5, 1318.5], 0.1, 0.26),
  harvest: [
    { f: 660, t: 0, d: 0.06, type: 'sine', g: 0.26 },
    { f: 990, t: 0.07, d: 0.13, type: 'sine', g: 0.26 },
  ],
  'partner-happy': [
    { f: 784, t: 0, d: 0.09, type: 'triangle', g: 0.2 },
    { f: 987.8, t: 0.1, d: 0.16, type: 'triangle', g: 0.2 },
  ],
}

// ========== 内部状態 ==========

type BufferState = AudioBuffer | 'loading' | 'missing'

let ctx: AudioContext | null = null
let seGain: GainNode | null = null
let bgmGain: GainNode | null = null
let enabled = { se: true, bgm: true }
const buffers = new Map<string, BufferState>()
let bgmSource: AudioBufferSourceNode | null = null
/** いま実際に鳴っている BGM */
let currentBgm: BgmName | null = null
/** 鳴らしたい BGM（OFF→ON 復帰・読み込み完了時の自動開始用） */
let desiredBgm: BgmName | null = null
let preloadStarted = false

function asBuffer(state: BufferState | undefined): AudioBuffer | null {
  return state === undefined || state === 'loading' || state === 'missing' ? null : state
}

function getCtx(): AudioContext | null {
  if (ctx) return ctx
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
    seGain = ctx.createGain()
    seGain.gain.value = SE_VOLUME
    seGain.connect(ctx.destination)
    bgmGain = ctx.createGain()
    bgmGain.gain.value = BGM_VOLUME
    bgmGain.connect(ctx.destination)
    return ctx
  } catch (e) {
    console.warn('[audio] AudioContext unavailable', e)
    return null
  }
}

function soundUrl(name: string): string {
  return `/sounds/${name}.mp3`
}

/** 音源ファイルを読み込む。404/デコード失敗は 'missing' として静かに記録（例外を投げない） */
async function loadBuffer(name: string): Promise<void> {
  if (buffers.has(name)) return
  const ac = getCtx()
  if (!ac) {
    buffers.set(name, 'missing')
    return
  }
  buffers.set(name, 'loading')
  try {
    const res = await fetch(soundUrl(name))
    if (!res.ok) {
      buffers.set(name, 'missing')
      return
    }
    const data = await res.arrayBuffer()
    const buf = await ac.decodeAudioData(data)
    buffers.set(name, buf)
    // この音源を BGM が待っていたら開始する
    if (desiredBgm === name) tryStartDesiredBgm()
  } catch {
    // dev サーバの SPA フォールバック（HTMLが返る）等もここに落ちる → 無音/合成で続行
    buffers.set(name, 'missing')
  }
}

function playSeBuffer(buf: AudioBuffer): void {
  const ac = getCtx()
  if (!ac || !seGain) return
  try {
    const src = ac.createBufferSource()
    src.buffer = buf
    src.connect(seGain)
    src.start()
  } catch (e) {
    console.warn('[audio] se play failed', e)
  }
}

function playSynth(name: SeName): void {
  const ac = getCtx()
  if (!ac || !seGain) return
  try {
    const base = ac.currentTime + 0.01
    for (const n of SYNTH_SE[name]) {
      const osc = ac.createOscillator()
      osc.type = n.type ?? 'triangle'
      osc.frequency.value = n.f
      const env = ac.createGain()
      const peak = n.g ?? 0.2
      env.gain.setValueAtTime(0, base + n.t)
      env.gain.linearRampToValueAtTime(peak, base + n.t + 0.012)
      env.gain.linearRampToValueAtTime(0.0001, base + n.t + n.d)
      osc.connect(env)
      env.connect(seGain)
      osc.start(base + n.t)
      osc.stop(base + n.t + n.d + 0.03)
    }
  } catch (e) {
    console.warn('[audio] synth failed', e)
  }
}

function stopBgmInternal(): void {
  if (bgmSource) {
    try {
      bgmSource.stop()
    } catch {
      // 既に停止済みなら無視
    }
    try {
      bgmSource.disconnect()
    } catch {
      // 無視
    }
    bgmSource = null
  }
  currentBgm = null
}

function startBgmBuffer(name: BgmName, buf: AudioBuffer): void {
  const ac = getCtx()
  if (!ac || !bgmGain) return
  try {
    stopBgmInternal()
    const src = ac.createBufferSource()
    src.buffer = buf
    src.loop = true
    src.connect(bgmGain)
    src.start()
    bgmSource = src
    currentBgm = name
  } catch (e) {
    console.warn('[audio] bgm play failed', e)
  }
}

/** desiredBgm が再生可能なら開始（BGM は合成フォールバックなし＝音源が無ければ無音） */
function tryStartDesiredBgm(): void {
  if (!enabled.bgm || !desiredBgm) return
  if (currentBgm === desiredBgm && bgmSource) return
  const state = buffers.get(desiredBgm)
  const buf = asBuffer(state)
  if (buf) startBgmBuffer(desiredBgm, buf)
  else if (state === undefined) void loadBuffer(desiredBgm)
  // 'loading' → 読み込み完了時に再試行 / 'missing' → 無音のまま
}

function unlockInternal(): void {
  try {
    const ac = getCtx()
    if (!ac) return
    if (ac.state === 'suspended') {
      void ac.resume().catch(() => undefined)
    }
    if (!preloadStarted) {
      preloadStarted = true
      for (const n of SE_NAMES) void loadBuffer(n)
      for (const n of BGM_NAMES) void loadBuffer(n)
    }
  } catch (e) {
    console.warn('[audio] unlock failed', e)
  }
}

// ========== 公開 API ==========

export const audio = {
  /** 初回ユーザータップで呼ぶ（AudioContext.resume＋全音源のプリロード開始）。何度呼んでも安全 */
  unlock(): void {
    unlockInternal()
  },

  /** 効果音。音源ファイルがあればそれを、無ければ合成音を鳴らす（OFF時・失敗時は無音） */
  playSe(name: SeName): void {
    if (!enabled.se) return
    try {
      unlockInternal()
      const buf = asBuffer(buffers.get(name))
      if (buf) playSeBuffer(buf)
      else playSynth(name)
    } catch (e) {
      console.warn('[audio] playSe failed', e)
    }
  },

  /** BGM（ループ再生）。同じ曲なら再開しない。音源が無ければ無音（合成なし） */
  playBgm(name: BgmName): void {
    try {
      desiredBgm = name
      unlockInternal()
      tryStartDesiredBgm()
    } catch (e) {
      console.warn('[audio] playBgm failed', e)
    }
  },

  stopBgm(): void {
    desiredBgm = null
    stopBgmInternal()
  },

  /** 親メニューの音設定を反映。bgm を ON に戻すと直前に要求されていた曲を再開する */
  setEnabled(o: { se?: boolean; bgm?: boolean }): void {
    if (typeof o.se === 'boolean') enabled = { ...enabled, se: o.se }
    if (typeof o.bgm === 'boolean') {
      enabled = { ...enabled, bgm: o.bgm }
      if (!o.bgm) stopBgmInternal()
      else tryStartDesiredBgm()
    }
  },
}
