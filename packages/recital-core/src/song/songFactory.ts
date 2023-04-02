import { Midi } from '@tonejs/midi'
import { createNote, createTimeSignature } from '../events'
import { PPQ } from '../shared'
import { createEmptyTrack } from '../track'
import { DEFAULT_PPQ, SongImpl, type Song } from './song'

export const createEmptySong = (): Song => {
  return new SongImpl()
}

export const createDefaultSong = (): Song => {
  const track = createEmptyTrack()
  return new SongImpl({
    tracks: [track],
    timeSignatures: [createTimeSignature(0, 4, 4)],
  })
}

const createSongFromMidi = (midi: Midi): Song => {
  const song = createEmptySong()

  song.ppq = new PPQ(midi.header.ppq)

  for (const midiTrack of midi.tracks) {
    const track = createEmptyTrack()

    midiTrack.notes.forEach((note) => {
      track.addNote(
        createNote(
          note.ticks,
          note.durationTicks,
          note.midi,
          note.velocity * 127
        )
      )
    })

    song.addTrack(track)
  }

  return song
}

export const createSongFromMidiUrl = async (
  url: string | URL
): Promise<Song> => {
  const midi = await Midi.fromUrl(url.toString())
  return createSongFromMidi(midi)
}

export const createSongFromMidiArrayBuffer = (
  arrayBuffer: ArrayLike<number> | ArrayBuffer
): Song => {
  const midi = new Midi(arrayBuffer)
  return createSongFromMidi(midi)
}

export const createTwinkleTwinkleSong = (): Song => {
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

  const track = song.getTracks()[0]
  notes.forEach(({ ticks, durationTicks, noteNumber, velocity }) => {
    track.addNote(createNote(ticks, durationTicks, noteNumber, velocity))
  })

  return song
}
