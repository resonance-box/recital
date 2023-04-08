import { createSoundFont2Synth, type Synth } from '@resonance-box/recital-core'
import { useState } from 'react'

export interface UseSynthResult {
  synth: Synth
  initialized: boolean
}

export const useSoundFont2Synth = (
  url: string | URL,
  audioContext: AudioContext
): UseSynthResult => {
  const [initialized, setInitialized] = useState(false)
  const [synthRef] = useState(() => ({
    current: createSoundFont2Synth(url, audioContext, {
      onInitialized: () => {
        setInitialized(true)
      },
    }),
  }))

  return { synth: synthRef.current, initialized }
}
