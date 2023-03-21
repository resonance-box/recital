import {
  BPM,
  Milliseconds,
  millisecondsToTicks,
  PPQ,
  Seconds,
  Ticks,
} from '../shared'
// import { millisecondsToSeconds, millisecondsToTicks } from '../utils'

const DEFAULT_BPM = 120
const DEFAULT_PPQ = 480
const DEFAULT_UPDATE_INTERVAL_TIME = 50

export interface ITransport {
  ticks: Ticks
  seconds: Seconds
  bpm: BPM
  ppq: PPQ
  start: () => void
  stop: () => void
  onUpdate?: OnUpdate
}

type OnUpdate = (time: { ticks: Ticks; seconds: Seconds }) => void

interface TransportOptions {
  bpm: BPM
  ppq: PPQ
  updateIntervalTime: Milliseconds
}

export class Transport implements ITransport {
  private running: boolean
  ticks: Ticks
  seconds: Seconds
  bpm: BPM
  ppq: PPQ
  private prevTime?: Milliseconds
  private readonly updateIntervalTime: Milliseconds
  private intervalId?: NodeJS.Timer
  onUpdate?: OnUpdate

  constructor(options?: Partial<TransportOptions>) {
    this.running = false
    this.ticks = new Ticks(0)
    this.seconds = new Seconds(0)
    this.bpm = options?.bpm ?? new BPM(DEFAULT_BPM)
    this.ppq = options?.ppq ?? new PPQ(DEFAULT_PPQ)
    this.updateIntervalTime =
      options?.updateIntervalTime ??
      new Milliseconds(DEFAULT_UPDATE_INTERVAL_TIME)
    this.intervalId = undefined
  }

  start(): void {
    if (this.running) {
      console.warn('Called start function while running. aborted.')
      return
    }

    this.running = true
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
    this.running = false
    this.ticks = new Ticks(0)
    this.seconds = new Seconds(0)
    this.prevTime = undefined

    if (this.intervalId != null) {
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }
}
