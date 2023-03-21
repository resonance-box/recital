import { type IPlayer } from './player'
import { createPlayer } from './player/playerFactory'
import { type ISong } from './song'
import { type ISynth } from './synth'

export interface IRecital {
  start: () => void
  stop: () => void
}

export interface RecitalOptions {
  song: ISong
  synth: ISynth
}

export class Recital implements IRecital {
  private readonly player: IPlayer

  constructor(options?: Partial<RecitalOptions>) {
    this.player = createPlayer({
      song: options?.song,
      synth: options?.synth,
    })
  }

  start(): void {
    this.player.start()
  }

  stop(): void {
    this.player.stop()
  }
}
