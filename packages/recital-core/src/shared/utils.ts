import { createId as createCuid } from '@paralleldrive/cuid2'
import { NoteNumber } from '../events'
import { Seconds, Ticks, type BPM, type Milliseconds, type PPQ } from './units'

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

/**
 * Convert a MIDI note number into a pitch.
 */
export const noteNumberToPitch = (noteNumber: NoteNumber): string => {
  const octave = Math.floor(noteNumber.value / 12) - 1
  return noteNumberToPitchClass(noteNumber) + octave.toString()
}

/**
 * Convert a MIDI note number to a pitch class (just the pitch no octave).
 */
export const noteNumberToPitchClass = (noteNumber: NoteNumber): string => {
  const scaleIndexToNote = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]
  const note = noteNumber.value % 12
  return scaleIndexToNote[note]
}

/**
 * Convert a pitch class to a MIDI note number.
 */
export const pitchClassToNoteNumber = (pitch: string): NoteNumber => {
  const scaleIndexToNote = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]
  return new NoteNumber(scaleIndexToNote.indexOf(pitch))
}

/**
 * Convert a pitch to a MIDI number.
 */
export const pitchToNoteNumber: (note: string) => NoteNumber = (() => {
  const regexp = /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i
  const noteToScaleIndex = {
    cbb: -2,
    cb: -1,
    c: 0,
    'c#': 1,
    cx: 2,
    dbb: 0,
    db: 1,
    d: 2,
    'd#': 3,
    dx: 4,
    ebb: 2,
    eb: 3,
    e: 4,
    'e#': 5,
    ex: 6,
    fbb: 3,
    fb: 4,
    f: 5,
    'f#': 6,
    fx: 7,
    gbb: 5,
    gb: 6,
    g: 7,
    'g#': 8,
    gx: 9,
    abb: 7,
    ab: 8,
    a: 9,
    'a#': 10,
    ax: 11,
    bbb: 9,
    bb: 10,
    b: 11,
    'b#': 12,
    bx: 13,
  }

  return (note) => {
    const split = regexp.exec(note) as RegExpExecArray
    const pitch = split[1]
    const octave = split[2]
    const index =
      noteToScaleIndex[pitch.toLowerCase() as keyof typeof noteToScaleIndex]
    return new NoteNumber(index + (parseInt(octave, 10) + 1) * 12)
  }
})()

/**
 * Convert ticks into seconds.
 */
export const ticksToSeconds = (ticks: Ticks, bpm: BPM, ppq: PPQ): Seconds => {
  return new Seconds((ticks.value * (60 / bpm.value)) / ppq.value)
}

/**
 * Convert ticks into mill seconds.
 */
export const ticksToMilliseconds = (
  ticks: Ticks,
  bpm: BPM,
  ppq: PPQ
): Milliseconds => {
  return ticksToSeconds(ticks, bpm, ppq).toMilliseconds()
}

/**
 * Convert seconds to ticks.
 */
export const secondsToTicks = (seconds: Seconds, bpm: BPM, ppq: PPQ): Ticks => {
  return new Ticks(Math.floor((seconds.value / (60 / bpm.value)) * ppq.value))
}

/**
 * Convert mill seconds to ticks.
 */
export const millisecondsToTicks = (
  milliseconds: Milliseconds,
  bpm: BPM,
  ppq: PPQ
): Ticks => {
  return secondsToTicks(milliseconds.toSeconds(), bpm, ppq)
}
