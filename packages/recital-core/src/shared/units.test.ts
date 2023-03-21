import { describe, expect, it } from 'vitest'
import { BPM, Milliseconds, PPQ, Seconds, Ticks } from './units'

describe('Ticks', () => {
  it('should create a valid Ticks object', () => {
    const ticks1 = new Ticks(0)
    expect(ticks1.value).toEqual(0)

    const ticks2 = new Ticks(480)
    expect(ticks2.value).toEqual(480)
  })

  it('should throw an error when creating invalid Ticks objects', () => {
    expect(() => new Ticks(-480)).toThrow('Invalid ticks.')
    expect(() => new Ticks(2.5)).toThrow('Invalid ticks.')
  })
})

describe('Seconds', () => {
  it('should create a valid Seconds object', () => {
    const seconds1 = new Seconds(0)
    expect(seconds1.value).toEqual(0)

    const seconds2 = new Seconds(3.25)
    expect(seconds2.value).toEqual(3.25)
  })

  it('should throw an error when creating invalid Seconds object', () => {
    expect(() => new Seconds(-3.25)).toThrow('Invalid seconds.')
  })

  it('should convert to Milliseconds correctly', () => {
    const seconds = new Seconds(3.25)
    const milliseconds = seconds.toMilliseconds()
    expect(milliseconds.value).toEqual(3250)
  })
})

describe('Milliseconds', () => {
  it('should create a valid Milliseconds object', () => {
    const milliseconds = new Milliseconds(3250)
    expect(milliseconds.value).toEqual(3250)
  })

  it('should throw an error when creating invalid Milliseconds object', () => {
    expect(() => new Milliseconds(-3250)).toThrow('Invalid milliseconds.')
  })

  it('should convert to Seconds correctly', () => {
    const milliseconds = new Milliseconds(3250)
    const seconds = milliseconds.toSeconds()
    expect(seconds.value).toEqual(3.25)
  })
})

describe('PPQ', () => {
  it('should create valid ppq', () => {
    const ppq1 = new PPQ(1)
    expect(ppq1.value).toBe(1)

    const ppq2 = new PPQ(480)
    expect(ppq2.value).toBe(480)
  })

  it('should throw an error for invalid ppq', () => {
    expect(() => new PPQ(0)).toThrowError('Invalid ppq.')
    expect(() => new PPQ(-480)).toThrowError('Invalid ppq.')
    expect(() => new PPQ(480.5)).toThrowError('Invalid ppq.')
  })
})

describe('BPM', () => {
  it('should create valid bpm', () => {
    const bpm1 = new BPM(1)
    expect(bpm1.value).toBe(1)

    const bpm2 = new BPM(480)
    expect(bpm2.value).toBe(480)
  })

  it('should throw an error for invalid bpm', () => {
    expect(() => new BPM(0)).toThrowError('Invalid bpm.')
    expect(() => new BPM(-480)).toThrowError('Invalid bpm.')
    expect(() => new BPM(480.5)).toThrowError('Invalid bpm.')
  })
})
