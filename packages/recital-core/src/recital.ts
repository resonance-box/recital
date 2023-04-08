import { type Note } from './events'
import { createPlayer, type Player } from './player'
import { BPM, PPQ } from './shared'
import { createDefaultSong, type Song } from './song'
import { type Synth } from './synth'
import { type Track } from './track'

export interface Recital {
  readonly player: Player
  play: () => void
  stop: () => void
  getCurrentTicks: () => number
  getCurrentSeconds: () => number
  getBpm: () => number
  setBpm: (bpm: number) => void
  getPpq: () => number
  setPpq: (ppq: number) => void
  getSong: () => Song
  setSong: (song: Song) => void
  getSynth: () => Synth | undefined
  setSynth: (synth: Synth) => void
  getTracks: () => Track[]
  findTrack: (id: string) => Track | undefined
  getTrack: (id: string) => Track
  addTrack: (track: Track) => void
  deleteTrack: (id: string) => void
  getNotes: (trackId: string) => Note[]
  findNote: (trackId: string, noteId: string) => Note | undefined
  addNote: (trackId: string, note: Note) => void
  addNotes: (trackId: string, notes: Note[]) => void
  deleteNote: (trackId: string, noteId: string) => void
}

export interface RecitalOptions
  extends Partial<{
    song: Song
    synth: Synth
  }> {}

export class RecitalImpl implements Recital {
  readonly player: Player

  constructor(options?: RecitalOptions) {
    const song = options?.song ?? createDefaultSong()
    this.player = createPlayer(song, {
      synth: options?.synth,
    })
  }

  play(): void {
    this.player.play()
  }

  stop(): void {
    this.player.stop()
  }

  getCurrentTicks(): number {
    return this.player.getCurrentTicks().value
  }

  getCurrentSeconds(): number {
    return this.player.getCurrentSeconds().value
  }

  getBpm(): number {
    return this.player.getBpm().value
  }

  setBpm(bpm: number): void {
    this.player.setBpm(new BPM(bpm))
  }

  getPpq(): number {
    return this.player.getPpq().value
  }

  setPpq(ppq: number): void {
    this.player.setPpq(new PPQ(ppq))
  }

  getSong(): Song {
    return this.player.song
  }

  setSong(song: Song): void {
    this.player.song = song
  }

  getSynth(): Synth | undefined {
    return this.player.synth
  }

  setSynth(synth: Synth): void {
    this.player.synth = synth
  }

  getTracks(): Track[] {
    return this.player.song.getTracks()
  }

  findTrack(id: string): Track | undefined {
    return this.player.song.findTrack(id)
  }

  getTrack(id: string): Track {
    return this.player.song.getTrack(id)
  }

  addTrack(track: Track): void {
    this.player.song.addTrack(track)
  }

  deleteTrack(id: string): void {
    this.player.song.deleteTrack(id)
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

  deleteNote(trackId: string, noteId: string): void {
    this.getTrack(trackId).deleteNote(noteId)
  }
}
