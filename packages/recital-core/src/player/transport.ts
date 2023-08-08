import {
  BPM,
  DEFAULT_PPQ,
  Milliseconds,
  millisecondsToTicks,
  PPQ,
  Seconds,
  Ticks,
} from '../shared'

const DEFAULT_BPM = 120
const DEFAULT_UPDATE_INTERVAL_TIME = 50

export interface Transport {
  ticks: Ticks
  seconds: Seconds
  bpm: BPM
  ppq: PPQ
  playing: boolean
  play: () => void
  stop: () => void
  onUpdate?: OnUpdate
}

type OnUpdate = (time: { ticks: Ticks; seconds: Seconds }) => void

interface TransportOptions
  extends Partial<{
    bpm: BPM
    ppq: PPQ
    updateIntervalTime: Milliseconds
  }> {}

export class TransportImpl implements Transport {
  playing: boolean
  ticks: Ticks
  seconds: Seconds
  bpm: BPM
  ppq: PPQ
  private prevTime?: Milliseconds
  private readonly updateIntervalTime: Milliseconds
  private intervalId?: NodeJS.Timer
  onUpdate?: OnUpdate

  constructor(options?: TransportOptions) {
    this.playing = false
    this.ticks = new Ticks(0)
    this.seconds = new Seconds(0)
    this.bpm = options?.bpm ?? new BPM(DEFAULT_BPM)
    this.ppq = options?.ppq ?? new PPQ(DEFAULT_PPQ)
    this.updateIntervalTime =
      options?.updateIntervalTime ??
      new Milliseconds(DEFAULT_UPDATE_INTERVAL_TIME)
    this.intervalId = undefined
  }

  play(): void {
    if (this.playing) {
      console.warn('Called play function while playing. aborted.')
      return
    }

    this.playing = true
    this.intervalId = setInterval(() => {
      this.next()
    }, this.updateIntervalTime.value)
  }

  private next(): void {
    const timestamp = new Milliseconds(performance.now())
    if (this.prevTime === undefined) {
      this.prevTime = timestamp
    }

    const deltaTime = timestamp.saturatingSub(this.prevTime)
    const deltaTicks = new Ticks(
      Math.max(0, millisecondsToTicks(deltaTime, this.bpm, this.ppq).value)
    )

    this.ticks = this.ticks.add(deltaTicks)
    this.seconds = this.seconds.add(deltaTime.toSeconds())

    if (this.onUpdate != null) {
      this.onUpdate({ ticks: this.ticks, seconds: this.seconds })
    }

    this.prevTime = timestamp
  }

  stop(): void {
    this.playing = false
    this.ticks = new Ticks(0)
    this.seconds = new Seconds(0)
    this.prevTime = undefined

    if (this.intervalId != null) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }
}
