import { useState, type FC } from 'react'
import {
  Player,
  SoundFont2Synth,
  type IPlayer,
} from '../../../packages/recital-core/dist/recital-core'
import { createTwinkleTwinkleSong } from '../../../packages/recital-core/src/song/songFactory'
import './App.css'

const sf2URL = new URL('./assets/GeneralUser GS v1.471.sf2', import.meta.url)

export const App: FC = () => {
  const [player, setPlayer] = useState<IPlayer | undefined>(undefined)

  const setup = (): void => {
    const audioContext = new AudioContext()
    const synth = new SoundFont2Synth(sf2URL, { audioContext })
    const song = createTwinkleTwinkleSong()
    const player = new Player({ song, synth })
    setPlayer(player)
  }

  if (player === undefined) {
    return <button onClick={setup}>setup</button>
  }

  const start = (): void => {
    player.start()
  }

  const stop = (): void => {
    player.stop()
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
