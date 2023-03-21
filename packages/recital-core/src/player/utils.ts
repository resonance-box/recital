import { type Note } from '../events'
import { type Ticks } from '../shared'
import { type NoteOff, type NoteOn } from './types'

const disassembleNote = (note: Readonly<Note>): [NoteOn, NoteOff] => {
  const noteOnEvent: NoteOn = {
    type: 'NoteOn',
    ticks: note.ticks,
    velocity: note.velocity,
    noteNumber: note.noteNumber,
  }

  const noteOffEvent: NoteOff = {
    type: 'NoteOff',
    ticks: note.ticks.add(note.durationTicks),
    noteNumber: note.noteNumber,
  }

  return [noteOnEvent, noteOffEvent]
}

export const disassembleNotes = (
  notes: Readonly<Note[]>
): Array<NoteOn | NoteOff> => {
  return notes.flatMap((event) => {
    return disassembleNote(event)
  })
}

export const filterEventsWithTicksRange = <T extends { ticks: Ticks }>(
  events: T[],
  startTicks: Ticks,
  endTicks: Ticks
): T[] =>
  events.filter(
    (event) =>
      event.ticks.value >= startTicks.value &&
      event.ticks.value < endTicks.value
  )
