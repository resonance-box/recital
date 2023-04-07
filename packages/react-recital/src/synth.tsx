import { createSoundFont2Synth, type Synth } from '@resonance-box/recital-core'
import { useState } from 'react'

export interface UseSoundFont2SynthResult {
  synth: Synth
}

export const useSoundFont2Synth = (
  url: string | URL,
  audioContext: AudioContext
): UseSoundFont2SynthResult => {
  const [synthRef] = useState(() => ({
    current: createSoundFont2Synth(url, audioContext),
  }))

  return { synth: synthRef.current }
}
