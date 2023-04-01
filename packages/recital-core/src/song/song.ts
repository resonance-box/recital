import { immerable } from 'immer'
import { type TimeSignature } from '../events'
import { PPQ, Ticks } from '../shared'
import { type Track } from '../track'

export const DEFAULT_PPQ = 480

export interface Song {
  ppq: PPQ
  readonly timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks
  addTimeSignature: (timeSignature: TimeSignature) => void
  getTracks: () => Track[]
  getTrack: (id: string) => Track
  findTrack: (id: string) => Track | undefined
  addTrack: (track: Track) => void
  deleteTrack: (id: string) => void
}

export interface SongOptions
  extends Partial<{
    ppq: PPQ
    tracks: Track[]
    timeSignatures: TimeSignature[]
    endOfSongTicks: Ticks
  }> {}

export class SongImpl implements Song {
  [immerable] = true

  ppq: PPQ
  readonly tracks: Track[]
  readonly timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks

  constructor(options?: SongOptions) {
    this.ppq = options?.ppq ?? new PPQ(DEFAULT_PPQ)
    this.tracks = options?.tracks ?? []
    this.timeSignatures = options?.timeSignatures ?? []
    this.endOfSongTicks = options?.endOfSongTicks ?? new Ticks(0)
  }

  addTimeSignature(timeSignature: TimeSignature): void {
    this.timeSignatures.push(timeSignature)
  }

  getTracks(): Track[] {
    return this.tracks
  }

  findTrack(id: string): Track | undefined {
    return this.tracks.find((track) => track.id === id)
  }

  getTrack(id: string): Track {
    const track = this.findTrack(id)
    if (track === undefined) {
      throw new Error()
    }
    return track
  }

  addTrack(track: Track): void {
    this.tracks.push(track)
  }

  deleteTrack(id: string): void {
    const index = this.tracks.findIndex((track) => track.id === id)
    if (index === -1) {
      throw new Error()
    }
    this.tracks.splice(index, 1)
  }
}
