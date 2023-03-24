import { Button, Center, Code, Flex, Group, Stack, Title } from '@mantine/core'
import {
  RecitalProvider,
  useRecital,
  useSoundFont2Synth,
} from '@resonance-box/react-recital'
import {
  createEmptyTrack,
  createNote,
  createTwinkleTwinkleSong,
  type ITrack,
} from '@resonance-box/recital-core'
import { type FC } from 'react'

const sf2URL = new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url)

const getRandomInt = (max: number, min: number = 0): number => {
  return min + Math.floor(Math.random() * (max - min))
}

interface TrackProps {
  track: ITrack
}

const Track: FC<TrackProps> = ({ track }) => {
  const { addNote, deleteNote, getNotes } = useRecital()
  const notes = getNotes(track.id)
  const randomNote = notes[getRandomInt(notes.length)]

  return (
    <Stack>
      <Group>
        <Button
          color="green"
          onClick={() => {
            addNote(
              track.id,
              createNote(
                getRandomInt(16) * 480,
                getRandomInt(16) * 480,
                getRandomInt(72, 48),
                getRandomInt(100, 60)
              )
            )
          }}
        >
          Add Random Note
        </Button>
        <Button
          color="green"
          disabled={notes.length === 0}
          onClick={() => deleteNote(track.id, randomNote.id)}
        >
          Delete Random Note
        </Button>
      </Group>
      <Code key={track.id} block>
        {JSON.stringify(track, null, 2)}
      </Code>
    </Stack>
  )
}

const Main: FC = () => {
  const { start, stop, getSong, getTracks, addTrack, deleteTrack } =
    useRecital()
  const song = getSong()
  const tracks = getTracks()
  const randomTrack = tracks[getRandomInt(tracks.length)]

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
          Add Track
        </Button>
        <Button
          color="green"
          disabled={tracks.length === 0}
          onClick={() => deleteTrack(randomTrack.id)}
        >
          Delete Random Track
        </Button>
      </Group>
      <Flex gap="md">
        {song.getTracks().map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </Flex>
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
