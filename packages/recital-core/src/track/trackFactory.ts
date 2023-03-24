import { createId } from '../shared'
import { Track, type ITrack } from './track'

export const createEmptyTrack = (): ITrack => {
  const id = createId()
  return new Track(id)
}
