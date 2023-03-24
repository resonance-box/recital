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

interface RecitalState extends IRecital {
  addTrack: (track: ITrack) => void
  addNote: (note: Note, trackIndex: number) => void
}

type RecitalStore = ReturnType<typeof createRecitalStore>

// TODO type
const createRecitalStore = (options?: RecitalOptions) => {
  const recital = new Recital(options)
  return createStore<RecitalState>()((set, get) => ({
    player: recital.player,
    getSong: () => recital.getSong(),
    start: () => {
      recital.start()
    },
    stop: () => {
      recital.stop()
    },
    addTrack: (track: ITrack) => {
      const song = produce(get().getSong(), (draft) => draft.addTrack(track))
      const player = get().player
      player.song = song
      set({ player })
    },
    addNote: (note: Note, trackIndex: number) => {
      const song = produce(get().getSong(), (draft) => {
        draft.tracks[trackIndex].addNote(note)
      })

      const player = get().player
      player.song = song
      set({ player })
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

// TODO type
export const useRecital = <U,>(selector: (state: any) => U): U => {
  const store = useContext(RecitalContext)

  if (store == null) {
    throw new Error('Missing RecitalContext.Provider in the tree')
  }

  return useStore(store, selector)
}
