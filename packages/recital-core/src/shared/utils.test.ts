import { describe, expect, it } from 'vitest'
import { BPM, PPQ, Seconds, Ticks } from './units'
import { isPowerOfTwo, secondsToTicks, ticksToSeconds } from './utils'

describe('isPowerOfTwo', () => {
  it('should return true for powers of two', () => {
    expect(isPowerOfTwo(1)).toBe(true)
    expect(isPowerOfTwo(2)).toBe(true)
    expect(isPowerOfTwo(4)).toBe(true)
    expect(isPowerOfTwo(8)).toBe(true)
    expect(isPowerOfTwo(16)).toBe(true)
    expect(isPowerOfTwo(32)).toBe(true)
    expect(isPowerOfTwo(64)).toBe(true)
  })

  it('should return false for non-powers of two', () => {
    expect(isPowerOfTwo(0)).toBe(false)
    expect(isPowerOfTwo(3)).toBe(false)
    expect(isPowerOfTwo(5)).toBe(false)
    expect(isPowerOfTwo(7)).toBe(false)
    expect(isPowerOfTwo(48)).toBe(false)
  })
})

describe('ticksToSeconds', () => {
  it('should convert ticks to seconds correctly', () => {
    const seconds = ticksToSeconds(new Ticks(1920), new BPM(120), new PPQ(480))
    expect(seconds.value).toBeCloseTo(2, 5)
  })

  it('should return 0 if ticks is 0', () => {
    const seconds = ticksToSeconds(new Ticks(0), new BPM(120), new PPQ(480))
    expect(seconds.value).toBe(0)
  })

  it('should handle a large number of ticks', () => {
    const seconds = ticksToSeconds(new Ticks(576000), new BPM(60), new PPQ(960))
    expect(seconds.value).toBeCloseTo(600, 5)
  })

  it('should handle ticks with fractional values', () => {
    const seconds = ticksToSeconds(new Ticks(300), new BPM(120), new PPQ(480))
    expect(seconds.value).toBeCloseTo(0.3125, 5)
  })
})

describe('secondsToTicks', () => {
  it('should convert seconds to ticks correctly', () => {
    const ticks = secondsToTicks(new Seconds(2), new BPM(120), new PPQ(480))
    expect(ticks.value).toBe(1920)
  })

  it('should round down to the nearest integer', () => {
    const ticks = secondsToTicks(new Seconds(1.5), new BPM(100), new PPQ(240))
    expect(ticks.value).toBe(600)
  })

  it('should return 0 if seconds is 0', () => {
    const ticks = secondsToTicks(new Seconds(0), new BPM(120), new PPQ(480))
    expect(ticks.value).toBe(0)
  })

  it('should handle a large number of seconds', () => {
    const ticks = secondsToTicks(new Seconds(600), new BPM(60), new PPQ(960))
    expect(ticks.value).toBe(576000)
  })
})
