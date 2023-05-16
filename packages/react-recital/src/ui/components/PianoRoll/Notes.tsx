import { type Note as INote } from '@resonance-box/recital-core'
import { type FC } from 'react'

interface NoteProps {
  note: INote
  beatWidth: number
  keyHeight: number
  minNoteNumber: number
  numNoteNumbers: number
}

const Note: FC<NoteProps> = ({
  note,
  beatWidth,
  keyHeight,
  minNoteNumber,
  numNoteNumbers,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'rgb(14 165 233)',
        left: `${(note.ticks.value * beatWidth) / (480 * 4)}px`,
        top: `${
          (numNoteNumbers - (note.noteNumber.value - minNoteNumber) - 1) *
          keyHeight
        }px`,
        width: `${(note.durationTicks.value * beatWidth) / (480 * 4)}px`,
        height: `${keyHeight}px`,
        border: '1px solid',
        borderColor: 'rgb(3 40 57)',
        boxSizing: 'border-box',
      }}
    />
  )
}

interface NotesProps {
  notes: INote[]
  beatWidth: number
  keyHeight: number
  minNoteNumber: number
  numNoteNumbers: number
}

export const Notes: FC<NotesProps> = ({
  notes,
  beatWidth,
  keyHeight,
  minNoteNumber,
  numNoteNumbers,
}) => {
  return (
    <>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          beatWidth={beatWidth}
          keyHeight={keyHeight}
          minNoteNumber={minNoteNumber}
          numNoteNumbers={numNoteNumbers}
        />
      ))}
    </>
  )
}
