import { type Ticks } from '../shared'
import { type IEvent } from './shared'

export class NoteNumber {
  readonly value: number

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 0 || value > 127) {
      throw new Error(
        'Invalid note number. Please pass an integer value between 0 and 127.'
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
        'Invalid velocity. Please pass an integer value between 0 and 127.'
      )
    }

    this.value = value
  }
}

export class Note implements IEvent<'Note'> {
  readonly type = 'Note'
  readonly id: string
  readonly ticks: Ticks
  readonly durationTicks: Ticks
  readonly noteNumber: NoteNumber
  readonly velocity: Velocity

  constructor(
    id: string,
    ticks: Ticks,
    durationTicks: Ticks,
    noteNumber: NoteNumber,
    velocity: Velocity
  ) {
    this.id = id
    this.ticks = ticks
    this.durationTicks = durationTicks
    this.noteNumber = noteNumber
    this.velocity = velocity
  }
}
