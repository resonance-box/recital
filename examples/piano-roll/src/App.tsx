import { Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import {
  PianoRoll,
  RecitalProvider,
  useRecital,
  useSongFromMidiUrl,
  useSoundFont2Synth,
} from '@resonance-box/react-recital'
import { Ticks, type Song } from '@resonance-box/recital-core'
import { IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react'
import { useEffect, useRef, useState, type FC } from 'react'
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

const PianoRollContainer: FC = () => {
  const { synth, initialized } = useSoundFont2Synth(
    new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url),
    new AudioContext()
  )
  const { song, isLoading } = useSongFromMidiUrl(
    new URL('./assets/bach_846.mid', import.meta.url)
  )
  const { setSynth, setSong, updateNote, updateNotes, getSong } = useRecital()

  const update = () => {
    const song = getSong()
    if (song != null) {
      const track = song.getTracks()[0]
      const notes = track.sortedNotes

      // notes.map((note) => {
      //   updateNote(track.id, note.id, { ticks: new Ticks(100) })
      // })

      updateNotes(
        notes.map((note) => ({
          trackId: track.id,
          noteId: note.id,
          partialNote: { ticks: new Ticks(100) },
        }))
      )

      // updateNotes(
      //   notes.map((note) => ({
      //     trackId: track.id,
      //     noteId: note.id,
      //     partialNote: { velocity: new Velocity(100) },
      //   }))
      // )
    }
  }

  useEffect(() => {
    if (initialized) {
      setSynth(synth)
    }
  }, [initialized])

  useEffect(() => {
    if (!isLoading) {
      setSong(song as Song)
    }
  }, [isLoading])

  if (!initialized || isLoading) {
    return (
      <>
        {!initialized && <Text>Loading synthesizer...</Text>}
        {isLoading && <Text>Loading song...</Text>}
      </>
    )
  }

  return (
    <>
      <button onClick={update}>update</button>
      <Transport />
      <PianoRoll height={600} />
    </>
  )
}

export const App: FC = () => {
  const [started, setStarted] = useState(false)

  return (
    <RecitalProvider>
      <Container p="xl">
        <Stack>
          <Title order={2} fw={500}>
            Piano Roll
          </Title>
          <Text>This is a piano-roll component for the browser.</Text>
          {started && <PianoRollContainer />}
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
        </Stack>
      </Container>
    </RecitalProvider>
  )
}
