import { SoundFont2Synth } from './soundFont2Synth'
import { type Synth } from './synth'

export const createSoundFont2Synth = (
  url: string | URL,
  audioContext: AudioContext
): Synth => {
  return new SoundFont2Synth(url, audioContext)
}
