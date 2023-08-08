import { useEffect, useRef, type FC } from 'react'
import { useRaf } from 'rooks'
import { useRecital } from '../../../RecitalProviderContext'

interface PlayheadProps {
  pixelsPerTick: number
  height: number
}

export const Playhead: FC<PlayheadProps> = ({ pixelsPerTick, height }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { getCurrentTicks, playing } = useRecital()

  useRaf(() => {
    if (ref.current != null) {
      ref.current.style.transform = `translateX(${
        pixelsPerTick * getCurrentTicks()
      }px)`
    }
  }, playing)

  useEffect(() => {
    if (playing === false && ref.current != null) {
      ref.current.style.transform = `translateX(${
        pixelsPerTick * getCurrentTicks()
      }px)`
    }
  }, [playing])

  return (
    <div
      ref={ref}
      className="playhead"
      style={{
        position: 'absolute',
        boxSizing: 'border-box',
        left: 0,
        top: 0,
        width: '1px',
        height: `${height}px`,
        boxShadow: '2px 0 0 0 rgba(255, 255, 255, 0.8) inset',
      }}
    />
  )
}
