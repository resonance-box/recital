import { type FC } from 'react'
import { useRecital } from '../../../RecitalProviderContext'
import { Background } from './Background'
import { Notes } from './Notes'
import { Playhead } from './Playhead'

export interface PianoRollProps {
  width?: number
  height?: number
  minNoteNumber?: number
  maxNoteNumber?: number
}

export const PianoRoll: FC<PianoRollProps> = ({
  width: viewportWidth,
  height: viewportHeight,
  minNoteNumber = 0,
  maxNoteNumber = 127,
}) => {
  if (maxNoteNumber < 0 || maxNoteNumber > 127) {
    throw new Error('`maxNoteNumber` should be within the range of 0 to 127.')
  }

  if (minNoteNumber < 0 || minNoteNumber > 127) {
    throw new Error('`minNoteNumber` should be within the range of 0 to 127.')
  }

  if (minNoteNumber > maxNoteNumber) {
    throw new Error(
      '`minNoteNumber` should be less than or equal to `maxNoteNumber`.'
    )
  }

  const width = 100000
  const keyHeight = 16
  const numNoteNumbers = maxNoteNumber - minNoteNumber + 1
  const height = keyHeight * numNoteNumbers
  const _viewportHeight =
    viewportHeight === undefined ? height : Math.min(viewportHeight, height)

  const { getTracks, getNotes, getPpq } = useRecital()
  const pixelsPerTick = 0.05
  const ppq = getPpq()
  const beatWidth = pixelsPerTick * ppq * 4

  const track = getTracks()[0]
  const notes = getNotes(track.id)

  return (
    <div
      style={{
        position: 'relative',
        width: viewportWidth !== undefined ? `${viewportWidth}px` : undefined,
        height: `${_viewportHeight}px`,
        overflow: 'scroll',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: `${width}px`,
          height: `${height}px`,
          top: 0,
          left: 0,
          overflow: 'hidden',
          transform: 'translate(0)',
          userSelect: 'none',
          backgroundColor: '#282a36',
        }}
      >
        <Background
          width={width}
          height={height}
          keyHeight={keyHeight}
          minNoteNumber={minNoteNumber}
          maxNoteNumber={maxNoteNumber}
          numNoteNumbers={numNoteNumbers}
        />
        <Notes
          notes={notes}
          beatWidth={beatWidth}
          keyHeight={keyHeight}
          minNoteNumber={minNoteNumber}
          numNoteNumbers={numNoteNumbers}
        />
        <Playhead pixelsPerTick={pixelsPerTick} height={height} />
      </div>
    </div>
  )
}
