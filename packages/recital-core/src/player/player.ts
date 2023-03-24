// import { type ISoundFont2SynthNode } from 'sf2-synth-audio-worklet'
import {
  BPM,
  Milliseconds,
  millisecondsToTicks,
  Seconds,
  Ticks,
  ticksToSeconds,
} from '../shared'
import { type ISong } from '../song'
import { type ISynth } from '../synth'
import { Transport, type ITransport } from './transport'
import { disassembleNotes, filterEventsWithTicksRange } from './utils'

const DEFAULT_LOOK_AHEAD_TIME = 50
const DEFAULT_BPM = 120

export interface IPlayer {
  song: ISong
  start: () => void
  stop: () => void
}

export interface PlayerOptions
  extends Partial<{
    lookAheadTime: Milliseconds
    synth: ISynth
  }> {}

export class Player implements IPlayer {
  song: ISong
  private readonly lookAheadTime: Milliseconds
  private scheduledTicks: Ticks
  private readonly transport: ITransport
  private readonly synth?: ISynth

  constructor(song: ISong, options?: PlayerOptions) {
    this.song = song
    this.lookAheadTime =
      options?.lookAheadTime ?? new Milliseconds(DEFAULT_LOOK_AHEAD_TIME)
    this.scheduledTicks = new Ticks(0)
    this.synth = options?.synth
    this.transport = new Transport({ bpm: new BPM(DEFAULT_BPM) })
    this.transport.onUpdate = ({ ticks }) => {
      const startTicks = this.scheduledTicks
      const endTicks = ticks.add(
        millisecondsToTicks(
          this.lookAheadTime,
          this.transport.bpm,
          this.transport.ppq
        )
      )

      this.song.getTracks().forEach((track) => {
        const { sortedNotes } = track

        const events = disassembleNotes(sortedNotes)
        const filteredEvents = filterEventsWithTicksRange(
          events,
          startTicks,
          endTicks
        )

        filteredEvents.forEach((event) => {
          if (this.synth != null) {
            const delayTicks = event.ticks.saturatingSub(ticks)
            const delayTime = new Seconds(
              Math.max(
                0,
                ticksToSeconds(
                  delayTicks,
                  this.transport.bpm,
                  this.transport.ppq
                ).value
              )
            )

            switch (event.type) {
              case 'NoteOn':
                this.synth.noteOn(event.noteNumber, event.velocity, delayTime)
                break
              case 'NoteOff':
                this.synth.noteOff(event.noteNumber, delayTime)
                break
              default:
                console.warn(
                  `Unexpected event received. Please ensure that the event is valid.`
                )
                break
            }
          }
        })
      })

      this.scheduledTicks = endTicks
    }
  }

  start(): void {
    this.transport.start()
  }

  stop(): void {
    this.scheduledTicks = new Ticks(0)
    this.transport.stop()
  }
}
