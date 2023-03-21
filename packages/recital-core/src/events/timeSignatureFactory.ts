import { createId, type Ticks } from '../shared'
import { TimeSignature } from './timeSignature'

export const createTimeSignature = (
  ticks: Ticks,
  numerator: number,
  denominator: number
): TimeSignature => {
  const id = createId()
  return new TimeSignature(id, ticks, numerator, denominator)
}
