type EventType = 'Note' | 'NoteOn' | 'NoteOff' | 'Tempo' | 'TimeSignature'

export interface Event<T extends EventType> {
  type: T
}
