import range from 'lodash/range'
import { Fragment, type FC } from 'react'

const NOTE_NUMBERS = range(128)
const BLACK_KEY_PITCH_CLASSES = [1, 3, 6, 8, 10]

// For drawing borderlines of adjacent white keys
const DRAW_BORDERLINE_PITCH_CLASSES = [4, 11]

interface BackgroundProps {
  width: number
}

export const Background: FC<BackgroundProps> = ({ width }) => {
  // const { getPpq } = useRecital()

  // const ppq = getPpq()
  const keyHeight = 16
  // const pixelsPerTick = 0.05
  // const beatWidth = pixelsPerTick * ppq * 4
  const height = keyHeight * 128

  return (
    <div
      style={{
        fontFamily:
          'Menlo, Monaco, "Courier New", monospace, Menlo, Monaco, "Courier New", monospace',
        fontSize: '14px',
        fontFeatureSettings: '"liga", "calt"',
        letterSpacing: '0px',
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#282a36',
      }}
    >
      {NOTE_NUMBERS.map((noteNumber) => (
        <Fragment key={noteNumber}>
          {BLACK_KEY_PITCH_CLASSES.includes(noteNumber % 12) && (
            <div
              style={{
                position: 'absolute',
                top: `${keyHeight * (128 - noteNumber - 1)}px`,
                width: `${width}px`,
                height: `${keyHeight}px`,
                backgroundColor: 'rgb(0, 0, 0, 0.2)',
              }}
            />
          )}
          {DRAW_BORDERLINE_PITCH_CLASSES.includes(noteNumber % 12) && (
            <div
              style={{
                position: 'absolute',
                boxSizing: 'border-box',
                left: 0,
                top: `${keyHeight * (128 - noteNumber - 1)}px`,
                width: `${width}px`,
                height: '1px',
                boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.08) inset',
              }}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}
