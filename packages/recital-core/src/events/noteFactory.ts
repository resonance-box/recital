import { createId, type Ticks } from '../shared'
import { Note, type NoteNumber, type Velocity } from './note'

export const createNote = (
  ticks: Ticks,
  durationTicks: Ticks,
  noteNumber: NoteNumber,
  velocity: Velocity
): Note => {
  const id = createId()
  return new Note(id, ticks, durationTicks, noteNumber, velocity)
}
