import {
  createEmptySong,
  createSongFromMidiArrayBuffer,
  createSongFromMidiUrl,
  createTwinkleTwinkleSong,
  type Song,
} from '@resonance-box/recital-core'
import { useEffect, useState } from 'react'

export interface UseSongResult {
  song: Song
}

export interface UseSongFromMidiUrlResult {
  song?: Song
  isLoading: boolean
}

export const useEmptySong = (): UseSongResult => {
  const [songRef] = useState(() => ({
    current: createEmptySong(),
  }))

  return { song: songRef.current }
}

export const useSongFromMidiUrl = (
  url: string | URL,
  ppq?: number
): UseSongFromMidiUrlResult => {
  const [isLoading, setIsLoading] = useState(true)
  const [song, setSong] = useState<Song | undefined>()

  useEffect(() => {
    createSongFromMidiUrl(url, ppq)
      .then((song) => {
        setSong(song)
        setIsLoading(false)
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }, [])

  return { song, isLoading }
}

export const useSongFromMidiArrayBuffer = (
  arrayBuffer: ArrayLike<number> | ArrayBuffer,
  ppq?: number
): UseSongResult => {
  const [songRef] = useState(() => ({
    current: createSongFromMidiArrayBuffer(arrayBuffer, ppq),
  }))

  return { song: songRef.current }
}

export const useTwinkleTwinkleSong = (): UseSongResult => {
  const [songRef] = useState(() => ({
    current: createTwinkleTwinkleSong(),
  }))

  return { song: songRef.current }
}
