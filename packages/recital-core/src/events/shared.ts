type EventType = 'Note' | 'NoteOn' | 'NoteOff' | 'TimeSignature'

export interface Event<T extends EventType> {
  type: T
}
