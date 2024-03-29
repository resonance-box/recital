import {
  Milliseconds,
  Seconds,
  Ticks,
  millisecondsToTicks,
  ticksToSeconds,
  type BPM,
  type PPQ,
} from '../shared'
import { type Song } from '../song'
import { type Synth } from '../synth'
import { TransportImpl, type Transport } from './transport'
import { disassembleNotes, filterEventsWithTicksRange } from './utils'

const DEFAULT_LOOK_AHEAD_TIME = 50

export interface Player {
  song: Song
  synth?: Synth
  readonly playing: boolean
  play: () => void
  stop: () => void
  getCurrentTicks: () => Ticks
  getCurrentSeconds: () => Seconds
  getBpm: () => BPM
  setBpm: (bpm: BPM) => void
  getPpq: () => PPQ
  setPpq: (ppq: PPQ) => void
  onChangeBpm?: (bpm: BPM) => void
}

export interface PlayerOptions
  extends Partial<{
    lookAheadTime: Milliseconds
    synth: Synth
  }> {}

export class PlayerImpl implements Player {
  song: Song
  synth?: Synth
  private readonly lookAheadTime: Milliseconds
  private scheduledTicks: Ticks
  private readonly transport: Transport
  onChangeBpm?: (bpm: BPM) => void

  constructor(song: Song, options?: PlayerOptions) {
    this.song = song
    this.lookAheadTime =
      options?.lookAheadTime ?? new Milliseconds(DEFAULT_LOOK_AHEAD_TIME)
    this.scheduledTicks = new Ticks(0)
    this.synth = options?.synth
    this.transport = new TransportImpl()
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

  get playing(): boolean {
    return this.transport.playing
  }

  play(): void {
    this.transport.play()
  }

  stop(): void {
    this.scheduledTicks = new Ticks(0)
    this.transport.stop()
  }

  getCurrentTicks(): Ticks {
    return this.transport.ticks
  }

  getCurrentSeconds(): Seconds {
    return this.transport.seconds
  }

  getBpm(): BPM {
    return this.transport.bpm
  }

  setBpm(bpm: BPM): void {
    this.transport.bpm = bpm
    this.onChangeBpm?.(bpm)
  }

  getPpq(): PPQ {
    return this.transport.ppq
  }

  setPpq(ppq: PPQ): void {
    this.transport.ppq = ppq
  }
}
