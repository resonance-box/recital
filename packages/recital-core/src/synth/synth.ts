import { type NoteNumber, type Velocity } from '../events'
import { type Seconds } from '../shared'

export interface Synth {
  initialized: boolean
  noteOn: (
    noteNumber: NoteNumber,
    velocity: Velocity,
    delayTime: Seconds
  ) => void
  noteOff: (noteNumber: NoteNumber, delayTime: Seconds) => void
}
