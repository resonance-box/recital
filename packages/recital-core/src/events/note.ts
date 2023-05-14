import { type IHasStringId, type Ticks } from '../shared'
import { type Event } from './shared'

export class NoteNumber {
  readonly value: number

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 0 || value > 127) {
      throw new Error(
        `Invalid note number: ${value}. Please pass an integer value between 0 and 127.`
      )
    }

    this.value = value
  }
}

export class Velocity {
  readonly value: number

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 0 || value > 127) {
      throw new Error(
        `Invalid velocity: ${value}. Please pass an integer value between 0 and 127.`
      )
    }

    this.value = value
  }
}

export interface Note extends Event<'Note'>, IHasStringId {
  ticks: Ticks
  durationTicks: Ticks
  noteNumber: NoteNumber
  velocity: Velocity
}
