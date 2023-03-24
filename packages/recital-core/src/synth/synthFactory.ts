import { SoundFont2Synth, type SoundFont2SynthOptions } from './soundFont2Synth'
import { type Synth } from './synth'

export const createSoundFont2Synth = (
  url: string | URL,
  options?: Partial<SoundFont2SynthOptions>
): Synth => {
  return new SoundFont2Synth(url, options)
}
