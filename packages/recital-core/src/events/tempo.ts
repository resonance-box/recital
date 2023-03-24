import { type BPM, type IHasStringId, type Ticks } from '../shared'
import { type Event } from './shared'

export class Tempo implements Event<'Tempo'>, IHasStringId {
  readonly type = 'Tempo'
  readonly id: string
  readonly ticks: Ticks
  readonly bpm: BPM

  constructor(id: string, ticks: Ticks, bpm: BPM) {
    this.id = id
    this.ticks = ticks
    this.bpm = bpm
  }
}
