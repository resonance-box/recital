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

interface TrackProps {
  track: ITrack
}

const Track: FC<TrackProps> = ({ track }) => {
  const { addNote } = useRecital()

  return (
    <Stack>
      <Button
        color="green"
        onClick={() => addNote(track.id, createNote(0, 480, 65, 80))}
      >
        addNote
      </Button>
      <Code key={track.id} block>
        {JSON.stringify(track, null, 2)}
      </Code>
    </Stack>
  )
}

const Main: FC = () => {
  const { start, stop, getSong, addTrack } = useRecital()

  const song = getSong()
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
