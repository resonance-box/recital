import { createId } from '@paralleldrive/cuid2'
import { describe, expect, it } from 'vitest'
import { Ticks } from '../shared'
import { Note, NoteNumber, Velocity } from './note'

describe('NoteNumber', () => {
  it('should create valid note numbers', () => {
    const noteNumber1 = new NoteNumber(1)
    expect(noteNumber1.value).toBe(1)

    const noteNumber2 = new NoteNumber(127)
    expect(noteNumber2.value).toBe(127)
  })

  it('should throw an error for invalid note numbers', () => {
    expect(() => new NoteNumber(60.5)).toThrowError('Invalid note number.')
    expect(() => new NoteNumber(-1)).toThrowError('Invalid note number.')
    expect(() => new NoteNumber(128)).toThrowError('Invalid note number.')
  })
})

describe('Velocity', () => {
  it('should create valid velocities', () => {
    const velocity1 = new Velocity(1)
    expect(velocity1.value).toBe(1)

    const velocity2 = new Velocity(127)
    expect(velocity2.value).toBe(127)
  })

  it('should throw an error for invalid velocities', () => {
    expect(() => new Velocity(60.5)).toThrowError('Invalid velocity.')
    expect(() => new Velocity(-1)).toThrowError('Invalid velocity.')
    expect(() => new Velocity(128)).toThrowError('Invalid velocity.')
  })
})

describe('Note class', () => {
  it('instantiates correctly', () => {
    const id = createId()

    const note = new Note(
      id,
      new Ticks(100),
      new Ticks(200),
      new NoteNumber(60),
      new Velocity(100)
    )

    expect(note.id).toEqual(id)
    expect(note.ticks.value).toEqual(100)
    expect(note.durationTicks.value).toEqual(200)
    expect(note.noteNumber.value).toEqual(60)
    expect(note.velocity.value).toEqual(100)
  })
})
