import { BPM, createId, Ticks } from '../shared'
import { Tempo } from './tempo'

export const createTempo = (ticks: number, bpm: number): Tempo => {
  return new Tempo(createId(), new Ticks(ticks), new BPM(bpm))
}
