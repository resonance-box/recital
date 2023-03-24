import { createId } from '../shared'
import { TrackImpl, type Track } from './track'

export const createEmptyTrack = (): Track => {
  const id = createId()
  return new TrackImpl(id)
}
