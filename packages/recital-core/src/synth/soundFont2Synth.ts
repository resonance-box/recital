import {
  createSoundFont2SynthNode,
  type SoundFont2SynthNode,
} from 'sf2-synth-audio-worklet'
import { type NoteNumber, type Velocity } from '../events'
import { type Seconds } from '../shared'
import { type ISynth } from './synth'

interface SF2SynthOptions {
  audioContext: AudioContext
}

export class SoundFont2Synth implements ISynth {
  setupCompleted: boolean
  private node?: SoundFont2SynthNode

  constructor(url: string | URL, options?: SF2SynthOptions) {
    this.setupCompleted = false
    const audioContext = options?.audioContext ?? new AudioContext()
    createSoundFont2SynthNode(audioContext, url)
      .then((node) => {
        node.connect(audioContext.destination)
        this.node = node
        this.setupCompleted = true
      })
      .catch((err) => {
        throw new Error(
          'And error occurred while creating SoundFont2Synth:',
          err
        )
      })
  }

  noteOn(noteNumber: NoteNumber, velocity: Velocity, delayTime: Seconds): void {
    if (!this.setupCompleted || this.node === undefined) {
      console.warn(
        'The synthesizer has not been set up yet. Please wait for the synthesizer setup to complete before calling the noteOn function.'
      )
    }

    this.node?.noteOn(0, noteNumber.value, velocity.value, delayTime.value)
  }

  noteOff(noteNumber: NoteNumber, delayTime: Seconds): void {
    if (!this.setupCompleted || this.node === undefined) {
      console.warn(
        'The synthesizer has not been set up yet. Please wait for the synthesizer setup to complete before calling the noteOff function.'
      )
    }

    this.node?.noteOff(0, noteNumber.value, delayTime.value)
  }
}
