import { isPowerOfTwo, type IHasStringId, type Ticks } from '../shared'
import { type Event } from './shared'

const MIN_TIME_SIGNATURE_NUMERATOR = 1
const MAX_TIME_SIGNATURE_NUMERATOR = 96

const MIN_TIME_SIGNATURE_DENOMINATOR = 1
const MAX_TIME_SIGNATURE_DENOMINATOR = 64

export class TimeSignature implements Event<'TimeSignature'>, IHasStringId {
  readonly type = 'TimeSignature'
  readonly id: string
  readonly ticks: Ticks
  readonly numerator: number
  readonly denominator: number

  constructor(
    id: string,
    ticks: Ticks,
    numerator: number,
    denominator: number
  ) {
    if (
      !Number.isInteger(numerator) ||
      numerator < MIN_TIME_SIGNATURE_NUMERATOR ||
      numerator > MAX_TIME_SIGNATURE_NUMERATOR
    ) {
      throw new Error(
        `Invalid numerator. Please pass an integer value between ${MIN_TIME_SIGNATURE_NUMERATOR} and ${MAX_TIME_SIGNATURE_NUMERATOR}.`
      )
    }

    if (
      !Number.isInteger(denominator) ||
      denominator < MIN_TIME_SIGNATURE_DENOMINATOR ||
      denominator > MAX_TIME_SIGNATURE_DENOMINATOR ||
      !isPowerOfTwo(denominator)
    ) {
      throw new Error(
        `Invalid denominator. Please pass an integer value between ${MIN_TIME_SIGNATURE_DENOMINATOR} and ${MAX_TIME_SIGNATURE_DENOMINATOR} that is a power of 2.`
      )
    }

    this.id = id
    this.ticks = ticks
    this.numerator = numerator
    this.denominator = denominator
  }
}
