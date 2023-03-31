import { useRef, type FC } from 'react'
import { useRaf } from 'rooks'
import { useRecital } from '../../../RecitalProviderContext'

export const Playhead: FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const pixelsPerTick = 0.05
  const keyHeight = 16
  const { getCurrentTicks } = useRecital()
  const pianoRollHeight = keyHeight * 128

  useRaf(() => {
    if (ref.current != null) {
      ref.current.style.transform = `translateX(${
        pixelsPerTick * getCurrentTicks()
      }px)`
    }
  }, true)

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
        height: `${pianoRollHeight}px`,
        boxShadow: '2px 0 0 0 rgba(255, 255, 255, 0.8) inset',
      }}
    />
  )
}
