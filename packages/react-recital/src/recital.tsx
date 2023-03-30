import { useState, type FC } from 'react'
import { useRaf } from 'rooks'
import { useRecital } from './RecitalProviderContext'

// interface RecitalOptions
//   extends Partial<{
//     synth: Synth
//     song: Song
//   }> {}
//
// type RecitalStore = ReturnType<typeof createRecitalStore>
//
// const createRecitalStore = (
//   options?: RecitalOptions
// ): ReturnType<ReturnType<typeof createStore<Recital>>> => {
//   const recital = new RecitalImpl(options)
//   return createStore<Recital>((set, get) => {
//     recital.player.onChangeBpm = () => {
//       set({ player: get().player })
//     }
//
//     return {
//       player: recital.player,
//       start: () => {
//         get().player.start()
//       },
//       stop: () => {
//         get().player.stop()
//       },
//       getCurrentTicks: () => {
//         return get().player.getCurrentTicks().value
//       },
//       getCurrentSeconds: () => {
//         return get().player.getCurrentSeconds().value
//       },
//       getBpm: () => {
//         return get().player.getBpm().value
//       },
//       setBpm: (bpm: number) => {
//         const player = get().player
//         get().player.setBpm(new BPM(bpm))
//         set({ player })
//       },
//       getPpq: () => {
//         return get().player.getPpq().value
//       },
//       setPpq: (ppq: number) => {
//         const player = get().player
//         get().player.setPpq(new PPQ(ppq))
//         set({ player })
//       },
//       getSong: () => get().player.song,
//       setSong: (song: Song) => {
//         const player = get().player
//         player.song = song
//         set({ player })
//       },
//       getTracks: () => {
//         return get().getSong().getTracks()
//       },
//       findTrack: (id: string) => {
//         return get().getSong().findTrack(id)
//       },
//       getTrack: (id: string) => {
//         return get().getSong().getTrack(id)
//       },
//       addTrack: (track: Track) => {
//         const song = produce(get().getSong(), (draft) => {
//           draft.addTrack(track)
//         })
//         get().setSong(song)
//       },
//       deleteTrack: (id: string) => {
//         const song = produce(get().getSong(), (draft) => {
//           draft.deleteTrack(id)
//         })
//         get().setSong(song)
//       },
//       getNotes: (trackId: string) => {
//         return get().getTrack(trackId).sortedNotes
//       },
//       findNote: (trackId: string, noteId: string) => {
//         return get().getTrack(trackId).findNote(noteId)
//       },
//       addNote: (trackId: string, note: Note) => {
//         const song = produce(get().getSong(), (draft) => {
//           draft.getTrack(trackId).addNote(note)
//         })
//         get().setSong(song)
//       },
//       addNotes: (trackId: string, notes: Note[]) => {
//         const song = produce(get().getSong(), (draft) => {
//           draft.getTrack(trackId).addNotes(notes)
//         })
//         get().setSong(song)
//       },
//       deleteNote: (trackId: string, noteId: string) => {
//         const song = produce(get().getSong(), (draft) => {
//           draft.getTrack(trackId).deleteNote(noteId)
//         })
//         get().setSong(song)
//       },
//     }
//   })
// }
//
// const RecitalContext = createContext<RecitalStore | null>(null)
//
// export interface RecitalProviderProps {
//   children: ReactNode
//   options?: RecitalOptions
// }

// export const RecitalProvider: FC<RecitalProviderProps> = ({
//   children,
//   options,
// }) => {
//   console.log('RecitalProvider')
//   const store = useRef(createRecitalStore(options)).current
//   return (
//     <RecitalContext.Provider value={store}>{children}</RecitalContext.Provider>
//   )
// }
//
// export const useRecital = (): Recital => {
//   const store = useContext(RecitalContext)
//   console.log('useRecital:', store)
//
//   if (store == null) {
//     throw new Error('Missing RecitalContext.Provider in the tree')
//   }
//
//   return useStore(store, (state) => state)
// }

export const Transport: FC = () => {
  const [currentTicks, setCurrentTicks] = useState(0)
  const { getCurrentTicks } = useRecital()

  useRaf(() => {
    setCurrentTicks(getCurrentTicks())
  }, true)

  return <div>Current Ticks: {currentTicks}</div>
}
