import { SoundFont2Synth, type SoundFont2SynthOptions } from './soundFont2Synth'
import { type ISynth } from './synth'

export const createSoundFont2Synth = (
  url: string | URL,
  options?: SoundFont2SynthOptions
): ISynth => {
  return new SoundFont2Synth(url, options)
}
