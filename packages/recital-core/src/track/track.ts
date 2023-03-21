import { sortBy } from 'lodash'
import { type Note } from '../events'

export interface ITrack {
  readonly sortedNotes: Note[]
  addNote: (note: Note) => void
  addNotes: (notes: Note[]) => void
}

interface TrackOptions {
  notes: Note[]
}

export class Track implements ITrack {
  private readonly notes: Note[]

  constructor(options?: TrackOptions) {
    this.notes = options?.notes ?? []
  }

  get sortedNotes(): Note[] {
    return sortBy(this.notes, [
      (n) => n.ticks.value,
      (n) => n.durationTicks.value,
      (n) => n.noteNumber.value,
      (n) => n.velocity.value,
      (n) => n.id,
    ])
  }

  addNote(note: Note): void {
    this.notes.push(note)
  }

  addNotes(notes: Note[]): void {
    this.notes.push(...notes)
  }
}
