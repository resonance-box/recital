import { type Song } from '../song'
import { PlayerImpl, type Player, type PlayerOptions } from './player'

export const createPlayer = (song: Song, options?: PlayerOptions): Player => {
  return new PlayerImpl(song, options)
}
