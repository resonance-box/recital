import { immerable } from 'immer'
import { sortBy } from 'lodash'
import { type Note } from '../events'
import { type IHasStringId } from '../shared'

export interface ITrack extends IHasStringId {
  readonly sortedNotes: Note[]
  findNote: (id: string) => Note | undefined
  addNote: (note: Note) => void
  addNotes: (notes: Note[]) => void
}

interface TrackOptions
  extends Partial<{
    notes: Note[]
  }> {}

export class Track implements ITrack {
  [immerable] = true

  readonly id: string
  private readonly notes: Note[]

  constructor(id: string, options?: TrackOptions) {
    this.id = id
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

  findNote(id: string): Note | undefined {
    return this.notes.find((note) => note.id === id)
  }

  addNote(note: Note): void {
    this.notes.push(note)
  }

  addNotes(notes: Note[]): void {
    this.notes.push(...notes)
  }
}
