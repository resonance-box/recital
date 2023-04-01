import { type FC } from 'react'
import { useRecital } from '../../../RecitalProviderContext'
import { Background } from './Background'
import { Notes } from './Notes'
import { Playhead } from './Playhead'

export interface PianoRollProps {
  width?: number
  height?: number
}

export const PianoRoll: FC<PianoRollProps> = ({
  width: viewportWidth,
  height: viewportHeight,
}) => {
  const width = 100000
  const keyHeight = 16
  const height = keyHeight * 128
  const _viewportHeight = viewportHeight ?? height

  const recital = useRecital()

  const { getTracks, getNotes } = recital
  const track = getTracks()[0]
  const notes = getNotes(track.id)

  return (
    <div
      style={{
        position: 'relative',
        width: viewportWidth !== undefined ? `${viewportWidth}px` : undefined,
        height: `${_viewportHeight}px`,
        overflow: 'scroll',
        borderRadius: '0.5rem',
        boxShadow: '0 0 0 1px #000',
        border: '1px solid #777',
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
        <Playhead />
      </div>
    </div>
  )
}
