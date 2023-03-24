import {
  createSoundFont2Synth,
  type SoundFont2SynthOptions,
  type Synth,
} from '@resonance-box/recital-core'
import { useState } from 'react'

export interface UseSoundFont2SynthResult {
  synth: Synth
}

export const useSoundFont2Synth = (
  url: string | URL,
  options?: SoundFont2SynthOptions
): UseSoundFont2SynthResult => {
  const [synthRef] = useState(() => ({
    current: createSoundFont2Synth(url, options),
  }))

  return { synth: synthRef.current }
}
