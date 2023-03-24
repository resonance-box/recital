import { Button, Center, Code, Flex, Group, Stack, Title } from '@mantine/core'
import {
  RecitalProvider,
  useRecital,
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

export const Main: FC = () => {
  const { start, stop, getSong, addTrack, addNote } = useRecital(
    (state) => state
  )

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

      <Flex gap="md">
        {song.tracks.map((track, index) => (
          <Code key={index} block>
            {JSON.stringify(track, null, 2)}
          </Code>
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
