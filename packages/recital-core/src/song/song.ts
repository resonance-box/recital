import { immerable } from 'immer'
import { type TimeSignature } from '../events'
import { PPQ, Ticks } from '../shared'
import { type ITrack } from '../track'

export const DEFAULT_PPQ = 480

export interface ISong {
  readonly ppq: PPQ
  readonly timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks
  getTracks: () => ITrack[]
  getTrack: (id: string) => ITrack
  findTrack: (id: string) => ITrack | undefined
  addTrack: (track: ITrack) => void
  deleteTrack: (id: string) => void
  addTimeSignature: (timeSignature: TimeSignature) => void
}

type SongOptions = Partial<{
  ppq: PPQ
  tracks: ITrack[]
  timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks
}>

export class Song implements ISong {
  [immerable] = true

  readonly ppq: PPQ
  readonly tracks: ITrack[]
  readonly timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks

  constructor(options?: SongOptions) {
    this.ppq = options?.ppq ?? new PPQ(DEFAULT_PPQ)
    this.tracks = options?.tracks ?? []
    this.timeSignatures = options?.timeSignatures ?? []
    this.endOfSongTicks = options?.endOfSongTicks ?? new Ticks(0)
  }

  getTracks(): ITrack[] {
    return this.tracks
  }

  findTrack(id: string): ITrack | undefined {
    return this.tracks.find((track) => track.id === id)
  }

  getTrack(id: string): ITrack {
    const track = this.findTrack(id)
    if (track === undefined) {
      throw new Error()
    }
    return track
  }

  addTrack(track: ITrack): void {
    this.tracks.push(track)
  }

  deleteTrack(id: string): void {
    const index = this.tracks.findIndex((track) => track.id === id)
    if (index === -1) {
      throw new Error()
    }
    this.tracks.splice(index, 1)
  }

  addTimeSignature(timeSignature: TimeSignature): void {
    this.timeSignatures.push(timeSignature)
  }
}
