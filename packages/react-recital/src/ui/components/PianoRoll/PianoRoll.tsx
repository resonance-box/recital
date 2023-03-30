import { type FC } from 'react'
import { useRecital } from '../../../RecitalProviderContext'
import { Background } from './Background'
import { Notes } from './Notes'

export const PianoRoll: FC = () => {
  const width = 100000
  const keyHeight = 16
  const height = keyHeight * 128

  const recital = useRecital()

  const { getTracks, getNotes } = recital
  const track = getTracks()[0]
  const notes = getNotes(track.id)

  return (
    <div
      style={{
        position: 'relative',
        width: '1400px',
        height: `${height}px`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: `${width}px`,
          height: `${height}px`,
          top: 0,
          left: 0,
          transform: 'translate(0)',
          userSelect: 'none',
          backgroundColor: '#282a36',
        }}
      >
        <Background width={width} />
        <Notes notes={notes} />
      </div>
    </div>
  )
}
