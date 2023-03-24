import { createId, Ticks } from '../shared'
import { TimeSignature } from './timeSignature'

export const createTimeSignature = (
  ticks: number,
  numerator: number,
  denominator: number
): TimeSignature => {
  return new TimeSignature(createId(), new Ticks(ticks), numerator, denominator)
}
