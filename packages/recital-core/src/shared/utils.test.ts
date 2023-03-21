import { describe, expect, it } from 'vitest'
import { isPowerOfTwo } from './utils'

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
