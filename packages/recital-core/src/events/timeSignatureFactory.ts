import { createId, type Ticks } from '../shared'
import { TimeSignature, type ITimeSignature } from './timeSignature'

export const createTimeSignature = (
  ticks: Ticks,
  numerator: number,
  denominator: number
): ITimeSignature => {
  const id = createId()
  return new TimeSignature(id, ticks, numerator, denominator)
}
