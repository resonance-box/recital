import { createPlayer, type IPlayer } from './player'
import { createDefaultSong, type ISong } from './song'
import { type ISynth } from './synth'

export interface IRecital {
  readonly song: ISong
  player: IPlayer
  start: () => void
  stop: () => void
}

export interface RecitalOptions
  extends Partial<{
    song: ISong
    synth: ISynth
  }> {}

export class Recital implements IRecital {
  readonly song: ISong
  player: IPlayer

  constructor(options?: RecitalOptions) {
    this.song = options?.song ?? createDefaultSong()
    this.player = createPlayer(this.song, {
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
