import { describe, expect, it } from 'vitest'
import { NoteNumber, Velocity, createNote } from '../events'
import { Ticks } from '../shared'
import { Track } from './track'

describe('Track', () => {
  describe('constructor', () => {
    it('should create a new Track instance with empty notes and zero endOfTrackTicks if no options are passed', () => {
      const track = new Track()
      expect(track.sortedNotes).toEqual([])
    })

    it('should create a new Track instance with specified notes and endOfTrackTicks if options are passed', () => {
      const notes = [
        createNote(
          new Ticks(0),
          new Ticks(100),
          new NoteNumber(60),
          new Velocity(100)
        ),
        createNote(
          new Ticks(100),
          new Ticks(200),
          new NoteNumber(62),
          new Velocity(100)
        ),
      ]
      const endOfTrackTicks = new Ticks(100)
      const options = { notes, endOfTrackTicks }
      const track = new Track(options)
      expect(track.sortedNotes).toEqual(notes)
    })
  })

  describe('addNote', () => {
    it('should add a new note to the notes array', () => {
      const track = new Track()
      const note = createNote(
        new Ticks(0),
        new Ticks(100),
        new NoteNumber(60),
        new Velocity(100)
      )
      track.addNote(note)
      expect(track.sortedNotes).toEqual([note])
    })
  })

  describe('addNotes', () => {
    it('should add multiple notes to the notes array', () => {
      const notes = [
        createNote(
          new Ticks(0),
          new Ticks(100),
          new NoteNumber(60),
          new Velocity(100)
        ),
        createNote(
          new Ticks(100),
          new Ticks(200),
          new NoteNumber(62),
          new Velocity(100)
        ),
      ]
      const track = new Track()
      track.addNotes(notes)
      expect(track.sortedNotes).toEqual(notes)
    })
  })
})
