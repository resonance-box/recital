import { createId as createCuid } from '@paralleldrive/cuid2'

/**
 * Checks if a number is a power of two.
 *
 * @param {number} n The number to check.
 * @returns {boolean} True if `n` is a power of two; otherwise, false.
 */
export const isPowerOfTwo = (n: number): boolean => {
  return n !== 0 && (n & (n - 1)) === 0
}

export const createId = (): string => {
  return createCuid()
}
