import {
  createNote,
  createTimeSignature,
  NoteNumber,
  Velocity,
} from '../events'
import { Ticks } from '../shared'
import { createEmptyTrack } from '../track'
import { DEFAULT_PPQ, Song, type ISong } from './song'

export const createDefaultSong = (): ISong => {
  return new Song({
    tracks: [createEmptyTrack()],
    timeSignatures: [createTimeSignature(new Ticks(0), 4, 4)],
  })
}

export const createTwinkleTwinkleSong = (): ISong => {
  const song = createDefaultSong()
  const ppq = DEFAULT_PPQ
  const velocity = 100

  const notes = [
    { ticks: 0, durationTicks: 1 * ppq, noteNumber: 60, velocity },
    { ticks: 1 * ppq, durationTicks: 1 * ppq, noteNumber: 60, velocity },
    { ticks: 2 * ppq, durationTicks: 1 * ppq, noteNumber: 67, velocity },
    { ticks: 3 * ppq, durationTicks: 1 * ppq, noteNumber: 67, velocity },
    { ticks: 4 * ppq, durationTicks: 1 * ppq, noteNumber: 69, velocity },
    { ticks: 5 * ppq, durationTicks: 1 * ppq, noteNumber: 69, velocity },
    { ticks: 6 * ppq, durationTicks: 2 * ppq, noteNumber: 67, velocity },

    { ticks: 8 * ppq, durationTicks: 1 * ppq, noteNumber: 65, velocity },
    { ticks: 9 * ppq, durationTicks: 1 * ppq, noteNumber: 65, velocity },
    { ticks: 10 * ppq, durationTicks: 1 * ppq, noteNumber: 64, velocity },
    { ticks: 11 * ppq, durationTicks: 1 * ppq, noteNumber: 64, velocity },
    { ticks: 12 * ppq, durationTicks: 1 * ppq, noteNumber: 62, velocity },
    { ticks: 13 * ppq, durationTicks: 1 * ppq, noteNumber: 62, velocity },
    { ticks: 14 * ppq, durationTicks: 2 * ppq, noteNumber: 60, velocity },
  ]

  const track = song.tracks[0]
  notes.forEach(({ ticks, durationTicks, noteNumber, velocity }) => {
    track.addNote(
      createNote(
        new Ticks(ticks),
        new Ticks(durationTicks),
        new NoteNumber(noteNumber),
        new Velocity(velocity)
      )
    )
  })

  song.addTrack(track)
  return song
}
