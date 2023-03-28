import { Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import {
  RecitalProvider,
  useRecital,
  useSoundFont2Synth,
} from '@resonance-box/react-recital'
import { PianoRoll } from '@resonance-box/react-recital-ui'
import { createTwinkleTwinkleSong } from '@resonance-box/recital-core'
import { IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react'
import { useState, type FC } from 'react'
import { useRaf } from 'rooks'

const Transport: FC = () => {
  const [currentTicks, setCurrentTicks] = useState(0)
  const { start, stop, getCurrentTicks } = useRecital()

  useRaf(() => {
    setCurrentTicks(getCurrentTicks())
  }, true)

  return (
    <Stack>
      Current Ticks: {currentTicks}
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
    </Stack>
  )
}

const PianoRollContainer: FC = () => {
  const { synth } = useSoundFont2Synth(
    new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url)
  )
  return (
    <RecitalProvider options={{ song: createTwinkleTwinkleSong(), synth }}>
      <Transport />
      <PianoRoll />
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
