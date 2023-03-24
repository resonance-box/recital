import {
  Recital,
  type IRecital,
  type ISong,
  type ISynth,
  type ITrack,
  type Note,
} from '@resonance-box/recital-core'
import produce from 'immer'
import {
  createContext,
  useContext,
  useRef,
  type FC,
  type ReactNode,
} from 'react'
import { createStore, useStore } from 'zustand'

interface RecitalOptions
  extends Partial<{
    synth: ISynth
    song: ISong
  }> {}

type RecitalStore = ReturnType<typeof createRecitalStore>

const createRecitalStore = (
  options?: RecitalOptions
): ReturnType<ReturnType<typeof createStore<IRecital>>> => {
  const recital = new Recital(options)
  return createStore<IRecital>((set, get) => ({
    player: recital.player,
    start: () => {
      get().player.start()
    },
    stop: () => {
      get().player.stop()
    },
    getSong: () => get().player.song,
    setSong: (song: ISong) => {
      const player = get().player
      player.song = song
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
    addTrack: (track: ITrack) => {
      const song = produce(get().getSong(), (draft) => {
        draft.addTrack(track)
      })
      get().setSong(song)
    },
    getNotes: (trackId: string) => {
      return get().getTrack(trackId).sortedNotes
    },
    findNote: (trackId: string, noteId: string) => {
      return get().getTrack(trackId).findNote(noteId)
    },
    addNote: (trackId: string, note: Note) => {
      const song = produce(get().getSong(), (draft) => {
        draft.getTrack(trackId).addNote(note)
      })
      get().setSong(song)
    },
    addNotes: (trackId: string, notes: Note[]) => {
      const song = produce(get().getSong(), (draft) => {
        draft.getTrack(trackId).addNotes(notes)
      })
      get().setSong(song)
    },
  }))
}

const RecitalContext = createContext<RecitalStore | null>(null)

export interface RecitalProviderProps {
  children: ReactNode
  options?: RecitalOptions
}

export const RecitalProvider: FC<RecitalProviderProps> = ({
  children,
  options,
}) => {
  const store = useRef(createRecitalStore(options)).current
  return (
    <RecitalContext.Provider value={store}>{children}</RecitalContext.Provider>
  )
}

export const useRecital = (): IRecital => {
  const store = useContext(RecitalContext)

  if (store == null) {
    throw new Error('Missing RecitalContext.Provider in the tree')
  }

  return useStore(store, (state) => state)
}
