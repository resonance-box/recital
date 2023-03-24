import { createId, Ticks } from '../shared'
import { Note, NoteNumber, Velocity } from './note'

export const createNote = (
  ticks: number,
  durationTicks: number,
  noteNumber: number,
  velocity: number
): Note => {
  return new Note(
    createId(),
    new Ticks(ticks),
    new Ticks(durationTicks),
    new NoteNumber(noteNumber),
    new Velocity(velocity)
  )
}
