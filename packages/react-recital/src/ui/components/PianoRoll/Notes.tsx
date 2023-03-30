import { type Note as INote } from '@resonance-box/recital-core'
import { type FC } from 'react'
import { useRecital } from '../../../RecitalProviderContext'

interface NoteProps {
  note: INote
  beatWidth: number
}

const Note: FC<NoteProps> = ({ note, beatWidth }) => {
  const keyHeight = 16
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'rgb(14 165 233)',
        left: `${(note.ticks.value * beatWidth) / (480 * 4)}px`,
        top: `${(128 - note.noteNumber.value - 1) * keyHeight}px`,
        width: `${(note.durationTicks.value * beatWidth) / (480 * 4) - 2}px`,
        height: `${keyHeight}px`,
      }}
    />
  )
}

interface NotesProps {
  notes: INote[]
}

export const Notes: FC<NotesProps> = ({ notes }) => {
  const recital = useRecital()

  if (recital == null) {
    return null
  }
  const { getPpq } = recital

  const pixelsPerTick = 0.05
  const ppq = getPpq()
  const beatWidth = pixelsPerTick * ppq * 4

  return (
    <>
      {notes.map((note) => (
        <Note key={note.id} note={note} beatWidth={beatWidth} />
      ))}
    </>
  )
}
