import { type ISong } from '../song'
import { Player, type IPlayer, type PlayerOptions } from './player'

export const createPlayer = (song: ISong, options?: PlayerOptions): IPlayer => {
  return new Player(song, options)
}
