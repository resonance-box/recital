type EventType = 'Note' | 'NoteOn' | 'NoteOff' | 'TimeSignature'

export interface IEvent<T extends EventType> {
  type: T
}
