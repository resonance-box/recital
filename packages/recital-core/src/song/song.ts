import { type TimeSignature } from '../events'
import { PPQ, Ticks } from '../shared'
import { type ITrack } from '../track'

export const DEFAULT_PPQ = 480

export interface ISong {
  readonly ppq: PPQ
  readonly tracks: ITrack[]
  readonly timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks
  addTrack: (track: ITrack) => void
  addTimeSignature: (timeSignature: TimeSignature) => void
}

interface SongOptions {
  ppq: PPQ
  tracks: ITrack[]
  timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks
}

export class Song implements ISong {
  readonly ppq: PPQ
  readonly tracks: ITrack[]
  readonly timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks

  constructor(options?: Partial<SongOptions>) {
    this.ppq = options?.ppq ?? new PPQ(DEFAULT_PPQ)
    this.tracks = options?.tracks ?? []
    this.timeSignatures = options?.timeSignatures ?? []
    this.endOfSongTicks = options?.endOfSongTicks ?? new Ticks(0)
  }

  addTrack(track: ITrack): void {
    this.tracks.push(track)
  }

  addTimeSignature(timeSignature: TimeSignature): void {
    this.timeSignatures.push(timeSignature)
  }
}
