import { type IEvent, type NoteNumber, type Velocity } from '../events'
import { type Ticks } from '../shared'

export interface NoteOn extends IEvent<'NoteOn'> {
  type: 'NoteOn'
  ticks: Ticks
  noteNumber: NoteNumber
  velocity: Velocity
}

export interface NoteOff extends IEvent<'NoteOff'> {
  type: 'NoteOff'
  ticks: Ticks
  noteNumber: NoteNumber
}
