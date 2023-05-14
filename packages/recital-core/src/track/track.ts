import { immerable } from 'immer'
import { sortBy } from 'lodash'
import { type Note } from '../events'
import { createId, type IHasStringId } from '../shared'

export interface Track extends IHasStringId {
  readonly sortedNotes: Note[]
  findNote: (id: string) => Note | undefined
  addNote: (note: Omit<Note, 'type' | 'id'>) => void
  addNotes: (notes: Array<Omit<Note, 'type' | 'id'>>) => void
  updateNote: (
    id: string,
    partialNote: Partial<Omit<Note, 'type' | 'id'>>
  ) => void
  deleteNote: (id: string) => void
}

export interface TrackOptions
  extends Partial<{
    notes: Note[]
  }> {}

export class TrackImpl implements Track {
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

  private findNoteIndex(id: string): number | undefined {
    const index = this.notes.findIndex((note) => note.id === id)
    if (index === -1) {
      return undefined
    }
    return index
  }

  addNote(note: Omit<Note, 'type' | 'id'>): void {
    this.notes.push({
      type: 'Note',
      id: createId(),
      ...note,
    })
  }

  addNotes(notes: Array<Omit<Note, 'type' | 'id'>>): void {
    this.notes.push(
      ...notes.map((note) => ({
        type: 'Note' as const,
        id: createId(),
        ...note,
      }))
    )
  }

  updateNote(
    id: string,
    partialNote: Partial<Omit<Note, 'type' | 'id'>>
  ): void {
    const index = this.findNoteIndex(id)
    if (index === undefined) {
      throw new Error(`Note not found: ${id}`)
    }

    this.notes[index] = {
      ...this.notes[index],
      ...partialNote,
    }
  }

  deleteNote(id: string): void {
    const index = this.notes.findIndex((note) => note.id === id)
    if (index === -1) {
      throw new Error()
    }
    this.notes.splice(index, 1)
  }
}
