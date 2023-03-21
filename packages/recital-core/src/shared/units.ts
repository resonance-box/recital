/**
 * Ticks are the basic subunit of the Transport. They are
 * the smallest unit of time that the Transport supports.
 */
export class Ticks {
  readonly value: number

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error('Invalid ticks. Please pass an positive integer value.')
    }

    this.value = value
  }
}

/**
 * A number representing a time in seconds
 */
export class Seconds {
  readonly value: number

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Invalid seconds. Please pass an positive value.')
    }

    this.value = value
  }

  toMilliseconds(): Milliseconds {
    return new Milliseconds(this.value * 1000)
  }
}

/**
 * One millisecond is a thousandth of a second.
 */
export class Milliseconds {
  readonly value: number

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Invalid milliseconds. Please pass an positive value.')
    }

    this.value = value
  }

  toSeconds(): Seconds {
    return new Seconds(this.value / 1000)
  }
}

/**
 * Pulses per quarter (note)
 */
export class PPQ {
  readonly value: number

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 1) {
      throw new Error(
        'Invalid ppq. Please pass an integer greater than or equal to 1.'
      )
    }

    this.value = value
  }
}
