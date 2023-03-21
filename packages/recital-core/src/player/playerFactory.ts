import { Player, type IPlayer, type PlayerOptions } from './player'

export const createPlayer = (options?: Partial<PlayerOptions>): IPlayer => {
  return new Player(options)
}
