import { useState, type FC } from 'react'
import {
  createRecital,
  createSoundFont2Synth,
  createTwinkleTwinkleSong,
  type IRecital,
} from '../../../packages/recital-core/dist/recital-core'
import './App.css'

const sf2URL = new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url)

export const App: FC = () => {
  const [recital, setRecital] = useState<IRecital | undefined>(undefined)

  const setup = (): void => {
    const audioContext = new AudioContext()
    const synth = createSoundFont2Synth(sf2URL, { audioContext })
    const song = createTwinkleTwinkleSong()
    const recital = createRecital({ song, synth })
    setRecital(recital)
  }

  if (recital === undefined) {
    return <button onClick={setup}>setup</button>
  }

  const start = (): void => {
    recital.start()
  }

  const stop = (): void => {
    recital.stop()
  }

  return (
    <div className="App">
      <h1>Vite + React + Recital</h1>
      <div className="card">
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
      </div>
    </div>
  )
}
