import { createTimeSignature } from '../events'
import { Ticks } from '../shared'
import { createEmptyTrack } from '../track'
import { Song, type ISong } from './song'

export const createDefaultSong = (): ISong => {
  return new Song({
    tracks: [createEmptyTrack()],
    timeSignatures: [createTimeSignature(new Ticks(0), 4, 4)],
  })
}
