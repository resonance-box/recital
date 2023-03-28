import { Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import {
  RecitalProvider,
  useRecital,
  useSoundFont2Synth,
} from '@resonance-box/react-recital'
import { createTwinkleTwinkleSong } from '@resonance-box/recital-core'
import { IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react'
import { useState, type FC } from 'react'

const Transport: FC = () => {
  const { start, stop } = useRecital()

  return (
    <Group>
      <Button leftIcon={<IconPlayerPlayFilled size="1rem" />} onClick={start}>
        PLAY
      </Button>
      <Button
        color="red"
        leftIcon={<IconPlayerStopFilled size="1rem" />}
        onClick={stop}
      >
        STOP
      </Button>
    </Group>
  )
}

const PianoRollContainer: FC = () => {
  const { synth } = useSoundFont2Synth(
    new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url)
  )
  return (
    <RecitalProvider options={{ song: createTwinkleTwinkleSong(), synth }}>
      <Transport />
    </RecitalProvider>
  )
}

export const App: FC = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>(
    undefined
  )

  return (
    <Container p="xl">
      <Stack>
        <Title order={2} fw={500}>
          Piano Roll
        </Title>
        <Text>This is a piano-roll component for the browser.</Text>
        {audioContext === undefined ? (
          <Group>
            <Button
              onClick={() => {
                setAudioContext(new AudioContext())
              }}
            >
              START
            </Button>
          </Group>
        ) : (
          <PianoRollContainer />
        )}
      </Stack>
    </Container>
  )
}
