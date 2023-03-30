import {
  Button,
  Center,
  Code,
  Container,
  Flex,
  Group,
  NumberInput,
  Stack,
  Title,
} from '@mantine/core'
import {
  RecitalProvider,
  useRecital,
  useSoundFont2Synth,
} from '@resonance-box/react-recital'
import {
  createEmptyTrack,
  createNote,
  createTwinkleTwinkleSong,
  type Track,
} from '@resonance-box/recital-core'
import { useState, type FC } from 'react'

const sf2URL = new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url)

const getRandomInt = (max: number, min: number = 0): number => {
  return min + Math.floor(Math.random() * (max - min))
}

interface TrackUIProps {
  track: Track
}

const TrackUI: FC<TrackUIProps> = ({ track }) => {
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
          onClick={() => {
            deleteNote(track.id, randomNote.id)
          }}
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

const RandomTempo: FC = () => {
  const { setBpm } = useRecital()
  return (
    <Button
      onClick={() => {
        setBpm(getRandomInt(300, 60))
      }}
    >
      Set Random Tempo
    </Button>
  )
}

const Main: FC = () => {
  const {
    start,
    stop,
    getSong,
    getTracks,
    addTrack,
    deleteTrack,
    getBpm,
    setBpm,
  } = useRecital()
  const song = getSong()
  const tracks = getTracks()
  const randomTrack = tracks[getRandomInt(tracks.length)]

  console.log('song:', song)

  return (
    <>
      <Group position="center">
        <Button onClick={start}>start</Button>
        <Button color="red" onClick={stop}>
          stop
        </Button>
      </Group>
      <Container>
        <Flex align="end" gap="md">
          <NumberInput
            value={getBpm()}
            onChange={(tempo) => {
              tempo !== '' && setBpm(tempo)
            }}
            label="Tempo"
            min={1}
            max={1000}
          />
          <RandomTempo />
        </Flex>
      </Container>
      <Group position="center">
        <Button
          color="green"
          onClick={() => {
            addTrack(createEmptyTrack())
          }}
        >
          Add Track
        </Button>
        <Button
          color="green"
          disabled={tracks.length === 0}
          onClick={() => {
            deleteTrack(randomTrack.id)
          }}
        >
          Delete Random Track
        </Button>
      </Group>
      <Flex gap="md">
        {song.getTracks().map((track) => (
          <TrackUI key={track.id} track={track} />
        ))}
      </Flex>
    </>
  )
}

const Wrapper: FC = () => {
  const { synth } = useSoundFont2Synth(sf2URL)
  return (
    <RecitalProvider options={{ synth, song: createTwinkleTwinkleSong() }}>
      <Main />
    </RecitalProvider>
  )
}

export const App: FC = () => {
  const [started, setStarted] = useState(false)

  return (
    <Stack>
      <Center>
        <Title>Vite + React + Recital</Title>
      </Center>
      {started ? (
        <Wrapper />
      ) : (
        <Container>
          <Button
            onClick={() => {
              setStarted(true)
            }}
          >
            START
          </Button>
        </Container>
      )}
    </Stack>
  )
}
