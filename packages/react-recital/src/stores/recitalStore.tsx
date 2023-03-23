import {
  Recital,
  type IRecital,
  type ISong,
  type ISynth,
  type ITrack,
  type Note,
} from '@resonance-box/recital-core'
import produce, { immerable } from 'immer'
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
  recital: IRecital
  // songProxy: ISong
  // getSongState: () => DeepReadonly<ISong>
  addTrack: (track: ITrack) => void
  addNote: (note: Note, trackIndex: number) => void
}

type RecitalStore = ReturnType<typeof createRecitalStore>

// TODO
const createRecitalStore = (options?: RecitalOptions) => {
  const recital = new Recital(options)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  recital.song[immerable] = true
  // const songSnap = proxy(recital.song)
  return createStore<RecitalState>()((set, get) => ({
    recital,
    song: recital.song,
    player: recital.player,
    start: () => {
      recital.start()
    },
    stop: () => {
      recital.stop()
    },
    // songProxy: proxy(recital.song),
    // getSongState: () => useSnapshot(songSnap),
    // getSongState: () => useSnapshot(get().song),
    addTrack: (track: ITrack) => {
      const song = produce(get().song, (draft) => draft.addTrack(track))
      set({ song })
    },
    addNote: (note: Note, trackIndex: number) => {
      // const song = produce(get().song, (draft) => {
      //   draft.tracks[trackIndex].addNote(note)
      //   draft.addTrack(createEmptyTrack())
      // })
      const song = produce(get().song, (draft) => {
        // draft.addNote(note, trackIndex)
        draft.tracks[trackIndex].addNote(note)
        // draft.tracks = produce(draft.tracks, (draftTracks) =>
        //   draftTracks[trackIndex].addNote(note)
        // )
        // draft.addTrack(createEmptyTrack())
      })

      console.log('song++++++++++++:', song)
      const player = get().player
      player.song = song

      set({ song, player })
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

// export const useSongState = (): DeepReadonly<ISong> => {
//   const store = useContext(RecitalContext)
//
//   if (store == null) {
//     throw new Error('Missing RecitalContext.Provider in the tree')
//   }
//
//   return useStore(store, (s) => s.getSongState)()
// }

// TODO
export const useRecital2 = <U,>(selector: (state: any) => U): U => {
  const store = useContext(RecitalContext)

  if (store == null) {
    throw new Error('Missing RecitalContext.Provider in the tree')
  }

  return useStore(store, selector)
}
