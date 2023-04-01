import { Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import {
  PianoRoll,
  RecitalProvider,
  useRecital,
} from '@resonance-box/react-recital'

import {
  createSoundFont2Synth,
  createTwinkleTwinkleSong,
} from '@resonance-box/recital-core'
import { IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react'
import { useRef, useState, type FC } from 'react'
import { useRaf } from 'rooks'

const Transport: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { start, stop, getCurrentTicks } = useRecital()

  useRaf(() => {
    if (ref.current != null) {
      ref.current.innerText = getCurrentTicks().toString()
    }
  }, true)

  return (
    <Stack>
      <Text>Current Ticks: </Text>
      <Text ref={ref} />
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
  return (
    <RecitalProvider
      initialConfig={{
        song: createTwinkleTwinkleSong(),
        synth: createSoundFont2Synth(
          new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url)
        ),
      }}
    >
      <Transport />
      <PianoRoll height={600} />
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
