import { Track, type ITrack } from './track'

export const createEmptyTrack = (): ITrack => {
  return new Track()
}
