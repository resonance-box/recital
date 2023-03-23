import { Button, Center, Group, Stack, Title } from '@mantine/core'
import {
  RecitalProvider,
  useRecital2,
  useSoundFont2Synth,
} from '@resonance-box/react-recital'
import {
  NoteNumber,
  Ticks,
  Velocity,
  createEmptyTrack,
  createNote,
  createTwinkleTwinkleSong,
} from '@resonance-box/recital-core'
import { type FC } from 'react'

const sf2URL = new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url)

// const Note: FC = ({ note }) => {
//   return (
//     <li>
//       <span style={{ marginRight: '1rem' }}>ticks: {note.ticks.value}</span>
//       <span style={{ marginRight: '1rem' }}>
//         durationTicks: {note.durationTicks.value}
//       </span>
//       <span style={{ marginRight: '1rem' }}>
//         noteNumber: {note.noteNumber.value}
//       </span>
//       <span>velocity: {note.velocity.value}</span>
//     </li>
//   )
// }
//
// const Notes: FC = () => {
//   const { notes, sortedNotes } = useRecital2(
//     (state) => state.getSongState().tracks[0]
//   )
//   const track = useRecital2((state) => state.song.tracks[0])
//   console.log('notes:', notes)
//
//   const add = useCallback(() => {
//     track.addNote(
//       createNote(
//         new Ticks(0),
//         new Ticks(480),
//         new NoteNumber(65),
//         new Velocity(80)
//       )
//     )
//     console.log('add:', track.sortedNotes)
//   }, [])
//
//   return (
//     <>
//       <Button onClick={add}>add note</Button>
//       <Group>
//         <ul>
//           {notes.map((note) => (
//             <Note key={note.id} note={note} />
//           ))}
//         </ul>
//         <ul>
//           {sortedNotes.map((note) => (
//             <Note key={note.id} note={note} />
//           ))}
//         </ul>
//       </Group>
//     </>
//   )
// }
//
// export const Main: FC = () => {
//   // const songState = useSongState()
//   const start = useRecital2((state) => state.start)
//   const stop = useRecital2((state) => state.stop)
//
//   return (
//     <Stack>
//       <Center>
//         <Title>Vite + React + Recital</Title>
//       </Center>
//       <Group position="center">
//         <Button onClick={start}>start</Button>
//         <Button color="red" onClick={stop}>
//           stop
//         </Button>
//       </Group>
//       <Notes />
//       <Code block>{JSON.stringify(songState, null, 2)}</Code>
//     </Stack>
//   )
// }
//

export const Main: FC = () => {
  // const songState = useSongState()
  const start = useRecital2((state) => state.start)
  const stop = useRecital2((state) => state.stop)
  const song = useRecital2((state) => state.song)
  const addTrack = useRecital2((state) => state.addTrack)
  const addNote = useRecital2((state) => state.addNote)

  console.log('song:', song)

  return (
    <Stack>
      <Center>
        <Title>Vite + React + Recital</Title>
      </Center>
      <Group position="center">
        <Button onClick={start}>start</Button>
        <Button color="red" onClick={stop}>
          stop
        </Button>
      </Group>
      <Group position="center">
        <Button color="green" onClick={() => addTrack(createEmptyTrack())}>
          addTrack
        </Button>
        <Button
          color="green"
          onClick={() =>
            addNote(
              createNote(
                new Ticks(0),
                new Ticks(480),
                new NoteNumber(65),
                new Velocity(80)
              ),
              0
            )
          }
        >
          addNote
        </Button>
      </Group>

      {/* <Notes /> */}
      {/* <Code block>{JSON.stringify(songState, null, 2)}</Code> */}
    </Stack>
  )
}

export const App: FC = () => {
  const { synth } = useSoundFont2Synth(sf2URL)

  return (
    <RecitalProvider options={{ synth, song: createTwinkleTwinkleSong() }}>
      <Main />
    </RecitalProvider>
  )
}

// export const App: FC = () => {
//   const { synth } = useSoundFont2Synth(sf2URL)
//   const recital = useRecital({
//     synth,
//     song: createTwinkleTwinkleSong(),
//   })
//
//   const start = (): void => {
//     recital.start()
//   }
//
//   const stop = (): void => {
//     recital.stop()
//   }
//
//   return (
//     <>
//       <Stack>
//         <Center>
//           <Title>Vite + React + Recital</Title>
//         </Center>
//         <Group position="center">
//           <Button onClick={start}>start</Button>
//           <Button color="red" onClick={stop}>
//             stop
//           </Button>
//         </Group>
//         <Group position="center">
//           <Button
//             color="green"
//             onClick={() =>
//               recital.song.tracks[0].addNote(
//                 createNote(
//                   new Ticks(0),
//                   new Ticks(960),
//                   new NoteNumber(65),
//                   new Velocity(80)
//                 )
//               )
//             }
//           >
//             add note
//           </Button>
//         </Group>
//         <Group position="center">
//           {/* <Stack> */}
//           {/*   <Center> */}
//           {/*     <Title */}
//           {/*       order={3} */}
//           {/*       ff="ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace" */}
//           {/*     > */}
//           {/*       recital.song */}
//           {/*     </Title> */}
//           {/*   </Center> */}
//           {/*   <Code block>{JSON.stringify(recital.song, null, 2)}</Code> */}
//           {/* </Stack> */}
//           {/* <Stack> */}
//           {/*   <Center> */}
//           {/*     <Title */}
//           {/*       order={3} */}
//           {/*       ff="ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace" */}
//           {/*     > */}
//           {/*       recital.getSongState() */}
//           {/*     </Title> */}
//           {/*   </Center> */}
//           {/*   <Code block>{JSON.stringify(recital.getSongState(), null, 2)}</Code> */}
//           {/* </Stack> */}
//           <Stack>
//             {recital.getSongState().tracks.map((track, index) => {
//               return (
//                 <div key={index}>
//                   {track.sortedNotes.map((note) => {
//                     return (
//                       <div key={note.id} style={{ display: 'flex' }}>
//                         <div style={{ marginRight: '1rem' }}>
//                           ticks: {note.ticks.value}
//                         </div>
//                         <div style={{ marginRight: '1rem' }}>
//                           durationTicks: {note.durationTicks.value}{' '}
//                         </div>
//                         <div style={{ marginRight: '1rem' }}>
//                           noteNumber: {note.noteNumber.value}{' '}
//                         </div>
//                         <div>velocity: {note.velocity.value}</div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               )
//             })}
//           </Stack>
//         </Group>
//       </Stack>
//     </>
//   )
// }
