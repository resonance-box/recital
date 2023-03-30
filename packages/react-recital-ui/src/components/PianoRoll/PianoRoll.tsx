import { useRecital } from '@resonance-box/react-recital'
import { type FC } from 'react'
import { Background } from './Background'

export const PianoRoll: FC = () => {
  const width = 100000
  const keyHeight = 16
  const height = keyHeight * 128

  const recital = useRecital()

  if (recital == null) {
    return null
  }

  const { getTracks, getNotes } = recital
  const track = getTracks()[0]
  const notes = getNotes(track.id)

  console.log('track:', track, ', notes:', notes)

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
        {/* <Notes notes={notes} /> */}
      </div>
    </div>
  )
}
