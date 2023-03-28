import { describe, expect, it } from 'vitest'
import { createTimeSignature } from '../events'
import { PPQ, Ticks } from '../shared'
import { createEmptyTrack } from '../track'
import { SongImpl } from './song'

describe('Song', () => {
  describe('constructor', () => {
    it('should create a new Song instance if no options are passed', () => {
      const song = new SongImpl()
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
      const song = new SongImpl(options)
      expect(song.ppq.value).toEqual(960)
      expect(song.tracks).toEqual(tracks)
      expect(song.timeSignatures[0]).toEqual(timeSignature)
      expect(song.endOfSongTicks.value).toEqual(960)
    })
  })

  describe('addTrack', () => {
    it('should add a track to the song', () => {
      const song = new SongImpl()
      const track = createEmptyTrack()
      expect(song.tracks.length).toBe(0)
      song.addTrack(track)
      expect(song.tracks.length).toBe(1)
      expect(song.tracks[0]).toBe(track)
    })
  })

  describe('addTimeSignature', () => {
    it('should add a time signature to the song', () => {
      const song = new SongImpl()
      const timeSignature = createTimeSignature(new Ticks(480), 3, 8)
      expect(song.timeSignatures.length).toBe(0)
      song.addTimeSignature(timeSignature)
      expect(song.timeSignatures.length).toBe(1)
      expect(song.timeSignatures[0]).toBe(timeSignature)
    })
  })
})
