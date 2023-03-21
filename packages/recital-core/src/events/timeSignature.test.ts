import { createId } from '@paralleldrive/cuid2'
import { describe, expect, it } from 'vitest'
import { Ticks } from '../shared'
import { TimeSignature } from './timeSignature'

describe('TimeSignature', () => {
  it('should not throw any errors when given valid parameters', () => {
    const validNumerators = [1, 3, 4, 5, 8, 12, 96]
    const validDenominators = [1, 2, 4, 8, 16, 32, 64]

    validNumerators.forEach((numerator) => {
      validDenominators.forEach((denominator) => {
        expect(
          () =>
            new TimeSignature(
              createId(),
              new Ticks(100),
              numerator,
              denominator
            )
        ).not.toThrow()
      })
    })
  })

  it('should throw an error if an invalid numerator is passed', () => {
    const invalidNumerators = [-10, 0, 97, 5.5]
    invalidNumerators.forEach((numerator) => {
      expect(
        () => new TimeSignature(createId(), new Ticks(100), numerator, 4)
      ).toThrowError('Invalid numerator.')
    })
  })

  it('should throw an error if an invalid denominator is passed', () => {
    const invalidDenominators = [-10, 0, 63, 65, 7.5]
    invalidDenominators.forEach((denominator) => {
      expect(
        () => new TimeSignature(createId(), new Ticks(100), 4, denominator)
      ).toThrowError('Invalid denominator.')
    })
  })

  it('should throw an error if a power-of-two denominator greater than the upper limit is passed', () => {
    const denomGreaterUpperLimit = 128

    expect(
      () =>
        new TimeSignature(createId(), new Ticks(100), 4, denomGreaterUpperLimit)
    ).toThrowError('Invalid denominator.')
  })
})
