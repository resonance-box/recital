import { createPlayer, type IPlayer } from './player'
import { createDefaultSong, type ISong } from './song'
import { type ISynth } from './synth'

export interface IRecital {
  player: IPlayer
  getSong: () => ISong
  start: () => void
  stop: () => void
}

export interface RecitalOptions
  extends Partial<{
    song: ISong
    synth: ISynth
  }> {}

export class Recital implements IRecital {
  player: IPlayer

  constructor(options?: RecitalOptions) {
    const song = options?.song ?? createDefaultSong()
    this.player = createPlayer(song, {
      synth: options?.synth,
    })
  }

  getSong(): ISong {
    return this.player.song
  }

  start(): void {
    this.player.start()
  }

  stop(): void {
    this.player.stop()
  }
}
