import produce, { immerable } from 'immer'
import { describe, expect, it } from 'vitest'
import { createTimeSignature } from '../events'
import { PPQ, Ticks } from '../shared'
import { createEmptyTrack } from '../track'
import { Song } from './song'

describe('Song', () => {
  describe('constructor', () => {
    it('should create a new Song instance if no options are passed', () => {
      const song = new Song()
      expect(song.ppq.value).toEqual(480)
      expect(song.tracks).toEqual([])
      expect(song.timeSignatures).toEqual([])
      expect(song.endOfSongTicks.value).toEqual(0)
    })

    it('should create a new Track instance if options are passed', () => {
      const tracks = [createEmptyTrack(), createEmptyTrack()]
      const timeSignature = createTimeSignature(new Ticks(480), 3, 8)
      const options = {
        ppq: new PPQ(960),
        tracks,
        timeSignatures: [timeSignature],
        endOfSongTicks: new Ticks(960),
      }
      const song = new Song(options)
      expect(song.ppq.value).toEqual(960)
      expect(song.tracks).toEqual(tracks)
      expect(song.timeSignatures[0]).toEqual(timeSignature)
      expect(song.endOfSongTicks.value).toEqual(960)
    })
  })

  describe('addTrack', () => {
    it('should add a track to the song', () => {
      const song = new Song()
      const track = createEmptyTrack()
      expect(song.tracks.length).toBe(0)
      song.addTrack(track)
      expect(song.tracks.length).toBe(1)
      expect(song.tracks[0]).toBe(track)
    })
  })

  describe('addTimeSignature', () => {
    it('should add a time signature to the song', () => {
      const song = new Song()
      const timeSignature = createTimeSignature(new Ticks(480), 3, 8)
      expect(song.timeSignatures.length).toBe(0)
      song.addTimeSignature(timeSignature)
      expect(song.timeSignatures.length).toBe(1)
      expect(song.timeSignatures[0]).toBe(timeSignature)
    })
  })

  describe('Immer', () => {
    it('immer test 1', () => {
      Song[immerable] = true
      const song1 = new Song()
      const song2 = song1.immerAddTrack(createEmptyTrack())
      expect(song1.tracks.length).toBe(0)
      expect(song2.tracks.length).toBe(1)
    })

    it('immer test 2', () => {
      Song[immerable] = true
      const song1 = new Song()
      const song2 = produce(song1, (draft) =>
        draft.addTrack(createEmptyTrack())
      )
      expect(song1.tracks.length).toBe(0)
      expect(song2.tracks.length).toBe(1)
    })
  })
})
