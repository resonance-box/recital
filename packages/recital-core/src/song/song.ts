import produce from 'immer'
import { type Note, type TimeSignature } from '../events'
import { PPQ, Ticks } from '../shared'
import { type ITrack } from '../track'

export const DEFAULT_PPQ = 480

export interface ISong {
  readonly ppq: PPQ
  readonly tracks: ITrack[]
  readonly timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks
  addTrack: (track: ITrack) => void
  addNote: (note: Note, trackIndex: number) => void
  addTimeSignature: (timeSignature: TimeSignature) => void
  immerAddTrack: (track: ITrack) => ISong
}

type SongOptions = Partial<{
  ppq: PPQ
  tracks: ITrack[]
  timeSignatures: TimeSignature[]
  endOfSongTicks: Ticks
}>

export class Song implements ISong {
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

  addTrack(track: ITrack): void {
    this.tracks.push(track)
  }

  addNote(note: Note, trackIndex: number): void {
    this.tracks[trackIndex].addNote(note)
  }

  addTimeSignature(timeSignature: TimeSignature): void {
    this.timeSignatures.push(timeSignature)
  }

  immerAddTrack(track: ITrack): ISong {
    return produce(this, (draft) => {
      draft.tracks.push(track)
    })
  }
}
