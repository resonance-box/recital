import {
  BPM,
  PPQ,
  RecitalImpl,
  type Note,
  type Recital,
  type Song,
  type Synth,
  type Track,
} from '@resonance-box/recital-core'
import produce from 'immer'
import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'
import { type InitialConfigType } from './RecitalProvider'

export interface RecitalContextType
  extends ReturnType<ReturnType<typeof createStore<Recital>>> {}

export const RecitalContext = createContext<RecitalContextType>(
  createRecitalStore(new RecitalImpl())
)

function createRecitalStore(recital: Recital): RecitalContextType {
  return createStore<Recital>((set, get) => {
    recital.player.onChangeBpm = () => {
      set({ player: get().player })
    }

    return {
      player: recital.player,
      play: () => {
        get().player.play()
      },
      stop: () => {
        get().player.stop()
      },
      getCurrentTicks: () => {
        return get().player.getCurrentTicks().value
      },
      getCurrentSeconds: () => {
        return get().player.getCurrentSeconds().value
      },
      getBpm: () => {
        return get().player.getBpm().value
      },
      setBpm: (bpm: number) => {
        const player = get().player
        get().player.setBpm(new BPM(bpm))
        set({ player })
      },
      getPpq: () => {
        return get().player.getPpq().value
      },
      setPpq: (ppq: number) => {
        const player = get().player
        get().player.setPpq(new PPQ(ppq))
        set({ player })
      },
      getSong: () => get().player.song,
      setSong: (song: Song) => {
        const player = get().player
        player.song = song
        set({ player })
      },
      getSynth: () => get().player.synth,
      setSynth: (synth: Synth) => {
        const player = get().player
        player.synth = synth
        set({ player })
      },
      getTracks: () => {
        return get().getSong().getTracks()
      },
      findTrack: (id: string) => {
        return get().getSong().findTrack(id)
      },
      getTrack: (id: string) => {
        return get().getSong().getTrack(id)
      },
      addTrack: (track: Track) => {
        const song = produce(get().getSong(), (draft) => {
          draft.addTrack(track)
        })
        get().setSong(song)
      },
      deleteTrack: (id: string) => {
        const song = produce(get().getSong(), (draft) => {
          draft.deleteTrack(id)
        })
        get().setSong(song)
      },
      getNotes: (trackId: string) => {
        return get().getTrack(trackId).sortedNotes
      },
      findNote: (trackId: string, noteId: string) => {
        return get().getTrack(trackId).findNote(noteId)
      },
      addNote: (trackId: string, note: Omit<Note, 'type' | 'id'>) => {
        const song = produce(get().getSong(), (draft) => {
          draft.getTrack(trackId).addNote(note)
        })
        get().setSong(song)
      },
      addNotes: (trackId: string, notes: Array<Omit<Note, 'type' | 'id'>>) => {
        const song = produce(get().getSong(), (draft) => {
          draft.getTrack(trackId).addNotes(notes)
        })
        get().setSong(song)
      },
      updateNote: (
        trackId: string,
        nodeId: string,
        partialNote: Partial<Omit<Note, 'type' | 'id'>>
      ) => {
        const song = produce(get().getSong(), (draft) => {
          draft.getTrack(trackId).updateNote(nodeId, partialNote)
        })
        get().setSong(song)
      },
      deleteNote: (trackId: string, noteId: string) => {
        const song = produce(get().getSong(), (draft) => {
          draft.getTrack(trackId).deleteNote(noteId)
        })
        get().setSong(song)
      },
    }
  })
}

export function createRecitalContext(
  initialConfig?: InitialConfigType
): RecitalContextType {
  const recital = new RecitalImpl(initialConfig)
  return createRecitalStore(recital)
}

export function useRecital(): Recital {
  const recitalContext = useContext(RecitalContext)
  return useStore(recitalContext)
}
