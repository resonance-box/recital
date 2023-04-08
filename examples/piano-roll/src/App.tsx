import { Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import {
  PianoRoll,
  RecitalProvider,
  useRecital,
  useSongFromMidiUrl,
  useSoundFont2Synth,
} from '@resonance-box/react-recital'
import { type Song } from '@resonance-box/recital-core'
import { IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react'
import { useRef, useState, type FC } from 'react'
import { useRaf } from 'rooks'

const Transport: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { play, stop, getCurrentTicks } = useRecital()

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
        <Button leftIcon={<IconPlayerPlayFilled size="1rem" />} onClick={play}>
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

interface PianoRollContainerProps {
  song: Song
}

const PianoRollContainer: FC<PianoRollContainerProps> = ({ song }) => {
  const { synth, initialized } = useSoundFont2Synth(
    new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url),
    new AudioContext()
  )

  if (!initialized) {
    return <Text>Loading synthesizer...</Text>
  }

  return (
    <RecitalProvider
      initialConfig={{
        song,
        synth,
      }}
    >
      <Transport />
      <PianoRoll height={600} />
    </RecitalProvider>
  )
}

export const App: FC = () => {
  const [started, setStarted] = useState(false)
  const { song } = useSongFromMidiUrl(
    new URL('./assets/bach_846.mid', import.meta.url)
  )

  return (
    <Container p="xl">
      <Stack>
        <Title order={2} fw={500}>
          Piano Roll
        </Title>
        <Text>This is a piano-roll component for the browser.</Text>
        {started && song !== undefined && <PianoRollContainer song={song} />}
        {!started && (
          <Group>
            <Button
              onClick={() => {
                console.log('click start button')
                setStarted(true)
              }}
            >
              START
            </Button>
          </Group>
        )}
        {song === undefined && <Text>creating song...</Text>}
      </Stack>
    </Container>
  )
}
