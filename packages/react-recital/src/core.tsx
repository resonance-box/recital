import {
  createRecital,
  createSoundFont2Synth,
  type IRecital,
  type ISong,
  type ISynth,
  type RecitalOptions,
  type SoundFont2SynthOptions,
} from '@resonance-box/recital-core'
import { useState } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { type DeepReadonly } from './types'

export interface IReactRecital extends IRecital {
  getSongState: () => DeepReadonly<ISong>
}

export const useRecital = (options?: RecitalOptions): IReactRecital => {
  const [recitalRef] = useState(() => ({
    current: createRecital(options) as IReactRecital,
  }))

  const [songRef] = useState(() => ({
    current: proxy(recitalRef.current.song),
  }))

  const [recitalProxyRef] = useState(() => ({
    current: proxy(recitalRef.current),
  }))

  const songSnap = useSnapshot(songRef.current)
  const recitalSnap = useSnapshot(recitalProxyRef.current)
  recitalRef.current.getSongState = () => songSnap

  console.log('recitalSnap:', recitalSnap)

  return recitalRef.current
}

export interface UseSoundFont2SynthResult {
  synth: ISynth
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
