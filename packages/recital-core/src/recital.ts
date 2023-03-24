import { type Note } from './events'
import { createPlayer, type IPlayer } from './player'
import { createDefaultSong, type ISong } from './song'
import { type ISynth } from './synth'
import { type ITrack } from './track'

export interface IRecital {
  readonly player: IPlayer
  start: () => void
  stop: () => void
  getSong: () => ISong
  setSong: (song: ISong) => void
  getTracks: () => ITrack[]
  findTrack: (id: string) => ITrack | undefined
  getTrack: (id: string) => ITrack
  addTrack: (track: ITrack) => void
  getNotes: (trackId: string) => Note[]
  findNote: (trackId: string, noteId: string) => Note | undefined
  addNote: (trackId: string, note: Note) => void
  addNotes: (trackId: string, notes: Note[]) => void
}

export interface RecitalOptions
  extends Partial<{
    song: ISong
    synth: ISynth
  }> {}

export class Recital implements IRecital {
  readonly player: IPlayer

  constructor(options?: RecitalOptions) {
    const song = options?.song ?? createDefaultSong()
    this.player = createPlayer(song, {
      synth: options?.synth,
    })
  }

  start(): void {
    this.player.start()
  }

  stop(): void {
    this.player.stop()
  }

  getSong(): ISong {
    return this.player.song
  }

  setSong(song: ISong): void {
    this.player.song = song
  }

  getTracks(): ITrack[] {
    return this.player.song.getTracks()
  }

  findTrack(id: string): ITrack | undefined {
    return this.player.song.findTrack(id)
  }

  getTrack(id: string): ITrack {
    return this.player.song.getTrack(id)
  }

  addTrack(track: ITrack): void {
    this.player.song.addTrack(track)
  }

  getNotes(trackId: string): Note[] {
    return this.getTrack(trackId).sortedNotes
  }

  findNote(trackId: string, noteId: string): Note | undefined {
    return this.getTrack(trackId).findNote(noteId)
  }

  addNote(trackId: string, note: Note): void {
    this.getTrack(trackId).addNote(note)
  }

  addNotes(trackId: string, notes: Note[]): void {
    this.getTrack(trackId).addNotes(notes)
  }
}
