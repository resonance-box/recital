import { useEffect, useRef, useState, type FC } from 'react'
import { useRaf } from 'rooks'
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

  const { getTracks, getNotes, getPpq, getCurrentTicks } = useRecital()
  const pixelsPerTick = 0.05
  const ppq = getPpq()
  const beatWidth = pixelsPerTick * ppq * 4

  const track = getTracks()[0]
  const notes = getNotes(track.id)

  const viewportRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutId = useRef<number>()

  useRaf(() => {
    if (viewportRef.current != null && !isScrolling) {
      // calculate the gap between the playhead and the right edge of the viewport
      const gap =
        pixelsPerTick * getCurrentTicks() -
        (viewportRef.current.scrollLeft + viewportRef.current.clientWidth)

      if (gap > 0 && gap < pixelsPerTick * getPpq()) {
        viewportRef.current.scrollLeft += viewportRef.current.clientWidth
      }
    }
  }, true)

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolling(true)

      clearTimeout(scrollTimeoutId.current)

      scrollTimeoutId.current = setTimeout(() => {
        setIsScrolling(false)
      }, 100)
    }

    viewportRef.current?.addEventListener('scroll', handleScroll)

    return () => {
      viewportRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // scroll so that the center note number appears in the center of the viewport
    if (viewportRef.current != null) {
      const centerNoteNumber = Math.floor(
        (maxNoteNumber - minNoteNumber) / 2 + minNoteNumber
      )
      const centerNoteNumberY = keyHeight * centerNoteNumber
      const viewportCenterY = viewportRef.current.clientHeight / 2
      viewportRef.current.scrollTop = centerNoteNumberY - viewportCenterY
    }
  }, [])

  return (
    <div>
      <div
        ref={viewportRef}
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
    </div>
  )
}
